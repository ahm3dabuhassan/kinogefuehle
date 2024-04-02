<?php 
    include "./function.inc.php";
    session_start();
    $userlogin = null;
    $max = null;
    $new = null;
    $forumHeader = "style='width:30%;padding:2%;height:13vh;background-image:linear-gradient(to right ,#F5F6FA 96%, rgba(210, 211, 214, .1));'";
    $forumInfo = "style='display:none;'";
    $mainStyle = 'style="display:block;"';
    $style = 'display: none;';
    $all = "<a id='forum-all' href='./forum.php?all'>Alle Themen</a>";
    if(!isset($_SESSION['userID'])) {
        header('location:../start.php');
    } else {
        $userlogin = 'style="display:block;"';
        $user = $_SESSION['user'];
    }
    include "./head.inc.php";
    $dis = "style='display:flex;'";
    $disForm = "style='display:block;'";
    $out = null;
    $error =  ['s'=>null, 'txt'=>null];
    $style = "style='display:block'"; 
    $topic = "posten";
    if(isset($_GET['Topic'])) { 
        file_put_contents('topicxx.txt', $_GET['Topic']);
        $_SESSION['Topic'] = null;
        $topic = $_GET['Topic'];
        $_SESSION['Topic'] = $topic;
        
        $booting = new Forum($topic, $_SESSION['userID']);
        $response = $booting->askDB();
        if(count($response) > 0) {
           $fetchPosts = $booting->showPosts();
           $out = $fetchPosts;
        } else {
            $data = ['Topic' => $topic, 'userID' => $_SESSION['userID']];
            $makeTopic = new DbRequest('w', 'topics', $data);
            $makeTopic->controller();
            $out = "<h3>Du fangst ein neues Thema über <span style='color:blue;font-weight:bold'>".$_SESSION['Topic']."</span> an</h3>";
        }
    }
    if(isset($_GET['all'])) {
        $all =  null;
        $forumInfo = 'style="display:grid;"';
        $mainStyle = 'style="display:block;width:60%;padding:1%;background-image:linear-gradient(to right ,#F5F6FA 96%, rgba(210, 211, 214, .1));"';
        $dis = "style='display:none;'";
        $disForm = "style='display:none;'";
        $getAll = new DbRequest('r', 'topics', '*');
        $response = $getAll->controller();
        for($i=0; $i<count($response); $i++) {
          $getDate = new DbRequest('r', 'posts', 'MAX(Datum), count(content) As amountOfPosts', 'topicID = "'.$response[$i]['Id'].'"');
          $dateResponse = $getDate->controller();
          $getID = new DbRequest('r','posts','userID','Datum = "'.$dateResponse[0]['MAX(Datum)'].'"');
          $getIDRes = $getID->controller();
          $out .= "<div class='topic-overview'>"; 
          $out .= "<div class='topic-background'></div>";
          $out .= "<a class='topic' href='./forum.php?Topic=".$response[$i]['Topic']."'>".$response[$i]['Topic']."</a>";
          $askForUser = @new DBRequest('r','users','Username', 'id="'.$getIDRes[0]['userID'].'"');
          $userResponse = $askForUser->controller();
          $out .= "<p class='last-post'>Letzter Post am ".@$dateResponse[0]['MAX(Datum)']." von ".@$userResponse[0]['Username']."</p>";
          $out .= "<p class='amountOfPosts'>Anzahl der Posts: ".$dateResponse[0]['amountOfPosts']."</p>";
          $out .= "</div>";
        }
        $maxRequest = new DbRequest('r','posts inner join topics on posts.topicID = topics.Id group by posts.topicID order by c desc limit 1', 'posts.topicID, count(posts.Content) as c,topics.Topic');
        $maxResponse = $maxRequest->controller();
        $max = $maxResponse[0]['Topic'];
        $newRequest = new DbRequest('r','topics GROUP BY Topic order by new desc limit 1', 'MAX(Datum) AS new, Topic');
        $newResponse = $newRequest->controller();
        $new = $newResponse[0]['Topic'];
    }
    if(isset($_GET['newPost']) && isset($_GET['userpost'])) { 
        if ($_GET['userpost'] != '') {
            $topic = $_GET['newPost'];
            $readID = new DbRequest('r', 'topics', 'Id', 'Topic = "'.$_GET['newPost'].'"');
            $response = $readID->controller();
            $post = ['Content' => $_GET['userpost'], 'topicID' => intval($response[0]['Id']), 'userID' => $_SESSION['userID']];
            $insertPost = new Forum($_GET['newPost'], $_SESSION['userID']);
            $go = $insertPost->savePosts($post);     
            if($go == 0) {
                $update = new Forum($_SESSION['Topic'], $_SESSION['userID']);
                $out = $update->showPosts();
            }
        } else {
            $error = ['s'=>'style="display:block;"', 'txt'=>'Texteingabe vom Post ist leer, sorry!'];
        }
    } 
?>
<body>
<script>
    let userID = <?= $_SESSION['userID']; ?>;
</script>
<p id='userPanel' style='<?= $style; ?>'>Hallo, <span style='color:blue;'> <?= $user ;?>!</span><br><a href='./home.php'>Zurück zum Dashboard</a></p>  
<div id='forum-parent-info' <?= $forumInfo ?>>
<div id='forum-info' style=''>
    <h1 style='color:blue;margin-left:5%;'>Forum</h1>
    <p style='margin-left:5%;'>Unter befindet sich die Auflistung von Themen im Forum...</p>
</div>
<div id='forum-info-overview01'>
    <p style='margin-left:5%;'>Am meisten wird es jetzt über <span style='color:blue;font-weight:bold;'><?= $max ?></span> bei uns diskutiert...</p>
</div>
<div id='forum-info-overview02'>
    <p style='margin-left:5%;'>Am neuesten Thema ist <span style='color:blue;font-weight:bold;'><?= $new ?></span></p>
</div>
<div id='forum-slide-container01'>
    <img src="">
</div>
<div id='forum-slide-container02'>
    <img src="">
</div>
</div>
<?= $all; ?>
<h2 <?= $dis; ?> id='forum-thema'><?= $_SESSION['Topic']; ?></h2>
<p id='forum-error' <?= $error['s'] ?>><?= $error['txt']; ?></p>
<div id='forum-main' <?= $mainStyle; ?>>
   <?= $out; ?>
   <div id='forum-input' <?= $disForm; ?>>
   <form action='#' method='get'>
       <textarea name='userpost'></textarea>
       <p id='message' style='display:none;color:red;font-family:monospace;font-weight:bold;height:2vh;'>Sorry, Post ist leer.</p>
        <button id='forum-button-newPost' name='newPost' value='<?= $topic; ?>'>Posten</button>
    </form>
</div>
</div>  
<?php require_once "./footer.inc.php"; ?>
<script src='./js/forum.js'></script>
</body>
