<div align="center">

**Language:** [English](README.md) | [简体中文](README.zh-CN.md)

</div>

# HeZhiShen AI Gateway - Intelligent AI Gateway

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

A powerful AI model gateway that supports multi-protocol translation, intelligent load balancing, file-aware routing, and MCP knowledge base management.

## Features

### Core Features

- **Multi-protocol support**: Supports both OpenAI and Anthropic protocols simultaneously, with bidirectional conversion
- **Intelligent load balancing**: Three selectable strategies (semantic vector matching, round-robin, least connections)
- **File-aware routing**: Automatically detects images/videos/audio and intelligently switches to multimodal-capable models
- **Auxiliary model system**: Supports analysis and generation auxiliary models, intelligently matched by task type
- **MCP knowledge base**: Document retrieval system based on SQLite + sqlite-vec, supporting vector similarity search
- **Cross-protocol translation**: Automatic OpenAI ↔ Anthropic request/response format conversion
- **Unified API key authentication**: Centralized authentication at the gateway layer, with backend models configured independently

### Advanced Features

- **Semantic vector matching**: Uses the BGE-small-zh-v1.5 embedding model for semantic understanding
- **Hybrid search**: Combines LIKE text search with KNN vector search
- **Knowledge base management**: Supports document CRUD, bulk import/export (CSV format)
- **Connection tracking**: The `least_conn` strategy supports real-time connection counting
- **Path adaptation**: Supports path resolution for both development and production environments

## Quick Start

### 1. Requirements

- Go 1.25+
- SQLite3 (built into modern operating systems)

### 2. Installation
Download the portable (no-install) version
```bash
https://github.com/yanghaitian/hezhishen
```

### 3. Configuration

Edit `config.yaml`:

```yaml
# Gateway configuration
gateway:
  listen_addr: ":8080"           # Listen address
  api_key: "your-api-key"        # Gateway API key
  timeout_seconds: 120           # Request timeout

# Load balancing configuration
loadbalancer:
  model_name: "ht-model"         # Model name that triggers load balancing
  model:
    name: deepseek-v4-pro        # LLM used for semantic tokenization
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
  strategy: embedding            # Strategy: embedding / round_robin / least_conn
  top_k: 3                       # Return Top-K candidate models
  min_similarity: 0.5            # Minimum similarity threshold
  use_llm_parse: false           # Whether to enable LLM semantic parsing (off by default)

# Model configuration
models:
  # Primary model
  - name: deepseek-openai
    to_model: deepseek-v4-pro
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
    description: "Specializes in code generation and logical reasoning"
    default: true
    supports_files: false

  # Auxiliary model - image/video analysis
  - name: gpt-4o
    to_model: gpt-4o
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    description: "Multimodal analysis model"
    supports_files: true
    auxiliary_type: ["image", "video"]
    auxiliary_role: "analysis"

  # Auxiliary model - image generation
  - name: dall-e-3
    to_model: dall-e-3
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    description: "Image generation model"
    supports_files: true
    auxiliary_type: ["image"]
    auxiliary_role: "generation"
```

### 4. Run

```bash
# Development
go run cmd/main.go

# Production
go build -o hezhishen cmd/main.go
./hezhishen
```

### 5. Usage

#### Direct model access

```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

#### Load balancing

```bash
# Use ht-model to trigger intelligent routing
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: ht-model" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "ht-model",
    "messages": [{"role": "user", "content": "Write a sorting algorithm for me"}]
  }'
