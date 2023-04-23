<?php

if (php_sapi_name() != "cli") {
    die("This program must be run under cli");
}

chdir(dirname(__FILE__));

require "./SqlFile.php";
require "./SqlParser.php";
require "./VersionScanner.php";

$versions = new \Installer\VersionScanner(realpath("./patchs"));
$versions->scan();

while (true) {

    try {
        $mysql = mysqli_connect(
            getenv("DB_HOST", true),
            getenv("DB_USER", true),
            getenv("DB_PWD", true),
            null,
            getenv("DB_PORT", true)
        );
        break;
    } catch (\Throwable $th) {
    }
}

foreach ($versions as $version) {
    printf("%s", $version["sql"]);
    $sqls = new \Installer\SqlFile($version["sql"]);
    foreach ($sqls as $sql) {
        $mysql->query($sql);
    }
}

$mysql->close();
