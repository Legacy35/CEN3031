<?php

    require_once('../.././include/DataManager.php');
    require_once('../.././include/middleware.php');



    function error($reason){
        exit(json_encode(array('error' => $reason)));
    }



    function setSession(int $id, string $token){
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error) return false;
        $statement = $conn->prepare("UPDATE authentication SET token = ? WHERE id = ?");
        if(!$statement->bind_param("si", $token, $id)) error("Query failed. ¯\_(ツ)_/¯");
        if($statement->execute()){
            return true;
        }
        return false;
    }



    function createAccount($email, $password, $passwordConfirm){

        if($password !== $passwordConfirm) error('Passwords don\'t match.');

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) error('Invalid email address.');

        /*Database initialization*/
        $dataManager = DataManager::getInstance();
        $conn = $dataManager->getAuthConnection();

        if(!$conn || $conn->connect_error) error('Could not connect to authentication database. :( ');

        /*Make sure account doesn't already exist*/
        $lookupStatement = $conn->prepare("SELECT id FROM authentication WHERE email = ?");
        if(!$lookupStatement->bind_param("s", $email)) error("Query failed. ¯\_(ツ)_/¯");
        if(!$lookupStatement->execute()) error("Query failed. ¯\_(ツ)_/¯");
        $resultSet = $lookupStatement->get_result();

        if($resultSet->num_rows != 0) error('An account with that email address already exists.');

        /*Generate initial token*/
        $strongCrypto = false;
        $token = bin2hex(openssl_random_pseudo_bytes(128, $strongCrypto));
        if(!$strongCrypto){
            error('Could not securely generate a session token.');
        }

        /*Salt and hash password, store new account*/
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $insertStatement = $conn->prepare("INSERT INTO authentication (email, password_hash, token) VALUES (?, ?, ?)");
        if(!$insertStatement->bind_param("sss", $email, $passwordHash, $token)) error("Query failed. ¯\_(ツ)_/¯");
        if(!$insertStatement->execute()) error("Query failed. ¯\_(ツ)_/¯");


       exit(json_encode(array('token' => $token)));
    }



    function login($email, $password){

        /*DB Setup*/
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error){
           error('Could not connect to authentication database. :(');
        }

        /*Lookup user with provided email & password*/
        $statement = $conn->prepare("SELECT id, password_hash FROM authentication WHERE email = ?");
        if(!$statement->bind_param("s", $email)) error("Query failed. ¯\_(ツ)_/¯");
        if(!$statement->execute()) error("Query failed. ¯\_(ツ)_/¯");
        $resultSet = $statement->get_result();

        if($resultSet->num_rows != 1) error('Specified account does not exist.');

        $row = $resultSet->fetch_assoc();

        if(password_verify($password, $row['password_hash'])){
            $token = bin2hex(openssl_random_pseudo_bytes(128, $strongCrypto));
            if(!setSession($row['id'], $token)){
                error('Failed to store newly generated session token.');
            }
            exit(json_encode(array('token' => $token)));
        } else {
            error('Invalid email address or password.');
        }

    }

    if(isset($_GET['email']) && isset($_GET['password'])){
        $email = $_GET['email'];
        $password = $_GET['password'];
        login($email, $password);
    }

    if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['passwordConfirm'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $passwordConfirm = $_POST['passwordConfirm'];
        createAccount($email, $password, $passwordConfirm);
    }

    error('Invalid request');

?>
