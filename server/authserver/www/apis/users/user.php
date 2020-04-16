
<?php

    require_once('../../include/DataManager.php');
    require_once('../../include/middleware.php');

    $conn = DataManager::getInstance()->getConnection('account');
    if(!$conn ||$conn->connect_error) error();

    /*Permission check*/
    if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation');
    if(!empty($_POST)){
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
  }else if(isset($_GET['email'])&& isset($_COOKIE['token']){
  if(!getUser($_COOKIE['token'])["super_admin"]) error('You need to be Super Admin!');
      $conn = DataManager::getInstance()->getConnection("account"); //External code
      if(!$conn || $conn->connect_error) error();
      $statement = $conn->prepare("SELECT id, email, admin, super_admin, first_name, last_name, address, phone_number, insurance_company, dashcam FROM account WHERE email LIKE CONCAT('%', ?, '%') Limit 25");
      if(!$statement) error();
      if(!$statement->bind_param("s", $email)) error();
      if(!$statement->execute()) error();
      $resultSet = $statement->get_result();
      if($resultSet->num_rows < 1) error();
      $output = $resultSet->fetch_assoc();
      $output['quizScores'] = getQuizScoresById($output['id']);
  }
  else if(isset($_POST['id'])&& (isset($_POST['update'])&& $_POST['update'])&&isset($_POST['status'])&&isset($_COOKIE['token']){
    if(!getUser($_COOKIE['token'])["super_admin"]) error('You need to be Super Admin!');
    $conn = DataManager::getInstance()->getConnection("account"); //External code
    if(!$conn || $conn->connect_error) error();
    $statement = $conn->prepare('UPDATE account SET admin = ? WHERE id = ?');
    if(!$statement) error();
    if(!$statement->bind_param("ii",$_POST['status'], $_POST['id'])) error();
    if(!$statement->execute()) error();
  }

?>
