export const useTagsViewStore = defineStore('tagsView', () => {
    const visitedViews = ref<TagView[]>([]);
    const cachedViews = ref<string[]>([]);
    /**
     * @description: 添加
     * @param {TagView} view 添加的路由
     */
    const addView = (view: TagView) => {
        console.log('addView', visitedViews, view);
        addVisitedView(view);
        addCachedView(view);
    };
    /**
     * @description: 添加普通
     * @param {TagView} view
     */
    const addVisitedView = (view: TagView) => {
        if (visitedViews.value.some(v => v.path === view.path)) {
            return;
        }
        // 如果视图是固定的（affix），则在已访问的视图列表的开头添加
        if (view.affix) {
            visitedViews.value.unshift(view);
        } else {
            // 如果视图不是固定的，则在已访问的视图列表的末尾添加
            visitedViews.value.push(view);
        }
    };
    /**
     * @description: 添加到缓存viewlist
     * @param {TagView} view
     */
    const addCachedView = (view: TagView) => {
        if (cachedViews.value.includes(view.name)) {
            return;
        }
        if (!view.keepAlive) {
            cachedViews.value.push(view.name);
        }
    };
    /**
     * @description: 删除
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delView = (view: TagView) => {
        return new Promise<{ visitedViews: TagView[]; cachedViews: string[] }>(resolve => {
            delVisitedView(view);
            delCachedView(view);
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            });
        });
    };
    /**
     * @description: 删除普通
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delVisitedView = (view: TagView) => {
        return new Promise(resolve => {
            for (const [i, v] of visitedViews.value.entries()) {
                if (v.path === view.path) {
                    visitedViews.value.splice(i, 1);
                    break;
                }
            }
            resolve(visitedViews.value);
        });
    };
    /**
     * @description: 删除缓存
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delCachedView = (view: TagView) => {
        return new Promise(resolve => {
            const index = cachedViews.value.indexOf(view.name);
            index > -1 && cachedViews.value.splice(index, 1);
            resolve(cachedViews.value);
        });
    };
    /**
     * @description: 删除其他
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delOthersViews = (view: TagView) => {
        return new Promise<{ visitedViews: TagView[]; cachedViews: string[] }>(resolve => {
            delOthersVisitedViews(view);
            delOthersCachedViews(view);
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            });
        });
    };
    /**
     * @description: 删除其他普通
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delOthersVisitedViews = (view: TagView) => {
        return new Promise(resolve => {
            visitedViews.value = visitedViews.value.filter(v => {
                return v.affix || v.path === view.path;
            });
            resolve(visitedViews.value);
        });
    };
    /**
     * @description: 删除其他缓存
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delOthersCachedViews = (view: TagView) => {
        return new Promise(resolve => {
            const index = cachedViews.value.indexOf(view.name);
            if (index > -1) {
                cachedViews.value = cachedViews.value.slice(index, index + 1);
            } else {
                // if index = -1, there is no cached tags
                cachedViews.value = [];
            }
            resolve(cachedViews.value);
        });
    };
    /**
     * @description: 删除所有
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delAllViews = () => {
        return new Promise<{ visitedViews: TagView[]; cachedViews: string[] }>(resolve => {
            delAllVisitedViews();
            delAllCachedViews();
            resolve({
                visitedViews: [...visitedViews.value],
                cachedViews: [...cachedViews.value],
            });
        });
    };
    /**
     * @description: 删除所有普通
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delAllVisitedViews = () => {
        return new Promise(resolve => {
            visitedViews.value = visitedViews.value.filter(v => {
                return v.affix;
            });
            resolve(visitedViews.value);
        });
    };
    /**
     * @description: 删除所有缓存
     * @param {TagView} view
     * @return {Promise<TagView[]>}
     */
    const delAllCachedViews = () => {
        return new Promise(resolve => {
            cachedViews.value = [];
            resolve(cachedViews.value);
        });
    };
    /**
     * @description: 更新
     * @param {TagView} view
     */
    const updateVisitedView = (view: TagView) => {
        for (let v of visitedViews.value) {
            if (v.path === view.path) {
                v = Object.assign(v, view);
                break;
            }
        }
    };

    return {
        visitedViews,
        cachedViews,
        addView,
        addVisitedView,
        addCachedView,
        delView,
        delVisitedView,
        delCachedView,
        delOthersViews,
        delOthersVisitedViews,
        delOthersCachedViews,
        delAllViews,
        delAllVisitedViews,
        delAllCachedViews,
        updateVisitedView,
    };
});
