package translator

import (
	"fmt"
	"io"
)

// Direction 表示翻译方向
type Direction string

const (
	O2A Direction = "openai->anthropic" // OpenAI → Anthropic
	A2O Direction = "anthropic->openai" // Anthropic → OpenAI
)

// Info 翻译器元信息
type Info struct {
	Direction Direction
	// SourcePath 翻译后的目标后端路径
	TargetPath string
}

// Translator 非流式协议翻译器接口
type Translator interface {
	// Info 返回翻译器元信息
	Info() Info

	// TranslateRequest 将请求体从源协议转换为目标协议
	// 返回翻译后的请求体和可能发生的错误
	TranslateRequest(body []byte, modelName string) ([]byte, error)

	// TranslateResponse 将后端响应从目标协议转换回源协议
	// 返回翻译后的响应体和可能发生的错误
	TranslateResponse(body []byte, modelName string) ([]byte, error)
}

// StreamTranslator 流式 SSE 协议翻译器接口
type StreamTranslator interface {
	// Info 返回翻译器元信息
	Info() Info

	// TranslateLine 接收后端返回的一行 SSE 原始文本
	// 将翻译后的零行或多行写入 writer
	// 返回错误表示翻译失败
	TranslateLine(line string, writer io.Writer) error

	// Finalize 刷新缓冲并写入终止事件（如 [DONE]）
	Finalize(writer io.Writer) error
}

// NewTranslator 根据方向创建非流式翻译器
func NewTranslator(fromProtocol, toProtocol string) (Translator, error) {
	dir := Direction(fromProtocol + "->" + toProtocol)
	switch dir {
	case O2A:
		return &o2aTranslator{}, nil
	case A2O:
		return &a2oTranslator{}, nil
	default:
		return nil, fmt.Errorf("unsupported translation direction: %s", dir)
	}
}

// NewStreamTranslator 根据方向创建流式翻译器
func NewStreamTranslator(fromProtocol, toProtocol string) (StreamTranslator, error) {
	dir := Direction(fromProtocol + "->" + toProtocol)
	switch dir {
	case O2A:
		return &streamO2ATranslator{}, nil
	case A2O:
		return &streamA2OTranslator{}, nil
	default:
		return nil, fmt.Errorf("unsupported stream translation direction: %s", dir)
	}
}
