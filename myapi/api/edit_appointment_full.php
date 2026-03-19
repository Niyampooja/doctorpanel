<?php
include(__DIR__.'/../config/db.php');

$id = $_POST['id'] ?? '';
$doctor_id = $_POST['doctor_id'] ?? '';
$patient_id = $_POST['patient_id'] ?? '';
$date = $_POST['date'] ?? '';
$status = $_POST['status'] ?? '';

$sql = "UPDATE appointments SET 
        doctor_id='$doctor_id',
        patient_id='$patient_id',
        appointment_date='$date',
        status='$status'
        WHERE id='$id'";

echo $conn->query($sql) ? json_encode(["status"=>"success"]) : json_encode(["status"=>"error"]);
?>
