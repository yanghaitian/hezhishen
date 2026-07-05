package dao

import (
	"fmt"
	"strings"

	"github.com/jmoiron/sqlx"
)

// ============================================================================
// 数据模型
// ============================================================================

// DocRow 文档数据库行，映射 documents 表全部字段。
type DocRow struct {
	ID      string `json:"id"      db:"id"`      // 文档唯一标识（MD5）
	Title   string `json:"title"   db:"title"`   // 文档标题
	Summary string `json:"summary" db:"summary"` // 文档摘要
	Content string `json:"content" db:"content"` // 文档正文全文
}

// SearchResult 搜索结果条目，返回给 MCP 客户端。
type SearchResult struct {
	ID      string  `json:"id"`      // 文档唯一标识（MD5），用于 get_document
	Title   string  `json:"title"`   // 文档标题
	Summary string  `json:"summary"` // 文档摘要（搜索时截断为 200 字）
	Score   float64 `json:"score"`   // 相关度评分 0~1
}

// ============================================================================
// 插入/更新
// ============================================================================

// Upsert 在事务中插入或更新文档，同时同步 vec0 向量虚拟表。
func (d *DocDB) Upsert(doc *DocRow, titleVec, summaryVec []float64) error {
	tx, err := d.db.Begin()
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback() // 提交后 Rollback 是空操作

	// 1. 元数据 upsert
	_, err = tx.Exec(`
		INSERT INTO documents (id, title, summary, content, updated_at)
		VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
		ON CONFLICT(id) DO UPDATE SET
			title=excluded.title, summary=excluded.summary,
			content=excluded.content, updated_at=CURRENT_TIMESTAMP
	`, doc.ID, doc.Title, doc.Summary, doc.Content)
	if err != nil {
		return fmt.Errorf("upsert document: %w", err)
	}

	// 2. 标题向量（vec0 不支持 ON CONFLICT，改为删后插）
	if len(titleVec) > 0 {
		json, err := vecToJSON(titleVec)
		if err != nil {
			return fmt.Errorf("encode title vec: %w", err)
		}
		tx.Exec("DELETE FROM doc_title_vec WHERE doc_id = ?", doc.ID)
		_, err = tx.Exec("INSERT INTO doc_title_vec (doc_id, embedding) VALUES (?, vec_f32(?))", doc.ID, json)
		if err != nil {
			return fmt.Errorf("upsert title vec: %w", err)
		}
	}

	// 3. 摘要向量（同上）
	if len(summaryVec) > 0 {
		json, err := vecToJSON(summaryVec)
		if err != nil {
			return fmt.Errorf("encode summary vec: %w", err)
		}
		tx.Exec("DELETE FROM doc_summary_vec WHERE doc_id = ?", doc.ID)
		_, err = tx.Exec("INSERT INTO doc_summary_vec (doc_id, embedding) VALUES (?, vec_f32(?))", doc.ID, json)
		if err != nil {
			return fmt.Errorf("upsert summary vec: %w", err)
		}
	}

	return tx.Commit()
}

// ============================================================================
// 搜索
// ============================================================================

// Search 混合搜索：LIKE 文本 + KNN 向量。
//
//   - keywords: 对 title/summary/content 做 LIKE（OR 关系）
//   - queryVec: 在 doc_title_vec / doc_summary_vec 上做向量距离计算
//
// 有向量时返回混合排名，无向量时退化为纯 LIKE 搜索。
func (d *DocDB) Search(keywords []string, queryVec []float64, topK int) ([]SearchResult, error) {
	if len(queryVec) == 0 {
		return d.textOnlySearch(keywords, topK)
	}
	return d.hybridSearch(keywords, queryVec, topK)
}

// textOnlySearch 纯文本 LIKE 搜索（无向量时）。
func (d *DocDB) textOnlySearch(keywords []string, topK int) ([]SearchResult, error) {
	rows, err := d.likeRows(keywords, topK)
	if err != nil {
		return nil, err
	}
	var results []SearchResult
	for _, r := range rows {
		results = append(results, SearchResult{
			ID:      r.ID,
			Title:   r.Title,
			Summary: truncateText(r.Summary, 200),
			Score:   0.5,
		})
	}
	return results, nil
}

