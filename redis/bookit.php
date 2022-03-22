<?php
    $url = $_POST['URL'];
    $tags = $_POST['tags'];

    require __DIR__ . '/vendor/autoload.php';

    Predis\Autoloader::register();

    try {
        // Connect to the localhost Redis server.
        $redis = new Predis\Client();
        $redis->incr("next_book_id");
        $redis->set("bookmark:" . $redis->get("next_book_id"), $url);
    } catch (Exception $e) {
        print $e->getMessage();
    };

    
    header("Location: index.php");
    exit();
?>