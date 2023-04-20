<?php

namespace Lib;

use function spl_autoload_register;

class Autoload
{

    private static $instance;

    private array $map;

    public static function getInstance()
    {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function addMap(string $namespace, string $file): Autoload
    {
        $this->map[$namespace] = $file;
        return $this;
    }

    public function load($class)
    {
        $spec = explode("\\", $class);
        $namespace = array_shift($spec);
        $file = sprintf("%s%s%s.php", $this->map[$namespace], DIRECTORY_SEPARATOR, join(DIRECTORY_SEPARATOR, $spec));
        require_once $file;
    }

    private function __construct()
    {
        spl_autoload_register(array($this, "load"));
    }

    private function __clone()
    {
    }
}