const mysql = require('mysql2');
const db = require('./db/connection')
const utils = require('util');
const inquirer = require('inquirer');
db.query = utils.promisify(db.query)
console.log(`
_____________________________________
*    ╋   *    ╋             ╋      *
┏━━━┓┏┓   ╋  ┏━┳┓   *  ┏┓╋  ┏┓ ┏┳━━━┓
┃┏━┓┣┛┗┓ * ╋ ┃┏┫┃* ╋  ┏┛┗┓  ┃┃*┃┃┏━┓┃
┃┗━━╋┓┏╋━━┳━┳┛┗┫┃┏━━┳━┻┓┏┛ ╋┃┗━┛┃┗━┛┃
┗━━┓┃┃┃┃┏┓┃┏┻┓┏┫┃┃ ━┫ ━┫┃╋  ┃┏━┓┃┏┓┏┛
┃┗━┛┃┃┗┫┏┓┃┃ ┃┃┃┗┫ ━┫ ━┫┗┓ *┃┃ ┃┃┃┃┗┓
┗━━━┛┗━┻┛┗┻┛*┗┛┗━┻━━┻━━┻━┛  ┗┛ ┗┻┛┗━┛
   ╋    *          ╋    *       *
_____________________________________
`)

async function viewDepts() {
  try {
    const result = await db.query(`SELECT dept_name AS Department, id AS 'Department ID' FROM starfleet_db.departments;
    `)
    console.table(result);
    doThis(); 
    // return result;
  } catch (error) {
   console.log(error);
  }
}
// viewDepts(); //for testing SQL

async function viewRoles() {
  try {
    const result = await db.query(`SELECT job_title AS Role, roles.id AS "Job ID",  departments.dept_name AS Department, roles.salary AS "Annual Salary"
    FROM starfleet_db.roles
    JOIN starfleet_db.departments ON roles.dept_id = departments.id;
    `)
    console.table(result);
    doThis(); 
    // return result;
  } catch (error) {
   console.log(error);
  }
}
// viewRoles(); //for testing SQL

async function viewEmployees() {
    try {
      const result = await db.query(`SELECT starfleet_db.employee.id AS "Employee ID", concat(employee.first_name, ' ', employee.last_name) AS Employee, 
      roles.job_title AS Role, 
      departments.dept_name AS Department, 
      roles.salary AS "Annual Salary",
        concat(manager.first_name, ' ', manager.last_name) AS "Manager"
    FROM starfleet_db.employees employee
      LEFT JOIN employees manager ON employee.manager_id = manager.id
      JOIN roles ON employee.role_id = roles.id
        JOIN departments ON roles.dept_id = departments.id;`)
      console.table(result);
      doThis(); 
      // return result;
    } catch (error) {
     console.log(error);
    }
  }
  // viewEmployees(); //for testing SQL

const doThis = () =>{
  inquirer.prompt([
    {
      type: 'list',
      name: 'userAction',
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Quit",],
    },
//ADD: add a department, add a role, add an employee, and update an employee role
  ])
  .then((input) =>{
  switch (input.userAction) {
  case "View all departments":
    console.log("you chose View Departments")
    viewDepts();
    break
  case "View all roles":
    console.log("you chose View Roles")
    viewRoles();
    break
  case "View all employees":
    console.log("you chose View Employees")
    viewEmployees(); 
    break
  case "Quit":
    process.exit(0);
  defult:
    console.log("Looks like we got confused.")
  }
  
  })
};

doThis(); 