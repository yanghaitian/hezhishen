/**
 * 为预览区域中的代码块添加辅助操作：
 * - 复制按钮：一键复制代码文本
 * - 运行按钮：当启用 runCode 时，向外部回调当前代码块的 HTML 字符串
 */
export declare const codeRender: (element: HTMLElement, option?: IHljs, runCode?: {
    enable?: boolean;
    items?: string[];
    callback?(payload: {
        code: string;
        lang: string;
    }): void;
    runCodeLabelHTML?: string;
    run?: string;
}) => void;
