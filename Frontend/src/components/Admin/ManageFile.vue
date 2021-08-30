<template>
  <div id="manage-file">
    <div class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 @click="clickDasboard()" class="text-normal purple-text">
        กลับหน้าแดชบอร์ด
      </h1>
    </div>
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input
          v-model="keyword"
          class="input-box text-normal"
          placeholder="ค้นหาด้วยชื่อโฟลเดอร์ หรือ ชื่อไฟล์"
          type="text"
        />
      </div>
      <div>
        <h1 class="text-normal">เรียงลำดับ</h1>
        <select
          v-model="sort"
          name="sorting"
          id="sorting"
          class="input-box text-normal"
        >
          <option value="name">ชื่อโฟลเดอร์ ก - ฮ</option>
          <option value="new">วันที่อัพโหลด ใหม่ - เก่า</option>
          <option value="old">วันที่อัพโหลด เก่า - ใหม่</option>
        </select>
      </div>
      <div>
        <button class="add-btn" @click="clickUpload()">เพิ่มเอกสาร</button>
      </div>
    </div>
    <div id="file-information">
      <h1 class="text-normal b-header">รายการเอกสาร (Materials)</h1>
      <h1
        v-if="materialList && materialList.length == 0"
        class="text-normal l-grey-text notfound"
      >
        ไม่มีไฟล์ในระบบ
      </h1>
      <div id="file-box">
        <div
          class="file-container"
          v-for="(folder, i) in materialList"
          :key="i"
        >
          <div>
            <div>
              <img
                class="folder-icon"
                src="../../assets/icon/folder-icon.png"
                alt=""
              />
              <h1 class="file-name file-head" v-if="edit != folder.folder_id">
                {{ folder.folderName }}
              </h1>
              <div id="file-head-box" v-if="edit == folder.folder_id">
                <input
                  :class="cssFolder"
                  type="text"
                  v-model="folder.folderName"
                  maxlength="64"
                />
                <p
                  v-if="createStatus.folderName.isInvalid"
                  class="text-normal orange-text error-message"
                >
                  * {{ createStatus.folderName.message }}
                </p>
              </div>
            </div>
            <div id="file-btn-section">
              <button
                class="edit-btn add-file-btn center"
                v-if="edit == folder.folder_id"
                onclick="document.getElementById('file-input').click(); "
              >
                <img
                  class="add-icon"
                  src="../../assets/icon/icon-add-b.png"
                  alt=""
                />Add
              </button>
              <input
                type="file"
                id="file-input"
                style="visibility: hidden"
                @change="fileUpload"
                multiple
                accept="application/pdf"
              />
              <button
                class="delete-btn"
                v-if="edit == folder.folder_id"
                @click="deleteFolder(folder.folder_id)"
              >
                <img
                  class="delete-icon"
                  src="../../assets/icon/icon-trash-o.png"
                  alt=""
                />Delete
              </button>
              <button
                class="edit-btn center"
                v-if="edit != folder.folder_id"
                @click="editClick(folder)"
              >
                <img
                  class="edit-icon"
                  src="../../assets/icon/edit-icon-p.png"
                  alt=""
                />
                Edit
              </button>
              <button
                class="edit-btn save-btn center"
                v-if="edit == folder.folder_id"
                @click="updateFolder(folder)"
              >
                <i class="fa fa-save"></i>
                Save
              </button>
            </div>
          </div>
          <h1
            v-if="folder.description && edit != folder.folder_id"
            class="file-name folder-description"
          >
            {{ folder.description }}
          </h1>
          <input
            class="input-box file-name folder-description"
            type="text"
            v-model="folder.description"
            placeholder="ไม่มีรายละเอียดโฟลเดอร์"
            maxlength="255"
            v-if="edit == folder.folder_id"
          />
          <div>
            <h1
              v-if="
                folder.materials &&
                folder.materials.length == 0 &&
                edit != folder.folder_id
              "
              class="no-file file-name"
            >
              โฟลเดอร์นี้ไม่มีไฟล์
            </h1>
          </div>
          <div
            id="icon-list"
            v-for="(material, i) in folder.materials"
            :key="i"
          >
            <div>
              <img
                class="file-icon"
                src="../../assets/icon/file-icon.png"
                alt=""
              />
              <a
                target="_blank"
                :href="link"
                class="file-name"
                @click="
                  downloadFile({
                    folderName: folder.folderName,
                    fileName: material.fileName,
                  })
                "
              >
                {{ material.fileName }}
              </a>
            </div>

            <!-- <input
              class="input-box file-name"
              type="text"
              v-model="material.fileName"
              v-if="edit == folder.folder_id"
            /> -->
            <button
              class="delete-btn"
              v-if="edit == folder.folder_id"
              @click="deleteFile(material.material_id)"
            >
              <img
                class="trash-icon"
                src="../../assets/icon/icon-trash-o.png"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import url from "../../api-url";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      files: null,
      edit: "",
      link: "",
      file_list: [],
      keyword: "",
      sort: "new",
      tempFolder: "",
    };
  },
  mounted() {
    this.$store.dispatch("material/resetCreateStatus");
    this.keyword = this.materialSearch;
    this.$store.dispatch("material/updateMaterialSort", this.sort);
    this.$store.dispatch("material/updateEditing", false);
  },
  watch: {
    keyword: function () {
      this.$store.dispatch("material/updateMaterialSearch", this.keyword);
    },
    sort: function () {
      this.$store.dispatch("material/updateMaterialSort", this.sort);
    },
  },
  methods: {
    // async fileUpload() {
    //   this.files = this.$refs.fileUploader.files;
    //   await this.uploadFileMethod();
    // },
    // uploadFileMethod() {
    //   console.log(this.files);
    // },
    clickDasboard() {
      if (this.$route.path != "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
    editClick(value) {
      if (this.editing == false) {
        this.edit = value.folder_id;
        this.tempFolder = value.folderName;
        this.$store.dispatch("material/updateEditing", true);
      }
    },

    clickUpload() {
      this.$emit("fileClickUpload", true);
    },
    downloadFile(query) {
      this.link = url.replace(
        "/api",
        `/file/materials/${query.folderName}/${query.fileName}`
      );
    },
    async deleteFolder(folder_id) {
      await this.$store.dispatch("material/deleteFolder", folder_id);
      this.$store.dispatch("material/updateEditing", false);
    },
    async deleteFile(material_id) {
      await this.$store.dispatch("material/deleteFile", material_id);
    },
    async updateFolder(folder) {
      this.$store.dispatch("material/updateTemp", this.tempFolder);
      await this.$store.dispatch("material/validateUpdate", folder);
      if (this.createStatus.readyToCreate == true) {
        await this.$store.dispatch("material/updateFolder", folder);
        this.edit = "";
        this.$store.dispatch("material/updateEditing", false);
      }
    },
    fileUpload(event) {
      this.file_list = [];
      var input = event.target;
      var count = input.files.length;
      var index = 0;

      if (input.files) {
        while (count--) {
          //var reader = new FileReader();
          // reader.onload = (e) => {
          //   this.preview_list.push(e.target.result);
          // };
          this.file_list.push(input.files[index]);
          //reader.readAsDataURL(input.files[index]);
          index++;
        }
        this.addFile();
      }
    },
    async addFile() {
      var files = new FormData();
      this.file_list.forEach((file) => {
        let folder_index = this.materialList.findIndex(
          (folder) => folder.folder_id == this.edit
        );
        let match_index = this.materialList[folder_index].materials.findIndex(
          (material) => material.fileName == file.name
        );
        if (match_index == -1) {
          files.append("material-files", file);
        } else {
          alert("ไฟล์ซ้ำ");
        }
      });
      await this.$store.dispatch("material/addMaterial", {
        folder_id: this.edit,
        files: files,
      });
    },
  },
  computed: {
    ...mapGetters({
      materialList: "material/getMaterialList",
      videoSearch: "material/getMaterialSearch",
      editing: "material/getEditing",
      createStatus: "material/getCreateStatus",
    }),
    cssFolder() {
      let complete = "input-box file-name file-head foldername";
      let error = "input-box file-name file-head foldername input-box-error";
      if (this.createStatus.folderName.isInvalid) return complete;
      else return error;
    },
  },
};
</script>

<style scoped>
#manage-file {
  background: #ffffff;
  border-radius: 30px;
  padding: 80px 60px 30px 60px;
  margin-top: 25px;
  position: relative;
}

