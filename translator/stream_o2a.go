package translator

import (
	"encoding/json"
	"fmt"
	"io"
	"time"
)

// streamO2ATranslator 将 Anthropic SSE 流翻译为 OpenAI SSE 流
type streamO2ATranslator struct {
	state       string
	msgID       string
	model       string
	created     int64
	inputTokens int

	// 当前内容块追踪
	blockIndex        int
	pendingToolCallID string
	pendingToolName   string
	emittedRole       bool
}

func (t *streamO2ATranslator) Info() Info {
	return Info{Direction: O2A, TargetPath: "/v1/messages"}
}

func (t *streamO2ATranslator) TranslateLine(line string, writer io.Writer) error {
	// 跳过空行和注释
	if line == "" || line[0] == ':' {
		if line == "" {
			// 空行在 SSE 中表示事件结束，透传
		}
		return nil
	}

	// 解析 event: 行
	if len(line) > 6 && line[:6] == "event:" {
		return nil // event type 我们通过 data 内容判断
	}

	// 解析 data: 行
	if len(line) <= 5 || line[:5] != "data:" {
		return nil
	}

	dataJSON := line[5:]
	if len(dataJSON) > 0 && dataJSON[0] == ' ' {
		dataJSON = dataJSON[1:]
	}

	var event map[string]interface{}
	if err := json.Unmarshal([]byte(dataJSON), &event); err != nil {
		// 不是有效 JSON，透传 -- 但 OpenAI 期望 JSON，跳过
		return nil
	}

	eventType, _ := event["type"].(string)

	switch eventType {
	case "message_start":
		return t.handleMessageStart(event, writer)
	case "content_block_start":
		return t.handleContentBlockStart(event, writer)
	case "content_block_delta":
		return t.handleContentBlockDelta(event, writer)
	case "content_block_stop":
		return t.handleContentBlockStop(event, writer)
	case "message_delta":
		return t.handleMessageDelta(event, writer)
	case "message_stop":
		return t.handleMessageStop(event, writer)
	case "ping":
		return nil // ping 忽略
	}

	return nil
}

func (t *streamO2ATranslator) Finalize(writer io.Writer) error {
	_, err := fmt.Fprintf(writer, "data: [DONE]\n\n")
	return err
}

// handleMessageStart 处理 Anthropic message_start 事件
func (t *streamO2ATranslator) handleMessageStart(event map[string]interface{}, writer io.Writer) error {
	if msg, ok := event["message"].(map[string]interface{}); ok {
		t.msgID, _ = msg["id"].(string)
		t.model, _ = msg["model"].(string)
		if usage, ok := msg["usage"].(map[string]interface{}); ok {
			if it, ok := usage["input_tokens"].(float64); ok {
				t.inputTokens = int(it)
			}
		}
	}
	t.created = time.Now().Unix()
	t.state = "IN_MESSAGE"
	t.emittedRole = false
	t.blockIndex = 0
	return nil
}

// handleContentBlockStart 处理 content_block_start
func (t *streamO2ATranslator) handleContentBlockStart(event map[string]interface{}, writer io.Writer) error {
	idx, _ := event["index"].(float64)
	t.blockIndex = int(idx)

	block, _ := event["content_block"].(map[string]interface{})
	if block == nil {
		return nil
	}

	blockType, _ := block["type"].(string)

	switch blockType {
	case "text":
		return t.emitRoleIfNeeded(writer)
	case "tool_use":
		t.pendingToolCallID, _ = block["id"].(string)
		t.pendingToolName, _ = block["name"].(string)
		return t.emitToolCallStart(writer)
	}

	return nil
}

// handleContentBlockDelta 处理 content_block_delta
func (t *streamO2ATranslator) handleContentBlockDelta(event map[string]interface{}, writer io.Writer) error {
	delta, _ := event["delta"].(map[string]interface{})
	if delta == nil {
		return nil
	}

	deltaType, _ := delta["type"].(string)

	switch deltaType {
	case "text_delta":
		text, _ := delta["text"].(string)
		return t.emitContentDelta(writer, text)
	case "input_json_delta":
		partial, _ := delta["partial_json"].(string)
		return t.emitToolCallArgDelta(writer, partial)
	}

	return nil
}

// handleContentBlockStop 处理 content_block_stop
func (t *streamO2ATranslator) handleContentBlockStop(event map[string]interface{}, writer io.Writer) error {
	// 结束当前 tool_call 的 arguments（如果有的话）
	return nil
}

