<template>
  <div id="popup" class="section">
    <div>
      <div id="green-box" class="section">
        <i class="fa fa-check-circle"></i>
        <h1 class="text-normal white-text">Success</h1>
      </div>
      <div v-if="page == 'popupRegister'" id="white-box">
        <div class="center">
          <h1 class="text-normal message-text">
            ยินดีด้วย, บัญชีผู้ใช้ของคุณ
            {{ displayNameShow }} ได้ถูกสร้างเรียบร้อยแล้ว
          </h1>
        </div>
        <button @click="clickTo('login')" class="btn-white">
          คลิ้กที่นี่เพื่อเข้าสู่ระบบ
        </button>
      </div>

      <div v-if="page == 'popupFile'" id="white-box">
        <div class="center">
          <h1 class="text-normal message-text">
            ยินดีด้วย, ไฟล์ของคุณได้ถูกเพิ่มเข้าระบบเรียบร้อยแล้ว
          </h1>
        </div>
        <button @click="clickTo('dashboard/file')" class="btn-white">
          ปิดหน้านี้
        </button>
      </div>

      <div v-if="page == 'popupVideo'" id="white-box">
        <div class="center">
          <h1 class="text-normal message-text">
            ยินดีด้วย, วิดีโอของคุณได้ถูกเพิ่มเข้าระบบเรียบร้อยแล้ว
          </h1>
        </div>
        <button @click="clickTo('dashboard/file')" class="btn-white">
          ปิดหน้านี้
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      name: "",
    };
  },
  created() {
    console.log(this.displayNameShow);
  },
  props: ["displayNameShow"],
  methods: {
    clickTo(page) {
      window.location.href = "/" + page;
    },
  },
  computed: {
    ...mapGetters({
      page: "page/getPage",
    }),
  },
};
</script>

<style scoped>
#popup {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #33444444;
  z-index: 9999;
}

.text-normal {
  margin: 0px;
}

#popup > div > div {
  text-align: center;
  padding: 30px 50px;
}

.btn-white {
  width: 300px;
}

#green-box {
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #8bc24b;
  color: #ffffff;
}

.fa {
  font-size: 3.5em;
  margin-right: 10px;
}

.message-text {
  max-width: 250px;
  margin-bottom: 20px;
}

#green-box > h1 {
  color: #ffffff;
  text-transform: uppercase;
}

#white-box {
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: #ffffff;
}

@media screen and (max-width: 767px) {
  .btn-white {
    width: 200px;
  }

  #popup > div > div {
    text-align: center;
    padding: 20px 50px;
  }

  .message-text {
    max-width: 200px;
  }
}
</style>
