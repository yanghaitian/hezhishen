/**
 * 数学公式渲染入口
 *
 * 默认使用 KaTeX 渲染，并在需要时按需加载相关脚本与样式。
 * 支持通过 options.math.engine 切换为 MathJax。
 *
 * 参数说明：
 * - element: 需要进行数学渲染的根容器（默认 document）
 * - options: 包含 cdn 路径与 math 相关设置（engine、inlineDigit、macros 等）
 */
export declare const mathRender: (element?: HTMLElement | Document, options?: {
    cdn?: string;
    math?: IMath;
}) => void;
