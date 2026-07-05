package config

import (
	"fmt"
	"os"

	"github.com/goccy/go-yaml"
)

// GatewayConfig 网关自身配置。
type GatewayConfig struct {
	ListenAddr     string `yaml:"listen_addr"`      // 监听地址，如 ":8080"，默认 ":8080"
	APIKey         string `yaml:"api_key"`          // 网关统一鉴权 Key，客户端 Authorization: Bearer <key>
	TimeoutSeconds int    `yaml:"timeout_seconds"`  // 后端请求超时秒数，默认 120
	SQLiteMaxConns int    `yaml:"sqlite_max_conns"` // SQLite 连接池大小，默认 1（SQLite 推荐单连接）
}

// ModelConfig 单个后端模型的配置。
type ModelConfig struct {
	Name          string   `yaml:"name"`                     // 对外名称，客户端通过 X-Model 头或 body.model 匹配
	ToModel       string   `yaml:"to_model"`                 // 实际发送给后端的模型名，为空则用 Name
	Protocol      string   `yaml:"protocol"`                 // 协议类型："openai" 或 "anthropic"
	BackendURL    string   `yaml:"backend_url"`              // 后端 API 基础地址（如 https://api.deepseek.com）
	APIKey        string   `yaml:"api_key"`                  // 后端 API Key，转发时注入
	Description   string   `yaml:"description,omitempty"`    // 模型能力描述，负载均衡时用于语义匹配
	Default       bool     `yaml:"default,omitempty"`        // 默认模型标记，负载均衡无匹配时兜底
	SupportsFiles bool     `yaml:"supports_files,omitempty"` // 是否支持文件上传（图片/视频等多模态）
	AuxiliaryType []string `yaml:"auxiliary_type,omitempty"` // 辅助模型支持的文件类型：["image", "video", "audio"]
	AuxiliaryRole string   `yaml:"auxiliary_role,omitempty"` // 辅助模型角色："analysis"（分析）或 "generation"（生成）
}

// MatchesModel 判断给定的模型名是否匹配此配置。
func (m *ModelConfig) MatchesModel(modelName string) bool {
	if modelName == "" {
		return false
	}
	if m.Name == modelName {
		return true
	}
	if m.ToModel != "" && m.ToModel == modelName {
		return true
	}
	return false
}

// GetToModel 返回实际转发给后端的模型名
func (m *ModelConfig) GetToModel() string {
	if m.ToModel != "" {
		return m.ToModel
	}
	return m.Name
}

// ============================================================================
// 负载均衡配置
// ============================================================================

// LoadBalancerConfig 负载均衡配置
//
// 架构：
//   - loadbalancer.model（LLM）负责分词，将用户问题切分为语义 tokens
//   - 内嵌的本地向量模型负责向量化，将 tokens 转为向量
//   - 通过问题向量与模型描述向量的余弦相似度选择目标模型
type LoadBalancerConfig struct {
	// ModelName 触发负载均衡的模型名。客户端传 X-Model: <ModelName> 时，
	// 不走直连代理，而是由负载均衡器根据问题语义自动选择最匹配的后端模型。
	ModelName string `yaml:"model_name"`

	// TokenizerModel 用于分词的 LLM 模型（调用远程 API）
	TokenizerModel ModelConfig `yaml:"model"`

	// Strategy 负载均衡策略，默认 "embedding"
	//   - "embedding": 根据问题与模型描述的向量相似度选择
	//   - "round_robin": 轮询（后续扩展）
	//   - "least_conn": 最少连接（后续扩展）
	Strategy string `yaml:"strategy,omitempty"`

	// TopK 选取相似度最高的前 K 个候选模型，默认 3
	TopK int `yaml:"top_k,omitempty"`

	// MinSimilarity 最小相似度阈值（0~1），低于此值的模型不会被选中，默认 0
	MinSimilarity float64 `yaml:"min_similarity,omitempty"`

	// UseLLMParse 是否启用 LLM 语义解析分词，默认 false。
	// LLM 分词在简单问题场景有效，但多轮对话中上下文复杂时容易失败，建议关闭。
	// 关闭后跳过 LLM 调用，直接用空白分词 + goformer，省去 API 延迟和费用。
	UseLLMParse *bool `yaml:"use_llm_parse,omitempty"`
}

