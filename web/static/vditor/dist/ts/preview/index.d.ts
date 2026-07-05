export declare class Preview {
    element: HTMLElement;
    previewElement: HTMLElement;
    private mdTimeoutId;
    private mathSelectionCleanup;
    /**
     * 构造预览区域容器，注册复制与点击事件。
     * - 复制：将选区内容以干净的 HTML 形式复制，避免多余样式。
     * - 点击：处理目录跳转、链接打开与图片预览。
     * 已移除 options.preview.actions 面板及按钮交互。
     */
    constructor(vditor: IVditor);
    unbindListener(): void;
    /**
     * 渲染预览内容。
     * - 优先使用远程接口（options.preview.url）；失败则使用 Lute 本地渲染。
     * - 支持 transform 前置转换与 afterRender 后置资源渲染。
     */
    render(vditor: IVditor, value?: string): void;
    /**
     * 渲染完成后的处理：执行 parse 回调、性能提示、取消评论高亮、代码与图形等资源渲染。
     */
    private afterRender;
    /**
     * 复制到剪贴板：修正数学公式显示、清理多余样式并执行复制。
     */
    private copyToClipboard;
}
