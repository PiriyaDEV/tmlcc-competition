<template>
  <div id="agreement-box">
    <div @click="agreementClick()" class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 class="text-normal purple-text">เงื่อนไขการสมัคร</h1>
    </div>

    <div class="center page-change-right">
      <h1 class="text-normal l-grey-text">ข้อมูลผู้ใช้งานระบบ</h1>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>

    <h1 class="header-m">ข้อมูลผู้สมัคร</h1>
    <hr class="bar-color" />

    <div id="name-grid" class="center">
      <div>
        <h1 class="text-normal">คำนำหน้า</h1>
        <select
          v-model="user.titleName"
          name="title"
          id="title"
          class="input-box text-normal"
        >
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
      </div>
      <div>
        <h1 class="text-normal">ชื่อ</h1>
        <input
          v-model="user.firstName"
          class="input-box text-normal"
          type="text"
        />
      </div>
      <div>
        <h1 class="text-normal">นามสกุล</h1>
        <input
          v-model="user.lastName"
          class="input-box text-normal"
          type="text"
        />
      </div>
    </div>

    <div id="education-grid" class="center">
      <div>
        <h1 class="text-normal">ระดับการศึกษาสูงสุด</h1>
        <select
          v-model="user.education"
          name="education"
          id="education"
          class="input-box text-normal"
        >
          <option value="มัธยมศึกษา">มัธยมศึกษา</option>
          <option value="ปริญญาตรี">ปริญญาตรี</option>
          <option value="ปริญญาโท">ปริญญาโท</option>
          <option value="ปริญญาเอก">ปริญญาเอก</option>
        </select>
      </div>
      <div>
        <h1 class="text-normal">สถานศึกษา</h1>
        <input
          v-model="user.institution"
          class="input-box text-normal"
          type="text"
        />
      </div>
    </div>

    <div id="institution-grid">
      <div>
        <h1 class="text-normal">
          สังกัด
          <span class="l-grey-text"
            >: สังกัดปัจจุบันที่ทำงาน หรือ เรียนอยู่</span
          >
        </h1>
        <input
          v-model="user.organization"
          class="input-box text-normal"
          type="text"
        />
      </div>
    </div>

    <div id="address-grid" class="center">
      <div>
        <h1 class="text-normal">ที่อยู่</h1>
        <input
          v-model="user.address"
          class="input-box text-normal"
          type="text"
        />
      </div>
      <div>
        <h1 class="text-normal">ประเทศ</h1>
        <input
          v-model="user.country"
          class="input-box text-normal"
          type="text"
        />
      </div>
    </div>

    <h1 class="header-s">ช่องทางการติดต่อ</h1>

    <div id="contact-grid" class="center">
      <div>
        <h1 class="text-normal">เบอร์โทรศัพท์</h1>
        <input v-model="user.phone" class="input-box text-normal" type="text" />
      </div>
      <div>
        <h1 class="text-normal">Email</h1>
        <input v-model="user.email" class="input-box text-normal" type="text" />
      </div>
    </div>

    <h1 class="header-s">ความสนใจ</h1>

    <div id="work-grid">
      <div>
        <h1 class="text-normal">ผลงานที่เคยทำ</h1>
        <textarea
          v-model="user.works"
          name="work"
          id="work"
          cols="30"
          rows="5"
          class="input-box text-normal"
          placeholder="Publication/github/ อื่นๆ"
        ></textarea>
      </div>
    </div>

    <div id="invite-grid">
      <div>
        <h1 class="text-normal">
          หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร
        </h1>
        <div id="invite-checkbox">
          <div>
            <input v-model="user.isWorkInterest" value="false" name="workInterest" type="radio" />
            <label class="text-normal">ไม่สนใจ</label>
          </div>

          <div>
            <input v-model="user.isWorkInterest" value="true" name="workInterest"  type="radio" />
            <label class="text-normal">สนใจ</label>
          </div>

          <input
            v-model="user.interestField"
            class="input-box text-normal"
            type="text"
            placeholder="โปรดระบุสาขาที่สนใจ"
          />
        </div>
      </div>
    </div>

    <h1 class="header-s">ประเมินตนเอง</h1>

    <div id="skill-grid">
      <div>
        <h1 class="text-normal">
          หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร
        </h1>
        <div class="skill-checkbox">
          <div>
            <input @click="programClick()" v-model="user.hasProgSkill" type="checkbox" />
            <label class="text-normal">Programming</label>
          </div>

          <div>
            <input
              v-model="user.progSkillLevel"
              value="Beginner"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              v-model="user.progSkillLevel"
              value="Intermediate"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              v-model="user.progSkillLevel"
              value="Influent"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            v-model="user.progSkillList"
            class="input-box text-normal"
            type="text"
            placeholder="ระบุภาษา โดยใช้ , กั้น"
          />
        </div>
        <div class="skill-checkbox">
          <div>
            <input v-model="user.hasChemSkill" @click="chemClick()" type="checkbox" />
            <label class="text-normal">Chemistry</label>
          </div>

          <div>
            <input
              v-model="user.chemSkillLevel"
              value="Beginner"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              v-model="user.chemSkillLevel"
              value="Intermediate"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              v-model="user.chemSkillLevel"
              value="Influent"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            v-model="user.chemSkillList"
            class="input-box text-normal"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
        </div>

        <div class="skill-checkbox">
          <div>
            <input v-model="user.hasMachineLSkill" @click="machineClick()" type="checkbox" />
            <label class="text-normal">Machine Learning</label>
          </div>

          <div>
            <input
              v-model="user.machineLSkillLevel"
              value="Beginner"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              v-model="user.machineLSkillLevel"
              value="Intermediate"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              v-model="user.machineLSkillLevel"
              value="Influent"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            v-model="user.machineLSkillList"
            class="input-box text-normal"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
        </div>

        <div class="skill-etc-checkbox">
          <div>
            <input v-model="user.hasOtherSkill" @click="otherClick()" type="checkbox" />
            <label class="text-normal">อื่นๆ (โปรดระบุ)</label>
          </div>

          <input
            v-model="user.otherSkillList"
            class="input-box text-normal"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
        </div>
      </div>
    </div>

    <hr class="bar-color" />

    <div class="center">
      <button @click="registerNext()" class="btn-white">ไปยังหน้าต่อไป</button>
    </div>
  </div>
