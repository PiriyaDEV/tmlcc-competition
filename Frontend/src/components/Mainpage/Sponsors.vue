<template>
  <div id="sponsors" class="section">
    <div>
      <img
        id="kmutt-logo"
        src="../../assets/sponsors/KMUTT_CI_Semi_Logo_en-full 1.png"
        alt=""
      />
    </div>
    <div>
      <img
        id="csea-logo"
        src="../../assets/sponsors/CSEA_vertical 1.png"
        alt=""
      />
    </div>
    <div>
      <img id="bx-logo" src="../../assets/sponsors/BX-logo 1.png" alt="" />
    </div>
    <div>
      <img
        id="vistec-logo"
        src="../../assets/sponsors/vistec_logo 1.png"
        alt=""
      />
    </div>
    <div>
      <img id="hmm-logo" src="../../assets/sponsors/hmm-logo.png" alt="" />
    </div>
    <div>
      <img id="deepnote-logo" src="../../assets/sponsors/dnlogo 1.png" alt="" />
    </div>
    <div>
      <img id="scb-logo" src="../../assets/sponsors/scb-bank 1.png" alt="" />
    </div>
    <div>
      <img id="tw-logo" src="../../assets/sponsors/thoughtworks 1.png" alt="" />
    </div>
    <div>
      <img id="jb-logo" src="../../assets/sponsors/jetbrains 1.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#sponsors > div {
  padding: 0px 20px;
}

#sponsors > div > img {
  cursor: pointer;
}

#sponsors > div:nth-child(1) {
  padding-left: 150px;
}

#sponsors > div:nth-child(4) {
  padding-right: 150px;
}

#sponsors {
  flex-wrap: wrap;
  padding: 0px 130px;
}

/* sponsors logo */
#kmutt-logo {
  width: 172px;
}
#bx-logo {
  width: 160px;
}
#csea-logo {
  width: 120px;
}
#thaisc-logo {
  width: 166px;
}
#vistec-logo {
  width: 125px;
}
#jb-logo {
  width: 102px;
}
#deepnote-logo {
  width: 220px;
}
#tw-logo {
  width: 200px;
}
#scb-logo {
  width: 141px;
}
#hmm-logo {
  width: 180px;
}

@media screen and (max-width: 1920px) {
  #sponsors {
    padding: 0px 110px;
  }
}

@media screen and (max-width: 1440px) {
  #sponsors > div:nth-child(1) {
    padding-left: 70px;
  }

  #sponsors > div:nth-child(4) {
    padding-right: 70px;
  }

  #sponsors {
    padding: 0px 60px;
  }
}

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
  #thaisc-logo {
    width: calc(166px - 30px);
  }
  #vistec-logo {
    width: calc(125px - 30px);
  }
  #jb-logo {
    width: calc(102px - 30px);
  }
  #deepnote-logo {
    width: calc(220px - 30px);
  }
  #tw-logo {
    width: calc(200px - 30px);
  }
  #scb-logo {
    width: calc(141px - 30px);
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
  #thaisc-logo {
    width: calc(166px - 40px);
  }
  #vistec-logo {
    width: calc(125px - 40px);
  }
  #jb-logo {
    width: calc(102px - 40px);
  }
  #deepnote-logo {
    width: calc(220px - 40px);
  }
  #tw-logo {
    width: calc(200px - 40px);
  }
  #scb-logo {
    width: calc(141px - 40px);
  }
  #hmm-logo {
    width: calc(180px - 40px);
  }

  #sponsors > div:nth-child(1) {
    padding-left: 130px;
  }

  #sponsors > div:nth-child(4) {
    padding-right: 130px;
  }

  #sponsors > div {
    padding: 10px;
  }

  #sponsors {
    flex-wrap: wrap;
    padding: 0px 80px;
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
  #thaisc-logo {
    width: calc(166px - 30px);
  }
  #vistec-logo {
    width: calc(125px - 30px);
  }
  #jb-logo {
    width: calc(102px - 40px);
  }
  #deepnote-logo {
    width: calc(220px - 50px);
  }
  #tw-logo {
    width: calc(200px - 50px);
  }
  #scb-logo {
    width: calc(141px - 30px);
  }
  #hmm-logo {
    width: calc(180px - 30px);
  }

  #sponsors > div:nth-child(1) {
    padding-left: 8px;
  }

  #sponsors > div:nth-child(4) {
    padding-right: 8px;
  }

  #sponsors {
    flex-wrap: wrap;
    padding: 0px 50px;
  }

  #sponsors > div {
    padding: 8px;
  }
}

@media screen and (max-width: 1024px) {
  /* #sponsors {
    flex-wrap: wrap;
    padding: 0px 120px;
  } */
}

@media screen and (max-width: 521px) {
  #sponsors {
    flex-wrap: wrap;
    padding: 0px 20px;
  }
}
</style>
