<template>
  <div id="teamflex">
    <h1 class="header-ms">Team</h1>
    <hr class="bar-color-p" />

    <div>
      <h1 v-if="role == `user` && !teamStatus.hasTeam" class="text-normal">
        สร้างทีม
      </h1>
      <div v-if="role == `user` && !teamStatus.hasTeam" id="team-input">
        <input
          type="text"
          class="input-box text-normal"
          placeholder="กรอกชื่อทีมที่ต้องการ"
          v-model="teamName"
          @blur="checkDuplicated()"
        />
        <h1 @click="createClick()" class="add-btn">+</h1>
      </div>
      <p
        v-if="createStatus.isInvalid && !teamStatus.hasTeam"
        class="text-normal orange-text error-message"
      >
        * {{ createStatus.message }}
      </p>

      <h1 v-if="teamStatus.hasTeam" class="text-normal">ทีมของคุณ</h1>
      <div v-if="teamStatus.hasTeam && !edit" id="team-input">
        <h1 class="teamname-text-l">{{ currentTeam.teamName }}</h1>
        <button @click="editTeamName" class="edit-btn">edit</button>
      </div>

      <div v-if="teamStatus.hasTeam && edit" id="team-input">
        <input
          class="teamname-text-l input-box"
          type="text"
          v-model="currentTeam.teamName"
        />
        <button @click="editTeamName" class="edit-btn">save</button>
      </div>

      <h1 class="text-normal" v-if="role == `user` && !teamStatus.hasTeam">
        เลือกทีมของคุณ
      </h1>
      <h1 class="text-normal" v-if="role == `user` && teamStatus.hasTeam">
        เพื่อนร่วมทีม
      </h1>
      <h1 class="text-normal team-list" v-if="role != `user`">
        รายการทีมทั้งหมด
      </h1>
      <div id="team-box">
        <div v-if="!currentTeam.isLeader">
          <div v-for="(team, i) in teamList" :key="i">
            <h1 class="text-normal gray-text teamname">{{ team.teamName }}</h1>
            <button class="join-btn" v-if="role == `user`" @click="joinTeam()">
              เข้าร่วม
            </button>
            <button
              class="approve-btn"
              v-if="role == `user` && team.status == 'pending'"
            >
              รออนุญาติ
            </button>
            <button class="join-btn" v-if="role != `user`">แสดง</button>
          </div>
        </div>
        <div v-if="currentTeam.isLeader">
          <div v-for="(team, i) in currentTeam.members" :key="i">
            <h1 class="text-normal gray-text teamname">แฮรรี่ จันทร์โอชา</h1>
            <button class="join-btn">อนุญาติ</button>
          </div>
        </div>
        <h1 v-if="!teamList" class="text-normal l-grey-text">ไม่พบทีมในระบบ</h1>
      </div>

      <p class="note" v-if="role == `user`">
        เมื่อเลือกทีมแล้ว กรุณารอหัวหน้าทีม Approve
      </p>
      <button
        v-if="role != `user`"
        @click="memberClick"
        class="join-btn show-btn"
      >
        แสดงรายชื่อผู้ลงทะเบียน
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      teamName: "",
      edit: false,
    };
  },
  mounted() {
    this.checkTeam();
  },
  computed: {
    ...mapGetters({
      role: ["auth/getRole"],
      teamList: ["team/getTeamList"],
      currentTeam: ["team/getCurrentTeam"],
      teamStatus: ["team/getTeamStatus"],
      createStatus: ["team/getCreateStatus"],
    }),
  },
  methods: {
    memberClick() {
      this.$router.push("/dashboard/member");
    },
    joinTeam() {},
    checkDuplicated() {
      this.$store.dispatch("team/checkDuplicated", this.teamName);
    },
    editTeamName() {
      this.edit = !this.edit;
    },
    async createClick() {
      await this.$store.dispatch("team/create", this.teamName);
      if (this.teamStatus.hasTeam) {
        this.teamName = "";
      }
    },
    ...mapActions({
      checkTeam: "team/checkTeam",
      getTeamList: "team/getTeamList",
    }),
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

.team-list {
  margin-top: 10px;
}

.error-message {
  margin-bottom: 5px;
  margin-top: -5px;
}

#team-input > input {
  padding: 3px 5px !important;
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
  font-size: 1.75em;
  color: #764a97;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: transparent;
  padding: 3px 13px 2px 13px;
  line-height: 20.8px;
}

.approve-btn {
  border: 2px solid #764a97;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 1.75em;
  color: #ffffff;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: #764a97;
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
  font-weight: 700 !important;
  font-family: "IBM-PLEX-THAI-SEMIBOLD" !important;
  color: #764a97 !important;
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
  background-color: transparent;
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

@media screen and (max-width: 1100px) {
  #teamflex {
    width: 100%;
    margin-right: 15px;
  }

  .join-btn,
  .approve-btn,
  .edit-btn {
    font-size: 1.75em;
  }
}

@media screen and (max-width: 767px) {
  #teamflex {
    width: calc(100% - 60px);
    margin-right: 0px;
  }
}

@media screen and (max-width: 370px) {
  .teamname {
    width: 100px;
  }
}
</style>
