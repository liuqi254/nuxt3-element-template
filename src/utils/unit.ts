// 英尺转为CM
export function ftInToCm(ft: number, inch: number) {
    // 将英尺转换为英寸
    let inches = ft * 12 + inch;
    // 将英寸转换为厘米
    let centimeters = inches * 2.54;

    return Math.round(centimeters);
}

// 厘米转为英尺
export function cmToFeetInches(cm: number) {
    const inches = cm / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;

    return { feet, inches: Math.round(remainingInches) };
}

// 磅转为kg
export function poundsToKilograms(pounds: number) {
    return Math.round(pounds * 0.45359237);
}

// kg转为磅
export function kilogramsToPounds(kilograms: number) {
    return Math.round(kilograms / 0.45359237);
}

// 计算BMI
export function calculateBMI(weight: number, height: number) {
    if (weight === 0 || height === 0) {
        return 0;
    }
    return (weight / (height / 100) ** 2).toFixed(2);
}
