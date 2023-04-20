<?php

namespace Lib\DB;


interface DBInterface
{
    public function query(string $sql, array $params = array()): bool;
    public function getResult(): array;
    public function getLastId(): mixed;
}