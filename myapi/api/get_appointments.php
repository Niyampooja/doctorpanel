<?php
include(__DIR__ . '/../config/db.php');

$result = $conn->query("
    SELECT a.id, a.appointment_date, a.status, 
           p.name AS patient_name, d.name AS doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.id
    JOIN doctors d ON a.doctor_id = d.id
");

$data = [];
while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>