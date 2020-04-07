
#Users Database
DROP DATABASE IF EXISTS authentication;
DROP USER IF EXISTS 'authentication'@'localhost';

CREATE USER IF NOT EXISTS 'authentication'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS authentication;
USE authentication;

CREATE TABLE authentication(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(1024) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0,
    super_admin TINYINT NOT NULL DEFAULT 0
);

#Quiz Database
DROP DATABASE IF EXISTS quiz;
DROP USER IF EXISTS 'quiz'@'localhost';

CREATE USER IF NOT EXISTS 'quiz'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

CREATE TABLE question(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(1024) NOT NULL,
    answers VARCHAR(1024) NOT NULL,
    correct_answer int NOT NULL DEFAULT 0,
    state VARCHAR(25) NOT NULL
);

#Cities Database
DROP DATABASE IF EXISTS cities;
DROP USER IF EXISTS 'cities'@'localhost';

CREATE USER IF NOT EXISTS 'cities'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS cities;
USE cities;

#CREATE TABLE cities(
#    _city_id1 INT NOT NULL PRIMARY KEY,
#    _city_id2 INT NOT NULL PRIMARY KEY,,
#);
CREATE TABLE rivalry(
    _city_id1 INT NOT NULL PRIMARY KEY,
    _city_id2 INT NOT NULL PRIMARY KEY,,
);

GRANT ALL PRIVILEGES ON cities.cities TO 'cities'@'localhost';
GRANT ALL PRIVILEGES ON authentication.authentication TO 'authentication'@'localhost';
GRANT ALL PRIVILEGES ON quiz.quiz TO 'quiz'@'localhost';
FLUSH PRIVILEGES;
