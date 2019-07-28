export default {
    setUser(state, { user = null }) {
        state.user = user;
    },
    setAppInfos(state, { appInfos = null }) {
        state.appInfos = appInfos;
    },
};
