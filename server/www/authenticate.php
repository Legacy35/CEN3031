<?php

    require_once('./include/DataManager.php');

    header('Content-type: application/json');
    

    /**
     * 
     */
    function addSession(int $id, string $token){
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error) return false;
        $statement = $conn->prepare("INSERT INTO tokens (id, token) VALUES (?, ?)");
        $statement->bind_param("is", $id, $token);
        if($statement->execute()){
            return true;
        }
    }



    function createAccount($email, $password, $passwordConfirm){
         
        if($password !== $passwordConfirm) exit(json_encode(array('error' => 'Passwords don\'t match.')));
    
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)) exit(json_encode(array('error' => 'Invalid email address.')));
    
        /*Database initialization*/
        $dataManager = DataManager::getInstance();
        $conn = $dataManager->getAuthConnection();

        if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to authentication database. :( ')));
    
        /*Make sure account doesn't already exist*/
        $lookupStatement = $conn->prepare("SELECT id FROM authentication WHERE email = ?");
        $lookupStatement->bind_param("s", $email);
        $lookupStatement->execute();
        $resultSet = $lookupStatement->get_result();
    
        if($resultSet->num_rows != 0) exit(json_encode(array('error' => 'An account with that email address already exists.')));
    
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
    
        /*Find new account ID ID & insert newly generated token into sessions table*/
        $lookupStatement = $conn->prepare("SELECT id FROM authentication WHERE email = ?");
        $lookupStatement->bind_param("s", $email);
        $lookupStatement->execute();
        $resultSet = $lookupStatement->get_result();
        if($resultSet->num_rows != 1){
            exit(json_encode(array('error' => 'Account created, but failed to store session token.')));
        }
        $row = $resultSet->fetch_assoc();
        $id = $row['id'];
        if(!addSession($id, $token)){
            exit(json_encode(array('error' => 'Account created, but failed to store session token.')));
        }

        exit(json_encode(array('token' => $token)));
    }



    function getToken($email, $password){
    
        /*DB Setup*/
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error){
            exit(json_encode(array('error' => 'Could not connect to authentication database. :(')));
        }
    
        /*Lookup user with provided email & password*/
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
            if(!addSession($row['id'], $token)){
                exit(json_encode(array('error' => 'Failed to store newly generated session token.')));
            }
            exit(json_encode(array('token' => $token)));

        } else {
            exit(json_encode(array('error' => 'Invalid email address or password.')));
        }

    }



    if(isset($_GET['email']) && isset($_GET['password'])){
        $email = $_GET['email'];
        $password = $_GET['password'];
        getToken($email, $password);
    } else if(isset($_POST['email']) && isset($_POST['password']) && isset($_POST['passwordConfirm'])) {
        $email = $_POST['email'];
        $password = $_POST['password'];
        $passwordConfirm = $_POST['passwordConfirm'];
        createAccount($email, $password, $passwordConfirm);
    } else {
        exit(json_encode(array('error' => 'Invalid request.')));
    }

?>