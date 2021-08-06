<template>
  <div id="teamflex">
    <h1 class="header-ms">Team</h1>
    <hr class="bar-color-p" />

    <div>
      <h1 class="text-normal">สร้างทีม</h1>
      <div id="team-input">
        <input
          type="text"
          class="input-box text-normal"
          placeholder="กรอกชื่อทีมที่ต้องการ"
        />
        <h1 class="add-btn">+</h1>
      </div>

      <!-- <h1 class="text-normal">ทีมของคุณ</h1>
      <div id="team-input">
        <h1 class="teamname-text-l">Team_DrStone</h1>
        <h1 class="edit-btn">edit</h1>
      </div> -->

      <h1 class="text-normal">เลือกทีมของคุณ</h1>
      <div id="team-box">
        <div v-for="(team, i) in teamList" :key="i">
          <h1 class="text-normal gray-text teamname">Team_StrangerThs</h1>
          <button class="join-btn">เข้าร่วม</button>
        </div>
      </div>

      <!-- <p class="note">เมื่อเลือกทีมแล้ว กรุณารอหัวหน้าทีม Approve</p> -->
      <button class="join-btn show-btn">แสดงรายชื่อผู้ลงทะเบียน</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamList: 20,
    };
  },
};
</script>

<style scoped>
#teamflex {
  background: #ffffff;
  border-radius: 30px;
  padding: 15px 32px 15px 32px;
  width: 270px;
}

button {
  cursor: pointer;
}

.bar-color-p {
  width: 71px;
}

.input-box {
  width: 100%;
  margin: 0;
}

.add-btn {
  border: 2px solid #764a97;
  box-sizing: border-box;
  border-radius: 11px;
  padding: 0px 7px;
  font-size: 4em;
  line-height: 32px;
  margin: 0px 0px 0px 14px;
  color: #764a97;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  cursor: pointer;
}

#team-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

#team-box {
  padding: 10px 12px;
  border: 1px solid rgba(79, 79, 79, 0.16);
  box-sizing: border-box;
  height: 175px;
  border-radius: 8px;
  overflow-y: scroll;
}

#team-box > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#team-box > div:not(:last-child) {
  margin: 0px 0px 13px 0px;
}

.join-btn {
  border: 2px solid #764a97;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 2em;
  color: #764a97;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: transparent;
  padding: 3px 13px 2px 13px;
  line-height: 20.8px;
}

.note {
  font-size: 1.75em;
  font-weight: 500;
  color: #764a97;
  margin: 13px 0px 0px 0px;
  text-align: center;
}

.teamname-text-l {
  font-size: 2.75em;
  margin: 0;
  font-weight: 700;
  color: #303030;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  color: #764a97;
}

.edit-btn {
  color: #f07821;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-size: 1.75em;
  margin: 0px 0px 0px 14px;
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 6px 7px;
}

.teamname {
  overflow: hidden;
  text-overflow: ellipsis;
  width: 157px;
}

.show-btn {
  width: 100%;
  margin-top: 12px;
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
</style>
