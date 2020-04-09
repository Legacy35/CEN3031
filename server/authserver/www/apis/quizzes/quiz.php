<?php

    require_once('../../include/middleware.php');
    require_once('../../include/DataManager.php');

    $quizQuestions = json_decode(file_get_contents('../../data/quizQuestions.json'));
    if(!isset($_COOKIE["token"])) error("You must be signed in to perform this operation.");

    if(!isset($_POST['questionCount'])) error('Invalid request');

    $conn = DataManager::getInstance()->getConnection('account');
    $statement = $conn->prepare('SELECT * FROM account WHERE token = ?');
    if(!$statement) error();
    if(!$statement->bind_param("s", $_COOKIE['token'])) error();
    if(!$statement->execute()) error();
    $resultSet = $statement->get_result();
    if($resultSet->num_rows != 1) error();
    $user = $resultSet->fetch_assoc();
    $id = $user['$id'];

    $questionCount = $_POST['questionCount'];
    $correct = 0;
    for($i = 0; $i < sizeof($quizQuestions); $i++){
        $questionKey = 'q' . $quizQuestions["$i"]->_id;
        if(!isset($_POST[$questionKey])) continue;
        $answer = $_POST[$questionKey];
        if($answer == $quizQuestions[i]->correctAnswer) $correct++;
    }

    $score = $correct / $questionCount;
    //TODO: Store result.
    exit(json_encode(array('score' => $score)));



?>