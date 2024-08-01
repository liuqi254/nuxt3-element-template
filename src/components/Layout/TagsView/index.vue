<template>
    <div
        id="tags-view-container"
        class="tags-view-container"
    >
        <scroll-pane
            ref="scrollPane"
            class="tags-view-wrapper"
            @scroll="handleScroll"
        >
            <nuxt-link
                :no-prefetch="true"
                v-for="tag in visitedViews"
                ref="tag"
                :key="tag.path"
                :data-path="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query }"
                class="tags-view-item"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                @contextmenu.prevent="openMenu(tag, $event)"
            >
                {{ $t(tag.title as string) }}
                <span
                    v-if="!isAffix(tag)"
                    class="tags-item-close"
                    @click.prevent.stop="closeSelectedTag(tag)"
                >
                    <el-icon>
                        <Close />
                    </el-icon>
                </span>
            </nuxt-link>
        </scroll-pane>

        <ul
            v-show="visible"
            :style="{ left: left + 'px', top: top + 'px' }"
            class="contextmenu"
        >
            <li @click="refreshSelectedTag(selectedTag)">刷新</li>
            <li
                v-if="!isAffix(selectedTag)"
                @click="closeSelectedTag(selectedTag)"
            >
                关闭
            </li>
            <li @click="closeOthersTags">关闭其它</li>
            <li @click="closeAllTags(selectedTag)">关闭所有</li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import path from 'path-browserify';
    import { Close } from '@element-plus/icons-vue';
    // import { usePermissionStore } from '@/stores/modules/permission';
    import type { RouteRecordRaw } from 'vue-router';
    import ScrollPane from './components/ScrollPane.vue';
    import { useTagsViewStore } from '@/stores/modules/tagsView';
    import { routes } from '@/app/router.options';

    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance()!;

    // const permissionStore = usePermissionStore();
    const tagsViewStore = useTagsViewStore();
    const visitedViews = storeToRefs(tagsViewStore).visitedViews;

    // const routes = permissionStore.permissionRoutes;
    console.log(routes);
    const left = ref(0);
    const top = ref(0);
    const selectedTag = ref<TagView>({
        path: '',
        fullPath: '',
        name: '',
        title: '',
        affix: false,
        keepAlive: false,
    });

    const visible = ref(false);
    /**
     * @description: 关闭右键菜单
     */
    const closeMenu = () => {
        visible.value = false;
    };
    watch(visible, value => {
        if (value) {
            document.body.addEventListener('click', closeMenu);
        } else {
            document.body.removeEventListener('click', closeMenu);
        }
    });

    const affixTags = ref<TagView[]>([]);
    /**
     * @description: 初始化Tags
     */
    const initTags = () => {
        const tags: TagView[] = filterAffixTags(routes);
        affixTags.value = tags;
        for (const tag of tags) {
            // Must have tag name
            if (tag.name) {
                tagsViewStore.addVisitedView(tag);
            }
        }
    };
    /**
     * @description: 过滤固定tags
     * @param {*} routes
     * @param {*} basePath
     * @return {*}
     */
    const filterAffixTags = (routes: RouteRecordRaw[], basePath = '/') => {
        /**
         * @description: processRoute
         * @param {*} route
         */
        const processRoute = (route: RouteRecordRaw) => {
            const fullPath = path.resolve(basePath, route.path);

            if (route.meta?.hidden) {
                return;
            }
            const tag: TagView = {
                path: route.path,
                fullPath,
                name: route.name as string,
                title: route.meta?.title || 'no-name',
                affix: route.meta?.affix,
                keepAlive: route.meta?.keepAlive,
            };

            if (tag.affix) {
                tags.push(tag);
            }

            if (route.children) {
                route.children.forEach(processRoute);
            }
        };

        let tags: TagView[] = [];
        routes.forEach(processRoute);

        console.log('filterAffixTags', tags);

        return tags;
    };
    /**
     * @description: 添加tag
     * @return {*}
     */
    const addTags = () => {
        const { name } = route;

        if (name && !route.meta.hidden) {
            tagsViewStore.addView({
                name: route.name as string,
                title: route.meta.title || '',
                path: route.path,
                fullPath: route.fullPath,
                affix: route.meta?.affix,
                keepAlive: route.meta?.keepAlive,
            });
        }
        return false;
    };
    const scrollPane = ref();
    /**
     * @description: 移动到当前tag
     */
    const moveToCurrentTag = () => {
        nextTick(() => {
            for (const tag of visitedViews.value) {
                if (tag.path === route.path) {
                    scrollPane.value.moveToTarget(tag);
                    // when query is different then update
                    if (tag.fullPath !== route.fullPath) {
                        tagsViewStore.updateVisitedView({
                            name: route.name as string,
                            title: route.meta.title || '',
                            path: route.path,
                            fullPath: route.fullPath,
                            affix: route.meta?.affix,
                            keepAlive: route.meta?.keepAlive,
                        });
                    }
                    break;
                }
            }
        });
    };
    initTags();

    watch(
        () => route.path,
        () => {
            addTags();
            process.client && moveToCurrentTag();
        },
        {
            immediate: true,
        },
    );
    /**
     * @description: 刷新选择的tag
     * @param {*} view
     */
    const refreshSelectedTag = (view: TagView) => {
        tagsViewStore.delCachedView(view).then(() => {
            const { fullPath } = view;
            nextTick(() => {
                router.replace({
                    path: '/redirect' + fullPath,
                });
            });
        });
    };
    /**
     * @description: 关闭选择的tag
     * @param {*} view
     */
    const closeSelectedTag = (view: TagView) => {
        tagsViewStore.delView(view).then(({ visitedViews }) => {
            if (isActive(view)) {
                toLastView(visitedViews, view);
            }
        });
    };
    /**
     * @description: 关闭其他tags
     */
    const closeOthersTags = () => {
        router.push(selectedTag.value);
        tagsViewStore.delOthersViews(selectedTag.value).then(() => {
            moveToCurrentTag();
        });
    };
    /**
     * @description: 关闭所有tags
     * @param {*} view
     */
    const closeAllTags = (view: TagView) => {
        tagsViewStore.delAllViews().then(({ visitedViews }) => {
            if (affixTags.value.some(tag => tag.path === view.path)) {
                return;
            }
            toLastView(visitedViews, view);
        });
    };
    /**
     * @description: 去上一个tag
     * @param {*} visitedViews
     * @param {*} view
     */
    const toLastView = (visitedViews: TagView[], view?: TagView) => {
        const latestView = visitedViews.slice(-1)[0];
        if (latestView) {
            router.push(latestView.fullPath);
        } else if (view && view.name === 'home') {
            router.replace({ path: '/redirect' + view.fullPath });
        } else {
            router.push('/');
        }
    };
    /**
     * @description: 打开右键菜单
     * @param {*} tag
     * @param {*} e
     */
    const openMenu = (tag: TagView, e: MouseEvent) => {
        const menuMinWidth = 105;
        const offsetLeft = proxy?.$el.getBoundingClientRect().left; // container margin left
        const offsetWidth = proxy?.$el.offsetWidth; // container width
        const maxLeft = offsetWidth - menuMinWidth; // left boundary
        const l = e.clientX - offsetLeft + 15; // 15: margin right

        if (l > maxLeft) {
            left.value = maxLeft;
        } else {
            left.value = l;
        }

        top.value = e.clientY;
        visible.value = true;
        selectedTag.value = tag;
    };
    /**
     * @description: 滚动条滚动
     */
    const handleScroll = () => {
        closeMenu();
    };
    /**
     * @description: isActive
     * @param {*} tag
     * @return {boolean}
     */
    const isActive = (tag: TagView) => {
        return tag.fullPath === route.fullPath;
    };
    /**
     * @description: isAffix
     * @param {*} tag
     * @return {boolean}
     */
    const isAffix = (tag: TagView) => {
        return tag?.affix;
    };
