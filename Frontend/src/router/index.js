import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Mainpage",
    component: () => import("../views/Mainpage.vue"),
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("../views/Login.vue"),
  //   meta: {
  //     hideForAuth: true,
  //   },
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("../views/Register.vue"),
  //   meta: {
  //     hideForAuth: true,
  //   },
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: () => import("../views/Dashboard.vue"),
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
  // {
  //   path: "/dashboard/member",
  //   name: "MemberSetting",
  //   component: () => import("../views/Admin/MemberSetting.vue"),
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
  // {
  //   path: "/dashboard/file",
  //   name: "FileSetting",
  //   component: () => import("../views/Admin/FileSetting.vue"),
  //   meta: {
  //     requiresAuth: true,
  //     requiresAdmin: true,
  //   },
  // },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  let loginStatus = store.getters["auth/getLoginStatus"];

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await store.dispatch("auth/fetchRole");

    if (!loginStatus.isAuthenticated) {
      next({ name: "Login" });
    } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
      let role = store.getters["auth/getRole"];

      if (role != "admin") {
        next({ name: "Dashboard" });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.hideForAuth)) {
    if (loginStatus.isAuthenticated) {
      next({ name: "Dashboard" });
    } else {
      next();
    }
  } else {
    if (loginStatus.isAuthenticated) {
      await store.dispatch("auth/fetchRole");
    }
    next();
  }
});

export default router;
