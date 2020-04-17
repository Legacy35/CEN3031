
<?php

    require_once('../../include/DataManager.php');
    require_once('../../include/middleware.php');

    $conn = DataManager::getInstance()->getConnection('account');
    if(!$conn ||$conn->connect_error) error();

   
    if(isset($_GET['email'])&& isset($_COOKIE['token'])){
      if(!getUser($_COOKIE['token'])["super_admin"]) error('You do not have permission to perform this operation.');
      $conn = DataManager::getInstance()->getConnection("account"); //External code
      if(!$conn || $conn->connect_error) error();
      $statement = $conn->prepare("SELECT id, email, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam FROM account WHERE email LIKE CONCAT('%', ?, '%') LIMIT 25");
      if(!$statement) error();
      if(!$statement->bind_param("s", $email)) error();
      if(!$statement->execute()) error();
      $resultSet = $statement->get_result();
      if($resultSet->num_rows < 1) error();
      $output = $resultSet->fetch_assoc();
      $output['quizScores'] = getQuizScoresById($output['id']);
  } else if(isset($_POST['email']) && isset($_POST['admin'])){
      if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation.');
      $_POST['email'] = strtolower($_POST['email']);
      if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) error('Invalid email address provided.');
      $user = DataManager::getInstance()->getUser($_COOKIE['token']);
      if(strtolower($_POST[email]))
      if(!$user["super_admin"]) error('You do not have permission to perform this operation.');
      $conn = DataManager::getInstance()->getConnection("account"); 
      if(!$conn || $conn->connect_error) error();
      $statement = $conn->prepare('UPDATE account SET admin = ? WHERE LOWER(email) = ?');
      if(!$statement) error();
      if(!$statement->bind_param("is",$_POST['admin'], $_POST['email'])) error();
      if(!$statement->execute()) error();
  } else if(!empty($_POST)){
     if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation');
     $user = DataManager::getInstance()->getUser($_COOKIE['token']);
 
     $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : $user['first_name'];
     $lastName = isset($_POST['lastName']) ? $_POST['lastName'] : $user['last_name'];
     $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : $user['phone_number'];
     $address = isset($_POST['address']) ? $_POST['address'] : $user['address'];
     $insuranceCompany = isset($_POST['insuranceCompany']) ? $_POST['insuranceCompany'] : $user['insurance_company'];
     $dashcam = isset($_POST['dashcam']) ? $_POST['dashcam'] : $user['dashcam'];
 
     $statement = $conn->prepare('UPDATE account SET first_name = ?, last_name = ?, phone_number = ?, address = ?, insurance_company = ?, dashcam = ? WHERE token = ?');
     if(!$statement) error();
     if(!$statement->bind_param("sssssis", $firstName, $lastName, $phoneNumber, $address, $insuranceCompany, $dashcam, $_COOKIE['token']));
     if(!$statement->execute()) error();
  } else {
    error('Malformed request');
  }

?>
