declare class Editor {
    range: Range;
    element: HTMLPreElement;
    composingLock: boolean;
    processTimeoutId: number;
    hlToolbarTimeoutId: number;
    preventInput: boolean;
    private mathSelectionCleanup;
    constructor(vditor: IVditor);
    unbindListener(): void;
    private copy;
    private bindEvent;
}
export { Editor };
