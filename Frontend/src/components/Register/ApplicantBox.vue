<template>
  <div id="applicant-box">
    <div @click="agreementClick()" class="center page-change-left">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
      <h1 class="text-normal purple-text">เงื่อนไขการสมัคร</h1>
    </div>

    <div @click="registerNext()" class="center page-change-right">
      <h1 :class="cssNextT">ข้อมูลผู้ใช้งานระบบ</h1>
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
          :class="cssTitleName"
        >
          <option value="นาย">นาย</option>
          <option value="นาง">นาง</option>
          <option value="นางสาว">นางสาว</option>
        </select>
        <p
          v-if="registerStatus.titleName.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.titleName.message }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">ชื่อ</h1>
        <input v-model="user.firstName" :class="cssFirstName" type="text" />
        <p
          v-if="registerStatus.firstName.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.firstName.message }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">นามสกุล</h1>
        <input v-model="user.lastName" :class="cssLastName" type="text" />
        <p
          v-if="registerStatus.lastName.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.lastName.message }}
        </p>
      </div>
    </div>

    <div id="education-grid" class="center">
      <div>
        <h1 class="text-normal">ระดับการศึกษาสูงสุด</h1>
        <select
          v-model="user.education"
          name="education"
          id="education"
          :class="cssEducation"
        >
          <option value="มัธยมศึกษา">มัธยมศึกษา</option>
          <option value="ปริญญาตรี">ปริญญาตรี</option>
          <option value="ปริญญาโท">ปริญญาโท</option>
          <option value="ปริญญาเอก">ปริญญาเอก</option>
        </select>
        <p
          v-if="registerStatus.education.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.education.message }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">สถานศึกษา</h1>
        <input v-model="user.institution" :class="cssInstitution" type="text" />
        <p
          v-if="registerStatus.institution.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.institution.message }}
        </p>
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
          :class="cssOrganization"
          type="text"
        />
        <p
          v-if="registerStatus.organization.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.organization.message }}
        </p>
      </div>
    </div>

    <div id="address-grid" class="center">
      <div>
        <h1 class="text-normal">ที่อยู่</h1>
        <input v-model="user.address" :class="cssAddress" type="text" />
        <p
          v-if="registerStatus.address.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.address.message }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">ประเทศ</h1>
        <input v-model="user.country" :class="cssCountry" type="text" />
        <p
          v-if="registerStatus.country.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.country.message }}
        </p>
      </div>
    </div>

    <h1 class="header-s">ช่องทางการติดต่อ</h1>

    <div id="contact-grid" class="center">
      <div>
        <h1 class="text-normal">เบอร์โทรศัพท์</h1>
        <input v-model="user.phone" :class="cssPhone" type="text" />
        <p
          v-if="registerStatus.phone.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.phone.message }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">E-mail</h1>
        <input v-model="user.email" :class="cssEmail" type="text" />
        <p
          v-if="registerStatus.email.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.email.message }}
        </p>
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
          :class="cssWorks"
          placeholder="Publication/github/ อื่นๆ"
        ></textarea>
        <p
          v-if="registerStatus.works.isInvalid"
          class="text-normal orange-text error-message"
        >
          * {{ registerStatus.works.message }}
        </p>
      </div>
    </div>

    <div id="invite-grid">
      <div>
        <h1 class="text-normal">
          หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร
        </h1>
        <div id="invite-checkbox">
          <div>
            <input
              v-model="user.isWorkInterest"
              value="false"
              name="workInterest"
              type="radio"
            />
            <label class="text-normal">ไม่สนใจ</label>
          </div>

          <div>
            <input
              v-model="user.isWorkInterest"
              value="true"
              name="workInterest"
              type="radio"
            />
            <label class="text-normal">สนใจ</label>
          </div>

          <input
            disabled
            id="workInterestBox"
            v-model="user.interestField"
            :class="cssWorkInterest"
            type="text"
            placeholder="โปรดระบุสาขาที่สนใจ"
          />
          <p
            v-if="registerStatus.workInterest.isInvalid"
            class="text-normal orange-text error-message"
          >
            * {{ registerStatus.workInterest.message }}
          </p>
        </div>
      </div>
    </div>

    <h1 class="header-s">ประเมินตนเอง</h1>

    <div id="skill-grid">
      <div>
        <h1 class="text-normal">คิดว่าตนเองมีทักษะ</h1>
        <div class="skill-checkbox">
          <div>
            <input v-model="user.hasProgSkill" type="checkbox" />
            <label class="text-normal">Programming</label>
          </div>

          <div>
            <input
              disabled
              id="subProgramBox1"
              v-model="user.progSkillLevel"
              value="Beginner"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              disabled
              id="subProgramBox2"
              v-model="user.progSkillLevel"
              value="Intermediate"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              disabled
              id="subProgramBox3"
              v-model="user.progSkillLevel"
              value="Influent"
              type="radio"
              name="programming"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            disabled
            id="programBox"
            v-model="user.progSkillList"
            :class="cssProgSkill"
            type="text"
            placeholder="ระบุภาษา โดยใช้ , กั้น"
          />
        </div>
        <div class="skill-checkbox">
          <div>
            <input v-model="user.hasChemSkill" type="checkbox" />
            <label class="text-normal">Chemistry</label>
          </div>

          <div>
            <input
              disabled
              id="subChemBox1"
              v-model="user.chemSkillLevel"
              value="Beginner"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              disabled
              id="subChemBox2"
              v-model="user.chemSkillLevel"
              value="Intermediate"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              disabled
              id="subChemBox3"
              v-model="user.chemSkillLevel"
              value="Influent"
              type="radio"
              name="chemistry"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            disabled
            id="chemBox"
            v-model="user.chemSkillList"
            :class="cssChemSkill"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
        </div>

        <div class="skill-checkbox">
          <div>
            <input v-model="user.hasMachineLSkill" type="checkbox" />
            <label class="text-normal">Machine Learning</label>
          </div>

          <div>
            <input
              disabled
              id="subMachineBox1"
              v-model="user.machineLSkillLevel"
              value="Beginner"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Beginner</label>
          </div>

          <div>
            <input
              disabled
              id="subMachineBox2"
              v-model="user.machineLSkillLevel"
              value="Intermediate"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Intermediate</label>
          </div>

          <div>
            <input
              disabled
              id="subMachineBox3"
              v-model="user.machineLSkillLevel"
              value="Influent"
              type="radio"
              name="machineLearning"
            />
            <label class="text-normal">Influent</label>
          </div>

          <input
            disabled
            id="machineBox"
            v-model="user.machineLSkillList"
            :class="cssMachineLSkill"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
        </div>

        <div class="skill-etc-checkbox">
          <div>
            <input v-model="user.hasOtherSkill" type="checkbox" />
            <label class="text-normal">อื่นๆ (โปรดระบุ)</label>
          </div>

          <input
            disabled
            id="otherBox"
            v-model="user.otherSkillList"
            :class="cssOtherSkill"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
          <p
            v-if="registerStatus.skill.isInvalid"
            class="text-normal orange-text error-message"
          >
            * {{ registerStatus.skill.message }}
          </p>
        </div>
      </div>
    </div>

    <hr class="bar-color" />

    <div class="center">
      <button @click="registerNext()" :class="cssNextB">ไปยังหน้าต่อไป</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["user"],
  data() {
    return {
      readyToNext: false,
    };
  },
  computed: {
    ...mapGetters({
      registerStatus: "auth/getRegisterStatus",
      checkStatus: "auth/getCheckStatus",
    }),
    cssNextT() {
      return this.checkStatus
        ? "text-normal purple-text"
        : "text-normal l-grey-text";
    },
    cssNextB() {
      return this.checkStatus ? "btn-white" : "btn-grey";
    },
    cssTitleName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.titleName.isInvalid) {
        return error;
      }
      return complete;
    },
    cssFirstName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.firstName.isInvalid) {
        return error;
      }
      return complete;
    },
    cssLastName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.lastName.isInvalid) {
        return error;
      }
      return complete;
    },
    cssEducation() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.education.isInvalid) {
        return error;
      }
      return complete;
    },
    cssInstitution() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.institution.isInvalid) {
        return error;
      }
      return complete;
    },
    cssOrganization() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.organization.isInvalid) {
        return error;
      }
      return complete;
    },
    cssAddress() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.address.isInvalid) {
        return error;
      }
      return complete;
    },
    cssCountry() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.country.isInvalid) {
        return error;
      }
      return complete;
    },
    cssPhone() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.phone.isInvalid) {
        return error;
      }
      return complete;
    },
    cssEmail() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.email.isInvalid) {
        return error;
      }
      return complete;
    },
    cssWorks() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.works.isInvalid) {
        return error;
      }
      return complete;
    },
    cssWorkInterest() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.registerStatus.workInterest.isInvalid &&
        this.user.isWorkInterest
      ) {
        return error;
      }
      return complete;
    },
    cssProgSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.skill.prog.isInvalid && this.user.hasProgSkill) {
        return error;
      }
      return complete;
    },
    cssChemSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.registerStatus.skill.chem.isInvalid && this.user.hasChemSkill) {
        return error;
      }
      return complete;
    },
    cssMachineLSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.registerStatus.skill.machine.isInvalid &&
        this.user.hasMachineLSkill
      ) {
        return error;
      }
      return complete;
    },
    cssOtherSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.registerStatus.skill.other.isInvalid &&
        this.user.hasOtherSkill
      ) {
        return error;
      }
      return complete;
    },
  },
  watch: {
    "user.firstName": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.lastName": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.education": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.institution": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.organization": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.address": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.country": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.phone": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.email": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.works": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.progSkillList": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.chemSkillList": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.machineLSkillList": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.otherSkillList": function () {
      this.$store.dispatch("auth/checkInput", this.user);
    },
    "user.isWorkInterest": function () {
      this.$store.dispatch("auth/checkInput", this.user);
      if (this.user.isWorkInterest == "true") {
        this.user.isWorkInterest = true;
        document.getElementById("workInterestBox").disabled = false;
      } else if (this.user.isWorkInterest == "false") {
        this.user.isWorkInterest = false;
        this.user.interestField = undefined;
        document.getElementById("workInterestBox").disabled = true;
      }
    },
    "user.hasProgSkill": function () {
      this.$store.dispatch("auth/checkInput", this.user);
      if (this.user.hasProgSkill) {
        this.user.progSkillLevel = "Beginner";
        document.getElementById("programBox").disabled = false;
        document.getElementById("subProgramBox1").disabled = false;
        document.getElementById("subProgramBox2").disabled = false;
        document.getElementById("subProgramBox3").disabled = false;
      } else {
        this.user.progSkillLevel = undefined;
        this.user.progSkillList = undefined;
        document.getElementById("programBox").disabled = true;
        document.getElementById("subProgramBox1").disabled = true;
        document.getElementById("subProgramBox2").disabled = true;
        document.getElementById("subProgramBox3").disabled = true;
      }
    },
    "user.hasChemSkill": function () {
      this.$store.dispatch("auth/checkInput", this.user);
      if (this.user.hasChemSkill) {
        this.user.chemSkillLevel = "Beginner";
        document.getElementById("chemBox").disabled = false;
        document.getElementById("subChemBox1").disabled = false;
        document.getElementById("subChemBox2").disabled = false;
        document.getElementById("subChemBox3").disabled = false;
      } else {
        this.user.chemSkillLevel = undefined;
        this.user.chemSkillList = undefined;
        document.getElementById("chemBox").disabled = true;
        document.getElementById("subChemBox1").disabled = true;
        document.getElementById("subChemBox2").disabled = true;
        document.getElementById("subChemBox3").disabled = true;
      }
    },
    "user.hasMachineLSkill": function () {
      this.$store.dispatch("auth/checkInput", this.user);
      if (this.user.hasMachineLSkill) {
        this.user.machineLSkillLevel = "Beginner";
        document.getElementById("machineBox").disabled = false;
        document.getElementById("subMachineBox1").disabled = false;
        document.getElementById("subMachineBox2").disabled = false;
        document.getElementById("subMachineBox3").disabled = false;
      } else {
        this.user.machineLSkillLevel = undefined;
        this.user.machineLSkillList = undefined;
        document.getElementById("machineBox").disabled = true;
        document.getElementById("subMachineBox1").disabled = true;
        document.getElementById("subMachineBox2").disabled = true;
        document.getElementById("subMachineBox3").disabled = true;
      }
    },
    "user.hasOtherSkill": function () {
      this.$store.dispatch("auth/checkInput", this.user);
      if (this.user.hasOtherSkill) {
        document.getElementById("otherBox").disabled = false;
      } else {
        this.user.otherSkillList = undefined;
        document.getElementById("otherBox").disabled = true;
      }
    },
  },
  methods: {
    agreementClick() {
      this.$store.dispatch("page/setPage", "agreement");
    },
    async registerNext() {
      if (this.checkStatus) {
        this.$store.dispatch("auth/validateProfile", this.user);
        await this.validateProfile();
      }
    },
    validateProfile() {
      this.readyToNext = this.registerStatus.readyToNext;
      if (this.readyToNext) {
        this.$store.dispatch("page/setPage", "info");
      }
    },
  },
};
</script>

<style scoped>
#applicant-box {
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
  align-items: flex-start;
}

#education-grid,
#contact-grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
}

#address-grid {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 25px;
  grid-auto-rows: auto;
  align-items: flex-start;
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

.btn-grey {
  cursor: pointer;
}

@media screen and (max-width: 1100px) {
  #applicant-box {
    padding: 20px 40px;
  }

  .skill-checkbox,
  .skill-etc-checkbox,
  #invite-checkbox,
  #education-grid {
    display: block;
  }

  .skill-checkbox > div:not(:first-child) {
    margin-left: 20px;
  }

  .page-change-left {
    left: 40px;
  }

  .page-change-right {
    right: 40px;
  }
}

@media screen and (max-width: 767px) {
  #applicant-box {
    margin-top: 15px;
    padding: 20px 20px;
  }

  #name-grid,
  #contact-grid,
  #address-grid {
    display: block;
  }

  .page-change-left {
    left: 30px;
  }

  .page-change-right {
    right: 30px;
  }

  .page-change-right > h1,
  .page-change-left > h1 {
    display: none;
  }

  .fa {
    font-size: 3.25em;
  }
}
</style>
