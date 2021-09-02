<template>
  <div id="courseflex">
    <h1 class="header-ms">คอร์สเรียนแนะนำ</h1>
    <hr class="bar-color" />

    <div id="course-header" class="center">
      <p class="course-text">
        ผู้เข้าร่วมโครงการควรมีความรู้เบื้องต้นจากระบบการเรียนออนไลน์ Learn AI
        ตามจุดทึบ
        <img
          class="tmlcc-bullet"
          src="../../assets/navbar/TMLCC_color.png"
          alt=""
        />
      </p>
    </div>

    <div id="course-detail">
      <div>
        <h1
          class="course-text course-title"
          @click="
            linkClick(
              'https://learn-ai.in.th/courses/course-v1:Learn-AI+AI201+2020_AI201/about'
            )
          "
        >
          AI201
        </h1>
        <ul class="course-text number-list">
          <li>ปัญญาประดิษฐ์เบื้องต้น</li>
          <li>
            การเขียนภาษาไพธอนสำหรับปัญญาประดิษฐ์<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
          <li>
            สถิติและการวิเคราะห์ข้อมูลเชิงสำรวจ<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div>
        <h1
          class="course-text course-title"
          @click="
            linkClick(
              'https://learn-ai.in.th/courses/course-v1:Learn-AI+AI202+2020_AI202/about'
            )
          "
        >
          AI202
        </h1>
        <ul class="course-text normal-bullet">
          <li>
            ปัญญาประดิษฐ์ดั้งเดิม 1<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
          <li>
            ปัญญาประดิษฐ์ดั้งเดิม 2<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
          <li>
            การประมวลภาษาธรรมชาติและการวิเคราะห์ข้อความ (NLP and Text Analytics)
          </li>
          <li>
            ภาพรวมของคอมพิวเตอร์วิทัศน์ จากพี้นฐานสู่การใช้งานจริง (Brief
            Overview of Computer Vision)
          </li>
        </ul>
      </div>
      <div>
        <h1
          class="course-text course-title"
          @click="
            linkClick(
              'https://learn-ai.in.th/courses/course-v1:Learn-AI+AI203+2020_AI203/about'
            )
          "
        >
          AI203
        </h1>
        <ul class="course-text normal-bullet">
          <li>
            การจัดกลุ่มและการจำแนกประเภทเพื่อการทำนายข้อมูล<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
          <li>
            การพยากรณ์อนุกรมเวลา และ Long-Short Term Memory Network<img
              class="tmlcc-bullet"
              src="../../assets/navbar/TMLCC_color.png"
              alt=""
            />
          </li>
          <li>ความรู้เบื้องต้นเกี่ยวกับ Reinforcement Learning</li>
        </ul>
      </div>
    </div>

    <div id="course-descript" class="center">
      <p class="course-text">
        หมายเหตุ : ผู้เข้าร่วมโครงการที่ต้องการรับ E-certificate จาก Learn AI
        ด้วย โปรด
        <span
          class="link-click"
          @click="
            linkClick(
              'https://learn-ai.in.th/register?next=%2Fcourses%2Fcourse-v1%3ALearn-AI%2BAI203%2B2020_AI203%2Fabout'
            )
          "
          >ลงทะเบียน<span class="hide-mobile">ที่นี่</span></span
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    linkClick(value) {
      window.open(value);
    },
  },
};
</script>

<style scoped>
#courseflex {
  background: #ffffff;
  border-radius: 30px;
  padding: 15px 32px 15px 32px;
  position: relative;
  margin-bottom: 30px;
}

.bar-color {
  width: 71px;
  color: #2f65af;
  background-color: #2f65af;
  border: 1.5px solid #2f65af;
}

.mobile-tab {
  display: none;
}

#course-header {
  margin-top: 10px;
}

.normal-bullet,
.number-list {
  margin: 0px;
  padding: 0px;
  font-size: 1em;
}

.normal-bullet li,
.number-list li {
  margin-left: 0em;
  position: relative;
  padding-left: 1em;
}

.number-list li::before {
  font-size: 1em;
  position: absolute;
  top: 0;
  left: 0;
}

/* #course-descript {
  padding: 0px 30px;
} */

.number-list li:nth-child(1):before {
  content: "1." !important;
}

.number-list li:nth-child(2):before {
  content: "2." !important;
}

.number-list li:nth-child(3):before {
  content: "3." !important;
}

.normal-bullet li:before {
  content: "\2022";
  font-size: 1em;
  position: absolute;
  top: 0;
  left: 0;
}

.course-title {
  font-weight: 700 !important;
  color: #2f65af !important;
  cursor: pointer;
}

.link-click {
  color: #2f65af !important;
  cursor: pointer;
}

.course-text {
  font-size: 1.6em;
  font-weight: 500;
  color: #303030;
  margin: 0;
  text-decoration: none;
  white-space: normal;
  overflow: hidden;
  /* max-width: 700px; */
}

.tmlcc-bullet {
  width: 19px;
  padding-left: 1.5px;
}

#course-detail {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  grid-auto-rows: auto;
  align-items: flex-start;
  margin: 10px 0px;
}

ul li {
  white-space: normal;
  height: auto;
}

@media screen and (max-width: 1440px) {
  #courseflex {
    padding: 15px 40px 15px 40px;
  }

  /* #course-descript > p {
    text-align: center;
  } */
}
@media screen and (max-width: 1100px) {
  .course-text {
    font-size: 1.75em;
  }

  #courseflex {
    margin-top: 30px;
  }

  .hide-mobile {
    display: none;
  }

  /* #course-descript {
    justify-content: flex-start;
  } */
}

@media screen and (max-width: 767px) {
  .course-text {
    font-size: 1.5em;
  }

  #course-detail {
    display: block;
  }

  .course-text {
    max-width: 100%;
    width: 100%;
  }

  .mobile-tab {
    display: inherit;
  }
}

@media screen and (max-width: 414px) {
  .course-text {
    font-size: 1.5em;
  }
}
</style>
