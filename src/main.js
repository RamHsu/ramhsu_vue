// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from './store'
import i18n from "./i18n";

// 原型扩展
import "./assets/js/extendArray.js";
import "./assets/js/extendDate.js";
import "./assets/js/extendNumber.js";
import "./assets/js/extendString.js";

// 全局样式
import "./assets/css/global.css";
import "./assets/css/border.css";
import "./assets/css/chart.icon.css";

// 挂载全局公共方法
import globalMethods from "./assets/js/globalMethods.js";
Object.keys(globalMethods).forEach(key => {
    Vue.prototype[key] = globalMethods[key];
});

/* 
    使用EventBus实现全局通信
    windLoad: window load事件
    windowResize: window resize事件
    bodyClick: body click事件
*/
Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;

// eslint-disable no-new
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>",
    store,
    i18n
});