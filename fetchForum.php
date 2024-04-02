<?php
require "./function.inc.php";

if(isset($_GET['updatePost'])) {
    $data = json_decode($_GET['updatePost']);
    $str = "Content = '$data[1]' WHERE Id";
    $updatePost = new DbRequest("ch", "posts", $str, $data[0]."'");
	$updatePost->controller();
    $post = $data[0].' wurde verändert.. mit Content: '.$data[1];
}

if(isset($_GET['deletePost'])) {
    $id = json_decode($_GET['deletePost']);
    $deletePost = new DbRequest('e', 'posts', 'id = '.$id);
    $deletePost->controller();
    echo "Post mit ID $id wurde gelöscht.";
}
?>