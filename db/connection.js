const mysql = require('mysql2');
require("dotenv").config()

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: process.env.DB_PASSWORD,
        database: 'starfleet_db'
    },
    console.log('Connected to the employee_tracker database.')
);

module.exports = db;
