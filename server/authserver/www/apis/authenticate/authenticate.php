<?php

    require_once('../.././include/DataManager.php');
    require_once('../.././include/middleware.php');

    function setSession(int $id, string $token){
        $conn = DataManager::getInstance()->getConnection("account");
        if(!$conn || $conn->connect_error) return false;
        $statement = $conn->prepare("UPDATE account SET token = ? WHERE id = ?");
        if(!$statement->bind_param("si", $token, $id)) error("Query failed. ¯\_(ツ)_/¯");
        if($statement->execute()){
            return true;
        }
        return false;
    }



    function createAccount($email, $password, $passwordConfirm, $firstName, $lastName, $address, $phoneNumber, $insuranceCompany, $dashCam){

        if($password !== $passwordConfirm) error('Passwords don\'t match.');

        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) error('Invalid email address.');

        /*Database initialization*/
        $dataManager = DataManager::getInstance();
        $conn = $dataManager->getConnection("account");

        if(!$conn || $conn->connect_error) error('Could not connect to account database. :( ');

        /*Make sure account doesn't already exist*/
        $lookupStatement = $conn->prepare("SELECT id FROM account WHERE email = ?");
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
        $insertStatement = $conn->prepare("INSERT INTO account (email, password_hash, token, first_name, last_name, address, phone_number, insurance_company, dashcam) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if(!$insertStatement) error();
        if(!$insertStatement->bind_param("ssssssssi", $email, $passwordHash, $token, $firstName, $lastName, $address, $phoneNumber, $insuranceCompany, $dashCam)) error();
        if(!$insertStatement->execute()) error();


       exit(json_encode(array('token' => $token)));
    }



    function login($email, $password){

        /*DB Setup*/
        $conn = DataManager::getInstance()->getConnection("account");
        if(!$conn || $conn->connect_error){
           error('Could not connect to authentication database. :(');
        }

        /*Lookup account with provided email & password*/
        $statement = $conn->prepare("SELECT id, password_hash FROM account WHERE email = ?");
        if(!$statement->bind_param("s", $email)) error("Query failed. ¯\_(ツ)_/¯");
        if(!$statement->execute()) error("Query failed. ¯\_(ツ)_/¯");
        $resultSet = $statement->get_result();

        if($resultSet->num_rows != 1) {
            error('Invalid email account or password');
        }

        $row = $resultSet->fetch_assoc();

        if(password_verify($password, $row['password_hash'])){
            $token = bin2hex(openssl_random_pseudo_bytes(128, $strongCrypto));
            if(!setSession($row['id'], $token)){
                error('Failed to store newly generated session token.');
            }
            exit(json_encode(array('token' => $token)));
        } else {
            error('Invalid email account or password');
        }

    }

    if(isset($_GET['email']) && isset($_GET['password'])){
        $email = $_GET['email'];
        $password = $_GET['password'];
        login($email, $password);
    }

    if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['passwordConfirm']) && isset($_POST['firstName']) && isset($_POST['lastName']) && isset($_POST['address']) && isset($_POST['phoneNumber']) && isset($_POST['insuranceCompany']) && isset($_POST['dashCam']) ) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $passwordConfirm = $_POST['passwordConfirm'];
        $firstName = $_POST['firstName'];
        $lastName = $_POST['lastName'];
        $address = $_POST['address'];
        $phoneNumber = $_POST['phoneNumber'];
        $insuranceCompany = $_POST['insuranceCompany'];
        $dashCam = $_POST['dashCam'];
        createAccount($email, $password, $passwordConfirm, $firstName, $lastName, $address, $phoneNumber, $insuranceCompany, $dashCam);
    }
    
    error('Invalid request' . json_encode($_POST));

?>
