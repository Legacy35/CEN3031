<?php

    class DataManager {

        private static $instance = NULL;

        private final function __construct(){

        }

        public function getAuthConnection(){
            return new mysqli("localhost", "authentication", "password", "authentication");
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