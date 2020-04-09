<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import

    if(isset($_GET['token'])){ //Has the client included a 'token' variable as part of the GET request?
          //$ signs indicate variables. All variable creations and references are prefixed with a $ sign

          /*Inputs*/
          $token = $_GET['token']; //$token is now equal to the GET paramater named 'token';

          /*DB setup*/
          $conn = DataManager::getInstance()->getConnection("account"); //External code
          if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); //Converts PHP associative array into JS object & sends to client
          //The exit function is basically the same as res.send() in Node. ALl code after calling exit will not execute.

          /*Find the right account and return it*/
          $statement = $conn->prepare("SELECT id, email, admin FROM account WHERE token = ?"); //Creates the fill in the blank SQL statement, but variables are not yet decided. Does not execute the statement until we call the execute function.
          if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
          if(!$statement->bind_param("s", $token)); //Puts the string "$token" in the blank. 10 strings would use "ssssssssss" followed by 10 string variables for subsequent values.
          if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); //Execute the actual SQL query. If it fails, the returuend object will evaluate to false, meaning we call the exit function.
          $resultSet = $statement->get_result(); //Extract the data results from the qery & store in the $resultSet variable
          if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Account with provided token not found.'))); //Make sure we have more than 0 results
          $row = $resultSet->fetch_assoc(); //Convert the result set object into a PHP assoictae array (Map/HashMap)
          //In this case, since the database schema has the id, email, password_hash, token, and admin fields, then we would get an object with those values.
          exit(json_encode($row)); //convert the PHP object into JS and send to client.



      } else {
          exit(json_encode(array('error' => 'Invalid request.')));
      }
