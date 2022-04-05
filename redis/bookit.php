<?php
    $url = $_POST['URL'];
    $tags = explode(",", $_POST['tags']);

    require __DIR__ . '/vendor/autoload.php';

    Predis\Autoloader::register();

    try {
        // Connect to the localhost Redis server.
        $redis = new Predis\Client();
        $redis->incr("next_book_id");
        $book_id = $redis->get("next_book_id");
        $redis->set("book:" . $book_id, $url);
        $redis->sadd("books", "book:" . $book_id);
        foreach ($tags as $tag) {
            $tag = trim($tag);
            $redis->sadd("tag:" . $tag, "book:" . $book_id);
            $redis->sadd("book:" . $book_id . ":tags", $tag);
        }
    } catch (Exception $e) {
        print $e->getMessage();
    };

    
    header("Location: index.php");
    exit();
?>