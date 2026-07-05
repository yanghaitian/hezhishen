package common

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// buildBackendURL 构建后端请求 URL：后端基础地址 + 原始请求路径
func buildBackendURL(baseURL, requestPath string) string {
	baseURL = strings.TrimRight(baseURL, "/")
	return baseURL + requestPath
}

// Forward 将请求转发到后端 AI 服务，适用于普通（非流式）请求。
func Forward(c *gin.Context, backendURL, apiKey, backendProtocol string, timeoutSeconds int) {
	forwardInternal(c, backendURL, c.Request.URL.Path, apiKey, backendProtocol, "", timeoutSeconds)
}

// ForwardStream 将请求转发到后端，并流式传输 SSE 响应。
func ForwardStream(c *gin.Context, backendURL, targetPath, apiKey, backendProtocol string) {
	forwardStreamInternal(c, backendURL, targetPath, apiKey, backendProtocol, "")
}

// ForwardConditional 自动检测流式请求并选择普通转发或流式转发。
// toModel: 可选，替换请求体中 model 字段的实际值
func ForwardConditional(c *gin.Context, backendURL, apiKey, backendProtocol, toModel string, timeoutSeconds int) {
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to read request body: %v", err)})
		return
	}
	c.Request.Body = io.NopCloser(strings.NewReader(string(bodyBytes)))

	if isStreamRequest(bodyBytes) {
		forwardStreamInternal(c, backendURL, c.Request.URL.Path, apiKey, backendProtocol, toModel)
	} else {
		forwardInternal(c, backendURL, c.Request.URL.Path, apiKey, backendProtocol, toModel, timeoutSeconds)
	}
}

// ForwardConditionalWithPath 类似 ForwardConditional，但指定不同的目标路径（用于翻译场景）
func ForwardConditionalWithPath(c *gin.Context, backendURL, targetPath, apiKey, backendProtocol, toModel string, timeoutSeconds int) {
	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to read request body: %v", err)})
		return
	}
	c.Request.Body = io.NopCloser(strings.NewReader(string(bodyBytes)))

	if isStreamRequest(bodyBytes) {
		forwardStreamInternal(c, backendURL, targetPath, apiKey, backendProtocol, toModel)
	} else {
		forwardInternal(c, backendURL, targetPath, apiKey, backendProtocol, toModel, timeoutSeconds)
	}
}

// ==================== 内部实现 ====================

// forwardInternal 内部通用转发
func forwardInternal(c *gin.Context, backendURL, targetPath, apiKey, backendProtocol, toModel string, timeoutSeconds int) {
	targetURL := buildBackendURL(backendURL, targetPath)
	if c.Request.URL.RawQuery != "" {
		targetURL += "?" + c.Request.URL.RawQuery
	}

	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to read request body: %v", err)})
		return
	}

	// 替换 body 中的 model 字段（如果指定了 toModel 且非空）
	if toModel != "" {
		bodyBytes = replaceModelField(bodyBytes, toModel)
	}

	req, err := http.NewRequest(c.Request.Method, targetURL, strings.NewReader(string(bodyBytes)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to create backend request: %v", err)})
		return
	}

	copyHeaders(req, c.Request, apiKey, backendProtocol)

	client := &http.Client{Timeout: time.Duration(timeoutSeconds) * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("[Gateway] backend request failed: %v", err)
		c.JSON(http.StatusBadGateway, gin.H{"error": fmt.Sprintf("backend request failed: %v", err)})
		return
	}
	defer resp.Body.Close()

	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to read backend response: %v", err)})
		return
	}

	writeResponse(c, resp, respBody)
}

