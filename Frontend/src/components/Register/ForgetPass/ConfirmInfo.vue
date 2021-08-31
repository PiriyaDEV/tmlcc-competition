<template>
  <div id="forgetpass-box">
    <div>
      <h1 class="text-normal">E-mail</h1>
      <input
        :class="cssInvalidEmail"
        type="text"
        placeholder="E-mail ที่ใช้ในการสมัคร"
        maxlength="64"
        autocomplete="off"
        v-model="user.email"
        id="email-input"
      />
      <p
        v-if="invalidStatus.email.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.email.message }}
      </p>
    </div>

    <div>
      <h1 class="text-normal">ชื่อจริง</h1>
      <input
        :class="cssInvalidFirstName"
        type="text"
        placeholder="ชื่อจริง ที่ใช้ในการสมัคร"
        maxlength="64"
        autocomplete="off"
        v-model="user.firstName"
        id="firstName-input"
      />
      <p
        v-if="invalidStatus.firstName.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.firstName.message }}
      </p>
    </div>

    <div>
      <h1 class="text-normal">นามสกุล</h1>
      <input
        :class="cssInvalidLastName"
        type="text"
        placeholder="นามสกุล ที่ใช้ในการสมัคร"
        maxlength="64"
        autocomplete="off"
        v-model="user.lastName"
        id="lastName-input"
      />
      <p
        v-if="invalidStatus.lastName.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.lastName.message }}
      </p>
    </div>

    <div>
      <h1 class="text-normal">เบอร์โทรศัพท์</h1>
      <input
        :class="cssInvalidPhone"
        type="text"
        placeholder="เบอร์โทรศัพท์ ที่ใช้ในการสมัคร"
        maxlength="64"
        autocomplete="off"
        v-model="user.phone"
        id="phone-input"
      />
      <p
        v-if="invalidStatus.phone.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.phone.message }}
      </p>
      <p
        v-if="isFoundUser == false"
        class="text-normal orange-text error-message"
      >
        * ไม่พบข้อมูลในระบบ หรือ ข้อมูลไม่ถูกต้อง
      </p>
    </div>

    <div class="center">
      <button @click="validate()" id="forgetpass-button" class="btn-white">
        ดำเนินการต่อ
      </button>
    </div>

    <hr class="bar-color" />

    <div class="forgetpass-below-text">
      <h1 class="text-normal gray-text">หรือ หากมีปัญหากรุณาติดต่อ</h1>
      <h1 class="text-normal purple-text">
        <span @click="mailTo()">tmlcc.th@gmail.com</span>
      </h1>
    </div>
  </div>
</template>

<script>
import AuthService from "../../../services/auth.service.js";
export default {
  data() {
    return {
      user: {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
      },
      invalidStatus: {
        email: {
          isInvalid: false,
          message: "",
        },
        firstName: {
          isInvalid: false,
          message: "",
        },
        lastName: {
          isInvalid: false,
          message: "",
        },
        phone: {
          isInvalid: false,
          message: "",
        },
      },
      isFoundUser: true,
    };
  },
  methods: {
    mailTo() {
      window.location.href = "mailto:tmlcc.th@gmail.com";
    },
    async validate() {
      this.invalidStatus.email.isInvalid = false;
      this.invalidStatus.firstName.isInvalid = false;
      this.invalidStatus.lastName.isInvalid = false;
      this.invalidStatus.phone.isInvalid = false;
      if (!this.user.email) {
        this.invalidStatus.email.isInvalid = true;
        this.invalidStatus.email.message = "โปรดระบุ E-mail";
      }
      if (!this.user.firstName) {
        this.invalidStatus.firstName.isInvalid = true;
        this.invalidStatus.firstName.message = "โปรดระบุ ชื่อจริง";
      }
      if (!this.user.lastName) {
        this.invalidStatus.lastName.isInvalid = true;
        this.invalidStatus.lastName.message = "โปรดระบุ นามสกุล";
      }
      if (!this.user.phone) {
        this.invalidStatus.phone.isInvalid = true;
        this.invalidStatus.phone.message = "โปรดระบุ เบอร์โทรศัพท์";
      }
      if (
        !this.invalidStatus.email.isInvalid &&
        !this.invalidStatus.firstName.isInvalid &&
        !this.invalidStatus.lastName.isInvalid &&
        !this.invalidStatus.phone.isInvalid
      ) {
        await AuthService.checkResetPassword(this.user).then((res) => {
          if (res.status == 200) {
            if (res.data.isFound) {
              console.log("User found!");
              this.$store.dispatch("auth/setResetPasswordInfo", res.data);
            } else {
              this.isFoundUser = false;
            }
          } else {
            console.log("Something wrong!");
          }
        });
      }
    },
  },
  computed: {
    cssInvalidFirstName() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (!this.invalidStatus.firstName.isInvalid) {
        return valid;
      } else {
        return invalid;
      }
    },
    cssInvalidLastName() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (!this.invalidStatus.lastName.isInvalid) {
        return valid;
      } else {
        return invalid;
      }
    },
    cssInvalidEmail() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (!this.invalidStatus.email.isInvalid) {
        return valid;
      } else {
        return invalid;
      }
    },
    cssInvalidPhone() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (!this.invalidStatus.phone.isInvalid) {
        return valid;
      } else {
        return invalid;
      }
    },
  },
};
</script>

<style scoped>
#forgetpass-box {
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
}

#forgetpass-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-box {
  width: 407px;
}

.btn-white {
  margin-top: 15px;
  margin-bottom: 20px;
}

.bar-color {
  width: 120px;
}

.forgetpass-below-text {
  margin-top: 15px;
  text-align: center;
}

.forgetpass-below-text > h1:nth-child(2) > span {
  cursor: pointer;
}

@media screen and (max-width: 1100px) {
  #forgetpass-box {
    margin-top: 25px;
  }
}

@media screen and (max-width: 767px) {
  .input-box {
    width: 300px;
  }
}

@media screen and (max-width: 470px) {
  .input-box {
    width: 220px;
  }
}

@media screen and (max-width: 380px) {
  .input-box {
    width: 190px;
  }
}
</style>
