const fs = require("fs");
const mysql = require("mysql2");

const dbConfig = require("../config/db.config");

const config = {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: dbConfig.MULTIPLE_STATEMENTS,
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.log("Error when connecting to database: ", err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on("error", (err) => {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    handleDisconnect();
  }

  console.log(
    `Successfully connected to ${dbConfig.DB} database on port ${dbConfig.PORT}.`
  );
});

module.exports = connection;
