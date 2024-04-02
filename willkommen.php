<?php
    require_once "./head.inc.php";
	require_once "./function.inc.php";
	$userlogin = null
?>
<div id='willkommen-main'>
    	<div>
			<?php
				 if(isset($_GET['sended'])) { 
					unset($_GET['sended']);
					$regEx = @new RegexTest($_GET);
					$score = $regEx->go();
					if ($score) {
						$_GET['Password'] = password_hash($_GET['Password'], PASSWORD_DEFAULT); 
						$newUser = @new DbRequest('w', 'users', $_GET);
						$res = $newUser->controller();
						echo "<div>";
						echo "<p id='willkommen-p'><span style='font-size:3vh;'>Hallo, ".$_GET['Firstname']."</span>, du hast Dich unter <span style='color:blue;'>".$_GET['Username']."</span> bei Kinogefühle registriert. Meld Dich sofort ein!</p>";
						echo "<a href='./start.php' style='border:1px solid blue;border-style:dashed;padding:2%;text-decoration:none;font-family:futura'>Zur Anmeldungseite</a>";
						echo "</div>";
					} else {
						echo "False";
					}
				}
			?>
        </div>
        <img src='./img/start/w01.jpg'>
        <div class='willkommen-dar'></div>
        <div class='willkommen-dar'></div>
        <div class='willkommen-dar'></div>
</div>
<?php
  require_once "./footer.inc.php";	
?>
<script src='./js/willkommen.js'>
	
</script>