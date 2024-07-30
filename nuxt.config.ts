// https://nuxt.com/docs/api/configuration/nuxt-config

// import eslint from 'vite-plugin-eslint';
import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default defineNuxtConfig({
    devtools: { enabled: false },
    runtimeConfig: {
        public: {
            apiUrl: process.env.NUXT_PUBLIC_API_URL,
        },
    },
    // 服务端
    nitro: {
        plugins: ['./plugins/html.render.ts'],
        compressPublicAssets: true,
    },
    routeRules: {
        '/api/**': {
            proxy: process.env.NUXT_PUBLIC_API_URL + '/api/**',
        },
    },
    build: {
        // 打包文件分析
        analyze: true,
    },
    srcDir: 'src/',
    ssr: true,
    app: {
        baseURL: '/',
        head: {
            title: '健康管理平台-比扬医疗',
            charset: 'UTF-8',
            viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
            meta: [
                { name: 'keywords', content: '健康管理平台-比扬医疗' },
                { name: 'description', content: '健康管理平台-比扬医疗' },
            ],
        },
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    modules: [
        '@element-plus/nuxt',
        '@vueuse/nuxt',
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/i18n',
        '@unocss/nuxt',
    ],
    elementPlus: {
        // 配置element-plus
        importStyle: 'scss',
    },
    vueuse: {
        ssrHandlers: true,
    },
    // 配置国际化
    i18n: {
        locales: ['en-US', 'zh-CN'],
        // 浏览器语言检测
        detectBrowserLanguage: {
            // 使用cookie记录用户语言
            useCookie: true,
            cookieKey: 'language',
            alwaysRedirect: true,
            redirectOn: 'root',
        },
        // 添加路由前缀的方式
        strategy: 'no_prefix',
        // 18n配置路径
        vueI18n: './config/i18n.config.ts',
    },
    plugins: ['./src/plugins/svg.ts', './src/plugins/auth.ts'],
    postcss: {
        plugins: {
            // css前缀
            autoprefixer: {
                overrideBrowserslist: ['last 2 versions', '> 1%', 'not ie <= 8'],
                grid: true,
            },
        },
    },
    vite: {
        define: {
            'process.env': {
                NODE_ENV: process.env.NUXT_NODE_ENV,
                API_URL: process.env.NUXT_PUBLIC_API_URL,
            },
        },
        // 去除console debugger
        esbuild: {
            drop: process.env.NUXT_NODE_ENV === 'production' ? ['console', 'debugger'] : [],
        },
        css: {
            preprocessorOptions: {
                // scss全局变量
                scss: {
                    additionalData: '@use "~/assets/css/variables.scss" as *;',
                },
            },
        },
        experimental: {
            // 去除行内style
            // @ts-expect-error
            inlineSSRStyles: false,
        },
        plugins: [
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
        ],
    },
});
