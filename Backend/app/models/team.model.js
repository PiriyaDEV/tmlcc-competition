const sql = require("./../database/db.connection");

const Team = function (team) {
  this.team_id = team.team_id;
  this.teamName = team.teamName;
  this.leader_id = team.leader_id;
  this.status = team.status;
  this.createdAt = team.createdAt;
  this.updatedAt = team.updatedAt;
};

Team.create = (team, result) => {
  sql.query("INSERT INTO Teams SET ?", team, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new team created -> ${team.team_id}`);
    result(null, team);
    return;
  });
};

Team.update = (team, result) => {
  sql.query(
    `UPDATE Teams SET ? WHERE team_id = '${team.team_id}'`,
    team,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: team updated -> ${team.team_id}`);
      result(null, team);
      return;
    }
  );
};

Team.getCount = (result) => {
  sql.query("SELECT COUNT(*) AS count FROM Teams", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: ${res[0].count} team(s)`);
    result(null, res[0].count);
    return;
  });
};

module.exports = Team;
