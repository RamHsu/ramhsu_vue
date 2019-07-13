// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import globalMethods from "./assets/js/globalMethods.js";
import "./assets/js/extendArray.js";
import "./assets/js/extendDate.js";
import "./assets/js/extendNumber.js";
import "./assets/js/extendString.js";

import "./assets/css/global.css";
import "./assets/css/chart.icon.css";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: "#app",
    router,
    components: { App },
    template: "<App/>",
    globalMethods
});