```

#### File-aware routing

```bash
# Requests containing images are automatically routed to multimodal-capable models
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": [
        {"type": "text", "text": "Analyze this image"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
```

### Intelligent File Routing

The system supports multi-stage intelligent routing that automatically identifies file types and task intent:

**Routing flow:**
```
1. Detect file uploads (image/video/audio/document/file)
2. Extract text content
3. Determine task type:
   - Generation tasks (keywords such as "generate", "create", "draw")
   - Analysis tasks (keywords such as "analyze", "describe", "explain")
4. Route to the corresponding model:
   - Generation task → model with auxiliary_role: "generation" matching the file type
   - Analysis task → model with auxiliary_role: "analysis" matching the file type
```

**Example scenarios:**

**Scenario 1: Image analysis**
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
        {"type": "text", "text": "Analyze the content of this image"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }]
  }'
# The system detects the "image" type + the "analyze" keyword
# → routes to a model with auxiliary_role: "analysis", auxiliary_type: ["image"]
```

**Scenario 2: Image generation**
```bash
curl http://localhost:8080/openai/v1/chat/completions \
  -H "Authorization: Bearer your-api-key" \
  -H "X-Model: deepseek-openai" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-v4-pro",
    "messages": [{
      "role": "user",
      "content": "Generate a cute cat image for me"
    }]
  }'
# The system detects the "generate" + "image" keywords
# → routes to a model with auxiliary_role: "generation", auxiliary_type: ["image"] (e.g. DALL-E 3)
```

**Scenario 3: Video analysis**
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
        {"type": "text", "text": "Describe the content of this video"},
        {"type": "video", "video": {"url": "data:video/mp4;base64,..."}}
      ]
    }]
  }'
# The system detects the "video" type + the "describe" keyword
# → routes to a model with auxiliary_role: "analysis", auxiliary_type: ["video"]
```

**Configuration example:**
```yaml
models:
  # Primary model (does not support files)
  - name: deepseek-openai
    to_model: deepseek-v4-pro
    protocol: openai
    backend_url: https://api.deepseek.com
    api_key: sk-xxx
    supports_files: false

  # Image/video analysis model
  - name: gpt-4o-vision
    to_model: gpt-4o
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    supports_files: true
    auxiliary_type: ["image", "video"]
    auxiliary_role: "analysis"

  # Image generation model
  - name: dall-e-3
    to_model: dall-e-3
    protocol: openai
    backend_url: https://api.openai.com/v1
    api_key: sk-xxx
    supports_files: true
    auxiliary_type: ["image"]
    auxiliary_role: "generation"
