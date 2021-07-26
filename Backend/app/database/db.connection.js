const fs = require("fs");
const mysql = require("mysql");
const dbConfig = require("../config/db.config");

const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: dbConfig.multipleStatements,
});

connection.connect((error) => {
  if (error) throw error;

  console.log(
    `Successfully connected to ${dbConfig.DB} database on port ${dbConfig.PORT}.`
  );

  const tables = fs.readFileSync("./app/database/tables.sql").toString();
  connection.query(tables),
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        return;
      }

      console.log("Successfully created tables in database.");
    };
});

module.exports = connection;
