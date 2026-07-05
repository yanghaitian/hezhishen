/**
 * 高亮并渲染所见即所得模式的内联工具条
 * - 根据当前选区与块元素类型生成对应操作面板
 * - 面板位置与显示由 setPopoverPosition 控制，受 options.inlinePopover.enable 影响
 */
export declare const highlightToolbarWYSIWYG: (vditor: IVditor) => void;
export declare const genLinkRefPopover: (vditor: IVditor, linkRefElement: HTMLElement, range?: Range) => void;
export declare const genAPopover: (vditor: IVditor, aElement: HTMLElement, range: Range) => void;
export declare const genImagePopover: (event: Event, vditor: IVditor) => void;
