<template>
  <div id="navigation-bar">
    <ul id="nav-menu">
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#cp-info"
          >โจทย์การแข่งขัน</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#cp-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -23,
            updateHistory: true,
          }"
          >โจทย์การแข่งขัน</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#recieve-info"
          >สิ่งที่ผู้เข้าแข่งขันจะได้รับ</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#recieve-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -23,
            updateHistory: true,
          }"
          >สิ่งที่ผู้เข้าแข่งขันจะได้รับ</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#event-info"
          >กำหนดการ</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#event-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -30,
            updateHistory: true,
          }"
          >กำหนดการ</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#timeline-info"
          >ไทม์ไลน์การแข่งขัน</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#timeline-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -30,
            updateHistory: true,
          }"
          >ไทม์ไลน์การแข่งขัน</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#users-info"
          >คุณสมบัติผู้เข้าแข่งขัน</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#users-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -30,
            updateHistory: true,
          }"
          >คุณสมบัติผู้เข้าแข่งขัน</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#rules-info"
          >เกณฑ์การตัดสิน</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#rules-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -30,
            updateHistory: true,
          }"
          >เกณฑ์การตัดสิน</a
        >
      </li>
      <li @click="clickSelected()" class="text-normal">
        <router-link v-if="page != `mainpage`" to="/#reward-info"
          >รางวัลทั้งหมด</router-link
        >
        <a
          v-if="page == `mainpage`"
          href="#reward-info"
          v-smooth-scroll="{
            duration: 1000,
            offset: -30,
            updateHistory: true,
          }"
          >รางวัลทั้งหมด</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";

export default {
  methods: {
    clickSelected() {
      this.$emit("click", true);
    },
  },
  mounted() {
    $(document).ready(function () {
      var target = $(location).attr("hash");
      var offset = $(this).attr("data-offset")
        ? $(this).attr("data-offset")
        : 20;
      $("body,html").animate(
        {
          scrollTop: $(target).offset().top - offset,
        },
        700
      );
    });
  },
  computed: {
    ...mapGetters({
      page: "page/getPage",
    }),
  },
};
</script>

<style scoped>
#nav-menu {
  background: #ffffff;
  border-radius: 12px;
  list-style-type: none;
  padding: 0px;
  margin: 10px 20px 10px 80px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 999;
  background-color: #ffffff;
}

#nav-menu > li {
  cursor: pointer;
  padding: 10px 23px;
}

#nav-menu > li:not(:last-child) {
  border-bottom: 1px solid #e5e5e5;
}

#nav-menu > li > a {
  text-decoration: none;
  color: inherit;
}
</style>