// hybridSearch LIKE + KNN 混合搜索。
//
// 从 documents 出发，LEFT JOIN 两个 vec0 表，用 vec_distance_cosine 算距离。
// 取 title_vec 和 summary_vec 中距离较小的作为最终距离。
func (d *DocDB) hybridSearch(keywords []string, queryVec []float64, topK int) ([]SearchResult, error) {
	vecJSON, err := vecToJSON(queryVec)
	if err != nil {
		return nil, fmt.Errorf("encode query vec: %w", err)
	}

	// 构建 LIKE WHERE 条件
	var conditions []string
	var args []interface{}
	for _, kw := range keywords {
		escaped := escapeLike(kw)
		conditions = append(conditions, "(d.title LIKE '%' || ? || '%' ESCAPE '\\' OR d.summary LIKE '%' || ? || '%' ESCAPE '\\' OR d.content LIKE '%' || ? || '%' ESCAPE '\\')")
		args = append(args, escaped, escaped, escaped)
	}
	whereSQL := ""
	if len(conditions) > 0 {
		whereSQL = "WHERE " + strings.Join(conditions, " OR ")
	}

	query := fmt.Sprintf(`
		SELECT d.id, d.title, d.summary,
			MIN(
				COALESCE(vec_distance_cosine(t.embedding, vec_f32(?)), 1.0),
				COALESCE(vec_distance_cosine(s.embedding, vec_f32(?)), 1.0)
			) AS vec_dist
		FROM documents d
		LEFT JOIN doc_title_vec t   ON d.id = t.doc_id
		LEFT JOIN doc_summary_vec s ON d.id = s.doc_id
		%s
		ORDER BY vec_dist
		LIMIT ?
	`, whereSQL)

	allArgs := append([]interface{}{vecJSON, vecJSON}, args...)
	allArgs = append(allArgs, topK)

	var rows []struct {
		ID      string  `db:"id"`
		Title   string  `db:"title"`
		Summary string  `db:"summary"`
		VecDist float64 `db:"vec_dist"`
	}
	if err = d.db.Select(&rows, query, allArgs...); err != nil {
		return nil, fmt.Errorf("hybrid search: %w", err)
	}

	var results []SearchResult
	for _, r := range rows {
		results = append(results, SearchResult{
			ID:      r.ID,
			Title:   r.Title,
			Summary: truncateText(r.Summary, 200),
			Score:   1.0 - r.VecDist, // 余弦距离 → 相似度
		})
	}
	return results, nil
}

// likeRows 返回 LIKE 搜索的行列表，按更新时间倒序。
func (d *DocDB) likeRows(keywords []string, limit int) ([]DocRow, error) {
	return d.likeRowsWithOffset(keywords, limit, 0)
}

