INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Sales Lead', 80000, 2),
('Accountant', 70000, 3),
('Lawyer', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, NULL),
('Ashley', 'Rodriguez', 3, 1),
('Kevin', 'Tupik', 4, 1),
('Kunal', 'Singh', 1, 2),
('Malia', 'Brown', 2, 2),
('Sarah', 'Lourd', 3, 1),
('Tom', 'Allen', 4, 2);
