<?php 
    require "./function.inc.php";
    $userlogin = 'style="display: none;"';
    $user = null;
    session_start();
    if(isset($_SESSION['userID'])) {
        $userlogin = 'style="display:block;"';
        $user = $_SESSION['user'];
    } 
    include './head.inc.php';
    $read = new DbRequest('r', 'film INNER JOIN users on film.userID = users.ID', 'Titel, Regisseur, Genre, Datum, Poster, Username');
    $data = $read->controller();
    $reqGenre = new DbRequest('r', 'film', 'distinct(Genre)');
    $res = $reqGenre->controller();
?>
<div>
    <div id='filter'>
        <?php 
            for($i=0;$i<count($res);$i++){
                foreach($res[$i] as $v){
                    echo "<button class='filter-button' id='".$v."'>".$v."</button>";
                }
            }
        ?>
    </div>
    <p id='userPanel' <?= $userlogin ?>>Hello, <span style='color:blue;'> <?= $user ;?>!</span><br><a href='./home.php'>Zurück zu Dashboard</a></p>
    <h1 style='margin-top:2%;margin-bottom:3%;'>Unsere Filme<span style='color:blue;font-weight:bold'>:</span></h1>
    <div id='filme-main'>
    <?php
        foreach($data as $v) {
           $withoutWhitespace = str_replace(" ", "", $v['Titel']);
           echo "<p class='genre'>".$v['Genre']."</p>";
           echo "<div class='parent' id='".$v['Genre']."'>";
           echo "<a href='./filmpages/".$withoutWhitespace.".php'><div><div><div></div></div></div><img id='poster' width='100%' height='330vh' src='./poster/".$v['Poster']."'><div><div><div></div></div></div>";
           echo "<p>".$v['Titel'].".</p>";
           echo "</a>";
           echo "</div>";
        }
    ?>
    </div>
    <div id='info'><p style='font-size:30px;font-weight:bold;margin-bottom:1%;'>Hallo,</p><p>aus dieser Auswahl kannst du einen <span style='font-size:18px;font-weight:bold;'>Film</span> wahlen, um zu erfahren, was jemand darüber <span style='font-size:18px;font-weight:bold;'>meint</span></p><p>.</p></div>
</div>
<?php
		require_once "./footer.inc.php";	
?>
<script src="./js/filme.js" defer></script>

