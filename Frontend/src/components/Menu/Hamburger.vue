<template>
  <div id="hamburger">
    <Slide right>
      <div class="nav-head nav-link">
        <a id="home" href="#" class="text-normal">ข้อมูลการแข่งขัน</a>
      </div>

      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">โจทย์การแข่งขัน</a>
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal"
          >สิ่งที่ผู้เข้าแข่งขันจะได้รับ</a
        >
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">กำหนดการ</a>
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">ไทม์ไลน์การแข่งขัน</a>
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">คุณสมบัติผู้เข้าแข่งขัน</a>
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">เกณฑ์การตัดสิน</a>
      </div>
      <div class="nav-list nav-link">
        <a id="home" href="#" class="text-normal">รางวัลทั้งหมด</a>
      </div>

      <div class="nav-head nav-link">
        <a id="home" href="#" class="text-normal">เกณฑ์การตัดสิน</a>
      </div>
      <div class="nav-head nav-link">
        <a id="home" href="#" class="text-normal">Q&A</a>
      </div>
      <div class="nav-head nav-link">
        <a id="home" href="#" class="text-normal">ติดต่อเรา</a>
      </div>
    </Slide>
  </div>
</template>

<script>
import { Slide } from "vue-burger-menu";
export default {
  components: {
    Slide, // Register your component
  },
};
</script>

<style scoped>

.nav-link > a {
  text-decoration: none;
  color: #303030;
  font-size: 18px;
}

.nav-head {
  padding-left: 40px;
  border: 1px solid #E5E5E5;
}

.nav-list {
  padding-left: 60px;
}
</style>
