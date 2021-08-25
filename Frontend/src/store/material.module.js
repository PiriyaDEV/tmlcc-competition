import MaterialService from "../services/material.service";

export default {
  namespaced: true,
  state: {
    materialList: [],
    createStatus: {
      readyToCreate: true,
      isSuccess: false,
      folderName: {
        isInvalid: false,
        message: "",
      },
      files: {
        isInvalid: false,
        message: "",
      },
    },
    search: "",
    sort: "",
    editing: "",
  },
  getters: {
    getMaterialList(state) {
      return state.materialList;
    },
    getUserMaterialList(state) {
      return state.materialList;
    },
    getCreateStatus(state) {
      return state.createStatus;
    },
    getMaterialSearch(state) {
      return state.search;
    },
    getEditing(state) {
      return state.editing;
    },
  },
  mutations: {
    resetCreateStatus(state) {
      state.createStatus.folderName.isInvalid = false;
      state.createStatus.folderName.message = "";
      state.createStatus.files.isInvalid = false;
      state.createStatus.files.message = "";
      state.createStatus.readyToCreate = true;
      state.createStatus.isSuccess = false;
    },
    setCreateSuccess(state) {
      state.createStatus.isSuccess = true;
    },
    setInvalidFolderName(state, message) {
      state.createStatus.folderName.isInvalid = true;
      state.createStatus.folderName.message = message;
      state.createStatus.readyToCreate = false;
    },
    setInvalidFiles(state, message) {
      state.createStatus.files.isInvalid = true;
      state.createStatus.files.message = message;
      state.createStatus.readyToCreate = false;
    },
    setMaterialList(state, list) {
      state.materialList = list;
    },
    setMaterialSearch(state, keyword) {
      state.search = keyword;
    },
    setMaterialSort(state, sort) {
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
    async upload({ state, commit, dispatch }, materials) {
      commit("resetCreateStatus");
      if (!materials.folderName) {
        commit("setInvalidFolderName", "โปรดระบุชื่อโฟลเดอร์");
      } else if (materials.folderName.indexOf("/") > -1) {
        commit("setInvalidFolderName", "ชื่อโฟลเดอร์ห้ามมี /");
      }
      if (!materials.files) {
        commit("setInvalidFiles", "ต้องอัพโหลดไฟล์อย่างน้อย 1 ไฟล์");
      } else if (materials.files && materials.files.length > 20) {
        commit("setInvalidFiles", "อัพโหลดได้สูงสุด 20 ไฟล์");
      }

      if (state.createStatus.readyToCreate) {
        await MaterialService.upload(materials)
          .then((res) => {
            if (res.status == 201) {
              console.log(res.data.message);
              dispatch("getMaterialList");
              commit("setCreateSuccess");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // async update({ state, commit, dispatch }, materials) {
    //   commit("resetCreateStatus");
    //   if (!materials.folderName) {
    //     commit("setInvalidVideoName", "โปรดระบุชื่อวิดีโอ");
    //   }

    //   if (state.createStatus.readyToCreate) {
    //     await VideoService.update({
    //       video_id: video.video_id,
    //       videoName: video.videoName,
    //       description: video.description,
    //     })
    //       .then((res) => {
    //         if (res.status == 200) {
    //           console.log(res.data.message);
    //           dispatch("getVideoList");
    //           commit("setCreateSuccess");
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //   }
    // },
    async deleteFolder({ dispatch }, folder) {
      await MaterialService.deleteFolder({
        folder_id: folder.folder_id,
      })
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data.message);
            dispatch("getMaterialList");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getMaterialList({ commit }) {
      await MaterialService.getAll()
        .then((res) => {
          if (res.status == 200) {
            commit("setMaterialList", res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateMaterialSearch({ commit }, keyword) {
      commit("setMaterialSearch", keyword);
    },
    updateMaterialSort({ commit }, sort) {
      commit("setMaterialSort", sort);
    },
    updateEditing({ commit }, status) {
      commit("setEditing", status);
    },
  },
};
