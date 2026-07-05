package common

import (
	"encoding/json"
	"strings"
)

// HasFileContent 检测请求体是否包含文件内容（多模态数据）。
// 返回 true 表示包含文件，false 表示纯文本。
func HasFileContent(bodyBytes []byte) bool {
	fileTypes := DetectFileTypes(bodyBytes)
	return len(fileTypes) > 0
}

// DetectFileTypes 检测请求体中包含的文件类型。
// 返回检测到的文件类型列表，如 ["image", "video"] 或 ["audio"]。
// 如果没有检测到文件，返回空列表。
//
// 支持的类型：
//   - OpenAI: image_url, file, audio, video
//   - Anthropic: image, document（PDF）
//
// 注意：Anthropic 官方 API 不支持 audio 和 video，只支持 text + image + document。
func DetectFileTypes(bodyBytes []byte) []string {
	var body struct {
		Messages []struct {
			Content json.RawMessage `json:"content"`
		} `json:"messages"`
	}

	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return nil
	}

	typeSet := make(map[string]bool)

	for _, msg := range body.Messages {
		// 尝试解析为数组（多模态格式）
		var contentParts []struct {
			Type string `json:"type"`
		}
		if err := json.Unmarshal(msg.Content, &contentParts); err != nil {
			continue
		}

		// 检查每个 part 的类型
		for _, part := range contentParts {
			switch part.Type {
			// OpenAI 格式
			case "image_url":
				typeSet["image"] = true
			case "image":
				typeSet["image"] = true
			case "video":
				typeSet["video"] = true
			case "audio":
				typeSet["audio"] = true
			case "file":
				typeSet["file"] = true
			// Anthropic 格式
			case "document":
				typeSet["document"] = true
			}
		}
	}

	// 转换为列表
	var types []string
	for t := range typeSet {
		types = append(types, t)
	}
	return types
}

// DetectRole 从用户消息中检测任务角色。
// 返回 "analysis"（分析类任务）或 "generation"（生成类任务）。
// 默认返回 "analysis"。
func DetectRole(bodyBytes []byte) string {
	var body struct {
		Messages []struct {
			Role    string          `json:"role"`
			Content json.RawMessage `json:"content"`
		} `json:"messages"`
	}

	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return "analysis"
	}

	// 查找最后一条 user 消息
	var lastUserMessage string
	for i := len(body.Messages) - 1; i >= 0; i-- {
		if body.Messages[i].Role == "user" {
			// 尝试字符串格式
			var text string
			if err := json.Unmarshal(body.Messages[i].Content, &text); err == nil {
				lastUserMessage = text
				break
			}

			// 尝试数组格式，提取文本部分
			var parts []struct {
				Type string `json:"type"`
				Text string `json:"text"`
			}
			if err := json.Unmarshal(body.Messages[i].Content, &parts); err == nil {
				var texts []string
				for _, p := range parts {
					if p.Type == "text" && p.Text != "" {
						texts = append(texts, p.Text)
					}
				}
				lastUserMessage = strings.Join(texts, " ")
				break
			}
		}
	}

	if lastUserMessage == "" {
		return "analysis"
	}

	// 转小写便于匹配
	msg := strings.ToLower(lastUserMessage)

	// 生成类关键词
	generationKeywords := []string{
		"生成", "创建", "制作", "画", "写", "编写", "generate", "create", "make",
		"draw", "write", "produce", "design", "build",
	}

	for _, keyword := range generationKeywords {
		if strings.Contains(msg, keyword) {
			return "generation"
		}
	}

	// 默认是分析类
	return "analysis"
}

// DetectGenerationType 从用户消息中检测要生成的内容类型。
// 返回 "image"、"video"、"audio" 或空字符串（无法判断）。
func DetectGenerationType(bodyBytes []byte) string {
	var body struct {
		Messages []struct {
			Role    string          `json:"role"`
			Content json.RawMessage `json:"content"`
		} `json:"messages"`
	}

	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return ""
	}

	// 查找最后一条 user 消息
	var lastUserMessage string
	for i := len(body.Messages) - 1; i >= 0; i-- {
		if body.Messages[i].Role == "user" {
			// 尝试字符串格式
			var text string
			if err := json.Unmarshal(body.Messages[i].Content, &text); err == nil {
				lastUserMessage = text
				break
			}

			// 尝试数组格式，提取文本部分
			var parts []struct {
				Type string `json:"type"`
				Text string `json:"text"`
			}
			if err := json.Unmarshal(body.Messages[i].Content, &parts); err == nil {
				var texts []string
				for _, p := range parts {
					if p.Type == "text" && p.Text != "" {
						texts = append(texts, p.Text)
					}
				}
				lastUserMessage = strings.Join(texts, " ")
				break
			}
		}
	}

	if lastUserMessage == "" {
		return ""
	}

	msg := strings.ToLower(lastUserMessage)

	// 视频关键词
	videoKeywords := []string{
		"视频", "动画", "影片", "video", "animation", "movie", "clip",
	}
	for _, keyword := range videoKeywords {
		if strings.Contains(msg, keyword) {
			return "video"
		}
	}

	// 音频关键词
	audioKeywords := []string{
		"音频", "音乐", "声音", "语音", "audio", "music", "sound", "voice",
	}
	for _, keyword := range audioKeywords {
		if strings.Contains(msg, keyword) {
			return "audio"
		}
	}

	// 图片关键词
	imageKeywords := []string{
		"图片", "图像", "画", "图", "照片", "image", "picture", "photo", "draw",
	}
	for _, keyword := range imageKeywords {
		if strings.Contains(msg, keyword) {
			return "image"
		}
	}

	return ""
}

// ExtractTextFromMessage 从消息中提取纯文本内容。
// 如果是多模态格式，提取所有文本部分拼接。
// 如果是文件类型，返回空字符串（需要单独处理文件内容）。
func ExtractTextFromMessage(bodyBytes []byte) (string, bool) {
	var body struct {
		Messages []struct {
			Role    string          `json:"role"`
			Content json.RawMessage `json:"content"`
		} `json:"messages"`
	}

	if err := json.Unmarshal(bodyBytes, &body); err != nil {
		return "", false
	}

	// 查找最后一条 user 消息
	for i := len(body.Messages) - 1; i >= 0; i-- {
		if body.Messages[i].Role != "user" {
			continue
		}

		// 尝试字符串格式
		var text string
		if err := json.Unmarshal(body.Messages[i].Content, &text); err == nil {
			return text, true
		}

		// 尝试数组格式
		var parts []struct {
			Type string `json:"type"`
			Text string `json:"text"`
		}
		if err := json.Unmarshal(body.Messages[i].Content, &parts); err == nil {
			var texts []string
			hasFile := false
			for _, p := range parts {
				if p.Type == "text" && p.Text != "" {
					texts = append(texts, p.Text)
				} else if p.Type == "file" || p.Type == "document" {
					hasFile = true
				}
			}
			// 如果包含文件，需要特殊处理
			if hasFile {
				return strings.Join(texts, " "), false
			}
			return strings.Join(texts, " "), true
		}
	}

	return "", false
}
