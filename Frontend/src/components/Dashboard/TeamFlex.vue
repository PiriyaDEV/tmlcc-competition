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
          maxlength="32"
          @blur="checkDuplicated()"
        />
        <h1 @click="createTeam()" class="add-btn">+</h1>
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
        <button
          v-if="currentTeam.isLeader"
          @click="editTeamName"
          class="edit-btn"
        >
          <img
            class="edit-icon"
            src="../../assets/icon/edit-icon-p.png"
            alt=""
          />
          Edit
        </button>
      </div>

      <div v-if="teamStatus.hasTeam && edit" id="team-input">
        <input
          class="teamname-text-l input-box"
          type="text"
          v-model="teamName"
          maxlength="32"
          @blur="checkDuplicated()"
        />
        <button @click="renameTeam" class="edit-btn save-btn center">
          <i class="fa fa-save"></i>Save
        </button>
      </div>

      <p
        v-if="createStatus.isInvalid && teamStatus.hasTeam"
        class="text-normal orange-text error-message"
      >
        * {{ createStatus.message }}
      </p>

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
        <h1
          v-if="teamList && teamList.length == 0 && role != `user`"
          class="text-normal gray-text"
        >
          ไม่มีทีมในระบบ
        </h1>
        <div v-if="!currentTeam.isLeader">
          <div v-for="(team, i) in teamList" :key="i">
            <h1 class="text-normal gray-text teamname">{{ team.teamName }}</h1>
            <button
              class="join-btn"
              v-if="
                role == `user` && team.status != 'pending' && team.members < 5
              "
              @click="joinTeam(team.team_id)"
            >
              เข้าร่วม
            </button>
            <button
              class="approve-btn"
              v-if="
                role == `user` && team.status == 'pending' && team.members < 5
              "
              @click="cancelTeam(team.team_id)"
            >
              รออนุญาต
            </button>
            <button v-if="team.members == 5 && role == `user`" class="full-btn">
              เต็ม
            </button>
            <button
              class="join-btn"
              @click="showMember(team.teamName)"
              v-if="role == `admin`"
            >
              แสดง
            </button>
          </div>
        </div>
        <div v-if="teamStatus.hasTeam">
          <div v-for="(member, i) in teamMember" :key="i">
            <h1
              v-if="member.status == 'approved'"
              class="text-normal purple-d-text teamname bold"
            >
              {{ member.fullName }}
            </h1>
            <h1
              v-else-if="member.status == 'pending'"
              class="text-normal gray-text teamname"
            >
              {{ member.fullName }}
            </h1>
            <h1 v-else class="text-normal purple-d-text teamname bold">
              {{ member.fullName }}
            </h1>
            <button
              v-if="currentTeam.isLeader && member.status == 'pending'"
              @click="approveMember(member.member_id)"
              class="join-btn"
            >
              อนุญาต
            </button>
            <button
              v-if="currentTeam.isLeader && member.status == 'approved'"
              @click="rejectMember(member.member_id)"
              class="join-btn leave-btn"
            >
              นำออก
            </button>
          </div>
        </div>
        <h1
          v-if="
            !currentTeam.isLeader && !currentTeam.members && !teamList.length
          "
          class="text-normal gray-text"
        >
          ไม่พบทีมในระบบ
        </h1>
        <h1
          v-if="currentTeam.isLeader && currentTeam.members.length == 1"
          class="text-normal gray-text"
        >
          คุณยังไม่มีเพื่อนร่วมทีม
        </h1>
      </div>

      <p class="note" v-if="role == `user` && !teamStatus.hasTeam">
        เมื่อเลือกทีมแล้ว กรุณารอหัวหน้าทีม Approve
      </p>

      <p
        class="note"
        v-if="role == `user` && currentTeam.isLeader && teamStatus.hasTeam"
      >
        <span v-if="!deleteCheck"
          >ต้องการที่จะลบทีมนี้ กดที่นี่เพื่อ
          <span @click="deleteClick" class="orange-text"
            ><img
              class="trash-icon"
              src="../../assets/icon/icon-trash-o.png"
              alt=""
            />Delete</span
          ></span
        >
        <span v-if="deleteCheck"
          >ท่านแน่ใจที่จะลบทีมนี้ใช่หรือไม่
          <div>
            <span @click="deleteTeam">ยืนยัน </span>
            <span @click="deleteClick">ยกเลิก</span>
          </div>
        </span>
      </p>

      <p
        class="note"
        v-if="role == `user` && !currentTeam.isLeader && teamStatus.hasTeam"
      >
        <span v-if="!leaveCheck"
          >ต้องการออกจากกลุ่ม กดที่นี่เพื่อ
          <span @click="leaveClick" class="orange-text"
            ><img
              class="leave-icon"
              src="../../assets/icon/leave-icon.png"
              alt=""
            />Leave</span
          ></span
        >
        <span v-if="leaveCheck"
          >ท่านแน่ใจที่ออกจากทีมนี้ใช่หรือไม่
          <div>
            <span @click="leaveTeam">ยืนยัน </span>
            <span @click="leaveClick">ยกเลิก</span>
          </div>
        </span>
      </p>

      <button
        v-if="role == `admin`"
        @click="memberClick"
        class="join-btn show-btn"
      >
        แสดงรายชื่อผู้ลงทะเบียน
      </button>

      <div id="editor-spacer" v-if="role == 'editor'"><span></span></div>
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
      deleteCheck: false,
      leaveCheck: false,
    };
  },
  mounted() {
    this.checkTeam();
  },
  computed: {
    ...mapGetters({
      role: ["auth/getRole"],
      user_id: ["auth/getUserId"],
      teamList: ["team/getTeamList"],
      currentTeam: ["team/getCurrentTeam"],
      memberCount: ["team/getCurrentTeamMemberCount"],
      teamMember: ["team/getCurrentTeamMember"],
      teamStatus: ["team/getTeamStatus"],
      createStatus: ["team/getCreateStatus"],
    }),
  },
  methods: {
    memberClick() {
      this.$store.dispatch("admin/updateUserSearch", "");
      if (this.$route.path != "/dashboard/member") {
        this.$router.push("/dashboard/member");
      }
    },
    showMember(teamName) {
      this.$store.dispatch("admin/updateUserSearch", teamName);
      if (this.$route.path != "/dashboard/member") {
        this.$router.push("/dashboard/member");
      }
    },
    deleteClick() {
      this.deleteCheck = !this.deleteCheck;
    },
    leaveClick() {
      this.leaveCheck = !this.leaveCheck;
    },
    editTeamName() {
      this.edit = !this.edit;
      this.teamName = this.currentTeam.teamName;
    },
    async createTeam() {
      await this.$store.dispatch("team/create", this.teamName);
      if (this.teamStatus.hasTeam) {
        this.teamName = "";
      }
    },
    async checkDuplicated() {
      await this.$store.dispatch("team/checkDuplicated", this.teamName);
    },
    async renameTeam() {
      await this.$store.dispatch("team/rename", this.teamName);
      if (!this.createStatus.isInvalid) {
        this.edit = !this.edit;
        this.teamName = "";
      }
    },
    async deleteTeam() {
      await this.$store.dispatch("team/delete");
      if (!this.teamStatus.hasTeam) {
        this.deleteCheck = !this.deleteCheck;
      }
    },
    async approveMember(member_id) {
      await this.$store.dispatch("team/approve", member_id);
    },
    async rejectMember(member_id) {
      await this.$store.dispatch("team/reject", member_id);
    },
    async joinTeam(team_id) {
      await this.$store.dispatch("team/join", team_id);
    },
    async cancelTeam(team_id) {
      await this.$store.dispatch("team/cancel", team_id);
    },
    async leaveTeam() {
      await this.$store.dispatch("team/leave");
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

#editor-spacer {
  height: 40px;
}

.bold {
  font-weight: 600;
}

.trash-icon,
.leave-icon {
  width: 10px;
  margin-right: 4px;
  margin-left: 5px;
}

.edit-icon {
  width: 15px;
  margin-right: 4px;
  margin-left: 5px;
}

.save-btn {
  color: #ffffff !important;
  background-color: #2f65af !important;
  border-color: #2f65af !important;
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

.fa-save {
  font-size: 1.2em !important;
  margin-right: 5px;
}

.team-list {
  margin-top: 10px;
}

.error-message {
  margin-bottom: 5px;
  margin-top: -5px;
}

.note > span > .orange-text,
.note > span > .gray-text {
  cursor: pointer;
  font-weight: 700;
}

.note > span > div > span {
  cursor: pointer;
  border-radius: 10px;
  padding: 2px 20px;
  margin: 0px 5px;
}

.note > span > div {
  margin-top: 5px;
}

.note > span > div > span:nth-child(1) {
  background-color: #f07821;
  color: #ffffff;
}

.note > span > div > span:nth-child(2) {
  background-color: #c4c4c4;
  color: #ffffff;
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
  height: 250px;
  border-radius: 8px;
  overflow-y: scroll;
}

#team-box > div > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#team-box > div > div:not(:last-child) {
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

.leave-btn {
  color: #ffffff;
  background-color: #764a97;
  padding: 3px 15px 2px 15px;
}

.full-btn {
  border: 2px solid #f07821;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 1.75em;
  color: #ffffff;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: #f07821;
  padding: 3px 13px 2px 13px;
  line-height: 20.8px;
}

.approve-btn {
  border: 2px solid #764a97;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 1.5em;
  color: #ffffff;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 400;
  background-color: #764a97;
  padding: 3px 7px 2px 7px;
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
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-size: 1.75em;
  margin: 0px 0px 0px 14px;
  box-sizing: border-box;
  color: #bf2e7e;
  border: 2px solid #bf2e7e;
  border-radius: 12px;
  padding: 6px 7px;
  background-color: transparent;
  display: flex;
  align-items: center;
}

.teamname {
  white-space: nowrap;
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
  .full-btn,
  .edit-btn {
    font-size: 1.75em;
  }
}

@media screen and (max-width: 980px) {
  .trash-icon,
  .leave-icon {
    width: 8px;
  }

  .edit-icon {
    width: 10px;
  }

  #editor-spacer {
    height: 20px;
  }
}

@media screen and (max-width: 767px) {
  #teamflex {
    width: calc(100% - 60px);
    margin-right: 0px;
  }

  .trash-icon,
  .leave-icon {
    width: 7px;
  }

  .edit-icon {
    width: 9px;
  }
}

@media screen and (max-width: 370px) {
  .teamname {
    width: 100px;
  }
}
</style>
