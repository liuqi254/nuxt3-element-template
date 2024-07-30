import type { LoginRes, LoginReq, UserInfo } from './types';

/**
 * @description 用户登录
 */
export const loginAccount = (data: LoginReq) => {
    return useClientRequest<ResPonseType<LoginRes>>('/api/user/login', {
        query: data,
    });
};

/**
 * @description 获取用户信息
 */
export const getUserDetailInfo = (isServer: boolean): any => {
    if (isServer) {
        return useServerRequest<ResPonseType<UserInfo>>('/api/user/detail');
    } else {
        return useClientRequest<ResPonseType<UserInfo>>('/api/user/detail');
    }
};

/**
 * @description 退出登录
 */
export const loginOut = () => {
    return useClientRequest<ResPonseType<void>>('/api/user/logout');
};
