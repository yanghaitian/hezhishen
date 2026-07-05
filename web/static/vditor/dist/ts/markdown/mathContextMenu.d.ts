/**
 * 绑定指定数学元素的右键事件，展示自定义菜单。
 */
export declare const bindMathContextMenu: (mathEl: HTMLElement) => void;
/**
 * 为数学元素绑定复制拦截：选区完全在数学容器内时，仅复制可见文本
 * 保持与 WYSIWYG 模式一致的行为
 * @param mathEl 数学公式容器（.language-math）
 */
export declare const bindMathCopyInterceptor: (mathEl: HTMLElement) => void;
/**
 * 在指定容器内批量为 IR/WYSIWYG 的数学元素绑定交互（右键菜单 + 复制拦截）
 * - 预览/分屏预览容器内的元素会被跳过
 * - 自动避免重复绑定
 * @param container 扫描范围容器（例如 vditor.ir.element 或 vditor.wysiwyg.element）
 */
export declare const bindMathInteractionsInContainer: (container: HTMLElement) => void;
