const fs = require("fs");
const mysql = require("mysql");

const dbConfig = require("./../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: dbConfig.multipleStatements,
});

connection.connect((err) => {
  if (err) throw err;

  console.log(
    `Successfully connected to ${dbConfig.DB} database on port ${dbConfig.PORT}.`
  );

  connection.query(fs.readFileSync("./app/database/tables.sql").toString()),
    (err, res) => {
      if (err) throw err;

      console.log("Successfully created tables in the database.");
    };
});

module.exports = connection;
