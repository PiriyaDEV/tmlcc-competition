import UserService from "../services/user.service";

function compare(a, b) {
  let comparison = 0;
  if (a > b) {
    comparison = 1;
  } else if (a < b) {
    comparison = -1;
  }
  return comparison;
}

export default {
  namespaced: true,
  state: {
    userList: [],
    staffList: [],
    user: {
      select: {},
      search: "",
      sort: "",
    },
    staff: {
      role: "",
      search: "",
      sort: "",
    },
  },
  getters: {
    getUserList(state) {
      let list = state.userList;
      if (state.user.search) {
        list = list.filter((user) => {
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
      }
      if (state.user.sort == "name") {
        return (list = list.sort((userA, userB) =>
          compare(userA.firstName, userB.firstName)
        ));
      } else if (state.user.sort == "email") {
        return list.sort((userA, userB) => compare(userA.email, userB.email));
      } else if (state.user.sort == "team") {
        return list.sort((userA, userB) =>
          compare(userA.teamName, userB.teamName)
        );
      } else if (state.user.sort == "education") {
        return list.sort((userA, userB) =>
          compare(userA.education, userB.education)
        );
      }
    },
    getStaffList(state) {
      let list = state.staffList;
      if (state.staff.search || state.staff.role) {
        list = list.filter((staff) => {
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
      }
      if (state.staff.sort == "name") {
        return (list = list.sort((staffA, staffB) =>
          compare(staffA.firstName, staffB.firstName)
        ));
      } else if (state.staff.sort == "email") {
        return list.sort((staffA, staffB) =>
          compare(staffA.email, staffB.email)
        );
      } else if (state.staff.sort == "organization") {
        return list.sort((staffA, staffB) =>
          compare(staffA.organization, staffB.organization)
        );
      }
    },
    getUserSelect(state) {
      return state.user.select;
    },
    getUserSearch(state) {
      return state.user.search;
    },
    getStaffSearch(state) {
      return state.staff.search;
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
    setUserSort(state, sort) {
      state.user.sort = sort;
    },
    setStaffSearch(state, keyword) {
      state.staff.search = keyword;
    },
    setStaffSort(state, sort) {
      state.staff.sort = sort;
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
    updateUserSort({ commit }, sort) {
      commit("setUserSort", sort);
    },
    updateStaffSearch({ commit }, keyword) {
      commit("setStaffSearch", keyword);
    },
    updateStaffSort({ commit }, sort) {
      commit("setStaffSort", sort);
    },
    updateStaffSearchRole({ commit }, role) {
      commit("setStaffSearchRole", role);
    },
  },
};
