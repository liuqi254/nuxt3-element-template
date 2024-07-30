<!-- 登录页面 -->
<template>
    <div class="login-container">
        <!-- logo -->
        <base-svg-icon
            icon="logo"
            color="#fff"
            width="210px"
            height="68px"
            class="login-logo"
        />
        <!-- 语言切换 -->
        <lang-select>
            <template #title="{ title }">
                <div class="header-lang-right cursor-pointer">
                    {{ title }} <el-icon class="m-l-[7.5px]"><ArrowDown /></el-icon>
                </div>
            </template>
        </lang-select>
        <!-- 表单 -->
        <div class="login-card">
            <div
                class="tab-header"
                @click="switchLoginType"
            >
                <div
                    class="tab-title"
                    :class="{ 'is-active': loginType === 'accountLogin' }"
                    data-type="accountLogin"
                >
                    {{ $t('login.accountLogin') }}
                </div>
                <div
                    class="tab-title"
                    :class="{ 'is-active': loginType === 'scanLogin' }"
                    data-type="scanLogin"
                    v-if="loginType !== 'register'"
                >
                    {{ $t('login.scanLogin') }}
                </div>
                <div
                    class="tab-title"
                    :class="{ 'is-active': loginType === 'register' }"
                    data-type="register"
                    v-if="loginType === 'register'"
                >
                    {{ $t('login.register') }}
                </div>
            </div>
            <div class="tab-content">
                <div v-show="loginType === 'accountLogin'">
                    <!-- 登录表单 -->
                    <login-form />
                    <div class="form-bottom m-t-[32px]">
                        <span class="color-[var(--login-active-color)]">{{ $t('login.register') }}</span>
                        <span class="text-[#FF6511]/85">{{ $t('login.ForgotPassword') }} ？</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ArrowDown } from '@element-plus/icons-vue';

    import LoginForm from './components/login-form.vue';

    let loginType = ref('accountLogin'); // 登录方式

    const switchLoginType = (e: any) => {
        loginType.value = e.target.dataset.type;
    };
</script>

<style lang="scss" scoped>
    .login-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-width: 1200px;
        height: 100%;
        overflow-y: auto;
        background: url('@/assets/images/login-bg.png') no-repeat;
        background-size: 100% 100%;

        .login-logo {
            position: absolute;
            top: 3%;
            left: 2%;
            z-index: 1;
            filter: drop-shadow(0 4px 10px rgb(0 0 0 / 30%));
        }

        .header-lang-right {
            position: fixed;
            top: 20px;
            right: 20px;
            color: #fff;
        }

        .tab-header {
            display: flex;

            .tab-title {
                flex: 1;
                font-family: $font-family;
                font-size: 24px;
                font-weight: 500;
                line-height: 36px;
                text-align: center;
                cursor: pointer;
                border-bottom: 2px solid #f0f0f0;

                &.is-active {
                    color: $menu-background;
                    border-bottom: 2px solid $menu-background;
                }

                &:hover {
                    color: $menu-background;
                }
            }
        }

        .login-card {
            position: relative;
            left: 20%;
            width: 500px;
            min-height: 500px;
            padding: 48px 70px;
            background-color: #fff;
            border-radius: 0 2px 2px 0;
            box-shadow:
                0 4px 8px 0 rgb(0 0 0 / 5%),
                0 8px 28 px 8px rgb(0 0 0 / 7%);

            @media screen and (width <= 900px) {
                left: 0;
            }

            .scan-text {
                @include font($font-small);

                font-weight: 350;
                line-height: 22px;
            }
        }

        :deep(.login-form) {
            padding: 30px 0;

            .el-button {
                span {
                    @include font($font-small);

                    font-weight: 350;
                    line-height: 24px;
                }
            }

            .el-input__wrapper,
            .el-textarea__inner {
                border-radius: 2px;
                box-shadow: 0 0 0 1px #e0e0e0 inset;
            }

            .captcha {
                height: 40px;

                .el-image {
                    flex: 1;
                    height: 48px;
                    cursor: pointer;
                }

                .image-slot {
                    display: flex;
                    align-items: center;
                    justify-content: right;
                    width: 100%;
                    height: 100%;
                    font-size: 18px;
                    color: var(--el-text-color-secondary);
                    background: var(--el-fill-color-light);

                    svg {
                        margin-right: 10px;
                    }
                }
            }

            .form-item {
                display: flex;
                align-items: center;
                width: 100%;

                .mg2 {
                    margin: 0 0.5rem;
                }

                .form-input {
                    flex: 1;
                    height: 40px;
                }

                .right-icon {
                    margin-right: 0.5rem;
                    cursor: pointer;
                }
            }

            .el-form-item {
                margin-bottom: 24px;
            }
        }
    }

    .form-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: var(--font-family);
        font-weight: 500;
        line-height: 22px;

        span {
            cursor: pointer;
        }
    }

    .login-bottom {
        position: absolute;
        bottom: 0.25rem;
        font-size: 10px;
        text-align: center;
    }

    :deep(.el-tabs) {
        .el-tabs__content {
            overflow: visible;
        }

        .el-tabs__item {
            padding: 0;
            font-family: var(--font-family);
            font-size: 24px;
            font-weight: 500;
            line-height: 36px;

            &.is-active {
                color: var(--login-active-color);
            }

            &:hover {
                color: var(--login-active-color);
            }
        }

        .el-tabs__active-bar {
            background-color: var(--login-active-color);
        }

        .el-tabs__header {
            margin-bottom: 10px;
        }
    }

    :deep(.el-input) {
        .el-input__wrapper {
            border-radius: 2px;

            &.is-focus {
                border: 1px solid var(--login-active-color);
                box-shadow: 0 0 0 3px rgb(64 134 255 / 20%);
            }
        }

        .el-input__inner {
            font-family: var(--font-family);
            font-weight: 350;
            color: var(--font-black1);

            &::placeholder {
                color: var(--font-black7);
            }
        }
    }
</style>
