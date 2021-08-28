<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <router-view />
  </div>
</template>

<!-- Global site tag (gtag.js) - Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-9FWVZYCCSL"
></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "G-9FWVZYCCSL");
</script>

<script>
import Vue from "vue";
import vueSmoothScroll from "vue2-smooth-scroll";
Vue.use(vueSmoothScroll);
export default {};
</script>

<style>
@import url("https://use.typekit.net/zqk6rjr.css");

/* เพิ่ม Font Ibm-Plex-Thai */
@font-face {
  font-family: "IBM-PLEX-THAI";
  src: url("../src/assets/fonts/IBMPlexSansThai-Regular.woff2") format("woff2");
}

@font-face {
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  src: url("../src/assets/fonts/IBMPlexSansThai-SemiBold.woff2") format("woff2");
}

@font-face {
  font-family: "IBM-PLEX-THAI-LOOP";
  src: url("../src/assets/fonts/IBMPlexSansThaiLooped-Regular.ttf")
    format("woff2");
}

/* ตั้งค่าหน้า */
body,
html,
input,
select,
label,
textarea,
button {
  padding: 0;
  margin: 0;
  font-size: 8px;
  font-family: "IBM-PLEX-THAI";
}

body,
html,
input,
select,
label,
textarea {
  overflow-x: hidden;
}

body {
  background-color: #f3f3f3;
}

textarea {
  resize: none;
}

select,
option {
  background-color: transparent;
}

input[type="text"]:disabled {
  background: #f3f3f3;
  border: 1px solid rgba(79, 79, 79, 0.16);
}

::placeholder {
  color: #c4c4c4;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c4c4c4;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #c4c4c4;
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

.header-m {
  font-size: 3.5em;
  margin: 0;
  text-align: center;
  font-weight: 700;
  color: #303030;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

.header-ms {
  font-size: 3em;
  margin: 0;
  text-align: center;
  font-weight: 700;
  color: #303030;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

.header-s {
  font-size: 2.5em;
  margin: 0;
  text-align: center;
  font-weight: 700;
  color: #303030;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
}

.text-medium {
  font-size: 2.5em;
  margin: 0;
  text-align: center;
  font-weight: 400;
  color: #303030;
}

.text-normal {
  font-size: 2.25em;
  margin: 0;
  font-weight: 500;
  color: #303030;
}

.rectangle-bar {
  width: 12px;
}

.input-box {
  margin-top: 10px;
  font-weight: 500;
  margin-bottom: 15px;
  border: 1px solid rgba(79, 79, 79, 0.16);
  box-sizing: border-box;
  color: #7f7f7f !important;
  padding: 3px 15px;
  border-radius: 8px;
}

/* Auto Complete Text */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #7f7f7f !important;
  background: transparent;
  font-weight: 500;
  font-size: 2.25em !important;
  font-family: "IBM-PLEX-THAI" !important;
}

/* custom bullet */
.donut-bullet,
.circle-bullet {
  list-style: none;
  padding-left: 0;
}
.donut-bullet li,
.circle-bullet li {
  position: relative;
  padding-left: 25px;
  margin-left: 20px;
}

.circle-bullet li {
  margin-left: 50px;
}

.donut-bullet li:before,
.circle-bullet li:before {
  content: "";
  width: 12px;
  height: 12px;
  position: absolute;
  background-image: url("../src/assets/li bullet/donut.png");
  background-size: cover;
  background-position: center;
  left: 0;
  top: 50%;
  /* top: 13px; */
  transform: translateY(-50%);
}

.donut-bullet li:before {
  background-image: url("../src/assets/li bullet/donut.png");
}

.circle-bullet li:before {
  background-image: url("../src/assets/li bullet/circle.png");
}

/* สีตัวหนังสือ */
.purple-text {
  color: #bf2e7e !important;
}

.purple-d-text {
  color: #764a97 !important;
}

.gray-text {
  color: #7f7f7f;
}

.l-grey-text {
  color: #c4c4c4;
}

.blue-text {
  color: #2f65af !important;
}

.orange-text {
  color: #f07821;
}

.error-message {
  font-size: 1.75em;
  margin-bottom: 10px;
}

.error-input-box {
  border: 1px solid #f07821 !important;
}

.indent-tab {
  text-indent: 35px;
}

.number-bullet > li {
  text-indent: 0px;
  list-style-type: number;
}

.capital {
  text-transform: capitalize;
}

/* ปุ่ม */

.btn-color,
.btn-white,
.btn-grey {
  width: 175px;
}

.btn-color {
  background: linear-gradient(
    95.29deg,
    #2f65af 18.66%,
    #764a97 35.23%,
    #bf2e7e 51.65%,
    #f07821 81.59%
  );
  height: 42px;
  border-radius: 12px;
  border: none;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 500;
  color: #ffffff;
  font-size: 2.5em;
  cursor: pointer;
}

.btn-grey {
  background-color: #c4c4c4;
  height: 42px;
  border-radius: 12px;
  border: none;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 500;
  color: #ffffff;
  font-size: 2.5em;
  cursor: default;
}

.btn-white {
  border: double 2px transparent;
  border-radius: 12px;
  height: 40px;
  background-image: linear-gradient(white, white),
    linear-gradient(#2f65af, #764a97, #bf2e7e, #f07821);
  background-origin: border-box;
  background-clip: content-box, border-box;
  font-family: "IBM-PLEX-THAI-SEMIBOLD";
  font-weight: 500;
  color: #bf2e7e;
  font-size: 2.5em;
  cursor: pointer;
}

/* เส้น */
.bar-color {
  color: #bf2e7e;
  background-color: #bf2e7e;
  border: 1.5px solid #bf2e7e;
  border-radius: 3px;
}

.bar-color-p {
  color: #764a97;
  background-color: #764a97;
  border: 1.5px solid #764a97;
  border-radius: 3px;
}

.bar-color-o {
  color: #f07821;
  background-color: #f07821;
  border: 1.5px solid #f07821;
  border-radius: 3px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Navbar */
.bm-item-list,
.bm-item-list > * > span {
  margin-left: 0 !important;
}

.bm-item-list > * {
  width: 400px;
}

.bm-burger-button {
  top: -12px !important;
  width: 32px !important;
  height: 26px !important;
  right: 8px !important;
}

.line-style {
  height: 12% !important;
}

.bm-cross-button {
  right: 214px !important;
  top: 20px !important;
}

.bm-menu {
  background-color: #ffffff !important;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding-top: 40px;
  overflow-y: scroll !important;
}

/* Molecule */
#molecule-absolute-1 {
  position: absolute;
  left: -638px;
  top: -122px;
  z-index: 0;
}

#molecule-absolute-2 {
  position: absolute;
  right: -490px;
  top: 1084px;
  z-index: 0;
}

#molecule-absolute-3 {
  position: absolute;
  right: -672px;
  top: 2155px;
  z-index: 0;
}

#molecule-absolute-1 > img {
  width: 1530px;
}

