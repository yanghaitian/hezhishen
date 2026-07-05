package translator

import (
	"encoding/json"
	"fmt"
	"time"

	"htAiGateway/schema"
)

// o2aTranslator 实现 OpenAI → Anthropic 协议翻译（非流式）
type o2aTranslator struct{}

func (t *o2aTranslator) Info() Info {
	return Info{Direction: O2A, TargetPath: "/v1/messages"}
}

// TranslateRequest 将 OpenAI ChatCompletionRequest → Anthropic MessageRequest
func (t *o2aTranslator) TranslateRequest(body []byte, modelName string) ([]byte, error) {
	var req schema.ChatCompletionRequest
	if err := json.Unmarshal(body, &req); err != nil {
		return nil, fmt.Errorf("parse openai request: %w", err)
	}

	// 分离 system 消息和对话消息
	var systemBlocks []schema.TextBlock
	var messages []schema.Message

	for _, msg := range req.Messages {
		switch msg.Role {
		case "system":
			// System 消息转为 Anthropic system 字段
			if text, ok := msg.Content.(string); ok {
				systemBlocks = append(systemBlocks, schema.TextBlock{
					Type: "text",
					Text: text,
				})
			} else {
				// 多模态 content 暂不处理，尝试序列化
				systemBlocks = append(systemBlocks, schema.TextBlock{
					Type: "text",
					Text: fmt.Sprintf("%v", msg.Content),
				})
			}
		case "user":
			messages = append(messages, schema.Message{
				Role:    "user",
				Content: convertOpenAIContent(msg.Content),
			})
		case "assistant":
			content := convertAssistantContent(msg)
			messages = append(messages, schema.Message{
				Role:    "assistant",
				Content: content,
			})
		case "tool":
			// OpenAI tool 消息 → Anthropic user 消息 with tool_result block
			messages = append(messages, schema.Message{
				Role: "user",
				Content: []schema.ContentBlock{
					{
						Type:      "tool_result",
						ToolUseID: msg.ToolCallID,
						Content:   msg.Content,
					},
				},
			})
		}
	}

	// 构建 Anthropic 请求
	antReq := schema.MessageRequest{
		Model:     modelName, // 使用后端真实的模型名
		Messages:  messages,
		MaxTokens: 4096, // Anthropic 必需字段
	}

	// 设置 system
	if len(systemBlocks) > 0 {
		antReq.System = systemBlocks
	}

	// 映射参数
	if req.Temperature != nil {
		antReq.Temperature = req.Temperature
	}
	if req.TopP != nil {
		antReq.TopP = req.TopP
	}
	if req.MaxTokens != nil {
		antReq.MaxTokens = *req.MaxTokens
	} else if req.MaxCompletionTokens != nil {
		antReq.MaxTokens = *req.MaxCompletionTokens
	}
	if req.Stop != nil {
		switch v := req.Stop.(type) {
		case string:
			antReq.StopSequences = []string{v}
		case []interface{}:
			for _, s := range v {
				if str, ok := s.(string); ok {
					antReq.StopSequences = append(antReq.StopSequences, str)
				}
			}
		}
	}
	antReq.Stream = req.Stream

	// 转换 Tools
	if len(req.Tools) > 0 {
		antReq.Tools = convertToolsO2A(req.Tools)
		if req.ToolChoice != nil {
			antReq.ToolChoice = convertToolChoiceO2A(req.ToolChoice)
		}
	}

	return json.Marshal(antReq)
}

// TranslateResponse 将 Anthropic MessageResponse → OpenAI ChatCompletionResponse
func (t *o2aTranslator) TranslateResponse(body []byte, modelName string) ([]byte, error) {
	var resp schema.MessageResponse
	if err := json.Unmarshal(body, &resp); err != nil {
		return nil, fmt.Errorf("parse anthropic response: %w", err)
	}

	openaiResp := schema.ChatCompletionResponse{
		ID:      resp.ID,
		Object:  "chat.completion",
		Created: time.Now().Unix(),
		Model:   modelName, // 使用客户端请求的虚拟模型名
	}

	// 分配 content 到 choices
	choice := schema.ChatChoice{
		Index:        0,
		FinishReason: mapStopReason(resp.StopReason),
	}

	var textContent string
	var toolCalls []schema.ToolCall

	for _, block := range resp.Content {
		switch block.Type {
		case "text":
			textContent += block.Text
		case "tool_use":
			toolCalls = append(toolCalls, schema.ToolCall{
				ID:   block.ID,
				Type: "function",
				Function: schema.FunctionCall{
					Name:      block.Name,
					Arguments: fmt.Sprintf("%v", block.Input),
				},
			})
		}
	}

	if len(toolCalls) > 0 {
		choice.Message = &schema.ChatMessage{
			Role:      "assistant",
			Content:   textContent,
			ToolCalls: toolCalls,
		}
	} else {
		choice.Message = &schema.ChatMessage{
			Role:    "assistant",
			Content: textContent,
		}
	}

	openaiResp.Choices = []schema.ChatChoice{choice}

	// 映射 usage
	if resp.Usage != nil {
		openaiResp.Usage = &schema.Usage{
			PromptTokens:     resp.Usage.InputTokens,
			CompletionTokens: resp.Usage.OutputTokens,
			TotalTokens:      resp.Usage.InputTokens + resp.Usage.OutputTokens,
		}
	}

	return json.Marshal(openaiResp)
}

