<template>
  <div id="reset-password-box">
    <div>
      <h1 class="text-normal">Password</h1>
      <input
        :class="cssInvalidPassword"
        type="password"
        maxlength="32"
        v-model="password"
        id="password-input"
        autocomplete="new-password"
      />
      <p
        v-if="invalidStatus.password.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.password.message }}
      </p>
    </div>

    <div>
      <h1 class="text-normal">Re-enter Password</h1>
      <input
        :class="cssInvalidConfirmPassword"
        type="password"
        maxlength="32"
        v-model="confirmPassword"
        id="reenter-password-input"
        autocomplete="new-password"
      />
      <p
        v-if="invalidStatus.confirmPassword.isInvalid"
        class="text-normal orange-text error-message"
      >
        * {{ invalidStatus.confirmPassword.message }}
      </p>
    </div>

    <div class="center">
      <button @click="validate()" id="reset-password-button" class="btn-color">
        บันทึกรหัสผ่านใหม่
      </button>
    </div>
  </div>
</template>

<script>
import AuthService from "../../../services/auth.service.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      confirmPassword: "",
      password: "",
      invalidStatus: {
        password: {
          isInvalid: false,
          message: "",
        },
        confirmPassword: {
          isInvalid: false,
          message: "",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      resetPasswordInfo: "auth/getResetPasswordInfo",
    }),
    cssInvalidPassword() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.invalidStatus.password.isInvalid) {
        return invalid;
      }
      return valid;
    },
    cssInvalidConfirmPassword() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.invalidStatus.confirmPassword.isInvalid) {
        return invalid;
      }
      return valid;
    },
  },
  methods: {
    async validate() {
      this.invalidStatus.password.isInvalid = false;
      this.invalidStatus.confirmPassword.isInvalid = false;
      if (!this.password) {
        this.invalidStatus.password.isInvalid = true;
        this.invalidStatus.password.message = "โปรดระบุรหัสผ่าน";
      } else if (this.password.length < 8) {
        this.invalidStatus.password.isInvalid = true;
        this.invalidStatus.password.message = "โปรดระบุรหัสผ่านอย่างน้อย 8 ตัว";
      }
      if (!this.confirmPassword) {
        this.invalidStatus.confirmPassword.isInvalid = true;
        this.invalidStatus.confirmPassword.message = "โปรดยืนยันรหัสผ่าน";
      } else if (this.password != this.confirmPassword) {
        this.invalidStatus.confirmPassword.isInvalid = true;
        this.invalidStatus.confirmPassword.message =
          "โปรดยืนยันรหัสผ่านให้ตรงกับรหัสผ่าน";
      }
      if (
        !this.invalidStatus.password.isInvalid &&
        !this.invalidStatus.confirmPassword.isInvalid
      ) {
        await AuthService.resetPassword({
          user_id: this.resetPasswordInfo.user_id,
          email: this.resetPasswordInfo.email,
          firstName: this.resetPasswordInfo.firstName,
          lastName: this.resetPasswordInfo.lastName,
          phone: this.resetPasswordInfo.phone,
          password: this.password,
        }).then((res) => {
          if (res.status == 200) {
            if (res.data.isSuccess) {
              console.log(res.data.message);
              this.$store.dispatch("page/setPage", "popupResetpassword");
            } else {
              console.log("Something wrong!");
            }
          } else {
            console.log("Something wrong!");
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#reset-password-box {
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
}

#reset-password-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-box {
  width: 407px;
}

.btn-color {
  margin-top: 15px;
  margin-bottom: 20px;
  width: 190px;
}

.bar-color {
  width: 120px;
}

.reset-password-below-text {
  margin-top: 15px;
  text-align: center;
}

.reset-password-below-text > h1:nth-child(2) > span {
  cursor: pointer;
}

@media screen and (max-width: 1100px) {
  #reset-password-box {
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
