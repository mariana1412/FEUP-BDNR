<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Another Book</title>
</head>
<body>
    <h1>Book? It!</h1>
    <h2>Add new book</h2>
    <hr>
    <form action="bookit.php" method="post">
        <label for="URL">Book URL:</label>
        <input id="URL" type="text" name="URL" placeholder="URL to book">
        <label for="tags">Book tags:</label>
        <input id="tags" type="text" name="tags" placeholder="Comma separated tags!">
        <button type="submit">Add or update bookmark!</button>
    </form>
    <hr>
    <a href="index.php">Home</a>
</body>
</html>