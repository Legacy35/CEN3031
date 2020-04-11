<?php

    class DataManager {

        private static $instance = NULL;

        private final function __construct(){

        }

        public function getConnection(string $db){
            return new mysqli("127.0.0.1", "dbuser", "MyPasswordIsMoreSecureThanYoursBET", $db);
        }
        public function getUser(string $token){
          $conn = DataManager::getInstance()->getConnection("account"); //External code
          if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); //Converts PHP associative array into JS object & sends to client
          //The exit function is basically the same as res.send() in Node. ALl code after calling exit will not execute.

          /*Find the right account and return it*/
          $statement = $conn->prepare("SELECT id, email, admin, super_admin FROM account WHERE token = ?"); //Creates the fill in the blank SQL statement, but variables are not yet decided. Does not execute the statement until we call the execute function.
          if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
          if(!$statement->bind_param("s", $token)) error(); //Puts the string "$token" in the blank. 10 strings would use "ssssssssss" followed by 10 string variables for subsequent values.
          if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); //Execute the actual SQL query. If it fails, the returuend object will evaluate to false, meaning we call the exit function.
          $resultSet = $statement->get_result(); //Extract the data results from the qery & store in the $resultSet variable
          if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Account with provided token not found.'))); //Make sure we have more than 0 results
          $output = $resultSet->fetch_assoc(); //Convert the result set object into a PHP assoictae array (Map/HashMap)
          //In this case, since the database schema has the id, email, password_hash, token, and admin fields, then we would get an object with those values.

          //Lookup quiz scores
          $id = $output['id'];
          $statement = $conn->prepare('SELECT * FROM quizData WHERE user_id = ? ORDER BY id ASC');
          if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred')));
          if(!$statement->bind_param("i", $id)) exit(json_encode(array('error' => 'An internal or external error occurred')));
          if(!$statement->execute()) exit(json_encode(array('error' => 'An internal or external error occurred')));
          $resultSet = $statement->get_result();
          $output['quizScores'] = array();
          if($resultSet->num_rows > 0){
              while($row = $resultSet->fetch_assoc()){
                  array_push($output["quizScores"], $row['score']);
              }
          }
            return $output;
        }

        public static function getInstance(){
            if(static::$instance == NULL){
                static::$instance = new DataManager();
                return static::$instance;
            } else {
                return static::$instance;
            }
        }

    }

?>
