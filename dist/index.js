import inquirer from "inquirer";
import { pool, connectDB } from "./connections.js";
await connectDB();
async function App() {
    try {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add employee',
                    'Add department',
                    'Add role',
                    'Update employee role',
                    'Update employee manager',
                    'View employees by manager',
                    'View employees by department',
                    'Delete employee',
                    'Delete department',
                    'Delete role',
                    'View the total utilized budget of a department',
                    'Exit'
                ]
            }
        ]);
        switch (action) {
            case 'View all employees':
                await viewEmployees();
                break;
            case 'View all departments':
                await viewDepartments();
                break;
            case 'View all roles':
                await viewRoles();
                break;
            case 'Add employee':
                await addEmployee();
                break;
            case 'Add department':
                await addDepartment();
                break;
            case 'Add role':
                await addRole();
                break;
            case 'Update employee role':
                await updateEmployeeRole();
                break;
            case 'Update employee manager':
                await updateEmployeeManager();
                break;
            case 'View employees by manager':
                await viewEmployeesByManager();
                break;
            case 'View employees by department':
                await viewEmployeesByDepartment();
                break;
            case 'Delete employee':
                await deleteEmployee();
                break;
            case 'Delete department':
                await deleteDepartment();
                break;
            case 'Delete role':
                await deleteRole();
                break;
            case 'View the total utilized budget of a department':
                await viewBudget();
                break;
            case 'Exit':
                console.log('Goodbye!');
                await pool.end();
                return;
        }
        App();
    }
    catch (error) {
        console.error('Error running the application: ', error);
        App();
    }
}
async function viewDepartments() {
    try {
        const departments = await pool.query('SELECT * FROM department');
        console.table(departments.rows);
    }
    catch (error) {
        console.error('Error viewing departments: ', error);
    }
}
async function viewRoles() {
    try {
        const roles = await pool.query('SELECT * FROM role');
        console.table(roles.rows);
    }
    catch (error) {
        console.error('Error viewing roles: ', error);
    }
}
async function viewEmployees() {
    try {
        const employees = await pool.query(`
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee as e
            LEFT JOIN role as r
            ON e.role_id = r.id
            LEFT JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employee as m
            ON e.manager_id = m.id
            `);
        console.table(employees.rows);
    }
    catch (error) {
        console.error('Error viewing employees: ', error);
    }
}
async function addDepartment() {
    try {
        const department = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the department name:'
            }
        ]);
        await pool.query('INSERT INTO department (name) VALUES ($1)', [department.name]);
        console.log('Department added successfully!');
    }
    catch (error) {
        console.error('Error adding department: ', error);
    }
}
async function addRole() {
    try {
        const { name, salary, department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter the role name:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:'
            }
        ]);
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [name, salary, department_id]);
        console.log('Role added successfully!');
    }
    catch (error) {
        console.error('Error adding role: ', error);
    }
}
async function addEmployee() {
    try {
        let { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee last name:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role id:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager id:'
            }
        ]);
        if (!manager_id) {
            manager_id = null;
        }
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [first_name, last_name, role_id, manager_id]);
        console.log('Employee added successfully!');
    }
    catch (error) {
        console.error('Error adding employee: ', error);
    }
}
async function updateEmployeeRole() {
    try {
        const { employee_id, role_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the employee id:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the new role id:'
            }
        ]);
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role_id, employee_id]);
        console.log('Employee role updated successfully!');
    }
    catch (error) {
        console.error('Error updating employee role: ', error);
    }
}
async function updateEmployeeManager() {
    try {
        const { employee_id, manager_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the employee id:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the new manager id:'
            }
        ]);
        await pool.query('UPDATE employee SET manager_id = $1 WHERE id = $2', [manager_id, employee_id]);
        console.log('Employee manager updated successfully!');
    }
    catch (error) {
        console.error('Error updating employee manager: ', error);
    }
}
async function viewEmployeesByManager() {
    try {
        const { manager_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager id:'
            }
        ]);
        const employees = await pool.query(`
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee as e
            LEFT JOIN role as r
            ON e.role_id = r.id
            LEFT JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employee as m
            ON e.manager_id = m.id
            WHERE e.manager_id = $1
            `, [manager_id]);
        console.table(employees.rows);
    }
    catch (error) {
        console.error('Error viewing employees by manager: ', error);
    }
}
async function viewEmployeesByDepartment() {
    try {
        const { department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:'
            }
        ]);
        const employees = await pool.query(`
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee as e
            LEFT JOIN role as r
            ON e.role_id = r.id
            LEFT JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employee as m
            ON e.manager_id = m.id
            WHERE d.id = $1
            `, [department_id]);
        console.table(employees.rows);
    }
    catch (error) {
        console.error('Error viewing employees by department: ', error);
    }
}
async function deleteEmployee() {
    try {
        const { employee_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the employee id:'
            }
        ]);
        await pool.query('DELETE FROM employee WHERE id = $1', [employee_id]);
        console.log('Employee deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting employee: ', error);
    }
}
async function deleteDepartment() {
    try {
        const { department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:'
            }
        ]);
        await pool.query('DELETE FROM department WHERE id = $1', [department_id]);
        console.log('Department deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting department: ', error);
    }
}
async function deleteRole() {
    try {
        const { role_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role id:'
            }
        ]);
        await pool.query('DELETE FROM role WHERE id = $1', [role_id]);
        console.log('Role deleted successfully!');
    }
    catch (error) {
        console.error('Error deleting role: ', error);
    }
}
async function viewBudget() {
    try {
        const { department_id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:'
            }
        ]);
        const budget = await pool.query(`
            SELECT 
                SUM(r.salary) AS total_budget
            FROM employee as e
            LEFT JOIN role as r
            ON e.role_id = r.id
            WHERE r.department_id = $1
            `, [department_id]);
        console.table(budget.rows);
    }
    catch (error) {
        console.error('Error viewing budget: ', error);
    }
}
App();
