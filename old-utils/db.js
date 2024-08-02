const mysql = require("mysql2");

const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "DB@root123#",
  database: "packsafe_db",
});

if (db) {
  console.log("Connected the successfully");
} else {
  console.log("error to connecting the database", err);
}

module.exports = db.promise();
