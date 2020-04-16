<?php

  require_once('../../include/DataManager.php');//import
  require_once('../../include/middleware.php'); //import

  function getRivalries(){
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));
    $statement = $conn->prepare("SELECT Rivalryid, city_id1, name1,state1, country1, city_id2,name2,state2, country2 FROM
                                (SELECT name1,state1, country1, city_id1,city_id2,rivalry.id as Rivalryid
                                FROM rivalry
                                JOIN (Select name as name1,state as state1, country as country1, id  FROM cities ) as Table2
                                ON Table2.id=rivalry.city_id1) as Table3
                                JOIN (Select name as name2,state as state2, country as country2 ,id FROM cities ) as Table4
                                ON Table4.id=Table3.city_id2 WHERE name1 LIKE  CONCAT('%',?,'%') OR name2 LIKE  CONCAT('%',?,'%') LIMIT ?");

    if(!$statement) error();
    if(!$statement->bind_param("ssi", $_GET['filter'], $_GET['filter'],$_GET['limit'])) error();
    if(!$statement->execute()) error();
    $resultSet = $statement->get_result();
    $output = array();
    $output2 = array();
    while($row = $resultSet->fetch_assoc()){
      $output["id"]= $row["Rivalryid"];
      $output["city1"]['id'] = $row["city_id1"];
      $output["city1"]['name'] = $row["name1"];
      $output["city1"]['state'] = $row["state1"];
      $output["city1"]['country'] = $row["country1"];
      $output["city2"]['id'] = $row["city_id2"];
      $output["city2"]['name'] = $row["name2"];
      $output["city2"]['state'] = $row["state2"];
      $output["city2"]['country'] = $row["country2"];
      array_push($output2,$output);
    }
    exit(json_encode($output2));
  }

  function deleteRivalry(){
    if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation');
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) error();
    $user = DataManager::getInstance()->getInstance()->getUser($_COOKIE['token']);
    if(!$user['admin'] && !$user['super_admin']) error('You are not authorized to perform this action.');
    $statement = $conn->prepare("DELETE FROM rivalry WHERE id = ?");
    if(!$statement) error();
    if(!$statement->bind_param("i", intval($_POST["id"]))) error();
    if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
  }

  function createRivalry(){
    if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation');
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) error();
    $user = DataManager::getInstance()->getInstance()->getUser($_COOKIE['token']);
    if(!$user['admin'] && !$user['super_admin']) error('You are not authorized to perform this action.');
    $id1 = $_POST['city_id1'];
    $id2 = $_POST['city_id2'];
    $statement = $conn->prepare("SELECT * FROM rivalry WHERE (city_id1 = ? AND city_id2 = ?) OR (city_id2 = ? AND city_id1 = ?)");
    if(!$statement) error();
    if(!$statement->bind_param("ssss", $id1,  $id2, $id1, $id2)) error();
    if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
    $resultSet = $statement->get_result();
    if ($resultSet->num_rows>0) error("Rivalry already exisits");
    $statement = $conn->prepare("INSERT INTO rivalry (city_id1 , city_id2) VALUES ( ? , ?)");
    if(!$statement) error();
    if(!$statement->bind_param("ss", $id1,  $id2)) error();
    if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
  }

  if(isset($_GET['limit']) && isset($_GET['filter'])){ //GET request it gets the list of rivalries
    getRivalries();
  }
  else if(isset($_POST['id']) &&(isset($_POST['delete']) && $_POST['delete']) ){ // POST Request to delete Rivalries
   deleteRivalry();
  }
  else if(isset($_POST['city_id1']) && isset($_POST['city_id2'])){ //POST REQUEST TO SAVE RIVALRIES
    createRivalry();
  } else{
      error('Invalid request');
  }
?>
