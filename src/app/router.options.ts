// 自定义路由配置
// 页面内使用 definePageMeta({layout: 'main'}) 会失效
import type { RouteRecordRaw } from 'vue-router';
import Layout from '@/components/Layout/index.vue';
export const routes: RouteRecordRaw[] = [
    {
        path: '/redirect',
        meta: { hidden: true },
        component: Layout,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/pages/redirect/index.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('@/pages/login/index.vue'),
        name: '登录',
        meta: { title: 'login', hidden: true, layout: 'custom' },
    },

    {
        path: '/',
        component: () => import('@/pages/home/index.vue'),
        name: '主页',
        meta: { title: 'home', affix: true, icon: 'homepage', keepalive: true },
    },
    {
        path: '/menu',
        component: () => import('@/pages/menu/index.vue'),
        name: '菜单',
        meta: { title: 'menu', icon: 'homepage', keepalive: true },
    },
];

export default {
    routes: (_routes: any) => {
        return routes;
    },
    // 路由滚动行为
    scrollBehavior: () => ({ left: 0, top: 0 }),
};
