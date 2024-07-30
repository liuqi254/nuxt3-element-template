/**
 * 检查输入大小写状态
 * @param e
 */
export const checkCapslock = (e: KeyboardEvent) => {
    const { key } = e;
    let isCapslock = (key && key.length === 1 && key >= 'A' && key <= 'Z') as boolean;

    return isCapslock;
};
