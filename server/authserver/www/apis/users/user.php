
<?php

    require_once('../../include/DataManager.php');
    require_once('../../include/middleware.php');

    $conn = DataManager::getInstance()->getConnection('account');
    if(!$conn ||$conn->connect_error) error();

    /*Permission check*/
    if(!isset($_COOKIE['token'])) error('You must be signed in to perform this operation');
    $user = DataManager::getInstance()->getUser($_COOKIE['token']);

    $firstName = isset($_POST['firstName']) ? $_POST['firstName'] : $user['first_name'];
    $lastName = isset($_POST['lastName']) ? $_POST['lastName'] : $user['last_name'];
    $phoneNumber = isset($_POST['phoneNumber']) ? $_POST['phoneNumber'] : $user['phone_number'];
    $address = isset($_POST['address']) ? $_POST['address'] : $user['address'];
    $insuranceCompany = isset($_POST['insuranceCompany']) ? $_POST['insuranceCompany'] : $user['insurance_company'];
    $dashcam = isset($_POST['dashcam']) ? $_POST['dashcam'] : $user['dashcam'];

    $statement = $conn->prepare('UPDATE account SET first_name = ?, last_name = ?, phone_number = ?, address = ?, insurance_company = ?, dashcam = ? WHERE token = ?');
    if(!$statement) error("sssssis");
    if(!$statement->bind_param());
 
?>