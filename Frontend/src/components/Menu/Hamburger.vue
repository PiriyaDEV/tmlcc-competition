<template>
  <div id="hamburger">
    <Slide right width="260" noOverlay>
      <div
        v-if="page != `dashBoard`"
        class="nav-head nav-link"
        @click="toggleDropdown()"
      >
        <p class="text-normal">
          ข้อมูลการแข่งขัน
          <img :class="cssDropdown" src="../../assets/navbar/dropdown.png" />
        </p>
      </div>

      <div v-if="page != `dashBoard`" :class="cssDropdownSlide">
        <div>
          <router-link v-if="page != `mainpage`" to="/#cp-info"
            >โจทย์การแข่งขัน</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#cp-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -73,
              updateHistory: true,
            }"
            >โจทย์การแข่งขัน</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#recieve-info"
            >สิ่งที่ผู้เข้าแข่งขันจะได้รับ</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#recieve-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -73,
              updateHistory: true,
            }"
            >สิ่งที่ผู้เข้าแข่งขันจะได้รับ</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#event-info"
            >กำหนดการ</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#event-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -80,
              updateHistory: true,
            }"
            >กำหนดการ</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#timeline-info"
            >ไทม์ไลน์การแข่งขัน</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#timeline-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -80,
              updateHistory: true,
            }"
            >ไทม์ไลน์การแข่งขัน</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#users-info"
            >คุณสมบัติผู้เข้าแข่งขัน</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#users-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -80,
              updateHistory: true,
            }"
            >คุณสมบัติผู้เข้าแข่งขัน</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#rules-info"
            >เกณฑ์การตัดสิน</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#rules-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -80,
              updateHistory: true,
            }"
            >เกณฑ์การตัดสิน</a
          >
        </div>
        <div>
          <router-link v-if="page != `mainpage`" to="/#reward-info"
            >รางวัลทั้งหมด</router-link
          >
          <a
            v-if="page == `mainpage`"
            class="text-normal"
            @click="hideNavDropdown"
            href="#reward-info"
            v-smooth-scroll="{
              duration: 1000,
              offset: -80,
              updateHistory: true,
            }"
            >รางวัลทั้งหมด</a
          >
        </div>
      </div>

      <div
        v-if="page != `dashBoard` && loginStatus.isAuthenticated"
        class="nav-head nav-link"
      >
        <a class="text-normal" @click="hideNav" href="/dashboard"
          >กลับหน้าแดชบอร์ด</a
        >
      </div>

      <div v-if="page != `dashBoard`" class="nav-head nav-link">
        <a class="text-normal" @click="hideNav" href="/about"
          >เกี่ยวกับโครงการ</a
        >
      </div>

      <div v-if="page == `dashBoard`" class="nav-head nav-link">
        <a class="text-normal" @click="hideNav" href="/dashboard"
          >หน้าหลักการแข่งขัน</a
        >
      </div>

      <div
        v-if="page == `dashBoard` && roleStatus != `user`"
        class="nav-head nav-link"
      >
        <a class="text-normal" @click="hideNav" href="/dashboard/member"
          >สมาชิกของระบบ</a
        >
      </div>

      <div
        v-if="page == `dashBoard` && roleStatus != `user`"
        class="nav-head nav-link"
      >
        <a class="text-normal" @click="hideNav" href="/dashboard/file"
          >File Management</a
        >
      </div>

      <div v-if="page == `dashBoard`" class="nav-head nav-link">
        <a class="text-normal" @click="hideNav" href="/dashboard">ติดต่อเรา</a>
      </div>

      <div
        v-if="page == `dashBoard`"
        class="nav-head nav-link display-name-box"
      >
        <a class="text-normal display-name" @click="hideNav" href="/dashboard"
          ><span v-if="roleStatus == `admin`">Admin </span
          ><span v-if="roleStatus == `editor`">Editor </span
          >{{ displayName }}</a
        >
      </div>
      <div
        v-if="page != `dashBoard` && loginStatus.isAuthenticated"
        class="nav-head nav-link register-btn"
      >
        <a
          v-if="loginStatus.isAuthenticated"
          class="text-normal display-name"
          @click="hideNav"
          href="/dashboard"
          ><span v-if="roleStatus == `admin`">Admin </span
          ><span v-if="roleStatus == `editor`">Editor </span
          >{{ displayName }}</a
        >
      </div>
      <!-- <div class="nav-head nav-link">
        <a class="text-normal" @click="hideNav">Workshop</a>
      </div>
      <div class="nav-head nav-link">
        <a class="text-normal" @click="hideNav">ติดต่อเรา</a>
      </div> -->
      <!-- <div class="nav-head nav-link register-btn">
        <a class="text-normal" href="/register">ลงทะเบียน</a>
      </div> -->
      <div
        v-if="page != `dashBoard` && !loginStatus.isAuthenticated"
        class="nav-head nav-link register-btn blocked"
      >
        <a class="text-normal" @click="hideNav">ลงทะเบียน</a>
      </div>
      <div
        v-if="page != `dashBoard` && loginStatus.isAuthenticated"
        class="nav-head nav-link register-btn"
      >
        <a
          v-if="loginStatus.isAuthenticated"
          class="text-normal"
          @click="logoutMainpage"
          >ออกจากระบบ</a
        >
      </div>
      <div v-if="page == `dashBoard`" class="nav-head nav-link register-btn">
        <a class="text-normal" @click="logout">ออกจากระบบ</a>
      </div>
    </Slide>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dropdown: true,
    };
  },
  components: {
    Slide, // Register your component
  },
  methods: {
    toggleDropdown() {
      this.dropdown = !this.dropdown;
    },
    hideNavDropdown() {
      var x = document.getElementsByClassName("bm-menu");
      for (var i = 0; i < x.length; i++) {
        x[i].style.width = "0px";
        this.dropdown = !this.dropdown;
      }
    },
    hideNav() {
      var x = document.getElementsByClassName("bm-menu");
      for (var i = 0; i < x.length; i++) {
        x[i].style.width = "0px";
        this.dropdown = true;
      }
    },
    dashboard(value) {
      this.$router.push(value);
    },
    logout() {
      this.$store.dispatch("auth/logout");
      window.location.href = "/login";
    },
    logoutMainpage() {
      this.$store.dispatch("auth/logout");
      window.location.href = "/";
    },
  },
  computed: {
    cssDropdown() {
      let down = "dropdown-down";
      let up = "dropdown-up";
      if (this.dropdown) {
        return up;
      }
      return down;
    },
    cssDropdownSlide() {
      let closed = "nav-list nav-link closed dropdown-nav";
      let open = "nav-list nav-link open dropdown-nav";
      if (this.dropdown) {
        return closed;
      }
      return open;
    },
    ...mapGetters({
      page: "page/getPage",
      displayName: "auth/getDisplayName",
      loginStatus: "auth/getLoginStatus",
      roleStatus: "auth/getRole",
    }),
  },
};
</script>

