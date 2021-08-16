import AuthService from "../services/auth.service";
import decode from "jwt-decode";

export default {
  namespaced: true,
  state: {
    user:
      localStorage.getItem("accessToken") != null
        ? decode(localStorage.getItem("accessToken"))
        : {},
    loginStatus: {
      email: {
        isInvalid: false,
        message: "",
      },
      password: {
        isInvalid: false,
        message: "",
      },
      isAuthenticated: !!localStorage.getItem("accessToken"),
    },
  },
  getters: {
    getUserId(state) {
      return state.user.user_id;
    },
    getDisplayName(state) {
      return state.user.displayName;
    },
    getRole(state) {
      return state.user.role;
    },
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getRegisterStatus(state) {
      return state.registerStatus;
    },
  },
  mutations: {
    resetStatus(state) {
      state.user = {};
      state.loginStatus.email.isInvalid = false;
      state.loginStatus.email.message = "";
      state.loginStatus.password.isInvalid = false;
      state.loginStatus.password.message = "";
      state.loginStatus.isAuthenticated = false;
    },
    setAuth(state, user) {
      state.user = user;
      state.loginStatus.isAuthenticated = true;
      localStorage.setItem("accessToken", user.token);
    },
    clearAuth() {
      localStorage.removeItem("accessToken");
    },
    setInvalidEmail(state, message) {
      state.loginStatus.email.isInvalid = true;
      state.loginStatus.email.message = message;
      state.loginStatus.isAuthenticated = false;
    },
    setInvalidPassword(state, message) {
      state.loginStatus.password.isInvalid = true;
      state.loginStatus.password.message = message;
      state.loginStatus.isAuthenticated = false;
    },
  },
  actions: {
    resetStatus({ commit }) {
      commit("resetStatus");
    },
    async login({ commit }, user) {
      commit("resetStatus");
      if (!user.email) {
        commit("setInvalidEmail", "โปรดระบุชื่อผู้ใช้งาน");
      } else if (!user.password) {
        commit("setInvalidPassword", "โปรดระบุรหัสผ่าน");
      }
      await AuthService.login(user)
        .then((res) => {
          if (res.status == 200) {
            console.log("Logged in!");
            commit("setAuth", res.data);
          } else if (
            res.status == 403 &&
            res.data.message == "User not found!"
          ) {
            console.log(res.data.message);
            commit("setInvalidEmail", "ไม่พบผู้ใช้งาน");
          } else if (
            res.status == 403 &&
            res.data.message == "Invalid password!"
          ) {
            console.log(res.data.message);
            commit("setInvalidPassword", "รหัสผ่านไม่ถูกต้อง");
          }
        })
        .catch((err) => {
          console.log(err);
          commit("setInvalidPassword", "ไม่พบผู้ใช้งาน");
        });
    },
    logout({ commit }) {
      commit("clearAuth");
      commit("resetStatus");
    },
  },
};
