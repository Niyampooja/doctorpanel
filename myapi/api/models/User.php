<?php
class User {
    private $conn;
    private $table = "users";

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $result = $this->conn->query("SELECT * FROM $this->table");
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }
        return $users;
    }

    public function get($id) {
        $stmt = $this->conn->prepare("SELECT * FROM $this->table WHERE id=?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        return $stmt->get_result()->fetch_assoc();
    }

    public function create($data) {
        $stmt = $this->conn->prepare("INSERT INTO $this->table (name,email) VALUES (?,?)");
        $stmt->bind_param("ss", $data['name'], $data['email']);
        $stmt->execute();
        return $stmt->insert_id;
    }

    public function update($id, $data) {
        $stmt = $this->conn->prepare("UPDATE $this->table SET name=?, email=? WHERE id=?");
        $stmt->bind_param("ssi", $data['name'], $data['email'], $id);
        return $stmt->execute();
    }

    public function delete($id) {
        $stmt = $this->conn->prepare("DELETE FROM $this->table WHERE id=?");
        $stmt->bind_param("i", $id);
        return $stmt->execute();
    }
}
?>