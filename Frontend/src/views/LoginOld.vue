<template>
  <div id="login" class="section">
    <div id="login-container" class="page-container">
      <div>
        <h1 class="title">เข้าสู่ระบบ</h1>
        <div id="login-input">
          <div class="inline-input section">
            <h2>บัญชีผู้ใช้ :</h2>
            <input type="text" v-model="user.username" />
          </div>
          <div class="inline-input section">
            <h2>รหัสผ่าน :</h2>
            <input
              type="password"
              autocomplete="new-password"
              v-model="user.password"
            />
          </div>
        </div>
        <div class="login-btn section">
          <button @click="login()">เข้าสู่ระบบ</button>
        </div>
        <h3 class="ps-register">
          สมัครสมาชิก?
          <span class="orange-click" @click="registerClick()">กดที่นี่</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      user: { username: "", password: "" },
    };
  },
  methods: {
    registerClick() {
      this.$router.push("/register");
    },
    login() {
      AuthService.login(this.user)
        .then((res) => {
          if (res.data.username) {
            alert("เข้าสู่ระบบเรียบร้อย");
          } else if (res.data.message == "User not found!") {
            alert("ไม่พบผู้ใช้งาน");
          } else if (res.data.message == "Invalid Password!") {
            alert("รหัสผ่านไม่ถูกต้อง");
          }
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>

<style scoped>
#login {
  height: 100vh;
}

#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  margin-top: 0px;
  text-align: center;
  font-size: 3em;
  font-weight: 700;
}

.inline-input > input {
  height: 20px;
  margin-left: 15px;
  font-size: 1.75em;
  font-weight: 500;
  width: 300px;
}

.inline-input > h2 {
  font-size: 1.75em;
  font-weight: 500;
}

#login-input > .inline-input {
  margin-top: 20px;
}

.login-btn > button {
  margin-top: 20px;
  width: 100%;
  font-size: 1.75em;
  font-weight: 300;
  background-color: #3a65ab;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 5px 15px;
  cursor: pointer;
}

.ps-register {
  margin-top: 25px;
  text-align: center;
  font-size: 1.5em;
  font-weight: 300;
}

.orange-click {
  color: #3a65ab;
  text-decoration: underline;
  cursor: pointer;
}
</style>