<style scoped>
.nav-link > a,
.nav-link > div > a,
.nav-link > p {
  text-decoration: none;
  color: #303030;
  font-size: 16px;
}

#hamburger {
  position: fixed;
  right: 10px;
}

.nav-head {
  padding-left: 40px;
}

.nav-head:not(:last-child) {
  border-top: 1px solid #e5e5e5;
}
.nav-list {
  padding-left: 60px;
}

.display-name {
  color: #764a97 !important;
  font-weight: 700;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  padding-right: 6px;
  text-transform: capitalize;
}

.display-name-box {
  border-top: 1px solid #764a97 !important;
}

.dropdown-down {
  width: 15px;
  padding-right: 5px;
  transition: 0.3s;
  transform: rotate(180deg);
}

.dropdown-up {
  width: 15px;
  padding-left: 5px;
  transition: 0.3s;
}

.dropdown-nav {
  padding: 0px 0px 0px 60px;
}

.dropdown-nav > div:not(:first-child) {
  padding: 10px 0px 0px 0px;
}

.dropdown-nav > div:last-child {
  padding-bottom: 10px;
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
  display: block;
}

.open {
  max-height: 400px;
  overflow: hidden;
  transition: all 0.5s ease;
  will-change: transform;
  display: block;
}

.register-btn {
  border-top: 1px solid #bf2e7e;
  border-bottom: 1px solid #bf2e7e;
  background-image: linear-gradient(white, white),
    linear-gradient(#2f65af, #764a97, #bf2e7e, #f07821);
}

.register-btn > a {
  color: #bf2e7e;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-size: 18px;
}

.blocked {
  background-color: #c4c4c4 !important;
  background-image: none;
  border: none;
}

.blocked > a {
  color: #ffffff !important;
}

@media screen and (max-width: 414px) {
  .nav-link > a,
  .nav-link > div > a,
  .nav-link > p {
    text-decoration: none;
    color: #303030;
    font-size: 14px;
  }
}
</style>
