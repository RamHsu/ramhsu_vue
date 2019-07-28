export default {
    install: function(Vue) {
        /**
         * 事件总线（EventBus）
         */
        Vue.prototype.$EventBus = new Vue();

        /**
         * requestList
         */
        Vue.$requestList = {};

        /**
         * 取消对应的地址的请求
         * @param url 对应的请求地址
         */
        Vue.prototype.$cancelRequest = function(url) {
            if (!url) return false;
            if (Vue.$requestList[url] && Vue.$requestList[url].length) {
                Vue.$requestList[url].forEach(function(prevToken) {
                    prevToken({
                        type: "cancel",
                        message: "Cancel RequestServer!"
                    });
                });
            }
        };

        /**
         * 统一请求方法
         */
        Vue.prototype.$axios = function({
            url = false, // api
            method = "get", // 请求方式
            responseType = "application/json", // 响应数据的类型
            contentType = "application/json;charset=UTF-8", // 一般是指网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件
            cancelBefore = false, // 是否取消之前相同的请求
            params, // 请求参数，放在url中
            data, // post请求体
            onUploadProgress, // 上传进度
            onDownloadProgress, // 下载进度
            successCallback, // status等于200
            errorCallback, // 请求失败或status不等于200
            finallyCallback, // 请求执行完后执行的操作
        }) {
            if (!url) return;
            this.axios({
                url: url,
                method: method,
                responseType: responseType,
                headers: {
                    "Content-Type": contentType
                },
                params: params,
                data: data,
                paramsSerializer: function(params) {
                    return qs.stringify(params, { indices: false });
                },
                onUploadProgress: function(progressEvent) {
                    typeof onUploadProgress === "function" && onUploadProgress(progressEvent);
                },
                onDownloadProgress: function(progressEvent) {
                    typeof onDownloadProgress === "function" && onDownloadProgress(progressEvent);
                },
                cancelToken: new Vue.axios.CancelToken(function(cancel) {
                    if (cancelBefore) {
                        let uniqueKey = url + "_" + method.toLowerCase();
                        if (Vue.$requestList[uniqueKey] &&Vue.$requestList[uniqueKey].length) {
                            Vue.$requestList[uniqueKey].forEach(function(prevToken) {
                                prevToken({
                                    type: "cancel",
                                    message: "cancelRequest"
                                });
                            });
                        }
                        Vue.$requestList[uniqueKey] = [];
                        Vue.$requestList[uniqueKey].push(cancel);
                    }
                })
            })
                .then(function(response) {
                    if (response.status === 200) {
                        typeof successCallback === "function" && successCallback(response.data);
                    } else {
                        typeof errorCallback === "function" && errorCallback();
                    }
                })
                .catch(function(error) {
                    if (error.message && error.message.type === "cancel") {
                        console.log("cancel $http...");
                    } else {
                        console.log(error);
                        typeof errorCallback === "function" && errorCallback();
                    }
                })
                .finally(function() {
                    typeof finallyCallback === "function" && finallyCallback();
                });
        };

        /**
         * API
         */
        Vue.prototype._localUrls = {
            host: document.location.host,
            // UC
            login: "/uc/login",
            getLoginStatus: "/uc/status",
            logout: "/uc/logout"
        };

        /**
         * getCookie
         * @param c_name cookie name
         */
        Vue.prototype.getCookie = function(c_name) {
            var c_start, c_end;
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return "";
        };

        /**
         * setCookie
         * @param c_name cookie name
         * @param value cookie value
         * @param expiredays expire days
         */
        Vue.prototype.setCookie = function(c_name, value, expiredays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + expiredays);
            document.cookie = c_name + "=" + escape(value) + (expiredays === null ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
        };

        /**
         * delCookie
         * @param c_name cookie name
         */
        Vue.prototype.delCookie = function(c_name) {
            var cookie = common.cookies;
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = cookie.getCookie(c_name);
            if (cval != null) {
                document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        };
    }
};
