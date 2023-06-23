const inquirer = require('inquirer');
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jrharlcool23',
    database: 'employer_db'
});

start();

function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View All Employees',
                    'Add Employee',
                    'Update Employee Role',
                    'View All Roles',
                    'Add Role',
                    'View All Departments',
                    'Add Department',
                    'Quit'
                ]
            }
        ])



        .then((answers) => {
            switch (answers.action) {
                case 'View All Employees':
                    connection.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                        start();
                    });
                    break;
                case 'Add Employee':
                    connection.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                        addEmployee();
                    });
                    break;
                case 'Update Employee Role':
                    connection.query('SELECT * FROM employee', function (err, results) {
                        console.table(results);
                        updateEmployeeRole();
                    }
                    );
                    break;
                case 'View All Roles':
                    connection.query('SELECT * FROM employeerole', function (err, results) {
                        console.table(results);
                        start();
                    }
                    );
                    break;
                case 'Add Role':
                    connection.query('SELECT * FROM employeerole', function (err, results) {
                        console.table(results);
                        addRole();
                    }
                    );
                    break;
                case 'View All Departments':
                    connection.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        start();
                    }
                    );
                    break;
                case 'Add Department':
                    connection.query('SELECT * FROM department', function (err, results) {
                        console.table(results);
                        addDepartment();
                    }
                    );
                    break;
                case 'Quit':
                    connection.end();
                    break;
            }
        }
        )


}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the new department?'

            }
        ])
        .then((answers) => {
            connection.query('INSERT INTO department SET ?', answers, function (err, results) {
                connection.query('SELECT * FROM department', function (err, results) {
                    console.log('Department Added!');
                    console.table(results);
                    start();
                });
            });
        }
        )
}


function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the new role?'

            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'

            },
            {
                type: 'input',
                name: 'department_id',
                message: 'What is the department id for this role?'

            },
        ])
        .then((answers) => {
            connection.query('INSERT INTO employeerole SET ?', answers, function (err, results) {
                connection.query('SELECT * FROM employeerole', function (err, results) {
                    console.log('Role Added!');
                    console.table(results);
                    start();
                });
            });
        }
        )
}


function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'id',
                message: 'What is the employees id?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the employees new role id?'
            },
        ])
        .then((answers) => {
            connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.id], function (err, results) {
                connection.query('SELECT * FROM employee', function (err, results) {
                    console.log('Employee Updated!');
                    console.table(results);
                    start();
                });
            });
        }
        )
}

async function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the employees last name?'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'What is the employees role id?'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'What is the employees manager id?'
            },
        ])
        .then((answers) => {
            connection.query('INSERT INTO employee SET ?', answers, function (err, results) {
                connection.query('SELECT * FROM employee', function (err, results) {
                    console.log('Employee Added!');
                    console.table(results);
                    start();
                });
            });
        }
        )
}
