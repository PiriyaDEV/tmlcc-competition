import Vue from "vue";
import VueRouter from "vue-router";
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
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   component: () => import("../views/Register.vue"),
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   component: () => import("../views/Dashboard.vue"),
  // },
  // {
  //   path: "/dashboard/member",
  //   name: "MemberSetting",
  //   component: () => import("../views/Admin/MemberSetting.vue"),
  // },
  // {
  //   path: "/dashboard/file",
  //   name: "FileSetting",
  //   component: () => import("../views/Admin/FileSetting.vue"),
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

export default router;
