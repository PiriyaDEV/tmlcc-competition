import Vue from "vue";
import Vuex from "vuex";

import page from "./page.module";
import auth from "./auth.module";
import team from "./team.module";
import admin from "./adminDashboard.module";
import video from "./video.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    page,
    auth,
    team,
    admin,
    video,
  },
});
