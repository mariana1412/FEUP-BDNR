<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BOOK? It</title>
</head>
<body>
    <h1>Book? It!</h1>
    <h2>Latest books</h2>
    <?php
        $tags = $_GET['tags'];
        if ($tags) { ?>
            <h3>Books tagged: <?= $tags ?></h3>
        <?php }
    ?>
    <hr>
    <ul>
        <?php
            require __DIR__ . '/vendor/autoload.php';

            Predis\Autoloader::register();
        
            try {
                // Connect to the localhost Redis server.
                $redis = new Predis\Client();
                if ($tags) {
                    $tags = explode(",", $tags);
                    foreach ($tags as &$tag) {
                        $tag = "tag:" . $tag;
                    }
                    $books = $redis->sinter($tags);
                } else {
                    $books = $redis->smembers("books");
                }
                foreach ($books as $book) { ?>
                    <li>
                        <a href=<?= $redis->get($book) ?>><?= $redis->get($book) ?></a>
                        <br>
                        <span>
                            tags:
                            <?php 
                            foreach ($redis->smembers($book . ":tags") as $tag) { ?>
                                <a href=<?php 
                                    if($tags) {
                                        echo $_SERVER['REQUEST_URI'] . "," . $tag;
                                    } else {
                                        echo $_SERVER['REQUEST_URI'] . "?tags=" . $tag;
                                    }
                                ?>>
                                    <?= $tag ?>
                                </a>
                            <?php }
                        ?></span>
                    </li>
                <?php
                }
            } catch (Exception $e) {
                print $e->getMessage();
            };
        ?>
    </ul>
    <hr>
    <a href="index.php">Home</a> | <a href="add.php">Add book!</a>
</body>
</html>