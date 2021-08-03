<template>
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
              class="input-box text-normal"
              type="text"
              placeholder="E-mail ที่ใช้ในการสมัคร"
            />
          </div>
          <div>
            <h1 class="text-normal">Password</h1>
            <input
              class="input-box text-normal"
              type="password"
              placeholder="กรอก Password"
            />
          </div>

          <h1 class="text-normal purple-text forgot-pass">ลืมรหัสผ่าน</h1>

          <div class="center">
            <button class="btn-color">เข้าสู่ระบบ</button>
          </div>

          <hr class="bar-color" />

          <div class="login-below-text">
            <h1 class="text-normal gray-text">หรือ หากยังไม่ได้สมัคร</h1>
            <h1 class="text-normal purple-text">ลงทะเบียนเข้าร่วมการแข่งขัน</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#login {
  /* min-height: 100vh; */
  padding: 47px 0px 249px 0px;
  background-color: #e5e5e5;
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

.login-below-text{
  margin-top: 15px;
  text-align: center;
}
</style>