```

**Generation type detection keywords:**

| Generation type | Chinese keywords | English keywords |
|---------|-----------|-----------|
| `image` | 图片、图像、画、图、照片 | image、picture、photo、draw |
| `video` | 视频、动画、影片 | video、animation、movie、clip |
| `audio` | 音频、音乐、声音、语音 | audio、music、sound、voice |

### Generation model support status (TODO)

**Current status:**
- ✅ Intent detection implemented (generation tasks can be recognized)
- ✅ Model routing implemented (the corresponding generation model can be found)
- ❌ Request format conversion not implemented (TODO)

**Why is request format conversion not implemented?**

Generation model APIs are **not unified**, unlike chat/completion models:

| Comparison | Chat models | Generation models |
|-------|---------|---------|
| API structure | Relatively unified (messages array) | Completely non-uniform |
| Request fields | Standardized | Vary widely (prompt/text/description) |
| Response format | Unified (choices/message) | URL / base64 / task_id |
| Processing | Synchronous return | Synchronous or asynchronous (requires polling) |

**Common generation model API differences:**

| Model | Request format | Response format | Processing |
|-----|---------|---------|---------|
| DALL-E 3 | `{"prompt": "..."}` | `{"url": "..."}` | Synchronous |
| Stable Diffusion | `{"prompt": "...", "steps": 50}` | `{"images": ["base64..."]}` | Synchronous |
| Midjourney | `{"prompt": "..."}` | `{"task_id": "..."}` | Asynchronous |
| Sora | `{"prompt": "...", "duration": 10}` | `{"video_url": "..."}` | Asynchronous |
| Runway | `{"text": "...", "image": "..."}` | `{"task_id": "..."}` | Asynchronous |

**Implementing generation model support requires:**

1. **Define a unified internal interface**
   ```go
   type GenerationRequest struct {
       Type    string                 // "image", "video", "audio"
       Prompt  string
       Params  map[string]interface{}
   }

   type GenerationResponse struct {
       Type     string                 // "url", "base64", "async"
       Data     string                 // URL, base64, or task_id
       Metadata map[string]interface{}
   }
   ```

2. **Implement adapters for each provider**
   ```go
   type GenerationAdapter interface {
       Generate(req *GenerationRequest) (*GenerationResponse, error)
       GetTaskStatus(taskID string) (*GenerationResponse, error)
   }

   // Example: DALL-E adapter
   type DALLEAdapter struct {
       APIKey     string
       BackendURL string
   }

   func (a *DALLEAdapter) Generate(req *GenerationRequest) (*GenerationResponse, error) {
       // 1. Convert the request format
       dalleReq := map[string]interface{}{
           "model": "dall-e-3",
           "prompt": req.Prompt,
           "n": 1,
           "size": "1024x1024",
       }

       // 2. Call the DALL-E API
       resp, err := http.Post(a.BackendURL+"/images/generations", ...)

       // 3. Convert the response format
       return &GenerationResponse{
           Type: "url",
           Data: resp.Data[0].URL,
       }, nil
   }
   ```

3. **Handle asynchronous tasks**
   - Task queue management
   - Status polling mechanism
   - Callback notifications

4. **Integrate in the handler**
   ```go
   // In the OpenAI handler's file-aware routing
   if role == "generation" {
       genType := common.DetectGenerationType(bodyBytes)
       if genModel := cfg.FindGenerationModel(genType, "openai"); genModel != nil {
           // Get the corresponding adapter
           adapter := getGenerationAdapter(genModel)

           // Extract the prompt
           prompt := extractPrompt(bodyBytes)

           // Call the generation API
           result, err := adapter.Generate(&GenerationRequest{
               Type:   genType,
               Prompt: prompt,
           })

           // Return the result
           c.JSON(200, result)
           return
       }
   }
   ```

**Recommended implementation strategy:**

1. **Implement on demand**: Start with the most commonly used generation models (e.g. DALL-E 3)
2. **Expand incrementally**: Add other models based on actual needs
3. **Avoid over-engineering**: Do not pre-implement all possible adapters
4. **Keep it flexible**: The adapter pattern makes extension easy

**Current workaround:**

If you need text-to-image functionality, you can:
1. Call the generation model API directly from the client (bypassing the gateway)
2. Or wait for the gateway to implement the corresponding model adapter

## Detailed Configuration

### Gateway configuration

| Field | Type | Required | Default | Description |
|------|------|------|--------|------|
| `listen_addr` | string | No | `:8080` | Gateway listen address |
| `api_key` | string | Yes | - | Gateway unified authentication key |
| `timeout_seconds` | int | No | `120` | Request timeout (seconds) |
| `sqlite_max_conns` | int | No | `1` | SQLite connection pool size. SQLite recommends single-connection mode; it can be increased for high-concurrency scenarios (e.g. 5-10) |

### Model configuration

| Field | Type | Required | Default | Description |
|------|------|------|--------|------|
| `name` | string | Yes | - | External model name, used for X-Model matching |
| `to_model` | string | No | same as `name` | Actual model name forwarded to the backend |
| `protocol` | string | Yes | - | Protocol type: `openai` or `anthropic` |
| `backend_url` | string | Yes | - | Backend API base URL |
| `api_key` | string | Yes | - | Backend API key |
| `description` | string | No | - | Model capability description, used for semantic matching |
| `default` | bool | No | `false` | Whether this is the default model (load balancing fallback) |
| `supports_files` | bool | No | `false` | Whether file uploads are supported |
| `auxiliary_type` | []string | No | - | File types supported by the auxiliary model (see enumeration below) |
| `auxiliary_role` | string | No | - | Auxiliary model role (see enumeration below) |

#### auxiliary_type file type enumeration

| Value | Description | Supported protocols | Example models |
|----|------|----------|----------|
| `image` | Images (PNG, JPG, WebP, etc.) | OpenAI, Anthropic | GPT-4o, Claude 3 |
| `video` | Videos (MP4, WebM, etc.) | OpenAI | GPT-4o |
| `audio` | Audio (MP3, WAV, OGG, etc.) | OpenAI | GPT-4o-audio |
| `document` | Documents (PDF) | Anthropic | Claude 3 |
| `file` | Generic files | OpenAI | GPT-4o |

**Note:**
- The Anthropic official API does not support `audio` and `video`, only `image` and `document`
- OpenAI supports all types
- Multiple types can be configured, e.g. `["image", "video"]`

#### auxiliary_role auxiliary model role enumeration

| Value | Description | Example trigger keywords | Applicable scenarios |
|----|------|----------------|----------|
| `analysis` | Analysis tasks | "分析", "描述", "解释", "识别", "analyze", "describe", "explain" | Image understanding, document parsing, video content analysis |
| `generation` | Generation tasks | "生成", "创建", "制作", "画", "generate", "create", "make", "draw" | Image generation, video generation, audio generation |

**Role matching logic:**
- The system analyzes keywords in the user message
- Contains generation keywords → selects a model with `auxiliary_role: "generation"`
- Otherwise → selects a model with `auxiliary_role: "analysis"`
- If no role is configured, it defaults to `analysis`

### LoadBalancer configuration

| Field | Type | Required | Default | Description |
|------|------|------|--------|------|
| `model_name` | string | No | `ht-model` | Model name that triggers load balancing |
| `model` | ModelConfig | Yes | - | LLM configuration used for semantic tokenization |
| `strategy` | string | No | `embedding` | Load balancing strategy |
| `top_k` | int | No | `3` | Return Top-K candidate models |
| `min_similarity` | float | No | `0.0` | Minimum similarity threshold (0-1) |
| `use_llm_parse` | bool | No | `false` | Whether to enable LLM semantic parsing |

#### Load balancing strategies

**1. embedding (semantic vector matching)**
- Uses BGE-small-zh-v1.5 to vectorize user queries and model descriptions
- Computes cosine similarity and selects the best-matching model
- Suitable for: intelligently selecting the most appropriate model based on query content

**2. round_robin**
- Distributes requests to each model in turn
- Suitable for: models with similar capabilities where load needs to be spread evenly

**3. least_conn (least connections)**
- Selects the model with the fewest current connections
- Suitable for: scenarios with large differences in request processing time where dynamic balancing is needed

## API Endpoints

### OpenAI protocol

```
POST /openai/v1/chat/completions
POST /openai/v1/completions
POST /openai/v1/embeddings
GET  /openai/v1/models
```

### Anthropic protocol

```
POST /anthropic/v1/messages
POST /anthropic/v1/complete
GET  /anthropic/v1/models
```

### MCP knowledge base

```
POST /mcp                      # MCP protocol entry point (JSON-RPC)
```

**Supported tools:**
- `search_models` - Search documents (keyword + vector hybrid search)
- `get_document` - Get document details

### Knowledge base management API

```
GET    /admin/mcp/documents              # Paginated document query
POST   /admin/mcp/documents              # Create document
GET    /admin/mcp/documents/:id          # Get single document
PUT    /admin/mcp/documents/:id          # Update document
DELETE /admin/mcp/documents/:id          # Delete document
POST   /admin/mcp/documents/batch-delete # Batch delete
GET    /admin/mcp/documents/export       # Export all (CSV)
POST   /admin/mcp/documents/export       # Export by ID (CSV)
POST   /admin/mcp/documents/import       # Import documents (CSV)
```

**Pagination query parameters:**
- `page` - Page number (default 1)
- `size` - Number of items per page (default 20)
- `keywords` - Search keywords (comma-separated)

Example:
```bash
# Query page 2, 10 items per page, keywords containing "deepseek"
curl "http://localhost:8080/admin/mcp/documents?page=2&size=10&keywords=deepseek" \
  -H "Authorization: Bearer your-api-key"
