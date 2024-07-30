<template>
    <div class="sidebar-logo-container">
        <transition name="sidebarLogoFade">
            <NuxtLink
                key="collapse"
                class="sidebar-logo-link"
                to="/"
                no-prefetch
            >
                <base-svg-icon
                    icon="logo"
                    width="208px"
                    height="64px"
                />
            </NuxtLink>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    .sidebarLogoFade-enter-active {
        transition: opacity 1.5s;
    }

    .sidebarLogoFade-enter,
    .sidebarLogoFade-leave-to {
        opacity: 0;
    }

    .sidebar-logo-container {
        position: relative;
        width: 100%;
        height: 64px;
        overflow: hidden;
        text-align: center;
        background: $menu-background;

        & .sidebar-logo-link {
            width: 100%;
            height: 100%;
        }
    }
</style>
