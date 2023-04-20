<?php

namespace App\ChromeExt\Controller;

use Lib\DB\DB;
use Lib\Installer\SqlFile;
use Lib\Installer\VersionScaner;
use Lib\Proxy\Error;
use Lib\Proxy\Request;
use Lib\Proxy\Response;

class Install
{
    public function __construct(Request $request, Response $response)
    {
        $mysql = DB::get("install");
        $versions = new VersionScaner(PATCHS_DIR);
        $versions->scan();
        foreach ($versions as $version) {
            printf("%s\n", $version["sql"]);
            $sql = new SqlFile($version['sql']);
            foreach ($sql as $key => $s) {
                if ($mysql->query($s) === false) {
                    printf("%s\n", Error::pop());
                }
            }
        }
    }
}