// ==================== 辅助转换函数 ====================

// convertOpenAIContent 将 OpenAI content 字段转为 Anthropic content 格式
func convertOpenAIContent(content interface{}) interface{} {
	switch v := content.(type) {
	case string:
		return v
	case []interface{}:
		var blocks []schema.ContentBlock
		for _, part := range v {
			if partMap, ok := part.(map[string]interface{}); ok {
				blockType, _ := partMap["type"].(string)
				switch blockType {
				case "text":
					text, _ := partMap["text"].(string)
					blocks = append(blocks, schema.ContentBlock{
						Type: "text",
						Text: text,
					})
				case "image_url":
					if imgURL, ok := partMap["image_url"].(map[string]interface{}); ok {
						url, _ := imgURL["url"].(string)
						blocks = append(blocks, schema.ContentBlock{
							Type: "image",
							Source: &schema.ImageSource{
								Type:      "url",
								MediaType: "image/jpeg",
								URL:       url,
							},
						})
					}
				}
			}
		}
		return blocks
	default:
		return fmt.Sprintf("%v", content)
	}
}

// convertAssistantContent 将 assistant 消息转为 Anthropic content
func convertAssistantContent(msg schema.ChatMessage) interface{} {
	// 如果有 tool_calls，需要同时包含文本和 tool_use blocks
	if len(msg.ToolCalls) > 0 {
		var blocks []schema.ContentBlock
		if text, ok := msg.Content.(string); ok && text != "" {
			blocks = append(blocks, schema.ContentBlock{
				Type: "text",
				Text: text,
			})
		}
		for _, tc := range msg.ToolCalls {
			blocks = append(blocks, schema.ContentBlock{
				Type:  "tool_use",
				ID:    tc.ID,
				Name:  tc.Function.Name,
				Input: parseJSONString(tc.Function.Arguments),
			})
		}
		return blocks
	}
	return convertOpenAIContent(msg.Content)
}

// convertToolsO2A OpenAI tools → Anthropic tools
func convertToolsO2A(tools []schema.Tool) []schema.AnthropicTool {
	var result []schema.AnthropicTool
	for _, t := range tools {
		if t.Type == "function" {
			result = append(result, schema.AnthropicTool{
				Name:        t.Function.Name,
				Description: t.Function.Description,
				InputSchema: t.Function.Parameters,
			})
		}
	}
	return result
}

// convertToolChoiceO2A OpenAI tool_choice → Anthropic tool_choice
func convertToolChoiceO2A(toolChoice interface{}) interface{} {
	switch v := toolChoice.(type) {
	case string:
		switch v {
		case "auto", "any", "none":
			return map[string]string{"type": v}
		case "required":
			return map[string]string{"type": "any"}
		default:
			return map[string]string{"type": "auto"}
		}
	case map[string]interface{}:
		if t, ok := v["type"].(string); ok && t == "function" {
			if fn, ok := v["function"].(map[string]interface{}); ok {
				if name, ok := fn["name"].(string); ok {
					return map[string]interface{}{
						"type": "tool",
						"name": name,
					}
				}
			}
		}
	}
	return map[string]string{"type": "auto"}
}

// mapStopReason Anthropic stop_reason → OpenAI finish_reason
func mapStopReason(reason string) string {
	switch reason {
	case "end_turn":
		return "stop"
	case "max_tokens":
		return "length"
	case "stop_sequence":
		return "stop"
	case "tool_use":
		return "tool_calls"
	default:
		return "stop"
	}
}

// parseJSONString 尝试解析 JSON 字符串，失败则返回原文
func parseJSONString(s string) interface{} {
	var result interface{}
	if err := json.Unmarshal([]byte(s), &result); err != nil {
		return s
	}
	return result
}
