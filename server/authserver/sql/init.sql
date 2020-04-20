
#Users Database
DROP USER IF EXISTS 'dbuser'@'localhost';
CREATE USER IF NOT EXISTS 'dbuser'@'localhost' IDENTIFIED BY 'MyPasswordIsMoreSecureThanYoursBET';

DROP DATABASE IF EXISTS account;
CREATE DATABASE IF NOT EXISTS account;
USE account;

CREATE TABLE account(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    token VARCHAR(1024) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0,
    super_admin TINYINT NOT NULL DEFAULT 0,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    insurance_company VARCHAR(255) NOT NULL,
    dashcam TINYINT NOT NULL
);
CREATE TABLE quizData(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    score INT NOT NULL DEFAULT 0
);
INSERT INTO account(email, password_hash, token, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam) VALUES
("admin@gmail.com", "$2y$10$sCvkhqiP2fgIS9GzOCWeQOGaQjh7d0fB/GgT8iVrc/r/uqDmlfc4G", "d81030a9efc69236e2fab1cf26a8c902ec88d3e73f1bb671432a9d7a9f8d8793b48bf5d8434f2394cb092ef06c6dda958427efc7d3aa356f0df376954118e772a04a3f29f0645f0cd84d76c1ae02470d94f826223897d4bcc1d45ffc4ded74d95e58cb4d25d818df1bcaa1b9a638aa005088b2c46cc2204ebd7239385f3aa3f0", 1, 1, "Root", "localhost", "127.0.0.1", "555-555-5555", "Geico", 0);


#Quiz Database
DROP DATABASE IF EXISTS quiz;
CREATE DATABASE IF NOT EXISTS quiz;
USE quiz;

CREATE TABLE question(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(1024) NOT NULL,
    answer1 VARCHAR(1024) NOT NULL,
    answer2 VARCHAR(1024) NOT NULL,
    answer3 VARCHAR(1024) NOT NULL,
    answer4 VARCHAR(1024) NOT NULL,
    correct_answer INT NOT NULL DEFAULT 0,
    state VARCHAR(25) NOT NULL
);


#Cities Database
DROP DATABASE IF EXISTS cities;
CREATE DATABASE IF NOT EXISTS cities;
USE cities;

CREATE TABLE cities( # Purpose means Data is here but not in use, Functionality means No Data and not in use.
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
state VARCHAR(100) NOT NULL,
country VARCHAR(100) NOT NULL, # No Purpose
latitude FLOAT NOT NULL , # No Purpose
longitude  FLOAT NOT NULL , # No Purpose
climate VARCHAR(256) NOT NULL DEFAULT 0 # No Functionality
);

CREATE TABLE accidentReport( # Purpose means Data is here but not in use, Functionality means No Data and not in use.
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
city_id INT NOT NULL,
date BIGINT NOT NULL,
clear TINYINT NOT NULL DEFAULT 0,
rain TINYINT NOT NULL DEFAULT 0,
snow TINYINT NOT NULL DEFAULT 0,
hail TINYINT NOT NULL DEFAULT 0,
fog TINYINT NOT NULL DEFAULT 0,
high_winds TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE rivalry(
    id INT NOT NULL AUTO_INCREMENT,
    city_id1 INT NOT NULL,
    city_id2 INT NOT NULL,
    PRIMARY KEY(id,city_id1 ,city_id2)
);

GRANT ALL PRIVILEGES ON cities.* TO 'dbuser'@'localhost';
GRANT ALL PRIVILEGES ON account.* TO 'dbuser'@'localhost';
GRANT ALL PRIVILEGES ON quiz.* TO 'dbuser'@'localhost';
