export default class User {
  constructor(user) {
    this.user_id = user.user_id;
    this.email = user.email;
    this.displayName = user.displayName;
    this.password = user.password;
    this.titleName = user.titleName;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.education = user.education;
    this.institution = user.institution;
    this.organization = user.organization;
    this.address = user.address;
    this.country = user.country;
    this.works = user.works;
    this.isWorkInterest = user.isWorkInterest;
    this.interestField = user.interestField;
    this.hasProgSkill = user.hasProgSkill;
    this.progSkillLevel = user.progSkillLevel;
    this.progSkillList = user.progSkillList;
    this.hasChemSkill = user.hasChemSkill;
    this.chemSkillLevel = user.chemSkillLevel;
    this.chemSkillList = user.chemSkillList;
    this.hasMachineLSkill = user.hasMachineLSkill;
    this.machineLSkillLevel = user.machineLSkillLevel;
    this.machineLSkillList = user.machineLSkillList;
    this.hasOtherSkill = user.hasOtherSkill;
    this.otherSkillList = user.otherSkillList;
    this.registerFor = user.registerFor;
    this.hasTeam = user.hasTeam;
    this.role = user.role;
    this.lastLogin = user.lastLogin;
    this.created_at = user.created_at;
    this.updated_at = user.updated_at;
  }
}
