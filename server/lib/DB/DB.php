<?php

namespace Lib\DB;

class DB
{
    private static array $configs;

    public static function register(string $name, DBInterface $db): void
    {
        self::$configs[$name] = $db;
    }

    public static function get(string $name = "default"): DBInterface
    {
        return self::$configs[$name];
    }

    private function __construct()
    {
    }

    private function __clone()
    {
    }
}