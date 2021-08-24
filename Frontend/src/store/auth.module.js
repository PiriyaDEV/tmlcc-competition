import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import decode from "jwt-decode";

export default {
  namespaced: true,
  state: {
    statusButton: false,
    agree: false,
    user:
      localStorage.getItem("accessToken") != null
        ? decode(localStorage.getItem("accessToken"))
        : { user_id: "", displayName: "" },
    role: "",
    loginStatus: {
      email: {
        isInvalid: false,
        message: "",
      },
      password: {
        isInvalid: false,
        message: "",
      },
      isAuthenticated: !!localStorage.getItem("accessToken"),
    },
    registerStatus: {
      readyToNext: true,
      readyToCreate: true,
      isSuccess: false,
      email: {
        isInvalid: false,
        message: "",
      },
      displayName: {
        isInvalid: false,
        message: "",
      },
      password: {
        isInvalid: false,
        message: "",
      },
      confirmPassword: {
        isInvalid: false,
        message: "",
      },
      hasTeam: {
        isInvalid: false,
        message: "",
      },
      titleName: {
        isInvalid: false,
        message: "",
      },
      firstName: {
        isInvalid: false,
        message: "",
      },
      lastName: {
        isInvalid: false,
        message: "",
      },
      phone: {
        isInvalid: false,
        message: "",
      },
      education: {
        isInvalid: false,
        message: "",
      },
      institution: {
        isInvalid: false,
        message: "",
      },
      organization: {
        isInvalid: false,
        message: "",
      },
      address: {
        isInvalid: false,
        message: "",
      },
      country: {
        isInvalid: false,
        message: "",
      },
      works: {
        isInvalid: false,
        message: "",
      },
      workInterest: {
        isInvalid: false,
        message: "",
      },
      skill: {
        isInvalid: false,
        prog: {
          isInvalid: false,
        },
        chem: {
          isInvalid: false,
        },
        machine: {
          isInvalid: false,
        },
        other: {
          isInvalid: false,
        },
        message: "",
      },
    },
  },
  getters: {
    getAgreeCheck(state) {
      return state.agree;
    },
    getUserId(state) {
      return state.user.user_id;
    },
    getDisplayName(state) {
      return state.user.displayName;
    },
    getRole(state) {
      return state.role;
    },
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getRegisterStatus(state) {
      return state.registerStatus;
    },
    getCheckStatus(state) {
      return state.statusButton;
    },
  },
  mutations: {
    checkAlready(state, value) {
      state.statusButton = value;
    },
    setReady(state, value) {
      state.registerStatus.readyToNext = value;
    },
    resetLoginStatus(state) {
      state.user = {};
      state.role = "";
      state.loginStatus.email.isInvalid = false;
      state.loginStatus.email.message = "";
      state.loginStatus.password.isInvalid = false;
      state.loginStatus.password.message = "";
      state.loginStatus.isAuthenticated = false;
    },
    resetProfileStatus(state) {
      state.registerStatus.email.isInvalid = false;
      state.registerStatus.email.message = "";
      state.registerStatus.titleName.isInvalid = false;
      state.registerStatus.titleName.message = "";
      state.registerStatus.firstName.isInvalid = false;
      state.registerStatus.firstName.message = "";
      state.registerStatus.lastName.isInvalid = false;
      state.registerStatus.lastName.message = "";
      state.registerStatus.phone.isInvalid = false;
      state.registerStatus.phone.message = "";
      state.registerStatus.education.isInvalid = false;
      state.registerStatus.education.message = "";
      state.registerStatus.institution.isInvalid = false;
      state.registerStatus.institution.message = "";
      state.registerStatus.organization.isInvalid = false;
      state.registerStatus.organization.message = "";
      state.registerStatus.address.isInvalid = false;
      state.registerStatus.address.message = "";
      state.registerStatus.country.isInvalid = false;
      state.registerStatus.country.message = "";
      state.registerStatus.works.isInvalid = false;
      state.registerStatus.works.message = "";
      state.registerStatus.workInterest.isInvalid = false;
      state.registerStatus.workInterest.message = "";
      state.registerStatus.skill.isInvalid = false;
      state.registerStatus.skill.prog.isInvalid = false;
      state.registerStatus.skill.message = "";
      state.registerStatus.skill.chem.isInvalid = false;
      state.registerStatus.skill.message = "";
      state.registerStatus.skill.machine.isInvalid = false;
      state.registerStatus.skill.message = "";
      state.registerStatus.skill.other.isInvalid = false;
      state.registerStatus.skill.message = "";
      state.registerStatus.readyToNext = true;
    },
    resetAccountStatus(state) {
      state.registerStatus.hasTeam.isInvalid = false;
      state.registerStatus.hasTeam.message = "";
      state.registerStatus.displayName.isInvalid = false;
      state.registerStatus.displayName.message = "";
      state.registerStatus.password.isInvalid = false;
      state.registerStatus.password.message = "";
      state.registerStatus.confirmPassword.isInvalid = false;
      state.registerStatus.confirmPassword.message = "";
      state.registerStatus.readyToCreate = true;
    },
    setAuth(state, user) {
      state.user = user;
      state.loginStatus.isAuthenticated = true;
      localStorage.setItem("accessToken", user.token);
    },
    clearAuth() {
      localStorage.removeItem("accessToken");
    },
    setAgreeCheck(state, agree) {
      state.agree = agree;
    },
    setInvalidEmail(state, message) {
      state.loginStatus.email.isInvalid = true;
      state.loginStatus.email.message = message;
      state.loginStatus.isAuthenticated = false;
    },
    setInvalidPassword(state, message) {
      state.loginStatus.password.isInvalid = true;
      state.loginStatus.password.message = message;
      state.loginStatus.isAuthenticated = false;
    },
    setInvalidRegisterPassword(state, message) {
      state.registerStatus.password.isInvalid = true;
      state.registerStatus.password.message = message;
      state.registerStatus.readyToCreate = false;
    },
    setInvalidConfirmPassword(state, message) {
      state.registerStatus.confirmPassword.isInvalid = true;
      state.registerStatus.confirmPassword.message = message;
      state.registerStatus.readyToCreate = false;
    },
    setInvalidHasTeam(state, message) {
      state.registerStatus.hasTeam.isInvalid = true;
      state.registerStatus.hasTeam.message = message;
      state.registerStatus.readyToCreate = false;
    },
    setInvalidRegisterEmail(state, message) {
      state.registerStatus.email.isInvalid = true;
      state.registerStatus.email.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidDisplayName(state, message) {
      state.registerStatus.displayName.isInvalid = true;
      state.registerStatus.displayName.message = message;
      state.registerStatus.readyToCreate = false;
    },
    setInvalidTitleName(state, message) {
      state.registerStatus.titleName.isInvalid = true;
      state.registerStatus.titleName.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidFirstName(state, message) {
      state.registerStatus.firstName.isInvalid = true;
      state.registerStatus.firstName.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidLastName(state, message) {
      state.registerStatus.lastName.isInvalid = true;
      state.registerStatus.lastName.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidPhone(state, message) {
      state.registerStatus.phone.isInvalid = true;
      state.registerStatus.phone.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidEducation(state, message) {
      state.registerStatus.education.isInvalid = true;
      state.registerStatus.education.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidInstitution(state, message) {
      state.registerStatus.institution.isInvalid = true;
      state.registerStatus.institution.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidOrganization(state, message) {
      state.registerStatus.organization.isInvalid = true;
      state.registerStatus.organization.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidAddress(state, message) {
      state.registerStatus.address.isInvalid = true;
      state.registerStatus.address.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidCountry(state, message) {
      state.registerStatus.country.isInvalid = true;
      state.registerStatus.country.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidWorks(state, message) {
      state.registerStatus.works.isInvalid = true;
      state.registerStatus.works.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidWorkInterest(state, message) {
      state.registerStatus.workInterest.isInvalid = true;
      state.registerStatus.workInterest.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidSkill(state, message) {
      state.registerStatus.skill.isInvalid = true;
      state.registerStatus.skill.message = message;
      state.registerStatus.readyToNext = false;
    },
    setInvalidProgSkill(state) {
      state.registerStatus.skill.prog.isInvalid = true;
      state.registerStatus.readyToNext = false;
    },
    setInvalidChemSkill(state) {
      state.registerStatus.skill.chem.isInvalid = true;
      state.registerStatus.readyToNext = false;
    },
    setInvalidMachineSkill(state) {
      state.registerStatus.skill.machine.isInvalid = true;
      state.registerStatus.readyToNext = false;
    },
    setInvalidOtherSkill(state) {
      state.registerStatus.skill.other.isInvalid = true;
      state.registerStatus.readyToNext = false;
    },
    setRegisterSuccess(state) {
      state.registerStatus.isSuccess = true;
    },
    setRole(state, role) {
      state.role = role;
    },
  },
  actions: {
    setAgreeCheck({ commit }, agree) {
      commit("setAgreeCheck", agree);
    },
    resetLoginStatus({ commit }) {
      commit("resetLoginStatus");
    },
    resetProfileStatus({ commit }) {
      commit("resetProfileStatus");
    },
    async login({ commit }, user) {
      commit("resetLoginStatus");
      if (!user.email) {
        commit("setInvalidEmail", "โปรดระบุชื่อผู้ใช้งาน");
        return;
      } else if (!user.password) {
        commit("setInvalidPassword", "โปรดระบุรหัสผ่าน");
        return;
      }
      await AuthService.login(user)
        .then((res) => {
          if (res.status == 200) {
            console.log("Logged in!");
            commit("setAuth", res.data);
          } else if (
            res.status == 403 &&
            res.data.message == "User not found!"
          ) {
            console.log(res.data.message);
            commit("setInvalidEmail", "ไม่พบผู้ใช้งาน");
          } else if (
            res.status == 403 &&
            res.data.message == "Invalid password!"
          ) {
            console.log(res.data.message);
            commit("setInvalidPassword", "รหัสผ่านไม่ถูกต้อง");
          }
        })
        .catch((err) => {
          console.log(err);
          commit("setInvalidEmail", "ไม่พบผู้ใช้งาน");
        });
    },
    async validateProfile({ commit }, user) {
      commit("resetProfileStatus");
      if (!user.email) {
        commit("setInvalidRegisterEmail", "โปรดระบุ E-mail");
      } else if (
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(user.email)
      ) {
        commit("setInvalidRegisterEmail", "E-mail ไม่ถูกต้อง");
      } else {
        await UserService.checkDuplicated({ email: user.email })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.isFound) {
                commit("setInvalidRegisterEmail", "E-mail นี้มีผู้ใช้แล้ว");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (!user.titleName) {
        commit("setInvalidTitleName", "โปรดระบุคำนำหน้า");
      }
      if (!user.firstName) {
        commit("setInvalidFirstName", "โปรดระบุชื่อจริง");
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(user.firstName)) {
        commit("setInvalidFirstName", "โปรดระบุชื่อจริงให้ถูกต้อง");
      }
      if (!user.lastName) {
        commit("setInvalidLastName", "โปรดระบุนามสกุล");
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(user.lastName)) {
        commit("setInvalidLastName", "โปรดระบุนามสกุลให้ถูกต้อง");
      }
      if (!user.education) {
        commit("setInvalidEducation", "โปรดระบุระดับการศึกษาสูงสุด");
      }
      if (!user.institution) {
        commit("setInvalidInstitution", "โปรดระบุสถานศึกษา");
      }
      if (!user.organization) {
        commit("setInvalidOrganization", "โปรดระบุสังกัด");
      }
      if (!user.address) {
        commit("setInvalidAddress", "โปรดระบุที่อยู่");
      }
      if (!user.country) {
        commit("setInvalidCountry", "โปรดระบุประเทศ");
      } else if (/[0-9๐-๙!-/:-@[-`{-~]/.test(user.country)) {
        commit("setInvalidCountry", "โปรดระบุประเทศให้ถูกต้อง");
      }
      if (!user.phone) {
        commit("setInvalidPhone", "โปรดระบุเบอร์โทรศัพท์");
      } else if (/[^+^0-9]/.test(user.phone)) {
        commit("setInvalidPhone", "โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง");
      } else if (user.phone.length < 9 || user.phone.length > 11) {
        commit("setInvalidPhone", "โปรดระบุเบอร์โทรศัพท์ให้ถูกต้อง");
      }
      if (!user.email) {
        commit("setInvalidEmail", "โปรดระบุอีเมล");
      }
      if (!user.works) {
        commit("setInvalidWorks", "โปรดระบุผลงาน");
      }
      if (user.isWorkInterest == null) {
        commit("setInvalidWorkInterest", "โปรดระบุความสนใจ");
      }
      if (user.isWorkInterest && !user.interestField) {
        commit("setInvalidWorkInterest", "โปรดระบุสาขาที่สนใจ");
      }
      if (
        !user.hasProgSkill &&
        !user.hasChemSkill &&
        !user.hasMachineLSkill &&
        !user.hasOtherSkill
      ) {
        commit("setInvalidSkill", "โปรดระบุทักษะที่ถนัด");
      }
      if (user.hasProgSkill && (!user.progSkillLevel || !user.progSkillList)) {
        commit("setInvalidSkill", "โปรดระบุภาษา");
        commit("setInvalidProgSkill");
      }
      if (user.hasChemSkill && (!user.chemSkillLevel || !user.chemSkillList)) {
        commit("setInvalidSkill", "โปรดระบุเรื่องที่เชี่ยวชาญ");
        commit("setInvalidChemSkill");
      }
      if (
        user.hasMachineLSkill &&
        (!user.machineLSkillLevel || !user.machineLSkillList)
      ) {
        commit("setInvalidSkill", "โปรดระบุเรื่องที่เชี่ยวชาญ");
        commit("setInvalidMachineSkill");
      }
      if (user.hasOtherSkill && !user.otherSkillList) {
        commit("setInvalidSkill", "โปรดระบุทักษะอื่นๆ");
        commit("setInvalidOtherSkill");
      }
    },
    async validateAccount({ commit }, user) {
      commit("resetAccountStatus");
      if (!user.hasTeam == null) {
        commit("setInvalidHasTeam", "โปรดระบุคำตอบ");
      }
      if (!user.displayName) {
        commit("setInvalidDisplayName", "โปรดระบุ Display Name");
      } else if (user.displayName.length < 3) {
        commit("setInvalidDisplayName", "ต้องมีอย่างน้อย 3 ตัวอักษร");
      } else if (/[^A-Za-z0-9_.ก-๛]/.test(user.displayName)) {
        commit(
          "setInvalidDisplayName",
          "ตัวอักษร A-Z, a-z, 0-9, _, ., ก-ฮ เท่านั้น"
        );
      } else {
        await UserService.checkDuplicated({ displayName: user.displayName })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.isFound) {
                commit("setInvalidDisplayName", "ชื่อนี้มีผู้ใช้แล้ว");
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (!user.password) {
        commit("setInvalidRegisterPassword", "โปรดระบุรหัสผ่าน");
      } else if (user.password.length < 8) {
        commit("setInvalidRegisterPassword", "รหัสผ่านต้องมีอย่างน้อย 8 ตัว");
      }
      if (!user.confirmPassword) {
        commit("setInvalidConfirmPassword", "โปรดยืนยันรหัสผ่าน");
      } else if (user.confirmPassword != user.password) {
        commit("setInvalidConfirmPassword", "รหัสผ่านไม่ตรงกัน");
      }
    },
    async register({ state, commit }, user) {
      if (state.registerStatus.readyToCreate) {
        await AuthService.register(user).then((res) => {
          if (res.status == 201) {
            console.log("Register success!");
            commit("resetAccountStatus");
            commit("setRegisterSuccess");
          } else {
            console.log("Something wrong!");
          }
        });
      }
    },
    logout({ commit }) {
      commit("clearAuth");
    },
    checkInput({ commit }, user) {
      if (!user.titleName) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.firstName) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.lastName) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.education) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.institution) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.organization) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.address) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.country) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.phone) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.email) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (!user.works) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (user.isWorkInterest == null) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (user.isWorkInterest && !user.interestField) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (
        !user.hasProgSkill &&
        !user.hasChemSkill &&
        !user.hasMachineLSkill &&
        !user.hasOtherSkill
      ) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (
        user.hasProgSkill &&
        (!user.progSkillLevel || !user.progSkillList)
      ) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (
        user.hasChemSkill &&
        (!user.chemSkillLevel || !user.chemSkillList)
      ) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (
        user.hasMachineLSkill &&
        (!user.machineLSkillLevel || !user.machineLSkillList)
      ) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else if (user.hasOtherSkill && !user.otherSkillList) {
        commit("checkAlready", false);
        commit("setReady", false);
      } else {
        commit("checkAlready", true);
      }
    },
    async fetchRole({ commit, getters }) {
      let user_id = getters.getUserId;
      let role = getters.getRole;

      if (!user_id) {
        console.log("User ID not found!");
        return;
      }
      if (!role) {
        await UserService.getRole({ user_id })
          .then((res) => {
            if (res.status == 200) {
              commit("setRole", res.data.role);
            } else {
              console.log("Something wrong!");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
