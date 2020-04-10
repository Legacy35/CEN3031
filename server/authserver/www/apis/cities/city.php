<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import



    if(isset($_GET['limit']) && isset($_GET['filter'])){ //This if Checks to see if its is a get, and if it has the requires params in this scenario I am checking to see if the param limnit and filter are given
      $conn = DataManager::getInstance()->getConnection("cities"); //Connect to the databse, the String is the name of the database we want to connect to
      if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); //The if checks to make sure we connected to the databse ok
      //The exit function is basically the same as res.send() in Node. ALl code after calling exit will not execute.
      $Filter=$_GET['filter'];// create variables and store the params I was given
      $Limit=$_GET['limit'];
      $statement = $conn->prepare("SELECT * FROM cities WHERE name LIKE  CONCAT('%',?,'%') ORDER BY name ASC LIMIT ?"); //Creates the fill in the blank SQL statement, but variables are not yet decided. Does not execute the statement until we call the execute function.
      if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));//checks to see if the statement is a valid statement
      if(!$statement->bind_param("si", $Filter,  $Limit)) error(); //Puts the string "$token" in the blank. 10 strings would use "ssssssssss" followed by 10 string variables for subsequent values, also make sure no SQL keywords or code is inserted
      if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); //Execute the actual SQL query. If it fails, the returuend object will evaluate to false, meaning we call the exit function.
      $resultSet = $statement->get_result(); //result set is a table given back to me of what I searched for
      $output = array();//create an array in which I will send as my response to the Http Request
      if($resultSet->num_rows > 0){ // If there is atleast 1 item in the results
          while($row = $resultSet->fetch_assoc()){ // loop through all the results
            array_push($output, $row);//push the information into the array , side note $row['Column name'] will get you specific info from that column of the row
          }
      }
        exit(json_encode($output));// return the array we made for the http response.
    }
    else{
        error('Invalid request');
    }
