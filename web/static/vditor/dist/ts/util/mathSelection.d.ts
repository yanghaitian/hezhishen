/**
 * 数学公式选中高亮工具
 * 监听选区变化，为选中的数学公式添加高亮样式
 */
/**
 * 检查并更新数学公式的选中高亮状态
 * @param container 容器元素（编辑器或预览区域）
 */
export declare const updateMathSelection: (container: HTMLElement) => void;
/**
 * 为容器绑定数学公式选中高亮监听
 * @param container 容器元素（编辑器或预览区域）
 */
export declare const bindMathSelectionListener: (container: HTMLElement) => () => void;
