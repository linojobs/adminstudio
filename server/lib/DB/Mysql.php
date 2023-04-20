<?php

namespace Lib\DB;

use PDO;

class Mysql implements DBInterface
{

    private string $host;

    private string $user;

    private string $pwd;

    private int $port;

    private string $db;

    private PDO|null $instance;

    private mixed $last_id;

    private array $result;

    public function __construct(string $host, string $user, string $pwd, int $port, string $db = '')
    {
        $this->host = $host;
        $this->user = $user;
        $this->pwd = $pwd;
        $this->port = $port;
        $this->db = $db;
        $this->instance = null;
        $this->last_id = null;
        $this->result = array();
    }

    public function __destruct()
    {
    }

    private function connect()
    {
        if (!($this->instance instanceof PDO)) {
            if (empty($this->db)) {
                $dsn = sprintf("mysql:host=%s;port=%d", $this->host, $this->port);
            } else {
                $dsn = sprintf("mysql:host=%s;port=%d;dbname=%s", $this->host, $this->port, $this->db);
            }
            $this->instance = new PDO(
                $dsn,
                $this->user,
                $this->pwd,
            );
        }
    }

    public function query(string $sql, array $params = array()): bool
    {
        try {
            $this->connect();
            if (empty($params)) {
                $result = $this->instance->query($sql);
                if ($result === false) {
                    trigger_error($this->instance->errorInfo(), E_USER_ERROR);
                    return false;
                }
                $this->result = $result->fetchAll(PDO::FETCH_ASSOC);
                $this->last_id = $this->instance->lastInsertId();
            } else {
                $stmt = $this->instance->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
                $bool = $stmt->execute($params);
                if ($bool === false) {
                    trigger_error($stmt->errorInfo(), E_USER_ERROR);
                    return false;
                }
                $this->result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $this->last_id = $this->instance->lastInsertId();
            }
            return true;
        } catch (\Throwable $th) {
            trigger_error($th->getMessage(), E_USER_ERROR);
            return false;
        }
    }

    public function getResult(): array
    {
        return $this->result;
    }

    public function getLastId(): mixed
    {
        return $this->last_id;
    }
}