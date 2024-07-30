<!-- 图片，错误加载 -->
<template>
    <div>
        <img
            :src="src"
            :onerror="errorFn"
            v-if="!isError"
        />
        <img
            :src="error"
            v-else
        />
    </div>
</template>

<script setup lang="ts">
    defineProps({
        src: {
            type: String,
            default: '',
        },
        error: {
            type: String,
            default: '',
        },
    });

    let isError = ref(false);

    const errorFn = () => {
        isError.value = true;
    };
</script>

<style lang="scss" scoped>
    img {
        width: 100%;
        height: 100%;
    }
</style>
