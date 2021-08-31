<template>
  <div id="sponsors" class="section">
    <div>
      <div class="center logo-section">
        <div @click="linkClick('http://bigdataexperience.org/')">
          <img id="bx-logo" src="../../assets/sponsors/BX-logo 1.png" alt="" />
        </div>
        <div @click="linkClick('http://bigdataexperience.org/')">
          <img
            id="kmutt-logo"
            src="../../assets/sponsors/KMUTT_CI_Semi_Logo_en-full 1.png"
            alt=""
          />
        </div>
        <div @click="linkClick('http://cseathai.org/')">
          <img
            id="csea-logo"
            src="../../assets/sponsors/CSEA_vertical 1.png"
            alt=""
          />
        </div>
        <div @click="linkClick('https://www.vistec.ac.th/')">
          <img
            id="vistec-logo"
            src="../../assets/sponsors/vistec_logo 1.png"
            alt=""
          />
        </div>
      </div>

      <div id="sponsors-header">
        <h1 class="header-m">ผู้สนับสนุนหลัก</h1>
        <hr class="bar-color bar-color-p" />
      </div>

      <div class="center logo-section">
        <div @click="linkClick('https://www.hpe.com/')">
          <img id="hmm-logo" src="../../assets/sponsors/hmm-logo.png" alt="" />
        </div>
        <div @click="linkClick('https://deepnote.com/')">
          <img
            id="deepnote-logo"
            src="../../assets/sponsors/dnlogo 1.png"
            alt=""
          />
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

.logo-section > div {
  padding: 0px 10px;
}

#sponsors-header {
  margin: 15px 0px 25px 0px;
}

.bar-color-p {
  width: 120px;
}

/* sponsors logo */
#kmutt-logo {
  width: 172px;
}
#csea-logo {
  width: 120px;
}
#vistec-logo {
  width: 125px;
}
#deepnote-logo {
  width: 220px;
}
#hmm-logo {
  width: 180px;
}
#bx-logo {
  width: 160px;
}

/* @media screen and (max-width: 1920px) {
}

@media screen and (max-width: 1440px) {
} */

@media screen and (max-width: 1750px) {
  #kmutt-logo {
    width: calc(172px - 30px);
  }
  #bx-logo {
    width: calc(160px - 30px);
  }
  #csea-logo {
    width: calc(120px - 30px);
  }
  #vistec-logo {
    width: calc(125px - 30px);
  }
  #deepnote-logo {
    width: calc(220px - 30px);
  }
  #hmm-logo {
    width: calc(180px - 30px);
  }
}

@media screen and (max-width: 1280px) {
  #kmutt-logo {
    width: calc(172px - 40px);
  }
  #bx-logo {
    width: calc(160px - 40px);
  }
  #csea-logo {
    width: calc(120px - 40px);
  }
  #vistec-logo {
    width: calc(125px - 40px);
  }
  #deepnote-logo {
    width: calc(220px - 40px);
  }
  #hmm-logo {
    width: calc(180px - 40px);
  }

  #sponsors > div > div {
    padding: 10px;
  }

  #sponsors-header {
    margin: 10px 0px 20px 0px;
  }
}

@media screen and (max-width: 1100px) {
  #kmutt-logo {
    width: calc(172px - 30px);
  }
  #bx-logo {
    width: calc(160px - 30px);
  }
  #csea-logo {
    width: calc(120px - 30px);
  }
  #vistec-logo {
    width: calc(125px - 30px);
  }
  #deepnote-logo {
    width: calc(220px - 50px);
  }
  #hmm-logo {
    width: calc(180px - 30px);
  }
}

@media screen and (max-width: 767px) {
  #sponsors > div > div {
    flex-wrap: wrap;
  }

  .logo-section > div {
    padding: 8px 10px;
  }

  #sponsors-header {
    margin: 10px 0px 15px 0px;
  }
}
</style>
