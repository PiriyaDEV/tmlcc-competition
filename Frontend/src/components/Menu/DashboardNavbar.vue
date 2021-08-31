<template>
  <div id="navbar">
    <div id="navbar-menu" class="section">
      <div class="navbar-container">
        <div id="nav-left">
          <img
            id="tmlcc-icon"
            src="../../assets/navbar/TMLCC_color.png"
            alt=""
            @click="mainpage()"
          />
          <img
            id="tmlcc-logo"
            src="../../assets/navbar/TMLCC.png"
            alt=""
            @click="mainpage()"
          />
          <div class="center">
            <!-- <p class="text-normal nav-text" @click="mainpage()">
              หน้าหลักการแข่งขัน
            </p> -->
            <p class="text-normal nav-text" @click="dashboard()">
              <span v-if="!pathDasboard">กลับ</span>หน้าแดชบอร์ด
            </p>
          </div>
        </div>
        <div id="nav-center">
          <div
            v-if="roleStatus == `admin` || roleStatus == `editor`"
            class="center"
          >
            <p
              class="text-normal nav-text"
              v-if="roleStatus == `admin`"
              @click="dashboardMember()"
            >
              สมาชิกของระบบ
            </p>
            <p
              class="text-normal nav-text"
              v-if="roleStatus != `user`"
              @click="dashboardFile()"
            >
              File Management
            </p>
          </div>
        </div>
        <div id="nav-right">
          <router-link
            v-if="roleStatus == `user`"
            to="/#contact-box"
            class="text-normal nav-text"
            >ติดต่อเรา</router-link
          >
          <div class="center">
            <p
              class="text-normal display-name nav-text"
              @click="toggleShowMenu()"
            >
              <span v-if="roleStatus == `admin`">Admin </span
              ><span v-if="roleStatus == `editor`">Editor </span
              >{{ displayName }}
            </p>
            <img
              id="dropdown-icon"
              src="../../assets/navbar/dropdown.png"
              alt=""
              @click="toggleShowMenu()"
            />
            <div id="signout-dropdown" :class="SlideMenu" @click="click">
              <button @click="logout()" class="btn-white">ออกจากระบบ</button>
            </div>
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
import { mapGetters } from "vuex";

export default {
  components: {
    Hamburger,
  },
  data() {
    return {
      showMenu: false,
      pathDasboard: false,
    };
  },
  created() {
    if (this.$route.path == "/dashboard") {
      this.pathDasboard = true;
    }
  },
  methods: {
    mainpage() {
      if (this.$route.path != "/") {
        this.$router.push("/");
      }
    },
    dashboard() {
      if (this.$route.path != "/dashboard") {
        this.$router.push("/dashboard");
      }
    },
    dashboardMember() {
      if (this.$route.path != "/dashboard/member") {
        this.$router.push("/dashboard/member");
      }
    },
    dashboardFile() {
      if (this.$route.path != "/dashboard/file") {
        this.$router.push("/dashboard/file");
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
    logout() {
      this.$store.dispatch("auth/logout");
      window.location.href = "/login";
    },
  },
  computed: {
    ...mapGetters({
      displayName: "auth/getDisplayName",
      loginStatus: "auth/getLoginStatus",
      roleStatus: "auth/getRole",
    }),
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

a {
  text-decoration: none;
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

.display-name {
  color: #764a97 !important;
  font-weight: 700;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  padding-right: 6px;
  text-transform: capitalize;
}

#hamburger {
  display: none;
}

.closed {
  overflow: hidden;
  max-height: 0;
  padding: 0px;
  margin-top: 0;
  margin-bottom: 0;
  transition: all 0.7s ease;
  will-change: transform;
}

.open {
  max-height: 400px;
  overflow: hidden;
  transition: all 0.7s ease;
  will-change: transform;
}

.btn-white {
  font-size: 2em;
}

/* Sign Out */
#signout-dropdown {
  border-radius: 12px;
  list-style-type: none;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  position: absolute;
  top: 90px;
}

@media screen and (max-width: 1100px) {
  #nav-right,
  #nav-center,
  #nav-left > div {
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

  #tmlcc-logo {
    width: 100px;
  }
  #tmlcc-icon {
    width: 50px;
  }
}

@media screen and (max-width: 1100px) {
  #tmlcc-logo {
    width: 90px;
  }
  #tmlcc-icon {
    width: 40px;
  }

  #navbar-menu {
    box-shadow: 15px 10px 9px -8px rgb(188 188 188 / 50%);
    width: 100%;
  }
}
</style>
