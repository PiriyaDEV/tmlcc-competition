<template>
  <div>
    <DashboardNavbar />
    <div id="file-setting" class="section">
      <div id="file-container" class="page-container">
        <div>
          <h1 class="header-m">การจัดการไฟล์</h1>
          <div id="menu-select">
            <div>
              <h1 :class="cssHeaderFile" @click="fileChoice()">ไฟล์เอกสาร</h1>
              <!-- <hr class="bar-color" v-if="choice == `file`" /> -->
              <hr :class="cssbarFile" />
            </div>
            <div>
              <h1 :class="cssHeaderVideo" @click="videoChoice()">Video</h1>
              <hr :class="cssbarVideo" />
            </div>
          </div>
          <ManageFile v-if="choice == `file`" />
          <ManageVideo v-if="choice == `video`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManageFile from "../../components/Admin/ManageFile.vue";
import ManageVideo from "../../components/Admin/ManageVideo.vue";
import DashboardNavbar from "../../components/Menu/DashboardNavbar.vue";
export default {
  data() {
    return {
      choice: "file",
    };
  },
  components: {
    DashboardNavbar,
    ManageFile,
    ManageVideo,
  },
  computed: {
    cssbarFile() {
      let select = "bar-color";
      let unselect = "bar-color unselect-bar";
      if (this.choice == "file") {
        return select;
      }
      return unselect;
    },
    cssbarVideo() {
      let select = "bar-color";
      let unselect = "bar-color unselect-bar";
      if (this.choice == "video") {
        return select;
      }
      return unselect;
    },
    cssHeaderFile() {
      let select = "header-ms selected";
      let unselect = "header-ms";
      if (this.choice == "file") {
        return select;
      }
      return unselect;
    },
    cssHeaderVideo() {
      let select = "header-ms selected";
      let unselect = "header-ms";
      if (this.choice == "video") {
        return select;
      }
      return unselect;
    },
  },
  methods: {
    fileChoice() {
      this.choice = "file";
    },
    videoChoice() {
      this.choice = "video";
    },
  },
  mounted() {
    this.$store.dispatch("page/setPage", "dashBoard");
  },
};
</script>

<style scoped>
#file-setting {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
}

#file-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#file-container > div {
  width: 100%;
}

.bar-color {
  width: 71px;
  color: #2f65af;
  background-color: #2f65af;
  border: 1.5px solid #2f65af;
}

#menu-select {
  margin-top: 7px;
  display: flex;
  text-align: start;
  justify-content: center;
}

#menu-select > div {
  padding: 0px 20px;
}

.header-ms {
  font-family: "IBM-PLEX-THAI";
  font-weight: 500;
  cursor: pointer;
}

.selected {
  color: #2f65af;
  cursor: default;
}

.unselect-bar {
  color: #f3f3f3;
  background-color: #f3f3f3;
  border: 1.5px solid #f3f3f3;
}

@media screen and (max-width: 1100px) {
  #file-setting {
    padding: 100px 0px 200px 0px;
  }
}
</style>
