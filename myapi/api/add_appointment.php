<?php
include(__DIR__.'/../config/db.php');

$doctor_id = $_POST['doctor_id'] ?? '';
$patient_id = $_POST['patient_id'] ?? '';
$date = $_POST['date'] ?? '';

if($doctor_id && $patient_id && $date){
    $sql = "INSERT INTO appointments (doctor_id, patient_id, appointment_date, status)
            VALUES ('$doctor_id','$patient_id','$date','pending')";
    echo $conn->query($sql) ? json_encode(["status"=>"success"]) : json_encode(["status"=>"error","msg"=>$conn->error]);
} else {
    echo json_encode(["status"=>"error","msg"=>"Missing fields"]);
}
?>