import Vue from "vue";
import Vuex from "vuex";

import user from "./user.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    page: "",
  },
  mutations: {
    setPage(state, value) {
      state.page = value;
    },
  },
  actions: {
    inputPage(context, value) {
      context.commit("setPage", value);
    },
  },
  getters: {
    getPage(state) {
      return state.page;
    },
  },
  modules: {
    user,
  },
});
