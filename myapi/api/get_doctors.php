<?php
include(__DIR__ . '/../config/db.php');

$result = $conn->query("SELECT id, name FROM doctors");
$data = [];
while($row = $result->fetch_assoc()){
    $data[] = $row;
}
echo json_encode($data);
?>