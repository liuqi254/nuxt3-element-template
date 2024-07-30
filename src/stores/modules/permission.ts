import type { RouteRecordRaw } from 'vue-router';

export const usePermissionStore = defineStore('permission', () => {
    const permissionRoutes = ref<RouteRecordRaw[]>([]);

    // 设置权限路由
    const setPermissionRoutes = (routes: any) => {
        permissionRoutes.value = routes;
    };

    /**
     * 获取菜单
     */
    const getPermissionRoutes = async () => {
        let res = await useClientRequest<ResPonseType<RouteRecordRaw[]>>('/api/menu');
        permissionRoutes.value = res.data;
    };

    return {
        permissionRoutes,
        setPermissionRoutes,
        getPermissionRoutes,
    };
});
