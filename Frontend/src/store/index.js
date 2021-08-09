import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "mainpage",
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
  modules: {
    auth,
  },
});
