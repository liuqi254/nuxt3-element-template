<template>
    <div>
        <el-form
            ref="loginFormRef"
            :model="loginData"
            :rules="loginRules"
            class="login-form"
        >
            <!-- 账号 -->
            <el-form-item prop="account">
                <div class="form-item">
                    <el-input
                        v-model.trim="loginData.account"
                        class="form-input"
                        :placeholder="`${$t('login.account')}`"
                        name="username"
                        type="text"
                    >
                        <template #prefix>
                            <base-svg-icon
                                icon="account"
                                color="rgba(0, 0, 0, 0.25)"
                                size="16px"
                            />
                        </template>
                    </el-input>
                </div>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <div class="form-item">
                    <el-input
                        v-model.trim="loginData.password"
                        :placeholder="$t('login.password')"
                        type="password"
                        name="password"
                        class="form-input"
                        show-password
                    >
                        <template #prefix>
                            <base-svg-icon
                                icon="pwd"
                                color="rgba(0, 0, 0, 0.25)"
                                size="16px"
                            />
                        </template>
                    </el-input>
                </div>
            </el-form-item>

            <!-- 验证码 -->
            <el-form-item prop="verificationCode">
                <div class="form-item">
                    <el-input
                        v-model.trim="loginData.verificationCode"
                        auto-complete="off"
                        :placeholder="$t('login.verificationCode')"
                        class="form-input"
                        @keyup.enter="handleLogin"
                        ><template #prefix>
                            <base-svg-icon
                                icon="safe"
                                color="rgba(0, 0, 0, 0.25)"
                                size="16px"
                            />
                        </template>
                    </el-input>
                    <client-only>
                        <verification-code
                            ref="verificationCodeRef"
                            :strict="false"
                            :width="120"
                            :height="40"
                            class="captcha m-l-[15px] bg-[#F3FBFE]"
                            @get-code="getVerificationCode"
                        />
                    </client-only>
                </div>
            </el-form-item>

            <base-button
                class="m-t-[16px]"
                height="40px"
                width="100%"
                @click="handleLogin"
                :loading="loading"
            >
                {{ $t('login.login') }}
            </base-button>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import type { FormInstance } from 'element-plus';
    import type { LocationQuery, LocationQueryValue } from 'vue-router';
    import { useUserStore } from '@/stores/modules/user';
    import VerificationCode from '@/components/verification-code/index.vue';

    const userStore = useUserStore();

    const loading = ref(false); // 按钮loading
    const loginFormRef = ref<FormInstance>(); // 登录表单ref
    const { t } = useI18n(); // 国际化

    const loginData = ref({
        account: '',
        password: '',
        verificationCode: '',
    });

    // 表单规则
    const loginRules = computed(() => {
        return {};
    });

    const route = useRoute();
    const router = useRouter();

    // 生成的验证码
    let verifyCode = '';
    const verificationCodeRef = ref<InstanceType<typeof VerificationCode>>();
    // 获取验证码
    const getVerificationCode = (code: string) => {
        verifyCode = code;
    };

    /**
     * 登录
     */
    const handleLogin = () => {
        loginFormRef.value?.validate((valid: boolean) => {
            if (!valid) {
                return;
            }

            loading.value = true;
            let queryData = {
                account: loginData.value.account,
                password: loginData.value.password,
            };
            userStore
                .login(queryData)
                .then(async () => {
                    ElMessage.success(t('login.loginSuccess'));
                    // 登录成功后，获取用户信息
                    await userStore.getUserInfo();

                    const query: LocationQuery = route.query;

                    const redirect = (query.redirect as LocationQueryValue) ?? '/';

                    const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
                        if (cur !== 'redirect') {
                            acc[cur] = query[cur];
                        }
                        return acc;
                    }, {});

                    router.push({ path: redirect, query: otherQueryParams });
                })
                .catch(e => {
                    console.log(e);
                    // 验证失败，重新生成验证码
                    verificationCodeRef.value?.refreshCode();
                })
                .finally(() => {
                    loading.value = false;
                });
        });
    };
</script>

<style lang="scss" scoped></style>
