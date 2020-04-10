<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import



    if(isset($_GET['limit'])){ //Has the client included a 'token' variable as part of the GET request?
      $conn = DataManager::getInstance()->getConnection("cities"); //External code
      if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); //Converts PHP associative array into JS object & sends to client
      //The exit function is basically the same as res.send() in Node. ALl code after calling exit will not execute.
      $Filter=$_GET['filter'];
      $Limit=$_GET['limit'];
      $Sort="ASC";
      /*Find the right account and return it*/
      $statement = $conn->prepare("SELECT * FROM cities WHERE name LIKE %?% ORDER BY name ? LIMIT ?"); //Creates the fill in the blank SQL statement, but variables are not yet decided. Does not execute the statement until we call the execute function.
      if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
      if(!$statement->bind_param("ssi", $Filter, $Sort, $Limit)); //Puts the string "$token" in the blank. 10 strings would use "ssssssssss" followed by 10 string variables for subsequent values.
      if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); //Execute the actual SQL query. If it fails, the returuend object will evaluate to false, meaning we call the exit function.
      $resultSet = $statement->get_result();
      $output['cities'] = array();
      if($resultSet->num_rows > 0){
          while($row = $resultSet->fetch_assoc()){
              array_push($output["cities"], $row['name']);
          }
      }
        exit(json_encode($output));
    }
    if(isset($_POST['token']){
      $token = $_POST['token'];
      $user =DataManager::getInstance()->getUser($token);
    }else{
        error('Invalid request');
    }
