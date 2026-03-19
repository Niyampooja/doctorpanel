<?php

include(__DIR__ . '/../config/db.php');

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

$sql = "SELECT * FROM doctors WHERE email='$email'";
$result = $conn->query($sql);

if ($result && $row = $result->fetch_assoc()) {
    if ($row['password'] == $password) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Wrong password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}
?>