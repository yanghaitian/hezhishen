package translator

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"
	"time"
)

// streamA2OTranslator 将 OpenAI SSE 流翻译为 Anthropic SSE 流
type streamA2OTranslator struct {
	state     string
	msgID     string
	model     string
	createdAt string

	// 当前内容块追踪
	blockIndex        int
	currentBlockType  string // "text" | "tool_use"
	currentToolCallID string
	currentToolName   string
	contentStarted    bool
	messageStarted    bool
}

func (t *streamA2OTranslator) Info() Info {
	return Info{Direction: A2O, TargetPath: "/v1/chat/completions"}
}

func (t *streamA2OTranslator) TranslateLine(line string, writer io.Writer) error {
	if line == "" {
		return nil
	}

	// 处理 [DONE]
	if strings.TrimSpace(line) == "data: [DONE]" {
		return t.handleDone(writer)
	}

	if len(line) <= 5 || line[:5] != "data:" {
		return nil
	}

	dataJSON := line[5:]
	if len(dataJSON) > 0 && dataJSON[0] == ' ' {
		dataJSON = dataJSON[1:]
	}

	var chunk map[string]interface{}
	if err := json.Unmarshal([]byte(dataJSON), &chunk); err != nil {
		return nil
	}

	// 提取元信息
	if !t.messageStarted {
		if id, ok := chunk["id"].(string); ok {
			t.msgID = id
		}
		if model, ok := chunk["model"].(string); ok {
			t.model = model
		}
		t.messageStarted = true
		t.createdAt = time.Now().UTC().Format(time.RFC3339)

		// 发送 message_start
		t.emitMessageStart(writer)
	}

	choices, _ := chunk["choices"].([]interface{})
	if len(choices) == 0 {
		return nil
	}

	choice, _ := choices[0].(map[string]interface{})
	if choice == nil {
		return nil
	}

	delta, _ := choice["delta"].(map[string]interface{})
	finishReason, _ := choice["finish_reason"].(string)

	if delta != nil {
		if err := t.handleDelta(delta, writer); err != nil {
			return err
		}
	}

	if finishReason != "" && finishReason != "stop" {
		// 不是正常的 stop，发送 message_delta + message_stop
		t.emitMessageDelta(writer, finishReason, chunk)
	}

	return nil
}

func (t *streamA2OTranslator) Finalize(writer io.Writer) error {
	if !t.messageStarted {
		return nil
	}
	// 如果还在 content block 中，先结束
	if t.contentStarted {
		t.emitContentBlockStop(writer)
	}
	// 结束消息
	t.emitMessageStop(writer)
	return nil
}

func (t *streamA2OTranslator) handleDone(writer io.Writer) error {
	if t.contentStarted {
		t.emitContentBlockStop(writer)
		t.contentStarted = false
	}
	// 如果有最后的消息
	t.emitMessageDelta(writer, "end_turn", nil)
	t.emitMessageStop(writer)
	return nil
}

func (t *streamA2OTranslator) handleDelta(delta map[string]interface{}, writer io.Writer) error {
	// 检测 role（只发送一次，通常 assistant）
	if _, hasRole := delta["role"]; hasRole && !t.contentStarted {
		return nil // Anthropic 不需要单独的 role 事件
	}

	// 文本内容
	if content, ok := delta["content"].(string); ok && content != "" {
		if !t.contentStarted || t.currentBlockType != "text" {
			if t.contentStarted {
				t.emitContentBlockStop(writer)
			}
			t.emitContentBlockStartText(writer)
			t.currentBlockType = "text"
		}
		return t.emitTextDelta(writer, content)
	}

	// 工具调用
	if toolCalls, ok := delta["tool_calls"].([]interface{}); ok && len(toolCalls) > 0 {
		for _, tc := range toolCalls {
			tcMap, _ := tc.(map[string]interface{})
			if tcMap == nil {
				continue
			}

			// 新的 tool_call
			if id, ok := tcMap["id"].(string); ok && id != "" {
				if t.contentStarted {
					t.emitContentBlockStop(writer)
				}
				t.currentToolCallID = id
				if fn, ok := tcMap["function"].(map[string]interface{}); ok {
					t.currentToolName, _ = fn["name"].(string)
				}
				t.emitContentBlockStartToolUse(writer)
				t.currentBlockType = "tool_use"
				continue
			}

			// arguments 增量
			if fn, ok := tcMap["function"].(map[string]interface{}); ok {
				if args, ok := fn["arguments"].(string); ok && args != "" {
					t.emitToolUseDelta(writer, args)
				}
			}
		}
	}

	return nil
}

