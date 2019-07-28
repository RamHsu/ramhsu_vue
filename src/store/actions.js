export default {
    setUserAsync({ commit }, payload) {
        commit("setUser", payload);
    },
    setAppInfosAsync({ commit }, payload) {
        commit("setAppInfos", payload);
    }
};
