INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Cole', 'Milwee', 1, null),
('Stax', 'Dmanzoo', 2, 1),
('Lonnie', 'Milwee', 3, 1),
('Robin', 'Milwee', 4, null),
('Lana', 'Milwee', 5, 4),
('Bill', 'Gates', 6, 4),
('Jax', 'Dexter', 7, null),
('Fake', 'Man', 8, 7),
('John', 'Wick', 9, 7);

INSERT INTO employee_role (title, salary, department_id)
VALUES 
('Marketing Manager', 100000, 1),
('Marketing Assistant', 50000, 1),
('Marketer', 75000, 1),
('Accounting Manager', 100000, 2),
('Accounting Assistant', 50000, 2),
('Accountant', 75000, 2),
('Human Resources Manager', 100000, 3),
('Human Resources Assistant', 50000, 3),
('HR', 75000, 3);



INSERT INTO department (department_name)
VALUES 
('Marketing'),
('Accounting'),
('Human Resources');

