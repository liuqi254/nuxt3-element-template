<template>
    <!-- 折叠侧边栏 -->
    <div
        style="padding: 0 15px"
        @click="toggleClick"
    >
        <el-icon>
            <component :is="isCollapse ? Expand : Fold" />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
    import { Expand, Fold } from '@element-plus/icons-vue';

    defineProps({
        isCollapse: {
            required: true,
            type: Boolean,
            default: false,
        },
    });
    const emit = defineEmits(['toggleClick']);

    /**
     * @description: toggleClick
     */
    const toggleClick = () => {
        emit('toggleClick');
    };
</script>

<style lang="scss" scoped>
    .el-icon {
        color: $menu-text;
    }
</style>
