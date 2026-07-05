package dao

import (
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "modernc.org/sqlite"     // SQLite 纯 Go 驱动
	_ "modernc.org/sqlite/vec" // sqlite-vec 向量扩展，提供 vec0 虚拟表和 vec_* 函数
)

// VecDim 向量维度，与 Embedding 模型输出一致（bge-small-zh-v1.5 = 512）
const VecDim = 512

// DocDB 文档数据库。
//
// 基于 SQLite + sqlite-vec，documents 存文本元数据，
// doc_title_vec / doc_summary_vec 两个 vec0 虚拟表存向量，通过 doc_id 关联。
type DocDB struct {
	db *sqlx.DB // SQLite 连接（单连接模式）
}

// Open 打开 SQLite 数据库并自动建表。
// maxConns 为连接池大小，SQLite 推荐设置为 1（单连接模式），高并发场景可适当增大。
func Open(dbPath string, maxConns int) (*DocDB, error) {
	db, err := sqlx.Open("sqlite", dbPath)
	if err != nil {
		return nil, fmt.Errorf("open sqlite: %w", err)
	}

	if maxConns <= 0 {
		maxConns = 1
	}
	db.SetMaxOpenConns(maxConns)

	if err := initSchema(db); err != nil {
		return nil, fmt.Errorf("init schema: %w", err)
	}
	return &DocDB{db: db}, nil
}

// Close 关闭数据库连接。
func (d *DocDB) Close() error {
	return d.db.Close()
}

// initSchema 建表：
//
//	documents       — 文本元数据（id / title / summary / content）
//	doc_title_vec   — vec0 虚拟表，存标题向量
//	doc_summary_vec — vec0 虚拟表，存摘要向量
func initSchema(db *sqlx.DB) error {
	schema := fmt.Sprintf(`
	-- ====================================================================
	-- 文档元数据表
	-- ====================================================================
	CREATE TABLE IF NOT EXISTS documents (
		-- 文档唯一标识，存储文件内容的 MD5 哈希值
		id            TEXT PRIMARY KEY,
		-- 文档标题，用于搜索和列表展示
		title         TEXT NOT NULL DEFAULT '',
		-- 文档摘要，搜索结果中返回
		summary       TEXT NOT NULL DEFAULT '',
		-- 文档正文全文，仅通过 get_document 接口返回
		content       TEXT NOT NULL DEFAULT '',
		-- 创建时间
		created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
		-- 最后更新时间，upsert 时自动刷新
		updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
	);

	-- 标题 LIKE 搜索索引
	CREATE INDEX IF NOT EXISTS idx_documents_title ON documents(title);
	-- 摘要 LIKE 搜索索引
	CREATE INDEX IF NOT EXISTS idx_documents_summary ON documents(summary);

	-- ====================================================================
	-- 标题向量表（sqlite-vec vec0 虚拟表）
	-- ====================================================================
	CREATE VIRTUAL TABLE IF NOT EXISTS doc_title_vec USING vec0(
		-- 关联 documents.id
		doc_id    TEXT PRIMARY KEY,
		-- 标题向量，%d 维 float32
		embedding float[%d]
	);

	-- ====================================================================
	-- 摘要向量表（sqlite-vec vec0 虚拟表）
	-- ====================================================================
	CREATE VIRTUAL TABLE IF NOT EXISTS doc_summary_vec USING vec0(
		-- 关联 documents.id
		doc_id    TEXT PRIMARY KEY,
		-- 摘要向量，%d 维 float32
		embedding float[%d]
	);
	`, VecDim, VecDim, VecDim, VecDim)

	_, err := db.Exec(schema)
	return err
}
