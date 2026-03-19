<?php
include(__DIR__ . '/../config/db.php');

$result = $conn->query("SELECT m.id, m.record_date, m.description, m.patient_id, m.doctor_id, p.name AS patient_name, d.name AS doctor_name FROM records m JOIN patients p ON m.patient_id = p.id JOIN doctors d ON m.doctor_id = d.id");

$data = [];
while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>