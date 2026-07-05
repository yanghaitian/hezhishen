# 合智神AI网关 - 智能 AI 网关

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

一个功能强大的 AI 模型网关，支持多协议转换、智能负载均衡、文件感知路由和 MCP 知识库管理。

## 功能特性

### 核心功能

- **多协议支持**：同时支持 OpenAI 和 Anthropic 协议，可互相转换
- **智能负载均衡**：三种策略可选（语义向量匹配、轮询、最少连接）
- **文件感知路由**：自动检测图片/视频/音频，智能切换到支持多模态的模型
- **辅助模型系统**：支持分析类和生成类辅助模型，按任务类型智能匹配
- **MCP 知识库**：基于 SQLite + sqlite-vec 的文档检索系统，支持向量相似度搜索
- **跨协议翻译**：OpenAI ↔ Anthropic 请求/响应格式自动转换
- **API Key 统一鉴权**：网关层统一管理认证，后端模型独立配置

### 高级特性

- **语义向量匹配**：使用 BGE-small-zh-v1.5 嵌入模型进行语义理解
- **混合搜索**：LIKE 文本搜索 + KNN 向量搜索结合
- **知识库管理**：支持文档 CRUD、批量导入导出（CSV 格式）
- **连接追踪**：least_conn 策略支持实时连接数统计
- **路径自适应**：支持开发环境和生产环境的路径解析

## 快速开始

### 1. 环境要求

- Go 1.25+
- SQLite3（现代操作系统已内置）

### 2. 安装
下载免安装版
```bash
https://github.com/yanghaitian/hezhishen
```

### 3. 配置

编辑 `config.yaml`：

```yaml
# 网关配置
gateway:
  listen_addr: ":8080"           # 监听地址
  api_key: "your-api-key"        # 网关 API Key
  timeout_seconds: 120           # 请求超时时间

# 负载均衡配置
loadbalancer:
  model_name: "ht-model"         # 负载均衡触发模型名
  model:
    name: deepseek-v4-pro        # 用于语义分词的 LLM
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
  strategy: embedding            # 策略：embedding / round_robin / least_conn
  top_k: 3                       # 返回 Top-K 个候选模型
  min_similarity: 0.5            # 最小相似度阈值
  use_llm_parse: false           # 是否启用 LLM 语义解析（默认关闭）

# 模型配置
models:
  # 主模型
  - name: deepseek-openai
    to_model: deepseek-v4-pro
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
    description: "擅长代码生成、逻辑推理"
    default: true
    supports_files: false

  # 辅助模型 - 图片/视频分析
  - name: gpt-4o
    to_model: gpt-4o
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    description: "多模态分析模型"
    supports_files: true
    auxiliary_type: ["image", "video"]
    auxiliary_role: "analysis"

  # 辅助模型 - 图片生成
  - name: dall-e-3
    to_model: dall-e-3
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    description: "图片生成模型"
    supports_files: true
    auxiliary_type: ["image"]
    auxiliary_role: "generation"
```

### 4. 启动

```bash
# 开发环境
go run cmd/main.go

# 生产环境
go build -o hezhishen cmd/main.go
./hezhishen
```

### 5. 使用

#### 直连模型

```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

#### 负载均衡

```bash
# 使用 ht-model 触发智能路由
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: ht-model" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ht-model",
    "messages": [{"role": "user", "content": "帮我写一个排序算法"}]
  }'
```

#### 文件感知路由

```bash
# 包含图片的请求会自动路由到支持多模态的模型
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "分析这张图片"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
```

### 智能文件路由

系统支持多阶段智能路由，自动识别文件类型和任务意图：

**路由流程：**
```
1. 检测文件上传（image/video/audio/document/file）
2. 提取文本内容
3. 判断任务类型：
   - 生成任务（包含"生成"、"创建"、"画"等关键词）
   - 分析任务（包含"分析"、"描述"、"解释"等关键词）
