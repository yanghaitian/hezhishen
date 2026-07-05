package v1

import "htAiGateway/schema"

// 从共享 schema 包重新导出类型
type (
	ChatCompletionRequest   = schema.ChatCompletionRequest
	ChatMessage             = schema.ChatMessage
	ContentPart             = schema.ContentPart
	ImageURL                = schema.ImageURL
	StreamOptions           = schema.StreamOptions
	FunctionDef             = schema.FunctionDef
	Tool                    = schema.Tool
	ResponseFormat          = schema.ResponseFormat
	ToolCall                = schema.ToolCall
	FunctionCall            = schema.FunctionCall
	ChatCompletionResponse  = schema.ChatCompletionResponse
	ChatChoice              = schema.ChatChoice
	ChatDelta               = schema.ChatDelta
	Usage                   = schema.Usage
	CompletionTokensDetails = schema.CompletionTokensDetails
	PromptTokensDetails     = schema.PromptTokensDetails
	EmbeddingRequest        = schema.EmbeddingRequest
	EmbeddingResponse       = schema.EmbeddingResponse
	Embedding               = schema.Embedding
	ModelObject             = schema.ModelObject
	ModelList               = schema.ModelList
	ModerationRequest       = schema.ModerationRequest
)
