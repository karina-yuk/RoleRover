const inquirer = require(`inquirer`);
// Import and require mysql2
const mysql = require("mysql");

// create the connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password", //
    database: "rolerover_db",
  },
  console.log(`Connected to the rolerover_db database.`)
);
