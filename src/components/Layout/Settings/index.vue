<template>
    <div>
        <!-- <div
            :class="['settings-button', { show: settingsVisible }]"
            @click="settingsVisible = !settingsVisible"
            v-show="!settingsVisible"
        >
            <el-icon>
                <Setting />
            </el-icon>
        </div> -->

        <el-drawer
            :model-value="settingsVisible"
            size="500"
            :title="$t('layout.PersonalizedSettings')"
            @close="closeDrawer"
        >
            <p class="setting-title">{{ $t('layout.ThemeColor') }}</p>
            <div class="theme-list m-b-[44px]">
                <div
                    v-for="item in themeList"
                    :key="item"
                    class="relative"
                >
                    <base-svg-icon
                        icon="theme"
                        width="76px"
                        height="62px"
                        :color="item"
                        class="theme-item"
                        @click="changeThemeColor(item)"
                        :class="{ active: appStore.themeColor === item }"
                    />
                    <base-svg-icon
                        v-show="appStore.themeColor === item"
                        icon="success"
                        size="18px"
                        color="var(--active-color)"
                        class="color-[var(--active-color)] absolute left-[34px] -bottom-[20px]"
                    />
                </div>
            </div>

            <!-- <div class="flex-center">
            <switch-dark />
        </div> -->
            <p class="setting-title">{{ $t('layout.LayoutSetting') }}</p>
            <!-- <el-divider>界面设置</el-divider>
            <div class="settings-option">
                <el-text>主题颜色</el-text>
                <ThemeColorPicker
                    v-model="appStore.themeColor"
                    @update:model-value="changeThemeColor"
                />
            </div> -->

            <!-- <div class="settings-option">
                <el-text>开启 Tags-View</el-text>
                <el-switch v-model="appStore.isTagsView" />
            </div>
            <div class="settings-option">
                <el-text>固定 Header</el-text>
                <el-switch v-model="appStore.isFixedHeader" />
            </div> -->
            <!-- 布局类型 -->
            <LayoutSelect
                v-model="appStore.layout"
                @update:model-value="changeLayout"
            />
        </el-drawer>
    </div>
</template>

<script setup lang="ts">
    // import { Setting } from '@element-plus/icons-vue';
    import LayoutSelect from './components/LayoutSelect/index.vue';
    // import ThemeColorPicker from './components/ThemeColorPicker/index.vue';
    import { useAppStore } from '@/stores/modules/app';
    import { genMixColor } from '@/utils/color';
    import type { LayoutEnum } from '~/enums/AppSettingsEnum';

    const appStore = useAppStore();

    const settingsVisible = computed(() => appStore.isShowSetting);

    /**
     * @description: 设置主题色
     * @param {*} color
     */
    function changeThemeColor(color: string) {
        color = color || '#2b455d';
        appStore.setThemeColor(color);
        const { DEFAULT } = genMixColor(color);
        setStyleProperty(`--menu-bg-color`, DEFAULT);

        // setStyleProperty(`--el-color-primary-light-9`, light[9]);
    }
    /**
     * @description: 设置行内样式
     * @param {*} propName
     * @param {*} value
     */
    function setStyleProperty(propName: string, value: string) {
        document.documentElement.style.setProperty(propName, value);
    }

    /**
     * @description: 设置布局类型
     * @param {*} layout
     */
    function changeLayout(layout: `${LayoutEnum}`) {
        appStore.setLayout(layout);
    }

    /**
     * 关闭
     */
    const closeDrawer = () => {
        appStore.setIsShowSetting(false);
    };

    const themeList = ['#2b455d', '#3377FF', '#FFAB33', '#FF5858'];
</script>

<style lang="scss" scoped>
    .settings-button {
        position: fixed;
        top: 250px;
        right: 0;
        z-index: 2001;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        color: var(--el-color-white);
        cursor: pointer;
        background-color: var(--el-color-primary);
        border-radius: 6px 0 0 6px;

        &.show {
            right: 300px;
            transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
        }
    }

    .settings-option {
        display: flex;
        justify-content: space-between;
    }

    :deep(.el-drawer__title) {
        display: flex;
        align-items: center;

        @include font($font-large);

        font-weight: 500;
        line-height: 28px;
        color: var(--font-black1);
        letter-spacing: 0;
    }

    .setting-title {
        margin-bottom: 16px;
        font-family: var(--font-family);
        font-size: $font-standard;
        font-weight: 500;
        line-height: 22px;
        color: var(--font-black1);
        letter-spacing: 0;
    }

    .theme-list {
        display: flex;
        justify-content: space-around;
    }

    .theme-item {
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }

        // &.active {
        //     border: 2px solid var(--el-color-primary);
        // }
    }
</style>