</script>

<style lang="scss" scoped>
    .tags-view-container {
        box-sizing: border-box;
        width: 100%;
        height: $tags-view-height;
        line-height: $tags-view-height;
        background-color: #fff;
        border-bottom: 1px solid var(--el-border-color-light);
        box-shadow: 0 1px 1px var(--el-box-shadow-light);

        .tags-view-wrapper {
            .tags-view-item {
                position: relative;
                display: inline-block;
                height: 28px;
                padding: 0 8px;
                margin-left: 5px;
                font-size: 12px;
                line-height: 26px;
                cursor: pointer;
                background-color: #fff;
                border: 1px solid var(--el-border-color-light);

                .tags-item-close {
                    display: none;
                    vertical-align: middle;
                }

                &:first-of-type {
                    margin-left: 15px;
                }

                &:last-of-type {
                    margin-right: 15px;
                }

                &:hover {
                    // color: $menu-active-text;
                    // background-color: $menu-background;

                    .tags-item-close {
                        display: inline-block;
                    }
                }

                &.active {
                    color: $menu-active-text;
                    background-color: $menu-background;

                    &::before {
                        position: relative;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        margin-right: 2px;
                        content: '';
                        background: #fff;
                        border-radius: 50%;
                    }

                    .tags-item-close {
                        &:hover {
                            display: inline-block;
                            color: var(--menu-active-text);
                        }
                    }
                }
            }

            .tags-item-close {
                &:hover {
                    transform: scale(1.2);
                }
            }
        }

        .contextmenu {
            position: absolute;
            z-index: 3000;
            padding: 5px 0;
            margin: 0;
            font-size: 12px;
            font-weight: 400;
            line-height: normal;
            color: #333;
            list-style-type: none;
            background: #fff;
            border-radius: 4px;
            box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

            li {
                padding: 7px 16px;
                margin: 0;
                cursor: pointer;

                &:hover {
                    background: #eee;
                }
            }
        }
    }

    :deep(.tags-view-wrapper) {
        .tags-view-item {
            .tags-item-close {
                border-radius: 50%;
            }
        }
    }
</style>
