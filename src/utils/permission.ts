/**
 * 判断是否有权限
 * @param arr1 当前路由需要的权限
 * @param arr2 当前用户权限
 * @returns
 */
export function haveRoles(arr1: string[], arr2: string[]) {
    return arr1.some(item => arr2.includes(item));
}
