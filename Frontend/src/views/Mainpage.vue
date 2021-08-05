<template>
  <div>
    <Navbar :page="`mainpage`" />
    <div id="mainpage" class="section">
      <div id="mainpage-container" class="page-container">
        <div>
          <Home />
          <Information />
          <NavigationBar :page="`mainpage`" id="navigation-bar-fixed" />
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
    let myID = document.getElementById("navigation-bar-fixed");

    var myScrollFunc = function () {
      var y = window.scrollY;
      if (y >= 950 && y <= 2100) {
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
  box-shadow: inset 15px 10px 9px -8px rgba(188, 188, 188, 0.5),
    inset 15px -10px 9px -8px rgba(188, 188, 188, 0.5);
  -webkit-box-shadow: inset 15px 10px 9px -8px rgba(188, 188, 188, 0.5),
    inset 15px -10px 9px -8px rgba(188, 188, 188, 0.5);
}

#mainpage-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
