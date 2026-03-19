<?php
include(__DIR__.'/../config/db.php');

$id = $_POST['id'] ?? '';
$date = $_POST['date'] ?? '';

$sql = "UPDATE appointments SET appointment_date='$date' WHERE id='$id'";
echo $conn->query($sql) ? json_encode(["status"=>"success"]) : json_encode(["status"=>"error"]);
?>