package loadbalancer

import (
	"fmt"
	"log"
	"strings"

	"github.com/MichaelAyles/goformer"
)

// Embedding 文本向量化服务，封装 goformer 模型。
//
// 启动时加载一次，后续 Embed() 并发安全（goformer 内部加锁）。
type Embedding struct {
	model *goformer.Model // BGE 向量模型
}

// NewEmbedding 加载内嵌向量模型。
//
// modelPath 为解压后的 BGE 模型目录路径，
// 包含 config.json / tokenizer.json / model.safetensors。
func NewEmbedding(modelPath string) (*Embedding, error) {
	model, err := goformer.Load(modelPath)
	if err != nil {
		return nil, fmt.Errorf("load embedding model: %w", err)
	}
	log.Printf("[Embedding] model loaded: dims=%d, maxSeqLen=%d", model.Dims(), model.MaxSeqLen())
	return &Embedding{model: model}, nil
}

// Dims 返回模型输出向量维度。
func (e *Embedding) Dims() int {
	return e.model.Dims()
}

// Embed 将文本转为 L2 归一化向量。
//
// tokens 会被空格拼接后送入 goformer，
// 内部完成 tokenize → forward → mean pooling → L2 normalize。
func (e *Embedding) Embed(tokens []string) ([]float64, error) {
	text := strings.Join(tokens, " ")
	vec32, err := e.model.Embed(text)
	if err != nil {
		return nil, fmt.Errorf("embed: %w", err)
	}
	vec := make([]float64, len(vec32))
	for i, v := range vec32 {
		vec[i] = float64(v)
	}
	return vec, nil
}

// EmbedText 直接对文本向量化，内部用空格分词。
func (e *Embedding) EmbedText(text string) ([]float64, error) {
	return e.Embed(strings.Fields(text))
}
