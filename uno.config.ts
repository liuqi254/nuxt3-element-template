// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss';

export default defineConfig({
    shortcuts: {
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        // width 100% height 100%
        'wh-full': 'w-full h-full',
        // width 100vw height 100vh
        'wh-fullscreen': 'w-screen h-screen',
        'flex-x-between': 'flex items-center justify-between',
        'flex-x-end': 'flex items-center justify-end',
        'absolute-lt': 'absolute left-0 top-0',
        'absolute-rt': 'absolute right-0 top-0 ',
        'fixed-lt': 'fixed left-0 top-0',
    },
    theme: {
        colors: {
            primary: 'var(--el-color-primary)',
            primary_dark: 'var(--el-color-primary-light-5)',
        },
    },
    presets: [
        // 默认预设
        presetUno(),
        // 属性模式
        presetAttributify(),
        // 字体
        presetWebFonts({
            fonts: {
                // ...
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
});
