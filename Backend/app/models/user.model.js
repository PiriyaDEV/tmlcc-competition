const sql = require("./../database/db.connection");

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  this.email = user.email;
  this.phone = user.phone;
  this.address = user.address;
  this.organization = user.organization;
  this.institute = user.institute;
  this.education = user.education;
  this.offer_trainee = user.offer_trainee;
  this.works = user.works;
};

User.create = (user, result) => {
  sql.query("INSERT INTO User SET ?", user, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Result: ", { id: res.insertId, ...user });
    result(null, user);
    return;
  });
};

User.findByUsername = (user, result) => {
  sql.query(
    `SELECT * FROM User WHERE username = '${user.username}'`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (!res.length) {
        console.log("Result: not found");
        result(null, { isFound: false });
        return;
      }

      console.log("Result: ", res[0]);
      result(null, { isFound: true, ...res[0] });
      return;
    }
  );
};

module.exports = User;
