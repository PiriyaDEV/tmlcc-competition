// import AuthService from "../services/auth.service";

// export default {
//   namespaced: true,
//   state: {
//     user: {},
//     loginStatus: {
//       email: {
//         isInvalid: false,
//         message: "",
//       },
//       password: {
//         isInvalid: false,
//         message: "",
//       },
//     },
//     isAuthenticated: !!localStorage.getItem("accessToken"),
//   },
//   getters: {
//     getUserId(state) {
//       return state.user.user_id;
//     },
//     getDisplayName(state) {
//       return state.user.displayName;
//     },
//     getRole(state) {
//       return state.user.role;
//     },
//     getLoginStatus(state) {
//       return state.loginStatus;
//     },
//   },
//   mutations: {
//     resetStatus(state) {
//       state.loginStatus.email.isInvalid = false;
//       state.loginStatus.password.isInvalid = false;
//       state.isAuthenticated = false;
//     },
//     setAuth(state, user) {
//       state.user = user;
//       state.isAuthenticated = true;
//       localStorage.setItem("accessToken", res.token, {
//         expires: 1,
//       });
//     },
//     setInvalidEmail(state) {
//       state.loginStatus.email.isInvalid = true;
//       state.isAuthenticated = false;
//     },
//     setInvalidPassword(state) {
//       state.loginStatus.password.isInvalid = true;
//       state.isAuthenticated = false;
//     }
//   },
//   actions: {
//     login({ commit }, user) {
//       commit("resetStatus");
//       AuthService.login(user).then((res) => {
//         if (res.status == 200) {
//           console.log("Logged in!");
//           commit("setAuth", res.data);
//         } else if (res.status == 403 && res.data.message == "User not found!") {
//           console.log(res.data.message);
//           commit("setInvalidEmail")
//         } else if (
//            res.status == 403 &&
//            res.data.message == "Invalid password!"
//          ) {
//            console.log(res.data.message);
//            commit("setInvalidPassword")
//          }
//       });
//     },
//   },
// };