// ==================== Anthropic SSE 输出方法 ====================

func (t *streamA2OTranslator) emitMessageStart(writer io.Writer) {
	fmt.Fprintf(writer, "event: message_start\n")
	data := map[string]interface{}{
		"type": "message_start",
		"message": map[string]interface{}{
			"id":    t.msgID,
			"type":  "message",
			"role":  "assistant",
			"model": t.model,
			"usage": map[string]interface{}{
				"input_tokens":  0,
				"output_tokens": 0,
			},
		},
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	t.messageStarted = true
}

func (t *streamA2OTranslator) emitContentBlockStartText(writer io.Writer) {
	fmt.Fprintf(writer, "event: content_block_start\n")
	data := map[string]interface{}{
		"type":  "content_block_start",
		"index": t.blockIndex,
		"content_block": map[string]interface{}{
			"type": "text",
			"text": "",
		},
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	t.contentStarted = true
}

func (t *streamA2OTranslator) emitContentBlockStartToolUse(writer io.Writer) {
	fmt.Fprintf(writer, "event: content_block_start\n")
	data := map[string]interface{}{
		"type":  "content_block_start",
		"index": t.blockIndex,
		"content_block": map[string]interface{}{
			"type":  "tool_use",
			"id":    t.currentToolCallID,
			"name":  t.currentToolName,
			"input": map[string]interface{}{},
		},
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	t.contentStarted = true
	t.blockIndex++
}

func (t *streamA2OTranslator) emitTextDelta(writer io.Writer, text string) error {
	fmt.Fprintf(writer, "event: content_block_delta\n")
	data := map[string]interface{}{
		"type":  "content_block_delta",
		"index": t.blockIndex - 1,
		"delta": map[string]interface{}{
			"type": "text_delta",
			"text": text,
		},
	}
	jsonData, _ := json.Marshal(data)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	return err
}

func (t *streamA2OTranslator) emitToolUseDelta(writer io.Writer, args string) error {
	fmt.Fprintf(writer, "event: content_block_delta\n")
	data := map[string]interface{}{
		"type":  "content_block_delta",
		"index": t.blockIndex - 1,
		"delta": map[string]interface{}{
			"type":         "input_json_delta",
			"partial_json": args,
		},
	}
	jsonData, _ := json.Marshal(data)
	_, err := fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	return err
}

func (t *streamA2OTranslator) emitContentBlockStop(writer io.Writer) {
	fmt.Fprintf(writer, "event: content_block_stop\n")
	data := map[string]interface{}{
		"type":  "content_block_stop",
		"index": t.blockIndex - 1,
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
	t.contentStarted = false
}

func (t *streamA2OTranslator) emitMessageDelta(writer io.Writer, finishReason string, rawChunk map[string]interface{}) {
	fmt.Fprintf(writer, "event: message_delta\n")
	antReason := mapFinishReason(finishReason)

	var outputTokens int
	if rawChunk != nil {
		if usage, ok := rawChunk["usage"].(map[string]interface{}); ok {
			if ct, ok := usage["completion_tokens"].(float64); ok {
				outputTokens = int(ct)
			}
		}
	}

	data := map[string]interface{}{
		"type": "message_delta",
		"delta": map[string]interface{}{
			"stop_reason":   antReason,
			"stop_sequence": nil,
		},
		"usage": map[string]interface{}{
			"output_tokens": outputTokens,
		},
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
}

func (t *streamA2OTranslator) emitMessageStop(writer io.Writer) {
	fmt.Fprintf(writer, "event: message_stop\n")
	data := map[string]interface{}{
		"type": "message_stop",
	}
	jsonData, _ := json.Marshal(data)
	fmt.Fprintf(writer, "data: %s\n\n", string(jsonData))
}
