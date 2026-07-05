export declare const md2html: (mdText: string, options?: IPreviewOptions) => Promise<string>;
/**
 * 预览区域渲染入口
 * - 负责将 Markdown 转为 HTML 并对各类增强特性进行初始化
 * - 支持目录点击定位与链接点击行为配置（link.click / link.isOpen）
 * @param previewElement 预览容器元素
 * @param markdown Markdown 文本内容
 * @param options 预览配置项，支持 link 点击行为自定义
 */
export declare const previewRender: (previewElement: HTMLDivElement, markdown: string, options?: IPreviewOptions) => Promise<void>;