// ============================================================================
// 全局配置
// ============================================================================

// Config 全局配置，从 config.yaml 加载。
type Config struct {
	Gateway      GatewayConfig       `yaml:"gateway"`                // 网关自身配置（监听、鉴权、超时）
	Models       []ModelConfig       `yaml:"models"`                 // 后端模型列表，至少一个
	LoadBalancer *LoadBalancerConfig `yaml:"loadbalancer,omitempty"` // 负载均衡配置，可选

	modelIndex map[string]*ModelConfig // 内部：name → ModelConfig 快速索引
}

// Load 从 YAML 文件加载配置并校验
func Load(path string) (*Config, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("read config file %s: %w", path, err)
	}

	var cfg Config
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return nil, fmt.Errorf("parse config: %w", err)
	}

	// --- 校验 Gateway ---
	if cfg.Gateway.APIKey == "" {
		return nil, fmt.Errorf("gateway.api_key is required")
	}
	if cfg.Gateway.ListenAddr == "" {
		cfg.Gateway.ListenAddr = ":8080"
	}
	if cfg.Gateway.TimeoutSeconds <= 0 {
		cfg.Gateway.TimeoutSeconds = 120
	}
	if cfg.Gateway.SQLiteMaxConns <= 0 {
		cfg.Gateway.SQLiteMaxConns = 1
	}

	// --- 校验 Models ---
	if len(cfg.Models) == 0 {
		return nil, fmt.Errorf("at least one model must be configured")
	}

	cfg.modelIndex = make(map[string]*ModelConfig, len(cfg.Models))
	for i := range cfg.Models {
		m := &cfg.Models[i]
		if m.Name == "" {
			return nil, fmt.Errorf("model[%d]: name is required", i)
		}
		if m.Protocol != "openai" && m.Protocol != "anthropic" {
			return nil, fmt.Errorf("model[%d] %q: protocol must be 'openai' or 'anthropic'", i, m.Name)
		}
		if m.BackendURL == "" {
			return nil, fmt.Errorf("model[%d] %q: backend_url is required", i, m.Name)
		}
		if m.APIKey == "" {
			return nil, fmt.Errorf("model[%d] %q: api_key is required", i, m.Name)
		}
		if _, exists := cfg.modelIndex[m.Name]; exists {
			return nil, fmt.Errorf("duplicate model name: %s", m.Name)
		}
		cfg.modelIndex[m.Name] = m
	}

	// --- 校验 LoadBalancer ---
	if cfg.LoadBalancer != nil {
		lb := cfg.LoadBalancer
		if lb.ModelName == "" {
			lb.ModelName = "ht-model"
		}
		if lb.TokenizerModel.Name == "" {
			return nil, fmt.Errorf("loadbalancer.model.name is required")
		}
		if lb.TokenizerModel.Protocol == "" {
			lb.TokenizerModel.Protocol = "openai"
		}
		if lb.TokenizerModel.BackendURL == "" {
			return nil, fmt.Errorf("loadbalancer.model.backend_url is required")
		}
		if lb.TokenizerModel.APIKey == "" {
			return nil, fmt.Errorf("loadbalancer.model.api_key is required")
		}
		if lb.Strategy == "" {
			lb.Strategy = "embedding"
		}
		if lb.TopK <= 0 {
			lb.TopK = 3
		}
		if lb.UseLLMParse == nil {
			disabled := false
			lb.UseLLMParse = &disabled
		}
	}

	return &cfg, nil
}

// GetModel 根据名称查找模型配置（精确匹配 name）
func (c *Config) GetModel(name string) *ModelConfig {
	return c.modelIndex[name]
}

// ResolveModel 从模型名字符串查找模型配置。
// 优先精确匹配 name，其次精确匹配 to_model。
// 如果 to_model 匹配到多个配置（同一后端模型名，不同协议），
// 则用 preferProtocol 参数消歧义（"openai" 或 "anthropic"）。
func (c *Config) ResolveModel(modelName, preferProtocol string) *ModelConfig {
	if modelName == "" {
		return nil
	}

	if m, ok := c.modelIndex[modelName]; ok {
		return m
	}

	var candidates []*ModelConfig
	for _, m := range c.modelIndex {
		if m.ToModel != "" && m.ToModel == modelName {
			candidates = append(candidates, m)
		}
	}

	if len(candidates) == 0 {
		return nil
	}
	if len(candidates) == 1 {
		return candidates[0]
	}

	if preferProtocol != "" {
		for _, m := range candidates {
			if m.Protocol == preferProtocol {
				return m
			}
		}
	}

	return candidates[0]
}

