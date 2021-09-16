<template>
  <div id="information">
    <h1 class="header-m">ข้อมูลการแข่งขัน</h1>
    <hr class="bar-color bar-color-l" />

    <div id="info-section">
      <h1 id="cp-info" class="header-s">โจทย์การแข่งขัน</h1>
      <hr class="bar-color bar-color-s" />

      <p class="text-medium indent-tab">
        ผู้แข่งขันจะต้องพัฒนาเทคนิคทางด้านการเรียนรู้ของเครื่อง (Machine
        learning) เพื่อสร้างแบบจำลองทางคณิตศาสตร์ หรือ
        โมเดลที่สามารถเรียนรู้และเข้าใจความสัมพันธ์ระหว่างคุณสมบัติเชิงโครงสร้างของสารประกอบโครงข่ายโลหะอินทรีย์
        หรือ Metal organic frameworks (MOFs)
        และความสามารถในการกักเก็บโมเลกุลก๊าซคาร์บอนไดออกไซด์ (Working capacity)
        โมเดลที่ถูกพัฒนาขึ้นจะต้องนำไปใช้เพื่อการทำนายคุณสมบัติดังกล่าวของสารประกอบ
        MOFs อื่น ๆ ได้อย่างถูกต้องและแม่นยำ
      </p>

      <h1 id="recieve-info" class="header-s">สิ่งที่ผู้เข้าแข่งขันจะได้รับ</h1>
      <hr class="bar-color bar-color-s" />

      <ul class="text-medium number-bullet">
        <li>เงินรางวัล โล่รางวัล (ตามเกณฑ์ที่ผู้จัดกำหนด)</li>
        <li>เกียรติบัตรการเข้าร่วมการแข่งขัน</li>
        <li>
          อบรมเชิงปฏิบัติการออนไลน์โดยผู้เชี่ยวชาญด้านปัญญาประดิษฐ์และเคมี
        </li>
        <li>สิทธิพิเศษในการเข้าใช้งาน GPU resource สำหรับการแข่งขัน</li>
        <li>
          License และ 1 Year Software Subscription (ตามเกณฑ์ที่ผู้จัดกำหนด)
        </li>
      </ul>

      <h1 id="event-info" class="header-s">กำหนดการ</h1>
      <hr class="bar-color bar-color-s" />

      <div class="two-column">
        <ul class="text-medium donut-bullet">
          <div class="two-column">
            <li>ประชาสัมพันธ์ & ลงทะเบียน</li>
            <li class="second-tab block-tab">1 กันยายน - 14 กันยายน 2564</li>
          </div>
          <div class="two-column">
            <li>ประกาศรายชื่อผู้มีสิทธิ์เข้าแข่งขัน</li>
            <li class="second-tab block-tab">15 กันยายน 2564</li>
          </div>
          <div class="two-column">
            <li>การอบรมเชิงปฏิบัติการ (workshop)</li>
            <li class="second-tab block-tab">17 - 19 กันยายน 2564</li>
          </div>
          <div class="two-column">
            <li>การแข่งขัน รอบที่ 1</li>
            <li class="second-tab block-tab">20 กันยายน - 2 ตุลาคม 2564</li>
          </div>
          <!-- <div class="two-column">
            <li>Competition clinic</li>
            <li class="second-tab block-tab">
              3 ตุลาคม 2564 (ให้คำปรึกษาแต่ละทีม)
            </li>
          </div> -->
          <div class="two-column">
            <li>การแข่งขัน รอบที่ 2</li>
            <li class="second-tab block-tab">3 - 16 ตุลาคม 2564</li>
          </div>
          <div class="two-column">
            <li>การแข่งขัน รอบที่ 3</li>
            <li class="second-tab block-tab">17 ตุลาคม 2564</li>
          </div>
          <div class="two-column">
            <li>ส่งคลิปวิดีโอนำเสนอผลงาน</li>
            <li class="second-tab block-tab">16 - 19 ตุลาคม 2564</li>
          </div>
          <div class="two-column">
            <li>นำเสนอผลงานและประกาศผลผู้ได้รับรางวัล</li>
            <li class="second-tab block-tab">23 ตุลาคม 2564</li>
          </div>
        </ul>

        <ul class="text-medium second-tab flex-tab">
          <li>1 กันยายน - 14 กันยายน 2564</li>
          <li>15 กันยายน 2564</li>
          <li>17 - 19 กันยายน 2564</li>
          <li>20 กันยายน - 2 ตุลาคม 2564</li>
          <!-- <li>3 ตุลาคม 2564 (ให้คำปรึกษาแต่ละทีม)</li> -->
          <li>3 - 16 ตุลาคม 2564</li>
          <li>17 ตุลาคม 2564</li>
          <li>16 - 19 ตุลาคม 2564</li>
          <li>23 ตุลาคม 2564</li>
        </ul>
      </div>

      <p class="text-medium purple-d-text date-note">
        * กำหนดการอาจมีการเปลี่ยนแปลงตามความเหมาะสม
      </p>

      <h1 id="timeline-info" class="header-s">ไทม์ไลน์การแข่งขัน</h1>
      <hr class="bar-color bar-color-s" />

      <div class="center">
        <img id="timeline" src="../../assets/mainpage/Timeline-4.png" alt="" />
      </div>

      <h1 id="users-info" class="header-s">คุณสมบัติผู้เข้าแข่งขัน</h1>
      <hr class="bar-color bar-color-s" />

      <ul class="text-medium donut-bullet">
        <li>สัญชาติไทย</li>
        <li>อายุ 15 ปีบริบูรณ์ขึ้นไป</li>
        <li>คนไทยที่พำนักอยู่ต่างประเทศ สามารถเข้าร่วมการแข่งขันได้</li>
        <li>ผู้เข้าแข่งขันทีมละ 2 - 5 คน</li>
        <li>
          ต้องไม่เป็นผู้ปฏิบัติหน้าที่ใดหน้าที่หนึ่งในการดำเนินการ
          และ/หรือให้คำปรึกษาการจัดการแข่งขัน
        </li>
        <li>
          ชาวต่างชาติที่กำลังศึกษาอยู่ในประเทศไทย สามารถเข้าร่วมการแข่งขันได้
          <span class="frn-line"
            >แต่ต้องมีคนไทยอย่างน้อย 1 คนเป็นสมาชิกของทีม</span
          >
        </li>
        <li class="no-bullet">แต่ต้องมีคนไทยอย่างน้อย 1 คนเป็นสมาชิกของทีม</li>
      </ul>

      <h1 id="rules-info" class="header-s">เกณฑ์การตัดสิน</h1>
      <hr class="bar-color bar-color-s" />

      <ul class="text-medium donut-bullet">
        <li>รางวัลชนะเลิศและรองชนะเลิศ</li>
        <ul class="circle-bullet">
          <li>ค่าความคลาดเคลื่อนน้อยที่สุด</li>
        </ul>
        <li>รางวัลความคิดสร้างสรรค์</li>
        <ul class="circle-bullet">
          <li>ใช้วิธีหรือเทคนิคที่สร้างสรรค์ แปลกใหม่</li>
        </ul>
        <li>รางวัลการมีส่วนร่วมดีเด่น</li>
        <ul class="circle-bullet">
          <li>
            ช่วยเหลือหรือแบ่งปันองค์ความรู้ให้แก่ผู้เข้าแข่งขันทีมอื่นบน
            Discussion forum ที่เตรียมไว้ให้
          </li>
        </ul>
      </ul>

      <h1 id="reward-info" class="header-s">รางวัลทั้งหมด</h1>
      <hr class="bar-color bar-color-s" />

      <div class="two-column">
        <ul class="text-medium donut-bullet">
          <div class="two-column">
            <li>รางวัลชนะเลิศอันดับ 1</li>
            <li class="second-tab block-tab">
              30,000 บาท จำนวน 1 รางวัล พร้อมโล่เกียรติยศ<sup class="sup-number"
                >1,2</sup
              >
            </li>
          </div>
          <div class="two-column">
            <li>รางวัลชนะเลิศอันดับ 2</li>
            <li class="second-tab block-tab">
              20,000 บาท จำนวน 2 รางวัล พร้อมโล่เกียรติยศ
            </li>
          </div>
          <div class="two-column">
            <li>รางวัลชนะเลิศอันดับ 3</li>
            <li class="second-tab block-tab">
              10,000 บาท จำนวน 2 รางวัล พร้อมโล่เกียรติยศ
            </li>
          </div>
          <div class="two-column">
            <li>รางวัลความคิดสร้างสรรค์ยอดเยี่ยม</li>
            <li class="second-tab block-tab">6,000 บาท จำนวน 1 รางวัล</li>
          </div>
          <div class="two-column">
            <li>รางวัล Popular vote</li>
            <li class="second-tab block-tab">5,000 บาท จำนวน 1 รางวัล</li>
          </div>
          <div class="two-column">
            <li>รางวัลการมีส่วนร่วมดีเด่น</li>
            <li class="second-tab block-tab">
              3,000 บาท จำนวน 3 รางวัล<sup class="sup-number">1</sup>
            </li>
          </div>
        </ul>

        <ul class="text-medium second-tab flex-tab">
          <li>
            30,000 บาท จำนวน 1 รางวัล พร้อมโล่เกียรติยศ<sup class="sup-number"
              >1,2</sup
            >
          </li>
          <li>20,000 บาท จำนวน 2 รางวัล พร้อมโล่เกียรติยศ</li>
          <li>10,000 บาท จำนวน 2 รางวัล พร้อมโล่เกียรติยศ</li>
          <li>6,000 บาท จำนวน 1 รางวัล</li>
          <li>5,000 บาท จำนวน 1 รางวัล</li>
          <li>3,000 บาท จำนวน 3 รางวัล<sup class="sup-number">1</sup></li>
        </ul>
      </div>

      <div class="text-medium no-bullet-list">
        <li>1 Year Software Subscription</li>
        <ul>
          <li>
            &bull; <sup class="sup-number">1</sup>Deepnote มูลค่า 5,000 บาท
            จำนวน 4 รางวัล
          </li>
          <li>&bull; JetBrains มูลค่า 4,900 บาท จำนวน 2 รางวัล</li>
        </ul>
      </div>

      <li class="text-medium no-bullet-list extra">
        <sup class="sup-number">2</sup>สิทธิพิเศษในการสัมภาษณ์งานกับบริษัทด้าน
        Data Science ชั้นนำระดับสากล
      </li>

      <p class="text-medium reward-note blue-text">
        ผู้เข้าร่วมการแข่งขันและผู้เข้าอบรมจะได้รับเกียรติบัตรแบบอิเล็กทรอนิกส์
        (e-Certificate)
      </p>

      <!-- <div class="center">
        <button @click="registerClick()" class="btn-white rg-btn">
          ลงทะเบียนเข้าร่วมการแข่งขัน
        </button>
        <button class="btn-grey rg-btn">ลงทะเบียนเข้าร่วมการแข่งขัน</button>
      </div> -->

      <div :class="cssSubBox">
        <div>
          <h1 class="header-s purple-text">สมัครรับข่าวสารการแข่งขัน</h1>
        </div>

        <div>
          <input
            v-model="subscribe.email"
            @blur="validateEmail()"
            limit="64"
            type="text"
            :class="cssEmailSub"
            placeholder="กรอก E-mail ของคุณ"
          />
          <p
            v-if="subscribe.isInvalid"
            class="text-normal orange-text error-message"
          >
            * {{ subscribe.invalidMessage }}
          </p>
        </div>

        <div>
          <button @click="subscribeClick()" class="subscribe-btn btn-color">
            Subscribe
          </button>
        </div>
      </div>

      <div id="contact-box">
        <div>
          <h1 class="header-s">ติดต่อสอบถาม</h1>
          <hr class="bar-color-o bar-color-s" />

          <div id="contact-section">
            <div>
              <img
                class="rectangle-bar"
                src="../../assets/mainpage/rectangle-bar.png"
                alt=""
              />
            </div>
            <div>
              <p class="text-medium">
                คุณวารินทร์ ระงับพิศม์ <br />
                E-mail :
                <span class="blue-text mail-link" @click="mailTo"
                  >tmlcc.th@gmail.com</span
                >
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 class="header-s">ติดตามข่าวสาร</h1>
          <hr class="bar-color-o bar-color-s" />

          <div id="contact-section">
            <div>
              <img
                class="fb-icon"
                src="../../assets/icon/facebook-icon.png"
                alt=""
              />
            </div>
            <div>
              <p class="text-medium blue-text">
                <a
                  class="fb-click"
                  target="_blank"
                  href="https://www.facebook.com/tmlcc.th"
                  >facebook.com/tmlcc.th</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>

      <h1 class="header-m">ผู้สนับสนุนโครงการ</h1>
      <hr class="bar-color-o bar-color-l" />

      <div id="sponsors-section">
        <SubSponsors />
        <div id="download-section" class="center">
          <img src="../../assets/icon/Group 31.png" alt="" />
          <h1 class="text-medium">
            ต้องการสนับสนุนโครงการ (<a
              class="download-link"
              href="https://drive.google.com/file/d/1GbOyLJVhw99oSLQw7ZXlmAOjGk_VwbI3/view?usp=sharing"
              target="_blank"
              >ดาวน์โหลด</a
            >)
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubSponsors from "../Mainpage/SubSponsors.vue";
import subscribeService from "../../services/subscribe.service";