4. 路由到对应模型：
   - 生成任务 → auxiliary_role: "generation" 且匹配文件类型的模型
   - 分析任务 → auxiliary_role: "analysis" 且匹配文件类型的模型
```

**场景示例：**

**场景1：图片分析**
```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "分析这张图片的内容"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
# 系统检测到 image 类型 + "分析"关键词
# → 路由到 auxiliary_role: "analysis", auxiliary_type: ["image"] 的模型
```

**场景2：图片生成**
```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": "帮我生成一张可爱的猫咪图片"
    }]
  }'
# 系统检测到"生成"+"图片"关键词
# → 路由到 auxiliary_role: "generation", auxiliary_type: ["image"] 的模型（如 DALL-E 3）
```

**场景3：视频分析**
```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "描述这个视频的内容"},
        {"type": "video", "video": {"url": "data:video/mp4;base64,..."}}
      ]
    }]
  }'
# 系统检测到 video 类型 + "描述"关键词
# → 路由到 auxiliary_role: "analysis", auxiliary_type: ["video"] 的模型
```

**配置示例：**
```yaml
models:
  # 主模型（不支持文件）
  - name: deepseek-openai
    to_model: deepseek-v4-pro
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
    supports_files: false

  # 图片/视频分析模型
  - name: gpt-4o-vision
    to_model: gpt-4o
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    supports_files: true
    auxiliary_type: ["image", "video"]
    auxiliary_role: "analysis"

  # 图片生成模型
  - name: dall-e-3
    to_model: dall-e-3
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    supports_files: true
    auxiliary_type: ["image"]
    auxiliary_role: "generation"
