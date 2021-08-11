export default {
  namespaced: true,
  state: {
    page: "",
  },
  getters: {
    getPage(state) {
      return state.page;
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