export default {
  components: {
    SubSponsors,
  },
  data() {
    return {
      subscribe: {
        email: "",
        isInvalid: false,
        invalidMessage: "",
      },
    };
  },
  computed: {
    cssEmailSub() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.subscribe.isInvalid) {
        return error;
      }
      return complete;
    },
    cssSubBox() {
      let error = "subscribe-box-error subscribe-box";
      let complete = "subscribe-box";
      if (this.subscribe.isInvalid) {
        return error;
      }
      return complete;
    },
  },
  methods: {
    registerClick() {
      if (this.$route.path != "/register") {
        this.$router.push("/register");
      }
    },
    mailTo() {
      window.location.href = "mailto:tmlcc.th@gmail.com";
    },
    subscribeClick() {
      this.validateEmail();
      if (!this.subscribe.isInvalid && this.subscribe.email) {
        subscribeService
          .subscribe({
            email: this.subscribe.email,
          })
          .then((res) => {
            if (res.status == 201) {
              this.subscribe.email = "";
            } else {
              console.log("Something wrong!");
              this.subscribe.isInvalid = true;
              this.subscribe.invalidMessage = "เกิดข้อผิดพลาด โปรดลองอีกครั้ง";
            }
          })
          .catch(() => {
            console.log("Something wrong!");
            this.subscribe.isInvalid = true;
            this.subscribe.invalidMessage = "เกิดข้อผิดพลาด โปรดลองอีกครั้ง";
          });
      } else {
        if (!this.subscribe.email) {
          this.subscribe.isInvalid = true;
          this.subscribe.invalidMessage = "โปรดกรอก E-mail";
        }
      }
    },
    validateEmail() {
      let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
      if (reg.test(this.subscribe.email)) {
        this.subscribe.isInvalid = false;
        this.subscribe.invalidMessage = "";
      } else {
        if (this.subscribe.email) {
          this.subscribe.isInvalid = true;
          this.subscribe.invalidMessage = "E-mail ไม่ถูกต้อง";
        } else {
          this.subscribe.isInvalid = false;
          this.subscribe.invalidMessage = "";
        }
      }
    },
  },
};
</script>

