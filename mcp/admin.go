package mcp

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"htAiGateway/mcp/dao"
	"htAiGateway/middleware"
	"htAiGateway/route/loadbalancer"

	"github.com/gin-gonic/gin"
)

// ============================================================================
// 知识库管理 CRUD（/admin/mcp）
// ============================================================================

// ListDocuments GET /admin/mcp/documents — 分页搜索
func ListDocuments(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(c.DefaultQuery("size", "20"))

	var keywords []string
	if kw := c.Query("keywords"); kw != "" {
		for _, s := range strings.Split(kw, ",") {
			s = strings.TrimSpace(s)
			if s != "" {
				keywords = append(keywords, s)
			}
		}
	}

	result, err := db.SearchRows(keywords, page, size)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, result)
}

// GetDocument GET /admin/mcp/documents/:id — 获取单条文档
func GetDocument(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	doc, err := db.GetByID(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, doc)
}

// CreateDocument POST /admin/mcp/documents — 新增文档，自动计算向量
func CreateDocument(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	var req struct {
		ID      string `json:"id" binding:"required"`
		Title   string `json:"title" binding:"required"`
		Summary string `json:"summary"`
		Content string `json:"content"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	titleVec, summaryVec := computeVectors(c, req.Title, req.Summary)

	doc := &dao.DocRow{ID: req.ID, Title: req.Title, Summary: req.Summary, Content: req.Content}
	if err := db.Upsert(doc, titleVec, summaryVec); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, doc)
}

// UpdateDocument PUT /admin/mcp/documents/:id — 更新文档，重新计算向量
func UpdateDocument(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	var req struct {
		Title   string `json:"title" binding:"required"`
		Summary string `json:"summary"`
		Content string `json:"content"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id := c.Param("id")
	titleVec, summaryVec := computeVectors(c, req.Title, req.Summary)

	doc := &dao.DocRow{ID: id, Title: req.Title, Summary: req.Summary, Content: req.Content}
	if err := db.Upsert(doc, titleVec, summaryVec); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, doc)
}

// DeleteDocument DELETE /admin/mcp/documents/:id — 删除单条文档
func DeleteDocument(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	if err := db.Delete(c.Param("id")); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"deleted": c.Param("id")})
}

// DeleteDocuments POST /admin/mcp/documents/batch-delete — 批量删除
func DeleteDocuments(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	var req struct {
		IDs []string `json:"ids" binding:"required"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	count, err := db.DeleteBatch(req.IDs)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"deleted": count})
}

// ExportDocuments GET /admin/mcp/documents/export — 导出全部 CSV
// ExportDocuments POST /admin/mcp/documents/export — 按 ID 导出 CSV（body: {"ids":[...]}）
func ExportDocuments(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	var rows []dao.DocRow
	var err error

	if c.Request.Method == http.MethodPost {
		var req struct {
			IDs []string `json:"ids" binding:"required"`
		}
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		rows, err = db.ExportByIDs(req.IDs)
	} else {
		rows, err = db.ExportAll()
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Header("Content-Type", "text/csv; charset=utf-8")
	c.Header("Content-Disposition", "attachment; filename=knowledge_base.csv")
	c.Writer.WriteString("\xEF\xBB\xBF")

	w := csv.NewWriter(c.Writer)
	w.Write([]string{"id", "title", "summary", "content"})
	for _, r := range rows {
		w.Write([]string{r.ID, r.Title, r.Summary, r.Content})
	}
	w.Flush()
}

// ImportDocuments POST /admin/mcp/documents/import — 从 CSV 导入
func ImportDocuments(c *gin.Context) {
	db := getDocDB(c)
	if db == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "database not available"})
		return
	}

	file, _, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "missing file field: " + err.Error()})
		return
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "parse csv: " + err.Error()})
		return
	}
	if len(records) < 2 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "csv must have header + at least one data row"})
		return
	}

	var success, skip int
	for i, row := range records[1:] {
		if len(row) < 2 {
			continue
		}
		id, title := row[0], row[1]
		var summary, content string
		if len(row) > 2 {
			summary = row[2]
		}
		if len(row) > 3 {
			content = row[3]
		}
		if id == "" || title == "" {
			skip++
			continue
		}

		titleVec, summaryVec := computeVectors(c, title, summary)
		doc := &dao.DocRow{ID: id, Title: title, Summary: summary, Content: content}
		if err := db.Upsert(doc, titleVec, summaryVec); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("row %d: %v", i+1, err)})
			return
		}
		success++
	}

	c.JSON(http.StatusOK, gin.H{"imported": success, "skipped": skip, "total": len(records) - 1})
}

// ============================================================================
// 辅助
// ============================================================================

func computeVectors(c *gin.Context, title, summary string) (titleVec, summaryVec []float64) {
	emb, ok := middleware.GetLoadBalancer(c).(*loadbalancer.Embedding)
	if !ok || emb == nil {
		return nil, nil
	}
	if title != "" {
		if v, err := emb.EmbedText(title); err == nil {
			titleVec = v
		}
	}
	if summary != "" {
		if v, err := emb.EmbedText(summary); err == nil {
			summaryVec = v
		}
	}
	return
}
