<template>
    <el-scrollbar
        ref="scrollContainer"
        :vertical="false"
        class="scroll-container"
        @wheel.prevent="handleScroll"
    >
        <slot></slot>
    </el-scrollbar>
</template>

<script setup lang="ts">
    import { useTagsViewStore } from '@/stores/modules/tagsView';

    const tagsViewStore = useTagsViewStore();
    const tagAndTagSpacing = ref(4); // tagAndTagSpacing
    const { proxy } = getCurrentInstance() as any;

    const scrollWrapper = computed(() => proxy?.$refs.scrollContainer.$refs.wrapRef);

    onMounted(() => {
        scrollWrapper.value.addEventListener('scroll', emitScroll, {
            passive: false,
        });
    });
    onBeforeUnmount(() => {
        scrollWrapper.value.removeEventListener('scroll', emitScroll, {
            passive: false,
        });
    });

    const emits = defineEmits(['scroll']);
    /**
     * 滚动
     */
    const emitScroll = () => {
        emits('scroll');
    };
    /**
     * @description: 鼠标滚动
     * @param {*} e
     */
    const handleScroll = (e: any) => {
        const eventDelta = e.wheelDelta || -e.deltaY * 40;
        const $scrollWrapper = scrollWrapper.value;
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4;
    };

    /**
     * @description: 滚动到当前tag
     * @param {*} currentTag
     */
    const moveToTarget = (currentTag: TagView) => {
        const $container = proxy.$refs.scrollContainer.$el;
        const $containerWidth = $container.offsetWidth;
        const $scrollWrapper = scrollWrapper.value;

        let firstTag = null;
        let lastTag = null;

        // find first tag and last tag
        if (tagsViewStore.visitedViews.length > 0) {
            firstTag = tagsViewStore.visitedViews[0];
            lastTag = tagsViewStore.visitedViews[tagsViewStore.visitedViews.length - 1];
        }

        if (firstTag === currentTag) {
            $scrollWrapper.scrollLeft = 0;
        } else if (lastTag === currentTag) {
            $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
        } else {
            const tagListDom = document.getElementsByClassName('tags-view-item');
            const currentIndex = tagsViewStore.visitedViews.findIndex(item => item === currentTag);
            let prevTag = null;
            let nextTag = null;
            console.log(tagListDom);
            for (const k in tagListDom) {
                if (k !== 'length' && Object.hasOwnProperty.call(tagListDom, k)) {
                    if ((tagListDom[k] as any).dataset.path === tagsViewStore.visitedViews[currentIndex - 1].path) {
                        prevTag = tagListDom[k];
                    }
                    if ((tagListDom[k] as any).dataset.path === tagsViewStore.visitedViews[currentIndex + 1].path) {
                        nextTag = tagListDom[k];
                    }
                }
            }
            console.log(nextTag);
            // the tag's offsetLeft after of nextTag
            const afterNextTagOffsetLeft =
                (nextTag as any).offsetLeft + (nextTag as any).offsetWidth + tagAndTagSpacing.value;

            // the tag's offsetLeft before of prevTag
            const beforePrevTagOffsetLeft = (prevTag as any).offsetLeft - tagAndTagSpacing.value;
            if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
                $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth;
            } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
                $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft;
            }
        }
    };

    defineExpose({
        moveToTarget,
    });
</script>

<style lang="scss" scoped>
    .scroll-container {
        position: relative;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;

        :deep(.el-scrollbar__bar) {
            bottom: 0;
        }

        :deep(.el-scrollbar__wrap) {
            height: $tags-view-height;
        }
    }
</style>
