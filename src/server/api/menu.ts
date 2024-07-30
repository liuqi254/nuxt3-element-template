export default defineEventHandler(() => {
    /** mock routers api response */

    return {
        success: true,
        data: [
            {
                path: '/utils',
                name: '/utils',
                meta: {
                    title: '工具',
                    icon: 'system',
                    hidden: false,
                    roles: ['GUEST', 'ADMIN', 'ADMIN6'],
                },
                children: [
                    {
                        path: '/utils',
                        name: 'table',
                        meta: {
                            title: 'table',
                            icon: 'user',
                            hidden: false,
                            roles: ['ADMIN', 'GUEST'],
                            keepAlive: true,
                        },
                    },
                ],
            },
        ],
        status: 200,
    };
    // return http.request<UserResult>('get', '/routers', { data })
});
