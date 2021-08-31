<template>
  <div id="register-div">
    <!-- <Popup id="popup"/> -->
    <Popup v-if="page == 'popupRegister'" :displayNameShow="displayNameShow" />
    <Navbar />
    <div id="register" class="section">
      <div id="register-container" class="page-container">
        <div>
          <div class="center">
            <img id="tmlcc-logo" src="../assets/TMLCC_Logo.png" alt="" />
          </div>
          <h1 class="header-c">สมัครเข้าร่วมโครงการ</h1>

          <div>
            <AgreementBox v-show="page == `agreement`" />

            <ApplicantBox v-if="page == `applicant`" :user="user" />

            <SystemInfo
              v-if="page == `info` || page == 'popupRegister'"
              :user="user"
              @displayNamefunction="displayNamefunction"
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
import Popup from "../components/Popup/Popup.vue";
import User from "../models/user.model";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      displayNameShow: "",
      navbarPage: "register1",
      user: new User({
        titleName: "นาย",
        education: "มัธยมศึกษา",
        role: "user",
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
    Popup,
  },
  computed: {
    ...mapGetters({
      page: "page/getPage",
    }),
  },
  mounted() {
    this.$store.dispatch("page/setPage", "agreement");
  },
  methods: {
    displayNamefunction(value) {
      this.displayNameShow = value;
    },
  },
};
</script>

<style scoped>
#register {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
  box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
  position: relative;
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

@media screen and (max-width: 1100px) {
  #register {
    padding: 100px 0px 200px 0px;
  }

  #tmlcc-logo {
    width: 300px;
  }
}

@media screen and (max-width: 767px) {
  #tmlcc-logo {
    width: 250px;
  }
}

@media screen and (max-width: 470px) {
  #tmlcc-logo {
    width: 220px;
  }
}
</style>
