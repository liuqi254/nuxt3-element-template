<template>
    <!-- 二级路由缓存 -->
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
