export declare const mathRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (element: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const SMILESRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (element: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const mermaidRenderAdapter: {
    /** 不仅要返回code，并且需要将 code 设置为 el 的 innerHTML */
    getCode: (el: Element) => string;
    getElements: (element: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const markmapRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (element: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const mindmapRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
};
/**
 * ECharts 渲染适配器：获取/定位 `.language-echarts` 代码块与相关元素。
 */
export declare const chartRenderAdapter: {
    getCode: (el: HTMLElement) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
    /**
     * 更新同级别的 Markdown 源代码（vditor-wysiwyg__pre > code），并进行“一个字段一行”的轻量格式化。
     * 不修改渲染区域（canvas），避免过度格式化数组/内层对象。
     * @param el 预览区域中的 `.language-echarts` 元素或其子孙节点
     * @param code 新的 ECharts 配置文本（JSON/JS 字符串）
     */
    setCode: (el: HTMLElement, code: string) => void;
};
export declare const abcRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const graphvizRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const flowchartRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
};
export declare const plantumlRenderAdapter: {
    getCode: (el: Element) => string;
    getElements: (el: HTMLElement | Document) => NodeListOf<Element>;
};
