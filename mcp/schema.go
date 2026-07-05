package mcp

// ============================================================================
// JSON-RPC 2.0 基础类型
// ============================================================================

// JSONRPCRequest JSON-RPC 2.0 请求。
type JSONRPCRequest struct {
	JSONRPC string      `json:"jsonrpc"`          // 固定 "2.0"
	ID      interface{} `json:"id,omitempty"`     // 请求 ID，通知时省略
	Method  string      `json:"method"`           // 方法名，如 "tools/call"
	Params  interface{} `json:"params,omitempty"` // 方法参数，类型视方法而定
}

// JSONRPCResponse JSON-RPC 2.0 成功响应。
type JSONRPCResponse struct {
	JSONRPC string      `json:"jsonrpc"` // 固定 "2.0"
	ID      interface{} `json:"id"`      // 对应请求的 ID
	Result  interface{} `json:"result"`  // 方法返回结果
}

// JSONRPCErrorObj JSON-RPC 2.0 错误对象。
type JSONRPCErrorObj struct {
	Code    int         `json:"code"`           // 错误码（-32700 ~ -32603）
	Message string      `json:"message"`        // 错误描述
	Data    interface{} `json:"data,omitempty"` // 附加错误信息
}

// JSONRPCErrorResponse JSON-RPC 2.0 错误响应。
type JSONRPCErrorResponse struct {
	JSONRPC string          `json:"jsonrpc"` // 固定 "2.0"
	ID      interface{}     `json:"id"`      // 对应请求的 ID
	Error   JSONRPCErrorObj `json:"error"`   // 错误详情
}

// ============================================================================
// JSON-RPC 标准错误码
// ============================================================================

const (
	ErrParseError     = -32700
	ErrInvalidRequest = -32600
	ErrMethodNotFound = -32601
	ErrInvalidParams  = -32602
	ErrInternalError  = -32603
)

// ============================================================================
// MCP 协议常量
// ============================================================================

const (
	ProtocolVersion = "2024-11-05"

	MethodInitialize  = "initialize"
	MethodInitialized = "notifications/initialized"
	MethodPing        = "ping"
	MethodToolsList   = "tools/list"
	MethodToolsCall   = "tools/call"
)

// ============================================================================
// Initialize 握手
// ============================================================================

// ClientCapabilities 客户端能力声明
type ClientCapabilities struct{}

// ServerCapabilities 服务端能力声明。
type ServerCapabilities struct {
	Tools *ToolsCapability `json:"tools,omitempty"` // 工具能力，非 nil 表示支持 tools/list 和 tools/call
}

// ToolsCapability 工具能力。
type ToolsCapability struct {
	ListChanged bool `json:"listChanged,omitempty"` // 是否支持工具列表变更通知
}

// ImplementationInfo MCP 实现信息。
type ImplementationInfo struct {
	Name    string `json:"name"`    // 实现名称
	Version string `json:"version"` // 版本号
}

// InitializeRequest 客户端初始化请求参数。
type InitializeRequest struct {
	ProtocolVersion string             `json:"protocolVersion"` // MCP 协议版本，当前 "2024-11-05"
	Capabilities    ClientCapabilities `json:"capabilities"`    // 客户端能力
	ClientInfo      ImplementationInfo `json:"clientInfo"`      // 客户端信息
}

// InitializeResult 服务端初始化响应。
type InitializeResult struct {
	ProtocolVersion string             `json:"protocolVersion"` // 协商后的协议版本
	Capabilities    ServerCapabilities `json:"capabilities"`    // 服务端能力
	ServerInfo      ImplementationInfo `json:"serverInfo"`      // 服务端信息
}

// ============================================================================
// Tools 工具相关
// ============================================================================

// ToolDef MCP 工具定义，在 tools/list 响应中返回。
type ToolDef struct {
	Name        string      `json:"name"`                  // 工具名称，tools/call 用此名调用
	Description string      `json:"description,omitempty"` // 工具功能描述，供 AI 理解何时调用
	InputSchema InputSchema `json:"inputSchema"`           // 输入参数的 JSON Schema
}

// InputSchema 工具输入参数的 JSON Schema。
type InputSchema struct {
	Type       string                 `json:"type"`                 // 固定 "object"
	Properties map[string]interface{} `json:"properties,omitempty"` // 参数字段定义
	Required   []string               `json:"required,omitempty"`   // 必填字段列表
}

// ToolsListResult tools/list 方法的响应。
type ToolsListResult struct {
	Tools []ToolDef `json:"tools"` // 可用工具列表
}

// ToolsCallRequest tools/call 方法的请求参数。
type ToolsCallRequest struct {
	Name      string                 `json:"name"`                // 要调用的工具名称
	Arguments map[string]interface{} `json:"arguments,omitempty"` // 工具参数键值对
}

// ToolsCallResult tools/call 方法的响应。
type ToolsCallResult struct {
	Content []ContentBlock `json:"content"`           // 工具返回的内容块列表
	IsError bool           `json:"isError,omitempty"` // 是否执行出错
}

// ContentBlock MCP 内容块，支持文本、图片、资源引用三种类型。
type ContentBlock struct {
	Type     string `json:"type"`               // 内容类型："text" / "image" / "resource"
	Text     string `json:"text,omitempty"`     // type=text 时的文本内容
	Data     string `json:"data,omitempty"`     // type=image 时的 base64 图片数据
	MimeType string `json:"mimeType,omitempty"` // type=image/resource 时的 MIME 类型
}

// ============================================================================
// Ping
// ============================================================================

// PingResult ping 响应（空对象）
type PingResult struct{}
