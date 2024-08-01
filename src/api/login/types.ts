// 登录
export interface LoginReq {
    account: string;
    password: string;
}

export interface LoginRes {
    userinfo: {
        id: number;
        token: string;
    };
}

export interface UserInfo {
    username: string;
    parentid: number;
}
