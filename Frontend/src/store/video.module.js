import VideoService from "../services/video.service";

function compare(a, b, order) {
  let comparison = 0;
  if (order == "ASC") {
    if (a > b) {
      comparison = 1;
    } else if (a < b) {
      comparison = -1;
    }
  } else if (order == "DSC") {
    if (a > b) {
      comparison = -1;
    } else if (a < b) {
      comparison = 1;
    }
  }

  return comparison;
}

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
    sort: "",
    fullMonthsTH: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ],
    editing: "",
  },
  getters: {
    getVideoList(state) {
      let list = state.videoList;
      if (state.search) {
        list = list.filter((video) => {
          let keyword = state.search.toLowerCase().trim();

          return video.videoName.toLowerCase().trim().includes(keyword);
        });
      }

      if (state.sort == "name") {
        return (list = list.sort((videoA, videoB) =>
          compare(videoA.videoName, videoB.videoName, "ASC")
        ));
      } else if (state.sort == "new") {
        return list.sort((videoA, videoB) =>
          compare(videoA.time, videoB.time, "DSC")
        );
      } else if (state.sort == "old") {
        return list.sort((videoA, videoB) =>
          compare(videoA.time, videoB.time, "ASC")
        );
      }
    },
    getUserVideoList(state) {
      return state.videoList.filter(
        (video) => video.time <= new Date().getTime()
      );
    },
    getCreateStatus(state) {
      return state.createStatus;
    },
    getVideoSearch(state) {
      return state.search;
    },
    getEditing(state) {
      return state.editing;
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

        // 16 กันยายน 2564 เวลา 14.00 น.
        let publicTime = new Date(video.time);
        video.publicTime =
          publicTime.getDate() +
          " " +
          state.fullMonthsTH[publicTime.getMonth()] +
          " " +
          (publicTime.getFullYear() + 543) +
          " เวลา " +
          publicTime.getHours().toString().padStart(2, "0") +
          "." +
          publicTime.getMinutes().toString().padStart(2, "0") +
          " น.";
      });

      state.videoList = list;
    },
    setVideoSearch(state, keyword) {
      state.search = keyword;
    },
    setVideoSort(state, sort) {
      state.sort = sort;
    },
    setEditing(state, status) {
      state.editing = status;
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
    updateVideoSort({ commit }, sort) {
      commit("setVideoSort", sort);
    },
    updateEditing({ commit }, status) {
      commit("setEditing", status);
    },
  },
};