</template>

<script>


export default {
  props: ["user"],
  data() {
    return {
      isAllDataValidated: false
    }
  },
  watch: {
    'user.isWorkInterest': function() {
      if(this.user.isWorkInterest == "true") {
        this.user.isWorkInterest = true;
      }
      if (this.user.isWorkInterest == "false") {
        this.user.isWorkInterest = false;
      }
    }
  },
  methods: {
    agreementClick() {
      this.$emit("pageReturn", "agreement");
    },
    registerNext() {
      this.$emit("pageReturn", "info");
    },
    programClick() {
      if(!this.user.hasProgSkill){
        this.user.progSkillLevel = "Beginner";
      }
      if(this.user.hasProgSkill) {
        this.user.progSkillLevel = undefined
        this.user.progSkillList = undefined;
      }
    },
    chemClick() {
      if(!this.user.hasChemSkill){
        this.user.chemSkillLevel = "Beginner";
      }
      if(this.user.hasChemSkill) {
        this.user.chemSkillLevel = undefined;
        this.user.chemSkillList = undefined;
      }
    },
    machineClick() {
      if(!this.user.hasMachineLSkill){
        this.user.machineLSkillLevel = "Beginner";
      }
      if(this.user.hasMachineLSkill) {
        this.user.machineLSkillLevel = undefined;
        this.user.machineLSkillList = undefined;
      }
    },
    otherClick() {
      if(this.user.hasOtherSkill) {
        this.user.otherSkillList = undefined;
      }
    },
    validate() {
      this.isInfoFilled = true;
      
    }
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
  position: relative;
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
  margin-bottom: 20px;
}

.fa {
  font-size: 2.25em;
  font-weight: 500;
}

.fa-angle-left {
  margin: 0px 15px 0px 0px;
  color: #bf2e7e !important;
}

.fa-angle-right {
  margin: 0px 0px 0px 15px;
  color: #c4c4c4 !important;
}

.page-change-left,
.page-change-right {
  position: absolute;
  top: 35px;
}

.page-change-right {
  right: 50px;
  cursor: pointer;
}

.page-change-left {
  left: 50px;
  cursor: pointer;
}

.input-box {
  margin-top: 5px;
  width: 100%;
}

.btn-white {
  margin-top: 10px;
}

.header-s {
  text-align: left;
  margin-bottom: 5px;
}

/* grid input */
#name-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
}

#education-grid,
#contact-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
}

#address-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
}

#invite-checkbox {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;
  align-items: center;
}

.skill-checkbox {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1.2fr 1fr 2.3fr;
  align-items: center;
}

.skill-etc-checkbox {
  display: grid;
  grid-template-columns: 1fr 3.7fr;
  align-items: center;
  margin-bottom: 15px;
}

#invite-checkbox > div,
.skill-checkbox > div,
.skill-etc-checkbox > div {
  display: flex;
  align-items: center;
}

#invite-checkbox > div > input,
.skill-checkbox > div > input,
.skill-etc-checkbox > div > input {
  margin-right: 11px;
}
</style>
