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
              <hr class="blue-line" />
            </div>
            <div>
              <h1 class="header-c blue-text">
                เกี่ยวกับโครงการ
              </h1>
            </div>
            <div>
              <hr class="blue-line" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Menu/Navbar.vue";
export default {
  components: {
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

#workshop-container > div {
  width: 100%;
}
#tmlcc-logo {
  width: 360px;
}


/* Header */
.blue-line {
  color: #2f65af !important;
  background-color: #2f65af;
  border: 1.5px solid #2f65af;
  border-radius: 3px;
  width: 255px;
}

#workshop-header-section{
  padding: 50px 0px 20px 0px;
}

#workshop-header-section > div:nth-child(2){
  padding: 0px 50px;
}
</style>
