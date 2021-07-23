<template>
  <div id="login" class="section">
    <div id="login-container" class="page-container">
      <div>
        <h1 class="title">เข้าสู่ระบบ</h1>
        <div id="login-input">
          <div class="inline-input section">
            <h2>บัญชีผู้ใช้ :</h2>
            <input type="text" />
          </div>
          <div class="inline-input section">
            <h2>รหัสผ่าน :</h2>
            <input type="text" />
          </div>
        </div>
        <div class="login-btn section">
          <button>เข้าสู่ระบบ</button>
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
export default {
  methods: {
    registerClick() {
      this.$router.push("/register");
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
