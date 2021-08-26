<template>
  <div id="file-upload">
    <div class="center page-change-left">
      <i
        v-if="clickUploadStatus == false"
        class="fa fa-angle-left"
        aria-hidden="true"
      ></i>
      <h1
        v-if="clickUploadStatus == false"
        @click="clickUpload()"
        class="text-normal purple-text"
      >
        หน้าหลักการจัดการไฟล์
      </h1>
      <i
        v-if="clickUploadStatus == true"
        class="fa fa-angle-left fa-grey"
        aria-hidden="true"
      ></i>
      <h1 v-if="clickUploadStatus == true" class="text-normal gray-text">
        หน้าหลักการจัดการไฟล์
      </h1>
    </div>

    <div id="file-upload-box">
      <h1 class="header-ms">เพิ่มเอกสาร</h1>
      <hr class="bar-color" />
    </div>

    <div class="search-grid">
      <h1 class="text-normal">ชื่อโฟลเดอร์</h1>
      <div>
        <input
          v-if="clickUploadStatus == false"
          :class="cssFolder"
          type="text"
          placeholder="กรอกชื่อโฟลเดอร์ที่ต้องการ"
          v-model="folderName"
        />
        <input
          v-if="clickUploadStatus == true"
          :class="cssFolder"
          type="text"
          placeholder="กรอกชื่อโฟลเดอร์ที่ต้องการ"
          :value="folderName"
          disabled
        />
        <p
          v-if="createStatus.folderName.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ createStatus.folderName.message }}
        </p>
      </div>
      <div v-if="clickUploadStatus == false">
        <button
          class="add-btn"
          onclick="document.getElementById('file-input').click(); return false;"
        >
          เพิ่มเอกสาร
        </button>
        <input
          type="file"
          id="file-input"
          style="visibility: hidden"
          @change="fileUpload"
          multiple
          accept="application/pdf"
        />
      </div>
      <div v-if="clickUploadStatus == true">
        <button class="add-btn blocked">เพิ่มเอกสาร</button>
      </div>
    </div>

    <div class="search-grid seach-no-btn">
      <h1 class="text-normal">รายละเอียดเอกสาร</h1>
      <div>
        <input
          v-if="clickUploadStatus == false"
          class="input-box text-normal"
          type="text"
          v-model="description"
          placeholder="กรอกรายละเอียดเพิ่มเติมของโฟลเดอร์ (สามารถเว้นว่างได้)"
        />
        <input
          v-if="clickUploadStatus == true"
          class="input-box text-normal"
          type="text"
          :value="description"
          placeholder="กรอกรายละเอียดเพิ่มเติมของโฟลเดอร์ (สามารถเว้นว่างได้)"
          disabled
        />
      </div>
    </div>

    <div id="file-content">
      <h1 class="text-normal b-header">รายการไฟล์ในโฟล์เดอร์</h1>
      <h1
        v-if="file_list && file_list.length == 0"
        class="text-normal l-grey-text"
      >
        ยังไม่ได้อัพโหลดไฟล์
      </h1>
      <div class="file-list-box" v-for="(file, i) in file_list" :key="i">
        <div>
          <img
            class="file-icon"
            src="../../../assets/icon/file-icon.png"
            alt=""
          />
          <h1 class="file-name" v-if="!edit">
            {{ file_list[i].name }}
          </h1>
        </div>
        <div>
          <button
            class="delete-btn"
            v-if="clickUploadStatus == false"
            @click="fileDelete(i)"
          >
            <img src="../../../assets/icon/icon-trash.png" />Delete
          </button>
          <button v-else class="delete-btn">
            <img src="../../../assets/icon/icon-trash.png" />Delete
          </button>
        </div>
      </div>
      <p
        v-if="file_list && file_list.length > 20"
        class="text-normal orange-text error-message file-limit"
      >
        * อัพโหลดได้ไม่เกิน 20 ไฟล์
      </p>
      <p
        v-else-if="uploadInvalid && file_list.length == 0"
        class="text-normal orange-text error-message"
      >
        * ต้องอัพโหลดอย่างน้อย 1 ไฟล์
      </p>
      <hr class="bar-color orange-bar" />
    </div>

    <div class="center">
      <button
        v-if="clickUploadStatus == false"
        class="btn-white"
        @click="upload()"
      >
        บันทึกข้อมูล
      </button>
      <button v-if="clickUploadStatus == true" class="btn-grey">
        กำลังบันทึกข้อมูล
      </button>
    </div>

    <div class="progress center" v-if="clickUploadStatus == true">
      <span class="indicator"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
      <span class="indicator"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      edit: false,
      folderName: "",
      description: "",
      file_list: [],
      invalidFolder: true,
      uploadInvalid: false,
      clickUploadStatus: false,
    };
  },
  computed: {
    ...mapGetters({
      createStatus: "material/getCreateStatus",
    }),
    cssFolder() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.createStatus.folderName.isInvalid) {
        return error;
      }
      return complete;
    },
  },
  mounted() {
    this.$store.dispatch("material/resetCreateStatus");
    let currentTime = new Date();
    this.folderName =
      "เอกสารประจำวันที่ " +
      currentTime.getDate().toString().padStart(2, "0") +
      "-" +
      (currentTime.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      currentTime.getFullYear();

    this.clickUploadStatus = false;
  },
  methods: {
    clickUpload() {
      this.$emit("fileClickUpload", false);
    },
    async upload() {
      await this.$store.dispatch("material/validate", {
        folderName: this.folderName,
        description: this.description,
        files: this.file_list,
      });

      if (this.createStatus.readyToCreate) {
        if (this.file_list && this.file_list.length != 0) {
          this.clickUploadStatus = true;
          this.uploadInvalid = false;

          var files = new FormData();

          this.file_list.forEach((file) => {
            files.append("material-files", file);
          });
          await this.$store.dispatch("material/upload", {
            folderName: this.folderName,
            description: this.description,
            files: files,
          });
          if (this.createStatus.isSuccess) {
            this.$emit("fileClickUpload", false);
          }
        } else {
          this.uploadInvalid = true;
        }
      }
    },
    fileDelete(index) {
      this.file_list.splice(index, 1);
    },
    fileUpload(event) {
      var input = event.target;
      var count = input.files.length;
      var index = 0;
      if (input.files) {
        while (count--) {
          var reader = new FileReader();
          // reader.onload = (e) => {
          //   this.preview_list.push(e.target.result);
          // };
          this.file_list.push(input.files[index]);
          reader.readAsDataURL(input.files[index]);
          index++;
        }
      }
    },
  },
};
</script>

