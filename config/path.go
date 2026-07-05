package config

import (
	"log"
	"os"
	"path/filepath"
)

// ResolvePath 将相对路径解析为绝对路径，兼容多种启动方式。
//
// 优先级：
//  1. 已有绝对路径 → 直接返回
//  2. 工作目录 + 相对路径 → 文件存在则返回（GoLand / go run）
//  3. exe 目录 + 相对路径 → 文件存在则返回（双击启动 / systemd）
//  4. 降级：工作目录 + 相对路径（文件不存在也不报错，交给调用方处理）
func ResolvePath(relPath string) string {
	if filepath.IsAbs(relPath) {
		return relPath
	}

	// 优先尝试工作目录（开发场景：GoLand、go run、命令行）
	cwdPath, _ := filepath.Abs(relPath)
	if _, err := os.Stat(cwdPath); err == nil {
		return cwdPath
	}

	// 其次尝试 exe 所在目录（生产部署：双击启动、systemd、docker）
	if execPath, err := os.Executable(); err == nil {
		exeDir := filepath.Join(filepath.Dir(execPath), relPath)
		if _, err := os.Stat(exeDir); err == nil {
			return exeDir
		}
	}

	// 都不存在，返回工作目录路径，让调用方决定如何处理
	log.Printf("[config] path not found: %s (cwd=%s)", relPath, cwdPath)
	return cwdPath
}