.input-box {
  width: 100%;
}

.no-file {
  margin: 10px 0px 0px 25px !important;
  color: #7f7f7f !important;
}

#search-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-end;
}

.edit-icon {
  width: 15px;
  margin-right: 4px;
  /* margin-left: 5px; */
}

.b-header {
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

#file-btn-section > button:nth-child(2) {
  margin-right: 10px;
}

.foldername {
  color: #303030 !important;
  min-width: 300px;
}

.add-icon {
  width: 15px;
  margin-right: 5px;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.fa-grey {
  color: #c4c4c4 !important;
}

.fa-save {
  font-size: 1.2em !important;
  margin-right: 5px;
}

.page-change-left {
  position: absolute;
  top: 35px;
  left: 60px;
  cursor: pointer;
}

.add-btn {
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  color: #2f65af;
  margin-bottom: 15px;
  background-color: transparent;
  border: 2px solid #2f65af;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 6px 15px;
  width: 100%;
  cursor: pointer;
}

.save-btn {
  color: #ffffff !important;
  background-color: #2f65af !important;
  border-color: #2f65af !important;
}

.add-file-btn {
  color: #2f65af !important;
  background-color: #ffffff !important;
  border-color: #2f65af !important;
}

.notfound {
  margin-top: 25px;
}

.trash-icon {
  padding: 3px;
  margin: 0px !important;
}

#file-box > div > div > .input-box {
  color: #303030 !important;
  padding: 3px 5px !important;
}

