package mcp

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"

	"htAiGateway/mcp/dao"
	"htAiGateway/middleware"
	"htAiGateway/route/loadbalancer"

	"github.com/gin-gonic/gin"
)

// Handle 统一的 MCP 协议入口。
//
// 支持 Streamable HTTP 传输模式：
//   - POST → JSON-RPC 请求，返回 JSON-RPC 响应
//   - GET  → 返回 200（SSE 传输占位，待实现）
func Handle(c *gin.Context) {
	if c.Request.Method == http.MethodOptions {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Authorization, Content-Type, Mcp-Session-Id")
		c.Status(http.StatusNoContent)
		return
	}

	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to read request body"})
		return
	}

	var req JSONRPCRequest
	if err := json.Unmarshal(bodyBytes, &req); err != nil {
		writeError(c, nil, ErrParseError, "failed to parse JSON-RPC request: "+err.Error())
		return
	}

	if req.JSONRPC != "2.0" {
		writeError(c, req.ID, ErrInvalidRequest, "jsonrpc must be \"2.0\"")
		return
	}
	if req.Method == "" {
		writeError(c, req.ID, ErrInvalidRequest, "method is required")
		return
	}

	switch req.Method {
	case MethodInitialize:
		handleInitialize(c, req.ID, bodyBytes)
	case MethodInitialized:
		c.Status(http.StatusOK)
	case MethodPing:
		writeResult(c, req.ID, PingResult{})
	case MethodToolsList:
		handleToolsList(c, req.ID)
	case MethodToolsCall:
		handleToolsCall(c, req.ID, bodyBytes)
	default:
		writeError(c, req.ID, ErrMethodNotFound,
			fmt.Sprintf("unknown method: %s", req.Method))
	}
}

// ============================================================================
// 方法处理器
// ============================================================================

func handleInitialize(c *gin.Context, id interface{}, bodyBytes []byte) {
	sessionID := generateSessionID()
	c.Header("Mcp-Session-Id", sessionID)

	var initReq InitializeRequest
	if err := json.Unmarshal(bodyBytes, &initReq); err != nil {
		// params 解析失败也继续，返回服务端能力即可
	}

	log.Printf("[MCP] initialize from client=%s v%s (session=%s)",
		initReq.ClientInfo.Name, initReq.ClientInfo.Version, sessionID)

	result := InitializeResult{
		ProtocolVersion: ProtocolVersion,
		Capabilities: ServerCapabilities{
			Tools: &ToolsCapability{ListChanged: false},
		},
		ServerInfo: ImplementationInfo{
			Name:    "htAiGateway-mcp",
			Version: "0.1.0",
		},
	}

	writeResult(c, id, result)
}

func handleToolsList(c *gin.Context, id interface{}) {
	result := ToolsListResult{
		Tools: []ToolDef{
			{
				Name: "search_models",
				Description: "根据条件搜索数据，返回匹配记录的摘要列表（标题、摘要片段、docId）。" +
					" 仅返回关键信息，不含全文。需要查看某条记录的完整内容时，使用 get_document。",
				InputSchema: InputSchema{
					Type: "object",
					Properties: map[string]interface{}{
						"keywords": map[string]interface{}{
							"type": "array",
							"items": map[string]interface{}{
								"type": "string",
							},
							"description": "搜索关键词列表（[]string），多个关键词之间为 OR 关系。" +
								" 每个关键词会在数据记录的文本字段中进行包含匹配（忽略大小写）。" +
								" 不传或传空数组则不过滤。",
						},
						"type": map[string]interface{}{
							"type":        "string",
							"description": "数据类型，用于筛选指定类型的数据记录。目前仅支持 \"document\"。不传或传空字符串则不过滤。",
							"enum":        []string{"document"},
						},
						"tag": map[string]interface{}{
							"type": "array",
							"items": map[string]interface{}{
								"type": "string",
							},
							"description": "标签列表（[]string），多个标签之间为 AND 关系。" +
								" 用于精确筛选同时具有所有指定标签的数据记录。不传或传空数组则不过滤。",
						},
					},
				},
			},
			{
				Name:        "get_document",
				Description: "根据 docId 获取单条记录的完整内容。与 search_models 配合使用：先搜索拿到 docId，再调用此工具获取全文。",
				InputSchema: InputSchema{
					Type: "object",
					Properties: map[string]interface{}{
						"id": map[string]interface{}{
							"type":        "string",
							"description": "记录的唯一标识符，来自 search_models 返回结果中的 docId 字段。",
						},
					},
					Required: []string{"id"},
				},
			},
		},
	}
	writeResult(c, id, result)
}

func handleToolsCall(c *gin.Context, id interface{}, bodyBytes []byte) {
	var fullReq struct {
		Params ToolsCallRequest `json:"params"`
	}
	if err := json.Unmarshal(bodyBytes, &fullReq); err != nil {
		writeError(c, id, ErrInvalidParams, "failed to parse params: "+err.Error())
		return
	}

	switch fullReq.Params.Name {
	case "search_models":
		handleSearchModels(c, id, fullReq.Params.Arguments)
	case "get_document":
		handleGetDocument(c, id, fullReq.Params.Arguments)
	default:
		result := ToolsCallResult{
			Content: []ContentBlock{
				{Type: "text", Text: fmt.Sprintf("unknown tool: %s", fullReq.Params.Name)},
			},
			IsError: true,
		}
		writeResult(c, id, result)
	}
}

