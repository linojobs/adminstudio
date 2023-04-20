<?php

namespace App\ChromeExt\Model;

use Lib\DB\DB;

class ItemSaver
{
    public function __construct()
    {
    }

    public function save(Item $item): bool
    {
        $mysql = DB::get();
        $params = array(
            "linkId" => $item->getLinkId(),
            "title" => $item->getTitle(),
            "image" => $item->getImage(),
            "url" => $item->getUrl(),
            "tags" => $item->getTags()
        );
        $successful = $mysql->query(
            "insert into t_items(link_id,title,image,url,tags)values(:linkId,:title,:image,:url,:tags)",
            $params
        );
        if ($successful) {
            $item->setId($mysql->getLastId());
        }
        return $successful;
    }
}