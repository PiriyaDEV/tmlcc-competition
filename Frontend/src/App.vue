<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url("https://use.typekit.net/zqk6rjr.css");
/* @import url("https://use.typekit.net/dyy3qjm.css"); */
/* @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap'); */

@font-face {
  font-family: "IBM-PLEX-THAI";
  src: url("../src/assets/fonts/IBMPlexSansThai-Regular.woff2") format("woff2");
}

@font-face {
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  src: url("../src/assets/fonts/IBMPlexSansThai-SemiBold.woff2") format("woff2");
}

body,
html,
input,
textarea,
button {
  padding: 0;
  margin: 0;
  font-size: 8px;
  font-family: "IBM-PLEX-THAI";
  overflow-x: hidden;
}

.section,
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
.page-container {
  width: 1440px;
  max-width: 1440px;
  padding: 0;
}
.navbar-container {
  width: 1440px;
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
  padding: 0;
}

/* ขนาดฟ้อนต์ */
.header-c {
  font-size: 4em;
  margin: 0;
  text-align: center;
  font-weight: 700;
  color: #303030;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

.text-normal {
  font-size: 2.25em;
  margin: 0;
  font-weight: 500;
  color: #303030;
}

.input-box {
  margin-top: 10px;
  font-weight: 500;
  margin-bottom: 15px;
  border: 1px solid rgba(79, 79, 79, 0.16);
  box-sizing: border-box;
  color: #7F7F7F !important;
  padding: 5px 15px;
  border-radius: 8px;
}

/* สีตัวหนังสือ */
.purple-text {
  color: #bf2e7e !important;
}

.gray-text{
  color: #7F7F7F;
}

/* ปุ่ม */
.btn-color {
  background: linear-gradient(
    95.29deg,
    #2f65af 18.66%,
    #764a97 35.23%,
    #bf2e7e 51.65%,
    #f07821 81.59%
  );
  border-radius: 12px;
  border: none;
  padding: 4px 35px;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 500;
  color: #FFFFFF;
  font-size: 2.5em;
  cursor: pointer;
}

/* เส้น */
.bar-color{
  color: #BF2E7E;
  background-color: #BF2E7E;
  border: 1.5px solid #BF2E7E;
  border-radius: 3px;
}

@media screen and (max-width: 1920px) {
  .page-container,
  .navbar-container {
    width: 1280px;
    max-width: 1280px;
  }
}
@media screen and (max-width: 1650px) {
}
@media screen and (max-width: 1440px) {
  .page-container,
  .navbar-container {
    width: 1024px;
    max-width: 1024px;
  }
}
@media screen and (max-width: 1024px) {
  .page-container,
  .navbar-container {
    width: 960px;
    max-width: 960px;
    padding-left: 20px;
    padding-right: 20px;
  }
}
@media screen and (max-width: 768px) {
  .page-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }
}
@media screen and (max-width: 767px) {
  .page-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }
}
@media screen and (max-width: 600px) {
}
@media screen and (max-width: 414px) {
  .page-container,
  .navbar-container {
    width: 374px;
    max-width: 374px;
  }
}
@media screen and (max-width: 375px) {
  .page-container,
  .navbar-container {
    width: 355px;
    max-width: 355px;
  }
}
@media screen and (max-width: 360px) {
  .page-container,
  .navbar-container {
    width: 335px;
    max-width: 335px;
  }
}
</style>
