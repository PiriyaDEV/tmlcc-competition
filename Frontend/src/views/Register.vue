<template>
  <div id="register" class="section">
    <div id="register-container" class="page-container">
      <div>
        <h1 class="title">สมัครสมาชิก</h1>
        <div class="register-input">
          <h1 class="header">ประวัติ</h1>
          <div class="inline-input">
            <h2>ชื่อ-สกุล :</h2>
            <input type="text" />
            <input type="text" />
          </div>
          <div class="inline-input">
            <h2>สังกัด :</h2>
            <input type="text" />
          </div>
          <div class="inline-input">
            <h2>ระดับการศึกษาสูงสุด :</h2>
            <select id="study-status" name="study-status">
              <option value="undergrad">กำลังศึกษา</option>
              <option value="grad">จบการศึกษา</option>
            </select>
            <input type="text" placeholder="โปรดระบุ" />
          </div>
          <div class="inline-input">
            <h2>ที่อยู่ :</h2>
            <input type="text" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">การติดต่อ</h1>
          <div class="inline-input">
            <h2>อีเมล :</h2>
            <input type="text" />
          </div>
          <div class="inline-input">
            <h2>เบอร์โทรศัพท์ :</h2>
            <input type="text" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">ความสนใจ</h1>
          <div id="opportunity-box" class="inline-input">
            <h2 id="opportunity">ความสนใจถ้าหากมีโอกาสเข้าทำงาน :</h2>
            <input type="checkbox" for="opportunity"/>
          </div>
          <div class="inline-input">
            <h2>ผลงานที่เคยทำมา :</h2>
            <input type="text" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">คิดว่าตัวเองมีทักษะ</h1>
          <div class="inline-input">
            <h2>Programing :</h2>
            <input type="text" />
          </div>
          <div class="inline-input">
            <h2>Chemistry :</h2>
            <input type="text" />
          </div>
        </div>

        <div class="register-input">
          <div id="opportunity-box" class="inline-input">
            <h2 id="opportunity">ยินยอมรับเงื่อนไขการแข่งขัน :</h2>
            <input type="checkbox" for="opportunity"/>
          </div>
        </div>


        <div class="register-btn section">
          <button>สมัครสมาชิก</button>
        </div>
        <h3 class="ps-register">
          สมัครสมาชิกแล้ว?
          <span class="orange-click" @click="loginClick()">เข้าสู่ระบบ</span>
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    loginClick() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
#register {
  margin-top: 70px;
  margin-bottom: 40px;
}

#register-container {
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

.header {
  margin-top: 30px;
  margin-bottom: 0px;
  text-align: left;
  font-size: 2em;
  font-weight: 600;
  color: #3a65ab;
}

.inline-input > input,
select {
  height: 20px;
  margin-right: 15px;
  font-size: 1.75em;
  font-weight: 500;
  width: 300px;
}

.inline-input > h2 {
  font-size: 1.75em;
  font-weight: 500;
}

#opportunity-box{
    display: flex;
    align-items: center;
}

#opportunity-box > input{
    width: 50px !important;
}

.register-input > .inline-input {
  margin-top: 20px;
}

.register-btn > button {
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
