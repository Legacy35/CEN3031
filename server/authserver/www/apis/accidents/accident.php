<?php

    require_once('../../include/DataManager.php');
    require_once('../../include/middleware.php');

    function getOpenCageCity(){
        $cityName = $_POST['cityName'];
        $state = $_POST['state'];
        $fileKey = file_get_contents('../../data/opencage.key');
        $openCageKey = "";
        for($i = 0; $i < strlen($fileKey) - 1; $i++){
            $openCageKey[$i] = $fileKey[$i];
        }
        $url = "https://api.opencagedata.com/geocode/v1/json?q=$cityName,$state&key=$openCageKey";
        $url = str_replace(' ', '+', $url);
        $results =  json_decode(file_get_contents($url));
        if(!isset($results->results)) error("No matching cities found.");
        $results = $results->results;
        $output;

        for($i = 0; $i < count($results); $i++){
            if(isset($results[$i]->components->state) && (isset($results[$i]->components->city) || isset($results[$i]->components->town))){
                if(isset($results[$i]->components->city) && strtolower($results[$i]->components->city) == strtolower($_POST['cityName'])){
                    $output = $results[$i];
                    break;
                } else if (isset($results[$i]->components->town) && strtolower($results[$i]->components->town) == strtolower($_POST['cityName'])) {
                    $output = $results[$i];
                    break;
                }
            }
        }

        if(!($output)) error("No matching cities were found.");
        return $output;
    }

    function storeAccident($openCageCity){
        $conn = DataManager::getInstance()->getConnection('cities');
        if(!$conn || $conn->connect_error) error("Failed to connect to database. :(");

        //Make sure our search isn't too broad
        $statement = $conn->prepare("SELECT * FROM cities WHERE name = ? AND state = ? LIMIT 25");
        if(!$statement) error();
        if(!$statement->bind_param("ss", $openCageCity->components->city, $openCageCity->components->state)) error();
        if(!$statement->execute()) error();
        $resultSet = $statement->get_result();
        if($resultSet->num_rows > 1) error("More than one city with the provided criteria was found. Please narrow your search.");

        //Insert city if it doesn't exist
        if($resultSet->num_rows == 0){
            $statement = $conn->prepare("INSERT INTO cities (`name`, `state`, `country`, `latitude`, `longitude`) VALUES (?, ?, ?, ?, ?)");
            if(!$statement) error();
            $name = $openCageCity->components->city;
            $state = $openCageCity->components->state;
            $country = $openCageCity->components->country;
            $latitude = $openCageCity->geometry->lat;
            $longitude = $openCageCity->geometry->lng;
            if(!$statement->bind_param("sssdd", $name, $state, $country, $latitude, $longitude)) error();
            if(!$statement->execute()) error();
        }

        //After (potentially) inserting, look up city again to find its id
        $statement = $conn->prepare("SELECT * FROM cities WHERE name = ? AND state = ? LIMIT 25");
        if(!$statement) error();
        if(!$statement->bind_param("ss", $openCageCity->components->city, $openCageCity->components->state)) error();
        if(!$statement->execute()) error();
        $resultSet = $statement->get_result();
        if($resultSet->num_rows > 1) error("More than one city with the provided criteria was found. Please narrow your search.");
        $row = $resultSet->fetch_assoc();

        $city_id = $row['id'];

        $statement = $conn->prepare("INSERT INTO accidentReport (`city_id`, `date`, `clear`, `rain`, `snow`, `hail`, `fog`, `high_winds`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        if(!$statement) error();
        $date = $_POST['date'];
        $clear = 0;
        $rain = 0;
        $snow = 0;
        $hail = 0;
        $fog = 0;
        $wind = 0;
        foreach($_POST['weather'] as $weather){
          if($weather=="Clear")$clear = 1;
            if($weather=="Rain")$rain = 1;
              if($weather=="Snow")$snow = 1;
                if($weather=="Hail")$hail = 1;
                  if($weather=="Fog")$fog = 1;
                    if($weather=="Wind")$wind = 1;
        }

        if(!$statement->bind_param("iiiiiiii", $city_id, $date, $clear, $rain, $snow, $hail, $fog, $wind)) error();

        if(!$statement->execute()) error();

    }

    /*Input validation*/
    if(isset($_POST['cityName']) && isset($_POST['state']) && isset($_POST['date']) && isset($_POST['weather'])){
        if(!isset($_COOKIE['token'])) error("You must be signed in to perform this operation");
        $user = DataManager::getInstance()->getUser($_COOKIE['token']);
        if($user['admin'] !== 1 && $user['super_admin'] !== 1) error("You are not authorized to perform this action.");
        if($_POST['date'] < 0) error("Malformed request. Invalid date.");
        if (strlen($_POST['cityName']) < 2 || strlen($_POST['cityName']) > 46)  error("Malformed request, city name invalid.");
        $openCageCity = getOpenCageCity();
        storeAccident($openCageCity);
    } else if(isset($_GET['filter'])) {
        $conn = DataManager::getInstance()->getConnection('cities');
        if(!$conn || $conn->connect_error) error();
        $statement = $conn->prepare();

    } else {
        error("Malformed request");
    }


?>
