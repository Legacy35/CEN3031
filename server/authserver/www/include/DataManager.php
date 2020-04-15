<?php

    class DataManager {

        private static $instance = NULL;

        private final function __construct(){

        }

        public function getConnection(string $db){
            return new mysqli("127.0.0.1", "dbuser", "MyPasswordIsMoreSecureThanYoursBET", $db);
        }

        public function getQuizScoresById($id) {
            $conn = DataManager::getInstance()->getConnection("account"); //External code
            if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); 
            $statement = $conn->prepare('SELECT * FROM quizData WHERE user_id = ? ORDER BY id ASC');
            if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred')));
            if(!$statement->bind_param("i", $id)) exit(json_encode(array('error' => 'An internal or external error occurred')));
            if(!$statement->execute()) exit(json_encode(array('error' => 'An internal or external error occurred')));
            $resultSet = $statement->get_result();
            $output = array();
            if($resultSet->num_rows > 0){
                while($row = $resultSet->fetch_assoc()){
                    array_push($output, $row['score']);
                }
          }
          return $output;
        }

        public function getUser(string $token){
          $conn = DataManager::getInstance()->getConnection("account"); //External code
          if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); 

          /*Find the right account and return it*/
          $statement = $conn->prepare("SELECT id, email, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam FROM account WHERE token = ?");
          if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
          if(!$statement->bind_param("s", $token)) error(); 
          if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); 
          $resultSet = $statement->get_result();
          if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Account not found'))); 
          $output = $resultSet->fetch_assoc(); 
          $output['quizScores'] = $this->getQuizScoresById($output['id']);
          return $output;

        }

        public function getUserByEmail(string $email){

            $conn = DataManager::getInstance()->getConnection("account"); //External code
            if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); 
  
  
            /*Find the right account and return it*/
            $statement = $conn->prepare("SELECT id, email, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam FROM account WHERE email = ?");
            if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
            if(!$statement->bind_param("s", $email)) error(); 
            if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); 
            $resultSet = $statement->get_result();
            if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Account not found'))); 
            $output = $resultSet->fetch_assoc(); 
            $output['quizScores'] = getQuizScoresById($output['id']);
            return $output;
    
        }
    
        public function getUserById(mixed $id){

            $conn = DataManager::getInstance()->getConnection("account"); //External code
            if(!$conn || $conn->connect_error) exit(json_encode(array('error' => 'Could not connect to database. :('))); 
  
            /*Find the right account and return it*/
            $statement = $conn->prepare("SELECT id, email, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam FROM account WHERE id = ?");
            if(!$statement) exit(json_encode(array('error' => 'An internal or external error occurred.')));
            if(!$statement->bind_param("i", $id)) error(); 
            if(!$statement->execute()) exit(json_encode(array('error' => 'Query failed. :('))); 
            $resultSet = $statement->get_result();
            if($resultSet->num_rows < 1) exit(json_encode(array('error' => 'Account not found'))); 
            $output = $resultSet->fetch_assoc(); 
            $output['quizScores'] = getQuizScoresById($output['id']);
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
