<template>
  <div id="manage-video">
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
          placeholder="ค้นหาด้วยชื่อวิดีโอ"
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
          <option value="name">ชื่อวิดีโอ ก - ฮ</option>
          <option value="new">วันที่อัพโหลด ใหม่ - เก่า</option>
          <option value="old">วันที่อัพโหลด เก่า - ใหม่</option>
        </select>
      </div>
      <div>
        <button @click="clickUpload()" class="add-btn">เพิ่มไฟล์</button>
      </div>
    </div>
    <div>
      <h1 class="text-normal b-header">รายการ Videos</h1>
      <div id="video-section">
        <h1
          v-if="videoList && videoList.length == 0"
          class="text-normal l-grey-text"
        >
          ไม่มีวิดีโอในระบบ
        </h1>
        <h1 v-else class="text-normal material-header">Videos</h1>

        <div v-if="videoList && videoList.length != 0" id="video-box">
          <div id="video-box-section" v-for="(video, i) in videoList" :key="i">
            <div class="video-container">
              <div class="video-image-container" @click="clickLink(video)">
                <img class="video-image" :src="video.thumbnail" alt="" />
                <img
                  class="play-btn"
                  src="../../assets/icon/play-btn.png"
                  alt=""
                />
              </div>
              <div>
                <input
                  :class="cssVideoName"
                  type="text"
                  v-model="video.videoName"
                  maxlength="64"
                  v-if="checkEdit == video.video_id"
                />
                <input
                  class="input-box file-description description-box"
                  type="text"
                  v-model="video.description"
                  maxlength="255"
                  v-if="checkEdit == video.video_id"
                  placeholder="ไม่มีรายละเอียดวิดีโอ"
                />
                <input
                  class="input-box file-description description-box"
                  type="text"
                  v-if="checkEdit == video.video_id"
                  v-model="video.link"
                  maxlength="255"
                />
                <p
                  v-if="
                    checkEdit == video.video_id &&
                    createStatus.videoName.isInvalid
                  "
                  class="text-normal orange-text error-message"
                >
                  * {{ createStatus.videoName.message }}
                </p>
                <h1
                  class="file-name"
                  v-if="checkEdit != video.video_id"
                  @click="clickLink(video)"
                >
                  {{ video.videoName }}
                </h1>
                <p class="file-description" v-if="checkEdit != video.video_id">
                  {{ video.description }}
                </p>
                <p class="file-date">
                  {{ video.publicTime }}
                </p>
              </div>
            </div>
            <div class="center">
              <button
                class="delete-btn"
                v-if="checkEdit == video.video_id"
                @click="deleteClick(video)"
              >
                <img src="../../assets/icon/icon-trash-o.png" alt="" />Delete
              </button>
              <button
                class="edit-btn center"
                v-if="checkEdit != video.video_id"
                @click="editClick(video)"
              >
                <img
                  class="edit-icon center"
                  src="../../assets/icon/edit-icon-p.png"
                  alt=""
                />
                Edit
              </button>
              <button
                class="edit-btn save-btn center"
                v-if="checkEdit == video.video_id"
                @click="saveClick(video)"
              >
                <i class="fa fa-save"></i>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      video: null,
      edit: false,
      checkEdit: "",
      keyword: "",
      sort: "new",
    };
  },
  mounted() {
    this.keyword = this.videoSearch;
    this.$store.dispatch("video/updateVideoSort", this.sort);
    this.$store.dispatch("video/updateEditing", false);
  },
  watch: {
    keyword: function () {
      this.$store.dispatch("video/updateVideoSearch", this.keyword);
    },
    sort: function () {
      this.$store.dispatch("video/updateVideoSort", this.sort);
    },
  },
  methods: {
    clickDasboard() {
      if (this.$route.path != "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
    async videoUpload() {
      this.video = this.$refs.videoUploader.video;
      await this.uploadVideoMethod();
    },
    uploadVideoMethod() {
      console.log(this.video);
    },
    editClick(value) {
      if (this.editing == false) {
        this.checkEdit = value.video_id;
        this.$store.dispatch("video/updateEditing", true);
      }
    },
    async saveClick(video) {
      await this.$store.dispatch("video/update", {
        video_id: video.video_id,
        videoName: video.videoName,
        link: video.link,
        description: video.description,
      });
      if (this.createStatus.isSuccess) {
        this.$store.dispatch("video/resetCreateStatus");
        this.$store.dispatch("video/updateEditing", false);
        this.checkEdit = "";
      }
    },
    async deleteClick(video) {
      await this.$store.dispatch("video/delete", video);
      this.$store.dispatch("video/updateEditing", false);
      this.checkEdit = "";
    },
    clickLink(value) {
      window.open(value.link);
    },
    clickUpload() {
      this.$emit("videoClickUpload", true);
    },
  },
  computed: {
    ...mapGetters({
      createStatus: "video/getCreateStatus",
      videoList: "video/getVideoList",
      videoSearch: "video/getVideoSearch",
      editing: "video/getEditing",
    }),
    cssVideoName() {
      let error = "input-box file-name error-input-box";
      let complete = "input-box file-name";
      if (this.createStatus.videoName.isInvalid) {
        return error;
      }
      return complete;
    },
  },
};
</script>

<style scoped>
#manage-video {
  background: #ffffff;
  border-radius: 30px;
  padding: 80px 60px 30px 60px;
  margin-top: 25px;
  position: relative;
}

