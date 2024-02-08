INSERT INTO department (name)
VALUES ("Marketing"),
       ("Product"),
       ("Sales"),
       ("HR");
       
INSERT INTO role (title, department_id, salary)
VALUES ("Event Marketing Manager", 1, 95000),
       ("Content Marketing Manager", 1, 115000),
       ("Product Manager", 2, 93000),
       ("Software Engineer", 2, 110000),
       ("Sales Director", 3, 160000),
       ("Sales manager", 3, 80000),
       ("Head of people", 4, 119000),
       ("Pay Roll Specialist", 4, 65000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melissa", "Tam", 1, null),
       ("Camila", "Santos", 2, 1),
       ("Paula", "Faria", 3, null),
       ("Wilson", "Tang", 4, 3),
       ("Dominic", "Li", 5, null),
       ("Marcus", "Medalla", 6, 5),
       ("Fernando", "Rodrigues", 7, null),
       ("Malena", "Lopes", 8, 7);