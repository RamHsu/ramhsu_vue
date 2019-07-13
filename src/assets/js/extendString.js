String.prototype.unescapeHTML = function() {
    var str = this;
    return str
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
};

String.prototype.startsWith = function(startStr) {
    var str = this;
    return str.substring(0, startStr.length) == startStr;
};

String.prototype.endsWith = function(endStr) {
    var str = this,
        regexp = new RegExp(endStr + "$");
    return regexp.test(str);
};

// 获取字符串的真实长度 中文算2 大写英文字母算2 英文算1
String.prototype.getRealLength = function() {
    var str = this;

    return str.replace(/[\u0391-\uFFE5 A-Z]/g, "aa").length;
};

// 截取字符串 传入的begin与end均为真实字符的位置 中文算2 英文算1
String.prototype.subRealString = function(begin, end) {
    var realLength = 0,
        str = this,
        len = str.length,
        charCode = -1,
        realBegin,
        realEnd;
    for (var i = 0; i < len; i++) {
        if (realBegin === undefined && realLength >= begin) realBegin = i;

        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;

        if (realLength >= end) {
            realEnd = i;
            return str.substring(realBegin, realEnd);
        }
    }
    return realLength;
};

// 转json对象
String.prototype.translateJSON = function() {
    try {
        return JSON.parse(this);
    } catch (e) {
        return false;
    }
};

// 是否是json字符串
String.prototype.isJsonStr = function() {
    try {
        var obj = JSON.parse(this);
        if (typeof obj === "object" && obj) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
};

/**
 * var str = "{0}你好，我是{1},我今年{2}岁了";
 * str.format({ 0: "Cupid", 1: "Tina", 2: 18 });
 * str.format(["Cupid", "Tina", 18]);
 * str.format("Cupid", "Tina", 18);
 */
String.prototype.format = function(obj) {
    var self = this;
    if (typeof obj === "object") {
        for (var attr in obj) {
            self = self.replace("{" + attr + "}", obj[attr]);
        }
        // return self.replace(/\{(\d+)\}/g, "");
        return self;
    } else {
        var arr = [].slice.call(arguments);
        return self.format(arr).tostring();
    }
};

// 去除左右空格
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

// 去除左侧空格
String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "");
};

// 去除右侧空格
String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "");
};
