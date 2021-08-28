<template>
  <div id="navbar">
    <div id="navbar-menu" class="section">
      <div class="navbar-container">
        <div id="nav-left">
          <img
            id="tmlcc-logo"
            src="../../assets/navbar/TMLCC.png"
            alt=""
            @click="mainpage()"
          />
          <div id="compet-info" class="center">
            <p class="text-normal nav-text" @click="toggleShowMenu()">
              ข้อมูลการแข่งขัน
            </p>
            <img
              id="dropdown-icon"
              src="../../assets/navbar/dropdown.png"
              alt=""
              @click="toggleShowMenu()"
            />
            <NavigationBar
              :class="SlideMenu"
              @click="click"
              id="navigation-bar"
            />
          </div>
        </div>
        <div id="nav-right">
          <a class="text-normal nav-text" href="/about">เกี่ยวกับโครงการ</a>
          <!-- <p v-if="page == `login`" class="text-normal nav-text">Q&A</p> -->
          <!-- <p v-if="page != `login`" class="text-normal nav-text">Workshops</p> -->
          <a
            v-if="page == `mainpage`"
            class="text-normal nav-text"
            href="#contact-box"
            v-smooth-scroll="{
              duration: 1000,
              offset: 0,
              updateHistory: true,
            }"
            >ติดต่อเรา</a
          >

          <router-link
            v-if="page != `mainpage`"
            to="/#contact-box"
            class="text-normal nav-text"
            >ติดต่อเรา</router-link
          >
          <div class="center">
            <button
              v-if="page != `agreement` && endCountdown == false"
              class="btn-white blocked"
            >
              ลงทะเบียน
            </button>
            <button
              v-if="page != `agreement` && endCountdown == true"
              @click="registerClick()"
              class="btn-white"
            >
              ลงทะเบียน
            </button>
            <button
              v-if="page == `agreement` && endCountdown == true"
              @click="loginClick()"
              class="btn-color"
            >
              เข้าสู่ระบบ
            </button>
            <button
              v-if="page == `agreement` && endCountdown == false"
              class="btn-white blocked"
            >
              เข้าสู่ระบบ
            </button>
          </div>
        </div>
        <div id="hamburger">
          <Hamburger />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from "../Menu/Hamburger.vue";
import NavigationBar from "../Menu/NavigationBar.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NavigationBar,
    Hamburger,
  },
  data() {
    return {
      showMenu: false,
      showLogout: false,
    };
  },
  methods: {
    mainpage() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    registerClick() {
      if (this.$route.path != "/register") {
        this.$router.push("/register");
      }
    },
    loginClick() {
      if (this.$route.path != "/login") {
        this.$router.push("/login");
      }
    },
    toggleShowMenu() {
      this.showMenu = !this.showMenu;
    },
    click() {
      this.showMenu = !this.showMenu;
    },
    toggleShowLogout() {
      this.showLogout = !this.showLogout;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      window.location.href = "/";
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
    SlideLogout() {
      let down = "logout-open";
      let up = "logout-closed";
      if (this.showLogout == true) {
        return down;
      }
      return up;
    },
    ...mapGetters({
      page: "page/getPage",
      endCountdown: "page/getCountdownStatus",
      displayName: "auth/getDisplayName",
      loginStatus: "auth/getLoginStatus",
      roleStatus: "auth/getRole",
    }),
  },
};
</script>

<style scoped>
#navbar {
  position: relative;
  z-index: 999;
}
#navbar-menu {
  background-color: #ffffff;
  padding: 17px 0px;
  z-index: 999;
}

a {
  text-decoration: none;
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

#hamburger {
  display: none;
}

.blocked {
  background-color: #c4c4c4 !important;
  background-image: none;
  border: none;
  color: #ffffff;
  cursor: default;
}

.display-name {
  color: #764a97 !important;
  font-weight: 700;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  padding-right: 6px;
  text-transform: capitalize;
}

.logout-closed {
  overflow: hidden;
  max-height: 0;
  padding: 0px;
  margin-top: 0;
  margin-bottom: 0;
  transition: all 0.7s ease;
  will-change: transform;
}

.logout-open {
  max-height: 400px;
  overflow: hidden;
  transition: all 0.7s ease;
  will-change: transform;
}

/* Sign Out */
#signout-dropdown {
  border-radius: 12px;
  list-style-type: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  position: absolute;
  top: 80px;
}

#signout-dropdown > button {
  margin-left: 0px !important;
}
@media screen and (max-width: 1100px) {
  #nav-right {
    display: none;
  }

  .dashboard-link {
    display: none;
  }

  #signout-dropdown {
    display: none;
  }

  #navbar-menu {
    position: fixed;
  }

  #hamburger {
    display: inherit;
  }

  #compet-info {
    display: none;
  }
  #tmlcc-logo {
    width: 100px;
  }
}

@media screen and (max-width: 1100px) {
  #tmlcc-logo {
    width: 90px;
  }

  #navbar-menu {
    box-shadow: 15px 10px 9px -8px rgb(188 188 188 / 50%);
    width: 100%;
  }
}
</style>
