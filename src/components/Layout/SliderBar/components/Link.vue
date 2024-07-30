<template>
    <component
        :is="type"
        v-bind="linkProps(to)"
    >
        <slot></slot>
    </component>
</template>

<script setup lang="ts">
    import { isExternal as isExternalUtil } from '@/utils/index';
    const props = defineProps({
        to: {
            type: String,
            required: true,
        },
    });
    const isExternal = computed(() => isExternalUtil(props.to));
    const type = computed(() => {
        if (isExternal.value) {
            return 'a';
        }
        return 'router-link';
    });
    /**
     * @description:linkProps
     * @param {*} to
     * @return {*}
     */
    const linkProps = (to: string) => {
        if (isExternal.value) {
            return {
                is: 'a',
                href: to,
                target: '_blank',
                rel: 'noopener',
            };
        }
        return {
            is: 'router-link',
            to,
        };
    };
</script>

<style lang="scss" scoped></style>
