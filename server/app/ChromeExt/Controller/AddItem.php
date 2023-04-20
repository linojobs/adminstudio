<?php

namespace App\ChromeExt\Controller;

use App\ChromeExt;
use Lib\Proxy\Error;
use Lib\Proxy\Request;
use Lib\Proxy\Response;

class AddItem
{
    public function __construct(Request $request, Response $response)
    {
        $title = $request->getPostParam("title");
        $linkId = $request->getPostParam("linkId");
        $link = $request->getPostParam("link");
        $image = $request->getPostParam("image");
        $tags = $request->getPostParam("tags");

        $itemVo = new ChromeExt\Model\Item();
        $itemVo->setTitle($title);
        $itemVo->setLinkId($linkId);
        $itemVo->setUrl($link);
        $itemVo->setImage($image);
        $itemVo->setTags($tags);

        $itemSaver = new ChromeExt\Model\ItemSaver();
        $successful = $itemSaver->save($itemVo);

        $output = $successful ? array("code" => 0) : array("code" => 1, "msg" => Error::pop());

        $response->json($output);

    }

}