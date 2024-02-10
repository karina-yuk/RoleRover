const inquirer = require(`inquirer`);
// Import and require mysql2
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "password", //
    database: "rolerover_db",
  },
  console.log(`Connected to the rolerover_db database.`)
);

// Prompts of questions for user input

const dbActions = [
  {
    type: "list",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee Role",
      "",
    ],
    message: "What would you like to do?",
    name: "action",
  },
];

// Prompts for adding a new department

const addDep = [
  {
    type: "input",
    message: "What is the name of the department?",
    name: "department",
  },
];

// Function for getting employee list

function employeeList() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT CONCAT(first_name, ' ', last_name) AS name
    FROM employee;`;

    db.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        const managerList = result.map((row) => row.name);
        resolve(managerList);
      }
    });
  });
}

// Function for getting employee ID

function employeeID(name) {
  return new Promise((resolve, reject) => {
    if (name === "None") {
      resolve(null);
    }

    const first = name.split(" ")[0];
    const last = name.split(" ")[1];
    const sql = `SELECT id FROM employee 
    WHERE first_name="${first}"
    AND last_name="${last}"`;

    db.query(sql, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function dbStart() {
  inquirer.prompt(dbActions).then((responses) => {
    const systemAction = responses.action;

    // If user selects "Exit" it will end inquirer

    if (systemAction === "Exit") {
      process.exit();

      // If user selects "View All Employees" it view the employee table
    } else if (systemAction === "View All Employees") {
      const sql = `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
          FROM (((employee e
          LEFT JOIN employee m ON e.manager_id = m.id)
          INNER JOIN role ON role.id = e.role_id) 
          INNER JOIN department ON role.department_id = department.id)
          ORDER BY id`;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);

        dbStart();
      });

      // If user selects "View All Departments" it view the department table
    } else if (systemAction === "View All Departments") {
      const sql = `SELECT * FROM department;`;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);

        dbStart();
      });

      // If user selects "View All Roles" it view the role table
    } else if (systemAction === "View All Roles") {
      const sql = `SELECT role.id, role.title, department.name, role.salary FROM role
          INNER JOIN department ON role.department_id = department.id;`;

      db.query(sql, function (err, result) {
        if (err) throw err;
        console.table(result);

        dbStart();
      });

      // If user selects "Add Department" they can add a new department
    } else if (systemAction === "Add Department") {
      inquirer.prompt(addDep).then((responses) => {
        const dep = JSON.stringify(responses.department);
        const sql = `INSERT INTO department (name)
              VALUES (${dep})`;

        db.query(sql, function (err, result) {
          if (err) throw err;
        });
        console.log(`Success! Added ${dep} to the database`);

        dbStart();
      });
    }},
    )}