package v1

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"htAiGateway/config"
	"htAiGateway/middleware"
	"htAiGateway/route/common"
	"htAiGateway/route/loadbalancer"
	"htAiGateway/translator"

	"github.com/gin-gonic/gin"
)

// Handle 统一的 Anthropic 协议入口。
// 由 catch-all 路由分发：r.Any("/*path", Handle)
//
// 流程：
//   - model.Protocol == "anthropic" → 直通代理
//   - model.Protocol == "openai" → 协议翻译（仅 /messages）
func Handle(c *gin.Context) {
	model := middleware.GetModel(c)
	if model == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "model config not found in context"})
		return
	}
	cfg := middleware.GetGatewayConfig(c)

	timeout := 120
	if cfg != nil {
		timeout = cfg.Gateway.TimeoutSeconds
	}

	// 负载均衡路由
	var activeLB *loadbalancer.LoadBalancer
	if cfg != nil && cfg.LoadBalancer != nil && model.Name == cfg.LoadBalancer.ModelName {
		if lb, ok := middleware.GetLoadBalancer(c).(*loadbalancer.LoadBalancer); ok {
			activeLB = lb
			t0 := time.Now()
			bodyBytes, err := io.ReadAll(c.Request.Body)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
				return
			}
			c.Request.Body = io.NopCloser(strings.NewReader(string(bodyBytes)))
			log.Printf("[Gateway] LB body read: %v", time.Since(t0))

			t1 := time.Now()
			selected, err := lb.Route(bodyBytes, "anthropic")
			log.Printf("[Gateway] LB Route: %v, err=%v", time.Since(t1), err)

			if err == nil {
				log.Printf("[Gateway] loadbalancer: %s -> %s", model.Name, selected.Name)
				model = selected
			} else if def := lb.FindDefault(); def != nil {
				log.Printf("[Gateway] loadbalancer route failed: %v, fallback to default: %s", err, def.Name)
				model = def
			}
		}
	}

	// 文件感知路由：智能多阶段路由
	// 阶段1：检测文件上传
	// 阶段2：提取文本，判断是生成还是分析
	// 阶段3：根据意图路由到对应模型
	if cfg != nil {
		bodyBytes, err := io.ReadAll(c.Request.Body)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
			return
		}
		c.Request.Body = io.NopCloser(strings.NewReader(string(bodyBytes)))

		fileTypes := common.DetectFileTypes(bodyBytes)
		if len(fileTypes) > 0 {
			// 检测到文件上传
			text, isPureText := common.ExtractTextFromMessage(bodyBytes)

			if isPureText && text != "" {
				// 纯文本内容，判断生成还是分析
				role := common.DetectRole(bodyBytes)

				if role == "generation" {
					// 生成任务：检测生成类型
					genType := common.DetectGenerationType(bodyBytes)
					if genType != "" {
						if genModel := cfg.FindGenerationModel(genType, "anthropic"); genModel != nil {
							log.Printf("[Gateway] generation detected (type=%s), routing to %s", genType, genModel.Name)
							model = genModel
							// TODO: 转换请求格式为生成模型期望的格式
						}
					}
				} else {
					// 分析任务：根据文件类型找分析模型
					for _, ft := range fileTypes {
						if analysisModel := cfg.FindAnalysisModel(ft, "anthropic"); analysisModel != nil {
							log.Printf("[Gateway] analysis detected (type=%s), routing to %s", ft, analysisModel.Name)
							model = analysisModel
							break
						}
					}
				}
			} else {
				// 非纯文本（实际文件内容），路由到分析模型
				for _, ft := range fileTypes {
					if analysisModel := cfg.FindAnalysisModel(ft, "anthropic"); analysisModel != nil {
						log.Printf("[Gateway] file analysis detected (type=%s), routing to %s", ft, analysisModel.Name)
						model = analysisModel
						break
					}
				}
			}
		}
	}

	// least_conn: 转发前 +1，完成后 -1（在文件感知路由之后，确保使用最终的 model）
	if activeLB != nil {
		activeLB.Acquire(model.Name)
		defer activeLB.Release(model.Name)
	}

	// 同协议 → 直接代理（去掉 /anthropic 前缀）
	if model.Protocol == "anthropic" {
		targetPath := strings.TrimPrefix(c.Request.URL.Path, "/anthropic")
		common.ForwardConditionalWithPath(c, model.BackendURL, targetPath, model.APIKey, model.Protocol, model.GetToModel(), timeout)
		return
	}

	// 跨协议 → 仅 /messages 支持翻译
	if model.Protocol == "openai" {
		if !strings.HasSuffix(c.Request.URL.Path, "/messages") {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": fmt.Sprintf(
					"endpoint %s does not support protocol translation from anthropic to openai. Only /messages is supported.",
					c.Request.URL.Path,
				),
			})
			return
		}
		handleA2O(c, model, timeout)
		return
	}

	c.JSON(http.StatusBadRequest, gin.H{"error": "unsupported model protocol: " + model.Protocol})
}

