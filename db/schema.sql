CREATE DATABASE starfleet_db:

USE starfleet_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY,
    dept_name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY,
    job_title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (dept_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id)
    REFERENCES roles(id),
    manager_id INT 
)