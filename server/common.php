<?php

use Lib\Autoload;
use Lib\DB\DB;
use Lib\DB\Mysql;
use Lib\Proxy\Error;

chdir(dirname(__FILE__));

require "./lib/Autoload.php";
require "./lib/Proxy/Error.php";

define("ROOT", dirname(__DIR__));
define("PATCHS_DIR", realpath("./patchs"));
define("DEBUG", getenv("DEBUG"));

Error::init();

set_error_handler(function (int $errno, string $errstr, string $errfile, int $errline) {
    Error::push($errstr);
});

$autoload = Autoload::getInstance()
    ->addMap("Lib", realpath("./lib"))
    ->addMap("App", realpath("./app"));

// this connection using db
$conn = new Mysql(
    getenv("DB_HOST", true),
    getenv("DB_USER", true),
    getenv("DB_PWD", true),
    getenv("DB_PORT", true),
    getenv("DB_DB", true)
);
DB::register('default', $conn);

// this connection is just used to install app
$conn2 = new Mysql(
    getenv("DB_HOST", true),
    getenv("DB_USER", true),
    getenv("DB_PWD", true),
    getenv("DB_PORT", true)
);
DB::register('install', $conn2);