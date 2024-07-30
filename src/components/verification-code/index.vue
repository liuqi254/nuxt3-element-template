<!-- 验证码 -->
<template>
    <div>
        <canvas
            ref="canvasRef"
            class="canvas"
            @click="refreshCode"
        ></canvas>
    </div>
</template>

<script lang="ts" setup>
    const props = defineProps({
        // 验证码宽度
        width: {
            type: Number,
            default: 90,
        },

        // 验证码高度
        height: {
            type: Number,
            default: 35,
        },

        // 验证码字体
        codeFont: {
            type: String,
            default: '22px arial',
        },

        // 验证码类型
        // calc：验证码为计算公式
        // code：验证码为数字大小写字母组合
        codeType: {
            type: String,
            default: 'code', // calc | code
        },

        // 验证码长度
        codeLength: {
            type: Number,
            default: 4,
        },

        // 验证码大小写是否敏感
        strict: {
            type: Boolean,
            default: false,
        },

        // 验证码计算范围
        calcRange: {
            type: Array<number>,
            default: [0, 10],
        },
        // 验证码计算符号
        calcSymbol: {
            type: Array<any>,
            default: ['+', '-', '*'],
        },

        // 背景干扰线数量
        lineCount: {
            type: Number,
            default: 4,
        },
    });

    const emit = defineEmits<{
        (e: 'getCode', code: string): void;
    }>();

    const canvasRef = ref();

    onMounted(() => {
        nextTick(() => {
            canvasRef.value.width = props.width;
            canvasRef.value.height = props.height;

            canvasRef.value = canvasRef.value?.getContext('2d');
            display();
        });
    });

    // 刷新验证码
    const refreshCode = () => {
        display();
    };

    const display = () => {
        // 清空画布
        canvasRef.value.clearRect(0, 0, props.width, props.height);

        // 绘制验证码背景
        createLine();

        // 定义验证码属性
        canvasRef.value.font = props.codeFont;
        canvasRef.value.textAlign = 'left';
        canvasRef.value.textBaseline = 'middle';

        // 绘制验证码
        let code = createCode();
        for (let i = 0; i < props.codeLength; i++) {
            canvasRef.value.save();
            canvasRef.value.fillStyle = randomColor();
            canvasRef.value.translate(
                ((i + 0.2) * props.width) / props.codeLength,
                getRandom([props.height * 0.3, props.height * 0.7]),
            );
            canvasRef.value.rotate((getRandom([-30, 30]) * Math.PI) / 180);
            canvasRef.value.fillText(code[i], 0, 0);
            canvasRef.value.restore();
        }
    };

    const createLine = () => {
        for (let i = 0; i < props.lineCount; i++) {
            let start = [-props.width / 2, props.width * 1.5];
            let end = [-props.height / 2, props.height * 1.5];

            canvasRef.value.lineWidth = getRandom([1, 3]);
            canvasRef.value.strokeStyle = randomColor();
            canvasRef.value.beginPath();
            canvasRef.value.moveTo(getRandom(start), getRandom(end));
            canvasRef.value.lineTo(getRandom(start), getRandom(end));
            canvasRef.value.stroke();
        }
    };

    const createCode = () => {
        let result = '';
        // 验证码为数字字符串
        if (props.codeType === 'code') {
            result = getString({ length: props.codeLength });
            emit('getCode', props.strict ? result : result.toLocaleLowerCase());
            return result;
        }

        // 验证码为计算公式
        const SUB = getRandom(props.calcRange);
        const SUM = getArray(props.calcSymbol);
        const MIN = getRandom(props.calcRange);
        result = SUB + SUM + MIN;
        emit('getCode', '' + result);
        return SUB + (SUM === '*' ? 'x' : SUM) + MIN;
    };

    /**
     * 生成指定范围内的随机数
     *
     * @param {array} [min,max] 数组包含最大值和最小值
     * @return {number}
     */
    const getRandom = ([min = 0, max = 0]: number[]) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    /**
     * 返回随机生成指定长度的数字字母组合
     *
     * @param {number} length 生成的字符串长度
     * @param {string} str 指定参与生成的字符串
     * @param {string} split 分隔位数
     * @param {string} join 分隔符
     * @return {string}
     */
    const getString = ({
        length = 0,
        // str = 'abacdefghjklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789',
        str = '0123456789',
        split = 0,
        join = '-',
    }) => {
        let string = '';
        for (let i = 0; i < length; i++) {
            if (split > 0 && i !== 0 && i % split === 0) {
                string += join;
            }
            string += str[getRandom([0, str.length - 1])];
        }
        return string;
    };

    const isArray = (o: any) => {
        return Object.prototype.toString.call(o) === '[object Array]';
    };

    // 随机获取数组中某一项
    const getArray = (arr: Array<any>) => {
        if (!isArray(arr)) {
            throw new Error('argument must be an Array');
        }
        return arr[Math.floor(Math.random() * arr.length)];
    };

    // 生成随机色
    const randomColor = () => {
        return `#${(Math.random() * (0xffffff as any).toString(10)).toString(16).slice(-6)}`;
    };

    defineExpose({
        refreshCode,
    });
</script>
<style lang="scss" scoped>
    .canvas {
        cursor: pointer;
    }
</style>
