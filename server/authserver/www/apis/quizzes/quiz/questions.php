<?php

    require_once('../../../include/middleware.php');
    require_once('../../../include/DataManager.php');

    $conn = DataManager::getInstance()->getConnection('quiz');
    if(!$conn || $conn->connect_error) error();

    /*Input validation*/


    if(isset($_POST['']) && isset($_POST[''])){
        if(!isset($_COOKIE['token'])) error("You must be signed in to perform this operation.");
        $user = DataManager::getInstance()->getUser($_COOKIE['token']);
        if(!$user['super_admin']) error("You must be a super user to perform this operation");

    } else {

        $state = isset($_GET['state']) ? $_GET['state'] : 'all';
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
        if($limit > 100) $limit = 100;
        $filter = isset($_GET['filter']) ? $_GET['filter'] : "";
        $randomize = isset($_GET['randomize']) ? $_GET['randomize'] : true;
        
        $statement = $conn->prepare("SELECT * FROM question WHERE `state` = ? AND `question` LIKE CONCAT('%', ?, '%') LIMIT ?");
        if(!$statement) error();
        if(!$statement->bind_param("ssi", $state, $filter, $limit)) error();
        if(!$statement->execute()) error();
        $resultSet = $statement->get_result();
        $output = array();
        while($row = $resultSet->fetch_assoc()){
            $question = $row;
            $question['answers'] = array($question['answer1'], $question['answer2'], $question['answer3'], $question['answer4']);
            unset($question['answer1']);
            unset($question['answer2']);
            unset($question['answer3']);
            unset($question['answer4']);
            array_push($output, $question);
        }
        if($randomize) shuffle($output);
        exit(json_encode($output));

    }
   
?>