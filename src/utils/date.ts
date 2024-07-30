import moment from 'moment';

/**
 * 获取区间时间
 * @param startDate 开始时间
 * @param endDate 结束时间
 * @returns 日期数组
 */
export function getDatesBetween(startDate: string, endDate: string) {
    const startDateObj = moment(startDate);
    const endDateObj = moment(endDate);
    const dates = [];

    let currentDate = startDateObj.clone();

    while (currentDate.isBefore(endDateObj) || currentDate.isSame(endDateObj)) {
        dates.push(currentDate.format('YYYY-MM-DD')); // 将 dayjs 对象转换为 JavaScript Date 对象
        currentDate = currentDate.add(1, 'day'); // 增加一天
    }

    return dates;
}

/**
 * 时间取整到小时
 * @param timestamp 时间戳
 */

export function roundTimestampToHour(timestamp: number) {
    return Math.floor(timestamp / 3600) * 3600;
}

/**
 * 时间取整到半小时
 * @param timestamp 时间戳
 */
// 时间取整到半小时
export function roundTimestampToHalfHour(timestamp: number) {
    return Math.floor(timestamp / 1800) * 1800;
}

/**
 * 根据level调整时间取整
 * @param timestamp 时间戳
 * @param level 时间级别
 */
export function roundTimestampByLevel(times: number, level: number) {
    let time;
    if (level >= 1 && level < 2) {
        // 时间取整到1小时
        time = roundTimestampToHour(times) * 1000;
    } else if (level >= 2 && level < 4) {
        // 时间取整到半小时
        time = roundTimestampToHalfHour(times) * 1000;
    } else {
        // 时间不处理
        time = times * 1000;
    }

    return time;
}

/**
 * 根据生日得到年龄
 * @param {Moment|String|Number|Date|Array} [birth] 生日
 * @returns {String}
 */
export function getAgeByBirth(brith: string) {
    if (!brith) {
        return '';
    }
    const durations = moment.duration(moment().diff(brith));
    const years = durations.years();
    const months = durations.months();
    const days = durations.days();
    let result = '';
    if (years > 1) {
        result = years + '岁';
    } else if (years === 1) {
        result = years + '岁' + months + '月';
    } else if (months > 0) {
        result = months + '月' + days + '天';
    } else {
        result = days + '天';
    }
    return result;
}

/**
 * 限制日期选择范围为当日之前
 */
export const disabledDateFun = (time: Record<string, any>): boolean => {
    return time.getTime() > new Date().getTime();
};
