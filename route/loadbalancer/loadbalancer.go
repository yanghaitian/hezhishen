package loadbalancer

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"math"
	"net/http"
	"strings"
	"sync/atomic"

	"htAiGateway/config"
)

// LoadBalancer 基于语义向量的模型负载均衡器。
//
// 工作流程：
//  1. ParseAndTokenize — LLM 语义解析 + 分词
//  2. Vectorize        — 内嵌 BGE 模型将分词文本转为向量
//  3. VectorizeAll     — 启动时预计算所有候选模型的 Description 向量
//  4. Select           — 问题向量与模型向量做余弦相似度，选 TopK
type LoadBalancer struct {
	cfg    *config.LoadBalancerConfig // 负载均衡配置（分词模型、策略、阈值等）
	models []config.ModelConfig       // 候选后端模型列表

	emb          *Embedding           // 共享的 BGE 向量模型（由外部注入）
	modelVectors map[string][]float64 // 模型名 → L2 归一化描述向量

	// 策略相关
	rrCounter  atomic.Int64             // 轮询计数器（round_robin）
	connCounts map[string]*atomic.Int64 // 模型名 → 当前连接数（least_conn）
}

// Acquire 连接计数 +1（least_conn 策略用）
func (lb *LoadBalancer) Acquire(modelName string) {
	if c, ok := lb.connCounts[modelName]; ok {
		c.Add(1)
	}
}

// Release 连接计数 -1（least_conn 策略用），handler 在请求完成后调用
func (lb *LoadBalancer) Release(modelName string) {
	if c, ok := lb.connCounts[modelName]; ok {
		c.Add(-1)
	}
}

// New 创建负载均衡器。
func New(cfg *config.LoadBalancerConfig, models []config.ModelConfig, emb *Embedding) *LoadBalancer {
	connCounts := make(map[string]*atomic.Int64, len(models))
	for _, m := range models {
		connCounts[m.Name] = &atomic.Int64{}
	}
	return &LoadBalancer{
		cfg:          cfg,
		models:       models,
		emb:          emb,
		modelVectors: make(map[string][]float64),
		connCounts:   connCounts,
	}
}

// ============================================================================
// 语义解析 + 分词 — 调用 loadbalancer.model（LLM）
// ============================================================================

// parsePrompt 语义解析 + 分词提示词。
//
// LLM 完成两件事：
//  1. 语义解析：将自然语言问题重写为标准化语义表述，去掉口语化、同义变体
//  2. 分词：对标准化表述做语义分词，返回 token 数组
//
// 示例：
//
//	"帮我写个排序"        → ["代码生成", "排序算法"]
//	"我需要一段排序算法代码" → ["代码生成", "排序算法"]
//	"今天天气怎么样"       → ["天气查询", "今日"]
//	"今天适合出门吗"       → ["天气查询", "今日", "出行建议"]
const parsePrompt = `你是分词器。将用户输入做语义标准化再分词，只输出JSON数组。

规则：
1. 将口语化问题改写为标准语义短语（如"帮我写个排序"→"代码生成 排序算法"）
2. 对短语分词，输出JSON字符串数组
3. 严禁输出JSON数组以外的任何内容（不解释、不回答、不闲聊）

示例：
输入：帮我写个排序
输出：["代码生成","排序算法"]

输入：我需要一段排序算法代码
输出：["代码生成","排序算法"]

输入：今天适合出门吗
输出：["天气查询","今日","出行建议"]

输入：什么是闭包
输出：["概念解释","编程","闭包"]`

// ParseAndTokenize 语义解析 + 分词。
//
// 若 UseLLMParse 开启：调用 LLM 做语义标准化+分词。
// 若关闭或 LLM 失败：降级为简单空白分词。
func (lb *LoadBalancer) ParseAndTokenize(text string) ([]string, error) {
	// 检查开关；问题过长（>500）也自动跳过，多轮对话上下文 LLM 无法可靠分词
	if lb.cfg.UseLLMParse != nil && !*lb.cfg.UseLLMParse {
		log.Printf("[LoadBalancer] LLM parse disabled by config, using simple split")
		return simpleTokenize(text), nil
	}
	if len(text) > 500 {
		log.Printf("[LoadBalancer] question too long (%d chars), skip LLM parse, using simple split", len(text))
		return simpleTokenize(text), nil
	}

	model := lb.cfg.TokenizerModel

	var tokens []string
	var err error
	switch model.Protocol {
	case "openai":
		tokens, err = lb.parseOpenAI(text, model)
	case "anthropic":
		tokens, err = lb.parseAnthropic(text, model)
	default:
		return nil, fmt.Errorf("unsupported tokenizer protocol: %s", model.Protocol)
	}

	if err != nil {
		log.Printf("[LoadBalancer] LLM parse failed, fallback to simple split: %v", err)
		return simpleTokenize(text), nil
	}
	if len(tokens) == 0 {
		log.Printf("[LoadBalancer] LLM returned empty tokens, fallback to simple split")
		return simpleTokenize(text), nil
	}
	log.Printf("[LoadBalancer] LLM tokens: %v", tokens)
	return tokens, nil
}