.input-box {
  width: 100%;
}

.description-box {
  margin-top: 5px !important;
  color: #7f7f7f !important;
}

.edit-icon {
  width: 15px;
  margin-right: 4px;
  /* margin-left: 5px; */
}

.error-message {
  margin-top: 5px;
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

.video-container > div > .input-box:first-child {
  color: #303030 !important;
}

.fa-save {
  font-size: 1.2em !important;
  margin-right: 5px;
}

.video-container > div > .input-box {
  padding: 3px 5px !important;
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

.page-change-left {
  position: absolute;
  top: 35px;
  left: 60px;
  cursor: pointer;
}

.save-btn {
  color: #ffffff !important;
  background-color: #2f65af !important;
  border-color: #2f65af !important;
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

#video-input {
  display: none;
}

/* Video */
#video-section {
  margin-top: 25px;
}

#video-box-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

#video-box {
  padding: 0px 20px;
  margin-top: 14px;
  overflow-y: scroll;
  max-height: 522px;
}

.video-container {
  display: flex;
  align-items: center;
}

.video-container:not(:last-child) {
  margin-bottom: 10px;
}

.video-image {
  width: 105px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid #c4c4c4;
  margin-right: 25px;
}

.video-image-container {
  position: relative;
  cursor: pointer;
}

.play-btn {
  width: 20px;
  position: absolute;
  left: 45px;
  bottom: 40px;
}

.file-name {
  font-size: 2em;
  font-weight: 500;
  color: #303030;
  margin: 0;
  cursor: pointer;
}

.file-date {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #2f65af;
}

.file-description {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #7f7f7f;
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
  #manage-video {
    padding: 80px 30px 30px 30px;
  }

  .edit-icon {
    width: 10px;
  }

  .page-change-left {
    left: 30px;
  }

  #video-box {
    padding: 0px 15px 0px 0px;
  }

  .play-btn {
    left: 42px;
    bottom: 32px;
    width: 18px;
  }

  .file-name {
    font-size: 1.75em;
  }

  .edit-btn,
  .delete-btn {
    font-size: 1.5em;
    padding: 0px 10px;
  }

  .delete-btn > img {
    width: 10px;
  }

  .add-btn {
    font-size: 1.5em;
    padding: 1.5px 10px;
    margin-top: 10px;
  }

  .video-image {
    width: 95px;
    height: 70px;
  }
}

@media screen and (max-width: 767px) {
  .file-name {
    font-size: 1.5em;
    margin-top: 10px;
  }

  .edit-icon {
    width: 9px;
  }

  .video-container {
    display: block;
  }

  #video-box-section {
    margin-bottom: 20px;
    align-items: flex-start;
    /* display: block; */
  }

  #video-section {
    margin-top: 10px;
  }

  .edit-btn.delete-btn {
    font-size: 1.25em;
    margin-top: 15px;
  }

  .delete-btn > img {
    width: 7px;
  }

  #search-grid {
    display: block;
  }

  .play-btn {
    left: 34px;
    bottom: 26px;
    width: 13px;
  }

  .video-image {
    width: 75px;
    height: 50px;
  }
}

@media screen and (max-width: 480px) {
  #video-box-section {
    display: block;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 10px 5px;
  }

  .edit-btn,
  .delete-btn {
    width: 100%;
  }

  .delete-btn {
    justify-content: center;
  }

  .video-container {
    display: flex;
  }

  .edit-btn.delete-btn {
    width: 100%;
    margin-top: 0px;
  }
}
</style>
