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
          v-if="isInvalid.titleName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.titleName }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">ชื่อ</h1>
        <input
          v-model="user.firstName"
          :class="cssFirstName"
          maxlength="32"
          type="text"
        />
        <p
          v-if="isInvalid.firstName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.firstName }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">นามสกุล</h1>
        <input
          v-model="user.lastName"
          :class="cssLastName"
          maxlength="32"
          type="text"
        />
        <p
          v-if="isInvalid.lastName"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.lastName }}
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
          <option value="อาชีวศึกษา">อาชีวศึกษา</option>
          <option value="ปริญญาตรี">ปริญญาตรี</option>
          <option value="ปริญญาโท">ปริญญาโท</option>
          <option value="ปริญญาเอก">ปริญญาเอก</option>
        </select>
        <p
          v-if="isInvalid.education"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.education }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">สถานศึกษา</h1>
        <input
          v-model="user.institution"
          :class="cssInstitution"
          maxlength="128"
          type="text"
        />
        <p
          v-if="isInvalid.institution"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.institution }}
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
          maxlength="128"
          type="text"
        />
        <p
          v-if="isInvalid.organization"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.organization }}
        </p>
      </div>
    </div>

    <div id="address-grid" class="center">
      <div>
        <h1 class="text-normal">ที่อยู่</h1>
        <input
          v-model="user.address"
          :class="cssAddress"
          maxlength="255"
          type="text"
        />
        <p
          v-if="isInvalid.address"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.address }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">ประเทศ</h1>
        <input
          v-model="user.country"
          :class="cssCountry"
          maxlength="64"
          type="text"
        />
        <p
          v-if="isInvalid.country"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.country }}
        </p>
      </div>
    </div>

    <h1 class="header-s">ช่องทางการติดต่อ</h1>

    <div id="contact-grid" class="center">
      <div>
        <h1 class="text-normal">เบอร์โทรศัพท์</h1>
        <input
          v-model="user.phone"
          :class="cssPhone"
          maxlength="16"
          type="text"
        />
        <p v-if="isInvalid.phone" class="text-normal orange-text error-message">
          * {{ InvalidMessage.phone }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">E-mail</h1>
        <input
          v-model="user.email"
          @blur="checkDuplicated()"
          :class="cssEmail"
          maxlength="64"
          type="text"
        />
        <p v-if="isInvalid.email" class="text-normal orange-text error-message">
          * {{ InvalidMessage.email }}
        </p>
      </div>
    </div>

    <h1 class="header-s">ความสนใจ</h1>

    <div id="work-grid">
      <div id="registerfor-section">
        <h1 class="text-normal">ผู้สมัครสนใจเข้าร่วม</h1>
        <div class="registerfor-radio">
          <div>
            <input
              v-model="user.registerFor"
              value="Workshop"
              name="registerfor"
              type="radio"
            />
            <label class="text-normal">Workshop</label>
          </div>
          <div>
            <input
              v-model="user.registerFor"
              value="Competition"
              name="registerfor"
              type="radio"
            />
            <label class="text-normal">Competition</label>
          </div>
          <div>
            <input
              v-model="user.registerFor"
              value="Workshop and Competition"
              name="registerfor"
              type="radio"
            />
            <label class="text-normal">Workshop and Competition</label>
          </div>
        </div>
        <p
          v-if="isInvalid.registerFor"
          class="text-normal orange-text error-message"
        >
          * {{ InvalidMessage.registerFor }}
        </p>
      </div>
      <div>
        <h1 class="text-normal">ผลงานที่เคยทำ</h1>
        <textarea
          v-model="user.works"
          name="work"
          id="work"
          cols="30"
          rows="5"
          maxlength="1028"
          :class="cssWorks"
          placeholder="Publication/github/ อื่นๆ"
        ></textarea>
        <p v-if="isInvalid.works" class="text-normal orange-text error-message">
          * {{ InvalidMessage.works }}
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
            maxlength="255"
            type="text"
            placeholder="โปรดระบุสาขาที่สนใจ"
          />
          <p
            v-if="isInvalid.workInterest"
            class="text-normal orange-text error-message"
          >
            * {{ InvalidMessage.workInterest }}
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
            maxlength="255"
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
            maxlength="255"
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
            maxlength="255"
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
            maxlength="255"
            type="text"
            placeholder="ระบุเรื่องที่เชี่ยวชาญ โดยใช้ , กั้น"
          />
          <p
            v-if="isInvalid.skill"
            class="text-normal orange-text error-message"
          >
            * {{ InvalidMessage.skill }}
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
import User from "../../models/user.model";
import UserService from "../../services/user.service";

export default {
  props: ["user"],
  data() {
    return {
      isFormFilled: false,
      isInvalid: {
        ...new User(false),
        workInterest: false,
        skill: false,
      },
      InvalidMessage: {
        ...new User(false),
        workInterest: false,
        skill: false,
      },
      duplicateEmail: false,
    };
  },
  computed: {
    cssNextT() {
      return this.checkForm()
        ? "text-normal purple-text"
        : "text-normal l-grey-text";
    },
    cssNextB() {
      return this.checkForm() ? "btn-white" : "btn-grey";
    },
    cssTitleName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.titleName) {
        return error;
      }
      return complete;
    },
    cssFirstName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.firstName) {
        return error;
      }
      return complete;
    },
    cssLastName() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.lastName) {
        return error;
      }
      return complete;
    },
    cssEducation() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.education) {
        return error;
      }
      return complete;
    },
    cssInstitution() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.institution) {
        return error;
      }
      return complete;
    },
    cssOrganization() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.organization) {
        return error;
      }
      return complete;
    },
    cssAddress() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.address) {
        return error;
      }
      return complete;
    },
    cssCountry() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.country) {
        return error;
      }
      return complete;
    },
    cssPhone() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.phone) {
        return error;
      }
      return complete;
    },
    cssEmail() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.email) {
        return error;
      }
      return complete;
    },
    cssWorks() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (this.isInvalid.works) {
        return error;
      }
      return complete;
    },
    cssWorkInterest() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.isInvalid.workInterest &&
        this.user.isWorkInterest &&
        !this.user.interestField
      ) {
        return error;
      }
      return complete;
    },
    cssProgSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.isInvalid.skill &&
        this.user.hasProgSkill &&
        !this.user.progSkillList
      ) {
        return error;
      }
      return complete;
    },
    cssChemSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.isInvalid.skill &&
        this.user.hasChemSkill &&
        !this.user.chemSkillList
      ) {
        return error;
      }
      return complete;
    },
    cssMachineLSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.isInvalid.skill &&
        this.user.hasMachineLSkill &&
        !this.user.machineLSkillList
      ) {
        return error;
      }
      return complete;
    },
    cssOtherSkill() {
      let error = "input-box text-normal error-input-box";
      let complete = "input-box text-normal";
      if (
        this.isInvalid.skill &&
        this.user.hasOtherSkill &&
        !this.user.otherSkillList
      ) {
        return error;
      }
      return complete;
    },
  },
  watch: {
    "user.firstName": function () {
      this.isInvalid.firstName = false;
      this.InvalidMessage.firstName = "";
    },
    "user.lastName": function () {
      this.isInvalid.lastName = false;
      this.InvalidMessage.lastName = "";
    },
    "user.institution": function () {
      this.isInvalid.institution = false;
      this.InvalidMessage.institution = "";
    },
    "user.organization": function () {
      this.isInvalid.organization = false;
      this.InvalidMessage.organization = "";
    },
    "user.address": function () {
      this.isInvalid.address = false;
      this.InvalidMessage.address = "";
    },
    "user.country": function () {
      this.isInvalid.country = false;
      this.InvalidMessage.country = "";
    },
    "user.phone": function () {
      this.isInvalid.phone = false;
      this.InvalidMessage.phone = "";
    },
    "user.email": function () {
      this.isInvalid.email = false;
      this.InvalidMessage.email = "";
    },
    "user.works": function () {
      this.isInvalid.works = false;
      this.InvalidMessage.works = "";
    },
    "user.isWorkInterest": function () {
      this.isInvalid.workInterest = false;
      this.InvalidMessage.workInterest = "";
      if (this.user.isWorkInterest == "true") {
        this.user.isWorkInterest = true;
        document.getElementById("workInterestBox").disabled = false;
      } else if (this.user.isWorkInterest == "false") {
        this.user.isWorkInterest = false;
        this.user.interestField = undefined;
        document.getElementById("workInterestBox").disabled = true;
      }
    },
    "user.interestField": function () {
      this.isInvalid.workInterest = false;
      this.InvalidMessage.workInterest = "";
    },
    "user.hasProgSkill": function () {
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
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
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
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
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
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
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
      if (this.user.hasOtherSkill) {
        document.getElementById("otherBox").disabled = false;
      } else {
        this.user.otherSkillList = undefined;
        document.getElementById("otherBox").disabled = true;
      }
    },
    "user.registerFor": function () {
      this.isInvalid.registerFor = false;
      this.InvalidMessage.registerFor = "";
    },
    "user.progSkillList": function () {
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
    },
    "user.chemSkillList": function () {
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
    },
    "user.machineLSkillList": function () {
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
    },
    "user.otherSkillList": function () {
      this.isInvalid.skill = false;
      this.InvalidMessage.skill = "";
    },
  },
  methods: {
    agreementClick() {
      this.$store.dispatch("page/setPage", "agreement");
    },
    registerNext() {
      if (this.validateForm() && !this.isInvalid.email) {
        this.$store.dispatch("page/setPage", "info");
      }
    },
    checkDuplicated() {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(this.user.email)) {
        UserService.checkDuplicated({ email: this.user.email }).then((res) => {
          if (res.status == 200) {
            this.duplicateEmail = res.data.isFound;
            if (res.data.isFound) {
              this.isInvalid.email = true;
              this.InvalidMessage.email = "E-mail มีในระบบแล้ว";
            }
          } else {
            console.log("Something wrong!");
          }
        });
      } else {
        this.isInvalid.email = true;
        this.InvalidMessage.email = "โปรดระบุ E-mail ให้ถูกต้อง";
      }
    },
    checkForm() {
      let check = !this.user.titleName
        ? false
        : !this.user.firstName
        ? false
        : !this.user.lastName
        ? false
        : !this.user.education
        ? false
        : !this.user.institution
        ? false
        : !this.user.organization
        ? false
        : !this.user.address
        ? false
        : !this.user.country
        ? false
        : !this.user.phone
        ? false
        : !this.user.email
        ? false
        : !this.user.works
        ? false
        : this.user.isWorkInterest == null
        ? false
        : this.user.isWorkInterest && !this.user.interestField
        ? false
        : this.user.hasProgSkill &&
          (!this.user.progSkillLevel || !this.user.progSkillList)
        ? false
        : this.user.hasChemSkill &&
          (!this.user.chemSkillLevel || !this.user.chemSkillList)
        ? false
        : this.user.hasMachineLSkill &&
          (!this.user.machineLSkillLevel || !this.user.machineLSkillList)
        ? false
        : this.user.hasOtherSkill && !this.user.otherSkillList
        ? false
        : !this.user.registerFor
        ? false
        : true;
      return check;
    },
    validateForm() {
      this.isFormFilled = true;
      if (!this.user.titleName) {
        this.isInvalid.titleName = true;
        this.InvalidMessage.titleName = "โปรดระบุคำนำหน้า";
        this.isFormFilled = false;
      }
      if (!this.user.firstName) {
        this.isInvalid.firstName = true;
        this.InvalidMessage.firstName = "โปรดระบุชื่อ";
        this.isFormFilled = false;
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(this.user.firstName)) {
        this.isInvalid.firstName = true;
        this.InvalidMessage.firstName = "โปรดระบุชื่อให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.lastName) {
        this.isInvalid.lastName = true;
        this.InvalidMessage.lastName = "โปรดระบุนามสกุล";
        this.isFormFilled = false;
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(this.user.lastName)) {
        this.isInvalid.lastName = true;
        this.InvalidMessage.lastName = "โปรดระบุนามสกุลให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.education) {
        this.isInvalid.education = true;
        this.InvalidMessage.education = "โปรดระบุระดับการศึกษาสูงสุด";
        this.isFormFilled = false;
      }
      if (!this.user.institution) {
        this.isInvalid.institution = true;
        this.InvalidMessage.institution = "โปรดระบุสถานศึกษา";
        this.isFormFilled = false;
      }
      if (!this.user.organization) {
        this.isInvalid.organization = true;
        this.InvalidMessage.organization = "โปรดระบุสังกัด";
        this.isFormFilled = false;
      }
      if (!this.user.address) {
        this.isInvalid.address = true;
        this.InvalidMessage.address = "โปรดระบุที่อยู่";
        this.isFormFilled = false;
      }
      if (!this.user.country) {
        this.isInvalid.country = true;
        this.InvalidMessage.country = "โปรดระบุประเทศ";
        this.isFormFilled = false;
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(this.user.country)) {
        this.isInvalid.country = true;
        this.InvalidMessage.country = "โปรดระบุประเทศให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.phone) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์";
        this.isFormFilled = false;
      } else if (this.user.phone.length < 9 || this.user.phone.length > 15) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์ให้ครบ";
        this.isFormFilled = false;
      } else if (/[^+^0-9]/.test(this.user.phone)) {
        this.isInvalid.phone = true;
        this.InvalidMessage.phone = "โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง";
        this.isFormFilled = false;
      }
      if (!this.user.email) {
        this.isInvalid.email = true;
        this.InvalidMessage.email = "โปรดระบุ E-mail";
        this.isFormFilled = false;
      }
      if (!this.user.works) {
        this.isInvalid.works = true;
        this.InvalidMessage.works = "โปรดระบุผลงานที่เคยทำ";
        this.isFormFilled = false;
      }
      if (this.user.isWorkInterest == null) {
        this.isInvalid.workInterest = true;
        this.InvalidMessage.workInterest = "โปรดระบุความสนใจ";
        this.isFormFilled = false;
      }
      if (this.user.isWorkInterest && !this.user.interestField) {
        this.isInvalid.workInterest = true;
        this.InvalidMessage.workInterest = "โปรดระบุสาขาที่สนใจ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasProgSkill &&
        (!this.user.progSkillLevel || !this.user.progSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุภาษาที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasChemSkill &&
        (!this.user.chemSkillLevel || !this.user.chemSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (
        this.user.hasMachineLSkill &&
        (!this.user.machineLSkillLevel || !this.user.machineLSkillList)
      ) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (this.user.hasOtherSkill && !this.user.otherSkillList) {
        this.isInvalid.skill = true;
        this.InvalidMessage.skill = "โปรดระบุเรื่องที่เชี่ยวชาญ";
        this.isFormFilled = false;
      }
      if (!this.user.registerFor) {
        this.isInvalid.registerFor = true;
        this.InvalidMessage.registerFor = "โปรดระบุความสนใจ";
        this.isFormFilled = false;
      }
      return this.isFormFilled;
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

#registerfor-section {
  margin-top: 5px;
}

.registerfor-radio {
  padding-top: 10px;
  padding-bottom: 10px;
}

.registerfor-radio > div > input {
  margin-right: 10px;
}

.registerfor-radio > div {
  margin: 10px 0px;
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

  #invite-checkbox > div {
    margin: 10px 0px;
  }

  .skill-checkbox > div {
    margin: 10px 0px;
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
