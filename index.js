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
// function makeChoiceList(array, property) {
//   const newarr = [];
//   for (let i =0; i < array.length; i++){
//     newarr.push(JSON.parse(`array[i].${property}`));
//   }
//   console.log(newarr);
//   return (newarr)
// }


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

async function doThis() {
  try{
    const input = await inquirer.prompt([
      {
        type: 'list',
        name: 'userAction',
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Quit",
          //ADD: add an employee, and update an employee role
        ],
      }]);
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
        case "Add a department":
          console.log("you chose Add a Department");
          addDepartment();
          break
        case "Add a role":
          console.log("you chose Add a Role");
          addRole();
          break
        case "Quit":
          process.exit(0);
        defult:
          console.log("Looks like we got confused.")
        }
  } catch (err){console.log(err)}
};

  
//ADD: add a department, add a role, add an employee, and update an employee role
 
async function addDepartment() {
  console.log("Here's a current list of departments:")
  try {
    const result = await db.query(`SELECT dept_name AS Department, id AS 'Department ID' FROM starfleet_db.departments;
    `)
    console.table(result);
    let deptNum = (result.length *100);
    
    const userNamed = await inquirer.prompt ([
      { type: 'input',
        name: 'newDept',
        message: 'What is the new department called?'
      }
    ])
console.log(userNamed.newDept)
    await db.query(`INSERT INTO departments (id, dept_name) VALUES (${deptNum}, "${userNamed.newDept}"); `);
    const newTable = await db.query(`SELECT dept_name AS Department, id AS 'Department ID' FROM starfleet_db.departments;`)
    console.table(newTable);
    console.log(`${userNamed.newDept} Department Added!`)
    doThis();
  } catch (error) {
   console.log(error);
  }

}
// addDepartment();

async function addRole() {
  try{
    const deptList = await db.query(`SELECT * FROM departments`)
    // console.log(deptList);
    let inquarray = [];
    for (let i =0; i < deptList.length; i++){
      inquarray.push(deptList[i].dept_name);
    }
    // console.log(inquarray);
    const data = await inquirer.prompt
      ([
        {
          type: 'list',
          name: 'chosenDept',
          message: "To which department will this new role belong?",
          choices: inquarray,
          
        },
        {
          type: 'input',
          name: 'newRole',
          message: "What is the new job title for this role?"
        },
        {
          type: 'number',
          name: 'newSalary',
          message: "What is the annual salary for this position?"
        },
      ]);
    // console.log(data)
    // console.log(data.chosenDept);
    var deptID; 
    deptList.forEach(e => {
      if (data.chosenDept === e.dept_name){deptID =e.id}
    });
    // console.log(deptID)
    // console.log(data.newRole);
    // console.log(data.newSalary);
    const rolesData = await db.query(`SELECT * FROM roles WHERE dept_id = ${deptID}`)
    const roleID = deptID + rolesData.length + 1;
    // console.log(roleID);
    await db.query(`INSERT INTO roles (id, job_title, salary, dept_id) VALUES (${roleID}, "${data.newRole}", "${data.newSalary}", ${deptID}); `);
    const newDisplay = await db.query(`SELECT job_title AS Role, roles.id AS "Job ID",  departments.dept_name AS Department, roles.salary AS "Annual Salary"
    FROM starfleet_db.roles
    JOIN starfleet_db.departments ON roles.dept_id = departments.id WHERE dept_id = ${deptID};
    `)
    console.table(newDisplay);
    console.log(`New ${data.newRole} role added to the ${data.chosenDept} Department!`)
    doThis();
  }catch(err){console.log(err)};
}
// addRole();

async function addEmployee() {
  try{ 
    let roleChoices=[];
    const roleList = await db.query(`SELECT * FROM roles;`)
    for (let i =0; i < roleList.length; i++){
      roleChoices.push(roleList[i].job_title);
    }
    console.log(roleList);
    console.log(roleChoices);
    const newEmp = await inquirer.prompt ([
    { 
      type: 'input',
      name: 'firstName',
      message: "What is the employee's FIRST name?"
    },
    { 
      type: 'input',
      name: 'lastName',
      message: "What is the employee's LAST name?"
    },
    { 
      type: 'list',
      name: 'rolePick',
      message: "To what station will this employee be assigned?",
      choices: roleChoices
    },
  ]);  
  console.log(newEmp.firstName);
  console.log(newEmp.lastName);
  console.log(newEmp.rolePick);
  const possibleManagers=[];
  const  tempArr =  
    await db.query(`SELECT job_title, dept_id FROM roles WHERE job_title = "${newEmp.rolePick}"`) 
  console.log(tempArr)
  const nummy = tempArr[0].dept_id
  console.log((tempArr[0].dept_id).substring(0,1))
  // const managerDeptCode = 
  // const possmanage = await db.query(`SELECT * FROM employees WHERE role_id = 0## OR role_id = 1## OR role_id = ${};`)
  // console.log(possmanage)
  // const supervisor = await inquirer.prompt
  }catch(err){console.log(err)};
}
addEmployee();

// doThis(); 