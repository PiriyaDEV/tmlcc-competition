import Vue from "vue";
import Vuex from "vuex";

import page from "./page.module";
import auth from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    page,
    auth,
  },
});
