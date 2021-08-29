<template>
  <div id="add-admin">
    <div class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 @click="adminAdd()" class="text-normal purple-text">
        หน้าหลักการจัดการผู้ดูแลระบบ
      </h1>
    </div>

    <div id="add-admin-box">
      <h1 class="header-ms">เพิ่มผู้ดูแลระบบ</h1>
      <hr class="bar-color" />
    </div>

    <h1 class="header-s first-grid">ตำแหน่งหน้าที่</h1>

    <div id="role-select">
      <div>
        <div>
          <input
            id="checkEditor"
            v-model="user.role"
            value="editor"
            name="role-radio"
            type="radio"
          />
          <label class="text-normal">Editor</label>
        </div>
        <div>
          <input
            id="checkAdmin"
            v-model="user.role"
            value="admin"
            name="role-radio"
            type="radio"
          />
          <label class="text-normal">Admin</label>
        </div>
      </div>
      <p v-if="isInvalid.role" class="text-normal orange-text error-message">
        * {{ InvalidMessage.role }}
      </p>
    </div>

    <h1 class="header-s">ข้อมูลส่วนตัว</h1>

    <div class="name-grid">
      <div class="search-grid">
        <h1 class="text-normal">คำนำหน้า</h1>
        <select
          v-model="user.titleName"
          name="title"
          id="title"
          :class="cssTitleName"
        >
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        <!-- <p
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.titleName }}
        </p> -->
        <p
          v-if="isInvalid.titleName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.titleName }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">ชื่อ</h1>
        <div>
          <input
            v-model="user.firstName"
            :class="cssFirstName"
            type="text"
            maxlength="32"
          />
        </div>
        <p
          v-if="isInvalid.firstName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.firstName }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">นามสกุล</h1>
        <div>
          <input
            v-model="user.lastName"
            :class="cssLastName"
            type="text"
            maxlength="32"
          />
        </div>
        <p
          v-if="isInvalid.lastName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.lastName }}
        </p>
      </div>
    </div>

    <div class="contact-grid">
      <div class="search-grid">
        <h1 class="text-normal">เบอร์โทรศัพท์</h1>
        <div>
          <input
            v-model="user.phone"
            :class="cssPhone"
            type="text"
            maxlength="16"
          />
        </div>
        <p v-if="isInvalid.phone" class="text-normal orange-text error-message">
          * {{ InvalidMessage.phone }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">E-mail</h1>
        <div>
          <input
            @blur="checkDuplicatedEmail()"
            v-model="user.email"
            :class="cssEmail"
            type="text"
            maxlength="64"
          />
        </div>
        <p v-if="isInvalid.email" class="text-normal orange-text error-message">
          * {{ InvalidMessage.email }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">สังกัด</h1>
        <div>
          <input
            v-model="user.organization"
            :class="cssOrganization"
            type="text"
            maxlength="128"
          />
        </div>
        <p
          v-if="isInvalid.organization"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.organization }}
        </p>
      </div>
    </div>

    <h1 class="header-s">ข้อมูลสำหรับการเข้าสู่ระบบ</h1>

    <div class="login-info">
      <div class="search-grid">
        <h1 class="text-normal">Display Name : สำหรับแสดงผลในระบบ</h1>
        <div>
          <input
            @blur="checkDuplicatedDisplayName()"
            v-model="user.displayName"
            :class="cssDisplayName"
            maxlength="16"
            autocomplete="off"
          />
        </div>
        <p
          v-if="isInvalid.displayName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.displayName }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">Password</h1>
        <div>
          <input
            v-model="user.password"
            :class="cssPassword"
            type="password"
            maxlength="32"
            autocomplete="new-password"
          />
        </div>
        <p
          v-if="isInvalid.password"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.password }}
        </p>
      </div>

      <div class="search-grid">
        <h1 class="text-normal">Re-enter Password</h1>
        <div>
          <input
            v-model="confirmPassword"
            :class="cssConfirmPassword"
            type="password"
            maxlength="32"
            autocomplete="new-password"
          />
        </div>
        <p
          v-if="isInvalid.confirmPassword"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.confirmPassword }}
        </p>
      </div>
    </div>

    <hr class="bar-color orange-bar" />

    <div class="center">
      <button class="btn-white" @click="register()">บันทึกข้อมูล</button>
    </div>
  </div>
