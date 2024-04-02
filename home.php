<?php 
    session_start();	
	$user = null;
	$admin = null;
	$sendID = null;
  require "./function.inc.php";
  if(isset($_GET['login'])) {
    	$login = new DbRequest('r', 'users', '*', "Username = '".$_GET['user']."'");
    	$res = $login->controller();
		if(count($res) > 0) {
			if(password_verify($_GET['pass'], $res[0]['Password'])) {
			 $_SESSION['userID'] = $res[0]['Id'];
		   $_SESSION['user'] = $res[0]['Username'];
		   if($res[0]['Id'] == 1) {
			   $_SESSION['admin'] = $res[0]['Id'];
			   $userlogin = 'style="display:block;"';
			   header('Location:admin.php');
		   }
	   }else{
			 header('Location:./start.php');
		 }
		}else {
			header('Location:./start.php');
		}
    }  
	if(!isset($_SESSION['userID'])) {
		header('location:./start.php');	
	} else {
		$user = $_SESSION['user'];
		$userlogin = 'style="display:block;"';
	}
    if(isset($_GET['sended'])) { 
    	unset($_GET['sended']);
    	$regEx = new RegexTest($_GET);
    	$score = $regEx->go();
    	if ($score) {
    		$_GET['Password'] = password_hash($_GET['Password'], PASSWORD_DEFAULT); 
  			$newUser = new DbRequest('w', 'users', $_GET);
    		$res = $newUser->controller();
    		echo "<p style='color: blue; font-weight; font-family: futura;'>Hello, ".$_GET['Username'].", bei Kino Gefühle</p>";
    		echo "<a href='../start.php'>Zur Anmeldungseite</a>";
    	} else {
    		echo "False";
    	}
    }
require_once "./head.inc.php";
?>
   <p id='userPanel' <?= $userlogin; ?>>Hallo,<span style='color:blue;font-weight:500;font-size:14px;'> <?= $user ;?>!</span></p>
	<div id='home-main'>
		<div id='sider'> 
			<a href='#' id='userFilm' value="<?= $_SESSION['userID'] ?>">Deine Filme<span class='span-break' style='display:none;width:1px;height:1px;'><br></span><span class='sider-button-icon' style='color: blue; font-weight:bold; font-size: 19px;'> :.{</span></a>
			<a href='#' id='userPost' value="<?= $_SESSION['userID'] ?>">Deine Posts im Forum<span class='span-break' style='display:none;width:1px;height:1px;'><br></span><span class='sider-button-icon' style='color: blue; font-weight:bold; font-size: 19px;'> :.a</span></a>	
			<a href='#' id='userExplore' value="<?= $_SESSION['userID'] ?>">Filme Entdecken<span class='span-break' style='display:none;width:1px;height:1px;'><br></span><span class='sider-button-icon' style='color: blue; font-weight:bold; font-size: 19px;'> :.!=</span></a>		
		</div>
		<div id='overview'>
			<?=  $admin; ?>
			<div id='addFilm'>
				<p id='status' style='color:orange; font-family:monospace; font-weight:bold'></p>
				<h3>Füg einen Film ein<span style='color: blue; font-weight:bold; font-size: 36px;'>.</span></h3>	
					<button id='addFilm-button' name='addFilm' value='<?= $_SESSION['userID'] ?>'>Add..[ ]</button>
					<button id='addFilm-cancel'>Cancel..[ ]</button>
			</div>
		</div>
	</div>
	<?php
		require_once "./footer.inc.php";	
	?>
<script src="./js/home.js"></script>
