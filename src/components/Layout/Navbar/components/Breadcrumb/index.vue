<template>
    <!-- 面包屑 -->
    <client-only>
        <el-breadcrumb
            class="app-breadcrumb"
            separator="/"
        >
            <transition-group name="breadcrumb">
                <el-breadcrumb-item
                    v-for="(item, index) in levelList"
                    :key="item.path"
                >
                    <span
                        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                        class="no-redirect"
                        >{{ item.meta?.title && $t(`router.${item.meta.title}`) }}</span
                    >
                    <a
                        v-else
                        @click.prevent="handleLink(item)"
                        >{{ item.meta?.title && $t(`router.${item.meta.title}`) }}</a
                    >
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>
    </client-only>
</template>

<script setup lang="ts">
    import type { RouteRecordRaw } from 'vue-router';
    const levelList = ref<RouteRecordRaw[]>([]);

    const route = useRoute();
    const router = useRouter();

    /**
     * @description: 获取面包屑
     * @todo 准备通过接口菜单，动态生成各级的面包屑
     */
    const getBreadcrumb = () => {
        // 只显示有标题的
        levelList.value = route.matched.filter(item => item.meta && item.meta.title);
    };

    // 监听路由变化
    watch(
        () => route.path,
        path => {
            console.log(path);
            if (path.startsWith('/redirect/')) {
                return;
            }
            getBreadcrumb();
        },
    );

    // 初始化
    onBeforeMount(() => {
        getBreadcrumb();
    });

    /**
     * @description: 点击跳转
     * @param {*} item
     */
    const handleLink = (item: RouteRecordRaw) => {
        const { redirect, path } = item;
        if (redirect) {
            router.push(redirect as string);
            return;
        }
        router.push(path);
    };
</script>

<style lang="scss" scoped>
    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        margin-left: 8px;
        font-size: 14px;
        line-height: $navbar-height;

        .no-redirect {
            font-weight: bold;
            color: $menu-text;
            cursor: text;
        }

        .el-breadcrumb__inner a,
        .el-breadcrumb__inner.is-link {
            font-weight: normal;
            color: inherit;

            &:hover {
                font-weight: bold;
                color: $menu-active-text;
            }
        }
    }
</style>
