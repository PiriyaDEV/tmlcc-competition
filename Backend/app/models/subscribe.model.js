const sql = require("../database/db.connection");

const Subscribe = function (subscribe) {
  this.email = subscribe.email;
  this.createdAt = subscribe.createdAt;
};

Subscribe.create = (subscribe, result) => {
  sql.query("INSERT INTO Subscribe SET ?", subscribe, (err, res) => {
    if (err && err.code == "ER_DUP_ENTRY") {
      console.log(`Result: duplicated email -> ${subscribe.email}`);
      result(null, subscribe);
      return;
    }
    else if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    console.log(`Result: new subscribed email created -> ${subscribe.email}`);
    result(null, subscribe);
    return;
  });
};

module.exports = Subscribe;
