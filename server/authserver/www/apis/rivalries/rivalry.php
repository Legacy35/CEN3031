<?php

  require_once('../../include/DataManager.php');//import
  require_once('../../include/middleware.php'); //import



  if(isset($_GET['limit']) && isset($_GET['filter'])){ //This if Checks to see if its is a get, and if it has the requires params in this scenario I am checking to see if the param limnit and filter are given
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));
    // Store $_GET Params in variables
    $id1 = $_GET['city_id1'];
    $id2 = $_GET['city_id2'];
    // SQL Statement here
    $statement = $conn->prepare("SELECT * FROM rivalry WHERE name LIKE  CONCAT('%',?,'%') ORDER BY name ASC LIMIT ?");
    if(!$statement) error();
    if(!$statement->bind_param("ss", $id1,  $id2)) error();
    if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
    //Should there be more error checking here?
    $resultSet = $statement->get_result();
    $output = array();
    while($row = $resultSet->fetch_assoc()){ // loop through all the results
      array_push($output, $row);//push the information into the array , side note $row['Column name'] will get you specific info from that column of the row
    }
    // get the result set and put it in an array and return the Json encoded object
    exit(json_encode($output));
  }
  else if(isset($_POST['id']) &&(isset($_POST['delete']) && $_POST['delete']) ){
    // Store $_POST Params in variables
    // SQL Statement here ("SELECT * FROM rivalry WHERE id = ?")
    // get the result set and put it in an array and return the Json encoded object
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));
    $statement = $conn->prepare("DELETE FROM rivalry WHERE id = ?");
    if(!$statement) error();
    if(!$statement->bind_param("i", intval($_POST["id"]))) error();
    if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :(')));
    //Should there be more error checking here?
    $resultSet = $statement->get_result();
  }
  else if(isset($_POST['city_id1']) && isset($_POST['city_id2'])){
    // Store $_POST Params in variables
    // SQL Statement here ("INSERT INTO rivalries (city_id , city_id2) VALUES ( ? , ?)")
    // get the result set and put it in an array and return the Json encoded object
    $conn = DataManager::getInstance()->getConnection("cities");
    if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :(')));
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
    //Should there be more error checking here?
    $resultSet = $statement->get_result();

  }
  else{
      error('Invalid request');
  }
?>