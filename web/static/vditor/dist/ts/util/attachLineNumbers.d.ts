/**
 * 功能：为编辑区域批量添加行号与列表/表格标记（O(n)）
 * - 块级：为所有 `data-block` 写入 `data-linenumber`
 * - 列表：为 `ul/ol > li` 写入 `data-linenumber`、`data-list-level`、`data-list-number`
 * - 表格：为 `table` 的 `tr` 写入 `data-linenumber`（不为 `th` 设置）
 * - 性能：一次解析 Markdown 建索引，批量收集并一次性更新属性，缓存避免重复计算
 * - 精度：支持嵌套列表、换行列表项、多级序号；表格跨页连续行号，容忍合并单元格
 */
export declare const attachLineNumbersToBlocks: (root: HTMLElement, sourceMarkdown: string) => void;
/**
 * 节流后的行号更新函数，避免频繁更新 data-linenumber
 */
export declare const attachLineNumbersToBlocksThrottled: (root: HTMLElement, source: string) => void;
