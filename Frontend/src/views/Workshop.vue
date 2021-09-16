<template>
  <div>
    <Navbar />
    <div id="workshop" class="section">
      <div id="workshop-container" class="page-container">
        <div>
          <div class="section">
            <img id="tmlcc-logo" src="../assets/TMLCC_Logo.png" alt="" />
          </div>

          <div id="workshop-header-section" class="section">
            <div>
              <hr class="orange-line" />
            </div>
            <div>
              <h1 class="header-c orange-text">Workshops</h1>
            </div>
            <div>
              <hr class="orange-line" />
            </div>
          </div>

          <h1 id="event-info" class="header-s">17 กันยายน 2021</h1>
          <hr class="bar-color-o bar-color-s" />

          <div class="section">
            <img
              class="schedule-pic"
              src="../assets/workshop/schedule_1.jpg"
              alt=""
            />
          </div>

          <h1 id="event-info" class="header-s">18 กันยายน 2021</h1>
          <hr class="bar-color-o bar-color-s" />

          <div class="section">
            <img
              class="schedule-pic"
              src="../assets/workshop/schedule_2.jpg"
              alt=""
            />
          </div>

          <h1 id="event-info" class="header-s">19 กันยายน 2021</h1>
          <hr class="bar-color-o bar-color-s" />

          <div class="section">
            <img
              class="schedule-pic last-schedule"
              src="../assets/workshop/schedule_3.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";
import Footer from "../components/Mainpage/Footer.vue";
export default {
  components: {
    Footer,
    Navbar,
  },
  mounted() {
    this.$store.dispatch("page/setPage", "workshop");
  },
};
</script>

<style scoped>
#workshop {
  padding: 55px 0px 0px 0px;
  background-color: #ffffff;
  box-shadow: inset 15px 10px 9px -8px rgba(188, 188, 188, 0.5),
    inset 15px -10px 9px -8px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 15px 10px 9px -8px rgba(188, 188, 188, 0.5),
    inset 15px -10px 9px -8px rgba(188, 188, 188, 0.5);
}

#workshop-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

#workshop-header-section {
  margin-bottom: 20px;
}

.last-schedule {
  margin-bottom: 80px;
}

.schedule-pic {
  padding-top: 25px;
  padding-bottom: 40px;
  width: 650px;
}

#workshop-container > div {
  width: 100%;
}
#tmlcc-logo {
  width: 360px;
}

.header-s {
  text-align: left;
}

.bar-color-s {
  width: 60px;
  margin-left: 0px;
}

/* Header */
.orange-line {
  color: #f07821 !important;
  background-color: #f07821;
  border: 1.5px solid #f07821;
  border-radius: 3px;
  width: 255px;
}

#workshop-header-section {
  padding: 50px 0px 20px 0px;
}

#workshop-header-section > div:nth-child(2) {
  padding: 0px 50px;
}

@media screen and (max-width: 1100px) {
  .schedule-pic {
    width: 450px;
  }

  .orange-line {
    width: 170px;
  }

  #workshop {
    padding: 105px 0px 0px 0px;
  }

  #tmlcc-logo {
    width: 260px;
  }
}

@media screen and (max-width: 767px) {
  .orange-line {
    width: 120px;
  }

  .schedule-pic {
    width: calc(100% - 20px);
  }

  #workshop-header-section > div:nth-child(2) {
    padding: 0px 30px;
  }

  .last-schedule {
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 600px) {
  .orange-line {
    width: 80px;
  }

  #workshop-header-section {
    padding: 50px 0px 0px 0px;
  }

  #workshop-header-section > div:nth-child(2) {
    padding: 0px 15px;
  }

  #tmlcc-logo {
    width: 230px;
  }
}

@media screen and (max-width: 450px) {
  .orange-line {
    width: 30px;
  }
}
</style>
