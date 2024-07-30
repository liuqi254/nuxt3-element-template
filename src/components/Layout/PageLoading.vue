<template>
    <div class="el-loading-mask">
        <div class="el-loading-spinner">
            <svg
                class="circular"
                viewBox="0 0 50 50"
            >
                <circle
                    class="path"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    @import 'element-plus/theme-chalk/el-loading.css';

    .el-loading-mask {
        position: absolute;
        inset: 0;
        z-index: 888;
        margin: 0;
        background-color: $body-background;
        transition: opacity var(--el-transition-duration);
    }

    .el-loading-spinner {
        position: absolute;
        top: 30vh;
        width: 100%;
        margin-top: calc((0px - 42px) / 2);
        text-align: center;
    }

    .el-loading-spinner .circular {
        display: inline;
        width: 42px;
        height: 42px;
        animation: loading-rotate 2s linear infinite;
    }
</style>
