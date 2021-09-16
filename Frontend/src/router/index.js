import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Mainpage",
    component: () => import("../views/Mainpage.vue"),
    meta: {
      title: "TMLCC | Thailand Machine Learning for Chemistry Competition 2021",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login | Thailand Machine Learning for Chemistry Competition 2021",
      hideForAuth: true,
      endCountdown: true,
    },
  },
  {
    path: "/reset-password",
    name: "ForgetPass",
    component: () => import("../views/ForgetPass.vue"),
    meta: {
      title:
        "Forget Password | Thailand Machine Learning for Chemistry Competition 2021",
      hideForAuth: true,
      endCountdown: true,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      title:
        "Register | Thailand Machine Learning for Chemistry Competition 2021",
      hideForAuth: true,
      endCountdown: true,
      countdownClose: true,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      title:
        "Dashboard | Thailand Machine Learning for Chemistry Competition 2021",
      requiresAuth: true,
      endCountdown: true,
    },
  },
  {
    path: "/dashboard/member",
    name: "MemberSetting",
    component: () => import("../views/Admin/MemberSetting.vue"),
    meta: {
      title:
        "Member Setting | Thailand Machine Learning for Chemistry Competition 2021",
      requiresAuth: true,
      requiresAdmin: true,
      endCountdown: true,
    },
  },
  {
    path: "/dashboard/file",
    name: "FileSetting",
    component: () => import("../views/Admin/FileSetting.vue"),
    meta: {
      title:
        "File Setting | Thailand Machine Learning for Chemistry Competition 2021",
      requiresAuth: true,
      requiresEditor: true,
      endCountdown: true,
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: {
      title: "About | Thailand Machine Learning for Chemistry Competition 2021",
    },
  },
  {
    path: "/workshop",
    name: "Workshop",
    component: () => import("../views/Workshop.vue"),
    meta: {
      title:
        "Workshop | Thailand Machine Learning for Chemistry Competition 2021",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
  // `/nested`'s will be chosen.
  // let countdownClose = store.getters["page/getCloseCountdownStatus"];
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  } else if (previousNearestWithMeta) {
    document.title = previousNearestWithMeta.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(
    (el) => el.parentNode.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  next();
});

router.beforeEach(async (to, from, next) => {
  let loginStatus = store.getters["auth/getLoginStatus"];
  // let countdown = store.getters["page/getCountdownStatus"];
  let countdownClose = store.getters["page/getCloseCountdownStatus"];

  // if (to.matched.some((record) => record.meta.endCountdown)) {
  //   if (!countdown) {
  //     next({ name: "Mainpage" });
  //   }
  // }

  if (to.matched.some((record) => record.meta.countdownClose)) {
    if (countdownClose) {
      next({ name: "Mainpage" });
    }
  }

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    await store.dispatch("auth/fetchRole");

    if (!loginStatus.isAuthenticated) {
      next({ name: "Login" });
    } else if (to.matched.some((record) => record.meta.requiresAdmin)) {
      let role = store.getters["auth/getRole"];

      if (role == "admin") {
        next();
      } else {
        next({ name: "Dashboard" });
      }
    } else if (to.matched.some((record) => record.meta.requiresEditor)) {
      let role = store.getters["auth/getRole"];

      if (role == "editor" || role == "admin") {
        next();
      } else {
        next({ name: "Dashboard" });
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