// forwardStreamInternal 内部流式转发
func forwardStreamInternal(c *gin.Context, backendURL, targetPath, apiKey, backendProtocol, toModel string) {
	targetURL := buildBackendURL(backendURL, targetPath)
	if c.Request.URL.RawQuery != "" {
		targetURL += "?" + c.Request.URL.RawQuery
	}

	bodyBytes, err := io.ReadAll(c.Request.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to read request body: %v", err)})
		return
	}

	if toModel != "" {
		bodyBytes = replaceModelField(bodyBytes, toModel)
	}

	req, err := http.NewRequest("POST", targetURL, strings.NewReader(string(bodyBytes)))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("failed to create backend request: %v", err)})
		return
	}

	copyHeaders(req, c.Request, apiKey, backendProtocol)
	req.Header.Set("Accept", "text/event-stream")

	client := &http.Client{Timeout: 0}
	resp, err := client.Do(req)
	if err != nil {
		log.Printf("[Gateway] backend stream request failed: %v", err)
		c.JSON(http.StatusBadGateway, gin.H{"error": fmt.Sprintf("backend stream request failed: %v", err)})
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		respBody, _ := io.ReadAll(resp.Body)
		writeResponse(c, resp, respBody)
		return
	}

	c.Status(resp.StatusCode)
	c.Header("Content-Type", "text/event-stream")
	c.Header("Cache-Control", "no-cache")
	c.Header("Connection", "keep-alive")
	c.Header("Transfer-Encoding", "chunked")
	for key, values := range resp.Header {
		lower := strings.ToLower(key)
		if lower != "content-length" && lower != "transfer-encoding" {
			for _, v := range values {
				c.Header(key, v)
			}
		}
	}

	flusher, ok := c.Writer.(http.Flusher)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "streaming not supported"})
		return
	}

	scanner := bufio.NewScanner(resp.Body)
	scanner.Buffer(make([]byte, 0, 64*1024), 1024*1024)

	for scanner.Scan() {
		line := scanner.Text()
		if _, err := c.Writer.Write([]byte(line + "\n")); err != nil {
			log.Printf("[Gateway] client disconnected from stream")
			return
		}
		flusher.Flush()
	}
	if err := scanner.Err(); err != nil {
		log.Printf("[Gateway] stream read error: %v", err)
	}
}

// ==================== 工具函数 ====================

// replaceModelField 替换 JSON body 中的顶层 "model" 字段值
func replaceModelField(body []byte, toModel string) []byte {
	var m map[string]interface{}
	if err := json.Unmarshal(body, &m); err != nil {
		return body // 不是合法 JSON，原样返回
	}
	m["model"] = toModel
	result, err := json.Marshal(m)
	if err != nil {
		return body
	}
	return result
}

// isStreamRequest 检测请求体 JSON 中 stream 字段是否为 true
func isStreamRequest(body []byte) bool {
	var m map[string]interface{}
	if err := json.Unmarshal(body, &m); err != nil {
		return false
	}
	if stream, ok := m["stream"]; ok {
		switch v := stream.(type) {
		case bool:
			return v
		case string:
			return v == "true"
		}
	}
	return false
}

// copyHeaders 将原始请求的关键头信息复制到后端请求中。
// 重要：不透传客户端的 Authorization/x-api-key，而是注入模型自己的 API Key。
func copyHeaders(req *http.Request, original *http.Request, apiKey, backendProtocol string) {
	if apiKey != "" {
		switch backendProtocol {
		case "openai":
			req.Header.Set("Authorization", "Bearer "+apiKey)
		case "anthropic":
			req.Header.Set("x-api-key", apiKey)
		default:
			req.Header.Set("Authorization", "Bearer "+apiKey)
		}
	}

	if ct := original.Header.Get("Content-Type"); ct != "" {
		req.Header.Set("Content-Type", ct)
	}

	forwardHeaders := []string{
		"Anthropic-Version",
		"OpenAI-Organization",
		"OpenAI-Project",
		"OpenAI-Beta",
		"User-Agent",
		"X-Request-ID",
	}
	for _, h := range forwardHeaders {
		if v := original.Header.Get(h); v != "" {
			req.Header.Set(h, v)
		}
	}

	for key, values := range original.Header {
		lower := strings.ToLower(key)
		if strings.HasPrefix(lower, "x-") &&
			lower != "x-api-key" &&
			lower != "x-model" {
			if _, exists := req.Header[key]; !exists {
				for _, v := range values {
					req.Header.Add(key, v)
				}
			}
		}
	}
}

// writeResponse 将后端响应写入 Gin 上下文
func writeResponse(c *gin.Context, resp *http.Response, body []byte) {
	for key, values := range resp.Header {
		for _, v := range values {
			c.Header(key, v)
		}
	}
	c.Data(resp.StatusCode, resp.Header.Get("Content-Type"), body)
}
