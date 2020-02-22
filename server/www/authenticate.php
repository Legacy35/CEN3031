<?php

    require_once('./include/DataManager.php');

    header('Content-type: application/json');
    
    /*Input validation*/
    if(!isset($_GET['email']) || !isset($_GET['password'])){
        exit(json_encode(array('error' => 'Must provide a username and a password.')));
    }

    $email = $_GET['email'];
    $password = $_GET['password'];

    $conn = DataManager::getInstance()->getAuthConnection();
    if($conn->connect_error){
        exit(json_encode(array('error' => 'Could not connect to authentication database. :(')));
    }

    $statement = $conn->prepare("SELECT password_hash FROM authentication WHERE email = ?");
    $statement->bind_param("s", $email);
    $statement->execute();
    $resultSet = $statement->get_result();

    if($resultSet->num_rows != 1){
        exit(json_encode(array('error' => 'Specified account does not exist.')));
    }

    $row = $resultSet->fetch_assoc();
    if(password_verify($password, $row['password_hash'])){
        $token = bin2hex(openssl_random_pseudo_bytes(128, $strongCrypto));
        exit(json_encode(array('token' => $token)));
    } else {
        exit(json_encode(array('error' => 'Invalid email address or password.')));
    }

?>