import MaterialService from "../services/material.service";

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
    reg: "",
    tempFolder: "",
  },
  getters: {
    getMaterialList(state) {
      let list = state.materialList;
      if (state.search) {
        list = list.filter((folder) => {
          let keyword = state.search.toLowerCase().trim();

          return folder.folderName.toLowerCase().trim().includes(keyword);
        });
      }

      if (state.sort == "name") {
        return list.sort((folderA, folderB) =>
          compare(folderA.folderName, folderB.folderName, "ASC")
        );
      } else if (state.sort == "new") {
        return list.sort((folderA, folderB) =>
          compare(folderA.createdAt, folderB.createdAt, "DSC")
        );
      } else if (state.sort == "old") {
        return list.sort((folderA, folderB) =>
          compare(folderA.createdAt, folderB.createdAt, "ASC")
        );
      }
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
    setTempFolder(state, name) {
      state.tempFolder = name;
    },
  },
  actions: {
    resetCreateStatus({ commit }) {
      commit("resetCreateStatus");
    },
    async validate({ commit }, materials) {
      commit("resetCreateStatus");
      if (!materials.folderName) {
        commit("setInvalidFolderName", "โปรดระบุชื่อโฟลเดอร์");
      } else if (materials.folderName.indexOf("/") > -1) {
        commit("setInvalidFolderName", "ชื่อโฟลเดอร์ห้ามมี /");
      } else if (/[^- A-Za-z0-9ก-๛]/.test(materials.folderName)) {
        commit("setInvalidFolderName", "ชื่อโฟลเดอร์ห้ามมี ตัวอักษรพิเศษ");
      } else {
        await MaterialService.checkDuplicated({
          folderName: materials.folderName,
        })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.isFound) {
                commit("setInvalidFolderName", "โฟลเดอร์มีในระบบแล้ว");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      if (!materials.files) {
        commit("setInvalidFiles", "ต้องอัพโหลดไฟล์อย่างน้อย 1 ไฟล์");
      } else if (materials.files && materials.files.length > 20) {
        commit("setInvalidFiles", "อัพโหลดได้สูงสุด 20 ไฟล์");
      }
    },
    async upload({ state, commit, dispatch }, materials) {
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
    async addMaterial({ state, commit, dispatch }, materials) {
      commit("resetCreateStatus");
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
    async validateUpdate({ state, commit }, folder) {
      commit("resetCreateStatus");
      if (!folder.folderName) {
        commit("setInvalidFolderName", "โปรดระบุชื่อโฟลเดอร์");
      } else if (folder.folderName.indexOf("/") > -1) {
        commit("setInvalidFolderName", "ชื่อโฟลเดอร์ห้ามมี /");
      } else if (/[^- A-Za-z0-9ก-๛]/.test(folder.folderName)) {
        commit("setInvalidFolderName", "ชื่อโฟลเดอร์ห้ามมี ตัวอักษรพิเศษ");
      } else {
        if (folder.folderName != state.tempFolder) {
          await MaterialService.checkDuplicated({
            folderName: folder.folderName,
          })
            .then((res) => {
              if (res.status == 200) {
                if (res.data.isFound) {
                  commit("setInvalidFolderName", "โฟลเดอร์มีในระบบแล้ว");
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    async updateFolder({ state, dispatch }, folder) {
      if (state.createStatus.readyToCreate) {
        await MaterialService.updateFolder({
          folder_id: folder.folder_id,
          folderName: folder.folderName,
          description: folder.description,
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
      }
    },
    async deleteFolder({ dispatch }, folder_id) {
      await MaterialService.deleteFolder({
        folder_id: folder_id,
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
    async deleteFile({ dispatch }, material_id) {
      await MaterialService.deleteFile({
        material_id: material_id,
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
    updateTemp({ commit }, name) {
      commit("setTempFolder", name);
    },
  },
};
