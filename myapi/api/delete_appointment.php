<?php
include(__DIR__.'/../config/db.php');

$id = $_POST['id'] ?? '';

$sql = "DELETE FROM appointments WHERE id='$id'";
echo $conn->query($sql) ? json_encode(["status"=>"success"]) : json_encode(["status"=>"error"]);
?>