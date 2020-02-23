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
    admin TINYINT NOT NULL DEFAULT 0
);

GRANT ALL PRIVILEGES ON authentication.authentication TO 'authentication'@'localhost';

FLUSH PRIVILEGES;