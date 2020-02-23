<?php

    require_once('./include/DataManager.php');

    header('Concent-type: application/json');

    if(isset($_GET['token'])){

        /*Inputs*/
        $token = $_GET['token'];

        /*DB setup*/
        $conn = DataManager::getInstance()->getAuthConnection();
        if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));

        /*Find the right account and return it*/
        $statement = $conn->prepare("SELECT id, email, admin FROM authentication WHERE token = ?");
        if(!$statement->bind_param("s", $token));
        if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
        $resultSet = $statement->get_result();
        if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'User with provided token not found.')));
        $row = $resultSet->fetch_assoc();
        exit(json_encode($row));

    } else {
        exit(json_encode(array('error' => 'Invalid request.')));
    }

?>