CREATE USER IF NOT EXISTS 'authentication'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS authentication;
USE authentication;
CREATE TABLE authentication(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0
);
GRANT ALL PRIVLEDGES ON authentication.authentication TO 'authentication'@'localhost';