<style scoped>
#information {
  margin-top: 70px;
  position: relative;
}

#download-section {
  margin-top: 20px;
}

#download-section > img {
  width: 40px;
  padding-right: 15px;
}

#download-section > .text-medium {
  margin: 0px;
}

.mail-link {
  cursor: pointer;
}

.no-bullet-list li:before {
  display: none;
  padding-left: 20px;
}

.no-bullet-list > ul {
  margin: 0px;
  list-style-type: none;
}

.no-bullet-list {
  margin-top: 5px !important;
  padding-left: 40px;
  list-style-type: none;
}

.no-bullet-list > ul > li:before {
  padding-left: 40px;
}

.download-link {
  text-decoration: underline;
  color: #2f65af !important;
  cursor: pointer;
}

.subscribe-btn {
  cursor: pointer;
}

.bar-color-l {
  width: 120px;
}

#info-section {
  margin-top: 20px;
  position: relative;
}

.bar-color-s {
  width: 60px;
  margin-left: 0px;
}

.extra {
  margin-top: 5px !important;
}

.extra {
  list-style-type: none;
  padding-left: 20px;
}

.header-s {
  text-align: left;
  margin-top: 25px;
}

.text-medium {
  text-align: left;
  margin-top: 15px;
}

.two-column {
  display: flex;
}

