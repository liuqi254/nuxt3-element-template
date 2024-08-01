export function useFormRules() {
    // 表单验证规则

    return {
        // 用户名验证规则
        account: [
            {
                required: true,
                trigger: 'blur',
                message: '请输入账号',
            },
        ],
        // 密码验证规则
        password: [
            {
                trigger: 'blur',
                required: true,
                message: '请输入密码',
            },
        ],

        // 手机/邮箱验证码
        code: [
            {
                required: true,
                trigger: 'blur',
                message: '请输入验证码',
            },
        ],
    };
}
