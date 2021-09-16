`
<template>
  <div id="sponsors" class="section">
    <div>
      <div class="center logo-section">
        <div
          @click="linkClick('https://www.scb.co.th/th/personal-banking.html')"
        >
          <img id="scb-logo" src="../../assets/sponsors/scb2.png" alt="" />
        </div>
        <div @click="linkClick('https://www.nanotec.or.th/en/')">
          <img
            id="nano-logo"
            src="../../assets/sponsors/Logo_NANOTEC-2020 1.png"
            alt=""
          />
        </div>
      </div>

      <div id="second-logo-section" class="center logo-section">
        <div @click="linkClick('https://thinkingmachin.es/')">
          <img
            id="tm-logo"
            src="../../assets/sponsors/tm-standart-logo-red.png"
            alt=""
          />
        </div>
        <div @click="linkClick('https://www.jetbrains.com/')">
          <img
            id="jb-logo"
            src="../../assets/sponsors/jetbrains 1.png"
            alt=""
          />
        </div>
        <div @click="linkClick('https://www.thoughtworks.com/')">
          <img
            id="tw-logo"
            src="../../assets/sponsors/thoughtworks 1.png"
            alt=""
          />
        </div>
        <div @click="linkClick('https://www.webex.com/')">
          <img
            id="ws-logo"
            src="../../assets/sponsors/webex-seeklogo.com 1.png"
            alt=""
          />
        </div>
        <div @click="linkClick('https://www.careervisathailand.com/')">
          <img id="cv-logo" src="../../assets/sponsors/careervisa.png" alt="" />
        </div>
      </div>
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
img {
  cursor: pointer;
}

#sponsors > div > div:first-child {
  margin: 15px 0px;
}

.logo-section > div {
  padding: 0px 10px;
}
.bar-color-p {
  width: 120px;
}

/* sponsors logo */
#jb-logo {
  width: 102px;
}
#tw-logo {
  width: 200px;
}
#scb-logo {
  width: 141px;
}
#nano-logo {
  width: 200px;
}
#ws-logo {
  width: 195px;
}
#tm-logo {
  width: 150px;
}
#cv-logo {
  width: 80px;
}

@media screen and (max-width: 1750px) {
  #jb-logo {
    width: calc(102px - 30px);
  }
  #nano-logo {
    width: calc(200px - 30px);
  }
  #ws-logo {
    width: calc(150px - 30px);
  }
  #tw-logo {
    width: calc(200px - 30px);
  }
  #scb-logo {
    width: calc(141px - 30px);
  }
  #tm-logo {
    width: calc(180px - 30px);
  }
  #cv-logo {
    width: calc(80px - 20px);
  }
}

@media screen and (max-width: 1280px) {
  #jb-logo {
    width: calc(102px - 40px);
  }
  #tw-logo {
    width: calc(200px - 40px);
  }
  #nano-logo {
    width: calc(200px - 40px);
  }
  #ws-logo {
    width: calc(150px - 40px);
  }
  #scb-logo {
    width: calc(141px - 40px);
  }
  #tm-logo {
    width: calc(180px - 40px);
  }
  #cv-logo {
    width: calc(80px - 40px);
  }

  #sponsors > div > div {
    padding: 10px;
  }
}

@media screen and (max-width: 1100px) {
  #jb-logo {
    width: calc(102px - 40px);
  }
  #nano-logo {
    width: calc(200px - 40px);
  }
  #tw-logo {
    width: calc(200px - 50px);
  }
  #ws-logo {
    width: calc(150px - 50px);
  }
  #scb-logo {
    width: calc(141px - 30px);
  }
  #tm-logo {
    width: calc(180px - 30px);
  }
  #cv-logo {
    width: calc(80px - 30px);
  }
}

@media screen and (max-width: 767px) {
  #sponsors > div > div {
    flex-wrap: wrap;
  }

  #sponsors > div > div:first-child {
    margin: 0px 0px;
  }

  .logo-section > div {
    padding: 8px 10px;
  }
}
</style>
