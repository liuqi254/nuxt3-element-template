<template>
    <!-- 默认布局 -->
    <div
        class="app-wrapper clearfix"
        :class="classObj"
    >
        <!-- 移动端遮罩层 -->
        <div
            class="fixed top-0 left-0 bottom-0 right-0 bg-black wh-fullscreen opacity-30 z-999"
            @click="handleClickOutside"
            v-if="!classObj.hideSidebar && classObj.mobile && !classObj['layout-top']"
        ></div>
        <!-- 侧边栏 -->
        <LayoutSliderBar
            class="sidebar-container"
            :class="{ 'fix-sidebar': isFixedHeader || classObj['layout-left'] }"
        />
        <div
            :class="{ hasTagsView: isTagsView }"
            class="main-container"
        >
            <!-- 顶部navbar -->
            <div :class="{ 'fixed-header': isFixedHeader }">
                <LayoutNavbar v-if="!classObj['layout-top'] || classObj.mobile" />
            </div>

            <!-- 内容主体 -->
            <div class="app-main clearfix">
                <!-- 页面加载loading -->
                <LayoutPageLoading v-if="loading" />

                <NuxtPage />

                <LayoutSettings />
            </div>
        </div>
        <!-- 返回顶部 -->
        <el-backtop
            :right="100"
            :bottom="100"
        />
    </div>
</template>

<script setup lang="ts">
    import { useWindowSize } from '@vueuse/core';

    import { useAppStore } from '@/stores/modules/app';
    import { DeviceEnum, LayoutEnum } from '~/enums/AppSettingsEnum';

    const appStore = useAppStore();

    const classObj = computed(() => ({
        // 是否隐藏侧边栏
        hideSidebar:
            appStore.device === 'mobile'
                ? !appStore.sidebar.opened
                : !appStore.sidebar.opened && appStore.layout === LayoutEnum.LEFT,
        // 是否动画
        withoutAnimation: appStore.sidebar.withoutAnimation,
        // 是否移动端
        mobile: appStore.device === DeviceEnum.MOBILE,
        // 是否顶侧布局
        'layout-top': appStore.layout === LayoutEnum.TOP && appStore.device === 'desktop',
        // 是否左侧布局
        'layout-left': appStore.layout === LayoutEnum.LEFT || appStore.device === 'mobile',
    }));

    // 是否显示tags
    const isTagsView = computed(() => appStore.isTagsView);
    // 是否固定头部
    const isFixedHeader = computed(() => appStore.isFixedHeader);

    // 点击外部关闭侧边栏
    const handleClickOutside = () => {
        appStore.closeSideBar(false);
    };

    // 页面loading
    const loading = ref(true);

    const nuxtApp = useNuxtApp();
    let timer: NodeJS.Timeout | null = null;
    if (process.client) {
        nuxtApp.hook('page:loading:start', () => {
            timer = setTimeout(() => {
                if (!loading.value) {
                    loading.value = true;
                }
            }, 500);
        });
        nuxtApp.hook('page:loading:end', () => {
            timer && clearTimeout(timer);
            setTimeout(() => {
                loading.value = false;
            }, 500);
        });
    }

    onMounted(() => {
        // vueuse 监听屏幕宽度变化
        const { width } = useWindowSize();

        watch(
            width,
            () => {
                if (width.value < 600) {
                    appStore.toggleDevice(DeviceEnum.MOBILE);
                    appStore.closeSideBar(true);
                } else {
                    appStore.toggleDevice(DeviceEnum.DESKTOP);

                    if (classObj.value['layout-top']) {
                        appStore.openSideBar(true);
                    } else if (width.value >= 1200) {
                        // 大屏
                        appStore.openSideBar(true);
                    } else {
                        appStore.closeSideBar(true);
                    }
                }
            },
            {
                deep: true,
                immediate: true,
            },
        );
    });
</script>

<style lang="scss">
    @import '@/assets/css/element';

    .page-container {
        padding: 20px;
    }

    .main-container {
        position: relative;
        min-height: 100%;
        margin-left: $sidebar-width;
        transition: margin-left 0.28s;
    }

    .app-wrapper {
        position: relative;

        &.mobile.openSidebar {
            position: fixed;
            top: 0;
        }
    }

    .sidebar-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 10001;
        box-sizing: border-box;
        width: $sidebar-width;
        height: 100%;
        overflow: hidden;
        font-size: 0;
        background-color: $menu-background;
        transition: width 0.28s;
    }

    .fix-sidebar {
        position: fixed;
    }

    // 顶部固定
    .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 9;
        width: calc(100% - #{$sidebar-width});
        transition: width 0.28s;

        & + .app-main {
            padding-top: $navbar-height;
        }
    }

    .app-main {
        position: relative;
        box-sizing: content-box;

        // min-height: calc(100vh - $navbar-height);
    }

    // 隐藏菜单栏
    .hideSidebar {
        .main-container {
            margin-left: $sidebar-width-collapsed;
        }

        .sidebar-container {
            width: $sidebar-width-collapsed !important;
        }

        .fixed-header {
            width: calc(100% - $sidebar-width-collapsed);
        }
    }

    .mobile {
        .fixed-header {
            width: 100%;
        }

        .main-container {
            margin-left: 0;
        }

        .sidebar-container {
            width: $sidebar-width;
            transition: transform 0.28s;
        }

        &.hideSidebar {
            .sidebar-container {
                // pointer-events: none;
                transition-duration: 0.3s;
                transform: translate3d(-$sidebar-width, 0, 0);
            }
        }
    }

    .hasTagsView {
        .app-main {
            /* 84 = navbar + tags-view = 50 + 34 */
            min-height: calc(100vh - $navbar-height);
        }

        .fixed-header + .app-main {
            padding-top: calc($navbar-height);
        }
    }

    .el-popup-parent--hidden {
        .fixed-header {
            padding-right: 15px;
        }
    }

    // 没有过渡效果
    .withoutAnimation {
        .main-container,
        .sidebar-container {
            transition: none;
        }
    }

    // 顶部布局
    .layout-top {
        .fixed-header + .app-main {
            min-height: calc(100vh - $navbar-height);
            padding-top: 0;
        }

        .main-container {
            min-height: 100vh;
            padding-top: $navbar-height;
            margin-left: 0;
        }

        .sidebar-container {
            z-index: 999;
            display: flex;
            width: 100vw;
            height: $navbar-height;
        }

        .fixed-header {
            top: $navbar-height;
            width: 100%;
        }

        .hasTagsView {
            .fixed-header + .app-main {
                min-height: calc(100vh - $navbar-height);
                padding-top: 50px;
            }
        }

        &.mobile {
            .sidebar-container {
                z-index: 999;
                display: flex;
                width: 100% !important;
                height: $navbar-height;
                transform: none;

                .el-scrollbar {
                    flex: 1;
                    min-width: 0;
                    height: $navbar-height;
                }
            }

            .main-container {
                padding-top: $navbar-height;
                margin-left: 0;
                overflow: hidden;
            }

            // 顶部模式全局变量修改
            --el-menu-item-height: $navbar-height;
        }
    }
</style>
