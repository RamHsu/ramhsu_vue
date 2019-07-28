export default {
    namespaced: true,
    state: {
        curChart: null
    },
    getters: {
        getCurChart: state => key => (state.curChart && state.curChart[key]) || null
    },
    mutations: {
        setcurChart: (state, { chart = null }) => (state.curChart = chart)
    },
    actions: {
        setcurChartAsnc: ({ commit }, payload) => commit("setcurChart", payload)
    }
};
