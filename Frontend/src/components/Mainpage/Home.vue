<template>
  <div id="home">
    <div class="center">
      <img id="tmlcc-logo" src="../../assets/TMLCC_Logo.png" alt="" />
    </div>

    <div id="countdown-section" class="section">
      <div class="countdown-container">
        <div class="countdown-number">
          <div class="number-box">
            <h1>{{ this.days1 }}</h1>
          </div>
          <div class="number-box">
            <h1>{{ this.days2 }}</h1>
          </div>
        </div>
        <h1 class="number-label">DAYS</h1>
      </div>

      <h1 class="colon">:</h1>

      <div class="countdown-container">
        <div class="countdown-number">
          <div class="number-box">
            <h1>{{ this.hours1 }}</h1>
          </div>
          <div class="number-box">
            <h1>{{ this.hours2 }}</h1>
          </div>
        </div>
        <h1 class="number-label">HOURS</h1>
      </div>

      <h1 class="colon">:</h1>

      <div class="countdown-container">
        <div class="countdown-number">
          <div class="number-box">
            <h1>{{ this.minutes1 }}</h1>
          </div>
          <div class="number-box">
            <h1>{{ this.minutes2 }}</h1>
          </div>
        </div>
        <h1 class="number-label">MINUTES</h1>
      </div>

      <h1 class="colon seconds">:</h1>

      <div class="countdown-container seconds">
        <div class="countdown-number">
          <div class="number-box">
            <h1>{{ this.seconds1 }}</h1>
          </div>
          <div class="number-box">
            <h1>{{ this.seconds2 }}</h1>
          </div>
        </div>
        <h1 class="number-label">SECONDS</h1>
      </div>
    </div>

    <div id="register-date-section" class="section">
      <div>
        <hr class="purple-line" />
      </div>
      <div>
        <p class="header-m register-text">สมัครเข้าแข่งขันพร้อมกัน</p>
        <h1 class="header-c register-date purple-d-text">1 กันยายน 2564</h1>
      </div>
      <div>
        <hr class="purple-line" />
      </div>
    </div>

    <div id="sponsors-section">
      <MainSponsors />
    </div>
  </div>
</template>

<script>
import MainSponsors from "../Mainpage/MainSponsors.vue";
export default {
  data() {
    return {
      days: "0",
      days1: "0",
      days2: "0",
      hours: "0",
      hours1: "0",
      hours2: "0",
      minutes: "0",
      minutes1: "0",
      minutes2: "0",
      seconds: "0",
      seconds1: "0",
      seconds2: "0",
    };
  },
  components: {
    MainSponsors,
  },
  mounted() {
    setInterval(() => {
      var countDownDate = new Date("September 1, 2021 00:00:00").getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance <= 0) {
        this.days1 = "0";
        this.days2 = "0";
        this.hours1 = "0";
        this.hours2 = "0";
        this.minutes1 = "0";
        this.minutes2 = "0";
        this.seconds1 = "0";
        this.seconds2 = "0";
      } else {
        if (this.days >= 10) {
          this.days1 = this.days.toString().substring(0, 1);
          this.days2 = this.days.toString().substring(1);
        }
        if (this.hours >= 10) {
          this.hours1 = this.hours.toString().substring(0, 1);
          this.hours2 = this.hours.toString().substring(1);
        }
        if (this.minutes >= 10) {
          this.minutes1 = this.minutes.toString().substring(0, 1);
          this.minutes2 = this.minutes.toString().substring(1);
        }
        if (this.seconds >= 10) {
          this.seconds1 = this.seconds.toString().substring(0, 1);
          this.seconds2 = this.seconds.toString().substring(1);
        }
        if (this.days < 10) {
          this.days1 = "0";
          this.days2 = this.days;
        }
        if (this.hours < 10) {
          this.hours1 = "0";
          this.hours2 = this.hours;
        }
        if (this.minutes < 10) {
          this.minutes1 = "0";
          this.minutes2 = this.minutes;
        }
        if (this.seconds < 10) {
          this.seconds1 = "0";
          this.seconds2 = this.seconds;
        }
      }
    }, 1000);
  },
};
</script>

<style scopedd>
#tmlcc-logo {
  width: 651px;
}

#countdown-section {
  margin-top: 45px;
}

.countdown-number {
  display: flex;
  align-items: center;
}

.countdown-number > div:nth-child(1) {
  margin-right: 15px;
}

.number-box {
  padding: 15px;
  border: none;
  background: linear-gradient(180deg, #7f7f7f 0%, rgba(79, 79, 79, 0.16) 100%);
  border-radius: 12px;
}

.number-box > h1 {
  color: #ffffff;
  font-weight: 600;
  font-size: 12.5em;
  padding-top: 10px;
  margin: 0;
  line-height: 80px;
}

.number-label {
  font-weight: 600;
  font-size: 3em;
  margin: 15px 0px 0px 0px;
  color: #303030;
  text-align: center;
}

.colon {
  font-size: 8em;
  color: #c4c4c4;
  margin: 0;
  padding: 0px 20px 60px 20px;
}

#register-date-section {
  margin-top: 20px;
}

#register-date-section > div:nth-child(2) {
  padding: 0px 30px;
}

.register-text {
  text-align: center;
  font-family: "IBM-PLEX-THAI";
  font-weight: 500;
}

.register-date {
  line-height: 41.6px;
}

.purple-line {
  color: #764a97;
  background-color: #764a97;
  border: 1.5px solid #764a97;
  border-radius: 3px;
  width: 255px;
}

#sponsors-section {
  margin-top: 40px;
}

@media screen and (max-width: 1100px) {
  .number-box > h1 {
    font-size: 8em;
  }

  .colon {
    font-size: 5em;
    padding: 0px 10px 55px 10px;
  }

  .number-label {
    font-size: 2.5em;
  }

  #tmlcc-logo {
    width: 500px;
  }

  .purple-line {
    width: 170px;
  }

  .number-box > h1 {
    line-height: 60px;
  }

  #sponsors-section {
    margin-top: 20px;
  }
}

@media screen and (max-width: 767px) {
  .purple-line {
    width: 120px;
  }

  .seconds {
    display: none;
  }

  .number-label {
    font-size: 2em;
  }

  .number-box > h1 {
    font-size: 5.5em;
  }

  #tmlcc-logo {
    width: 350px;
  }
}

@media screen and (max-width: 600px) {
  .purple-line {
    width: 80px;
  }

  #register-date-section > div:nth-child(2) {
    padding: 0px 15px;
  }

  .countdown-number > div:nth-child(1) {
    margin-right: 7px;
  }

  #tmlcc-logo {
    width: 325px;
  }
}

@media screen and (max-width: 450px) {
  .number-box {
    padding: 10px;
  }

  #tmlcc-logo {
    width: 310px;
  }

  .number-box > h1 {
    font-size: 4.5em;
  }

  .number-box > h1 {
    line-height: 40px;
  }

  .number-label {
    font-size: 2em;
  }

  .purple-line {
    width: 30px;
  }

  .colon {
    font-size: 4em;
    padding: 0px 5px 50px 5px;
  }
}
</style>
