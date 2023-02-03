USE starfleet_db;

INSERT INTO departments (id, dept_name)
VALUES  (010, "Starfleet Command"),
        (100, "Command"),
        (200, "Engineering"),
        (300, "Security"),
        (400, "Science"),
        (500, "Medical"),
        (550, "Counseling");

INSERT INTO roles (id, job_title, salary, dept_id)
VALUES  (001, "Admiral", "400000", 010),
        (101, "Captain", "100000", 100),
        (102, "First Officer", "90000", 100),
        (201, "Chief Engineer", "80000", 200),
        (202, "Engineer", "70000", 200),
        (301, "Chief of Security", "80000", 300),
        (302, "Officer", "70000", 300),
        (401, "Chief Science Officer", "60000", 400),
        (402, "Operations Officer", "50000", 400),
        (501, "Doctor", "80000", 500),
        (502, "Nurse", "70000", 500),
        (551, "Counselor", "50000", 550);

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES  (111, "Jean-Luc", "Picard", 001, NULL),
        (112, "William", "Riker", 101, 111),
        (113, "Jack", "Ransom", 102, 114 ),
        (114, "Carol", "Freeman", 101, 113),
        (211, "Geordi", "LaForge", 201, 112),
        (212, "Reginald", "Barkley", 202, 211),
        (213, "Andarithio", "Billups", 201, 114),
        (311, "Worf", "Mog", 301, NULL);