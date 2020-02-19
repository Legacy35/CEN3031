<?php

    require_once("./include/DataManager.php");
    
    header('Content-type: application/json');

    if(isset($_GET['email']) && isset($_GET['password'])){
     
        $dataManager = DataManager::getInstance();
        $conn = $dataManager->getAuthConnection();

        if($conn->connect_error){
            var_dump($conn->connect_error);
        }

        exit(json_encode(array('test' => 'test')));


    } else {
        exit(json_encode(array('error' => 'Must provide a username and password.')));
    }

?>