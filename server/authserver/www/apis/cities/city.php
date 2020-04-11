<?php

    require_once('../../include/DataManager.php');//import
    require_once('../../include/middleware.php'); //import

    if(isset($_GET['filter'])) {
      $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 25;
      $conn = DataManager::getInstance()->getConnection('cities'); 
      if(!$conn || $conn->connect_error) error(); 

      $statement = $conn->prepare("SELECT * FROM cities WHERE name LIKE CONCAT('%', ?, '%') ORDER BY name ASC LIMIT ?"); 
      if(!$statement) error();
      if(!$statement->bind_param("si", $_GET['filter'], $limit));
      if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); 
      $resultSet = $statement->get_result();
      $output = array();
        while($city = $resultSet->fetch_assoc()){
            $city['coordinates'] = array('latitude' => $city['latitude'], 'longitude' => $city['longitude']);
            unset($city['latitude']);
            unset($city['longitude']);
            $statement = $conn->prepare('SELECT * FROM accidentReport WHERE city_id = ?');
            $city['accidents'] = array();
            if(!$statement) error();
            if(!$statement->bind_param("i", $city['id'])) error();
            if(!$statement->execute()) error();
            $accidents = $statement->get_result();
            while($accident = $accidents->fetch_assoc()){
              $accident['weather'] = array();
              if($accident['clear']) array_push($accident['weather'], 'Clear'); 
              if($accident['rain']) array_push($accident['weather'], 'Rainy'); 
              if($accident['snow']) array_push($accident['weather'], 'Snowy'); 
              if($accident['hail']) array_push($accident['weather'], 'Hail'); 
              if($accident['fog']) array_push($accident['weather'], 'Foggy'); 
              if($accident['high_winds']) array_push($accident['weather'], 'Windy');
              unset($accident['clear']);
              unset($accident['rain']);
              unset($accident['snow']);
              unset($accident['hail']);
              unset($accident['fog']);
              unset($accident['high_winds']);
              unset($accident['city_id']);
              array_push($city['accidents'], $accident);
            }
            array_push($output, $city);
        }
      
        exit(json_encode($output));
    }
    
    error("Invalid request");
