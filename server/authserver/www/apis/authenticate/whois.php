<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import

    if(isset($_GET['token'])){ //Has the client included a 'token' variable as part of the GET request?
          //$ signs indicate variables. All variable creations and references are prefixed with a $ sign
          $token = $_GET['token']; //$token is now equal to the GET paramater named 'token';
          exit(json_encode(DataManager::getInstance()->getUser($token))); //convert the PHP object into JS and send to client.

      } else {
          exit(json_encode(array('error' => 'Invalid request.')));
      }
      ?>
