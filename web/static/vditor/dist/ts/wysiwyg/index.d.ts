declare class WYSIWYG {
    range: Range;
    element: HTMLPreElement;
    popover: HTMLDivElement;
    selectPopover: HTMLDivElement;
    popoverInput: HTMLTextAreaElement;
    popoverSendBtn: HTMLButtonElement;
    selectionContent: string;
    selectionLines: [number, number];
    afterRenderTimeoutId: number;
    hlToolbarTimeoutId: number;
    preventInput: boolean;
    composingLock: boolean;
    commentIds: string[];
    private vditor;
    private scrollListener;
    private mathSelectionCleanup;
    constructor(vditor: IVditor);
    getComments(vditor: IVditor, getData?: boolean): ICommentsData[];
    triggerRemoveComment(vditor: IVditor): void;
    /**
     * 显示选择浮窗（定位于选区右上）
     * - 当未选中文本或选区不在编辑器内时不显示
     * - 当AI功能未启用时不显示
     */
    showSelectionPopover(): void;
    /**
     * 隐藏选择浮窗（淡出）
     */
    hideSelectionPopover(): void;
    /**
     * 兼容旧接口：显示评论面板（映射为选择浮窗）
     */
    showComment(): void;
    /**
     * 兼容旧接口：隐藏评论面板（映射为选择浮窗隐藏）
     */
    hideComment(): void;
    unbindListener(): void;
    /**
     * 复制事件处理
     * - 代码块与链接：按原有规则格式化复制
     * - 数学公式选区：复制公式源码（与 sv 模式一致）
     * - 其他内容：转换为 Markdown 文本复制
     */
    private copy;
    /**
     * 构建选区剪贴板内容（纯文本 + 富文本）
     */
    private buildClipboardPayload;
    /**
     * 复制选区（按钮触发）
     * - Clipboard API 优先，降级为 execCommand('copy') 调用原有 copy 逻辑
     */
    private copySelection;
    /**
     * 剪切选区（按钮触发）
     * - 复制到剪贴板后删除选区，并加入撤销栈
     */
    private cutSelection;
    private bindEvent;
}
export { WYSIWYG };
