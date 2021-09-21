<template>
  <div id="materialflex">
    <div id="btn-right">
      <button
        v-if="roleStatus != `user`"
        @click="manageClick()"
        class="manage-btn"
      >
        จัดการไฟล์ / Video
      </button>
    </div>
    <h1 class="header-ms">Materials & Videos</h1>
    <hr class="bar-color" />

    <div>
      <h1 class="text-normal material-header">เอกสาร (Materials)</h1>
      <div id="file-box">
        <h1
          v-if="materialList && materialList.length == 0"
          class="text-normal l-grey-text no-file"
        >
          ไม่มีเอกสารในระบบ
        </h1>
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
              <h1 class="file-name file-head">{{ folder.folderName }}</h1>
            </div>
          </div>
          <h1 v-if="folder.description" class="file-name folder-description">
            {{ folder.description }}
          </h1>
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
              class="file-name"
              :href="link"
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
        </div>
      </div>
    </div>

    <div id="video-section">
      <h1 class="text-normal material-header">Videos</h1>

      <div id="video-box">
        <h1
          v-if="videoList && videoList.length == 0"
          class="text-normal l-grey-text no-file"
        >
          ไม่มีวิดีโอในระบบ
        </h1>

        <div
          class="video-container"
          v-for="(video, i) in videoList.slice().reverse()"
          :key="i"
        >
          <div class="video-image-container" @click="clickLink(video)">
            <img class="video-image" :src="video.thumbnail" alt="" />
            <img class="play-btn" src="../../assets/icon/play-btn.png" alt="" />
          </div>
          <div>
            <h1 class="file-name" @click="clickLink(video)">
              {{ video.videoName }}
            </h1>
            <p class="file-description">{{ video.description }}</p>
            <p class="file-date">{{ video.publicTime }}</p>
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
      link: "",
    };
  },
  methods: {
    manageClick() {
      if (this.$route.path != "/dashboard/file") {
        this.$router.push("/dashboard/file");
      }
    },
    clickLink(value) {
      window.open(value.link);
    },
    downloadFile(query) {
      this.link = url.replace(
        "/api",
        `/file/materials/${query.folderName}/${query.fileName}`
      );
    },
  },
  computed: {
    ...mapGetters({
      roleStatus: "auth/getRole",
      materialList: "material/getUserMaterialList",
      videoList: "video/getUserVideoList",
    }),
  },
};
</script>

<style scoped>
#materialflex {
  background: #ffffff;
  border-radius: 30px;
  padding: 15px 32px 15px 32px;
  width: calc(100% - 60px);
  /* height: calc(100% - 30px); */
  position: relative;
}

.bar-color {
  width: 71px;
  color: #2f65af;
  background-color: #2f65af;
  border: 1.5px solid #2f65af;
}

.material-header {
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

.no-file {
  margin-top: 20px;
}

#file-box {
  overflow-y: scroll;
  max-height: 360px;
  margin-top: 20px;
}

#file-box > .l-grey-text {
  margin-left: 25px;
}

.file-head {
  font-weight: 800 !important;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
}

.file-description {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #7f7f7f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
}

.file-container {
  align-items: center;
  padding: 0px 20px;
}

.file-container:first-child {
  margin-top: 0px;
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

.file-icon {
  width: 18px;
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 700px;
}

.file-date {
  font-size: 1.5em;
  font-weight: 500;
  margin: 0;
  color: #2f65af;
}

#video-section {
  margin-top: 25px;
}

#video-box {
  padding: 0px 20px;
  margin-top: 14px;
  overflow-y: scroll;
  max-height: 360px;
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

#btn-right {
  position: absolute;
  right: 32px;
  top: 20px;
}

.manage-btn {
  border: 2px solid #2f65af;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 1.75em;
  color: #2f65af;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: transparent;
  padding: 0px 13px;
  cursor: pointer;
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

@media screen and (max-width: 1440px) {
  .file-name {
    max-width: 370px;
  }
}

@media screen and (max-width: 1100px) {
  #materialflex {
    margin-top: 30px;
  }

  .play-btn {
    left: 42px;
    bottom: 32px;
    width: 18px;
  }

  #file-box {
    max-height: 260px;
  }

  #video-box {
    max-height: 260px;
  }

  .join-btn,
  .edit-btn {
    font-size: 1.5em;
  }

  .file-name {
    font-size: 1.75em;
  }

  .file-icon {
    width: 16px;
  }

  .video-image {
    width: 95px;
    height: 70px;
  }

  #materialflex {
    height: 100%;
  }
}

@media screen and (max-width: 767px) {
  #btn-right {
    position: initial;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 20px;
  }

  #file-box > .l-grey-text {
    margin-left: 0px;
  }

  #icon-list {
    margin-left: 15px;
  }

  .folder-description {
    padding-left: 15px;
  }

  .play-btn {
    left: 34px;
    bottom: 26px;
    width: 13px;
  }

  .file-container,
  #video-box {
    padding-left: 0px;
  }

  .video-image {
    width: 75px;
    height: 50px;
  }

  .file-name {
    font-size: 1.5em;
  }

  .folder-description,
  .file-description,
  .file-name {
    max-width: 200px;
  }

  .file-icon {
    width: 15px;
  }

  .file-container {
    display: block;
  }

  #file-box > div > .file-date {
    margin: 10px 0px;
    padding-left: 30px;
  }

  hr {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 414px) {
  #btn-right {
    justify-content: center;
  }

  .file-name {
    font-size: 1.5em;
  }

  .folder-description,
  .file-description,
  .file-name {
    max-width: 150px;
  }
}
</style>
