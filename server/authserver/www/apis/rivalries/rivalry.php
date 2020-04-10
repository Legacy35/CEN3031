<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import



    if(isset($_GET['limit']) && isset($_GET['filter'])){ //This if Checks to see if its is a get, and if it has the requires params in this scenario I am checking to see if the param limnit and filter are given
      $conn = DataManager::getInstance()->getConnection("cities");
      // Store $_GET Params in variables
      // SQL Statement here ("SELECT * FROM rivalry WHERE name LIKE  CONCAT('%',?,'%') ORDER BY name ASC LIMIT ?")
      // get the result set and put it in an array and return the Json encoded object
    exit(json_encode($output));
    }
    else if(isset($_POST['id']) &&(isset($_POST['delete']) && $_POST['delete']) ){
      // Store $_POST Params in variables
      // SQL Statement here ("SELECT * FROM rivalry WHERE id = ?")
      // get the result set and put it in an array and return the Json encoded object
    }
    else if(isset($_POST['city_id']) && isset($_POST['city_id2'])){
      // Store $_POST Params in variables
      // SQL Statement here ("INSERT INTO rivalries (city_id , city_id2) VALUES ( ? , ?)")
      // get the result set and put it in an array and return the Json encoded object
    }
    else{
        error('Invalid request');
    }
