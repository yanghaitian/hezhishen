/**
 * 设置编辑器外观主题。根据编辑器主题和内容主题共同决定是否应用暗色样式：
 * 只要 `options.theme` 或 `options.preview.theme.current` 为 `dark`，
 * 则在根节点上添加 `vditor--dark` 类；否则移除。
 */
export declare const setTheme: (vditor: IVditor) => void;