```

**生成类型识别关键词：**

| 生成类型 | 中文关键词 | 英文关键词 |
|---------|-----------|-----------|
| `image` | 图片、图像、画、图、照片 | image、picture、photo、draw |
| `video` | 视频、动画、影片 | video、animation、movie、clip |
| `audio` | 音频、音乐、声音、语音 | audio、music、sound、voice |

### 生成模型支持状态（TODO）

**当前状态：**
- ✅ 意图检测已实现（可识别生成任务）
- ✅ 模型路由已实现（可找到对应的生成模型）
- ❌ 请求格式转换未实现（TODO）

**为什么请求格式转换未实现？**

生成模型的 API **不统一**，与聊天/补全模型不同：

| 对比项 | 聊天模型 | 生成模型 |
|-------|---------|---------|
| API 结构 | 相对统一（messages 数组） | 完全不统一 |
| 请求字段 | 标准化 | 各不相同（prompt/text/description） |
| 响应格式 | 统一（choices/message） | URL / base64 / task_id |
| 处理方式 | 同步返回 | 同步或异步（需轮询） |

**常见生成模型 API 差异：**

| 模型 | 请求格式 | 响应格式 | 处理方式 |
|-----|---------|---------|---------|
| DALL-E 3 | `{"prompt": "..."}` | `{"url": "..."}` | 同步 |
| Stable Diffusion | `{"prompt": "...", "steps": 50}` | `{"images": ["base64..."]}` | 同步 |
| Midjourney | `{"prompt": "..."}` | `{"task_id": "..."}` | 异步 |
| Sora | `{"prompt": "...", "duration": 10}` | `{"video_url": "..."}` | 异步 |
| Runway | `{"text": "...", "image": "..."}` | `{"task_id": "..."}` | 异步 |

**实现生成模型支持需要：**

1. **定义统一的内部接口**
   ```go
   type GenerationRequest struct {
       Type    string                 // "image", "video", "audio"
       Prompt  string
       Params  map[string]interface{}
   }
   
   type GenerationResponse struct {
       Type     string                 // "url", "base64", "async"
       Data     string                 // URL、base64 或 task_id
       Metadata map[string]interface{}
   }
   ```

2. **为每个提供商实现适配器**
   ```go
   type GenerationAdapter interface {
       Generate(req *GenerationRequest) (*GenerationResponse, error)
       GetTaskStatus(taskID string) (*GenerationResponse, error)
   }
   
   // 示例：DALL-E 适配器
   type DALLEAdapter struct {
       APIKey     string
       BackendURL string
   }
   
   func (a *DALLEAdapter) Generate(req *GenerationRequest) (*GenerationResponse, error) {
       // 1. 转换请求格式
       dalleReq := map[string]interface{}{
           "model": "dall-e-3",
           "prompt": req.Prompt,
           "n": 1,
           "size": "1024x1024",
       }
       
       // 2. 调用 DALL-E API
       resp, err := http.Post(a.BackendURL+"/images/generations", ...)
       
       // 3. 转换响应格式
       return &GenerationResponse{
           Type: "url",
           Data: resp.Data[0].URL,
       }, nil
   }
   ```

3. **处理异步任务**
   - 任务队列管理
   - 状态轮询机制
   - 回调通知

4. **在 handler 中集成**
   ```go
   // 在 OpenAI handler 的文件感知路由中
   if role == "generation" {
       genType := common.DetectGenerationType(bodyBytes)
       if genModel := cfg.FindGenerationModel(genType, "openai"); genModel != nil {
           // 获取对应的适配器
           adapter := getGenerationAdapter(genModel)
           
           // 提取 prompt
           prompt := extractPrompt(bodyBytes)
           
           // 调用生成 API
           result, err := adapter.Generate(&GenerationRequest{
               Type:   genType,
               Prompt: prompt,
           })
           
           // 返回结果
           c.JSON(200, result)
           return
       }
   }
   ```

**建议的实施策略：**

1. **按需实现**：先支持最常用的生成模型（如 DALL-E 3）
2. **逐步扩展**：根据实际需求添加其他模型
3. **避免过度设计**：不要预先实现所有可能的适配器
4. **保持灵活性**：适配器模式便于扩展

**当前替代方案：**

如果需要文生图功能，可以：
1. 直接在客户端调用生成模型 API（绕过网关）
2. 或者等待网关实现对应模型的适配器

## 详细配置说明

### Gateway 配置

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `listen_addr` | string | 否 | `:8080` | 网关监听地址 |
| `api_key` | string | 是 | - | 网关统一鉴权 Key |
| `timeout_seconds` | int | 否 | `120` | 请求超时时间（秒） |
| `sqlite_max_conns` | int | 否 | `1` | SQLite 连接池大小。SQLite 推荐单连接模式，高并发场景可适当增大（如 5-10） |

### Model 配置

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `name` | string | 是 | - | 模型对外名称，用于 X-Model 匹配 |
| `to_model` | string | 否 | 同 name | 实际转发给后端的模型名 |
| `protocol` | string | 是 | - | 协议类型：`openai` 或 `anthropic` |
| `backend_url` | string | 是 | - | 后端 API 基础地址 |
| `api_key` | string | 是 | - | 后端 API Key |
| `description` | string | 否 | - | 模型能力描述，用于语义匹配 |
| `default` | bool | 否 | `false` | 是否为默认模型（负载均衡兜底） |
| `supports_files` | bool | 否 | `false` | 是否支持文件上传 |
| `auxiliary_type` | []string | 否 | - | 辅助模型支持的文件类型（见下方枚举） |
| `auxiliary_role` | string | 否 | - | 辅助模型角色（见下方枚举） |

#### auxiliary_type 文件类型枚举

| 值 | 说明 | 支持协议 | 示例模型 |
|----|------|----------|----------|
| `image` | 图片（PNG、JPG、WebP 等） | OpenAI、Anthropic | GPT-4o、Claude 3 |
| `video` | 视频（MP4、WebM 等） | OpenAI | GPT-4o |
| `audio` | 音频（MP3、WAV、OGG 等） | OpenAI | GPT-4o-audio |
| `document` | 文档（PDF） | Anthropic | Claude 3 |
| `file` | 通用文件 | OpenAI | GPT-4o |

**注意：**
- Anthropic 官方 API 不支持 `audio` 和 `video`，只支持 `image` 和 `document`
- OpenAI 支持所有类型
- 可配置多个类型，如 `["image", "video"]`

#### auxiliary_role 辅助模型角色枚举

| 值 | 说明 | 触发关键词示例 | 适用场景 |
|----|------|----------------|----------|
| `analysis` | 分析类任务 | "分析"、"描述"、"解释"、"识别"、"analyze"、"describe"、"explain" | 图片理解、文档解析、视频内容分析 |
| `generation` | 生成类任务 | "生成"、"创建"、"制作"、"画"、"generate"、"create"、"make"、"draw" | 图片生成、视频生成、音频生成 |

**角色匹配逻辑：**
- 系统会分析用户消息中的关键词
- 包含生成类关键词 → 选择 `auxiliary_role: "generation"` 的模型
- 其他情况 → 选择 `auxiliary_role: "analysis"` 的模型
- 如果未配置角色，默认为 `analysis`

### LoadBalancer 配置

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `model_name` | string | 否 | `ht-model` | 触发负载均衡的模型名 |
| `model` | ModelConfig | 是 | - | 用于语义分词的 LLM 配置 |
| `strategy` | string | 否 | `embedding` | 负载均衡策略 |
| `top_k` | int | 否 | `3` | 返回 Top-K 个候选模型 |
| `min_similarity` | float | 否 | `0.0` | 最小相似度阈值（0-1） |
| `use_llm_parse` | bool | 否 | `false` | 是否启用 LLM 语义解析 |

#### 负载均衡策略

**1. embedding（语义向量匹配）**
- 使用 BGE-small-zh-v1.5 将用户问题和模型描述向量化
- 计算余弦相似度，选择最匹配的模型
- 适合：根据问题内容智能选择最合适的模型

**2. round_robin（轮询）**
- 按顺序轮流分配请求到各模型
- 适合：模型能力相近，需要均匀分配负载

**3. least_conn（最少连接）**
- 选择当前连接数最少的模型
- 适合：请求处理时间差异大，需要动态平衡

## API 接口

### OpenAI 协议

```
POST /openai/v1/chat/completions
POST /openai/v1/completions
POST /openai/v1/embeddings
GET  /openai/v1/models
```

### Anthropic 协议

```
POST /anthropic/v1/messages
POST /anthropic/v1/complete
GET  /anthropic/v1/models
```

### MCP 知识库

```
POST /mcp                      # MCP 协议入口（JSON-RPC）
```

**支持的工具：**
- `search_models` - 搜索文档（支持关键词 + 向量混合搜索）
- `get_document` - 获取文档详情

### 知识库管理 API

```
GET    /admin/mcp/documents              # 分页查询文档
POST   /admin/mcp/documents              # 创建文档
GET    /admin/mcp/documents/:id          # 获取单个文档
PUT    /admin/mcp/documents/:id          # 更新文档
DELETE /admin/mcp/documents/:id          # 删除文档
POST   /admin/mcp/documents/batch-delete # 批量删除
GET    /admin/mcp/documents/export       # 导出全部（CSV）
POST   /admin/mcp/documents/export       # 按 ID 导出（CSV）
POST   /admin/mcp/documents/import       # 导入文档（CSV）
```

**分页查询参数：**
- `page` - 页码（默认 1）
- `size` - 每页条数（默认 20）
- `keywords` - 搜索关键词（逗号分隔）

示例：
```bash
# 查询第 2 页，每页 10 条，关键词包含 "deepseek"
curl "http://localhost:8080/admin/mcp/documents?page=2&size=10&keywords=deepseek" \
  -H "Authorization: Bearer your-api-key"
