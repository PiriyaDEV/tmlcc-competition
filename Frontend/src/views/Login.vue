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
                maxlength="64"
                v-model="user.email"
                id="email-input"
              />
              <p
                v-if="loginStatus.email.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ loginStatus.email.message }}
              </p>
            </div>
            <div>
              <h1 class="text-normal">Password</h1>
              <input
                :class="cssInvalidPassword"
                type="password"
                maxlength="32"
                placeholder="กรอก Password"
                v-model="user.password"
                id="password-input"
              />
              <p
                v-if="loginStatus.password.isInvalid"
                class="text-normal orange-text error-message"
              >
                * {{ loginStatus.password.message }}
              </p>
            </div>

            <!-- <h1 class="text-normal purple-text forgot-pass">
              <span>ลืมรหัสผ่าน</span>
            </h1> -->

            <div class="center">
              <button @click="login()" id="login-button" class="btn-color">
                เข้าสู่ระบบ
              </button>
            </div>

            <hr class="bar-color" />

            <div class="login-below-text">
              <h1 class="text-normal gray-text">หรือ หากยังไม่ได้สมัคร</h1>
              <h1 class="text-normal purple-text">
                <span @click="registerClick()"
                  >ลงทะเบียนเข้าร่วมการแข่งขัน</span
                >
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Navbar from "../components/Menu/Navbar.vue";
import { mapGetters } from "vuex";

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
    this.$store.dispatch("auth/resetStatus");

    $(function () {
      $("#email-input").on("keyup", function (e) {
        if (e.which === 13) {
          document.getElementById("password-input").focus();
        }
      });
    });

    // Get the input field
    var input = document.getElementById("password-input");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function (event) {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("login-button").click();
      }
    });
  },
  computed: {
    ...mapGetters({
      loginStatus: "auth/getLoginStatus",
    }),
    cssInvalidEmail() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.loginStatus.email.isInvalid) {
        return invalid;
      }
      return valid;
    },
    cssInvalidPassword() {
      let valid = "input-box text-normal";
      let invalid = "input-box text-normal error-input-box";
      if (this.loginStatus.password.isInvalid) {
        return invalid;
      }
      return valid;
    },
  },
  methods: {
    registerClick() {
      if (this.$route.path != "/register") {
        this.$router.push("/register");
      }
    },
    async login() {
      await this.$store.dispatch("auth/login", this.user);
      if (this.loginStatus.isAuthenticated) {
        if (this.$route.path != "/dashboard") {
          this.$router.push("/dashboard");
        }
      }
    },
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
}

.forgot-pass > span {
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

.login-below-text > h1:nth-child(2) > span {
  cursor: pointer;
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
