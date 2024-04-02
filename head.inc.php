<?php 

?>
<!DOCTYPE html>
<head>
	<title>Kinogefühle</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
	<link rel="stylesheet" href="./css/style.css">
</head>
<body>
<nav>
            <a href="./start.php"><div id='logo'>
                <p>Kino</p>
                <p>gefühle.</p>
            </div>
</a>
            <div id='selection'> 
                <a class='mq-element' href="#">Über</a>
                <div></div>
                <a class='mq-element' href="./filme.php">Filme</a>
                <div></div>
                <a class='mq-element' href="#">Blog</a>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                
            </div>
            <div id='menu'>
                <input type='checkbox' id='menu-input'>
                <div>
                <label for='menu-input'>
                    <div></div>
                    <div></div>
                    <div></div>
                </label>
                </div>
                <ol id='menu-show'> 
                    <li class='menuAnimL'><a class='menuAnimA' href='#'>Gefühle entdecken</a></li>
                    <li class='menuAnimL'><a class='menuAnimA' href='#'>Anmelden</a></li>
                    <li class='menuAnimL'><a class='menuAnimA' href='#'>Etwas_01</a></li>
                    <li class='menuAnimL'><a class='menuAnimA' href='#'>Etwas_02</a></li>
                    <li><a href='./start.php?logout' <?= $userlogin ?> id='head-logout'>Abmelden</a></li>
                </ol>
            </div>
            <div id='finder' style='padding:1%;border:1px solid #BFBEBB;border-radius:10px;width:65%;height:3vh;grid-column:2/3;grid-row:1/3;align-self:center;justify-self:center;display:flex;align-items:center;'>
            <input type='find' style='width:85%;margin-left:2%;' placeholder='Filme, Gefühle...'>
            </div>
            <div id='outOfFinder' style='background:rgba(128, 128, 128, 0.8);display:none;position:absolute;top:16%;left:28%;border-radius:10px;padding:1%;z-index:111;width:20%'></div>
        </nav>