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
            <p class="text-normal nav-text" @click="dashboard()">
              หน้าหลักการแข่งขัน
            </p>
          </div>
        </div>
        <div id="nav-center">
          <div class="center">
            <p class="text-normal nav-text" @click="dashboardMember()">
              สมาชิกของระบบ
            </p>
            <p class="text-normal nav-text" @click="dashboardFile()">
              File Management
            </p>
          </div>
        </div>
        <div id="nav-right">
          <p class="text-normal nav-text">ติดต่อเรา</p>
          <div class="center">
            <!-- <p
              class="text-normal display-name nav-text"
              @click="toggleShowMenu()"
            >
              {{ displayName }}
            </p> -->
            <p
              class="text-normal display-name nav-text"
              @click="toggleShowMenu()"
            >
              harryfer
            </p>
            <img
              id="dropdown-icon"
              src="../../assets/navbar/dropdown.png"
              alt=""
              @click="toggleShowMenu()"
            />
            <div id="signout-dropdown" :class="SlideMenu" @click="click">
              <button class="btn-white">ออกจากระบบ</button>
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
export default {
  components: {
    Hamburger,
  },
  props: ["page"],
  data() {
    return {
      showMenu: false,
      displayName: "",
    };
  },
  created() {
    let user = JSON.parse(localStorage.getItem("currentUser"));
    this.displayName = user.displayName;
  },
  methods: {
    mainpage() {
      this.$router.push("/");
    },
    dashboardMember() {
      this.$router.push("/dashboard/member");
    },
    dashboard() {
      this.$router.push("/dashboard");
    },
    dashboardFile() {
      this.$router.push("/dashboard/file");
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

.display-name {
  color: #764a97 !important;
  font-weight: 700;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  padding-right: 6px;
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
