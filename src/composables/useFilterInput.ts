export default function useFilterInput(formData: Ref<any>) {
    const filterChart = (key: string) => {
        // 只显示字母\数字\特殊字符
        formData.value[key] = formData.value[key].replace(/[^\w-!@#$%^&*./]/gi, '');
    };

    const filterNumberAndChart = (key: string) => {
        // 只显示数字和字母
        formData.value[key] = formData.value[key].replace(/[^a-zA-Z0-9]/gi, '');
    };

    return {
        filterChart,
        filterNumberAndChart,
    };
}