// ============================================================================
// 工具实现（SQLite 数据库查询）
// ============================================================================

func getDocDB(c *gin.Context) *dao.DocDB {
	db, _ := middleware.GetDocDB(c).(*dao.DocDB)
	return db
}

func handleSearchModels(c *gin.Context, id interface{}, args map[string]interface{}) {
	db := getDocDB(c)
	if db == nil {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: "database not available"}},
			IsError: true,
		})
		return
	}

	// 提取 keywords
	var keywords []string
	if raw, ok := args["keywords"]; ok {
		switch v := raw.(type) {
		case []interface{}:
			for _, item := range v {
				if s, ok := item.(string); ok {
					keywords = append(keywords, s)
				}
			}
		case []string:
			keywords = v
		}
	}

	// 获取共享的 Embedding 模型，对关键词做向量化
	var queryVec []float64
	if emb, ok := middleware.GetLoadBalancer(c).(*loadbalancer.Embedding); ok && len(keywords) > 0 {
		queryText := strings.Join(keywords, " ")
		if vec, err := emb.EmbedText(queryText); err == nil {
			queryVec = vec
		}
	}

	results, err := db.Search(keywords, queryVec, 20)
	if err != nil {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: fmt.Sprintf("search error: %v", err)}},
			IsError: true,
		})
		return
	}

	if len(results) == 0 {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: fmt.Sprintf(
				"未找到匹配记录。\n关键词: %v\n提示: 请确保已通过 /mcp/admin 导入文档。", keywords)}},
		})
		return
	}

	var lines []string
	lines = append(lines, fmt.Sprintf("找到 %d 条匹配记录:\n", len(results)))
	for i, r := range results {
		lines = append(lines, fmt.Sprintf("%d. %s", i+1, r.Title))
		lines = append(lines, fmt.Sprintf("   docId:   %s", r.ID))
		lines = append(lines, fmt.Sprintf("   摘要:   %s", r.Summary))
		if r.Score > 0 {
			lines = append(lines, fmt.Sprintf("   相关度: %.2f", r.Score))
		}
		if i < len(results)-1 {
			lines = append(lines, "")
		}
	}
	lines = append(lines, "")
	lines = append(lines, "使用 get_document 并传入 docId 可获取记录完整内容。")

	writeResult(c, id, ToolsCallResult{
		Content: []ContentBlock{{Type: "text", Text: strings.Join(lines, "\n")}},
	})
}

func handleGetDocument(c *gin.Context, id interface{}, args map[string]interface{}) {
	db := getDocDB(c)
	if db == nil {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: "database not available"}},
			IsError: true,
		})
		return
	}

	docID, _ := args["id"].(string)
	if docID == "" {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: "缺少必填参数 id。请从 search_models 的返回结果中获取目标记录的 docId。"}},
			IsError: true,
		})
		return
	}

	doc, err := db.GetByID(docID)
	if err != nil {
		writeResult(c, id, ToolsCallResult{
			Content: []ContentBlock{{Type: "text", Text: fmt.Sprintf("未找到 docId 为 %q 的记录。", docID)}},
			IsError: true,
		})
		return
	}

	var lines []string
	lines = append(lines, fmt.Sprintf("=== %s ===\n", doc.Title))
	lines = append(lines, fmt.Sprintf("ID:     %s", doc.ID))
	lines = append(lines, fmt.Sprintf("摘要:   %s", doc.Summary))
	lines = append(lines, fmt.Sprintf("内容:\n%s", doc.Content))

	writeResult(c, id, ToolsCallResult{
		Content: []ContentBlock{{Type: "text", Text: strings.Join(lines, "\n")}},
	})
}

// ============================================================================
// 响应辅助函数
// ============================================================================

func writeResult(c *gin.Context, id interface{}, result interface{}) {
	c.Header("Access-Control-Allow-Origin", "*")
	if id == nil {
		c.Status(http.StatusOK)
		return
	}
	c.JSON(http.StatusOK, JSONRPCResponse{
		JSONRPC: "2.0",
		ID:      id,
		Result:  result,
	})
}

func writeError(c *gin.Context, id interface{}, code int, message string) {
	c.Header("Access-Control-Allow-Origin", "*")
	if id == nil {
		c.Status(http.StatusOK)
		return
	}
	c.JSON(http.StatusOK, JSONRPCErrorResponse{
		JSONRPC: "2.0",
		ID:      id,
		Error: JSONRPCErrorObj{
			Code:    code,
			Message: message,
		},
	})
}

func generateSessionID() string {
	b := make([]byte, 16)
	rand.Read(b)
	return hex.EncodeToString(b)
}
