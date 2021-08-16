<template>
  <div id="linkflex">
    <h1 class="header-ms">Links</h1>
    <hr class="bar-color" />

    <div id="link-box">
      <div
        class="icon-box"
        @click="linkClick('https://www.facebook.com/tmlcc.th')"
      >
        <img
          class="link-icon"
          src="../../assets/icon/facebook-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">TMLCC Facebook Fanpage</h1>
      </div>
      <div
        class="icon-box"
        @click="linkClick('https://community.deepnote.com/c/tmlcc')"
      >
        <img
          class="link-icon"
          src="../../assets/icon/deepnote-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">TMLCC Community</h1>
      </div>
      <div
        class="icon-box"
        @click="
          linkClick('https://deepnote.com/dashboard/TMLCC-workshop/projects')
        "
      >
        <img
          class="link-icon"
          src="../../assets/icon/deepnote-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">Workshop Project</h1>
      </div>
      <div
        class="icon-box"
        @click="
          linkClick('https://deepnote.com/dashboard/TMLCC-workshop/projects')
        "
      >
        <img
          class="link-icon"
          src="../../assets/icon/sw-drive-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">Dataset</h1>
      </div>
      <div class="icon-box">
        <img
          class="link-icon"
          src="../../assets/icon/codalab-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">Codalab Competition</h1>
      </div>
    </div>

    <!-- <div class="section">
      <button class="edit-btn">Edit Information</button>
    </div> -->

    <div class="spacer"></div>
  </div>
</template>

<script>
export default {
  methods: {
    linkClick(value) {
      window.open(value);
    },
  },
};
</script>

<style scoped>
#linkflex {
  background: #ffffff;
  border-radius: 30px;
  padding: 15px 32px 15px 32px;
  width: 270px;
  margin-top: 45px;
}

.bar-color {
  width: 71px;
}

.link-icon {
  width: 28px;
  height: 28px;
  margin-right: 10px;
}

.icon-box {
  display: flex;
  text-align: center;
}

.icon-box:not(:last-child) {
  margin-bottom: 10px;
}

.icon-box > h1,
.icon-box > .link-icon {
  cursor: pointer;
}

#link-box {
  margin-top: 22px;
}

.edit-btn {
  margin-top: 40px;
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 1.75em;
  color: #f07821;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: transparent;
  padding: 3px 13px 2px 13px;
  line-height: 20.8px;
  width: calc(100% - 80px);
  cursor: pointer;
}

.spacer {
  height: 50px;
}

@media screen and (max-width: 1100px) {
  #linkflex {
    width: 100%;
    margin-top: 0px;
    margin-left: 15px;
  }

  .join-btn,
  .edit-btn {
    font-size: 1.75em;
  }

  .spacer {
    display: none;
  }
}

@media screen and (max-width: 767px) {
  #linkflex {
    width: calc(100% - 60px);
    margin-left: 0px;
    margin-top: 30px;
  }
}
</style>
