<?php
include(__DIR__ . '/../config/db.php');

$name = $_POST['name'] ?? '';
$age = $_POST['age'] ?? '';
$gender = $_POST['gender'] ?? '';
$phone = $_POST['phone'] ?? '';

$sql = "INSERT INTO patients (name, age, gender, phone)
VALUES ('$name', '$age', '$gender', '$phone')";

if ($conn->query($sql)) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>