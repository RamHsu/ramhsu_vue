import Vue from "vue";
import Vuex from "vuex";

import chart from './modules/chart'

// 修改state时在console打印
import createLogger from "vuex/dist/logger";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        chart
    },
    strict: debug, // 严格模式，非法修改state时报错
    plugins: debug ? [createLogger()] : []
});