// DeleteBatch 事务中批量删除文档及关联向量。
func (d *DocDB) DeleteBatch(ids []string) (int, error) {
	if len(ids) == 0 {
		return 0, nil
	}
	tx, err := d.db.Begin()
	if err != nil {
		return 0, fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback()

	for _, id := range ids {
		tx.Exec("DELETE FROM doc_title_vec WHERE doc_id = ?", id)
		tx.Exec("DELETE FROM doc_summary_vec WHERE doc_id = ?", id)
		tx.Exec("DELETE FROM documents WHERE id = ?", id)
	}
	return len(ids), tx.Commit()
}

// ============================================================================
// 删除
// ============================================================================

// Delete 在事务中删除文档及关联向量，保证原子性。
func (d *DocDB) Delete(id string) error {
	tx, err := d.db.Begin()
	if err != nil {
		return fmt.Errorf("begin tx: %w", err)
	}
	defer tx.Rollback()

	if _, err = tx.Exec("DELETE FROM doc_title_vec WHERE doc_id = ?", id); err != nil {
		return fmt.Errorf("delete title vec: %w", err)
	}
	if _, err = tx.Exec("DELETE FROM doc_summary_vec WHERE doc_id = ?", id); err != nil {
		return fmt.Errorf("delete summary vec: %w", err)
	}
	if _, err = tx.Exec("DELETE FROM documents WHERE id = ?", id); err != nil {
		return fmt.Errorf("delete document: %w", err)
	}
	return tx.Commit()
}

// PageResult 分页查询结果
type PageResult struct {
	Total   int             `json:"total"`   // 总记录数
	Page    int             `json:"page"`    // 当前页码（1-based）
	Size    int             `json:"size"`    // 每页条数
	Records []DocRowWithNum `json:"records"` // 当前页数据
}

// DocRowWithNum 带行号的文档行
type DocRowWithNum struct {
	DocRow
	RowNum int `json:"rowNum"` // 全局行号（跨页连续）
}

// SearchRows 分页搜索，支持关键词 LIKE + 分页。
func (d *DocDB) SearchRows(keywords []string, page, pageSize int) (*PageResult, error) {
	if page < 1 {
		page = 1
	}
	if pageSize < 1 {
		pageSize = 20
	}

	// 统计总数
	total, err := d.countRows(keywords)
	if err != nil {
		return nil, fmt.Errorf("count: %w", err)
	}

	// 分页查询
	offset := (page - 1) * pageSize
	rows, err := d.likeRowsWithOffset(keywords, pageSize, offset)
	if err != nil {
		return nil, err
	}

	records := make([]DocRowWithNum, 0, len(rows))
	for i, r := range rows {
		records = append(records, DocRowWithNum{
			DocRow: r,
			RowNum: offset + i + 1, // 全局行号，跨页递增
		})
	}

	return &PageResult{
		Total:   total,
		Page:    page,
		Size:    pageSize,
		Records: records,
	}, nil
}

// countRows 统计匹配关键词的文档数
func (d *DocDB) countRows(keywords []string) (int, error) {
	if len(keywords) == 0 {
		var total int
		err := d.db.Get(&total, "SELECT COUNT(*) FROM documents")
		return total, err
	}

	var clauses []string
	var args []interface{}
	for _, kw := range keywords {
		escaped := escapeLike(kw)
		clauses = append(clauses, "(title LIKE '%' || ? || '%' ESCAPE '\\' OR summary LIKE '%' || ? || '%' ESCAPE '\\' OR content LIKE '%' || ? || '%' ESCAPE '\\')")
		args = append(args, escaped, escaped, escaped)
	}

	query := "SELECT COUNT(*) FROM documents"
	if len(clauses) > 0 {
		query += " WHERE " + strings.Join(clauses, " OR ")
	}

	var total int
	err := d.db.Get(&total, query, args...)
	return total, err
}

// likeRowsWithOffset 带偏移量的 LIKE 搜索
func (d *DocDB) likeRowsWithOffset(keywords []string, limit, offset int) ([]DocRow, error) {
	if len(keywords) == 0 {
		var rows []DocRow
		err := d.db.Select(&rows, "SELECT id, title, summary, content FROM documents ORDER BY updated_at DESC LIMIT ? OFFSET ?", limit, offset)
		return rows, err
	}

	var clauses []string
	var args []interface{}
	for _, kw := range keywords {
		escaped := escapeLike(kw)
		clauses = append(clauses, "(title LIKE '%' || ? || '%' ESCAPE '\\' OR summary LIKE '%' || ? || '%' ESCAPE '\\' OR content LIKE '%' || ? || '%' ESCAPE '\\')")
		args = append(args, escaped, escaped, escaped)
	}

	query := "SELECT id, title, summary, content FROM documents"
	if len(clauses) > 0 {
		query += " WHERE " + strings.Join(clauses, " OR ")
	}
	query += " ORDER BY updated_at DESC LIMIT ? OFFSET ?"
	args = append(args, limit, offset)

	var rows []DocRow
	err := d.db.Select(&rows, query, args...)
	return rows, err
}

// ExportAll 导出全部文档（不含向量）。
func (d *DocDB) ExportAll() ([]DocRow, error) {
	var rows []DocRow
	err := d.db.Select(&rows, "SELECT id, title, summary, content FROM documents ORDER BY updated_at DESC")
	if rows == nil {
		rows = []DocRow{}
	}
	return rows, err
}

// ExportByIDs 按 ID 列表导出文档（不含向量），用于勾选导出。
func (d *DocDB) ExportByIDs(ids []string) ([]DocRow, error) {
	if len(ids) == 0 {
		return []DocRow{}, nil
	}

	query, args, err := sqlx.In("SELECT id, title, summary, content FROM documents WHERE id IN (?) ORDER BY updated_at DESC", ids)
	if err != nil {
		return nil, fmt.Errorf("build in query: %w", err)
	}
	query = d.db.Rebind(query)

	var rows []DocRow
	if err := d.db.Select(&rows, query, args...); err != nil {
		return nil, err
	}
	if rows == nil {
		rows = []DocRow{}
	}
	return rows, nil
}

// ============================================================================
// 单条获取
// ============================================================================

// GetByID 根据 ID 获取文档完整内容。
func (d *DocDB) GetByID(id string) (*DocRow, error) {
	var row DocRow
	err := d.db.Get(&row, "SELECT id, title, summary, content FROM documents WHERE id = ?", id)
	if err != nil {
		return nil, err
	}
	return &row, nil
}

// ============================================================================
// 工具函数
// ============================================================================

// escapeLike 转义 LIKE 通配符，防止用户输入 % 或 _ 导致意外全匹配。
// SQLite 默认没有转义符，ESCAPE '\' 后 \%、\_、\\ 分别匹配字面值。
func escapeLike(s string) string {
	s = strings.ReplaceAll(s, "\\", "\\\\") // 先转义转义符自身
	s = strings.ReplaceAll(s, "%", "\\%")
	s = strings.ReplaceAll(s, "_", "\\_")
	return s
}

func truncateText(s string, max int) string {
	if len(s) <= max {
		return s
	}
	return s[:max] + "..."
}