```

### Health check

```
GET /health
```

## Architecture

### Directory structure

```
HeZhiShenAIGateway/
├── cmd/main.go                 # Program entry point
├── config/
│   ├── config.go              # Configuration loading and validation
│   └── path.go                # Path resolution
├── middleware/
│   └── auth.go                # Authentication middleware
├── route/
│   ├── openai/v1/             # OpenAI protocol handling
│   ├── anthropic/v1/          # Anthropic protocol handling
│   ├── common/                # Common utilities (file detection, etc.)
│   └── loadbalancer/          # Load balancer
├── translator/                # Protocol translators
├── mcp/                       # MCP protocol implementation
│   ├── handler.go             # MCP request handling
│   ├── schema.go              # MCP data structures
│   ├── admin.go               # Knowledge base management API
│   └── dao/                   # Data access layer
│       ├── schema.go          # Database table schemas
│       ├── document.go        # Document CRUD
│       └── vector.go          # Vector encoding/decoding
├── emmodel/                   # Embedding model files
├── data/                      # SQLite database
└── web/                       # Frontend static assets
```

### Request flow

```
Client request
    ↓
Authentication middleware (verify API key)
    ↓
Load balancing routing (if X-Model = ht-model)
    ↓
File-aware routing (detect file type, switch auxiliary model)
    ↓
