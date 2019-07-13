/**
 * @return String 返回格式化后的日期
 */
Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace( RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt;
};

/**
 * @return Number 返回当月天数
 */
Date.prototype.getMonthLength = function() {
    return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate(); // 本月最后一天即为本月长度
};

/**
 * @return Array 返回当前月的所有日期
 */
Date.prototype.getMonthDays = function() {
    var curYear = this.getFullYear();
    var curMonth = this.getMonth();
    var monthDaysLen = this.getMonthLength();
    var calenderDatas = [];

    for (var i = 0; i < monthDaysLen; i++) {
        calenderDatas.push(new Date(curYear, curMonth, i + 1));
    }

    return calenderDatas;
};

/**
 * @return Array 当前月对应的日历数据（6周的数据，每周第一天为周一）
 */
Date.prototype.getCalenderDays = function() {
    var curYear = this.getFullYear();
    var curMonth = this.getMonth();
    var first = new Date(curYear, curMonth, 1); // 本月1号
    var start = new Date(curYear, curMonth, first.getDate() - first.getDay() + 1); // 本月1号所在周的周一
    var startYear = start.getFullYear();
    var startMonth = start.getMonth();
    var startDay = start.getDate();
    var calenderDatas = [];
    
    // 日历通常展示6周的时间，也就是42天
    for (var i = 0; i < 42; i++) {
        calenderDatas.push(new Date(startYear, startMonth, startDay + i));
    }

    return calenderDatas;
};

/**
 * @return Number 该日期是本月的第几周（每周的第一天为周一）
 */
Date.prototype.getWeekOfMonth = function() {
    var weekday = this.getDay() || 7;
    var day = this.getDate();
    return Math.ceil((day + 6 - weekday) / 7);
};

/**
 * @return 该日期是本年度的第几周（每周的第一天为周一）
 */
Date.prototype.geWeekOftYear = function() {
    var refDate = new Date(this.getFullYear(), 0, 1);
    var diffDaylength = Math.round((this.valueOf() - refDate.valueOf()) / 86400000); // 86400000: 1天的时间 = 24小时 x 60分钟 x 60秒 x 1000毫秒
    return Math.ceil((diffDaylength + refDate.getDay()) / 7);
};