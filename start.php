<?php 
	$userlogin = 'style="display: none;"';
	if(!isset($_SESSION)) 
    { 
		session_start(); 
		if(isset($_SESSION['userID'])) {
			header('location:./home.php');	
		} 
    } 
	if(isset($_GET['logout'])) {
		@session_destroy();
		$_SESSION = null;
	} 
	if(isset($_SESSION['userID'])) {
		header('location:./home.php');	
	} 
	include './head.inc.php';
?>
		<main>
			<div id='main-header'>
			<h2>Der Platz für die Fans des Kinos</h2>
				<div id='border'>
				<div class='border-circle'>
				</div>
				<div class='border-circle'>
				</div>
				<div class='border-circle'>
				</div>
			</div>
			<h3>Registrierien Sie sich bei Kinogefühle, um Ihre neue Filme zu entdecken und über besten Filmen zu diskutieren.</h3>
			</div>	
			<div id='foto'>
					<img src='./img/start/slide_01.jpg' width='1100px;' height='640px'> <!-- ./img/start/01-HongSangSoo.jpg -->
				</div>
			<div id='log-panel'>
			<form action='./home.php' method='get'>
				<label for='user'>Username:</label>
				<input type='text' id='user' name='user' required>
				<label for='pass'>Password:</label>
				<input type='password' id='pass' name='pass' required>
				<button type='submit' name='login' value='Einlogen'>Einlogen</button>
				<button type='reset' value='Reset'>Reset</button>
			</form>
			<div id='border'>
				<div class='border-circle'>
				</div>
				<div class='border-circle'>
				</div>
				<div class='border-circle'>
				</div>
			</div>
			<p>Haben Sie noch kein Konto bei <span style="color: blue; font-weight:blue">Kinogefühle</span>? Registrierien Sie sich bei uns...</p>
			<a href='#' id='newAccount'>Konto Registrierien</a>
			</div>
		</main>
		
		<?php
		require_once "./footer.inc.php";	
		?>
		 <script src="./js/start.js"></script>
</body>
</html>