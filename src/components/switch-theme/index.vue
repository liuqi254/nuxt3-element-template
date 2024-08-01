<!-- 主题选择 -->
<template>
    <div @click="showIconPciker">
        <el-color-picker
            v-model="currentColor"
            :predefine="colorPresets"
            popper-class="theme-picker-dropdown"
            ref="colorPciker"
        />
        <base-svg-icon
            class="absolute"
            icon="switch"
            :size="size"
        />
    </div>
</template>

<script lang="ts" setup>
    import type { ElColorPicker } from 'element-plus';
    import { useAppStore } from '~/stores/modules/app';

    const appStore = useAppStore();
    defineProps({
        size: {
            type: String,
            default: '1em',
        },
    });
    /**
     * @description: 设置主题色
     * @param {*} color
     */
    function changeThemeColor(color?: string) {
        color = color || '#2b455d';
        appStore.setThemeColor(color);
        const { DEFAULT } = genMixColor(color);
        setStyleProperty(`--menu-bg-color`, DEFAULT);
        // setStyleProperty(`--nav-bg-active-color`, dark[4]);
        // setStyleProperty(`--el-color-primary-dark-2`, dark[2]);
        // setStyleProperty(`--el-color-primary-light-3`, light[3]);
        // setStyleProperty(`--el-color-primary-light-5`, light[5]);
        // setStyleProperty(`--el-color-primary-light-7`, light[7]);
        // setStyleProperty(`--el-color-primary-light-8`, light[8]);

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
    // 定义颜色预设
    const colorPresets = [
        '#409EFF',
        '#ff4500',
        '#ff8c00',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsva(120, 40, 94)',
    ];

    const currentColor = ref('');
    currentColor.value = appStore.themeColor;

    watch(currentColor, newValue => {
        // 设置主题色
        changeThemeColor(newValue);
    });

    const colorPciker = ref<InstanceType<typeof ElColorPicker> | null>(null);
    const showIconPciker = () => {
        // colorPciker.value?.show();
        appStore.setIsShowSetting(true);
    };

    // 初始化主题颜色
    // if (!appStore.themeColor) {
    //     appStore.setThemeColor('#2b455d');
    // }
</script>

<style scoped lang="scss">
    :deep(.theme-picker-dropdown) {
        z-index: 99999 !important;
    }

    :deep(.el-color-picker__trigger) {
        visibility: hidden;
    }
</style>
