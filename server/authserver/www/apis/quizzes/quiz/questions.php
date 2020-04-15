<?php

    require_once('../../../include/middleware.php');
    require_once('../../../include/DataManager.php');

    $conn = DataManager::getInstance()->getConnection('quiz');
    if(!$conn || $conn->connect_error) error();

    if(isset($_POST['question']) && isset($_POST['answer1'])&& isset($_POST['answer2'])&& isset($_POST['answer3'])&& isset($_POST['answer4']) && isset($_POST['correct'])){
        if(!isset($_COOKIE['token'])) error("You must be signed in to perform this operation.");
        $user = DataManager::getInstance()->getUser($_COOKIE['token']);
        if(!$user['super_admin']) error("You must be a super user to perform this operation");
        $statement = $conn->prepare("INSERT INTO question WHERE `state` = ? AND `question` LIKE CONCAT('%', ?, '%') LIMIT ?");
    } else if(isset($_POST['id']) &&(isset($_POST['delete']) && $_POST['delete']) ){
      if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));
      $statement = $conn->prepare("DELETE FROM question WHERE id = ?");
      if(!$statement) error();
      if(!$statement->bind_param("i", intval($_POST["id"]))) error();
      if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
  }  else {

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