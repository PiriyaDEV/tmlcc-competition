<template>
  <div id="agreement-box">
    <div @click="applicantClick()" class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 class="text-normal purple-text">ข้อมูลผู้สมัคร</h1>
    </div>

    <h1 class="header-m">ข้อมูลผู้ใช้งานระบบ</h1>
    <hr class="bar-color" />

    <div id="information" class="center">
      <div>
        <h1 class="header-s">ท่านมีทีมของตนเองแล้วหรือไม่</h1>
        <div class="team-checkbox">
          <div>
            <input v-model="user.hasTeam" value="true" type="radio" />
            <h1 class="text-normal">มี</h1>
          </div>
          <div>
            <input v-model="user.hasTeam" value="false" type="radio" />
            <h1 class="text-normal">ไม่มี</h1>
          </div>
        </div>

        <div id="note">
          <h1 class="text-normal purple-text">หมายเหตุ :</h1>
          <h1 class="text-normal">
            การสร้างกลุ่ม สามารถสร้าง <br />
            และเพิ่มสมาชิกได้ หลังการเข้าสู่ระบบ
          </h1>
        </div>

        <hr class="bar-color" />

        <h1 id="login-info" class="header-s">ข้อมูลสำหรับการเข้าสู่ระบบ</h1>

        <div>
          <h1 class="text-normal">Email : ใช้ e-mail ในการเข้าสู่ระบบ</h1>
          <input
            v-model="user.email"
            class="input-box text-normal"
            type="text"
            placeholder="{E-mail ใช้ข้อมูลเดียวกับช่องติดต่อ}"
            disabled
          />
        </div>

        <div>
          <h1 class="text-normal">Display Name : สำหรับแสดงผลในระบบ</h1>
          <input v-model="user.displayName" class="input-box text-normal" type="text" autocomplete="off" />
        </div>

        <div>
          <h1 class="text-normal">Password</h1>
          <input
            v-model="user.password"
            class="input-box text-normal"
            type="password"
            autocomplete="new-password"
          />
        </div>

        <div>
          <h1 class="text-normal">Re-enter Password</h1>
          <input
            v-model="confirmPassword"
            class="input-box text-normal"
            type="password"
            autocomplete="new-password"
          />
        </div>
      </div>
    </div>

    <hr class="bar-color" />

    <div class="center">
      <button @click="register()" class="btn-white">ยืนยันข้อมูล</button>
    </div>
  </div>
</template>

<script>
import AuthService from "../../services/auth.service";

export default {
  props: ["user"],
  data() {
    return {
      confirmPassword: ""
    }
  },
  watch: {
    'user.hasTeam': function() {
      if(this.user.hasTeam == "true") {
        this.user.hasTeam = true;
      }
      if (this.user.hasTeam == "false") {
        this.user.hasTeam = false;
      }
    }
  },
  methods: {
    applicantClick() {
      this.$emit("pageReturn", "applicant");
    },
    register() {
      AuthService.register(this.user).then((res) => {  
        if (res.status == 200) {
          console.log("Register success!");
        } else {
          console.log("Something wrong!");
        }
      });
    },
  },
};
</script>

<style scoped>
#agreement-box {
  /* width: 100%; */
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
  position: relative;
}

.bar-color {
  width: 120px;
}

#information {
  margin-top: 20px;
}

#note {
  align-items: flex-start;
  margin-bottom: 20px;
  display: flex;
}

#note > h1:nth-child(2) {
  margin-left: 20px;
}

input[type="text"],
input[type="password"] {
  width: 407px;
}

#login-info {
  margin-top: 20px;
}

.header-s {
  text-align: left;
}

.btn-white {
  margin-top: 20px;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.page-change-left {
  position: absolute;
  top: 35px;
}

.page-change-left {
  left: 50px;
  cursor: pointer;
}

.team-checkbox {
  margin-bottom: 15px;
  margin-top: 10px;
}

.team-checkbox,
.team-checkbox > div {
  display: flex;
  align-items: center;
}

.team-checkbox > div > input {
  margin-right: 11px;
}

.team-checkbox > div:nth-child(1) {
  margin-right: 60px;
}
</style>
