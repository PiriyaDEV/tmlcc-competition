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
    currentPage: "",
    updateStatus: {
      readyToUpdate: true,
      isSuccess: false,
      firstName: {
        isInvalid: false,
        message: "",
      },
      lastName: {
        isInvalid: false,
        message: "",
      },
      phone: {
        isInvalid: false,
        message: "",
      },
      email: {
        isInvalid: false,
        message: "",
      },
      organization: {
        isInvalid: false,
        message: "",
      },
      role: {
        isInvalid: false,
        message: "",
      },
    },
    user: {
      select: {},
      search: "",
      sort: "",
      pagination: {
        page: 1,
        perPage: 25,
        pages: [],
      },
    },
    staff: {
      role: "",
      search: "",
      sort: "",
      pagination: {
        page: 1,
        perPage: 25,
        pages: [],
      },
    },
    editing: false,
  },
  getters: {
    getUserListLength(state) {
      return state.userList.length;
    },
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
        list = list.sort((userA, userB) =>
          compare(userA.firstName, userB.firstName)
        );
      } else if (state.user.sort == "email") {
        list = list.sort((userA, userB) => compare(userA.email, userB.email));
      } else if (state.user.sort == "team") {
        list = list.sort((userA, userB) =>
          compare(userA.teamName, userB.teamName)
        );
      } else if (state.user.sort == "education") {
        list = list.sort((userA, userB) =>
          compare(userA.education, userB.education)
        );
      }

      let pages = [];
      let numberOfPages = Math.ceil(
        list.length / state.user.pagination.perPage
      );

      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index);
      }

      state.user.pagination.pages = pages;

      let page = state.user.pagination.page;
      let perPage = state.user.pagination.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;

      return list.slice(from, to);
    },
    getStaffListLength(state) {
      return state.staffList.length;
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
        list = list.sort((staffA, staffB) =>
          compare(staffA.firstName, staffB.firstName)
        );
      } else if (state.staff.sort == "email") {
        list = list.sort((staffA, staffB) =>
          compare(staffA.email, staffB.email)
        );
      } else if (state.staff.sort == "organization") {
        list = list.sort((staffA, staffB) =>
          compare(staffA.organization, staffB.organization)
        );
      }

      let pages = [];
      let numberOfPages = Math.ceil(
        list.length / state.staff.pagination.perPage
      );

      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index);
      }

      state.staff.pagination.pages = pages;

      let page = state.staff.pagination.page;
      let perPage = state.staff.pagination.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;

      return list.slice(from, to);
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
    getUpdateStatus(state) {
      return state.updateStatus;
    },
    getEditing(state) {
      return state.editing;
    },
    getPagination(state) {
      if (state.currentPage == "user") {
        return state.user.pagination;
      } else if (state.currentPage == "staff") {
        return state.staff.pagination;
      }
    },
  },
  mutations: {
    resetUpdateStatus(state) {
      state.updateStatus.firstName.isInvalid = false;
      state.updateStatus.firstName.message = "";
      state.updateStatus.lastName.isInvalid = false;
      state.updateStatus.lastName.message = "";
      state.updateStatus.phone.isInvalid = false;
      state.updateStatus.phone.message = "";
      state.updateStatus.email.isInvalid = false;
      state.updateStatus.email.message = "";
      state.updateStatus.organization.isInvalid = false;
      state.updateStatus.organization.message = "";
      state.updateStatus.role.isInvalid = false;
      state.updateStatus.role.message = "";
      state.updateStatus.readyToUpdate = true;
      state.updateStatus.isSuccess = false;
    },
    setInvalidFirstName(state, message) {
      state.updateStatus.firstName.isInvalid = true;
      state.updateStatus.firstName.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setInvalidLastName(state, message) {
      state.updateStatus.lastName.isInvalid = true;
      state.updateStatus.lastName.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setInvalidPhone(state, message) {
      state.updateStatus.phone.isInvalid = true;
      state.updateStatus.phone.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setInvalidEmail(state, message) {
      state.updateStatus.email.isInvalid = true;
      state.updateStatus.email.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setInvalidOrganization(state, message) {
      state.updateStatus.organization.isInvalid = true;
      state.updateStatus.organization.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setInvalidRole(state, message) {
      state.updateStatus.role.isInvalid = true;
      state.updateStatus.role.message = message;
      state.updateStatus.readyToUpdate = false;
    },
    setUpdateSuccess(state) {
      state.updateStatus.isSuccess = true;
    },
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
    setEditing(state, status) {
      state.editing = status;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setUserPerPage(state, page) {
      state.user.pagination.perPage = page;
    },
    setUserPage(state, page) {
      state.user.pagination.page = page;
    },
    setStaffPerPage(state, page) {
      state.staff.pagination.perPage = page;
    },
    setStaffPage(state, page) {
      state.staff.pagination.page = page;
    },
  },
  actions: {
    async updateStaff({ state, commit, dispatch }, staff) {
      commit("resetUpdateStatus");

      if (!staff.firstName) {
        commit("setInvalidFirstName", "โปรดระบุชื่อ");
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(staff.firstName)) {
        commit("setInvalidFirstName", "โปรดระบุชื่อให้ถูกต้อง");
      }
      if (!staff.lastName) {
        commit("setInvalidLastName", "โปรดระบุนามสกุล");
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(staff.lastName)) {
        commit("setInvalidLastName", "โปรดระบุนามสกุลให้ถูกต้อง");
      }
      if (!staff.phone) {
        commit("setInvalidPhone", "โปรดระบุเบอร์โทรศัพท์");
      } else if (staff.phone.length < 9 || staff.phone.length > 12) {
        commit("setInvalidLastName", "โปรดระบุเบอร์โทรศัพท์ให้ครบ");
      } else if (/[^*^0-9]/.test(staff.phone)) {
        commit("setInvalidLastName", "โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง");
      }
      if (!staff.email) {
        commit("setInvalidEmail", "โปรดระบุ E-mail");
      } else if (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(staff.email)
      ) {
        UserService.checkDuplicated({ email: staff.email }).then((res) => {
          if (res.status == 200) {
            if (res.data.isFound) {
              commit("setInvalidEmail", "E-mail มีในระบบแล้ว");
            }
          } else {
            console.log("Something wrong!");
          }
        });
      } else {
        commit("setInvalidEmail", "โปรดระบุ E-mail ให้ถูกต้อง");
      }
      if (!staff.organization) {
        commit("setInvalidOrganization", "โปรดระบุสังกัด");
      }

      if (state.updateStatus.readyToUpdate) {
        await UserService.updateStaff({
          user_id: staff.user_id,
          firstName: staff.firstName,
          lastName: staff.lastName,
          phone: staff.phone,
          email: staff.email,
          organization: staff.organization,
          role: staff.role,
        })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data.message);
              dispatch("getStaffList");
              commit("setUpdateSuccess");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
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
    resetStatusUpdate({ commit }) {
      commit("resetUpdateStatus");
    },
    updateEditing({ commit }, status) {
      commit("setEditing", status);
    },
    updateUserPageLimit({ commit }, perPage) {
      commit("setUserPerPage", perPage);
    },
    updateUserSelectPage({ commit }, page) {
      commit("setUserPage", page);
    },
    updateStaffPageLimit({ commit }, perPage) {
      commit("setStaffPerPage", perPage);
    },
    updateStaffSelectPage({ commit }, page) {
      commit("setStaffPage", page);
    },
    setCurrentPage({ commit }, currentPage) {
      commit("setCurrentPage", currentPage);
    },
  },
};
