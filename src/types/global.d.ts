import type { RouteConfig } from 'vue-router';
import { ThemeEnum, DeviceEnum, SizeEnum, LayoutEnum } from '@/enums/AppSettingsEnum';

declare global {
    interface ResPonseType<T> {
        code: number;
        msg: string;
        data: T;
        time: number;
        count?: number;
        token_status?: number;
    }

    /**
     * 分页查询参数
     */
    interface PageQuery {
        page: number;
        pagesize: number;
    }

    /**
     * 分页响应对象
     */
    interface PageResult<T> {
        /** 数据列表 */
        list: T;
        /** 总数 */
        total: number;
    }

    /**
     * 页签对象
     */
    interface TagView {
        /** 页签名称 */
        name: string;
        /** 页签标题 */
        title: string;
        /** 页签路由路径 */
        path: string;
        /** 页签路由完整路径 */
        fullPath: string;
        /** 页签图标 */
        icon?: string;
        /** 是否固定页签 */
        affix?: boolean;
        /** 是否开启缓存 */
        keepAlive?: boolean;
        /** 路由查询参数 */
        query?: any;
    }

    /**
     * 系统设置
     */
    interface AppSettings {
        // 设备
        device: `${DeviceEnum}`;
        // 主题
        theme: `${ThemeEnum}`;
        // 主题颜色
        themeColor: string;
        // size
        size: `${SizeEnum}`;
        // tags
        isTagsView: boolean;
        // 固定头部
        isFixedHeader: boolean;
        // 显示logo
        isShowLogo: boolean;
        // 侧边栏
        isCollapse: boolean;
        // 布局 左侧或者顶部
        layout: `${LayoutEnum}`;
        // 是否显示菜单icon
        isShowMenuIcon: boolean;
        // 显示设置
        isShowSetting: boolean;
    }

    /**
     * check选项
     */
    interface CheckOptions {
        label: string;
        value: string | number;
    }
    
    type Partial<T> = {
        [P in keyof T]?: T[P] | undefined;
    };
}

export {};
