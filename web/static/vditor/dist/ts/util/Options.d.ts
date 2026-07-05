export declare class Options {
    options: IOptions;
    private defaultOptions;
    /**
     * 构造函数：保存外部传入的配置对象
     * @param options 外部传入的 IOptions
     */
    constructor(options: IOptions);
    /**
     * 合并用户配置与默认配置，返回最终配置
     * - 处理 toolbar、preview 主题列表、媒体渲染开关等
     */
    merge(): IOptions;
    /**
     * 合并工具栏配置，统一为 IMenuItem 数组
     * @param toolbar 工具栏项目集合
     */
    private mergeToolbar;
}
