<?php
include(__DIR__ . '/../config/db.php');

$id = $_GET['id'] ?? 0;

$sql = "SELECT a.id, a.appointment_date, a.status, 
               a.doctor_id, a.patient_id,
               p.name AS patient_name, d.name AS doctor_name
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.id = '$id'";

$result = $conn->query($sql);

if($result && $result->num_rows > 0){
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(null);
}
?>