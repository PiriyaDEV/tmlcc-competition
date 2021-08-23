import VideoService from "../services/video.service";

export default {
  namespaced: true,
  state: {
    videoList: [],
    createStatus: {
      readyToCreate: true,
      isSuccess: false,
      videoName: {
        isInvalid: false,
        message: "",
      },
      link: {
        isInvalid: false,
        message: "",
      },
      date: {
        isInvalid: false,
        message: "",
      },
      time: {
        isInvalid: false,
        message: "",
      },
    },
    search: "",
  },
  getters: {
    getVideoList(state) {
      if (state.search) {
        return state.videoList.filter((video) => {
          let keyword = state.search.toLowerCase().trim();

          return video.videoName.toLowerCase().trim().includes(keyword);
        });
      } else {
        return state.videoList;
      }
    },
    getCreateStatus(state) {
      return state.createStatus;
    },
    getVideoSearch(state) {
      return state.search;
    },
  },
  mutations: {
    resetCreateStatus(state) {
      state.createStatus.videoName.isInvalid = false;
      state.createStatus.videoName.message = "";
      state.createStatus.link.isInvalid = false;
      state.createStatus.link.message = "";
      state.createStatus.date.isInvalid = false;
      state.createStatus.date.message = "";
      state.createStatus.time.isInvalid = false;
      state.createStatus.time.message = "";
      state.createStatus.readyToCreate = true;
      state.createStatus.isSuccess = false;
    },
    setCreateSuccess(state) {
      state.createStatus.isSuccess = true;
    },
    setInvalidVideoName(state, message) {
      state.createStatus.videoName.isInvalid = true;
      state.createStatus.videoName.message = message;
      state.createStatus.readyToCreate = false;
    },
    setInvalidLink(state, message) {
      state.createStatus.link.isInvalid = true;
      state.createStatus.link.message = message;
      state.createStatus.readyToCreate = false;
    },
    setInvalidDate(state, message) {
      state.createStatus.date.isInvalid = true;
      state.createStatus.date.message = message;
      state.createStatus.readyToCreate = false;
    },
    setInvalidTime(state, message) {
      state.createStatus.time.isInvalid = true;
      state.createStatus.time.message = message;
      state.createStatus.readyToCreate = false;
    },
    setVideoList(state, list) {
      list.forEach((video) => {
        let thumbnail1 = "https://img.youtube.com/vi/";
        let thumbnail2 = "/maxresdefault.jpg";

        video.thumbnail =
          thumbnail1 + video.link.split("v=").pop().split("&")[0] + thumbnail2;
      });

      state.videoList = list;
    },
    setVideoSearch(state, keyword) {
      state.search = keyword;
    },
  },
  actions: {
    resetCreateStatus({ commit }) {
      commit("resetCreateStatus");
    },
    async create({ state, commit, dispatch }, video) {
      commit("resetCreateStatus");
      if (!video.videoName) {
        commit("setInvalidVideoName", "โปรดระบุชื่อวิดีโอ");
      }
      if (!video.link) {
        commit("setInvalidLink", "โปรดระบุลิงค์วิดีโอ");
      }
      if (!video.date) {
        commit("setInvalidDate", "โปรดระบุ วัน/เดือน/ปี ที่เผยแพร่");
      }
      if (!video.time) {
        commit("setInvalidTime", "โปรดระบุ เวลา ที่เผยแพร่");
      }

      if (state.createStatus.readyToCreate) {
        let date = video.date.split(/[//]/);
        let time = video.time.split(/[: ]/);

        delete video.date;
        video.time = new Date(
          date[2],
          date[1] - 1,
          date[0],
          time[0],
          time[1]
        ).getTime();

        await VideoService.create(video)
          .then((res) => {
            if (res.status == 201) {
              console.log(res.data.message);
              dispatch("getVideoList");
              commit("setCreateSuccess");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async update({ state, commit, dispatch }, video) {
      commit("resetCreateStatus");
      if (!video.videoName) {
        commit("setInvalidVideoName", "โปรดระบุชื่อวิดีโอ");
      }

      if (state.createStatus.readyToCreate) {
        await VideoService.update({
          video_id: video.video_id,
          videoName: video.videoName,
          description: video.description,
        })
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data.message);
              dispatch("getVideoList");
              commit("setCreateSuccess");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async delete({ dispatch }, video) {
      await VideoService.delete({
        video_id: video.video_id,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.message);
            dispatch("getVideoList");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getVideoList({ commit }) {
      await VideoService.getAll()
        .then((res) => {
          if (res.status == 200) {
            commit("setVideoList", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateVideoSearch({ commit }, keyword) {
      commit("setVideoSearch", keyword);
    },
  },
};
