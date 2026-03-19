<?php
require_once __DIR__ . "/controllers/UserController.php";
require_once __DIR__ . "/../config.php";

$controller = new UserController($conn);

// Get URL path
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
$resource = $request[0] ?? '';
$id = $request[1] ?? null;

// Determine method
$method = $_SERVER['REQUEST_METHOD'];

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($resource == "users") {
    switch ($method) {
        case 'GET':
            $id ? $controller->show($id) : $controller->index();
            break;
        case 'POST':
            $controller->create();
            break;
        case 'PUT':
            $controller->update($id);
            break;
        case 'DELETE':
            $controller->delete($id);
            break;
        default:
            echo json_encode(["error" => "Method not allowed"]);
    }
} else {
    echo json_encode(["error" => "Invalid endpoint"]);
}
?>