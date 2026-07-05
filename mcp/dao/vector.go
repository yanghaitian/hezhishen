package dao

import (
	"encoding/json"
	"math"
)

// vecToJSON 将 []float64 转为 sqlite-vec vec_f32() 可接受的 JSON 数组字符串。
//
// 示例：[]float64{0.1, 0.2, 0.3} → "[0.1,0.2,0.3]"
func vecToJSON(vec []float64) (string, error) {
	// 转为 float32 以匹配 vec0 表的 float[512] 类型
	f32 := make([]float32, len(vec))
	for i, v := range vec {
		f32[i] = float32(v)
	}
	b, err := json.Marshal(f32)
	if err != nil {
		return "", err
	}
	return string(b), nil
}

// cosineSimilarity 计算两个等长向量的余弦相似度。
//
// 返回值范围 [-1, 1]，值越大表示语义越接近。
// 若向量已 L2 归一化（goformer 输出已归一），可直接用点积。
func cosineSimilarity(a, b []float64) float64 {
	if len(a) != len(b) || len(a) == 0 {
		return 0
	}
	var dot, normA, normB float64
	for i := range a {
		dot += a[i] * b[i]
		normA += a[i] * a[i]
		normB += b[i] * b[i]
	}
	if normA == 0 || normB == 0 {
		return 0
	}
	return dot / (math.Sqrt(normA) * math.Sqrt(normB))
}
