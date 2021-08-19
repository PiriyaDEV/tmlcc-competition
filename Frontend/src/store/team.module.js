import TeamService from "../services/team.service";

export default {
  namespaced: true,
  state: {
    teamList: [],
    currentTeam: {
      isLeader: false,
      team_id: "",
      teamName: "",
      members: [],
    },
    teamStatus: {
      status: "",
      hasTeam: false,
    },
    createStatus: {
      isInvalid: false,
      message: "",
    },
  },
  getters: {
    getTeamList(state) {
      return state.teamList;
    },
    getTeamId(state) {
      return state.currentTeam.team_id;
    },
    getCurrentTeam(state) {
      return state.currentTeam;
    },
    getTeamStatus(state) {
      return state.teamStatus;
    },
    getCreateStatus(state) {
      return state.createStatus;
    },
  },
  mutations: {
    resetCreateStatus(state) {
      state.createStatus.isInvalid = false;
      state.createStatus.message = "";
    },
    setInvalidTeamName(state, message) {
      state.createStatus.isInvalid = true;
      state.createStatus.message = message;
    },
    setTeamStatus(state, status) {
      state.teamStatus.hasTeam = true;
      state.teamStatus.status = status;
    },
    setCurrentTeam(state, team) {
      state.currentTeam = team;
    },
    setTeamList(state, list) {
      state.teamList = list;
    }
  },
  actions: {
    async create({ rootGetters, state, commit, dispatch }, teamName) {
      if (!teamName) {
        commit("setInvalidTeamName", "โปรดระบุชื่อทีม");
      }

      if (!state.createStatus.isInvalid) {
        await TeamService.create({
          teamName: teamName,
          leader_id: rootGetters["auth/getUserId"],
        })
          .then((res) => {
            if (res.status == 201) {
              console.log(res.data.message);
              dispatch("checkTeam");
              commit("resetCreateStatus");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async checkDuplicated({ commit }, teamName) {
      commit("resetCreateStatus");
      if (!teamName) {
        return;
      }

      await TeamService.checkDuplicated({ teamName })
        .then((res) => {
          if (res.status == 200) {
            if (res.data.isFound) {
              commit("setInvalidTeamName", "ชื่อทีมนี้มีผู้ใช้แล้ว");
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async checkTeam({ rootGetters, commit }) {
      await TeamService.checkTeam({
        user_id: rootGetters["auth/getUserId"],
      }).then((res) => {
            if (res.status == 200) {
              let data = res.data;
              if (data.teamStatus.hasTeam) {
                commit("setTeamStatus", data.teamStatus.status);
                commit("setCurrentTeam", data.team);
              } else {
                commit("setTeamList", data.teamList);
              }
            }
          }).catch((err) => {
            console.log(err);
          });
    },
    async getTeamList({ commit }) {
      await TeamService.getAll().then((res) => {
        if (res.status == 200) {
          commit("setTeamList", res.data);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    },
};
