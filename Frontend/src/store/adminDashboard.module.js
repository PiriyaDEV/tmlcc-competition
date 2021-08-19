import UserService from "../services/user.service";

export default {
  namespaced: true,
  state: {
    userList: [],
    staffList: [],
  },
  getters: {
    getUserList(state) {
      return state.userList;
    },
    getStaffList(state) {
      return state.staffList;
    },
  },
  mutations: {
    setUserList(state, list) {
      state.userList = list;
    },
    setStaffList(state, list) {
      state.staffList = list;
    },
  },
  actions: {
    async getUserList({ commit }) {
      await UserService.getAllUsers()
        .then((res) => {
          if (res.status == 200) {
            commit("setUserList", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getStaffList({ commit }) {
      await UserService.getAllStaffs()
        .then((res) => {
          if (res.status == 200) {
            commit("setStaffList", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