</template>

<script>
import User from "../../../models/user.model";
import UserService from "../../../services/user.service";
import AuthService from "../../../services/auth.service";

export default {
  data() {
    return {
      isFormFilled: false,
      confirmPassword: "",
      user: new User({
        titleName: "นาย",
        education: "มัธยมศึกษา",
        hasTeam: false,
        works: "-",
        country: "-",
        address: "-",
        institution: "-",
        isWorkInterest: false,
        hasProgSkill: false,
        hasChemSkill: false,
        hasMachineLSkill: false,
        hasOtherSkill: false,
      }),
      isInvalid: {
        ...new User(false),
        workInterest: false,
        skill: false,
        confirmPassword: false,
      },
      InvalidMessage: {
        ...new User(false),
        workInterest: false,
        skill: false,
        confirmPassword: false,
      },
    };
  },
  computed: {
    cssTitleName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.titleName) {
        return error;
      }
      return complete;
    },
    cssFirstName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.firstName) {
        return error;
      }
      return complete;
    },
    cssLastName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.lastName) {
        return error;
      }
      return complete;
    },
    cssOrganization() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.organization) {
        return error;
      }
      return complete;
    },
    cssPhone() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.phone) {
        return error;
      }
      return complete;
    },
    cssEmail() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.email) {
        return error;
      }
      return complete;
    },
    cssDisplayName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.displayName) {
        return error;
      }
      return complete;
    },
    cssPassword() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.password) {
        return error;
      }
      return complete;
    },
    cssConfirmPassword() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.confirmPassword) {
        return error;
      }
      return complete;
    },
  },
  watch: {
    "user.firstName": function () {
      this.isInvalid.firstName = false;
      this.InvalidMessage.firstName = "";
    },
    "user.lastName": function () {
      this.isInvalid.lastName = false;
      this.InvalidMessage.lastName = "";
    },
    "user.organization": function () {
      this.isInvalid.organization = false;
      this.InvalidMessage.organization = "";
    },
    "user.phone": function () {
      this.isInvalid.phone = false;
      this.InvalidMessage.phone = "";
    },
    "user.email": function () {
      this.isInvalid.email = false;
      this.InvalidMessage.email = "";
    },
    "user.displayName": function () {
      this.isInvalid.displayName = false;
      this.InvalidMessage.displayName = "";
    },
    "user.password": function () {
      this.isInvalid.password = false;
      this.InvalidMessage.password = "";
    },
    "user.role": function () {
      this.isInvalid.role = false;
      this.InvalidMessage.role = "";
    },
    confirmPassword: function () {
      this.isInvalid.confirmPassword = false;
      this.InvalidMessage.confirmPassword = "";
    },
  },
  methods: {
    register() {
      this.validateForm();
      if (
        this.validateForm() &&
        !this.isInvalid.displayName &&
        !this.isInvalid.email
      ) {
        AuthService.register(this.user).then((res) => {
          if (res.status == 201) {
            console.log("Register success!");
            this.$store.dispatch("admin/getStaffList");
            this.$emit("statusAdd", false);
          } else {
            console.log("Something wrong!");
          }
        });
      }
    },
    adminAdd() {
      this.$emit("statusAdd", false);
    },
    checkDuplicatedDisplayName() {
      UserService.checkDuplicated({
        displayName: this.user.displayName,
      }).then((res) => {
        if (res.status == 200) {
          this.duplicateDisplayName = res.data.isFound;
          if (this.duplicateDisplayName) {
            this.isInvalid.displayName = true;
            this.InvalidMessage.displayName = "ชื่อผู้ใช้งานมีในระบบแล้ว";
            this.isFormFilled = false;
          }
        } else {
          console.log("Something wrong!");
        }
      });
    },
    checkDuplicatedEmail() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.user.email)) {
        UserService.checkDuplicated({ email: this.user.email }).then((res) => {
          if (res.status == 200) {
            this.duplicateEmail = res.data.isFound;
            if (res.data.isFound) {
              this.isInvalid.email = true;
              this.InvalidMessage.email = "E-mail มีในระบบแล้ว";
            }
          } else {
            console.log("Something wrong!");
          }
        });
      } else {
        this.isInvalid.email = true;
        this.InvalidMessage.email = "โปรดระบุ E-mail ให้ถูกต้อง";
      }
    },
    checkForm() {
      let check = !this.user.titleName
        ? false
        : !this.user.firstName
        ? false
        : !this.user.lastName
        ? false
        : !this.user.education
        ? false
        : !this.user.institution
        ? false
        : !this.user.organization
        ? false
        : !this.user.address
        ? false
        : !this.user.country
        ? false
        : !this.user.phone
        ? false
        : !this.user.email
        ? false
        : !this.user.works
        ? false
        : this.user.isWorkInterest == null
        ? false
        : this.user.isWorkInterest && !this.user.interestField
        ? false
        : this.user.hasProgSkill &&
          (!this.user.progSkillLevel || !this.user.progSkillList)
        ? false
        : this.user.hasChemSkill &&
          (!this.user.chemSkillLevel || !this.user.chemSkillList)
        ? false
        : this.user.hasMachineLSkill &&
          (!this.user.machineLSkillLevel || !this.user.machineLSkillList)
        ? false
        : this.user.hasOtherSkill && !this.user.otherSkillList
        ? false
        : this.user.hasTeam == null
        ? false
        : this.user.role
        ? false
        : !this.user.displayName
        ? false
        : !this.user.password
        ? false
        : !this.confirmPassword
        ? false
        : true;
      return check;
    },
    validateForm() {
      this.isFormFilled = true;
      if (!this.user.titleName) {
        this.isInvalid.titleName = true;
        this.InvalidMessage.titleName = "โปรดระบุคำนำหน้า";
        this.isFormFilled = false;
      }
      if (!this.user.firstName) {
        this.isInvalid.firstName = true;
        this.InvalidMessage.firstName = "โปรดระบุชื่อ";
        this.isFormFilled = false;
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(this.user.firstName)) {
        this.isInvalid.firstName = true;
        this.InvalidMessage.firstName = "โปรดระบุชื่อให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.lastName) {
        this.isInvalid.lastName = true;
        this.InvalidMessage.lastName = "โปรดระบุนามสกุล";
        this.isFormFilled = false;
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(this.user.lastName)) {
        this.isInvalid.lastName = true;
        this.InvalidMessage.lastName = "โปรดระบุนามสกุลให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.education) {
        this.isInvalid.education = true;
        this.InvalidMessage.education = "โปรดระบุระดับการศึกษาสูงสุด";
        this.isFormFilled = false;
      }
      if (!this.user.institution) {
        this.isInvalid.institution = true;
        this.InvalidMessage.institution = "โปรดระบุสถานศึกษา";
        this.isFormFilled = false;
      }
      if (!this.user.organization) {
        this.isInvalid.organization = true;
        this.InvalidMessage.organization = "โปรดระบุสังกัด";
        this.isFormFilled = false;
      }
      if (!this.user.address) {
        this.isInvalid.address = true;
        this.InvalidMessage.address = "โปรดระบุที่อยู่";
        this.isFormFilled = false;
      }
      if (!this.user.country) {
        this.isInvalid.country = true;
        this.InvalidMessage.country = "โปรดระบุประเทศ";
        this.isFormFilled = false;
      }
      if (!this.user.phone) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์";
        this.isFormFilled = false;
      } else if (this.user.phone.length < 9 || this.user.phone.length > 15) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์ให้ครบ";
        this.isFormFilled = false;
      } else if (/[^+^0-9]/.test(this.user.phone)) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.email) {
        this.isInvalid.email = true;
        this.InvalidMessage.email = "โปรดระบุ E-mail";
        this.isFormFilled = false;
      }
      if (!this.user.works) {
        this.isInvalid.works = true;
        this.InvalidMessage.works = "โปรดระบุผลงานที่เคยทำ";
        this.isFormFilled = false;
      }
      if (this.user.isWorkInterest == null) {
        this.isInvalid.workInterest = true;
        this.InvalidMessage.workInterest = "โปรดระบุความสนใจ";
        this.isFormFilled = false;
      }
      if (this.user.isWorkInterest && !this.user.interestField) {
        this.isInvalid.workInterest = true;
        this.InvalidMessage.workInterest = "โปรดระบุสาขาที่สนใจ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasProgSkill &&
        (!this.user.progSkillLevel || !this.user.progSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุภาษาที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasChemSkill &&
        (!this.user.chemSkillLevel || !this.user.chemSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasMachineLSkill &&
        (!this.user.machineLSkillLevel || !this.user.machineLSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (this.user.hasOtherSkill && !this.user.otherSkillList) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (this.user.hasTeam == null) {
        this.isInvalid.hasTeam = true;
        this.InvalidMessage.hasTeam = "โปรดระบุคำตอบ";
        this.isFormFilled = false;
      }
      if (!this.user.role) {
        this.isInvalid.role = true;
        this.InvalidMessage.role = "โปรดระบุตำแหน่งหน้าที่";
        this.isFormFilled = false;
      }
      if (!this.user.displayName) {
        this.isInvalid.displayName = true;
        this.InvalidMessage.displayName = "โปรดระบุชื่อผู้ใช้งาน";
        this.isFormFilled = false;
      } else if (this.user.displayName.length < 3) {
        this.isInvalid.displayName = true;
        this.InvalidMessage.displayName = "โปรดระบุชื่อผู้ใช้งานไม่ต่ำกว่า 3";
        this.isFormFilled = false;
      } else if (/[^A-Za-z0-9_.ก-๛]/.test(this.user.displayName)) {
        this.isInvalid.displayName = true;
        this.InvalidMessage.displayName = "โปรดระบุชื่อให้ถูกต้อง";
        this.isFormFilled = false;
      } else if (this.user.displayName == ".") {
        this.isInvalid.displayName = true;
        this.InvalidMessage.displayName = "โปรดระบุชื่อผู้ใช้งาน";
        this.isFormFilled = false;
      } else if (
        this.user.displayName[this.user.displayName.length - 1] == "."
      ) {
        this.isInvalid.displayName = true;
        this.InvalidMessage.displayName = "โปรดระบุชื่อผู้ใช้งาน";
        this.isFormFilled = false;
      }
      if (!this.user.password) {
        this.isInvalid.password = true;
        this.InvalidMessage.password = "โปรดระบุรหัสผ่าน";
        this.isFormFilled = false;
      } else if (this.user.password.length < 8) {
        this.isInvalid.password = true;
        this.InvalidMessage.password = "โปรดระบุรหัสผ่านอย่างน้อย 8 ตัว";
        this.isFormFilled = false;
      }
      if (!this.confirmPassword) {
        this.isInvalid.confirmPassword = true;
        this.InvalidMessage.confirmPassword = "โปรดยืนยันรหัสผ่าน";
        this.isFormFilled = false;
      } else if (this.user.password != this.confirmPassword) {
        this.isInvalid.confirmPassword = true;
        this.InvalidMessage.confirmPassword =
          "โปรดยืนยันรหัสผ่านให้ตรงกับรหัสผ่าน";
        this.isFormFilled = false;
      }
      return this.isFormFilled;
    },
  },
};
</script>

<style scoped>
#add-admin {
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

#role-select > div {
  display: flex;
  align-items: center;
}

#role-select > div > div:first-child {
  margin-right: 30px;
}

#checkEditor,
#checkAdmin {
  margin-right: 10px;
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

.login-info {
  margin-bottom: 20px;
}

.page-change-left {
  position: absolute;
  top: 35px;
  left: 60px;
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

.first-grid {
  margin-top: 35px !important;
}

.error-message {
  margin-top: 5px;
}

.orange-bar {
  color: #f07821;
  background-color: #f07821;
  border: 1.5px solid #f07821;
}

#add-admin-box {
  margin-top: 50px;
}

#file-content {
  margin-top: 20px;
}

.search-grid {
  /* display: grid;
  grid-template-columns: 1fr 3.5fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: top; */
  display: block;
  margin-top: 15px;
}

.name-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
}

.contact-grid > .search-grid {
  margin-top: 10px;
}

.btn-white {
  margin-top: 20px;
  color: #2f65af;
}

.header-s {
  text-align: left;
  margin-bottom: 5px;
  margin-top: 20px;
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
  #add-admin {
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

  .page-change-left {
    left: 30px;
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

  .search-grid,
  .name-grid,
  .contact-grid,
  .input-grid {
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
