<template>
  <div>
    <Navbar />
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
                v-if="loginStatus.email.isInvalid"
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
                v-if="loginStatus.password.isInvalid"
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
import Navbar from "../components/Menu/Navbar.vue";
import { mapGetters, mapActions } from "vuex";

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
    };
  },
  mounted() {
    this.$store.dispatch("page/setPage", "login");
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
    ...mapGetters({
      loginStatus: "auth/getLoginStatus",
    }),
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    },
    ...mapAction({
      login: this.$store.dispatch("auth/login", user),
    }),
  },
};
</script>

<style scoped>
#login {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
  box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
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

@media screen and (max-width: 1100px) {
  #login {
    padding: 100px 0px 200px 0px;
  }

  #tmlcc-logo {
    width: 300px;
  }

  #login-box {
    margin-top: 25px;
  }
}

@media screen and (max-width: 767px) {
  .input-box {
    width: 300px;
  }

  #tmlcc-logo {
    width: 250px;
  }
}

@media screen and (max-width: 470px) {
  .input-box {
    width: 220px;
  }

  #tmlcc-logo {
    width: 220px;
  }
}

@media screen and (max-width: 380px) {
  .input-box {
    width: 190px;
  }
}
</style>