// FindFileCapableModel 查找支持文件处理的模型。
// 根据文件类型和角色匹配，优先找同协议的，找不到再跨协议找。
// fileTypes: 检测到的文件类型列表，如 ["image"] 或 ["video", "audio"]
// role: 期望的角色，"analysis" 或 "generation"，空字符串表示不限制
func (c *Config) FindFileCapableModel(preferProtocol string, fileTypes []string, role string) *ModelConfig {
	var sameProtocol, crossProtocol []*ModelConfig

	for _, m := range c.modelIndex {
		if !m.SupportsFiles {
			continue
		}

		// 检查是否支持请求的文件类型
		if !m.SupportsFileTypes(fileTypes) {
			continue
		}

		// 检查角色是否匹配
		if role != "" && m.AuxiliaryRole != role {
			continue
		}

		if m.Protocol == preferProtocol {
			sameProtocol = append(sameProtocol, m)
		} else {
			crossProtocol = append(crossProtocol, m)
		}
	}

	// 优先同协议
	if len(sameProtocol) > 0 {
		return sameProtocol[0]
	}

	// 跨协议
	if len(crossProtocol) > 0 {
		return crossProtocol[0]
	}

	return nil
}

// SupportsFileTypes 检查模型是否支持指定的文件类型。
// 至少支持其中一个类型就返回 true。
func (m *ModelConfig) SupportsFileTypes(fileTypes []string) bool {
	if len(m.AuxiliaryType) == 0 {
		// 如果没配置 AuxiliaryType，但 SupportsFiles=true，默认支持所有类型
		return m.SupportsFiles
	}

	for _, reqType := range fileTypes {
		for _, modelType := range m.AuxiliaryType {
			if reqType == modelType {
				return true
			}
		}
	}
	return false
}

// FindGenerationModel 查找指定类型的生成模型。
// genType: "image", "video", "audio"
// preferProtocol: 优先选择的协议类型
func (c *Config) FindGenerationModel(genType string, preferProtocol string) *ModelConfig {
	var sameProtocol, crossProtocol []*ModelConfig

	for _, m := range c.modelIndex {
		// 必须是生成角色
		if m.AuxiliaryRole != "generation" {
			continue
		}

		// 必须支持指定的生成类型
		if !m.SupportsFileType(genType) {
			continue
		}

		if m.Protocol == preferProtocol {
			sameProtocol = append(sameProtocol, m)
		} else {
			crossProtocol = append(crossProtocol, m)
		}
	}

	// 优先同协议
	if len(sameProtocol) > 0 {
		return sameProtocol[0]
	}

	// 跨协议
	if len(crossProtocol) > 0 {
		return crossProtocol[0]
	}

	return nil
}

// SupportsFileType 检查模型是否支持指定的文件类型。
func (m *ModelConfig) SupportsFileType(fileType string) bool {
	if len(m.AuxiliaryType) == 0 {
		return m.SupportsFiles
	}

	for _, modelType := range m.AuxiliaryType {
		if modelType == fileType {
			return true
		}
	}
	return false
}

// FindAnalysisModel 查找指定类型的分析模型。
// fileType: "image", "video", "audio", "document"
// preferProtocol: 优先选择的协议类型
func (c *Config) FindAnalysisModel(fileType string, preferProtocol string) *ModelConfig {
	var sameProtocol, crossProtocol []*ModelConfig

	for _, m := range c.modelIndex {
		// 必须是分析角色
		if m.AuxiliaryRole != "analysis" {
			continue
		}

		// 必须支持指定的文件类型
		if !m.SupportsFileType(fileType) {
			continue
		}

		if m.Protocol == preferProtocol {
			sameProtocol = append(sameProtocol, m)
		} else {
			crossProtocol = append(crossProtocol, m)
		}
	}

	// 优先同协议
	if len(sameProtocol) > 0 {
		return sameProtocol[0]
	}

	// 跨协议
	if len(crossProtocol) > 0 {
		return crossProtocol[0]
	}

	return nil
}
