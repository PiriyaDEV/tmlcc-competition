const sql = require("../database/db.connection");

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
  team.updatedAt = Date.now();

  sql.query(
    `UPDATE Teams SET ? WHERE 
      team_id = '${team.team_id}'`,
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

Team.find = (team, result) => {
  sql.query(
    `SELECT * FROM Teams WHERE
      team_id = '${team.team_id}' OR
      teamName = '${team.teamName}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: team not found");
        result(null, { isFound: false });
        return;
      }

      console.log(`Result: team found -> ${res[0].team_id}`);
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

Team.checkLeader = (user, result) => {
  sql.query(
    `SELECT
         leader_id
     FROM
         Teams
     WHERE
         leader_id = '${user.user_id}'
         AND status = 'active'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: not a leader");
        result(null, false);
        return;
      }

      console.log(`Result: user -> ${user.user_id} is a leader`);
      result(null, true);
      return;
    }
  );
};

Team.getAll = (result) => {
  sql.query(
    `SELECT T.team_id, T.teamName,
      IFNULL( (SELECT COUNT(*) FROM TeamMembers TM
        WHERE
         TM.team_id = T.team_id AND 
         TM.status = 'approved'), 0
      ) AS members
     FROM
      Teams T
     WHERE
      T.status = 'active'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} team(s)`);
      result(null, res);
      return;
    }
  );
};

Team.getAllWithStatus = (user, result) => {
  sql.query(
    `SELECT
      T.team_id,
      T.teamName,
      IFNULL(
          (
              SELECT
                  COUNT(*)
              FROM
                  TeamMembers TM
              WHERE
                  TM.team_id = T.team_id
                  AND TM.status = 'approved'
          ),
          0
      ) AS members,
      IFNULL(
          (
              SELECT
                  TM.status
              FROM
                  TeamMembers TM
              WHERE
                  TM.team_id = T.team_id
                  AND TM.member_id = '${user.user_id}'
                  AND TM.status = 'pending'
          ),
          '-'
      ) AS status
  FROM
      Teams T
  WHERE
      T.status = 'active'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: ${res.length} team(s)`);
      result(null, res);
      return;
    }
  );
};

Team.getInfo = (team_id, result) => {
  sql.query(
    `SELECT
      T.team_id,
      T.teamName,
      IFNULL(
          (
              SELECT
                  JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'member_id',
                          TM.member_id,
                          'fullName',
                          CONCAT(U.firstName, ' ', U.lastName)
                      )
                  )
              FROM
                  TeamMembers TM
                  LEFT JOIN Users U ON TM.member_id = U.user_id
              WHERE
                  TM.team_id = T.team_id
                  AND TM.status = 'approved'
          ),
          JSON_ARRAY()
      ) AS members
     FROM
         Teams T
     WHERE
         T.team_id = '${team_id}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`Result: team found -> ${res[0].team_id}`);
      result(null, res[0]);
      return;
    }
  );
};

Team.getInfoForLeader = (team_id, result) => {
  sql.query(
    `SELECT
      T.team_id,
      T.teamName,
      IFNULL(
          (
              SELECT
                  JSON_ARRAYAGG(
                      JSON_OBJECT(
                          'member_id',
                          TM.member_id,
                          'status',
                          TM.status,
                          'fullName',
                          CONCAT(U.firstName, ' ', U.lastName)
                      )
                  )
              FROM
                  TeamMembers TM
                  LEFT JOIN Users U ON TM.member_id = U.user_id
              WHERE
                  TM.team_id = T.team_id
                  AND TM.status IN ('approved', 'pending')
          ),
          JSON_ARRAY()
      ) AS members
    FROM
         Teams T
    WHERE
         T.team_id = '${team_id}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      console.log(`team found -> ${res[0].team_id}`);
      result(null, res[0]);
      return;
    }
  );
};

module.exports = Team;