```

### 健康检查

```
GET /health
```

## 架构说明

### 目录结构

```
HeZhiShenAIGateway/
├── cmd/main.go                 # 程序入口
├── config/
│   ├── config.go              # 配置加载和校验
│   └── path.go                # 路径解析
├── middleware/
│   └── auth.go                # 鉴权中间件
├── route/
│   ├── openai/v1/             # OpenAI 协议处理
│   ├── anthropic/v1/          # Anthropic 协议处理
│   ├── common/                # 公共工具（文件检测等）
│   └── loadbalancer/          # 负载均衡器
├── translator/                # 协议转换器
├── mcp/                       # MCP 协议实现
│   ├── handler.go             # MCP 请求处理
│   ├── schema.go              # MCP 数据结构
│   ├── admin.go               # 知识库管理 API
│   └── dao/                   # 数据访问层
│       ├── schema.go          # 数据库表结构
│       ├── document.go        # 文档 CRUD
│       └── vector.go          # 向量编解码
├── emmodel/                   # 嵌入模型文件
├── data/                      # SQLite 数据库
└── web/                       # 前端静态资源
```

### 请求流程

```
客户端请求
    ↓
鉴权中间件（验证 API Key）
    ↓
负载均衡路由（如果 X-Model = ht-model）
    ↓
