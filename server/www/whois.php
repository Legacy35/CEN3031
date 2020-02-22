<?php

    require_once('./include/DataManager.php');

    header('Concent-type: application/json');

    if(isset($_GET['token'])){

        /*Inputs*/
        $token = $_GET['token'];

        /*DB setup*/
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));

        /*Find account ID associated with this token. TODO: make sure one token doesn't exist in multiple entries*/
        $statement = $conn->prepare("SELECT id FROM `tokens` WHERE token = ?");
        $statement->bind_param("s", $token);
        if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
        $resultSet = $statement->get_result();
        if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'User with provided token not found.')));
        $row = $resultSet->fetch_assoc();
        $id = $row['id'];

        /*Look up and return the right account data*/
        $statement = $conn->prepare("SELECT id, email, admin FROM `authentication` WHERE id = ?");
        $statement->bind_param("s", $id);
        if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
        $resultSet = $statement->get_result();
        if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Query failed due to an internal error. :(')));
        $rows = array();
        while($row = $resultSet->fetch_assoc()){
            array_push($rows, $row);
        }
        exit(json_encode($rows));


    } else {
        exit(json_encode(array('error' => 'Invalid request.')));
    }

?>