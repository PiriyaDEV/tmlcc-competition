export default {
  namespaced: true,
  state: {
    page: "",
    countdown: {
      end: new Date("September 1, 2021 00:00:00").getTime(),
      now: new Date().getTime(),
      close: new Date("September 15, 2021 00:00:00").getTime(),
    },
  },
  getters: {
    getPage(state) {
      return state.page;
    },
    getCountdown(state) {
      return state.countdown;
    },
    getCountdownStatus(state) {
      return state.countdown.now >= state.countdown.end ? true : false;
    },
    getCloseCountdownStatus(state) {
      return state.countdown.now >= state.countdown.close ? true : false;
    },
  },
  mutations: {
    setPage(state, value) {
      state.page = value;
    },
  },
  actions: {
    setPage({ commit }, value) {
      commit("setPage", value);
    },
  },
};
