<?php

namespace Lib\Installer;

class Processer
{

    public function executeSql(string $dml)
    {
        printf("%s\n", $dml);
    }
}