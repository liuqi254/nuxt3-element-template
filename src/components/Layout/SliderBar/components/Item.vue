<template>
    <template v-if="isShowMenuIcon || layout !== 'top'">
        <ElIcon
            v-if="icon && icon.includes('el-icon')"
            class="sub-el-icon"
        />
        <base-svg-icon
            v-else-if="icon"
            :icon="icon"
        />
    </template>
    <span v-if="title">{{ $t(`router.${title}`) }}</span>
</template>

<script setup lang="ts">
    import { ElIcon } from 'element-plus';
    import { useAppStore } from '~/stores/modules/app';

    defineProps({
        icon: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
    });

    const appStore = useAppStore();
    const isShowMenuIcon = appStore.isShowMenuIcon;
    const layout = appStore.layout;
</script>

<style scoped lang="scss">
    .sub-el-icon {
        width: 1em;
        height: 1em;
        color: currentcolor;
    }
</style>
