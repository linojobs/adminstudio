<?php

namespace Lib\Proxy;

class Response
{

    private mixed $buffer;

    public function __construct()
    {
        $this->buffer = "";
    }

    public function setAllowOrigin(string $origin): Response
    {
        header(sprintf("Access-Control-Allow-Origin:%s", $origin));
        return $this;
    }

    public function json(array $data): Response
    {
        header("Content-type:application/json");
        $this->buffer = json_encode($data);
        return $this;
    }

    public function html(string $html): Response
    {
        header("Content-type:text/html");
        $this->buffer = $html;
        return $this;
    }

    public function output()
    {
        echo $this->buffer;
    }
}