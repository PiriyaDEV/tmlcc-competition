const sql = require('../database/db.connection');

// constructor
const User = function(user) {
  this.username = user.username
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log("Created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  })
}

module.exports = User;