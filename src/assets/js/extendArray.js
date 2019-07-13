/**
 * 排序二维数组
 * @parameter index 按二维数组种的哪一位排序
 * */
Array.prototype.sortArray = function(index) {
    var arr = this,
        temp;
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i][index] > arr[j][index]) {
                temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
};

Array.prototype.distinct = function() {
    var dist = [],
        stringDist = [];
    for (var i = 0; i < this.length; i++) {
        if (stringDist.indexOf(JSON.stringify(this[i])) === -1) {
            dist.push(this[i]);
            stringDist.push(JSON.stringify(this[i]));
        }
    }
    return dist;
};

Array.prototype.find = function(func) {
    var array = this;
    if (typeof func !== "function") return;
    for (var i = 0; i < array.length; i++) {
        if (func.call(this, array[i], i, array)) return array[i];
    }
    return undefined;
};

Array.prototype.filter = function(func) {
    var array = this,
        newArray = [],
        obj;
    if (typeof func !== "function") return;
    for (var i = 0; i < array.length; i++) {
        obj = func.call(this, array[i], i, array);
        if (obj) newArray.push(array[i]);
    }
    return newArray;
};

Array.prototype.map = function(func) {
    var array = this,
        newArray = [];
    if (typeof func !== "function") return;
    for (var i = 0; i < array.length; i++) {
        newArray.push(func.call(this, array[i], i, array));
    }
    return newArray;
};