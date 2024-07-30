export function useFormRules(formData?: any) {
    // 表单验证规则
    const { t } = useI18n();
    return {
        // 用户名验证规则
        account: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.pleaseInput') + t('login.account'),
            },
            {
                min: 3,
                max: 18,
                message: t('login.accountRule'),
                trigger: 'blur',
            },
        ],
        // 密码验证规则
        password: [
            {
                trigger: 'blur',
                required: true,
                message: t('form.pleaseInput') + t('login.password'),
            },
            {
                min: 6,
                max: 16,
                message: t('login.passwordRule'),
                trigger: 'blur',
            },
        ],

        // 手机/邮箱验证码
        code: [
            {
                required: true,
                trigger: 'blur',
                message: t('form.pleaseInput') + t('login.verificationCode'),
            },
        ],
    };
}
