package v1

import "htAiGateway/schema"

// 从共享 schema 包重新导出类型
type (
	MessageRequest       = schema.MessageRequest
	Message              = schema.Message
	ContentBlock         = schema.ContentBlock
	ImageSource          = schema.ImageSource
	Tool                 = schema.AnthropicTool
	TextBlock            = schema.TextBlock
	MessageResponse      = schema.MessageResponse
	Usage                = schema.AnthropicUsage
	MessageBatchRequest  = schema.MessageBatchRequest
	MessageBatchItem     = schema.MessageBatchItem
	MessageBatchResponse = schema.MessageBatchResponse
	BatchRequestCounts   = schema.BatchRequestCounts
	TokenCountRequest    = schema.TokenCountRequest
	TokenCountResponse   = schema.TokenCountResponse
	TokenEncodeRequest   = schema.TokenEncodeRequest
	TokenEncodeResponse  = schema.TokenEncodeResponse
	TokenDecodeRequest   = schema.TokenDecodeRequest
	TokenDecodeResponse  = schema.TokenDecodeResponse
	ModelObject          = schema.AnthropicModelObject
	ModelList            = schema.AnthropicModelList
)
