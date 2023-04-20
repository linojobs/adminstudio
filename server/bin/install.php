<?php

use Lib\Proxy\Application;

chdir(dirname(__FILE__));

require "../common.php";

$app = new Application("ChromeExt", "Install");
$app->run();