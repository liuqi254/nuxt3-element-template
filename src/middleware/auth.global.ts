import { useUserStore } from '~/stores/modules/user';
export default defineNuxtRouteMiddleware(to => {
    // 路由白名单
    const whiteList = ['/login'];
    // 获取用户信息
    const userStore = useUserStore();
    const isLogin = userStore.loginStatus?.token;
    console.log(userStore.roles);
    // 如果登录
    if (!isLogin) {
        console.log('没有登录');
        // 如果没有登录，跳转到登录页面
        if (!whiteList.includes(to.path)) {
            return navigateTo('/login?redirect=' + to.path);
        }
    } else if (to.meta?.roles && !haveRoles(to.meta.roles, userStore.roles)) {
        // 如果登录，判断权限
        console.log('没有权限');
        // 如果没有
        return showError({
            statusCode: 401,
        });
    }
});
