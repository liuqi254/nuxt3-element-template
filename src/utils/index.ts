/**
 * 判断是否有Class
 * @param {HTMLElement} ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele: HTMLElement, cls: string) {
    return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * 添加Class
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function addClass(ele: HTMLElement, cls: string) {
    if (!hasClass(ele, cls)) {
        ele.className += ' ' + cls;
    }
}

/**
 * 移除Class
 * @param {HTMLElement} ele
 * @param {string} cls
 */
export function removeClass(ele: HTMLElement, cls: string) {
    if (hasClass(ele, cls)) {
        const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

/**
 * 判断是不是链
 * @param {string} path
 * @returns {boolean}
 */
export function isExternal(path: string) {
    const isExternal = /^(https?:|http?:|mailto:|tel:)/.test(path);
    return isExternal;
}

/**
 * 判断是否是邮箱
 */
export function isEmail(email: string) {
    if (email.includes('@')) {
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是否可以滚动
 */
export function isScrollable(element: HTMLElement, type: 'vertical' | 'horizontal' = 'vertical') {
    if (type === 'vertical') {
        return element.scrollHeight > element.clientHeight;
    } else {
        return element.scrollWidth > element.clientWidth;
    }
}