#file-input {
  display: none;
}

.edit-btn,
.delete-btn {
  font-size: 1.75em;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  box-sizing: border-box;
  border-radius: 12px;
  padding: 0px 15px;
  cursor: pointer;
}

.edit-btn {
  color: #bf2e7e;
  border: 2px solid #bf2e7e;
  background-color: transparent;
}

.delete-btn {
  color: #f07821;
  border: 2px solid #f07821;
  background-color: transparent;
  margin: 0px 10px;
  display: flex;
  align-items: center;
}

.delete-btn > img {
  width: 13px;
  margin-right: 4px;
}

/* File */
#file-box {
  overflow-y: scroll;
  max-height: 522px;
}

.file-container {
  align-items: center;
  margin-top: 15px;
  padding: 0px 10px 0px 0px;
}

.file-container:not(:first-child) {
  margin-top: 25px;
}

.file-container > div:first-child {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.file-container > div > div,
#icon-list {
  display: flex;
  align-items: flex-start;
}

.folder-icon {
  width: 22px;
  margin-right: 8px;
  margin-top: 4px;
}

.error-message {
  margin-top: 10px;
  margin-bottom: 0px;
}

#icon-list {
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
  justify-content: space-between;
}

#file-btn-section {
  margin-top: 5px;
}

.folder-description {
  margin-left: 25px !important;
  margin-top: 5px !important;
  color: #7f7f7f !important;
  width: calc(100% - 300px);
}

.file-icon {
  width: 25px;
  margin-right: 20px;
  cursor: pointer;
}

.file-name {
  font-size: 2em;
  font-weight: 500;
  color: #303030;
  margin: 0;
  cursor: pointer;
  text-decoration: none;
}

.file-head {
  font-weight: 800;
  width: 100%;
}

.file-date {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #2f65af;
}

/* Scrollbar */

div::-webkit-scrollbar {
  height: 3px;
  width: 3px;
  padding-bottom: 30px;
}
div::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.2);
}
div::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
  /* box-shadow: 0 0 1px rgba(255, 255, 255, 1); */
}

@media screen and (max-width: 980px) {
  #manage-file {
    padding: 80px 30px 30px 30px;
  }

  .page-change-left {
    left: 30px;
  }

  .edit-icon {
    width: 10px;
  }
  #file-information {
    margin-top: 15px;
  }

  .file-container {
    padding: 0px 15px 10px 0px;
  }

  .file-name {
    font-size: 1.75em;
  }

  .edit-btn,
  .add-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.5em;
    padding: 0px 10px;
  }

  .folder-description {
    width: calc(100% - 255px);
  }

  .add-btn {
    font-size: 1.5em;
    padding: 1.5px 10px;
    margin-top: 10px;
  }

  .file-icon {
    width: 18px;
    margin-right: 12px;
  }

  .folder-icon {
    width: 16px;
  }

  .delete-btn > img {
    width: 10px;
  }

  .add-icon {
    width: 10px;
  }
}

@media screen and (max-width: 767px) {
  .file-name {
    font-size: 1.5em;
  }

  .edit-icon {
    width: 9px;
  }

  #file-head-box {
    width: 100%;
  }

  .no-file {
    margin: 10px 0px 0px 0px !important;
    color: #7f7f7f !important;
  }

  .foldername {
    min-width: inherit;
  }

  .file-container > div:first-child {
    display: block;
  }

  #file-btn-section > .edit-btn,
  #file-btn-section > .delete-btn {
    width: 100%;
  }

  #file-btn-section {
    margin-top: 10px;
    margin-bottom: 5px;
  }

  .folder-description {
    margin-left: 0px !important;
    width: 100%;
  }

  #icon-list {
    margin-left: 0px;
  }

  #file-btn-section > .delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .file-container {
    padding: 0px 10px 10px 0px;
  }

  /* .edit-btn,
  .add-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.25em;
    padding: 3px 5px;
    margin: 0px 5px;
  } */

  .delete-btn > img {
    width: 7px;
  }

  .add-icon {
    width: 8px;
  }

  #search-grid {
    display: block;
  }
}

@media screen and (max-width: 489px) {
  #icon-list > div > .file-name {
    max-width: 175px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
