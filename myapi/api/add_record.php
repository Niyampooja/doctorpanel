<?php
include(__DIR__ . '/../config/db.php');

$patient_id = $_POST['patient_id'] ?? '';
$doctor_id = $_POST['doctor_id'] ?? '';
$record_date = $_POST['record_date'] ?? '';
$description = $_POST['description'] ?? '';

if(!$patient_id || !$doctor_id || !$record_date){
    echo json_encode(["status"=>"error","message"=>"All fields required"]);
    exit;
}

$sql = "INSERT INTO records (patient_id, doctor_id, record_date, description)
        VALUES ('$patient_id', '$doctor_id', '$record_date', '$description')";

echo $conn->query($sql) ? json_encode(["status"=>"success"]) : json_encode(["status"=>"error"]);
?>