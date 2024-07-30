<template>
    <el-button
        v-bind="$attrs"
        :style="{ width, height }"
        @click="click"
    >
        <base-svg-icon
            :icon="icon"
            :size="iconSize"
            v-if="icon"
            class="mr-[10px]"
        />
        <slot></slot>
    </el-button>
</template>

<script setup lang="ts">
    const props = defineProps({
        icon: {
            type: String,
            default: '',
        },
        iconSize: {
            type: String,
            default: '22px',
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
        // 是否开启防抖
        debounceTime: {
            type: Number,
            default: 0,
        },
    });

    const emit = defineEmits(['click']);

    // 防抖
    const click = () => {
        if (!props.debounceTime) {
            emit('click');
        } else {
            useDebounceFn(() => {
                emit('click');
            }, props.debounceTime);
        }
    };
</script>

<style scoped lang="scss"></style>