文件感知路由（检测文件类型，切换辅助模型）
    ↓
协议转换（如果需要跨协议）
    ↓
转发到后端模型
    ↓
返回响应
```

### 文件感知路由流程

```
1. 检测请求体中的文件类型（image/video/audio/document）
2. 分析用户消息判断任务类型（analysis/generation）
3. 查找匹配的辅助模型：
   - 支持请求中的文件类型
   - 角色匹配任务类型
   - 优先同协议，其次跨协议
4. 切换到辅助模型处理请求
```

## 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| `CONFIG_PATH` | `./config.yaml` | 配置文件路径 |
| `EMBEDDING_MODEL_PATH` | `./emmodel/bge-small-zh-v1.5/bge-small-zh-v1.5` | 嵌入模型路径 |
| `MCP_DB_PATH` | `./data/mcp.db` | MCP 数据库路径 |

## 部署建议

### 开发环境

```bash
# 直接运行
go run cmd/main.go

# 或使用 air 热重载
air
```

### 生产环境

```bash
# 编译
go build -o hezhishen cmd/main.go

# 使用 systemd 管理
sudo systemctl start hezhishen
sudo systemctl enable hezhishen
```

### Docker 部署

```dockerfile
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o hezhishen cmd/main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/hezhishen .
COPY --from=builder /app/config.yaml .
COPY --from=builder /app/emmodel ./emmodel
EXPOSE 8080
CMD ["./hezhishen"]
```

## 常见问题

### Q: 为什么负载均衡不生效？

A: 确保：
1. `loadbalancer` 配置已启用
2. 请求的 `X-Model` 头等于 `loadbalancer.model_name`（默认 `ht-model`）
3. 嵌入模型已正确加载（查看启动日志）

### Q: 文件感知路由没有触发？

A: 检查：
1. 当前模型 `supports_files: false`
2. 配置了至少一个辅助模型（`auxiliary_type` 非空）
3. 请求体中包含正确的多模态格式

### Q: 跨协议翻译失败？

A: 目前只支持 `/chat/completions` 和 `/messages` 的互相转换，其他接口需要相同协议。

## 性能优化

### 向量搜索优化

- 使用 `LIMIT 100` 限制 LIKE 搜索结果
- 向量搜索使用 KNN 算法，时间复杂度 O(n)
- 建议文档数量不超过 10 万条

### 连接池

- SQLite 使用单连接模式（`SetMaxOpenConns(1)`）
- HTTP 客户端使用默认连接池

### 缓存

- 嵌入模型启动时加载，常驻内存
- 模型描述向量启动时预计算

## 许可证

[Apache License 2.0](LICENSE)

## 贡献

欢迎提交 Issue 和 Pull Request！

## 联系方式

如有问题，请提交 Issue 或联系维护者。
