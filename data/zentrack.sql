DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS trainings;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   username VARCHAR(100) NOT NULL,
   password VARCHAR(200) NOT NULL,
   role VARCHAR(50) NOT NULL
);

CREATE TABLE companies(
   id SERIAL PRIMARY KEY,
   name VARCHAR(100) NOT NULL,
   sector VARCHAR(200) NOT NULL,
   city VARCHAR(200) NOT NULL
);

CREATE TABLE trainings(
   id SERIAL PRIMARY KEY,
   title VARCHAR(200) NOT NULL,
   category VARCHAR(100) NOT NULL,
   description TEXT NOT NULL
);

CREATE TABLE sessions(
   id SERIAL PRIMARY KEY,
   date DATE NOT NULL,
   time TIME NOT NULL,
   duration INT NOT NULL,
   trainer_name VARCHAR(200) NOT NULL,
   max_participants INT NOT NULL,
   training_id INT NOT NULL,
   company_id INT NOT NULL,
   FOREIGN KEY(training_id) REFERENCES trainings(id),
   FOREIGN KEY(company_id) REFERENCES companies(id)
);

CREATE TABLE registrations(
   id SERIAL PRIMARY KEY,
   firstname VARCHAR(100) NOT NULL,
   lastname VARCHAR(100) NOT NULL,
   email VARCHAR(200) NOT NULL,
   status VARCHAR(50) NOT NULL,
   session_id INT NOT NULL,
   FOREIGN KEY(session_id) REFERENCES sessions(id)
);
