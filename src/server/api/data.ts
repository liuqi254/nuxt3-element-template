/** 路由接口 */
import time from './getdata.json';
import datas from './getdata2.json';

export default defineEventHandler(() => {
    /** mock routers api response */
    return {
        success: true,
        data: {
            time,
            datas,
        },
        status: 200,
    };
    // return http.request<UserResult>('get', '/routers', { data })
});
