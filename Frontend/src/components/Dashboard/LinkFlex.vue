<template>
  <div id="linkflex">
    <h1 class="header-ms">Links</h1>
    <hr class="bar-color" />

    <div id="link-box">
      <div class="icon-box">
        <img
          class="link-icon"
          src="../../assets/icon/facebook-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">Group Discussion</h1>
      </div>
      <div class="icon-box">
        <img
          class="link-icon"
          src="../../assets/icon/codalab-icon.png"
          alt=""
        />
        <h1 class="text-normal gray-text">Submission Program</h1>
      </div>
    </div>

    <div class="section">
      <button class="edit-btn">Edit Information</button>
    </div>

    <!-- <div class="spacer"></div> -->
  </div>
</template>

<script>
export default {};
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
  /* margin-bottom: 70px; */
}

.edit-btn {
  margin-top: 40px;
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 2em;
  color: #f07821;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: transparent;
  padding: 3px 13px 2px 13px;
  line-height: 20.8px;
  width: calc(100% - 80px);
}

.spacer {
  height: 70px;
}
</style>
