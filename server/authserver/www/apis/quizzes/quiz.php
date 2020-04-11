<?php

    require_once('../../include/middleware.php');
    require_once('../../include/DataManager.php');
    
    if(!isset($_COOKIE["token"])) error("You must be signed in to perform this operation.");

    $conn = DataManager::getInstance()->getConnection('account');

    $answers = array();
    $ids = array();

    foreach ($_POST as $key => $value) {
        if(strpos($key, "q") === 0){
            $questionId = explode('q', $key)[1];
            $questionId = intval($questionId);
            $answer = $value;
            $answers[$questionId] = $answer;
            array_push($ids, $questionId);
        }
    }

    if(count($answers) <= 0) error("You can't submit a blank quiz!");

    /*Find all quiz questions matching the user submitted quiz*/
    $conn = DataManager::getInstance()->getConnection('quiz');
    if(!$conn || $conn->connect_error) error();
    $sql = "SELECT * FROM `question` WHERE `id` = ";
    for($i = 0; $i < count($answers) - 1; $i++){
        $sql = $sql . "? OR `id` = ";
    }
    $sql = $sql . "?";
    $statement = $conn->prepare($sql);
    if(!$statement) error("1");
    if(!$statement->bind_param(str_repeat("i", count($ids)), ...$ids)) error("2");
    if(!$statement->execute()) error('3');
    $resultSet = $statement->get_result();
    
    /*After finding relevent questions, calculate score*/
    $questionCount = $_POST['numQuestions'];
    $correct = 0;
    while($row = $resultSet->fetch_assoc()) {
        $rowId = $row['id'];
        $rowAnswer = $row['correct_answer'];    
        if(isset($answers[$rowId]) && $answers[$rowId] == $rowAnswer){
            $correct++;
        }
    }
    $score = $correct / $questionCount * 100;

    $conn = DataManager::getInstance()->getConnection('account');
    if(!$conn || $conn->connect_error) error("Could not store quiz result.");

    $user = DataManager::getInstance()->getUser($_COOKIE['token']);
    $id = $user['id'];

    $statement = $conn->prepare("INSERT INTO quizData (user_id, score) VALUES (?, ?)");
    if(!$statement) error();
    if(!$statement->bind_param("id", $id, $score)) error();
    if(!$statement->execute()) error();

    exit(json_encode(array('score' => $score)));

?>