.second-tab {
  padding-left: 70px;
  list-style-type: none;
}

.second-tab:before {
  background-image: none;
}

.date-note {
  padding-left: 45px;
  margin-top: 5px;
}

#timeline {
  margin-top: 28px;
  width: calc(100% - 40px);
}

.reward-note {
  font-weight: 600;
  padding-left: 20px;
  margin-top: 5px;
}

.rg-btn {
  margin: 110px 0px;
  font-size: 2.5em;
  width: 820px;
  height: 45px;
}

.frn-line {
  display: none;
}

.sup-number {
  font-size: 12px;
  padding: 0px 5px;
}

#contact-section {
  margin-top: 15px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
}

.rectangle-bar {
  padding-right: 25px;
}

#contact-section > div > .text-medium {
  margin-top: 0px;
}

#sponsors-section {
  margin: 20px 0px 60px 0px;
}

#timeline {
  margin-top: 28px;
  width: calc(100% - 40px);
}

.block-tab {
  display: none;
}

.subscribe-box > div:first-child {
  margin-top: 35px;
}

.subscribe-box > div:nth-child(2) {
  margin-top: 32px;
}

.subscribe-box > div:nth-child(3) {
  margin-top: 30px;
}

.subscribe-box > div:nth-child(1) > h1 {
  margin-top: 0px;
  margin-left: 30px;
}

