const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  port: 3306,
  
  user: 'root',

  password: 'Goldenwhale101',
  database: 'employee_tracking',
});


const startInquiry = () => {
    inquirer
        .prompt({
        name: 'action',
        type: 'list',
        message: 'what would you like to do?',
        choices: [
        'Add',
        'View',
        'Update',
        'Exit',
      ],
    })
    .then((answer) => {
        switch (answer.action) {
            case 'Add':
                addEmployees();
                break;
            case 'View':
                viewEmployees();
                break;
            case 'Update':
                updateEmployees();
                break;
            
            case 'Exit':
                connection.end();
                break;
            
            default:
                console.log(`not available: ${answer.action}`);
                break;
        }
    });
};

const addEmployees = () => {
    inquirer
        .prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'first name employee'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'last name employee'
        },
        {
            name: 'employeeRole',
            type: 'list',
            message: 'give the employee a job',
            choices: ['Marketing Manager', 'Marketing Assistant', 'Marketer', 'Accounting Manager', 'Accounting Assistant', 'Accountant', 'Human Resources Manager', 'Human Resources Assistant', 'HR Person']
        }])
        .then((answer) => {
            const roleUpdate = (x,y) => {
                connection.query('INSERT INTO employee SET ?',
                [{
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: x,
                    manager_id: y
                }],
                (error) => {
                    if (error) throw err;
                    console.log('Employee made');
                })
            };
            switch (answer.employeeRole) {
                case 'Marketing Manager':
                    roleUpdate(1,null);
                    break;
                
                case 'Marketing Assistant':
                    roleUpdate(2,1);
                    break;
                
                case 'Marketer':
                    roleUpdate(3,1);
                    break;

                case 'Accounting Manager':
                    roleUpdate(4,null);
                    break;

                case 'Accounting Assistant':
                    roleUpdate(5,4);
                    break;

                case 'Accountant':
                    roleUpdate(6,4);
                    break;

                case 'Human Resources Manager':
                    roleUpdate(7,null);
                    break;

                case 'Human Resources Assistant':
                    roleUpdate(8,7);
                    break;

                case 'HR':
                    roleUpdate(9,7);
                    break;
            }
            startInquiry();
        })
}



const viewEmployees = () => {

    connection.query(
        'SELECT first_name, last_name, department_name, title, salary, manager_id FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id LEFT JOIN employee ON employee_role.id = employee.role_id', (err, res) => {
            if (err) throw err;
            console.table(res);
            startInquiry();
        }
        );
}; 



const updateEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: 'updateEmployees',
                    type: 'list',
                    choices() {
                        const choiceArray = [];
                        res.forEach(({first_name}) => {
                            choiceArray.push(first_name)
                        });
                        return choiceArray;
                    },
                    message: 'choose an employee to update',
    
                },
                {
                    name: 'roleIDUpdate',
                    type: 'input',
                    message: 'change the role id'
                }]).then((answer) => {

                        connection.query('UPDATE employee SET ? WHERE ?',
                        [{
                            first_name: answer.updateEmployees
                        },
                        {
                            role_id: answer.roleIDUpdate
                        }],
                        (error) => {
                            if (error) throw err;
                            console.log('Role ID has been changed');
                            startInquiry();
                    })}) 
                })}
            

connection.connect((err) => {
    if (err) throw err;
    startInquiry();
  });