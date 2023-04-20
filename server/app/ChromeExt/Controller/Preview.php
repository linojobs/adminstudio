<?php

namespace App\ChromeExt\Controller;

use App\ChromeExt;
use Lib\Proxy\Request;
use Lib\Proxy\Response;

class Preview
{
    public function __construct(Request $request, Response $response)
    {
        $finder = new ChromeExt\Model\ItemFinder();
        $result = $finder->fetchAll();
        $data = array(
            'items' => $result
        );

        ob_start();
        extract($data);
        chdir(dirname(__FILE__));
        require "./template/index.html.php";
        $content = ob_get_clean();
        $response->html($content);
    }
}