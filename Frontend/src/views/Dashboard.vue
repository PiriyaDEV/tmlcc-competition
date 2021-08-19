<template>
  <div>
    <DashboardNavbar />
    <div id="dashboard" class="section">
      <div id="dashboard-container" class="page-container">
        <div>
          <h1 v-if="roleStatus == `user`" class="header-m">
            ยินดีต้อนรับเข้าสู่ระบบ
          </h1>
          <h1 v-if="roleStatus == `admin`" class="header-m">
            ยินดีต้อนรับผู้ดูแลระบบ
          </h1>
          <h1 v-if="roleStatus == `editor`" class="header-m">
            ยินดีต้อนรับผู้แก้ไขข้อมูล
          </h1>
          <h1 class="header-c">
            คุณ <span class="l-grey-text display-name">{{ displayName }}</span>
          </h1>
          <div id="dashboard-menu">
            <div>
              <Teamflex />
              <LinkFlex />
            </div>
            <div id="material-flex">
              <MaterialFlex />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardNavbar from "../components/Menu/DashboardNavbar.vue";
import Teamflex from "../components/Dashboard/TeamFlex.vue";
import LinkFlex from "../components/Dashboard/LinkFlex.vue";
import MaterialFlex from "../components/Dashboard/MaterialFlex.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    DashboardNavbar,
    Teamflex,
    LinkFlex,
    MaterialFlex,
  },
  computed: {
    ...mapGetters({
      displayName: "auth/getDisplayName",
      loginStatus: "auth/getLoginStatus",
      roleStatus: "auth/getRole",
    }),
  },
  mounted() {
    this.$store.dispatch("page/setPage", "dashBoard");
  },
};
</script>

<style scoped>
#dashboard {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
  box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5);
}

#dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#dashboard-container > div {
  width: 100%;
}

#dashboard-menu {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

#material-flex {
  width: 100%;
  margin-left: 50px;
}

.display-name {
  text-transform: capitalize;
}

@media screen and (max-width: 1100px) {
  #dashboard {
    padding: 100px 0px 200px 0px;
  }
  #dashboard-menu {
    display: block;
  }
  #dashboard-menu > div:first-child {
    display: flex;
    justify-content: space-between;
  }
  #material-flex {
    margin-left: 0px;
  }
}

@media screen and (max-width: 767px) {
  #dashboard-menu > div:first-child {
    display: block;
  }
}

@media screen and (max-width: 470px) {
}

@media screen and (max-width: 380px) {
}
</style>
