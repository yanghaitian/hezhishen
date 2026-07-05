export declare const focusEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
export declare const dblclickEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
export declare const blurEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
export declare const dropEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
export declare const copyEvent: (vditor: IVditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: IVditor) => void) => void;
export declare const cutEvent: (vditor: IVditor, editorElement: HTMLElement, copy: (event: ClipboardEvent, vditor: IVditor) => void) => void;
export declare const scrollCenter: (vditor: IVditor) => void;
export declare const hotkeyEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
/**
 * 选区事件处理（含防抖）：根据选中内容显示/隐藏选择浮窗
 * - 受 options.selectionPopover.enable 控制
 * - 防抖间隔使用 options.selectionPopover.debounceDelay（默认 150ms）
 */
export declare const selectEvent: (vditor: IVditor, editorElement: HTMLElement) => void;
