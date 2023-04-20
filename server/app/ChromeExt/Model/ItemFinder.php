<?php

namespace App\ChromeExt\Model;

use Lib\DB\DB;

class ItemFinder
{
    public function fetchAll()
    {
        $mysql = DB::get();
        $mysql->query("select * from t_items order by id desc");
        $result = $mysql->getResult();
        return $result;
    }
}