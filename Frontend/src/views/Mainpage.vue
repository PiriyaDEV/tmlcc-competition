<template>
  <div>
    <Navbar />
    <div id="mainpage" class="section">
      <div id="molecule-absolute-1">
        <img src="../assets/molecule/molecule1.png" alt="" />
      </div>

      <div id="molecule-absolute-2">
        <img src="../assets/molecule/molecule2.png" alt="" />
      </div>

      <div id="molecule-absolute-3">
        <img src="../assets/molecule/molecule3.png" alt="" />
      </div>
      <div id="mainpage-container" class="page-container">
        <div>
          <Home />
          <Information />
          <NavigationBar id="navigation-bar-fixed" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";
import Home from "../components/Mainpage/Home.vue";
import Information from "../components/Mainpage/Information.vue";
import Footer from "../components/Mainpage/Footer.vue";
import NavigationBar from "../components/Menu/NavigationBar.vue";

export default {
  components: {
    Navbar,
    Home,
    Footer,
    Information,
    NavigationBar,
  },
  mounted() {
    this.$store.dispatch("page/setPage", "mainpage");

    let myID = document.getElementById("navigation-bar-fixed");

    var myScrollFunc = function () {
      var y = window.scrollY;
      if (y >= 950) {
        myID.className = "show";
      } else {
        myID.className = "hide";
      }
    };

    window.addEventListener("scroll", myScrollFunc);
  },
};
</script>

<style scoped>
#mainpage {
  padding: 85px 0px 0px 0px;
  background-color: #ffffff;
  box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5),
    inset 0px -11px 8px -10px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 0px 11px 8px -10px rgba(188, 188, 188, 0.5),
    inset 0px -11px 8px -10px rgba(188, 188, 188, 0.5);
  position: relative;
}

#mainpage-container {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

#mainpage-container > div {
  width: 100%;
}

#tmlcc-logo {
  width: 651px;
}

#navigation-bar-fixed {
  position: fixed;
  opacity: 0;
  right: 6%;
  top: 30%;
  transition: all 0.5s;
}

.hide {
  opacity: 0 !important;
  pointer-events: none;
}

.show {
  opacity: 1 !important;
}

@media screen and (max-width: 1100px) {
  #navigation-bar-fixed {
    display: none;
  }

  #mainpage {
    padding: 135px 0px 0px 0px;
  }
}

@media screen and (max-width: 767px) {
  #mainpage {
    padding: 105px 0px 0px 0px;
  }
}
</style>
