<?php

use Lib\Proxy\Application;

chdir(dirname(__FILE__));

require "./common.php";

$App = filter_input(INPUT_POST, "APP");
$Controller = filter_input(INPUT_POST, "CONTROLLER");
$app = new Application($App, $Controller);
$app->run();