export default {
    /**
     * @param element  dom
     * @param attr css属性
     */
    getStyle(element, attr) {
        var value = null;
        try {
            value = window.getComputedStyle(element, null)[attr];
        } catch (e) {
            value = element.currentStyle[attr];
        }
        return value;
    },

    /**
     * 获取浏览器信息
     * @return Object { browser, version }
     */
    getBrowserInfo() {
        var userAgent = navigator.userAgent.toLocaleLowerCase(),
            currentBrowser,
            currentVersion,
            s;
        (s = userAgent.match(/msie ([\d.]+)/))
            ? ((currentBrowser = "ie"), (currentVersion = s[1]))
            : (s = userAgent.match(/firefox\/([\d.]+)/))
            ? ((currentBrowser = "firefox"), (currentVersion = s[1]))
            : (s = userAgent.match(/chrome\/([\d.]+)/))
            ? ((currentBrowser = "chrome"), (currentVersion = s[1]))
            : (s = userAgent.match(/opera.([\d.]+)/))
            ? ((currentBrowser = "opera"), (currentVersion = s[1]))
            : (s = userAgent.match(/version\/([\d.]+).*safari/))
            ? ((currentBrowser = "safari"), (currentVersion = s[1]))
            : (s = userAgent.match(/qqbrowser\/([\d.]+)/))
            ? ((currentBrowser = "qqie"), (currentVersion = s[1]))
            : (s = userAgent.match(/rv:([\d.]+)/))
            ? ((currentBrowser = "ie"), (currentVersion = s[1]))
            : 0;

        return {
            browser: currentBrowser,
            version: currentVersion
        };
    },

    /**
     * 获取浏览器语言
     * @return String "chinese" or "english"
     */
    getBrowserLanguage() {
        var curLang = navigator.language || navigator.browserlanguage || "";
        if (curLang.startsWith("zh-")) return "chinese";
        else return "english";
    },
    
    /**
     * @param start  开始日期（日期 / 日期字符串）
     * @param end  结束日期（日期 / 日期字符串）
     * @return Number 从开始日期到结束日期（不含）的天数
     */
    getDaysDiff(start, end) {
        // 86400000: 1天的时间 = 24小时 x 60分钟 x 60秒 x 1000毫秒
        return parseInt(
            Math.abs(new Date(start).getTime() - new Date(end).getTime()) /
                86400000
        );
    },

    /**
     * @param start  开始日期（日期 / 日期字符串）
     * @param end  结束日期（日期 / 日期字符串）
     * @return Number 从开始日期到结束日期（不含）的月数
     */
    getMonthsDiff(start, end) {
        var startDate = new Date(start);
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var endDate = new Date(end);
        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth();
        return (endYear - startYear) * 12 - startMonth + endMonth;
    },

    /**
     * @param start  开始日期（日期 / 日期字符串）
     * @param end  结束日期（日期 / 日期字符串）
     * @return Array 从开始日期到结束日期（不含）的每一天的日期对象
     */
    getDays(start, end) {
        var startDate = new Date(Math.min(new Date(start), new Date(end)));
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var startDay = startDate.getDate();
        var dayLength = this.getDaysDiff(start, end);
        var calenderDatas = [];

        for (var i = 0; i < dayLength; i++) {
            calenderDatas.push(new Date(startYear, startMonth, startDay + i));
        }

        return calenderDatas;
    },

    /**
     * @param start  开始日期（日期 / 日期字符串）
     * @param end  结束日期（日期 / 日期字符串）
     * @return Array 从开始日期到结束日期（不含）的每个月的日期对象
     */
    getMonths(start, end) {
        var startDate = new Date(Math.min(new Date(start), new Date(end)));
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var monthLength = this.getMonthsDiff(start, end);
        var calenderDatas = [];

        for (var i = 0; i < monthLength; i++) {
            calenderDatas.push(new Date(startYear, startMonth + i, 1));
        }

        return calenderDatas;
    }
};
