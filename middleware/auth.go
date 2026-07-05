package middleware

import (
	"bytes"
	"encoding/json"
	"io"
	"net/http"
	"strings"

	"htAiGateway/config"

	"github.com/gin-gonic/gin"
)

const (
	// ContextKeyModel 模型配置在 Gin Context 中的 Key
	ContextKeyModel = "model"
	// ContextKeyConfig 全局配置在 Gin Context 中的 Key
	ContextKeyConfig = "gateway_config"
)

// Auth 返回一个 Gin 中间件，完成：
// 1. 验证网关 API Key（Authorization: Bearer <token>）
// 2. 解析模型选择：优先 X-Model Header → 其次请求 body 中的 model 字段
// 3. 将模型配置存入 Context 供 Handler 使用
func Auth(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		// 1. 验证网关 API Key
		token := extractBearerToken(c.GetHeader("Authorization"))
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing Authorization header, expected: Bearer <gateway-api-key>",
			})
			return
		}
		if token != cfg.Gateway.APIKey {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid gateway api key",
			})
			return
		}

		// 2. 解析模型选择
		// 优先从 X-Model Header 获取（精确匹配 name）
		modelName := strings.TrimSpace(c.GetHeader("X-Model"))
		var model *config.ModelConfig

		if modelName != "" {
			// X-Model header 存在：精确匹配 name
			model = cfg.GetModel(modelName)
			if model == nil {
				// 检查是否为负载均衡虚拟模型名
				if cfg.LoadBalancer != nil && modelName == cfg.LoadBalancer.ModelName {
					model = &config.ModelConfig{Name: modelName}
				} else {
					c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
						"error": "unknown model: " + modelName,
					})
					return
				}
			}
		} else {
			// X-Model header 不存在：从请求 body 的 model 字段提取
			model = resolveFromBody(c, cfg)
			if model == nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"error": "X-Model header is required, or model field must be present in request body",
				})
				return
			}
		}

		// 3. 存入 Context
		c.Set(ContextKeyConfig, cfg)
		c.Set(ContextKeyModel, model)
		c.Next()
	}
}

// resolveFromBody 从请求 body 中提取 model 字段并查找配置。
// 读取 body 后会恢复，不影响后续 handler 使用。
func resolveFromBody(c *gin.Context, cfg *config.Config) *config.ModelConfig {
	// 读取原始 body
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		return nil
	}
	// 恢复 body 供后续 handler 读取
	c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

	// 解析 JSON 提取 model 字段
	var body struct {
		Model string `json:"model"`
	}
	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return nil
	}
	if body.Model == "" {
		return nil
	}

	// 检查是否为负载均衡虚拟模型名
	if cfg.LoadBalancer != nil && strings.TrimSpace(body.Model) == cfg.LoadBalancer.ModelName {
		return &config.ModelConfig{Name: cfg.LoadBalancer.ModelName}
	}

	// 从请求路径推断协议偏好，用于消歧义
	// /openai/v1/... → "openai", /anthropic/v1/... → "anthropic"
	preferProtocol := protocolFromPath(c.Request.URL.Path)

	return cfg.ResolveModel(strings.TrimSpace(body.Model), preferProtocol)
}

// protocolFromPath 从请求路径推断协议偏好
func protocolFromPath(path string) string {
	path = strings.ToLower(path)
	if strings.HasPrefix(path, "/anthropic") {
		return "anthropic"
	}
	if strings.HasPrefix(path, "/openai") {
		return "openai"
	}
	return ""
}

// GetModel 从 Context 中获取模型配置
func GetModel(c *gin.Context) *config.ModelConfig {
	if m, exists := c.Get(ContextKeyModel); exists {
		return m.(*config.ModelConfig)
	}
	return nil
}

// GetGatewayConfig 从 Context 中获取网关配置
func GetGatewayConfig(c *gin.Context) *config.Config {
	if cfg, exists := c.Get(ContextKeyConfig); exists {
		return cfg.(*config.Config)
	}
	return nil
}

// AuthMCP 返回一个 Gin 中间件，用于 MCP 协议接口。
// 只验证网关 API Key，不要求模型选择（MCP 的 tools 可用于搜索模型）。
func AuthMCP(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := extractBearerToken(c.GetHeader("Authorization"))
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing Authorization header, expected: Bearer <gateway-api-key>",
			})
			return
		}
		if token != cfg.Gateway.APIKey {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid gateway api key",
			})
			return
		}
		c.Set(ContextKeyConfig, cfg)
		c.Next()
	}
}

// ContextKeyLoadBalancer LoadBalancer 在 Context 中的 Key
const ContextKeyLoadBalancer = "loadbalancer"

// InjectLoadBalancer 返回一个 Gin 中间件，将 LoadBalancer 实例注入 Context。
func InjectLoadBalancer(lb interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(ContextKeyLoadBalancer, lb)
		c.Next()
	}
}

// GetLoadBalancer 从 Context 中获取 LoadBalancer 实例。
// 调用方需自行断言为 *loadbalancer.LoadBalancer。
func GetLoadBalancer(c *gin.Context) interface{} {
	lb, _ := c.Get(ContextKeyLoadBalancer)
	return lb
}

// ContextKeyDocDB 文档数据库在 Context 中的 Key
const ContextKeyDocDB = "docdb"

// InjectDocDB 返回一个 Gin 中间件，将文档数据库实例注入 Context。
func InjectDocDB(db interface{}) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Set(ContextKeyDocDB, db)
		c.Next()
	}
}

// GetDocDB 从 Context 中获取文档数据库实例。
func GetDocDB(c *gin.Context) interface{} {
	db, _ := c.Get(ContextKeyDocDB)
	return db
}

// extractBearerToken 从 Authorization Header 提取 Bearer Token
func extractBearerToken(authHeader string) string {
	if authHeader == "" {
		return ""
	}
	const prefix = "Bearer "
	if len(authHeader) < len(prefix) {
		return ""
	}
	if !strings.EqualFold(authHeader[:len(prefix)], prefix) {
		return ""
	}
	return authHeader[len(prefix):]
}
