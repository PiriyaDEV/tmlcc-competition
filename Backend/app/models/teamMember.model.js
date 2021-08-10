const sql = require("../database/db.connection");

const TeamMember = function (teamMember) {
  this.team_id = teamMember.team_id;
  this.member_id = teamMember.member_id;
  this.status = teamMember.status;
  this.createdAt = teamMember.createdAt;
  this.updatedAt = teamMember.updatedAt;
};

TeamMember.create = (teamMember, result) => {
  sql.query(
    `INSERT INTO TeamMembers SET ?
     ON DUPLICATE KEY UPDATE
     status = '${teamMember.status}',
     updatedAt = ${teamMember.updatedAt}`,
    teamMember,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(
        `Result: new team member ${teamMember.member_id} created in -> ${teamMember.team_id}`
      );
      result(null, teamMember);
      return;
    }
  );
};

TeamMember.update = (teamMember, result) => {
  teamMember.updatedAt = Date.now();

  sql.query(
    `UPDATE TeamMembers SET ? WHERE 
      team_id = '${teamMember.team_id}' AND 
      member_id = '${teamMember.member_id}'`,
    teamMember,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log(res)

      console.log(
        `Result: team member ${teamMember.member_id} updated in -> ${teamMember.team_id}`
      );
      result(null, teamMember);
      return;
    }
  );
};

TeamMember.find = (teamMember, result) => {
  sql.query(
    `SELECT * FROM TeamMembers WHERE
      team_id = '${teamMember.team_id}' AND 
      member_id = '${teamMember.member_id}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: team member not found");
        result(null, { isFound: false });
        return;
      }

      console.log(
        `Result: team member ${teamMember.member_id} found in -> ${res[0].team_id}`
      );
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

module.exports = TeamMember;
