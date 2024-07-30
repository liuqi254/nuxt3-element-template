<!-- 切换暗黑模式 -->
<template>
    <el-switch
        v-model="isDark"
        inline-prompt
        :active-icon="Moon"
        :inactive-icon="Sunny"
        active-color="var(--el-fill-color-dark)"
        inactive-color="var(--el-color-primary)"
        @change="handleThemeChange(isDark)"
    />
</template>

<script setup lang="ts">
    import { Moon, Sunny } from '@element-plus/icons-vue';
    import { useToggle } from '@vueuse/core';
    import { useAppStore } from '~/stores/modules/app';
    import { ThemeEnum } from '~/enums/AppSettingsEnum';

    const appStore = useAppStore();
    const isDark = ref<boolean>(appStore.theme === ThemeEnum.DARK);

    /**
     * 明亮/暗黑主题切换
     * @param isDark
     */
    const handleThemeChange = (isDark: boolean) => {
        useToggle(isDark);
        appStore.setTheme(isDark ? ThemeEnum.DARK : ThemeEnum.LIGHT);
    };
</script>

<style lang="scss" scoped></style>
