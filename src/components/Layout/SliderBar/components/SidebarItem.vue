<template>
    <div
        v-if="!(item.meta && item.meta.hidden)"
        :title="$t(`router.${item.meta.title}`)"
    >
        <!-- 当没有子菜单 -->
        <template
            v-if="
                hasOneShowingChild(item.children, item as RouteRecordRaw) &&
                onlyOneChild &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren)
            "
        >
            <!-- <app-link
                v-if="onlyOneChild.meta"
                :to="resolvePath(onlyOneChild.path)"
            > -->
            <el-menu-item
                :index="resolvePath(onlyOneChild.path)"
                :class="{ 'submenu-title-noDropdown': isCollapse }"
                :title="$t(`router.${onlyOneChild.meta.title}`)"
            >
                <Item
                    :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
                    :title="onlyOneChild.meta.title"
                />
            </el-menu-item>
            <!-- </app-link> -->
        </template>
        <!-- 有子菜单 -->
        <el-sub-menu
            v-else
            ref="subMenu"
            :index="resolvePath(item.path)"
            teleported
        >
            <template #title>
                <Item
                    v-if="item.meta"
                    :icon="item.meta && item.meta.icon"
                    :title="item.meta.title"
                />
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :isCollapse="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="collapse-menu"
            />
        </el-sub-menu>
    </div>
</template>

<script setup lang="ts">
    import type { RouteRecordRaw } from 'vue-router';
    import path from 'path-browserify';
    import Item from './Item.vue';
    import AppLink from './Link.vue';
    import { isExternal } from '@/utils/index';

    const props = defineProps({
        /**
         * 路由(eg:user)
         */
        item: {
            type: Object,
            required: true,
        },
        /**
         * 父层级完整路由路径(eg:/system)
         */
        basePath: {
            type: String,
            required: true,
        },
        isCollapse: {
            type: Boolean,
            default: false,
        },
    });

    const onlyOneChild = ref();
    /**
     * @description: 判断有一个展示的child
     * @param {RouteRecordRaw[]} children
     * @param {RouteRecordRaw} parent
     * @returns {boolean}
     */
    const hasOneShowingChild = (children: RouteRecordRaw[] = [], parent: RouteRecordRaw) => {
        const showingChildren = children.filter(item => {
            if (item.meta && item.meta.hidden) {
                return false;
            } else {
                onlyOneChild.value = item;
                return true;
            }
        });
        // 只有一个子菜单，只显示子菜单
        // if (showingChildren.length > 1) {
        //     return true;
        // }
        if (showingChildren.length === 0) {
            onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
            return true;
        }
        return false;
    };

    /**
     * @description: 获取完整路由路径
     * @param {*} routePath
     * @return {*}
     */
    const resolvePath = (routePath: string) => {
        if (isExternal(routePath)) {
            return routePath;
        }
        if (isExternal(props.basePath)) {
            return props.basePath;
        }
        return path.resolve(props.basePath, routePath);
    };
</script>