// handleMessageDelta 处理 message_delta
func (t *streamO2ATranslator) handleMessageDelta(event map[string]interface{}, writer io.Writer) error {
	delta, _ := event["delta"].(map[string]interface{})
	usage, _ := event["usage"].(map[string]interface{})

	stopReason, _ := delta["stop_reason"].(string)
	finishReason := mapStopReason(stopReason)

	var outputTokens int
	if ot, ok := usage["output_tokens"].(float64); ok {
		outputTokens = int(ot)
	}

	chunk := map[string]interface{}{
		"id":      t.msgID,
		"object":  "chat.completion.chunk",
		"created": t.created,
		"model":   t.model,
		"choices": []map[string]interface{}{
			{
				"index":         0,
				"delta":         map[string]interface{}{},
				"finish_reason": finishReason,
			},
		},
	}

	if outputTokens > 0 {
		chunk["usage"] = map[string]interface{}{
			"prompt_tokens":     t.inputTokens,
			"completion_tokens": outputTokens,
			"total_tokens":      t.inputTokens + outputTokens,
		}
	}

	data, _ := json.Marshal(chunk)
	fmt.Fprintf(writer, "data: %s\n\n", string(data))
	t.state = "FINALIZING"
	return nil
}

// handleMessageStop 处理 message_stop
func (t *streamO2ATranslator) handleMessageStop(event map[string]interface{}, writer io.Writer) error {
	t.state = "DONE"
	return nil
}

// emitRoleIfNeeded 首次文本 delta 前发送 role: assistant
func (t *streamO2ATranslator) emitRoleIfNeeded(writer io.Writer) error {
	if t.emittedRole {
		return nil
	}
	t.emittedRole = true

	chunk := map[string]interface{}{
		"id":      t.msgID,
		"object":  "chat.completion.chunk",
		"created": t.created,
		"model":   t.model,
		"choices": []map[string]interface{}{
			{
				"index": 0,
				"delta": map[string]interface{}{
					"role": "assistant",
				},
				"finish_reason": nil,
			},
		},
	}
	data, _ := json.Marshal(chunk)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(data))
	return err
}

// emitContentDelta 发送内容增量
func (t *streamO2ATranslator) emitContentDelta(writer io.Writer, text string) error {
	chunk := map[string]interface{}{
		"id":      t.msgID,
		"object":  "chat.completion.chunk",
		"created": t.created,
		"model":   t.model,
		"choices": []map[string]interface{}{
			{
				"index": 0,
				"delta": map[string]interface{}{
					"content": text,
				},
				"finish_reason": nil,
			},
		},
	}
	data, _ := json.Marshal(chunk)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(data))
	return err
}

// emitToolCallStart 发送 tool_calls 起始块
func (t *streamO2ATranslator) emitToolCallStart(writer io.Writer) error {
	t.emittedRole = true // tool_call 也需要 role

	chunk := map[string]interface{}{
		"id":      t.msgID,
		"object":  "chat.completion.chunk",
		"created": t.created,
		"model":   t.model,
		"choices": []map[string]interface{}{
			{
				"index": 0,
				"delta": map[string]interface{}{
					"role": "assistant",
					"tool_calls": []map[string]interface{}{
						{
							"index":    t.blockIndex,
							"id":       t.pendingToolCallID,
							"type":     "function",
							"function": map[string]interface{}{"name": t.pendingToolName, "arguments": ""},
						},
					},
				},
				"finish_reason": nil,
			},
		},
	}
	data, _ := json.Marshal(chunk)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(data))
	return err
}

// emitToolCallArgDelta 发送 tool_calls function.arguments 增量
func (t *streamO2ATranslator) emitToolCallArgDelta(writer io.Writer, partialJSON string) error {
	chunk := map[string]interface{}{
		"id":      t.msgID,
		"object":  "chat.completion.chunk",
		"created": t.created,
		"model":   t.model,
		"choices": []map[string]interface{}{
			{
				"index": 0,
				"delta": map[string]interface{}{
					"tool_calls": []map[string]interface{}{
						{
							"index":    t.blockIndex,
							"function": map[string]interface{}{"arguments": partialJSON},
						},
					},
				},
				"finish_reason": nil,
			},
		},
	}
	data, _ := json.Marshal(chunk)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(data))
	return err
}
