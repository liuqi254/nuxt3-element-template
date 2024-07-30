// 正则
export const REGULAR = {
    // 手机号
    mobile: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/,
    // 邮箱
    email: /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
};

// input 长度限制
export const inputLength = {
    address: 100,
    name: 18,
    remarkName: 20,
    password: 16,
    sn: 12,
    mobile: 15,
    email: 50,
    height: 3,
    weight: 3,
    remark: 225,
};