Protocol translation (if cross-protocol is needed)
    ↓
Forward to backend model
    ↓
Return response
```

### File-aware routing flow

```
1. Detect the file type in the request body (image/video/audio/document)
2. Analyze the user message to determine the task type (analysis/generation)
3. Find a matching auxiliary model:
   - Supports the file type in the request
   - Role matches the task type
   - Prefers the same protocol, then cross-protocol
4. Switch to the auxiliary model to handle the request
```

## Environment Variables

| Variable | Default | Description |
|--------|--------|------|
| `CONFIG_PATH` | `./config.yaml` | Configuration file path |
| `EMBEDDING_MODEL_PATH` | `./emmodel/bge-small-zh-v1.5/bge-small-zh-v1.5` | Embedding model path |
| `MCP_DB_PATH` | `./data/mcp.db` | MCP database path |

## Deployment

### Development

```bash
# Run directly
go run cmd/main.go

# Or use air for hot reload
air
```

### Production

```bash
# Build
go build -o hezhishen cmd/main.go

# Manage with systemd
sudo systemctl start hezhishen
sudo systemctl enable hezhishen
```

### Docker deployment

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

## FAQ

### Q: Why is load balancing not working?

A: Make sure:
1. The `loadbalancer` configuration is enabled
2. The request's `X-Model` header equals `loadbalancer.model_name` (default `ht-model`)
3. The embedding model is loaded correctly (check the startup logs)

### Q: File-aware routing is not triggering?

A: Check:
1. The current model has `supports_files: false`
2. At least one auxiliary model is configured (`auxiliary_type` is non-empty)
3. The request body contains the correct multimodal format

### Q: Cross-protocol translation fails?

A: Currently only `/chat/completions` and `/messages` can be converted bidirectionally; other endpoints require the same protocol.

## Performance Optimization

### Vector search optimization

- Uses `LIMIT 100` to limit LIKE search results
- Vector search uses the KNN algorithm with O(n) time complexity
- Recommended document count does not exceed 100,000

### Connection pool

- SQLite uses single-connection mode (`SetMaxOpenConns(1)`)
- HTTP client uses the default connection pool

### Caching

- The embedding model is loaded at startup and stays resident in memory
- Model description vectors are precomputed at startup

## License

[Apache License 2.0](LICENSE)

## Contributing

Issues and Pull Requests are welcome!

## Contact

If you have any questions, please submit an Issue or contact the maintainer.
