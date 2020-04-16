<?php

    require_once('../../../include/middleware.php');
    require_once('../../../include/DataManager.php');

    $conn = DataManager::getInstance()->getConnection('quiz');
    if(!$conn || $conn->connect_error) error();

    function createQuestion(){
        global $conn;
        if(!isset($_COOKIE['token'])) error("You must be signed in to perform this operation.");
        $user = DataManager::getInstance()->getUser($_COOKIE['token']);
        if(!$user['super_admin']) error("You must be a super user to perform this operation");
        $statement = $conn->prepare("INSERT INTO question (`question`, `answer1`, `answer2`, `answer3`, `answer4`, `correct_answer`, `state`) VALUES (?, ?, ?, ?, ?, ?, ?)");
        if(!$statement) error();
        if(!$statement->bind_param("sssssis", $_POST['question'], $_POST['answer1'], $_POST['answer2'], $_POST['answer3'], $_POST['answer4'], $_POST['correct'], $_POST['state'])) error();
        if(!$statement->execute()) error();
    }

    function deleteQuestion(){
        global $conn;
        $statement = $conn->prepare("DELETE FROM question WHERE id = ?");
        if(!$statement) error();
        if(!$statement->bind_param("i", intval($_POST["id"]))) error();
        if(!$statement->execute()) error();
    }

    function getRandomQuestions(){
        global $conn;
        $state = isset($_GET['state']) ? $_GET['state'] : 'all';
        $limit = isset($_GET['limit']) ? $_GET['limit'] : 10;
        if($limit > 100) $limit = 100;
        $filter = isset($_GET['filter']) ? $_GET['filter'] : "";
        $randomize = isset($_GET['randomize']) ? $_GET['randomize'] : true;
        $statement = $conn->prepare("SELECT * FROM question WHERE (state LIKE CONCAT('%', ?, '%') or state = 'all') AND question LIKE CONCAT('%', ?, '%')");
        if(!$statement) error();
        if(!$statement->bind_param("ss", $state, $filter)) error();
        if(!$statement->execute()) error();
        $resultSet = $statement->get_result();
        $questions = array();
        while($row = $resultSet->fetch_assoc()){
            $question = $row;
            $question['answers'] = array($question['answer1'], $question['answer2'], $question['answer3'], $question['answer4']);
            unset($question['answer1']);
            unset($question['answer2']);
            unset($question['answer3']);
            unset($question['answer4']);
            array_push($questions, $question);
        }
        if($randomize) shuffle($questions);
        $output=array();
        for($i=0;$i<$_GET['limit'];$i++){
          array_push($output,$questions[$i]);
        }
        exit(json_encode($output));
    }

    if(isset($_POST['question']) && isset($_POST['answer1'])&& isset($_POST['answer2'])&& isset($_POST['answer3'])&& isset($_POST['answer4']) && isset($_POST['correct']) && isset($_POST['state'])){
        createQuestion();
    } else if(isset($_POST['id']) &&(isset($_POST['delete']) && $_POST['delete']) ){
        deleteQuestion();
   }  else {
        getRandomQuestions();
    }

?>
