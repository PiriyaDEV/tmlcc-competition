<template>
  <div id="register" class="section">
    <div id="register-container" class="page-container">
      <div>
        <h1 class="title">สมัครสมาชิก</h1>

        <div class="register-input">
          <h1 class="header">ข้อมูลผู้ใช้</h1>
          <div class="inline-input">
            <h2>บัญชีผู้ใช้ :</h2>
            <input type="text" autocomplete="off" v-model="user.username" />
          </div>
          <div class="inline-input">
            <h2>รหัสผ่าน :</h2>
            <input
              type="password"
              autocomplete="new-password"
              v-model="user.password"
            />
          </div>
          <div class="inline-input">
            <h2>ยืนยันรหัสผ่าน :</h2>
            <input
              type="password"
              autocomplete="new-password"
              v-model="confirmPassword"
            />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">ประวัติ</h1>
          <div class="inline-input">
            <h2>ชื่อ-สกุล :</h2>
            <input type="text" v-model="user.firstname" />
            <input type="text" v-model="user.lastname" />
          </div>
          <div class="inline-input">
            <h2>สังกัด :</h2>
            <input type="text" v-model="user.organization" />
          </div>
          <div class="inline-input">
            <h2>ระดับการศึกษาสูงสุด :</h2>
            <select
              id="education-status"
              name="education-status"
              v-model="user.education"
            >
              <option value="undergrad">กำลังศึกษา</option>
              <option value="grad">จบการศึกษา</option>
            </select>
            <input
              type="text"
              placeholder="โปรดระบุ"
              v-model="user.institute"
            />
          </div>
          <div class="inline-input">
            <h2>ที่อยู่ :</h2>
            <input type="text" v-model="user.address" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">การติดต่อ</h1>
          <div class="inline-input">
            <h2>อีเมล :</h2>
            <input type="text" v-model="user.email" />
          </div>
          <div class="inline-input">
            <h2>เบอร์โทรศัพท์ :</h2>
            <input type="text" v-model="user.phone" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">ความสนใจ</h1>
          <div id="opportunity-box" class="inline-input">
            <h2 id="opportunity">ความสนใจถ้าหากมีโอกาสเข้าทำงาน :</h2>
            <input
              type="checkbox"
              for="opportunity"
              v-model="user.offer_trainee"
            />
          </div>
          <div class="inline-input">
            <h2>ผลงานที่เคยทำมา :</h2>
            <input type="text" v-model="user.works" />
          </div>
        </div>

        <div class="register-input">
          <h1 class="header">คิดว่าตัวเองมีทักษะ</h1>
          <div class="inline-input">
            <h2>Programing :</h2>
            <div
              class="add-input inline-input"
              v-for="(input, i) in programing"
              :key="i"
            >
              <select id="skill-level" name="skill-level">
                <option value="beginner">เบื้องต้น</option>
                <option value="intermediate">พอใช้</option>
                <option value="influent">ดีเยี่ยม</option>
              </select>
              <input
                type="text"
                v-model="programing[i].name"
                placeholder="ระบุภาษา"
              />
              <span class="add-btn">
                <button
                  @click="removePrograming(i)"
                  v-show="i || (!i && programing.length > 1)"
                >
                  ลบ
                </button>
                <button
                  @click="addPrograming()"
                  v-show="i == programing.length - 1"
                >
                  เพิ่ม
                </button>
              </span>
            </div>
          </div>
          <div class="inline-input">
            <h2>Chemistry :</h2>
            <div
              class="add-input inline-input"
              v-for="(input, i) in chemistry"
              :key="i"
            >
              <select id="skill-level" name="skill-level">
                <option value="beginner">เบื้องต้น</option>
                <option value="intermediate">พอใช้</option>
                <option value="influent">ดีเยี่ยม</option>
              </select>
              <input
                type="text"
                v-model="chemistry[i].name"
                placeholder="ระบุเรื่องที่เชี่ยวชาญ"
              />
              <span class="add-btn">
                <button
                  @click="removeChemistry(i)"
                  v-show="i || (!i && chemistry.length > 1)"
                >
                  ลบ
                </button>
                <button
                  @click="addChemistry()"
                  v-show="i == chemistry.length - 1"
                >
                  เพิ่ม
                </button>
              </span>
            </div>
          </div>
        </div>

        <div class="register-input">
          <div id="agree-box" class="inline-input">
            <h2 id="agreebox">ยินยอมรับเงื่อนไขการแข่งขัน :</h2>
            <input type="checkbox" for="agreebox" v-model="AgreeCheck" />
          </div>
        </div>

        <div class="register-btn section">
          <button @click="register()">สมัครสมาชิก</button>
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
import User from "@/models/user.model";
import AuthService from "@/services/auth.service";

export default {
  data() {
    return {
      user: new User(""),
      confirmPassword: "",
      programing: [
        {
          name: "",
        },
      ],
      chemistry: [
        {
          name: "",
        },
      ],
    };
  },
  methods: {
    register() {
      if (this.AgreeCheck == true) {
        AuthService.register(this.user)
          .then((res) => {
            if (res.data) {
              alert("สมัครสมาชิกเรียบร้อย");
              this.$router.push("/login");
            }
          })
          .catch((err) => {
            alert("err: " + err);
          });
      } else {
        alert("กรุณายินยอมรับเงื่อนไขการแข่งขัน");
      }
    },
    loginClick() {
      this.$router.push("/login");
    },
    addPrograming() {
      this.programing.push({ name: "" });
    },
    removePrograming(index) {
      this.programing.splice(index, 1);
    },
    addChemistry() {
      this.chemistry.push({ name: "" });
    },
    removeChemistry(index) {
      this.chemistry.splice(index, 1);
    },
  },
};
</script>

<style scoped>
#register {
  margin-top: 70px;
  margin-bottom: 40px;
}

/* งานจริงลบตรงนี้ออกจะชิดขอบ */
#register-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-input {
  margin-bottom: 10px;
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

.add-btn > button {
  font-size: 1.5em;
  padding: 5px 10px;
  border: none;
  background-color: #3a65ab;
  color: white;
  border-radius: 10px;
  margin-right: 10px;
}

#skill-level {
  width: 100px;
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

#opportunity-box,
#agree-box {
  display: flex;
  align-items: center;
}

#opportunity-box > input,
#agree-box > input {
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
