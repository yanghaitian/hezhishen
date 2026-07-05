declare class IR {
    range: Range;
    element: HTMLPreElement;
    processTimeoutId: number;
    hlToolbarTimeoutId: number;
    composingLock: boolean;
    preventInput: boolean;
    private mathSelectionCleanup;
    constructor(vditor: IVditor);
    unbindListener(): void;
    private copy;
    private bindEvent;
}
export { IR };
