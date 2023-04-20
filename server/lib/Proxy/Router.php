<?php

namespace Lib\Proxy;

use ReflectionClass;

class Router
{
    private string $controller;

    public function __construct(string $controller)
    {
        $this->controller = $controller;
    }

    public function run()
    {
        $request = new Request();
        $response = new Response();
        $args = array($request, $response);
        $reflectClass = new ReflectionClass($this->controller);
        $reflectClass->newInstanceArgs($args);
        $response->output();
    }
}