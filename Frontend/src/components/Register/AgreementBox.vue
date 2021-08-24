<template>
  <div id="agreement-box">
    <h1 class="header-m">ข้อกำหนดและเงื่อนไขในการแข่งขัน</h1>
    <hr class="bar-color" />

    <div class="center">
      <ul class="requirement text-normal">
        <li>
          ไม่อนุญาตให้ผู้เข้าแข่งขันสร้างและใช้ Account เพิ่มนอกเหนือจาก Account
          หลักในการแข่งขัน หากทีมงานตรวจพบ จะถูกตัดสิทธิ์จากการแข่งขันทันที
        </li>
        <li>
          ไม่อนุญาตให้นำชุดข้อมูลอื่นนอกเหนือจากชุดข้อมูลที่มีให้มาใช้ในการเทรนโมเดลเพิ่ม
          แต่สามารถนำชุดข้อมูลที่มีให้ไปต่อยอด เช่น สร้าง features เพิ่มเองได้
        </li>
        <li>ไม่อนุญาตให้ใช้ Commercial library ในการเทรนโมเดลและทำนายผล</li>
        <li>
          ผู้เข้าแข่งขันสามารถใช้ Programming language และ Open-source library
          ใดก็ได้
        </li>
        <li>
          ห้ามแบ่งปัน ส่งต่อ เปิดเผยข้อมูล การสร้างโมเดล และอื่น ๆ
          ที่เป็นข้อมูลของตนเองให้กับบุคคลอื่นที่ไม่ได้อยู่ในทีมแข่งขันเดียวกัน
          ยกเว้นการเผยแพร่ความรู้ผ่าน Discussion forum หากทีมงานตรวจพบ
          จะถูกตัดสิทธิ์จากการแข่งขันทันที
        </li>
        <li>ส่งคำตอบได้สูงสุด 5 ครั้งต่อวัน</li>
        <li>
          สำหรับทีมที่ได้ค่าความผิดพลาดน้อยที่สุด 5 อันดับแรก
          และทีมที่ต้องการจะเข้าชิงรางวัลความคิดสร้างสรรค์ยอดเยี่ยมจะต้องเตรียม
          Source code สำหรับการจัดการข้อมูลและฝึกสอนโมเดล เป็น Docker image
          หลังสิ้นสุดการแข่งขัน
        </li>
        <li>หากมีกรณีการทุจริต จะถูกตัดสิทธิ์การแข่งขันทันที</li>
        <li>
          คณะกรรมการการแข่งขันขอสงวนสิทธิ์ในการปรับเปลี่ยนรายละเอียดการแข่งขัน
          ในกรณีมีข้อพิพาทเกี่ยวกับการแข่งขัน
          คำตัดสินของคณะกรรมการการแข่งขันถือเป็นที่สิ้นสุด
        </li>
        <li>
          ผู้เข้าร่วมการแข่งขันที่ได้รับรางวัลไม่สามารถโอนสิทธิ์การรับรางวัลให้กับบุคคลอื่นที่ไม่ได้เป็นสมาชิกในทีม
        </li>
        <li>
          องค์ความรู้ที่เกิดขึ้นจากการแข่งขันถือเป็นลิขสิทธิ์ของคณะกรรมการจัดการแข่งขัน
        </li>
        <li>
          กรณีที่ผู้เข้าแข่งขันต้องการนำองค์ความรู้ที่เกิดขึ้นจากการแข่งขันไปใช้ประโยชน์ต่อหลังจากเสร็จสิ้นการแข่งขันแล้ว
          ผู้เข้าแข่งขันจะต้องได้รับอนุญาตเป็นลายลักษณ์อักษรจากคณะกรรมการการจัดงานเท่านั้น
        </li>
        <li>
          คณะกรรมการจัดการแข่งขันขอสงวนสิทธิ์ในอันที่จะเพิ่มเติมเปลี่ยนแปลง
          แก้ไข หรือยกเลิกข้อตกลงและเงื่อนไขใด ๆ ทั้งหมดนี้
          ตลอดจนรูปแบบการแข่งขันและของรางวัล โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
        </li>
        <li>
          ผู้เข้าแข่งขันได้อ่านและเข้าใจข้อกำหนดและเงื่อนไขในการแข่งขันดีแล้ว
          ตกลงยินยอมที่จะปฏิบัติตามข้อกำหนดไว้ข้างต้นทุกประการ
        </li>
      </ul>
    </div>

    <hr class="bar-color" />

    <div id="agreement-tick" class="center">
      <input v-model="agree" type="checkbox" id="agreement" />
      <label class="text-normal" for="agreement"
        >ข้าพเจ้าขอยินยอมปฏิบัติตามเงื่อนไขการแข่งขัน</label
      >
    </div>

    <div class="center">
      <button v-if="agree" @click="register()" class="btn-white">
        ลงทะเบียน
      </button>
      <button v-else class="btn-grey">ลงทะเบียน</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agree: false,
    };
  },
  mounted() {
    this.$store.dispatch("page/setPage", "agreement");
  },
  methods: {
    register() {
      this.$store.dispatch("page/setPage", "applicant");
    },
  },
};
</script>

<style scoped>
#agreement-box {
  /* width: 100%; */
  margin-top: 30px;
  background-color: #ffffff;
  border-radius: 30px;
  padding: 28px 64px;
}

.requirement {
  margin-top: 15px;
  list-style-position: outside;
  padding-left: 15px;
}

.requirement > li {
  list-style-type: number;
}

#agreement-tick {
  margin-top: 20px;
  margin-bottom: 20px;
}

#agreement {
  width: 18px;
  height: 18px;
}

#agreement-tick > label {
  margin-left: 11px;
}

.bar-color {
  width: 120px;
}

@media screen and (max-width: 1100px) {
  #agreement-box {
    padding: 20px 40px;
  }
}

@media screen and (max-width: 767px) {
  #agreement-box {
    margin-top: 15px;
    padding: 20px 20px;
  }
}
</style>
