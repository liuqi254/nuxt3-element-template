/**
 * @description 扩展ruoter-meta的类型 此处必须要export {} 不然找不到类型
 */
declare module 'vue-router' {
    interface RouteMeta {
        /** 标题 */
        title?: string;
        /** 图标 */
        icon?: string;
        /** 是否固定 */
        affix?: boolean;
        /** 是否隐藏 */
        hidden?: boolean;
        /** 是否缓存 */
        keepAlive?: boolean;
        /** 用户角色 */
        roles?: string[];
    }
}

export {};
