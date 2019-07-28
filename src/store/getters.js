export default {
    getUser(state, getters) {
        return function(key = null) {
            return state.user && key ? state.user[key] : state.user;
        };
    },
    getAppInfos(state, getters) {
        return function(key = null) {
            return state.appInfos && key ? state.appInfos[key] : state.appInfos;
        };
    }
};
