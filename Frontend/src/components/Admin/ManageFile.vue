<template>
  <div id="manage-file">
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">เรียงลำดับ</h1>
        <select name="sorting" id="sorting" class="input-box text-normal">
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
              <h1 class="file-name file-head" v-if="edit != folder.material_id">
                {{ folder.folderName }}
              </h1>
              <input
                class="input-box file-name file-head foldername"
                type="text"
                v-model="folder.folderName"
                v-if="edit == folder.material_id"
              />
            </div>
            <div id="file-btn-section">
              <button class="edit-btn center" v-if="edit == folder.material_id">
                <img
                  class="add-icon"
                  src="../../assets/icon/icon-add.png"
                  alt=""
                />Add
              </button>
              <button
                class="delete-btn"
                v-if="edit == folder.material_id"
                @click="deleteFolder(folder.folder_id)"
              >
                <img
                  class="delete-icon"
                  src="../../assets/icon/icon-trash.png"
                  alt=""
                />Delete
              </button>
              <button
                class="edit-btn"
                v-if="edit != folder.material_id"
                @click="editClick(folder)"
              >
                edit
              </button>
              <button
                class="edit-btn save-btn"
                v-if="edit == folder.material_id"
                @click="saveClick()"
              >
                save
              </button>
            </div>
          </div>
          <h1
            v-if="folder.description && edit != folder.material_id"
            class="file-name folder-description"
          >
            {{ folder.description }}
          </h1>
          <input
            class="input-box file-name folder-description"
            type="text"
            v-model="folder.description"
            placeholder="ไม่มีรายละเอียดโฟลเดอร์"
            v-if="edit == folder.material_id"
          />
          <div
            id="icon-list"
            v-for="(material, i) in folder.materials"
            :key="i"
          >
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
              v-if="edit != folder.material_id"
            >
              {{ material.fileName }}
            </a>
            <input
              class="input-box file-name"
              type="text"
              v-model="material.fileName"
              v-if="edit == folder.material_id"
            />
            <button class="delete-btn" v-if="edit == folder.material_id">
              <img
                class="trash-icon"
                src="../../assets/icon/icon-trash.png"
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
    };
  },
  mounted() {
    this.$store.dispatch("material/updateEditing", false);
  },
  methods: {
    // async fileUpload() {
    //   this.files = this.$refs.fileUploader.files;
    //   await this.uploadFileMethod();
    // },
    // uploadFileMethod() {
    //   console.log(this.files);
    // },
    editClick(value) {
      if (this.editing == false) {
        this.edit = value.material_id;
        this.$store.dispatch("material/updateEditing", true);
      }
    },
    saveClick() {
      this.edit = "";
      this.$store.dispatch("material/updateEditing", false);
    },
    clickUpload() {
      this.$emit("fileClickUpload", true);
    },
    downloadFile(query) {
      this.link =
        url +
        `/material/download?folder=${query.folderName}&fileName=${query.fileName}`;
    },
    async deleteFolder(folder_id) {
      await this.$store.dispatch("material/deleteFolder", {
        folder_id: folder_id,
      });
    },
  },
  computed: {
    ...mapGetters({
      materialList: "material/getMaterialList",
      editing: "material/getEditing",
    }),
  },
};
</script>

<style scoped>
#manage-file {
  background: #ffffff;
  border-radius: 30px;
  padding: 30px 60px;
  margin-top: 25px;
}

.input-box {
  width: 100%;
}

#search-grid {
  display: grid;
  grid-template-columns: 3fr 2fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-end;
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
  background-color: #f07821 !important;
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
  color: #f07821;
  border: 2px solid #f07821;
  background-color: transparent;
}

.delete-btn {
  color: #bf2e7e;
  border: 2px solid #bf2e7e;
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
  padding: 0px 20px;
}

.file-container:not(:first-child) {
  margin-top: 25px;
}

.file-container > div:first-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file-container > div > div,
#icon-list {
  display: flex;
  align-items: center;
}

.folder-icon {
  width: 22px;
  margin-right: 8px;
}

#icon-list {
  margin-top: 10px;
  margin-left: 25px;
  margin-bottom: 10px;
}

.folder-description {
  margin-left: 25px !important;
  margin-top: 10px !important;
  color: #7f7f7f !important;
  width: calc(100% - 100px);
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
    padding: 30px;
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
    width: calc(100% - 85px);
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

  .file-container > div:first-child {
    display: block;
  }

  #file-btn-section > .edit-btn,
  #file-btn-section > .delete-btn {
    width: 100%;
  }

  #file-btn-section {
    margin-top: 10px;
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

  .edit-btn,
  .add-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.25em;
    padding: 0px 5px;
    margin: 0px 5px;
  }

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
</style>
