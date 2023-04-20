<?php

namespace Lib\Proxy;

class Application
{

    private string $app;

    private string $controller;

    public function __construct(string $app, string $controller)
    {
        $this->app = $app;
        $this->controller = $controller;
    }

    public function run()
    {
        $controller = sprintf("App\\%s\\Controller\\%s", $this->app, $this->controller);
        $router = new Router($controller);
        $router->run();
    }

}