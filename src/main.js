// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import i18n from "./i18n";

// 原型扩展
import "./assets/js/extendArray.js";
import "./assets/js/extendDate.js";
import "./assets/js/extendNumber.js";
import "./assets/js/extendString.js";

// 全局样式
import "./assets/css/global.css";
import "./assets/css/font-awesome.css";

// 使用Axioss (ajax)
import VueAxios from "vue-axios";
import axios from "axios";
Vue.use(VueAxios, axios);

import global from "@/assets/js/global";
Vue.use(global, { Vue }); // 注入公共内容

// 设置为 false 以阻止 vue 在启动时生成生产提示
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