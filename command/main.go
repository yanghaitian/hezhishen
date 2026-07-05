package main

import (
	"log"
	"os"

	"htAiGateway/config"
	"htAiGateway/mcp"
	"htAiGateway/mcp/dao"
	"htAiGateway/middleware"
	anthropic "htAiGateway/route/anthropic/v1"
	"htAiGateway/route/loadbalancer"
	openai "htAiGateway/route/openai/v1"

	"github.com/gin-gonic/gin"
)

func main() {
	// 加载配置
	configPath := os.Getenv("CONFIG_PATH")
	if configPath == "" {
		configPath = config.ResolvePath("config.yaml")
	}

	cfg, err := config.Load(configPath)
	if err != nil {
		log.Fatalf("Failed to load config from %s: %v", configPath, err)
	}

	log.Printf("Loaded %d models from config", len(cfg.Models))
	for _, m := range cfg.Models {
		log.Printf("  - %s (%s) -> %s", m.Name, m.Protocol, m.BackendURL)
	}

	// 鉴权中间件：验证网关 API Key + 解析 X-Model
	auth := middleware.Auth(cfg)

	// 加载共享的内嵌向量模型（启动一次，loadbalancer 和 MCP 共用）
	var emb *loadbalancer.Embedding
	modelPath := os.Getenv("EMBEDDING_MODEL_PATH")
	if modelPath == "" {
		modelPath = config.ResolvePath("emmodel/bge-small-zh-v1.5/bge-small-zh-v1.5")
	}
	emb, err = loadbalancer.NewEmbedding(modelPath)
	if err != nil {
		log.Printf("[WARNING] embedding model not loaded: %v (vector search disabled)", err)
	}

	// 初始化负载均衡器
	var injectLB gin.HandlerFunc
	if cfg.LoadBalancer != nil && emb != nil {
		lb := loadbalancer.New(cfg.LoadBalancer, cfg.Models, emb)

		if err := lb.VectorizeAll(); err != nil {
			log.Printf("[WARNING] loadbalancer VectorizeAll: %v", err)
		} else {
			log.Printf("LoadBalancer ready: model_name=%q strategy=%s topK=%d",
				cfg.LoadBalancer.ModelName, cfg.LoadBalancer.Strategy, cfg.LoadBalancer.TopK)
		}

		injectLB = middleware.InjectLoadBalancer(lb)
	}

	// 创建 Gin 引擎
	r := gin.Default()

	// OpenAI 协议接口组
	openaiGroup := r.Group("/openai")
	openaiGroup.Use(auth)
	if injectLB != nil {
		openaiGroup.Use(injectLB)
	}
	openaiGroup.Any("/*path", openai.Handle)

	// Anthropic 协议接口组
	anthropicGroup := r.Group("/anthropic")
	anthropicGroup.Use(auth)
	if injectLB != nil {
		anthropicGroup.Use(injectLB)
	}
	anthropicGroup.Any("/*path", anthropic.Handle)

	// 初始化 MCP 文档数据库
	dbPath := os.Getenv("MCP_DB_PATH")
	if dbPath == "" {
		dbPath = config.ResolvePath("data/mcp.db")
	}
	docDB, err := dao.Open(dbPath, cfg.Gateway.SQLiteMaxConns)
	if err != nil {
		log.Fatalf("Failed to open MCP database: %v", err)
	}
	defer docDB.Close()
	log.Printf("MCP database opened: %s (max_conns=%d)", dbPath, cfg.Gateway.SQLiteMaxConns)

	// MCP 协议接口组（仅验证 API Key，不要求模型选择）
	mcpGroup := r.Group("/mcp")
	mcpGroup.Use(middleware.AuthMCP(cfg))
	mcpGroup.Use(middleware.InjectDocDB(docDB))
	if emb != nil {
		mcpGroup.Use(middleware.InjectLoadBalancer(emb))
	}
	mcpGroup.POST("", mcp.Handle)    // POST /mcp
	mcpGroup.OPTIONS("", mcp.Handle) // CORS preflight

	// 知识库管理接口（API Key 鉴权）
	adminGroup := r.Group("/admin/mcp")
	adminGroup.Use(middleware.AuthMCP(cfg))
	adminGroup.Use(middleware.InjectDocDB(docDB))
	if emb != nil {
		adminGroup.Use(middleware.InjectLoadBalancer(emb))
	}
	adminGroup.GET("/documents", mcp.ListDocuments)
	adminGroup.GET("/documents/export", mcp.ExportDocuments)
	adminGroup.POST("/documents/export", mcp.ExportDocuments)
	adminGroup.POST("/documents/import", mcp.ImportDocuments)
	adminGroup.GET("/documents/:id", mcp.GetDocument)
	adminGroup.POST("/documents", mcp.CreateDocument)
	adminGroup.PUT("/documents/:id", mcp.UpdateDocument)
	adminGroup.POST("/documents/batch-delete", mcp.DeleteDocuments)
	adminGroup.DELETE("/documents/:id", mcp.DeleteDocument)

	// 健康检查（无需鉴权）
	r.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok", "service": "htAiGateway"})
	})
	// 前端静态资源（SPA）
	r.Static("/static", config.ResolvePath("web/static"))
	r.StaticFile("/", config.ResolvePath("web/index.html"))
	r.StaticFile("/favicon.ico", config.ResolvePath("web/favicon.ico"))
	r.StaticFile("/manifest.json", config.ResolvePath("web/manifest.json"))
	r.StaticFile("/logo192.png", config.ResolvePath("web/logo192.png"))
	r.StaticFile("/logo512.png", config.ResolvePath("web/logo512.png"))
	r.StaticFile("/robots.txt", config.ResolvePath("web/robots.txt"))

	log.Printf("AI Gateway 启动，监听 %s", cfg.Gateway.ListenAddr)
	if err := r.Run(cfg.Gateway.ListenAddr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
