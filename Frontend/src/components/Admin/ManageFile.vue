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
          <option value="มัธยมศึกษา">ชื่อโฟลเดอร์ ก - ฮ</option>
          <option value="มัธยมศึกษา">วันที่อัพโหลด</option>
        </select>
      </div>
      <div>
        <button class="add-btn" @click="clickUpload()">เพิ่มเอกสาร</button>
        <!-- <input
          type="file"
          id="file-input"
          style="visibility: hidden"
          ref="fileUploader"
          @change="fileUpload()"
          multiple
          accept="application/pdf"
        /> -->
      </div>
    </div>
    <div>
      <h1 class="text-normal b-header">รายการเอกสาร (Materials)</h1>
      <div id="file-box">
        <h1 class="text-normal l-grey-text notfound">ไม่มีไฟล์ในระบบ</h1>
        <div class="file-container" v-for="(file, i) in fileList" :key="i">
          <div>
            <div>
              <img
                class="folder-icon"
                src="../../assets/icon/folder-icon.png"
                alt=""
              />
              <h1 class="file-name file-head">เอกสารประจำวันที่ 01/09/2564</h1>
            </div>
            <div>
              <button class="delete-btn" v-if="edit">
                <img src="../../assets/icon/icon-trash.png" alt="" />Delete
              </button>
              <button class="edit-btn" v-if="!edit" @click="editClick">
                edit
              </button>
              <button class="edit-btn save-btn" v-if="edit" @click="editClick">
                save
              </button>
            </div>
          </div>
          <h1 class="file-name folder-description">
            เอกสารเพื่อการเตรียมความพร้อม ก่อนเริ่มการอบรม
          </h1>
          <div id="icon-list" v-for="(file, i) in fileList" :key="i">
            <img
              class="file-icon"
              src="../../assets/icon/file-icon.png"
              alt=""
            />
            <h1 class="file-name" v-if="!edit">โจทย์การแข่งขัน.pdf</h1>
            <input
              class="input-box file-name"
              type="text"
              value="โจทย์การแข่งขัน"
              v-if="edit"
            />
            <button class="delete-btn" v-if="edit">
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
export default {
  data() {
    return {
      fileList: 5,
      files: null,
      edit: false,
    };
  },
  methods: {
    // async fileUpload() {
    //   this.files = this.$refs.fileUploader.files;
    //   await this.uploadFileMethod();
    // },
    // uploadFileMethod() {
    //   console.log(this.files);
    // },
    editClick() {
      this.edit = !this.edit;
    },
    clickUpload() {
      this.$emit("fileClickUpload", true);
    },
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
  padding-left: 25px;
  padding-top: 10px;
  color: #7f7f7f !important;
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

  .file-container {
    padding: 0px 15px 10px 0px;
  }

  .file-name {
    font-size: 1.75em;
  }

  .edit-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.5em;
    padding: 0px 10px;
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
}

@media screen and (max-width: 767px) {
  .file-name {
    font-size: 1.5em;
  }

  .file-container {
    padding: 0px 5px 10px 0px;
  }

  .edit-btn,
  .delete-btn,
  .cancel-btn {
    font-size: 1.25em;
    padding: 0px 5px;
    margin: 0px 5px;
  }

  .delete-btn > img {
    width: 7px;
  }

  #search-grid {
    display: block;
  }
}
</style>
