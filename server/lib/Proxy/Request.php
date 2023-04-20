<?php

namespace Lib\Proxy;

use function filter_input;

class Request
{

    public function getPostParam(string $name)
    {
        return filter_input(INPUT_POST, $name);
    }

    public function getQueryParam(string $name)
    {
        return filter_input(INPUT_GET, $name);
    }

}