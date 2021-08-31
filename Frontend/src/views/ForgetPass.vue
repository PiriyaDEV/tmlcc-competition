<template>
  <div>
    <Navbar />
    <Popup v-if="page == 'popupResetpassword'" />
    <div id="forgetpass" class="section">
      <div id="forgetpass-container" class="page-container">
        <div>
          <div class="center">
            <img id="tmlcc-logo" src="../assets/TMLCC_Logo.png" alt="" />
          </div>
          <h1 class="header-c">รีเซ็ตรหัสผ่าน</h1>
          <ConfirmInfo v-if="!resetPasswordInfo.isFound" />
          <ResetPassword v-else />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "../components/Popup/Popup.vue";
import ConfirmInfo from "../components/Register/ForgetPass/ConfirmInfo.vue";
import ResetPassword from "../components/Register/ForgetPass/ResetPassword.vue";
import Navbar from "../components/Menu/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    ConfirmInfo,
    ResetPassword,
    Popup,
  },
  created() {
    this.$store.dispatch("page/setPage", "forgotPassword");
    this.$store.dispatch("auth/resetResetPasswordInfo");
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      resetPasswordInfo: "auth/getResetPasswordInfo",
      page: "page/getPage",
    }),
  },
};
</script>

<style scoped>
#forgetpass {
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

#forgetpass-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1100px) {
  #forgetpass {
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
