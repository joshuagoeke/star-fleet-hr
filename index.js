const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const { Employee } = require('./lib');
const { Manager } = require('./lib');
const { Engineer } = require('./lib');
const { Intern } = require('./lib');
const generateHTML = require('./src/makeHTML')

const wholeTeam = [];

const standardQs =[
    {
        type: 'input',
        name: 'name',
        message: "What is the employee's name?",
    },
    //consider using math.random to assign this
    {
        type: 'input',
        name: 'id',
        message: "Now that the employee's biological and technological distinctiveness has been added to our own, by what number shall we refer to this employee? (What is their ID number?)",
    },
    {
        type: 'input',
        name: 'email',
        message: "We want to spam the employee's inbox with inane clutter for business purposes. Provide an email.",
    },
]

//Figure out which role the employee will have
const newEmployee = () => {
    console.log(`
___________________________________________________________________

Welcome to DEPARTMENT-CHART-MAKER. You answer some questions, and
we'll make HTML out of your answers.
___________________________________________________________________
    `);
    
    inquirer.prompt([
    {
        type: 'list',
        name: 'role',
        message: "Select the employee's role:",
        choices: ["Manager", "Engineer", "Intern"],
    },
])
//based on that, ask these questions and record this data
.then((userInput) => {
    switch (userInput.role){
        case "Manager":
            inquirer
                .prompt([
                    ...standardQs,
                    {
                        type: "input",
                        name: "officeNumber",
                        message: "What's the office number of the manager so everyone can leave a memo with their assistant?"
                    }
                ]).then((data)=> {
                    let employee = new Manager(
                        data.name,
                        data.id,
                        data.email,
                        data.officeNumber
                    );
                    console.log(employee);
                    wholeTeam.push(employee);
                    addMoreEmployeez();
                    
                }
                )
            break;
        case "Engineer":
            inquirer
                .prompt([
                    ...standardQs,
                    {
                        type: "input",
                        name: "gitHub",
                        message: "What's the engineer's gitHub so everyone can see their awesome code?"
                    }
                ]).then((data)=> {
                    let employee = new Engineer(
                        data.name,
                        data.id,
                        data.email,
                        data.gitHub
                    );
                    console.log(employee);
                    wholeTeam.push(employee);
                    addMoreEmployeez();
                }
                )
            break;
        case "Intern":
            inquirer
                .prompt([
                    ...standardQs,
                    {
                        type: "input",
                        name: "school",
                        message: "What's the intern's school so everyone can tease them about it?"
                    }
                ]).then((data)=> {
                    let employee = new Intern(
                        data.name,
                        data.id,
                        data.email,
                        data.school
                    );
                    console.log(employee);
                    wholeTeam.push(employee);
                    addMoreEmployeez();
                }
                )
            break;
        default:
            console.log("You broke something. That's right, I said it's your problem.");
    }
})
};

const addMoreEmployeez = () =>{
    inquirer
    .prompt([
        {
            type: "confirm",
            name: "more",
            message: "Do you want to put in more employees or nah?",
            default: false,
        },
    ])
    .then((theywant) => {
        if (theywant.more) {
            newEmployee();
        }else{
            console.log("Pretty bangin' team ya got there!");
            console.log(wholeTeam);
            writeToFile('./dist/index.html', generateHTML(wholeTeam));
        }
    });
};

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
  };

init = () => {newEmployee()
    // .then((answers) => writeToFile('./dist/index.html', generateHTML({...answers})))
    // .then(() => console.log("dork"));
    // .catch((err) => console.log(err));
};
    init();

