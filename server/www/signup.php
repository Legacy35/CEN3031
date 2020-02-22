<?php

    require_once("./include/DataManager.php");
    
    header('Content-type: application/json');

    /*Input validation*/
    if(!isset($_GET['email']) || !isset($_GET['password']) || !isset($_GET['passwordConfirm'])){
        exit(json_encode(array('error' => 'Must provide an email address, a password, and a confirmation of your password.')));
    }

    $email = $_GET['email'];
    $password = $_GET['password'];
    $passwordConfirm = $_GET['passwordConfirm'];
     
    if($password !== $passwordConfirm){
        exit(json_encode(array('error' => 'Passwords don\'t match.')));
    }

    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        exit(json_encode(array('error' => 'Invalid email address.')));
    }

    /*Database stuff*/
    $dataManager = DataManager::getInstance();
    $conn = $dataManager->getAuthConnection();

    if($conn->connect_error){
       exit(json_encode(array('error' => 'Could not connect to authentication database. :( ')));
    }

    /*Make sure account doesn't already exist*/
    $lookupStatement = $conn->prepare("SELECT id FROM authentication WHERE email = ?");
    $lookupStatement->bind_param("s", $email);
    $lookupStatement->execute();
    $resultset = $lookupStatement->get_result();

    if($lookupStatement->num_rows > 0){
       exit(json_encode(array('error' => 'There is more than one account with that email address.')));
    }

    /*Salt and hash password*/
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);
    $insertStatement = $conn->prepare("INSERT INTO authentication (email, password_hash) VALUES (?, ?)");
    $insertStatement->bind_param("ss", $email, $passwordHash);
    $insertStatement->execute();

    $strongCrypto = false;
    $token = bin2hex(openssl_random_pseudo_bytes(128, $strongCrypto));
    if(!$strongCrypto){
        exit(json_encode(array('error' => 'Could not securely generate a session token.')));
    }

    exit(json_encode(array('token' => $token)));

?>