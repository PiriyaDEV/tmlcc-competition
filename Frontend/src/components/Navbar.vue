<template>
  <div id="navbar">
    <div id="navbar-menu" class="section">
      <div class="navbar-container">
        <div id="nav-left">
          <img
            id="tmlcc-logo"
            src="../assets/Navbar/TMLCC.png"
            alt=""
            @click="mainpage()"
            style="cursir: pointer"
          />
          <div class="center">
            <p class="text-normal nav-text" @click="toggleShowMenu()" >ข้อมูลการแข่งขัน</p>
            <img
              id="dropdown-icon"
              src="../assets/Navbar/dropdown.png"
              alt=""
              @click="toggleShowMenu()"
            />
            <NavigationBar :class="SlideMenu" @click="click" id="navigation-bar" :page="page"/>
          </div>
        </div>
        <div id="nav-right">
          <p class="text-normal nav-text">เกี่ยวกับโครงการ</p>
          <p v-if="page == `login`" class="text-normal nav-text">Q&A</p>
          <p v-if="page == `register`" class="text-normal nav-text">
            Workshops
          </p>
          <p class="text-normal nav-text">ติดต่อเรา</p>
          <div class="center">
            <button
              v-if="page == `login`"
              @click="registerClick()"
              class="btn-white"
            >
              ลงทะเบียน
            </button>
            <button
              v-if="page == `register`"
              @click="loginClick()"
              class="btn-color"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationBar from "../components/NavigationBar.vue";

export default {
  components: {
    NavigationBar,
  },
  props: ["page"],
  data() {
    return {
      showMenu: false,
    }
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
        this.showMenu = !this.showMenu
    },
  },
  computed: {
    SlideMenu(){
      let down = "open"
      let up = "closed"
      if(this.showMenu == true) {
        return down
      }
      return up
    }
  }
};
</script>

<style scoped>
#navbar{
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
#nav-right {
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

.btn-white,
.btn-color {
  margin-left: 10px;
}

#dropdown-icon {
  width: 14px;
  cursor: pointer;
}

#navigation-bar {
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
}
</style>
