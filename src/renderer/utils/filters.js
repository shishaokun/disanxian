/**
 * 发贴时间
 *
 * @param  {number} timestamp 发贴时间戳
 * @return {string}           发贴时间
 */
/* eslint-disable */
export function postTime(timestamp) {
    // 补全为13位
    let arrTimestamp = (timestamp + '').split('');
    for (let start = 0; start < 13; start++) {
        if (!arrTimestamp[start]) {
            arrTimestamp[start] = '0';
        }
    }
    timestamp = arrTimestamp.join('') * 1;
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    // let halfamonth = day * 15
    let month = day * 30;
    let now = new Date().getTime();
    let diffValue = now - timestamp;
    // 如果本地时间反而小于变量时间
    if (diffValue < 0) {
        return '不久前';
    }
    // 计算差异时间的量级
    let monthC = diffValue / month;
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    // 数值补0方法
    let zero = function (value) {
        if (value < 10) {
            return '0' + value;
        }
        return value;
    };
    // 使用
    if (monthC > new Date(timestamp).getMonth()) {
    // 超过1年，直接显示年月日
        return (function () {
            let date = new Date(timestamp);
            return date.getFullYear() + '-' + zero(date.getMonth() + 1) + '-' + zero(date.getDate());
        })();
    }
    else if (monthC >= 1) {
        return (function () {
            let date = new Date(timestamp);
            return zero(date.getMonth() + 1) + '-' + zero(date.getDate());
        })();
    }
    else if (dayC >= 1) {
        return parseInt(dayC, 10) + '天前';
    }
    else if (hourC >= 1) {
        return parseInt(hourC, 10) + '小时前';
    }
    else if (minC >= 1) {
        return parseInt(minC, 10) + '分钟前';
    }
    return '刚刚';
}
/**
 * 数字 大于10000的 显示x.xw
 *
 * @param  {number} value 数字
 * @return {string}       value
 */
export function numFormat(value = 0) {
    // 小于万 正常展示
    if (value < 10000) {
        return value;
    }
    else if (value >= 10000000) { // 大于千万 展示x.xkw
        return +(value / 10000000).toFixed(1) + 'kw';
    }
    else { // 大于万小于千万 展现x.xw
        return +(value / 10000).toFixed(1) + 'w';
    }
}
/**
 * 播放时长
 *
 * @param  {number} time 时间
 * @return {string}      时间
 */
export function playDuration(time) {
    let hour = parseInt(time / (60 * 60), 10);
    time = time % (60 * 60);
    let minute = parseInt(time / 60, 10);
    let second = time % 60;
    hour = hour > 9 ? hour : '0' + hour;
    minute = minute > 9 ? minute : '0' + minute;
    second = second > 9 ? second : '0' + second;
    if (hour > 0) {
        return hour + ':' + minute + ':' + second;
    }
    else {
        return minute + ':' + second;
    }
}
/**
 * xss
 *
 * @param  {string} content 原字符串
 * @return {string}         替换后的结果
 */
export function xssFilter(content) {
    return content.replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
