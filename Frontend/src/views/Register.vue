<template>
  <div>
    <Navbar :page="navbarPage" />
    <div id="register" class="section">
      <div id="register-container" class="page-container">
        <div>
          <div class="center">
            <img id="tmlcc-logo" src="../assets/TMLCC_Logo.png" alt="" />
          </div>
          <h1 class="header-c">สมัครเข้าร่วมการแข่งขัน</h1>

          <div>
            <AgreementBox
              v-show="box == `agreement`"
              @pageReturn="pageReturn"
            />

            <ApplicantBox
              v-show="box == `applicant`"
              :user="user"
              @pageReturn="pageReturn"
            />

            <SystemInfo
              v-show="box == `info`"
              :user="user"
              @pageReturn="pageReturn"
            />

            <!-- <ApplicantBox /> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";
import AgreementBox from "../components/Register/AgreementBox.vue";
import ApplicantBox from "../components/Register/ApplicantBox.vue";
import SystemInfo from "../components/Register/SystemInfo.vue";
import User from "../models/user.model";

export default {
  mounted() {
    this.$store.dispatch("inputPage","register")
  },
  data() {
    return {
      box: "agreement",
      navbarPage: "register1",
      user: new User({
        titleName: "นาย",
        education: "มัธยมศึกษา",
        hasProgSkill: false,
        hasChemSkill: false,
        hasMachineLSkill: false,
        hasOtherSkill: false,
      }),
    };
  },
  components: {
    Navbar,
    AgreementBox,
    ApplicantBox,
    SystemInfo,
  },
  methods: {
    pageReturn(value) {
      this.box = value;
      if (value != "agreement") {
        this.navbarPage = "register2";
      } else this.navbarPage = "register1";
    },
  },
};
</script>

<style scoped>
#register {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
}

#tmlcc-logo {
  margin: 0px 0px 18px 0px;
  width: 407px;
}

#register-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#register-container > div {
  width: 100%;
}

.btn-color {
  margin-top: 15px;
  margin-bottom: 20px;
}
</style>
