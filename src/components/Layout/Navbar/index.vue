<template>
    <div class="navbar">
        <Hamburger
            id="hamburger-container"
            :isCollapse="!sidebar.opened"
            class="hamburger-container"
            @toggle-click="toggleSideBar"
        />
        <!-- 面包屑 -->
        <Breadcrumb
            id="breadcrumb-container"
            class="breadcrumb-container"
        />
        <!-- 右侧菜单 -->
        <NavbarRight />
    </div>
</template>

<script setup lang="ts">
    import Hamburger from './components/Hamburger/index.vue';
    import Breadcrumb from './components/Breadcrumb/index.vue';
    import NavbarRight from './NavbarRight.vue';
    import { useAppStore } from '@/stores/modules/app';
    // import { useUserStore } from '@/stores/user';
    // import { useTagsViewStore } from '@/store/modules/tagsView';

    const appStore = useAppStore();
    // const userStore = useUserStore();
    // const tagsViewStore = useTagsViewStore();
    const { sidebar } = storeToRefs(appStore);

    /**
     * 左侧菜单栏显示/隐藏
     */
    const toggleSideBar = () => {
        console.log('toggleSideBar');
        console.log(sidebar.value.opened);
        appStore.toggleSideBar();
        console.log(sidebar.value.opened);
    };
</script>

<style lang="scss" scoped>
    .navbar {
        position: relative;
        height: $navbar-height;
        overflow: hidden;
        background: $menu-background;
        box-shadow: 0 1px 4px rgb(0 21 41 / 8%);

        .hamburger-container {
            display: flex;
            align-items: center;
            justify-content: center;
            float: left;
            height: 100%;
            line-height: $navbar-height;
            cursor: pointer;
            transition: background 0.3s;
            -webkit-tap-highlight-color: transparent;

            &:hover {
                background: $menu-hover-background;
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }
    }
</style>
