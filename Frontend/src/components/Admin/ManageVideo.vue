<template>
  <div id="manage-video">
    <div id="search-grid">
      <div>
        <h1 class="text-normal">ค้นหาจาก keyword</h1>
        <input class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">เรียงลำดับ</h1>
        <select name="sorting" id="sorting" class="input-box text-normal">
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
          <option value="มัธยมศึกษา">ชื่อ ก - ฮ</option>
        </select>
      </div>
      <div>
        <button
          class="add-btn"
          onclick="document.getElementById('video-input').click(); return false;"
        >
          เพิ่มไฟล์
        </button>
        <input
          type="file"
          id="video-input"
          style="visibility: hidden"
          ref="videoUploader"
          @change="videoUpload()"
          multiple
          accept="application/pdf"
        />
      </div>
    </div>
    <div>
      <h1 class="text-normal b-header">รายการ Videos</h1>
      <div id="video-section">
        <h1 class="text-normal material-header">Videos</h1>

        <div id="video-box">
          <div id="video-box-section" v-for="(file, i) in fileList" :key="i">
            <div class="video-container">
              <div class="video-image-container">
                <img
                  class="video-image"
                  src="https://i.ytimg.com/vi/fz7Jxg7Hbkg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAz1DCKNQJt-7CFu7tnglRTcF45DQ"
                  alt=""
                />
                <img
                  class="play-btn"
                  src="../../assets/icon/play-btn.png"
                  alt=""
                />
              </div>
              <div>
                <input
                  class="input-box file-name"
                  type="text"
                  value="อ.แดงกีต้าร์ การคิดตามธรรมชาติ"
                  v-if="edit"
                />
                <h1 class="file-name" v-if="!edit">
                  อ.แดงกีต้าร์ การคิดตามธรรมชาติ
                </h1>
                <p class="file-date">16 กันยายน 2564 เวลา 14.00 น.</p>
              </div>
            </div>
            <div>
              <button class="delete-btn" v-if="edit">delete</button>
              <button class="edit-btn" v-if="!edit" @click="editClick">
                edit
              </button>
              <button class="edit-btn" v-if="edit" @click="editClick">
                cancel
              </button>
            </div>
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
      fileList: 20,
      video: null,
      edit: false,
    };
  },
  methods: {
    async videoUpload() {
      this.video = this.$refs.videoUploader.video;
      await this.uploadVideoMethod();
    },
    uploadVideoMethod() {
      console.log(this.video);
    },
    editClick() {
      this.edit = !this.edit;
    },
  },
};
</script>

<style scoped>
#manage-video {
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

.video-container > div > .input-box {
  color: #303030 !important;
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
  color: #f07821;
  border: 2px solid #f07821;
  background-color: transparent;
}

.delete-btn {
  color: #ffffff;
  border: 2px solid #f07821;
  background-color: #f07821;
  margin: 0px 10px;
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
}

#video-box {
  padding: 0px 20px;
  margin-top: 14px;
  overflow-y: scroll;
  height: 522px;
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
    padding: 30px;
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
    font-size: 1.75em;
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
    font-size: 1.5em;
    margin-top: 15px;
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

@media screen and (max-width: 414px) {
  #video-box-section {
    display: block;
    background-color: #f8f8f8;
    border-radius: 10px;
    padding: 10px 5px;
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
