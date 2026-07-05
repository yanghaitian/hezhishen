package schema

// ==================== Messages ====================

// MessageRequest Anthropic Messages API 请求
type MessageRequest struct {
	Model         string                 `json:"model"`
	Messages      []Message              `json:"messages"`
	System        interface{}            `json:"system,omitempty"`
	MaxTokens     int                    `json:"max_tokens"`
	Temperature   *float64               `json:"temperature,omitempty"`
	TopP          *float64               `json:"top_p,omitempty"`
	TopK          *int                   `json:"top_k,omitempty"`
	StopSequences []string               `json:"stop_sequences,omitempty"`
	Stream        bool                   `json:"stream,omitempty"`
	Tools         []AnthropicTool        `json:"tools,omitempty"`
	ToolChoice    interface{}            `json:"tool_choice,omitempty"`
	Metadata      map[string]interface{} `json:"metadata,omitempty"`
}

// Message 对话消息
type Message struct {
	Role    string      `json:"role"`
	Content interface{} `json:"content"`
}

// ContentBlock 消息内容块
type ContentBlock struct {
	Type      string       `json:"type"`
	Text      string       `json:"text,omitempty"`
	Source    *ImageSource `json:"source,omitempty"`
	ID        string       `json:"id,omitempty"`
	Name      string       `json:"name,omitempty"`
	Input     interface{}  `json:"input,omitempty"`
	ToolUseID string       `json:"tool_use_id,omitempty"`
	Content   interface{}  `json:"content,omitempty"`
	IsError   bool         `json:"is_error,omitempty"`
	Thinking  string       `json:"thinking,omitempty"`
	Signature string       `json:"signature,omitempty"`
}

// ImageSource 图片来源
type ImageSource struct {
	Type      string `json:"type"`
	MediaType string `json:"media_type"`
	Data      string `json:"data,omitempty"`
	URL       string `json:"url,omitempty"`
}

// AnthropicTool Anthropic 工具定义
type AnthropicTool struct {
	Name        string      `json:"name"`
	Description string      `json:"description,omitempty"`
	InputSchema interface{} `json:"input_schema"`
}

// TextBlock 纯文本块
type TextBlock struct {
	Type string `json:"type"`
	Text string `json:"text"`
}

// MessageResponse Anthropic Messages API 响应
type MessageResponse struct {
	ID           string          `json:"id"`
	Type         string          `json:"type"`
	Role         string          `json:"role"`
	Content      []ContentBlock  `json:"content"`
	Model        string          `json:"model"`
	StopReason   string          `json:"stop_reason"`
	StopSequence string          `json:"stop_sequence,omitempty"`
	Usage        *AnthropicUsage `json:"usage"`
}

// AnthropicUsage Anthropic token 用量
type AnthropicUsage struct {
	InputTokens              int `json:"input_tokens"`
	OutputTokens             int `json:"output_tokens"`
	CacheCreationInputTokens int `json:"cache_creation_input_tokens,omitempty"`
	CacheReadInputTokens     int `json:"cache_read_input_tokens,omitempty"`
}

// ==================== Message Batches ====================

// MessageBatchRequest 创建批量消息请求
type MessageBatchRequest struct {
	Requests []MessageBatchItem `json:"requests"`
}

// MessageBatchItem 单个批量子请求
type MessageBatchItem struct {
	CustomID string         `json:"custom_id"`
	Params   MessageRequest `json:"params"`
}

// MessageBatchResponse 批量消息响应
type MessageBatchResponse struct {
	ID                string              `json:"id"`
	Type              string              `json:"type"`
	ProcessingStatus  string              `json:"processing_status"`
	RequestCounts     *BatchRequestCounts `json:"request_counts,omitempty"`
	EndedAt           string              `json:"ended_at,omitempty"`
	CreatedAt         string              `json:"created_at"`
	ExpiresAt         string              `json:"expires_at"`
	ArchivedAt        string              `json:"archived_at,omitempty"`
	CancelInitiatedAt string              `json:"cancel_initiated_at,omitempty"`
}

// BatchRequestCounts 批量请求计数
type BatchRequestCounts struct {
	Processing int `json:"processing"`
	Succeeded  int `json:"succeeded"`
	Errored    int `json:"errored"`
	Canceled   int `json:"canceled"`
	Expired    int `json:"expired"`
}

// ==================== Token 管理 ====================

// TokenCountRequest token 计数请求
type TokenCountRequest struct {
	Model    string          `json:"model"`
	Messages []Message       `json:"messages"`
	System   interface{}     `json:"system,omitempty"`
	Tools    []AnthropicTool `json:"tools,omitempty"`
}

// TokenCountResponse token 计数响应
type TokenCountResponse struct {
	InputTokens int `json:"input_tokens"`
}

// TokenEncodeRequest token 编码请求
type TokenEncodeRequest struct {
	Model string `json:"model"`
	Text  string `json:"text"`
}

// TokenEncodeResponse token 编码响应
type TokenEncodeResponse struct {
	Tokens []int  `json:"tokens"`
	Model  string `json:"model"`
}

// TokenDecodeRequest token 解码请求
type TokenDecodeRequest struct {
	Model  string `json:"model"`
	Tokens []int  `json:"tokens"`
}

// TokenDecodeResponse token 解码响应
type TokenDecodeResponse struct {
	Text  string `json:"text"`
	Model string `json:"model"`
}

// ==================== Models ====================

// AnthropicModelObject 模型对象
type AnthropicModelObject struct {
	ID          string `json:"id"`
	Type        string `json:"type"`
	DisplayName string `json:"display_name"`
	CreatedAt   string `json:"created_at"`
}

// AnthropicModelList 模型列表响应
type AnthropicModelList struct {
	Data    []AnthropicModelObject `json:"data"`
	HasMore bool                   `json:"has_more"`
	FirstID string                 `json:"first_id,omitempty"`
	LastID  string                 `json:"last_id,omitempty"`
}
