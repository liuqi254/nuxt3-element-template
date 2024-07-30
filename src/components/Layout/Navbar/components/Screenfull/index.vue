<template>
    <div @click="toggle">
        <base-svg-icon
            :icon="isFullscreen ? 'exit-fullscreen' : 'full-screen'"
            :size="size"
        />
    </div>
</template>

<script setup lang="ts">
    /**
     * vueUse 全屏
     */
    const { isFullscreen, toggle } = useFullscreen();
    defineProps({
        size: {
            type: String,
        },
    });
</script>