<style scoped>
#file-upload {
  background: #ffffff;
  border-radius: 30px;
  padding: 30px 60px;
  margin-top: 25px;
  position: relative;
}

.input-box {
  width: 100%;
  margin: 0px;
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

.file-limit {
  padding-top: 10px;
  padding-left: 20px;
}

.page-change-left {
  position: absolute;
  top: 35px;
  left: 50px;
  cursor: pointer;
}

.blocked {
  background-color: #c4c4c4 !important;
  color: #ffffff !important;
  border-color: #c4c4c4 !important;
}

input[type="text"]:disabled {
  background: #e5e5e5;
}

.bar-color {
  width: 71px;
}

.error-message {
  margin-top: 5px;
}

.orange-bar {
  color: #f07821;
  background-color: #f07821;
  border: 1.5px solid #f07821;
}

#file-upload-box {
  margin-top: 50px;
}

#file-content {
  margin-top: 20px;
}

.search-grid {
  display: grid;
  grid-template-columns: 1fr 3.5fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: top;
  margin-top: 30px;
}

.btn-white {
  margin-top: 20px;
  color: #2f65af;
}

.btn-grey {
  margin-top: 20px;
  cursor: default;
}

.seach-no-btn {
  margin-top: 10px;
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
  margin: 0px;
}

#file-content > h1 {
  margin-bottom: 10px;
}

#file-box > div > div > .input-box {
  color: #303030 !important;
  padding: 3px 5px !important;
}

.file-list-box,
.file-list-box > div {
  display: flex;
  align-items: center;
}

.file-list-box {
  justify-content: space-between;
  padding-left: 20px;
}

.file-list-box:not(:last-child) {
  margin-bottom: 10px;
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
  height: 522px;
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

/* Loading */
.progress .indicator:nth-child(1) {
  animation: fade 3s ease 0s infinite;
}

.progress .indicator:nth-child(2) {
  animation: fade 3s ease 250ms infinite;
}

.progress .indicator:nth-child(3) {
  animation: fade 3s ease 500ms infinite;
}

.progress .indicator:nth-child(4) {
  animation: fade 3s ease-in-out 1s infinite;
}

.indicator {
  background-color: #2f65af;
  width: 7px;
  height: 7px;
  border-radius: 10px;
  display: inline-block;
  margin: 20px 10px 0px 10px;
  opacity: 0;
}

@keyframes fade {
  0% {
    transform: scale(0.3);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.3);
    opacity: 0;
  }
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
  #file-upload {
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
  }

  .file-icon {
    width: 18px;
    margin-right: 12px;
  }

  .delete-btn > img {
    width: 10px;
  }

  .folder-icon {
    width: 16px;
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

  .search-grid {
    display: block;
  }

  .fa {
    font-size: 3.25em;
  }

  .add-btn {
    margin-top: 10px;
  }

  .delete-btn > img {
    width: 7px;
  }

  .indicator {
    width: 5px;
    height: 5px;
  }
}
</style>