#molecule-absolute-2 > img {
  width: 1219px;
}

#molecule-absolute-3 > img {
  width: 1264px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}

@media screen and (max-width: 1920px) {
  .page-container,
  .navbar-container {
    width: 1280px;
    max-width: 1280px;
  }

  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -778px;
    top: -122px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -490px;
    top: 1084px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -672px;
    top: 2155px;
    z-index: 0;
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

  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -483px;
    top: 83px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -131px;
    top: 1125px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -302px;
    top: 2155px;
    z-index: 0;
  }

  #molecule-absolute-1 > img {
    width: 930px;
  }

  #molecule-absolute-2 > img {
    width: 819px;
  }

  #molecule-absolute-3 > img {
    width: 864px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
  }
}

@media screen and (max-width: 1280px) {
  #molecule-absolute-2 {
    position: absolute;
    right: -231px;
    top: 1125px;
    z-index: 0;
  }
}

@media screen and (max-width: 1100px) {
  .header-c {
    font-size: 3.5em;
  }

  .header-m {
    font-size: 3em;
  }

  .header-ms {
    font-size: 2.5em;
  }

  .header-s {
    font-size: 2.25em;
  }

  .text-medium {
    font-size: 2.25em;
  }

  .text-normal {
    font-size: 2em;
  }

  .btn-color,
  .btn-white,
  .btn-grey,
  .rg-btn {
    font-size: 2.25em;
  }

  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -521px;
    top: 57px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1125px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -452px;
    top: 2155px;
    z-index: 0;
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

  #molecule-absolute-1 > img {
    width: 730px;
  }

  #molecule-absolute-2 > img {
    width: 619px;
  }

  #molecule-absolute-3 > img {
    width: 664px;
  }

  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -421px;
    top: 136px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1225px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -412px;
    top: 2155px;
    z-index: 0;
  }
}

@media screen and (max-width: 827px) {
  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -455px;
    top: 136px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1225px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -412px;
    top: 2053px;
    z-index: 0;
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

  .header-c {
    font-size: 3.25em;
  }

  .header-m {
    font-size: 2.75em;
  }

  .header-ms {
    font-size: 2.25em;
  }

  .header-s {
    font-size: 2em;
  }

  .text-medium {
    font-size: 2em;
  }

  .text-normal {
    font-size: 1.75em;
  }

  .btn-color,
  .btn-white,
  .btn-grey,
  .rg-btn {
    font-size: 2em;
  }

  .donut-bullet li:before,
  .circle-bullet li:before {
    top: 13px;
  }

  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -455px;
    top: 64px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1147px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -412px;
    top: 1889px;
    z-index: 0;
  }
}

@media screen and (max-width: 660px) {
  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1447px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -412px;
    top: 2639px;
    z-index: 0;
  }
}

@media screen and (max-width: 489px) {
  /* Molecule */
  #molecule-absolute-1 {
    position: absolute;
    left: -476px;
    top: 53px;
    z-index: 0;
  }

  #molecule-absolute-2 {
    position: absolute;
    right: -331px;
    top: 1547px;
    z-index: 0;
  }

  #molecule-absolute-3 {
    position: absolute;
    right: -412px;
    top: 2639px;
    z-index: 0;
  }
}

@media screen and (max-width: 414px) {
  .page-container,
  .navbar-container {
    width: 374px;
    max-width: 374px;
  }

  .page-container,
  .navbar-container {
    width: 720px;
    max-width: 720px;
  }

  .header-c {
    font-size: 3em;
  }

  .header-m {
    font-size: 2.5em;
  }

  .header-ms {
    font-size: 2em;
  }

  .header-s {
    font-size: 1.75em;
  }

  .text-medium {
    font-size: 1.75em;
  }

  .text-normal {
    font-size: 1.5em;
  }

  .btn-color,
  .btn-white,
  .btn-grey,
  .rg-btn {
    font-size: 1.75em;
  }

  .donut-bullet li:before,
  .circle-bullet li:before {
    top: 12px;
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
