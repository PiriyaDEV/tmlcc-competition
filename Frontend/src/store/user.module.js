const state = {
  user: {
    user_id: "",
    displayName: "",
    role: "user"
  }
};

const getters = {
  getUserId(state) {
    return state.user.user_id;
  },
  getDisplayName(state) {
    return state.user.displayName;
  },
  getRole(state) {
    return state.user.role;
  }
};

const actions = {};
const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};