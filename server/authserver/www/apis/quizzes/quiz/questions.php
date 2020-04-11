<?php

    //require_once('../../../include/middleware.php');
    require_once('../../../include/DataManager.php');

    $conn = DataManager::getInstance()->getConnection('quiz');
    if(!$conn || $conn->connect_error) error();
    $state = isset($_GET['state']) ? $_GET['state'] : 'all';
    $statement = $conn->prepare("SELECT * FROM question WHERE `state` = ?");
    if(!$statement) error();
    if(!$statement->bind_param("s", $state)) error();
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
    shuffle($output);
    $output = array($output[0], $output[1], $output[2], $output[3], $output[4], $output[5], $output[6], $output[7], $output[8], $output[9]);
    exit(json_encode($output));
   
?>