// handleA2O 处理 Anthropic → OpenAI 跨协议翻译
func handleA2O(c *gin.Context, model *config.ModelConfig, timeout int) {
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read request body"})
		return
	}
	c.Request.Body = io.NopCloser(strings.NewReader(string(bodyBytes)))

	if isAnthropicStreaming(bodyBytes) {
		handleA2OStream(c, model, bodyBytes)
		return
	}

	trans, err := translator.NewTranslator("anthropic", "openai")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	info := trans.Info()

	// 1. 翻译请求
	translatedBody, err := trans.TranslateRequest(bodyBytes, model.GetToModel())
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request translation failed: " + err.Error()})
		return
	}

	// 2. 转发到 OpenAI 后端
	targetURL := strings.TrimRight(model.BackendURL, "/") + info.TargetPath
	backendReq, err := http.NewRequest("POST", targetURL, strings.NewReader(string(translatedBody)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create backend request"})
		return
	}
	backendReq.Header.Set("Content-Type", "application/json")
	backendReq.Header.Set("Authorization", "Bearer "+model.APIKey)

	client := &http.Client{Timeout: time.Duration(timeout) * time.Second}
	resp, err := client.Do(backendReq)
	if err != nil {
		log.Printf("[Gateway] a2o backend error: %v", err)
		c.JSON(http.StatusBadGateway, gin.H{"error": "backend request failed: " + err.Error()})
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to read backend response"})
		return
	}

	if resp.StatusCode != http.StatusOK {
		c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), respBody)
		return
	}

	// 3. 翻译响应
	translatedResp, err := trans.TranslateResponse(respBody, model.GetToModel())
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "response translation failed: " + err.Error()})
		return
	}

	c.Data(http.StatusOK, "application/json", translatedResp)
}

// handleA2OStream 处理 Anthropic → OpenAI 流式跨协议翻译
func handleA2OStream(c *gin.Context, model *config.ModelConfig, bodyBytes []byte) {
	trans, err := translator.NewTranslator("anthropic", "openai")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	info := trans.Info()
	translatedBody, err := trans.TranslateRequest(bodyBytes, model.GetToModel())
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request translation failed: " + err.Error()})
		return
	}

	targetURL := strings.TrimRight(model.BackendURL, "/") + info.TargetPath
	backendReq, err := http.NewRequest("POST", targetURL, strings.NewReader(string(translatedBody)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create backend request"})
		return
	}
	backendReq.Header.Set("Content-Type", "application/json")
	backendReq.Header.Set("Accept", "text/event-stream")
	backendReq.Header.Set("Authorization", "Bearer "+model.APIKey)

	client := &http.Client{Timeout: 0}
	resp, err := client.Do(backendReq)
	if err != nil {
		c.JSON(http.StatusBadGateway, gin.H{"error": "backend stream request failed: " + err.Error()})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), respBody)
		return
	}

	streamTrans, err := translator.NewStreamTranslator("anthropic", "openai")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusOK)
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "streaming not supported"})
		return
	}

	scanner := bufio.NewScanner(resp.Body)
	scanner.Buffer(make([]byte, 0, 64*1024), 1024*1024)
	for scanner.Scan() {
		line := scanner.Text()
		if err := streamTrans.TranslateLine(line, c.Writer); err != nil {
			log.Printf("[Gateway] stream translate error: %v", err)
		}
		flusher.Flush()
	}

	if err := streamTrans.Finalize(c.Writer); err != nil {
		log.Printf("[Gateway] stream finalize error: %v", err)
	}
	flusher.Flush()
}

// isAnthropicStreaming 检测 Anthropic 请求是否要求流式
func isAnthropicStreaming(body []byte) bool {
	var m map[string]interface{}
	if err := json.Unmarshal(body, &m); err != nil {
		return false
	}
	if stream, ok := m["stream"]; ok {
		switch v := stream.(type) {
		case bool:
			return v
		case string:
			return v == "true"
		}
	}
	return false
}

// HandleHealth 健康检查
func HandleHealth(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"service": "htAiGateway - Anthropic v1",
	})
}
