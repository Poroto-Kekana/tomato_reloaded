create table customer (
id integer PRIMARY KEY AUTOINCREMENT, first_name text, last_name text, email real, username real, password real, contacts integer, manager_id integer,project_id integer,
FOREIGN KEY (manager_id) REFERENCES manager (id),FOREIGN KEY (project_id) REFERENCES projects (id)
);


create table detect(
id integer PRIMARY KEY AUTOINCREMENT, detect_date_time TIMESTAMP NULL, detect_time real, detect_date real, customer_id integer, project_id integer,health_status_id integer,
FOREIGN KEY (customer_id) REFERENCES customer (id),FOREIGN KEY (project_id) REFERENCES projects (id), FOREIGN KEY (health_status_id) REFERENCES health_status (id)
);

create table projects(
id integer primary key AUTOINCREMENT,
project_name text,location text,manager_id integer,
FOREIGN KEY (manager_id) REFERENCES manager (id)
);


create table manager (
id integer primary key AUTOINCREMENT,
first_name text,
last_name text,
email real,
username real,
password real,
contacts integer

);

create table health_status(
id integer primary key AUTOINCREMENT,
diagnosis text,
picture_name text

);


create table register(
id integer primary key AUTOINCREMENT,username text,
email real,
password real

);