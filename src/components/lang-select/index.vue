<template>
    <!-- 语言选择 -->
    <el-dropdown
        trigger="click"
        @command="handleLanguageChange"
    >
        <slot
            name="title"
            :title="$t(`language.${locale}`)"
        >
            <div class="title">
                {{ $t(`language.${locale}`) }}
            </div>
        </slot>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    :disabled="locale === item"
                    :command="item"
                    v-for="item in localeCodes"
                    :key="item"
                >
                    {{ $t(`language.${item}`) }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
    import { useAppStore } from '~/stores/modules/app';

    defineProps({
        size: {
            type: String,
            required: false,
        },
    });

    const { locale, localeCodes } = useI18n();

    /**
     * @description: 选择语言
     * @param {*} lang
     */
    function handleLanguageChange(lang: string) {
        useAppStore().setLanguage(lang);
        // setLocaleCookie(lang);
        // location.reload();
    }
</script>

<style scoped lang="scss">
    .title {
        @include font($font-large);

        display: flex;
        align-items: center;
        height: 100%;
    }

    .mobile {
        .title {
            @include font($font-large);
        }
    }
</style>
