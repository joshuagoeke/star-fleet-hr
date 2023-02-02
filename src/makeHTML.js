const { Employee } = require("../lib");
const { Manager } = require("../lib");
const { Engineer } = require("../lib");
const { Intern } = require("../lib");


function renderEmployee(employee){
    switch(employee.getRole()){

        case 'Manager':
            let manager = new Manager;
            manager = employee;
            return `
            <div class="card" style="width: 18rem;">
            <div class="card-header">
              <h2>${manager.getName()}</br>&#x2615 Manager</h2>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Employee ID: ${manager.getId()}</li>
              <li class="list-group-item">E-mail: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
              <li class="list-group-item">Office Number: ${manager.getOfficeNumber()}</li>
            </ul>
            </div>`
            break;

        case 'Engineer':
            let engineer = new Engineer;
            engineer = employee;
            return `
            <div class="card" style="width: 18rem;">
            <div class="card-header">
              <h2>${engineer.getName()}</br>&#x1f453 Engineer</h2>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Employee ID: ${engineer.getId()}</li>
              <li class="list-group-item">E-mail: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
              <li class="list-group-item">GitHub: <a href="https://www.github.com/${engineer.getGitHub()}">github.com/${engineer.getGitHub()}</a></li>
            </ul>
            </div>`
            break;

        case 'Intern':
          let intern = new Engineer;
          intern = employee;
            return `
            <div class="card" style="width: 18rem;">
            <div class="card-header">
              <h2>${intern.getName()}</br>&#x1F393 Intern</h2>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Employee ID: ${intern.getId()}</li>
              <li class="list-group-item">E-mail: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
              <li class="list-group-item">School: ${intern.getSchool()}</li>
            </ul>
            </div>`
            break;
        default:
            return '';
    }
}

const employeeCards = (array) => {
  var newArray =[];
  array.forEach((element) => newArray.push(renderEmployee(element)));
  newstring = newArray.join('');
  return newstring;
};

function generateHTML(array) {
    return `<!doctype html>
    <html lang="en">
      <head>
        <!-- Required meta tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="../dist/assets/style.css">
        <title>BOGUS COMPANY INC.</title>
      </head>
      <body>
        <header>
            <h1>Development Department</h1>
        </header>
        <div class = "card-deck" id="all-cards">
           
          ${employeeCards(array)}
      
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    </html>`
};





module.exports = generateHTML;