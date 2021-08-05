<template>
  <div id="navbar">
    <div id="navbar-menu" class="section">
      <div class="navbar-container">
        <div id="nav-left">
          <img
            id="tmlcc-icon"
            src="../../assets/Navbar/TMLCC_color.png"
            alt=""
            @click="mainpage()"
          />
          <img
            id="tmlcc-logo"
            src="../../assets/Navbar/TMLCC.png"
            alt=""
            @click="mainpage()"
          />
          <div class="center">
            <p class="text-normal nav-text" @click="toggleShowMenu()">
              หน้าหลักการแข่งขัน
            </p>
          </div>
        </div>
        <div id="nav-center">
          <div class="center">
            <p class="text-normal nav-text">สมาชิกของระบบ</p>
            <p class="text-normal nav-text">File Manament</p>
          </div>
        </div>
        <div id="nav-right">
          <p class="text-normal nav-text">ติดต่อเรา</p>
          <div class="center">
            <p
              class="text-normal display-name nav-text"
              @click="toggleShowMenu()"
            >
              DisplayName
            </p>
            <img
              id="dropdown-icon"
              src="../../assets/Navbar/dropdown.png"
              alt=""
              @click="toggleShowMenu()"
            />
            <NavigationBar
              :class="SlideMenu"
              @click="click"
              id="navigation-bar"
              :page="page"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["page"],
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    mainpage() {
      this.$router.push("/");
    },
    registerClick() {
      this.$router.push("/register");
    },
    loginClick() {
      this.$router.push("/login");
    },
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    click() {
      this.showMenu = !this.showMenu;
    },
  },
  computed: {
    SlideMenu() {
      let down = "open";
      let up = "closed";
      if (this.showMenu == true) {
        return down;
      }
      return up;
    },
  },
};
</script>

<style scoped>
#navbar {
  position: relative;
}
#navbar-menu {
  background-color: #ffffff;
  padding: 17px 0px;
  z-index: 999;
}

#navbar-menu > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#nav-left,
#nav-right,
#nav-center {
  display: flex;
  align-items: center;
}

.nav-text {
  padding: 0px 16px;
  cursor: pointer;
}

#tmlcc-logo {
  width: 120px;
  margin-right: 10px;
  cursor: pointer;
}

#tmlcc-icon {
  width: 74px;
  padding-right: 5px;
  cursor: pointer;
}

#dropdown-icon {
  width: 14px;
  cursor: pointer;
}

/* #navigation-bar {
  position: absolute;
  top: 75px;
}

.closed {
  overflow: hidden;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
  transition: all 0.5s ease;
  will-change: transform;
}

.open {
  max-height: 400px;
  overflow: hidden;
  transition: all 0.5s ease;
  will-change: transform;
} */

.display-name {
  color: #764a97 !important;
  font-weight: 700;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  padding-right: 6px;
}
</style>
