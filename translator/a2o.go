package translator

import (
	"encoding/json"
	"fmt"

	"htAiGateway/schema"
)

// a2oTranslator 实现 Anthropic → OpenAI 协议翻译（非流式）
type a2oTranslator struct{}

func (t *a2oTranslator) Info() Info {
	return Info{Direction: A2O, TargetPath: "/v1/chat/completions"}
}

// TranslateRequest 将 Anthropic MessageRequest → OpenAI ChatCompletionRequest
func (t *a2oTranslator) TranslateRequest(body []byte, modelName string) ([]byte, error) {
	var req schema.MessageRequest
	if err := json.Unmarshal(body, &req); err != nil {
		return nil, fmt.Errorf("parse anthropic request: %w", err)
	}

	// 构建 OpenAI 请求
	openaiReq := schema.ChatCompletionRequest{
		Model:  modelName, // 使用后端真实的模型名
		Stream: req.Stream,
	}

	// 转换 system 字段为 system 消息
	if req.System != nil {
		switch v := req.System.(type) {
		case string:
			openaiReq.Messages = append(openaiReq.Messages, schema.ChatMessage{
				Role:    "system",
				Content: v,
			})
		case []interface{}:
			for _, block := range v {
				if blockMap, ok := block.(map[string]interface{}); ok {
					if blockType, _ := blockMap["type"].(string); blockType == "text" {
						text, _ := blockMap["text"].(string)
						openaiReq.Messages = append(openaiReq.Messages, schema.ChatMessage{
							Role:    "system",
							Content: text,
						})
					}
				}
			}
		}
	}

	// 转换消息
	for _, msg := range req.Messages {
		openaiMsg := schema.ChatMessage{
			Role:    msg.Role, // "user" | "assistant"
			Content: convertAnthropicContent(msg.Content),
		}
		openaiReq.Messages = append(openaiReq.Messages, openaiMsg)
	}

	// 映射参数
	if req.Temperature != nil {
		openaiReq.Temperature = req.Temperature
	}
	if req.TopP != nil {
		openaiReq.TopP = req.TopP
	}
	openaiReq.MaxTokens = &req.MaxTokens
	if len(req.StopSequences) > 0 {
		if len(req.StopSequences) == 1 {
			openaiReq.Stop = req.StopSequences[0]
		} else {
			openaiReq.Stop = req.StopSequences
		}
	}

	// 转换 Tools
	if len(req.Tools) > 0 {
		openaiReq.Tools = convertToolsA2O(req.Tools)
		openaiReq.ToolChoice = convertToolChoiceA2O(req.ToolChoice)
	}

	return json.Marshal(openaiReq)
}

// TranslateResponse 将 OpenAI ChatCompletionResponse → Anthropic MessageResponse
func (t *a2oTranslator) TranslateResponse(body []byte, modelName string) ([]byte, error) {
	var resp schema.ChatCompletionResponse
	if err := json.Unmarshal(body, &resp); err != nil {
		return nil, fmt.Errorf("parse openai response: %w", err)
	}

	antResp := schema.MessageResponse{
		ID:    resp.ID,
		Type:  "message",
		Role:  "assistant",
		Model: modelName, // 使用客户端请求的虚拟模型名
	}

	// 转换 choices
	if len(resp.Choices) > 0 {
		choice := resp.Choices[0]
		antResp.StopReason = mapFinishReason(choice.FinishReason)

		if choice.Message != nil {
			// 文本内容
			if text, ok := choice.Message.Content.(string); ok && text != "" {
				antResp.Content = append(antResp.Content, schema.ContentBlock{
					Type: "text",
					Text: text,
				})
			}

			// 工具调用
			for _, tc := range choice.Message.ToolCalls {
				antResp.Content = append(antResp.Content, schema.ContentBlock{
					Type:  "tool_use",
					ID:    tc.ID,
					Name:  tc.Function.Name,
					Input: parseJSONString(tc.Function.Arguments),
				})
			}
		}
	}

	// 映射 usage
	if resp.Usage != nil {
		antResp.Usage = &schema.AnthropicUsage{
			InputTokens:  resp.Usage.PromptTokens,
			OutputTokens: resp.Usage.CompletionTokens,
		}
	}

	return json.Marshal(antResp)
}

// ==================== A2O 辅助转换 ====================

// convertAnthropicContent 将 Anthropic content 转为 OpenAI content 格式
func convertAnthropicContent(content interface{}) interface{} {
	switch v := content.(type) {
	case string:
		return v
	case []interface{}:
		var textParts []schema.ContentPart
		for _, block := range v {
			if blockMap, ok := block.(map[string]interface{}); ok {
				blockType, _ := blockMap["type"].(string)
				switch blockType {
				case "text":
					text, _ := blockMap["text"].(string)
					textParts = append(textParts, schema.ContentPart{
						Type: "text",
						Text: text,
					})
				case "image":
					if source, ok := blockMap["source"].(map[string]interface{}); ok {
						url, _ := source["url"].(string)
						textParts = append(textParts, schema.ContentPart{
							Type: "image_url",
							ImageURL: &schema.ImageURL{
								URL: url,
							},
						})
					}
				case "tool_use":
					// tool_use 不在用户消息中出现，跳过
				case "tool_result":
					// 在请求中不处理 tool_result
				}
			}
		}
		if len(textParts) > 0 {
			return textParts
		}
		// 如果只有纯文本，压缩为字符串
		var texts string
		for _, p := range textParts {
			if p.Type == "text" {
				texts += p.Text
			}
		}
		return texts
	default:
		return fmt.Sprintf("%v", content)
	}
}

// convertToolsA2O Anthropic tools → OpenAI tools
func convertToolsA2O(tools []schema.AnthropicTool) []schema.Tool {
	var result []schema.Tool
	for _, t := range tools {
		result = append(result, schema.Tool{
			Type: "function",
			Function: schema.FunctionDef{
				Name:        t.Name,
				Description: t.Description,
				Parameters:  t.InputSchema,
			},
		})
	}
	return result
}

// convertToolChoiceA2O Anthropic tool_choice → OpenAI tool_choice
func convertToolChoiceA2O(toolChoice interface{}) interface{} {
	if toolChoice == nil {
		return nil
	}
	switch v := toolChoice.(type) {
	case string:
		switch v {
		case "auto":
			return "auto"
		case "any":
			return "required"
		default:
			return "auto"
		}
	case map[string]interface{}:
		t, _ := v["type"].(string)
		if t == "tool" {
			name, _ := v["name"].(string)
			return map[string]interface{}{
				"type": "function",
				"function": map[string]string{
					"name": name,
				},
			}
		}
		return v
	}
	return "auto"
}

// mapFinishReason OpenAI finish_reason → Anthropic stop_reason
func mapFinishReason(reason string) string {
	switch reason {
	case "stop":
		return "end_turn"
	case "length":
		return "max_tokens"
	case "tool_calls":
		return "tool_use"
	default:
		return "end_turn"
	}
}
