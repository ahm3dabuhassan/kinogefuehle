<?php 
    $style = 'display:block';
    session_start();
    $userlogin = 'style="display:block;"';

    include './head.inc.php';
    include './function.inc.php'; 
    ?>
    <body onload='init();'>
    <p id='userPanel' style='<?= $style; ?>'>Hallo,<span style='color:red;font-weight:500;font-size:14px;'> <?= $_SESSION['user'] ;?>!</span></p>
    <div id='home-main'>
		<div id='sider'>
			<a href='#' id='admin-user' value="<?= $_SESSION['userID'] ?>">Alle Users<span style='color: red; font-weight:bold; font-size: 22px;'> :.{</span></a>
            <a href='#' id='admin-film' value="<?= $_SESSION['userID'] ?>">Filmen in Datenbank<span style='color: red; font-weight:bold; font-size: 22px;'> :.{*}</span></a>		
			<a href='#' id='admin-post' value="<?= $_SESSION['userID'] ?>">Alle Posts im Forum<span style='color: red; font-weight:bold; font-size: 22px;'> :.a</span></a>	
		</div>
		<div id='overview'>
		</div>
	</div>
    <?php require_once "./footer.inc.php"; ?>
    <script src='./js/admin.js'></script>
    </body>
    </html>
  