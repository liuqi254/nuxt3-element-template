// 服务端请求
import type { UseFetchOptions } from 'nuxt/app';
import { useAppStore } from '~/stores/modules/app';
import { useUserStore } from '~/stores/modules/user';

function isJson(str: string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const useServerRequest = <T = unknown>(url: string, opts?: UseFetchOptions<T, unknown>) => {
    const loginStatus = useUserStore().loginStatus;
    const lang = useAppStore().language === 'zh-CN' ? 'zh-cn' : 'en';

    const defaultOptions: UseFetchOptions<unknown> = {
        baseURL: '',
        onRequest({ options }) {
            // 如果有token，则添加到请求参数中
            // 如果有token，则添加到请求参数中 lang语言 zh-cn/en
            if (loginStatus?.token) {
                options.query = { ...options.query, token: loginStatus.token };
            }

            options.query = { ...options.query, lang, flag: 'WEB', rand: new Date().getTime() };
        },
        onResponse({ response }) {
            if (response.status !== 200) {
                import.meta.client &&
                    ElMessage({
                        type: 'error',
                        grouping: true,
                        message: response.status + '  ' + response.statusText,
                    });
                return Promise.reject(response.status + '  ' + response.statusText);
            } else {
                // status正常
                // 处理返回数据,json.parse
                if (isJson(response._data)) {
                    response._data = JSON.parse(response._data);
                }

                if (response._data.code === 0 && response._data.error_code !== 0) {
                    import.meta.client &&
                        ElMessage({
                            type: 'warning',
                            grouping: true,
                            message: response._data.msg,
                        });

                    // 登录过期
                    if (response._data.token_status === 0) {
                        useUserStore().logout();
                    }

                    return Promise.reject(response._data.msg);
                }
            }
        },

        onRequestError({ error }) {
            console.log(error);
        },
    };

    return useFetch<T>(url, { ...defaultOptions, ...opts } as any);
};
