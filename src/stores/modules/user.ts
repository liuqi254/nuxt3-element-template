import { useTagsViewStore } from './tagsView';
// import { getUserDetailInfo, loginAccount, loginOut } from '~/api/login';
import type { LoginReq, LoginRes, UserInfo } from '~/api/login/types';

export const useUserStore = defineStore(
    'user',
    () => {
        // 登录状态保持
        const loginStatus = useCookie<LoginRes['userinfo'] | null>('loginData', {
            maxAge: 60 * 60 * 24,
        });

        let userInfo = useCookie<UserInfo>('userinfo');

        const roles = computed(() => {
            return [userInfo.value?.parentid === 0 ? 'parentUser' : ''];
        });

        /**
         * 登录
         * @param loginData
         * @returns Promise
         */
        function login(loginData: LoginReq) {
            return new Promise<LoginRes>((resolve, reject) => {
                // 登录
                // loginAccount(loginData)
                //     .then(res => {
                //         loginStatus.value = res.data.userinfo;
                //         resolve(res.data);
                //     })
                //     .catch(error => {
                //         reject(error);
                //     });
                loginStatus.value = { id: 1, token: '123456' };
                resolve(loginStatus.value);
            });
        }

        /**
         * 获取信息(用户昵称、头像、角色集合、权限集合)
         * @return {Promise<UserInfo>}
         */
        function getUserInfo(isServer = false) {
            return new Promise<UserInfo>((resolve, reject) => {
                // getUserDetailInfo(isServer)
                //     .then((res: any) => {
                //         if (res) {
                //             userInfo.value = isServer ? res.data.value.data : res.data;
                //             resolve(userInfo.value);
                //         }
                //     })
                //     .catch((error: any) => {
                //         reject(error);
                //     });
                userInfo.value = { id: 1, username: 'admin' };
                resolve();
            });
        }

        /**
         * 退出登录
         * @returns Promise
         */

        const tagsViewStore = useTagsViewStore();
        function logout() {
            const route = useRoute();
            return new Promise<void>((resolve, reject) => {
                loginStatus.value = null;

                resolve();
                // loginOut()
                //     .then(() => {
                //         tagsViewStore.delAllViews();
                //     })
                //     .then(() => {
                //         if (route.fullPath !== '/') {
                //             navigateTo(`/login?redirect=${route.fullPath}`);
                //         } else {
                //             navigateTo(`/login`);
                //         }
                //     })

                //     .catch(error => {
                //         reject(error);
                //     });
                tagsViewStore.delAllViews();
                if (route.fullPath !== '/') {
                    navigateTo(`/login?redirect=${route.fullPath}`);
                } else {
                    navigateTo(`/login`);
                }
            });
        }

        return {
            loginStatus,
            roles,
            userInfo,
            login,
            logout,
            getUserInfo,
        };
    },
    {
        persist: import.meta.client && {
            storage: localStorage,
        },
    },
);
