<template>
    <div class="error-content wh-fullscreen flex-center bg-white">
        <div class="flex">
            <img
                src="@/assets/images/404.png"
                alt=""
            />
            <div class="m-l-[40px] error-text">
                <p class="title">{{ props.error?.statusCode }}</p>
                <p class="des">{{ currentError?.message }}</p>
                <base-button
                    type="primary"
                    height="32px"
                    @click="$router.push('/')"
                    >{{ $t('errors.goBackToHome') }}</base-button
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        error: Object,
    });

    const currentError = computed(() => {
        let statusCode = props.error?.statusCode;

        if (process.env.NODE_ENV === 'development') {
            return {
                statusCode,
                message: props.error?.message,
                imgSrc: '@/assets/images/505.png',
            };
        } else {
            switch (statusCode) {
                case 404:
                    return errorList[0];
                case 500:
                    return errorList[1];
                case 401:
                    return errorList[2];
                default:
                    return {
                        statusCode,
                        message: props.error?.message,
                        imgSrc: '@/assets/images/505.png',
                    };
            }
        }
    });

    const { t } = useI18n();
    const errorList = [
        {
            statusCode: 404,
            message: t('errors.404'),
            imgSrc: '@/assets/images/404.png',
        },
        {
            statusCode: 505,
            message: t('errors.505'),
            imgSrc: '@/assets/images/505.png',
        },
        {
            statusCode: 401,
            message: t('errors.401'),
            imgSrc: '@/assets/images/401.png',
        },
    ];
</script>

<style lang="scss" scoped>
    .error-text {
        font-family: var(--font-family);
    }

    .title {
        margin-bottom: 8px;
        font-size: 56px;
        font-weight: 500;
        line-height: 64px;
        color: #000;
    }

    .des {
        margin-bottom: 32px;

        @include font($font-small);

        font-weight: normal;
        line-height: 24px;
    }
</style>
