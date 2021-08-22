import UserService from "../services/user.service";

export default {
  namespaced: true,
  state: {
    userList: [],
    staffList: [],
    user: {
      select: {},
      search: "",
    },
    staff: {
      role: "",
      search: "",
    },
  },
  getters: {
    getUserList(state) {
      if (state.user.search) {
        return state.userList.filter((user) => {
          let keyword = state.user.search.toLowerCase().trim();

          return (
            user.displayName.toLowerCase().trim().includes(keyword) ||
            user.firstName.toLowerCase().trim().includes(keyword) ||
            user.lastName.toLowerCase().trim().includes(keyword) ||
            user.teamName.toLowerCase().trim().includes(keyword) ||
            user.email.toLowerCase().trim().includes(keyword) ||
            user.education.toLowerCase().trim().includes(keyword)
          );
        });
      } else {
        return state.userList;
      }
    },
    getStaffList(state) {
      if (state.staff.search || state.staff.role) {
        return state.staffList.filter((staff) => {
          let keyword = state.staff.search.toLowerCase().trim();

          if (state.staff.role) {
            return (
              (staff.firstName.toLowerCase().trim().includes(keyword) ||
                staff.lastName.toLowerCase().trim().includes(keyword) ||
                staff.phone.toLowerCase().trim().includes(keyword) ||
                staff.email.toLowerCase().trim().includes(keyword) ||
                staff.organization.toLowerCase().trim().includes(keyword)) &&
              staff.role == state.staff.role
            );
          }

          return (
            staff.firstName.toLowerCase().trim().includes(keyword) ||
            staff.lastName.toLowerCase().trim().includes(keyword) ||
            staff.phone.toLowerCase().trim().includes(keyword) ||
            staff.email.toLowerCase().trim().includes(keyword) ||
            staff.organization.toLowerCase().trim().includes(keyword)
          );
        });
      } else {
        return state.staffList;
      }
    },
    getUserSelect(state) {
      return state.user.select;
    },
  },
  mutations: {
    resetUserSelect(state) {
      state.user.select = {};
    },
    setUserList(state, list) {
      state.userList = list;
    },
    setStaffList(state, list) {
      state.staffList = list;
    },
    setUserSelect(state, user) {
      state.user.select = user;
    },
    setUserSearch(state, keyword) {
      state.user.search = keyword;
    },
    setStaffSearch(state, keyword) {
      state.staff.search = keyword;
    },
    setStaffSearchRole(state, role) {
      state.staff.role = role;
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
    async getUserInfo({ commit }, user_id) {
      commit("resetUserSelect");
      await UserService.getInfo({
        user_id: user_id,
      })
        .then((res) => {
          if (res.status == 200) {
            commit("setUserSelect", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateUserSearch({ commit }, keyword) {
      commit("setUserSearch", keyword);
    },
    updateStaffSearch({ commit }, keyword) {
      commit("setStaffSearch", keyword);
    },
    updateStaffSearchRole({ commit }, role) {
      commit("setStaffSearchRole", role);
    },
  },
};
