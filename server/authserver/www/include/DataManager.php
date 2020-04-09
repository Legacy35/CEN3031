<?php

    class DataManager {

        private static $instance = NULL;

        private final function __construct(){

        }

        public function getConnection(string $db){
            return new mysqli("127.0.0.1", "dbuser", "MyPasswordIsMoreSecureThanYoursBET", $db);
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