// simpleTokenize 简单空白分词，LLM 解析失败时的降级方案
func simpleTokenize(text string) []string {
	words := strings.Fields(text)
	var result []string
	for _, w := range words {
		w = strings.TrimSpace(w)
		if w != "" {
			result = append(result, strings.ToLower(w))
		}
	}
	return result
}

// Tokenize 直接分词（不做语义解析），用于处理模型 Description 等标准化文本。
func (lb *LoadBalancer) Tokenize(text string) ([]string, error) {
	return lb.ParseAndTokenize(text)
}

// ============================================================================
// OpenAI 协议分词
// ============================================================================

type openaiChatRequest struct {
	Model          string          `json:"model"`
	Messages       []openaiMessage `json:"messages"`
	Temperature    float64         `json:"temperature"`
	MaxTokens      int             `json:"max_tokens"`
	ResponseFormat *responseFormat `json:"response_format"`
}

type responseFormat struct {
	Type string `json:"type"`
}

type openaiMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type openaiChatResponse struct {
	Choices []struct {
		Message struct {
			Content          string `json:"content"`
			ReasoningContent string `json:"reasoning_content"`
		} `json:"message"`
	} `json:"choices"`
}

func (lb *LoadBalancer) parseOpenAI(text string, model config.ModelConfig) ([]string, error) {
	reqBody := openaiChatRequest{
		Model:          model.GetToModel(),
		Messages:       []openaiMessage{{Role: "system", Content: parsePrompt}, {Role: "user", Content: text}},
		Temperature:    0,
		MaxTokens:      256,
		ResponseFormat: &responseFormat{Type: "json_object"},
	}

	bodyBytes, _ := json.Marshal(reqBody)
	url := strings.TrimRight(model.BackendURL, "/") + "/v1/chat/completions"

	req, err := http.NewRequest("POST", url, strings.NewReader(string(bodyBytes)))
	if err != nil {
		return nil, fmt.Errorf("create tokenize request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+model.APIKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("tokenize request failed: %w", err)
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read tokenize response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("tokenize returned %d: %s", resp.StatusCode, string(respBytes))
	}

	var chatResp openaiChatResponse
	if err := json.Unmarshal(respBytes, &chatResp); err != nil {
		log.Printf("[LoadBalancer] parseOpenAI response unmarshal failed, body=%s", truncate(string(respBytes), 300))
		return nil, fmt.Errorf("parse tokenize response: %w", err)
	}

	if len(chatResp.Choices) == 0 {
		log.Printf("[LoadBalancer] parseOpenAI: no choices, body=%s", truncate(string(respBytes), 300))
		return nil, fmt.Errorf("tokenize: no choices in response")
	}

	msg := chatResp.Choices[0].Message
	content := msg.Content
	if content == "" {
		// DeepSeek 推理模型把内容放在 reasoning_content，content 可能为空
		content = msg.ReasoningContent
	}
	if content == "" {
		log.Printf("[LoadBalancer] parseOpenAI: empty content and reasoning, body=%s", truncate(string(respBytes), 300))
	}
	return parseTokensFromContent(content)
}

// ============================================================================
// Anthropic 协议分词
// ============================================================================

type anthropicMessageRequest struct {
	Model     string             `json:"model"`
	MaxTokens int                `json:"max_tokens"`
	System    string             `json:"system"`
	Messages  []anthropicMessage `json:"messages"`
}

type anthropicMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type anthropicMessageResponse struct {
	Content []struct {
		Type string `json:"type"`
		Text string `json:"text"`
	} `json:"content"`
}

func (lb *LoadBalancer) parseAnthropic(text string, model config.ModelConfig) ([]string, error) {
	reqBody := anthropicMessageRequest{
		Model:     model.GetToModel(),
		MaxTokens: 512,
		System:    parsePrompt,
		Messages: []anthropicMessage{
			{Role: "user", Content: text},
			{Role: "assistant", Content: "["}, // prefill 强制以 JSON 数组开头
		},
	}

	bodyBytes, _ := json.Marshal(reqBody)
	url := strings.TrimRight(model.BackendURL, "/") + "/v1/messages"

	req, err := http.NewRequest("POST", url, strings.NewReader(string(bodyBytes)))
	if err != nil {
		return nil, fmt.Errorf("create tokenize request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("x-api-key", model.APIKey)
	req.Header.Set("anthropic-version", "2023-06-01")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("tokenize request failed: %w", err)
	}
	defer resp.Body.Close()

	respBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read tokenize response: %w", err)
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("tokenize returned %d: %s", resp.StatusCode, string(respBytes))
	}

	var msgResp anthropicMessageResponse
	if err := json.Unmarshal(respBytes, &msgResp); err != nil {
		log.Printf("[LoadBalancer] parseAnthropic response unmarshal failed, body=%s", truncate(string(respBytes), 300))
		return nil, fmt.Errorf("parse tokenize response: %w", err)
	}

	if len(msgResp.Content) == 0 {
		log.Printf("[LoadBalancer] parseAnthropic: no content, body=%s", truncate(string(respBytes), 300))
		return nil, fmt.Errorf("tokenize: no content in response")
	}

	respText := msgResp.Content[0].Text
	if respText == "" {
		log.Printf("[LoadBalancer] parseAnthropic: empty text, body=%s", truncate(string(respBytes), 300))
	}
	return parseTokensFromContent(respText)
}

// ============================================================================
// 分词结果解析
// ============================================================================

// parseTokensFromContent 从 LLM 返回的文本中提取 JSON token 数组。
// LLM 返回的内容可能是纯 JSON 数组，也可能夹杂 markdown 代码块或解释文字。
func parseTokensFromContent(content string) ([]string, error) {
	content = strings.TrimSpace(content)
	log.Printf("[LoadBalancer] parseTokensFromContent raw (len=%d): %s", len(content), truncate(content, 300))

	// 1. 尝试从 markdown 代码块 ``` ... ``` 中提取
	if extracted, ok := extractMarkdownCodeBlock(content); ok {
		content = extracted
	}

	// 2. 尝试直接解析 JSON 数组
	var tokens []string
	if err := json.Unmarshal([]byte(content), &tokens); err == nil {
		return filterEmpty(tokens), nil
	}

	// 3. 容错：提取 [...] 部分（跳过前面的解释文字）
	if start := strings.Index(content, "["); start >= 0 {
		if end := strings.LastIndex(content, "]"); end > start {
			slice := content[start : end+1]
			if err := json.Unmarshal([]byte(slice), &tokens); err == nil {
				return filterEmpty(tokens), nil
			}
		}
	}

	return nil, fmt.Errorf("parse tokens failed, content: %s", truncate(content, 200))
}

// extractMarkdownCodeBlock 从 markdown 代码块中提取内容
func extractMarkdownCodeBlock(s string) (string, bool) {
	// 找到 ``` 标记的代码块
	start := strings.Index(s, "```")
	if start < 0 {
		return "", false
	}
	// 跳过 ``` 及后面的语言标记（如 json、python 等）
	rest := s[start+3:]
	if idx := strings.Index(rest, "\n"); idx >= 0 {
		rest = rest[idx+1:]
	}
	// 找到闭合的 ```
	end := strings.Index(rest, "```")
	if end < 0 {
		// 没有闭合标记，取剩余全部
		return strings.TrimSpace(rest), true
	}
	return strings.TrimSpace(rest[:end]), true
}

// filterEmpty 过滤空字符串
func filterEmpty(tokens []string) []string {
	var result []string
	for _, t := range tokens {
		t = strings.TrimSpace(t)
		if t != "" {
			result = append(result, t)
		}
	}
	return result
}

// ============================================================================
// 向量化 — 使用内嵌的本地向量模型
// ============================================================================

// Vectorize 使用共享的 Embedding 将 tokens 转为向量。
func (lb *LoadBalancer) Vectorize(tokens []string) ([]float64, error) {
	if lb.emb == nil {
		return nil, fmt.Errorf("embedding model not loaded")
	}
	return lb.emb.Embed(tokens)
}

// VectorizeAll 预计算所有候选模型的描述向量。
func (lb *LoadBalancer) VectorizeAll() error {
	for _, m := range lb.models {
		text := m.Description
		if text == "" {
			text = m.Name
		}

		vec, err := lb.Vectorize([]string{text})
		if err != nil {
			return fmt.Errorf("vectorize model %s: %w", m.Name, err)
		}
		lb.modelVectors[m.Name] = vec
	}
	return nil
}

// ============================================================================
// 模型选择
// ============================================================================

// SelectResult 选择结果
type SelectResult struct {
	Model      *config.ModelConfig // 命中的模型配置
	Similarity float64             // 问题向量与模型描述向量的余弦相似度 0~1
}

// Select 根据用户问题选择最匹配的模型。
func (lb *LoadBalancer) Select(question string) ([]SelectResult, error) {
	// 问题需要语义解析（标准化同义表述），模型描述已经是标准文本直接用 Tokenize
	tokens, err := lb.ParseAndTokenize(question)
	if err != nil {
		return nil, fmt.Errorf("parse question: %w", err)
	}

	questionVec, err := lb.Vectorize(tokens)
	if err != nil {
		return nil, fmt.Errorf("vectorize question: %w", err)
	}

	type scored struct {
		model      *config.ModelConfig
		similarity float64
	}
	var scoredList []scored

	for i := range lb.models {
		// 跳过辅助模型
		if len(lb.models[i].AuxiliaryType) > 0 {
			continue
		}

		modelVec, ok := lb.modelVectors[lb.models[i].Name]
		if !ok {
			continue
		}
		sim := cosineSimilarity(questionVec, modelVec)
		if sim < lb.cfg.MinSimilarity {
			continue
		}
		scoredList = append(scoredList, scored{
			model:      &lb.models[i],
			similarity: sim,
		})
	}

	// 降序
	for i := 0; i < len(scoredList); i++ {
		for j := i + 1; j < len(scoredList); j++ {
			if scoredList[j].similarity > scoredList[i].similarity {
				scoredList[i], scoredList[j] = scoredList[j], scoredList[i]
			}
		}
	}

	topK := lb.cfg.TopK
	if len(scoredList) < topK {
		topK = len(scoredList)
	}

	var results []SelectResult
	for i := 0; i < topK; i++ {
		results = append(results, SelectResult{
			Model:      scoredList[i].model,
			Similarity: scoredList[i].similarity,
		})
	}
	return results, nil
}

// ============================================================================
// 相似度计算
// ============================================================================

func cosineSimilarity(a, b []float64) float64 {
	if len(a) != len(b) || len(a) == 0 {
		return 0
	}
	var dot, normA, normB float64
	for i := range a {
		dot += a[i] * b[i]
		normA += a[i] * a[i]
		normB += b[i] * b[i]
	}
	if normA == 0 || normB == 0 {
		return 0
	}
	return dot / (math.Sqrt(normA) * math.Sqrt(normB))
}

// ============================================================================
// 路由决策辅助
// ============================================================================

// Route 根据请求体中的用户问题，选择最匹配的后端模型。
//
// 从请求体提取最后一条 user 消息，调用 Select 选模型。
// 返回命中的模型配置，调用方直接用它转发请求。
func (lb *LoadBalancer) Route(bodyBytes []byte, preferProtocol string) (*config.ModelConfig, error) {
	switch lb.cfg.Strategy {
	case "round_robin":
		return lb.routeRoundRobin(preferProtocol)
	case "least_conn":
		return lb.routeLeastConn(preferProtocol)
	default:
		return lb.routeEmbedding(bodyBytes, preferProtocol)
	}
}

// routeEmbedding 向量相似度匹配（默认策略）
func (lb *LoadBalancer) routeEmbedding(bodyBytes []byte, preferProtocol string) (*config.ModelConfig, error) {
	question := extractUserMessage(bodyBytes)
	if question == "" {
		return lb.fallbackDefault(preferProtocol)
	}

	if !isCleanQuestion(question) {
		log.Printf("[LoadBalancer] dirty question (%d chars), skip vector", len(question))
		return lb.fallbackDefault(preferProtocol)
	}

	log.Printf("[LoadBalancer] clean question (%d chars): %s", len(question), truncate(question, 80))
	results, err := lb.Select(question)
	if err != nil {
		log.Printf("[LoadBalancer] Select failed: %v", err)
		return lb.fallbackDefault(preferProtocol)
	}
	if len(results) > 0 {
		best := results[0]
		log.Printf("[LoadBalancer] routed to %s (sim=%.3f)", best.Model.Name, best.Similarity)
		return best.Model, nil
	}

	return lb.fallbackDefault(preferProtocol)
}

// routeRoundRobin 轮询策略：在所有模型间按顺序轮转（可跨协议）
// 跳过辅助模型
func (lb *LoadBalancer) routeRoundRobin(_ string) (*config.ModelConfig, error) {
	// 过滤出非辅助模型
	var candidates []config.ModelConfig
	for _, m := range lb.models {
		if len(m.AuxiliaryType) == 0 {
			candidates = append(candidates, m)
		}
	}

	if len(candidates) == 0 {
		return nil, fmt.Errorf("no models configured")
	}

	idx := int(lb.rrCounter.Add(1)-1) % len(candidates)
	model := &candidates[idx]
	log.Printf("[LoadBalancer] round_robin -> %s (%s) [#%d/%d]",
		model.Name, model.Protocol, idx+1, len(candidates))
	return model, nil
}

// routeLeastConn 最小连接数策略：选所有模型中连接数最少的（可跨协议）
// 跳过辅助模型
func (lb *LoadBalancer) routeLeastConn(_ string) (*config.ModelConfig, error) {
	var best *config.ModelConfig
	var bestCount int64 = 1<<63 - 1

	for i := range lb.models {
		m := &lb.models[i]

		// 跳过辅助模型
		if len(m.AuxiliaryType) > 0 {
			continue
		}

		if c, ok := lb.connCounts[m.Name]; ok {
			if cnt := c.Load(); cnt < bestCount {
				bestCount = cnt
				best = m
			}
		}
	}

	if best == nil {
		return nil, fmt.Errorf("no models configured")
	}

	log.Printf("[LoadBalancer] least_conn -> %s (%s) [conn=%d]", best.Name, best.Protocol, bestCount)
	return best, nil
}

// fallbackDefault 返回与请求协议匹配的默认模型，避免跨协议翻译的开销
func (lb *LoadBalancer) fallbackDefault(preferProtocol string) (*config.ModelConfig, error) {
	for i := range lb.models {
		if lb.models[i].Default && lb.models[i].Protocol == preferProtocol {
			log.Printf("[LoadBalancer] fallback to default: %s (%s)", lb.models[i].Name, preferProtocol)
			return &lb.models[i], nil
		}
	}
	if def := lb.FindDefault(); def != nil {
		log.Printf("[LoadBalancer] fallback to default: %s (%s)", def.Name, def.Protocol)
		return def, nil
	}
	return nil, fmt.Errorf("no default model configured")
}

// FindDefault 查找标记为 default 的模型
func (lb *LoadBalancer) FindDefault() *config.ModelConfig {
	for i := range lb.models {
		if lb.models[i].Default {
			return &lb.models[i]
		}
	}
	return nil
}

// extractUserMessage 从请求体中取最后一条 role=user 的 message.content。
// 兼容两种 content 格式：
//   - 字符串:  "content": "hello"
//   - 数组:    "content": [{"type":"text","text":"hello"}]
func extractUserMessage(bodyBytes []byte) string {
	var body struct {
		Messages []struct {
			Role    string          `json:"role"`
			Content json.RawMessage `json:"content"`
		} `json:"messages"`
	}
	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return ""
	}

	// 从后往前找最近的"干净"user消息：有实际文字、且不是系统注入的噪声。
	// 跳过含 <system-、tool_result only、超长上下文注入的消息。
	for i := len(body.Messages) - 1; i >= 0; i-- {
		if body.Messages[i].Role != "user" {
			continue
		}

		// 尝试字符串格式
		var text string
		if err := json.Unmarshal(body.Messages[i].Content, &text); err == nil && text != "" {
			if isCleanQuestion(text) {
				return text
			}
			continue
		}

		// 尝试数组格式 [{"type":"text","text":"..."}, ...]
		var parts []struct {
			Type string `json:"type"`
			Text string `json:"text"`
		}
		if err := json.Unmarshal(body.Messages[i].Content, &parts); err == nil {
			var texts []string
			for _, p := range parts {
				if p.Type == "text" && p.Text != "" {
					texts = append(texts, p.Text)
				}
			}
			if result := strings.Join(texts, " "); result != "" && isCleanQuestion(result) {
				return result
			}
		}
	}
	return ""
}

// isCleanQuestion 判断文本是否为干净的提问而非系统注入的上下文
func isCleanQuestion(text string) bool {
	if len(text) > 200 {
		return false // 太长，大概率是多轮上下文注入
	}
	if strings.Contains(text, "<system-") || strings.Contains(text, "<function_") {
		return false // 系统标记注入
	}
	if strings.Contains(text, "As you answer the user's questions") {
		return false // system-reminder 注入
	}
	return true
}

func truncate(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max] + "..."
}
