<template>
  <div>
    <DashboardNavbar :page="`login`" />
    <div id="dashboard" class="section">
      <div id="dashboard-container" class="page-container">
        <div>
          <h1 class="header-m">ยินดีต้อนรับเข้าสู่ระบบ</h1>
          <h1 class="header-c">
            คุณ <span class="l-grey-text">{DisplayName}</span>
          </h1>
          <div id="dashboard-menu">
            <div>
              <Teamflex />
              <LinkFlex />
            </div>
            <div>
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
export default {
  components: {
    DashboardNavbar,
    Teamflex,
    LinkFlex,
    MaterialFlex,
  },
};
</script>

<style scoped>
#dashboard {
  /* min-height: 100vh; */
  padding: 50px 0px 200px 0px;
  background-color: #f3f3f3;
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
</style>
