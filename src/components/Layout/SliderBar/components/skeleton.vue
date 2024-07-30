<template>
    <el-skeleton animated>
        <template #template>
            <el-skeleton-item
                variant="rect"
                class="item"
            />
        </template>
    </el-skeleton>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .item {
        width: 200px;
        height: 40px;
    }
</style>
