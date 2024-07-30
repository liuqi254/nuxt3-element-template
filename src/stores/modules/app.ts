import { ThemeEnum } from '~/enums/AppSettingsEnum';

export const useAppStore = defineStore('app', () => {
    const sidebar = reactive({
        opened: true,
        withoutAnimation: false,
    });

    /** 设备 */
    const device = useCookie<AppSettings['device']>('device');

    // const device = ref<AppSettings['device']>(isMobile ? 'mobile' : 'desktop');
    /** element组件size大小 */
    const size = ref<AppSettings['size']>('default');
    /** 是否显示tags栏 */
    const isTagsView = ref<AppSettings['isTagsView']>(false);
    /** 是否固定header */
    const isFixedHeader = ref<AppSettings['isFixedHeader']>(true);
    /** 是否显示logo */
    const isShowLogo = ref<AppSettings['isShowLogo']>(true);
    /** 布局 顶部或左边 */
    const layout = ref<AppSettings['layout']>('top');
    /** 是否显示菜单图标 */
    const isShowMenuIcon = ref<AppSettings['isShowMenuIcon']>(false);
    /** 主题 黑暗/明亮 */
    const theme = ref<AppSettings['theme']>('light');
    /** 主题色 */
    const themeColor = useCookie<AppSettings['themeColor']>('themeColor');

    /** 显示setting */
    const isShowSetting = ref<AppSettings['isShowSetting']>(false);

    /** 语言 */
    const language = useCookie('language');
    const { setLocaleCookie } = useI18n();
    /**
     * @description:修改语言
     */
    const setLanguage = (lang: string) => {
        language.value = lang;
        setLocaleCookie(lang);
        location.reload();
    };

    /**
     * @description:切换slidebar显示/隐藏
     */
    const toggleSideBar = () => {
        sidebar.opened = !sidebar.opened;
        sidebar.withoutAnimation = false;
    };

    /**
     * @description: 打开slidebar
     * @param {boolean} withoutAnimation
     */
    const openSideBar = (withoutAnimation: boolean) => {
        sidebar.opened = true;
        sidebar.withoutAnimation = withoutAnimation;
    };

    /**
     * @description: 关闭slidebar
     * @param {boolean} withoutAnimation
     */
    const closeSideBar = (withoutAnimation: boolean) => {
        sidebar.opened = false;
        sidebar.withoutAnimation = withoutAnimation;
    };

    /**
     * @description: 切换设备
     * @template {AppSettings["device"]} T
     * @param {T} deviceType
     */
    const toggleDevice = (deviceType: AppSettings['device']) => {
        device.value = deviceType;
    };

    /**
     * @description: 设置size
     * @template {AppSettings["size"]} T
     * @param {T} sizeTpye
     */
    const setSize = (sizeTpye: AppSettings['size']) => {
        size.value = sizeTpye;
    };

    /**
     * @description: 设置layout
     * @template {AppSettings["layout"]} T
     * @param {T} layout
     */
    const setLayout = (layoutType: AppSettings['layout']) => {
        layout.value = layoutType;
    };

    /**
     * @description: 设置theme
     * @template {AppSettings["theme"]} T
     * @param {T} theme
     */
    const setTheme = (themeType: AppSettings['theme']) => {
        theme.value = themeType;
        if (themeType === ThemeEnum.DARK) {
            document.documentElement.classList.add(ThemeEnum.DARK);
        } else {
            document.documentElement.classList.remove(ThemeEnum.DARK);
        }
    };

    /**
     * @description: 设置themeColor
     * @param {string} color
     */
    const setThemeColor = (color: string) => {
        themeColor.value = color;
    };

    /**
     * @description: 设置isShowLogo
     * @param {boolean} showLogo
     */
    const setIsShowLogo = (showLogo: boolean) => {
        isShowLogo.value = showLogo;
    };

    /**
     * @description: 设置showSetting
     */
    const setIsShowSetting = (showSetting: boolean) => {
        isShowSetting.value = showSetting;
    };

    return {
        layout,
        sidebar,
        device,
        size,
        isTagsView,
        isFixedHeader,
        isShowLogo,
        isShowMenuIcon,
        theme,
        themeColor,
        isShowSetting,
        language,
        toggleSideBar,
        closeSideBar,
        openSideBar,
        toggleDevice,
        setSize,
        setLayout,
        setTheme,
        setThemeColor,
        setIsShowLogo,
        setIsShowSetting,
        setLanguage,
    };
});
