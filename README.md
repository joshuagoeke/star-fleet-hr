## UTA Bootcamp Challenge 12

In this homework assignment from the University of Texas-Austin Bootcamp we were asked to create a conent management system for an employee database using Node.js, Inquirer, and MySQL.

# Starfleet HR
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

Building this app gave me the opportunity to learn about using Node.js to build a SQL database management system using MySQL and Inquirer. I also am gaining an appreciation for the usefulness of express routes and modularization in the app file systems, because the index.js file is rather large. I plan to fix this in future iterations!

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
We were also given this schema chart:

![Schema Chart](./assets/images/12-sql-homework-demo-01.png?raw=true)

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

Be sure after downloading and unzipping the directory to run in your integrated terminal or command prompt in the appropriate directory:

- (install mysql2 and node.js if you have not already done so)
- in the root folder (same location as package.json), run ```npm i```
- ```cd db```
- log into mysql with ```mysql -u root -p```, enter your password, and then run ```SOURCE schema.sql;```
- still in mysql: run ```SOURCE seeds.sql;```
- quit mysql with ```quit```
- ```cd ..``` to get back to the root folder
- start Starfleet HR with ```node index.js```


## Usage

Once the program is operating in the terminal, follow the prompts to answer questions to view various tables, add, or change information for employees.

    
![Example preview](./assets/images/12-sql-homework-video-thumbnail.png?raw=true)

![Example preview](./assets/images/starfleet-HR-in-action.jpg?raw=true)
    

Demo video:

https://www.loom.com/share/fdde4ed0a574451c922562346e8bfd63

## Credits

Thanks to fellow students in this bootcamp adventure:

- Michael Smith https://github.com/AustinBQ02
- Rebecca Girndt https://github.com/re-gi
- Myeonghun Jeong "MJ" https://github.com/mjtic

Respect and big thanks to instructor Leah Nelson and tutor Megan Meyers for helping get me un-stuck on the tight timeline of this project.


## License

Copyright 2023 Joshua Goeke

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


## Attributions:
This README.md is patterned off of an example at https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide
