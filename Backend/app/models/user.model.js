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
  this.registerFor = user.registerFor;
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

User.getAllUsers = (result) => {
  sql.query(
    `SELECT
      U.user_id,
      U.email,
      U.displayName,
      U.firstName,
      U.lastName,
      U.education,
      IFNULL(
          (SELECT
              T.teamName
          FROM
              TeamMembers TM
              LEFT JOIN Teams T ON TM.team_id = T.team_id
          WHERE
              TM.member_id = U.user_id
              AND TM.status = 'approved'),
              '-'
      ) AS teamName
     FROM
         Users U
     WHERE
         U.role = 'user'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} user(s)`);
      result(null, res);
      return;
    }
  );
};

User.getAllStaffs = (result) => {
  sql.query(
    `SELECT
      user_id,
      firstName,
      lastName,
      phone,
      email,
      organization,
      role
     FROM
         Users
     WHERE
         role IN ('editor', 'admin')`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} user(s)`);
      result(null, res);
      return;
    }
  );
};

User.getDataToExport = (result) => {
  sql.query(
    `SELECT
      U.user_id AS 'id',
      U.email AS 'อีเมล',
      U.displayName AS 'ชื่อผู้ใช้',
      U.titleName AS 'คำนำหน้า',
      U.firstName AS 'ชื่อ',
      U.lastName AS 'นามสกุล',
      U.phone AS 'เบอร์โทรศัพท์',
      U.education AS 'ระดับการศึกษาสูงสุด',
      U.institution AS 'สถานศึกษา',
      U.organization AS 'สังกัด',
      U.address AS 'ที่อยู่',
      U.country AS 'ประเทศ',
      U.works AS 'ผลงานที่เคยทำ',
      IF(U.isWorkInterest, 'Yes', 'No') AS 'หากมีข้อเสนอโครงการให้เข้าร่วมทำงาน/ฝึกงานกับบริษัท หรือ องค์กร',
      U.interestField AS 'สาขาที่สนใจ',
      IF(U.hasProgSkill, 'Yes', 'No') AS 'มีทักษะ Programming',
      U.progSkillLevel AS 'ระดับทักษะ Programming',
      U.progSkillList AS 'เรื่องที่เชี่ยวชาญ Programming',
      IF(U.hasChemSkill, 'Yes', 'No') AS 'มีทักษะ Chemistry',
      U.chemSkillLevel AS 'ระดับทักษะ Chemistry',
      U.chemSkillList AS 'เรื่องที่เชี่ยวชาญ Chemistry',
      IF(U.hasMachineLSkill, 'Yes', 'No') AS 'มีทักษะ Machine Learning',
      U.machineLSkillLevel AS 'ระดับทักษะ Machine Learning',
      U.machineLSkillList AS 'เรื่องที่เชี่ยวชาญ Machine Learning',
      IF(U.hasOtherSkill, 'Yes', 'No') AS 'มีทักษะอื่นๆ',
      U.otherSkillList AS 'เรื่องที่เชี่ยวชาญอื่นๆ',
      U.registerFor AS 'ผู้สมัครสนใจเข้าร่วมเพื่อ',
      IFNULL(
          (
              SELECT
                  T.teamName
              FROM
                  TeamMembers TM
                  LEFT JOIN Teams T ON TM.team_id = T.team_id
              WHERE
                  TM.member_id = U.user_id
                  AND TM.status = 'approved'
          ),
          '-'
      ) AS 'ทีม',
      FROM_UNIXTIME(FLOOR(U.lastLogin/1000)) AS 'เข้าสู่ระบบครั้งล่าสุด',
      FROM_UNIXTIME(FLOOR(U.createdAt/1000)) AS 'เวลาที่ลงสมัคร',
      FROM_UNIXTIME(FLOOR(U.updatedAt/1000)) AS 'เวลาที่อัพเดทครั้งล่าสุด'
     FROM
        Users U
     WHERE
        U.role = 'user'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} user(s)`);
      result(null, res);
      return;
    }
  );
};

User.getInfo = (user, result) => {
  sql.query(
    `SELECT email,
      user_id,
      displayName,
      titleName,
      firstName,
      lastName,
      phone,
      address,
      education,
      institution,
      organization,
      country,
      works,
      isWorkInterest,
      interestField,
      hasProgSkill,
      progSkillLevel,
      progSkillList,
      hasChemSkill,
      chemSkillLevel,
      chemSkillList,
      hasMachineLSkill,
      machineLSkillLevel,
      machineLSkillList,
      hasOtherSkill,
      otherSkillList,
      registerFor
     FROM Users WHERE
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
      result(null, { isFound: true, user: res[0] });
      return;
    }
  );
};

User.updateHasTeam = (team_id, result) => {
  let user = {
    hasTeam: false,
    updatedAt: Date.now(),
  };

  sql.query(
    `UPDATE
        Users
     SET
         ?
     WHERE
         user_id IN (
             SELECT
                 member_id
             FROM
                 TeamMembers
             WHERE
                 team_id = '${team_id}'
                 AND status = 'approved'
         )`,
    user,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: users from team -> ${team_id} have been updated to no team`);
      result(null, team_id);
      return;
    }
  );
};

module.exports = User;
