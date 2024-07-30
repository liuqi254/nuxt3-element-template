import en from '@/locales/en.json';
import cn from '@/locales/cn.json';

export default defineI18nConfig(() => ({
    legacy: false,
    // 默认语言
    fallbackLocale: 'cn',

    messages: {
        'en-US': en,
        'zh-CN': cn,
    },
}));
