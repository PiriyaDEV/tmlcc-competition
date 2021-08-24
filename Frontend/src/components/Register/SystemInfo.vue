<template>
  <div id="systeminfo-box">
    <div @click="applicantClick()" class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 class="text-normal purple-text">ข้อมูลผู้สมัคร</h1>
    </div>

    <h1 class="header-m">ข้อมูลผู้ใช้งานระบบ</h1>
    <hr class="bar-color" />

    <div id="information" class="center">
      <div>
        <h1 class="header-s">ท่านมีทีมของตนเองแล้วหรือไม่</h1>
        <div class="team-checkbox">
          <div>
            <input v-model="user.hasTeam" value="true" type="radio" />
            <h1 class="text-normal">มี</h1>
          </div>
          <div>
            <input v-model="user.hasTeam" value="false" type="radio" />
            <h1 class="text-normal">ไม่มี</h1>
          </div>
        </div>
        <p
          v-if="registerStatus.hasTeam.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.hasTeam.message }}
        </p>

        <div id="note">
          <h1 class="text-normal purple-text">หมายเหตุ :</h1>
          <h1 class="text-normal">
            การสร้างกลุ่ม สามารถสร้าง <br />
            และเพิ่มสมาชิกได้ หลังการเข้าสู่ระบบ
          </h1>
        </div>

        <hr class="bar-color" />

        <h1 id="login-info" class="header-s">ข้อมูลสำหรับการเข้าสู่ระบบ</h1>

        <div>
          <h1 class="text-normal">Email : ใช้ e-mail ในการเข้าสู่ระบบ</h1>
          <input
            v-model="user.email"
            class="input-box text-normal"
            type="text"
            placeholder="{E-mail ใช้ข้อมูลเดียวกับช่องติดต่อ}"
            disabled
          />
        </div>

        <div>
          <h1 class="text-normal">Display Name : สำหรับแสดงผลในระบบ</h1>
          <input
            v-model="user.displayName"
            @blur="checkDuplicated()"
            :class="cssDisplayName"
            type="text"
            maxlength="16"
            autocomplete="off"
          />
        </div>
        <p
          v-if="registerStatus.displayName.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.displayName.message }}
        </p>

        <div>
          <h1 class="text-normal">Password</h1>
          <input
            v-model="user.password"
            :class="cssPassword"
            type="password"
            maxlength="16"
            autocomplete="new-password"
          />
        </div>
        <p
          v-if="registerStatus.password.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.password.message }}
        </p>

        <div>
          <h1 class="text-normal">Re-enter Password</h1>
          <input
            v-model="confirmPassword"
            :class="cssConfirmPassword"
            type="password"
            maxlength="16"
            autocomplete="new-password"
          />
        </div>
        <p
          v-if="registerStatus.confirmPassword.isInvalid"
          maxlength="16"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.confirmPassword.message }}
        </p>
      </div>
    </div>

    <hr class="bar-color" />

    <div class="center">
      <button @click="register()" :class="cssBtn">ยืนยันข้อมูล</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["user"],
  data() {
    return {
      readyToCreate: false,
    };
  },
  computed: {
    ...mapGetters({
      registerStatus: "auth/getRegisterStatus",
    }),
    cssBtn() {
      return this.readyToCreate ? "btn-white" : "btn-grey";
    },
    cssDisplayName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.displayName.isInvalid) {
        return error;
      }
      return complete;
    },
    cssPassword() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.password.isInvalid) {
        return error;
      }
      return complete;
    },
    cssConfirmPassword() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.confirmPassword.isInvalid) {
        return error;
      }
      return complete;
    },
  },
  watch: {
    // "user.hasTeam": function () {
    //   if (this.user.hasTeam == "true") {
    //     this.user.hasTeam = true;
    //   } else if (this.user.hasTeam == "false") {
    //     this.user.hasTeam = false;
    //   }
    // },
    // "user.displayName": function () {
    //   let reg = /[^A-Za-z0-9_.ก-๛]/;
    //   if (this.user.displayName.length < 3) {
    //     this.isInvalid.displayName = true;
    //   } else if (reg.test(this.user.displayName)) {
    //     this.isInvalid.displayName = true;
    //   } else if (this.user.displayName == ".") {
    //     this.isInvalid.displayName = true;
    //   } else if (
    //     this.user.displayName[this.user.displayName.length - 1] == "."
    //   ) {
    //     this.isInvalid.displayName = true;
    //   }
    // },
    // "user.password": function () {
    //   if (this.user.password.length < 8) {
    //     this.isInvalid.password = true;
    //   }
    // },
    // confirmPassword: function () {
    //   if (this.user.password != this.confirmPassword) {
    //     this.isInvalid.confirmPassword = true;
    //   }
    // },
  },
  methods: {
    applicantClick() {
      this.$store.dispatch("page/setPage", "applicant");
    },
    async register() {
      await this.$store.dispatch("auth/register", this.user);
      if (this.registerStatus.isSuccess) {
        this.$router.push("/login");
      }
    },
    // checkDuplicated() {
    //   if (this.user.displayName) {
    //     UserService.checkDuplicated({
    //       displayName: this.user.displayName,
    //     }).then((res) => {
    //       if (res.status == 200) {
    //         this.isInvalid.displayName = res.data.isFound;
    //       } else {
    //         console.log("Something wrong!");
    //       }
    //     });
    //   } else {
    //     this.isInvalid.displayName = true;
    //   }
    // },
    // checkForm() {
    //   let check =
    //     this.user.hasTeam == null
    //       ? false
    //       : !this.user.displayName
    //       ? false
    //       : !this.user.password
    //       ? false
    //       : !this.confirmPassword
    //       ? false
    //       : true;

    //   return check;
    // },
    async validateAccount() {
      await this.$store.dispatch("auth/validateAccount", this.user);
      this.readyToCreate = this.registerStatus.readyToCreate;
    },
  },
};
</script>

<style scoped>
#systeminfo-box {
  /* width: 100%; */
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
  position: relative;
}

.bar-color {
  width: 120px;
}

#information {
  margin-top: 20px;
}

#note {
  align-items: flex-start;
  margin-bottom: 20px;
  display: flex;
}

#note > h1:nth-child(2) {
  margin-left: 20px;
}

input[type="text"],
input[type="password"] {
  width: 407px;
}

#login-info {
  margin-top: 20px;
}

.header-s {
  text-align: left;
}

.btn-white,
.btn-grey {
  margin-top: 20px;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.page-change-left {
  position: absolute;
  top: 35px;
}

.page-change-left {
  left: 50px;
  cursor: pointer;
}

.team-checkbox {
  margin-bottom: 15px;
  margin-top: 10px;
}

.team-checkbox,
.team-checkbox > div {
  display: flex;
  align-items: center;
}

.team-checkbox > div > input {
  margin-right: 11px;
}

.team-checkbox > div:nth-child(1) {
  margin-right: 60px;
}

@media screen and (max-width: 1100px) {
  #systeminfo-box {
    padding: 20px 40px;
  }

  .page-change-left {
    left: 40px;
  }

  .page-change-right {
    right: 40px;
  }
}

@media screen and (max-width: 767px) {
  #systeminfo-box {
    margin-top: 15px;
    padding: 20px 20px;
  }

  .page-change-left {
    left: 30px;
  }

  .page-change-right {
    right: 30px;
  }

  .page-change-right > h1,
  .page-change-left > h1 {
    display: none;
  }

  .fa {
    font-size: 3.25em;
  }

  input[type="text"],
  input[type="password"] {
    width: 100%;
  }
}
</style>
