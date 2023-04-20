<?php

namespace Lib\Proxy;

class Error
{
    private static mixed $message;

    public static function init()
    {
        self::$message = [];
    }

    public static function push(string $message)
    {
        self::$message[] = $message;
    }

    public static function pop(): string
    {
        return array_pop(self::$message);
    }
}