<?php
function ImageSize($image, $size = null)
{
    if (is_null($size))
        return $image;
    if (!is_integer($size))
        return $image;
    // find format
    $formatStart = strpos($image, "&Format=");
    $formatEnd = strpos($image, "&", $formatStart + 1);
    $foramt = substr($image, $formatStart, $formatEnd - $formatStart);
    return str_replace($foramt, sprintf("&Format=_SL%d_", $size), $image);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="china products,low price product,boy toys,girl toys">
    <meta name="keywords" content="china products,low price product,boy toys,girl toys">
    <meta name="author" content="moonandpence.com">
    <title>The Moon And Pence</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .items {
            width: 100%;
            display: grid;
            margin: 0 auto;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        }

        .item {
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            height: 550px;
            padding: 0 8px;
            position: relative;
        }

        .item-title {
            margin-top: 8px;
            font-weight: 600;
        }

        .item-price {
            position: relative;
        }

        .item-price>span[data-role=sb] {
            font-size: 13px;
            position: relative;
            top: -.75em;
            margin-right: -0.25em;
        }

        .item-price>span[data-role=p1] {
            font-size: 24px;
            position: relative;
            top: -.1em;
        }

        .item-price>span[data-role=p2] {
            font-size: 13px;
            position: relative;
            top: -.75em;
            margin-left: -0.25em;
        }

        .item:hover>.item-title {
            color: #C7511F;
        }

        .item-image {
            width: 300px;
            height: 300px;
        }

        .item-link {
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
        }
    </style>
</head>

<body>
    <div class="col-wrap">
        <div class="col-2"></div>
        <div class="col-22">
            <div class="items">
                <?php foreach ($items as $item): ?>
                    <div class="item">
                        <img class="item-image" src="<?php echo ImageSize($item['image'], 300); ?>" />
                        <a class="item-link" aria-details="<?php echo $item['title']; ?>" href="<?php echo $item['url']; ?>"
                            title="<?php echo $item['title']; ?>"></a>
                        <p class="item-title">
                            <?php echo $item['title']; ?>
                        </p>
                        <div class="item-price">
                            <span data-role="sb">&dollar;</span>
                            <span data-role="p1">968</span>
                            <span data-role="p2">12</span>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</body>

</html>