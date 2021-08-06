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
      <img id="bx-logo" src="../../assets/sponsors/BX-logo 1.png" alt="" />
    </div>
    <div>
      <img
        id="csea-logo"
        src="../../assets/sponsors/CSEA_vertical 1.png"
        alt=""
      />
    </div>
    <div>
      <img
        id="thaisc-logo"
        src="../../assets/sponsors/Logo-ThaiSC 1.png"
        alt=""
      />
    </div>
    <div>
      <img
        id="vistec-logo"
        src="../../assets/sponsors/vistec_logo 1.png"
        alt=""
      />
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
    width: calc(102px - 30px);
  }
}

@media screen and (max-width: 1024px) {
  #sponsors {
    flex-wrap: wrap;
    padding: 0px 120px;
  }
}

@media screen and (max-width: 767px) {
  /* #sponsors{
    display: block;
  } */

  /* #sponsors > div{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  } */
}
</style>
