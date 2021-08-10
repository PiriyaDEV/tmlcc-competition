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
      <img id="deepnote-logo" src="../../assets/sponsors/dnlogo 1.png" alt="" />
    </div>
    <div>
      <img id="tw-logo" src="../../assets/sponsors/thoughtworks 1.png" alt="" />
    </div>
    <div>
      <img id="jb-logo" src="../../assets/sponsors/jetbrains 1.png" alt="" />
    </div>
    <div>
      <img id="scb-logo" src="../../assets/sponsors/scb-bank 1.png" alt="" />
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

#sponsors {
  flex-wrap: wrap;
  padding: 0px 120px;
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
  width: 243px;
}
#tw-logo {
  width: 244px;
}
#scb-logo {
  width: 141px;
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
    width: calc(243px - 30px);
  }
  #tw-logo {
    width: calc(244px - 30px);
  }
  #scb-logo {
    width: calc(141px - 30px);
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
    width: calc(243px - 40px);
  }
  #tw-logo {
    width: calc(244px - 40px);
  }
  #scb-logo {
    width: calc(141px - 40px);
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
    width: calc(243px - 50px);
  }
  #tw-logo {
    width: calc(264px - 80px);
  }
  #scb-logo {
    width: calc(141px - 30px);
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
