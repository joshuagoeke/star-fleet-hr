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
// } //since I knew I was gonna have to do this a bunch of times I tried to make it a function, but failed. Might use later though


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
// viewDepts(); 

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
// viewRoles(); 

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
          "Add an employee",
          "Update an employee role",
          "Quit",
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
        case "Add an employee":
          console.log("you chose Add an Employee");
          addEmployee();
          break
        case "Update an employee role":
          console.log("you chose Update an Employee Role")
          updateEmployee();
          break
        case "Quit":
          process.exit(0);
        defult:
          console.log("Looks like we got confused.")
        }
  } catch (err){console.log(err)}
};

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
  
    var deptID; 
    deptList.forEach(e => {
      if (data.chosenDept === e.dept_name){deptID =e.id}
    });
    const rolesData = await db.query(`SELECT * FROM roles WHERE dept_id = ${deptID}`)
    const roleID = deptID + rolesData.length + 1;
    
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
  //gets employee role_id based on role chosen
  var empRoleID;
    roleList.forEach(r => {
       if (newEmp.rolePick === r.job_title){empRoleID =r.id}
      });
  //makes list of possible supervisors by department AND includes command officers
  const  tempArr =  
    await db.query(`SELECT job_title, dept_id FROM roles WHERE job_title = "${newEmp.rolePick}"`) 
  const nummy = tempArr[0].dept_id;  
  const managerDeptCode =((nummy).toString()).substring(0,1);
  
  const possibleManagers = 
    await db.query(`SELECT *, CONCAT(first_name,' ', last_name) AS name FROM employees WHERE (role_id LIKE '1%' OR role_id LIKE '${managerDeptCode}%');`)
 
  const managerNames=[];
  for (let i =0; i < possibleManagers.length; i++){
    managerNames.push(possibleManagers[i].name);
  }
  managerNames.push("No supervisor");
  
  const supervisor = await inquirer.prompt([
    { 
      type: 'list',
      name: 'boss',
      message: "To whom shall this employee report?",
      choices: managerNames
    },
  ])
  //gets manager_id from manager name
  var bossID; 
    possibleManagers.forEach(e => {
      if (supervisor.boss === "No supervisor"){
        bossID = null;
      }else{ if (supervisor.boss === e.name){bossID =e.id}}
    });
  //gives employee next sequential id by department
  const empByDeptData = await db.query(`SELECT * FROM employees WHERE (role_id LIKE '${managerDeptCode}%')`)
  const empID = await empByDeptData[empByDeptData.length -1].id + 1;
  //adds employee to database
  await db.query(`INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
  VALUES (${empID}, "${newEmp.firstName}", "${newEmp.lastName}", ${empRoleID}, ${bossID});`)
  //shows database
  console.log(`Added ${empID}, ${newEmp.firstName}, ${newEmp.lastName}, ${empRoleID}, ${bossID} to employee table!`)
  doThis();
  }catch(err){console.log(err)};
}
// addEmployee();

async function updateEmployee(){
  try{
  const updateList = await db.query(`SELECT employees.id, first_name, last_name, CONCAT(first_name,' ',last_name) AS name, role_id, job_title, manager_id FROM employees JOIN roles ON employees.role_id = roles.id` )
  
  const chosen = await inquirer.prompt([
    {
      type: 'list',
      name: 'update',
      message: "Which employee needs updating?",
      choices: updateList
    }
  ]);
  
  var notIt;
  var employeeID;
  updateList.forEach(u =>{
    if (chosen.update === u.name){
      notIt = u.role_id;
      employeeID = u.id;
    }
  });
  
  const newRoles = await db.query(`SELECT * FROM roles WHERE id != ${notIt}`)
  
  const possibleRoles = [];
  for (let i =0; i < newRoles.length; i++){
    possibleRoles.push(newRoles[i].job_title);  
  }
  possibleRoles.push("Employee Resigned");
    const roleUpdate = await inquirer.prompt([
    {
      type: 'list',
      name: 'pick',
      message: "Which role will the employee be taking on?",
      choices: possibleRoles
    },
  ]);
  
  var updatePickCode;
  if (roleUpdate.pick === "Employee Resigned"){
    db.query(`DELETE FROM employees WHERE id = ${employeeID};`);
    console.log('Choose "View employees" to see this employee is gone!')
  }else{ newRoles.forEach(r => {
    if (roleUpdate.pick === r.job_title){
      updatePickCode = r.id;
    }
  })
   
    db.query(`UPDATE employees SET role_id = ${updatePickCode} WHERE id = ${employeeID};`)
    console.log(`Choose "View employees" to see job title updated to ${roleUpdate.pick} for ${chosen.update}`)
  }

  doThis();
  }catch(err){console.log(err)}
};
// updateEmployee();

doThis(); 