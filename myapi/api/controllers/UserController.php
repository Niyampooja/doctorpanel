<?php
require_once "models/User.php";

class UserController {
    private $userModel;

    public function __construct($db) {
        $this->userModel = new User($db);
    }

    public function index() {
        echo json_encode($this->userModel->getAll());
    }

    public function show($id) {
        echo json_encode($this->userModel->get($id));
    }

    public function create() {
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $this->userModel->create($data);
        echo json_encode(["message" => "User created", "id" => $id]);
    }

    public function update($id) {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->userModel->update($id, $data);
        echo json_encode(["message" => "User updated"]);
    }

    public function delete($id) {
        $this->userModel->delete($id);
        echo json_encode(["message" => "User deleted"]);
    }
}
?>