--view all departments

SELECT dept_name AS Department, id AS 'Department ID' FROM starfleet_db.departments;

--view all roles

SELECT job_title AS Role, roles.id AS "Job ID",  departments.dept_name AS Department, roles.salary AS "Annual Salary"
FROM starfleet_db.roles
JOIN starfleet_db.departments ON roles.dept_id = departments.id;

--view all employees

SELECT starfleet_db.employee.id AS "Employee ID", concat(employee.first_name, ' ', employee.last_name) AS Employee, 
	roles.job_title AS Role, 
	departments.dept_name AS Department, 
	roles.salary AS "Annual Salary",
    concat(manager.first_name, ' ', manager.last_name) AS "Manager"
FROM starfleet_db.employees employee
	LEFT JOIN employees manager ON employee.manager_id = manager.id
	JOIN roles ON employee.role_id = roles.id
    JOIN departments ON roles.dept_id = departments.id;

--add a department

--ad a role

--add an employee

--update an employee role