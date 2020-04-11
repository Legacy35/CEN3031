<?php

    require_once('../../include/DataManager.php');
    require_once('../../include/middleware.php');

    /*Authentication*/
    if(!isset($_COOKIE['token'])) error("You must be signed in to perform this operation");
    $user = DataManager::getInstance()->getUser($_COOKIE['token']);
    if($user['super_admin'] !== 1) error("You are not authorized to perform this action.");

    /*Input validation*/
    if(!isset($_POST['cityName']) || !isset($_POST['state']) || !isset($_POST['date']) || !isset($_POST['weather'])){
        error("Malformed request.");
    } else if($_POST['date'] < 0) {
        error("Malformed request. Invalid date.");
    } else if (strlen($_POST['cityName']) < 2 || strlen($_POST['cityName']) > 46){
        error("Malformed request, city name invalid.");
    }

    function getOpenCageCity(){
        $cityName = $_POST['cityName'];
        $state = $_POST['state'];
        $openCageKey = 'f2e278c415b74f7db345af774a40e473';
        $results =  json_decode(file_get_contents("https://api.opencagedata.com/geocode/v1/json?q=$cityName,$state&key=$openCageKey"));
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

        if(!isset($output)) error("No matching cities were found.");
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
        $clear = isset($_POST['weather']['clear']) && $_POST['weather']['clear'];
        $rain = isset($_POST['weather']['rain']) && $_POST['weather']['rain'];
        $snow = isset($_POST['weather']['snow']) && $_POST['weather']['snow'];
        $hail = isset($_POST['weather']['hail']) && $_POST['weather']['hail'];
        $fog = isset($_POST['weather']['fog']) && $_POST['weather']['fog'];
        $wind = isset($_POST['weather']['wind']) && $_POST['weather']['wind'];
        if(!$statement->bind_param("iiiiiiii", $city_id, $date, $clear, $rain, $snow, $hail, $fog, $wind)) error();
        
        if(!$statement->execute()) error();



        /*CREATE TABLE accidentReport( # Purpose means Data is here but not in use, Functionality means No Data and not in use.
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        city_id INT NOT NULL,
        date INT NOT NULL,
        clear TINYINT NOT NULL DEFAULT 0,
        rain TINYINT NOT NULL DEFAULT 0,
        snow TINYINT NOT NULL DEFAULT 0,
        hail TINYINT NOT NULL DEFAULT 0,
        fog TINYINT NOT NULL DEFAULT 0,
        high_winds TINYINT NOT NULL DEFAULT 0
        );*/

    }


    $openCageCity = getOpenCageCity();
    if($openCageCity->components->_type != 'city') error("City not found.");
    storeAccident($openCageCity);



?>