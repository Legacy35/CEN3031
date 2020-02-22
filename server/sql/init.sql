CREATE USER IF NOT EXISTS 'authentication'@'localhost' IDENTIFIED BY 'password';
CREATE DATABASE IF NOT EXISTS authentication;
USE authentication;

CREATE TABLE authentication(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    admin TINYINT NOT NULL DEFAULT 0
);

CREATE TABLE tokens(
    id INT NOT  NULL,
    token VARCHAR(255) NOT NULL,
    date_granted DATETIME NOT NULL DEFAULT NOW()
);

GRANT ALL PRIVILEGES ON authentication.authentication TO 'authentication'@'localhost';
GRANT ALL PRIVILEGES ON authentication.tokens TO 'authentication'@'localhost';
