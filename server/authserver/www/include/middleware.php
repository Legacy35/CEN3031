<?php
/*Convert Axios/Node POST request into PHP-readable POST request*/
$data = json_decode(file_get_contents("php://input"));
if($data){
    foreach($data as $key => $val){
        $_POST[$key] = $val;
    }
}
header('Content-type: application/json');// returning a JSON object

function error($message = "An internal or external error occurred") { 
    exit(json_encode(array('error' => $message)));
}

?>
