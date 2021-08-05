<template>
  <div>
    <Navbar :page="`login`" />
    <div id="login" class="section">
      <div id="login-container" class="page-container">
        <div>
          <div class="center">
            <img id="tmlcc-logo" src="../assets/TMLCC_Logo.png" alt="" />
          </div>
          <h1 class="header-c">เข้าสู่ระบบ</h1>

          <div id="login-box">
            <div>
              <h1 class="text-normal">E-mail</h1>
              <input
                :class="cssInvalidEmail"
                type="text"
                placeholder="E-mail ที่ใช้ในการสมัคร"
                v-model="user.email"
              />
              <p
                v-if="invalidUser"
                class="text-normal orange-text error-message"
              >
                * ไม่พบผู้ใช้งาน
              </p>
            </div>
            <div>
              <h1 class="text-normal">Password</h1>
              <input
                :class="cssInvalidPassword"
                type="password"
                placeholder="กรอก Password"
                v-model="user.password"
              />
              <p
                v-if="invalidPassword"
                class="text-normal orange-text error-message"
              >
                * รหัสผ่านไม่ถูกต้อง
              </p>
            </div>

            <h1 class="text-normal purple-text forgot-pass">ลืมรหัสผ่าน</h1>

            <div class="center">
              <button @click="login()" class="btn-color">เข้าสู่ระบบ</button>
            </div>

            <hr class="bar-color" />

            <div class="login-below-text">
              <h1 class="text-normal gray-text">หรือ หากยังไม่ได้สมัคร</h1>
              <h1 @click="registerClick()" class="text-normal purple-text">
                ลงทะเบียนเข้าร่วมการแข่งขัน
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import AuthService from "../services/auth.service";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      invalidUser: false,
      invalidPassword: false,
    };
  },
  computed: {
    cssInvalidEmail() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.invalidUser) {
        return invalid;
      }
      return valid;
    },
    cssInvalidPassword() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.invalidPassword) {
        return invalid;
      }
      return valid;
    },
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    },
    login() {
      AuthService.login(this.user).then((res) => {
        this.invalidUser = false;
        this.invalidPassword = false;
        
        if (res.status == 200) {
          console.log("Logged in!");
        } else if (res.status == 403 && res.data.message == "User not found!") {
          this.invalidUser = true;
          console.log(res.data.message);
        } else if (
          res.status == 403 &&
          res.data.message == "Invalid password!"
        ) {
          this.invalidPassword = true;
          console.log(res.data.message);
        }
      });
    },
  },
};
</script>

<style scoped>
#login {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
}

#tmlcc-logo {
  margin: 0px 0px 18px 0px;
  width: 407px;
}

#login-box {
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
}

#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.forgot-pass {
  margin-left: 15px;
  margin-top: 0px;
  cursor: pointer;
}

.input-box {
  width: 407px;
}

.btn-color {
  margin-top: 15px;
  margin-bottom: 20px;
}

.bar-color {
  width: 120px;
}

.login-below-text {
  margin-top: 15px;
  text-align: center;
}

.error-message {
  margin-bottom: 10px;
}
</style>
