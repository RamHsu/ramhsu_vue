// 处理JS浮点数相加的BUG
Number.prototype.add = function(arg) {
    function accAdd(arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length;
        } catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        } catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return (arg1 * m + arg2 * m) / m;
    }

    return accAdd(arg, this);
};

// 转为财务格式
Number.prototype.outputmoney = function() {
    var numStr = this.toFixed(2),
        pointNum = "";
    if (numStr.indexOf(".") > 0) {
        var numArr = numStr.split(".");
        numStr = numArr[0];
        pointNum = "." + numArr[1];
    }
    if (numStr.length <= 3) return (numStr == "" ? "0" : numStr) + pointNum;
    else {
        var mod = numStr.length % 3;
        var output = mod == 0 ? "" : numStr.substring(0, mod);
        for (var i = 0; i < Math.floor(numStr.length / 3); i++) {
            if (mod == 0 && i == 0)
                output += numStr.substring(mod + 3 * i, mod + 3 * i + 3);
            else output += "," + numStr.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return output + pointNum;
    }
};

/**
 * 数值转换字符串
 * 例：
 * 12345670000转换为123.45亿
 * 3.1415926转换为3.14（默认保留2位小数，如传入limit参数，则根据limit来限制，0 <= limit <=3）
 * lan为枚举值：["zh", "en"]
 * */
Number.prototype.transform = function(limit, lan) {
    var num = this,
        limitFlag = (num + "").indexOf(".") !== -1,
        intLen = 0,
        result = "";
    // 检查参数合法性
    if (limit < 0 || limit > 3) limit = 2;
    if (lan !== "zh" && lan !== "en") lan = "zh";
    // 获取整数部分长度
    if (limitFlag) {
        intLen = (num + "").indexOf(".");
    } else {
        intLen = (num + "").length;
    }
    if (intLen > 4) {
        if (lan === "zh") {
            if (intLen > 12) {
                num = num / 1000000000000;
                result = (num + "").substr(
                    0,
                    intLen - 12 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "兆";
            } else if (intLen > 8) {
                num = num / 100000000;
                result = (num + "").substr(
                    0,
                    intLen - 8 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "亿";
            } else if (intLen > 4) {
                num = num / 10000;
                result = (num + "").substr(
                    0,
                    intLen - 4 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "万";
            }
        } else if (lan === "en") {
            if (intLen > 9) {
                num = num / 1000000000;
                result = (num + "").substr(
                    0,
                    intLen - 9 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "billion";
            } else if (intLen > 6) {
                num = num / 1000000;
                result = (num + "").substr(
                    0,
                    intLen - 6 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "million";
            } else if (intLen > 3) {
                num = num / 1000;
                result = (num + "").substr(
                    0,
                    intLen - 3 + (limit === 0 ? 0 : limit + 1)
                );
                result = result.replace(/\.0+$/, "") + "thousand";
            }
        }
    } else {
        result =
            result +
            (num + "").substr(0, intLen + (limit === 0 ? 0 : limit + 1));
    }
    return result;
};