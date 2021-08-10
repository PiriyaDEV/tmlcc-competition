const sql = require("../database/db.connection");

const User = function (user) {
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
  this.hasTeam = user.hasTeam;
  this.role = user.role;
  this.lastLogin = user.lastLogin;
  this.createdAt = user.createdAt;
  this.updatedAt = user.updatedAt;
};

User.create = (user, result) => {
  sql.query("INSERT INTO Users SET ?", user, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new user created -> ${user.user_id}`);
    result(null, user);
    return;
  });
};

User.update = (user, result) => {
  user.updatedAt = Date.now();

  sql.query(
    `UPDATE Users SET ? WHERE 
      user_id = '${user.user_id}'`,
    user,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: user updated -> ${user.user_id}`);
      result(null, user);
      return;
    }
  );
};

User.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Users", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} user(s)`);
    result(null, res[0].count);
    return;
  });
};

User.find = (user, result) => {
  sql.query(
    `SELECT * FROM Users WHERE
      user_id = '${user.user_id}' OR
      email = '${user.email}' OR
      displayName = '${user.displayName}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: user not found");
        result(null, { isFound: false });
        return;
      }

      console.log(`Result: user found -> ${res[0].user_id}`);
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

module.exports = User;