.subscribe-box > div:nth-child(2) > input {
  margin: 0px 30px 0px 30px;
  width: calc(100% - 60px);
}

.subscribe-box > div:nth-child(2) > p {
  margin: 5px 30px 0px 30px;
}

.subscribe-box > div:nth-child(3) > button {
  margin-right: 30px;
}

.subscribe-box {
  display: grid;
  grid-template-columns: 1.5fr 3fr 1fr;
  border: double 2px transparent;
  border-radius: 12px;
  height: 104px;
  background-image: linear-gradient(white, white),
    linear-gradient(#2f65af, #764a97, #bf2e7e, #f07821);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-top: 34px;
  margin-bottom: 20px;
}

.subscribe-box-error {
  height: 114px !important;
}

.fb-icon {
  width: 32px;
  margin-right: 10px;
}

.fb-click {
  color: inherit;
  text-decoration: none;
}

#contact-box {
  display: flex;
  margin: 15px 0px;
}

#contact-box > div:nth-child(2) {
  margin-left: 80px;
}

.no-bullet:before {
  display: none;
}

@media screen and (max-width: 1100px) {
  .rg-btn {
    width: 650px;
    font-size: 2.25em;
  }

  #contact-section {
    margin-bottom: 40px;
  }

  #sponsors-section {
    margin: 20px 0px 40px 0px;
  }

  .subscribe-box {
    display: block;
    text-align: center;
    height: 174px;
  }

  .subscribe-box-error {
    height: 204px !important;
  }

  .subscribe-box > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0px;
  }

  #download-section > img {
    width: 30px;
  }

  .subscribe-box > div:first-child,
  .subscribe-box > div:nth-child(2),
  .subscribe-box > div:nth-child(3) {
    margin-top: 0px;
  }

  .subscribe-box > div:nth-child(1) > h1 {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-left: 0px;
  }

  .subscribe-box > div:nth-child(2) {
    display: block;
  }

  .error-message {
    text-align: left;
    padding-left: 30px;
    padding-top: 10px;
  }

  .subscribe-box > div:nth-child(2) > p {
    margin: 0;
  }

  .subscribe-box > div:nth-child(3) > button {
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 0px;
    width: calc(100% - 50px);
  }

  .no-bullet-list > ul {
    padding-left: 30px;
  }

  .block-tab {
    display: inherit;
  }

  .flex-tab {
    display: none;
  }

  .two-column {
    display: block;
  }

  .second-tab {
    padding: 3px 0px 3px 35px !important;
  }

  #information {
    margin-top: 50px;
  }
  .no-bullet-list > ul {
    padding-left: 15px;
  }

  #contact-box {
    display: block;
  }

  #contact-box > div:nth-child(2) {
    margin-left: 0px;
  }
}

@media screen and (max-width: 767px) {
  .rg-btn {
    width: calc(100% - 40px);
    margin: 70px 0px 40px 0px;
  }

  .no-bullet {
    display: none;
  }

  #download-section > img {
    width: 20px;
  }

  .no-bullet-list > ul {
    padding-left: 20px;
  }
  .frn-line {
    display: initial;
  }
  .donut-bullet li {
    padding-left: 25px;
    margin-left: 10px;
  }

  .circle-bullet li {
    padding-left: 25px;
    margin-left: 35px;
  }

  .date-note {
    margin-top: 20px;
    padding-left: 10px;
  }
  .rg-btn {
    font-size: 2em;
  }
}

/* @media screen and (max-width: 660px) {
  .block-tab {
    display: inherit;
  }

  .flex-tab {
    display: none;
  }

  .two-column {
    display: block;
  }

  .second-tab {
    padding: 3px 0px 3px 35px !important;
  }

  #information {
    margin-top: 50px;
  }
  .no-bullet-list > ul {
    padding-left: 15px;
  }

  #contact-box {
    display: block;
  }

  #contact-box > div:nth-child(2) {
    margin-left: 0px;
  }
} */

@media screen and (max-width: 414px) {
  .rg-btn {
    font-size: 1.75em;
  }

  .no-bullet-list > ul {
    padding-left: 10px;
  }
}
</style>
