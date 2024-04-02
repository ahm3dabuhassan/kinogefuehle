<?php
	require "./function.inc.php";
	session_start(); 
	$read = new DbRequest('r', 'users', 'username, password');
	$data = $read->controller();
	if(isset($_GET['booten'])) {
    	echo json_encode($data);
    }    
    if(isset($_GET['addFilm'])) {
    	$data = json_decode($_GET['addFilm'], true);
    	$save = new DbRequest('w', "film", $data);
		$check = $save->findDuplicate("Titel", $data['Titel'], "film"); 
		if($check > 0) {
			echo  $data['Titel'].' ist schon bei uns vorhanden, sorry!';
		} else {
			$save->controller();
			$_SESSION['titel'] = $data['Titel'];
			$_SESSION['film'] = $data;
			echo $data['Titel'].' wurde von dir hizugefuegt!';
		}
    }   
	if(isset($_GET['get'])) {
		$get = new DbRequest('r', 'film', '*', "UserID = '".$_GET['get']."'");
		$data = $get->controller();
		echo json_encode($data);
	} 
	if(isset($_GET['finder'])) {
		$askForFilms = new DbRequest('r', 'film', '*');
   		$res = $askForFilms->controller();
		echo json_encode($res);
	}
	if(isset($_FILES["poster"])) {
		$endung = '';
		//['jpg','png','bmp']
		echo '<br>'.$_FILES['poster']['name'];
		for($i=strlen($_FILES['poster']['name']); $i>=0; $i--) {
			echo '<br>'.$_FILES['poster']['name'][$i];
			if($_FILES['poster']['name'][$i] == '.') {
				for($z=$i; $z<strlen($_FILES['poster']['name']); $z++) {
					$endung .= $_FILES['poster']['name'][$z];
				}
				break;
			}
		}
		$insertPoster = new DbRequest('ch', 'film', 'Poster', $_SESSION['film']['Titel']."$endung' WHERE Titel ='".$_SESSION['film']['Titel']."'");
		$insertPoster->controller();
		move_uploaded_file($_FILES['poster']['tmp_name'], "./poster/".$_SESSION['film']['Titel'].$endung);
		$_SESSION['film']['poster'] = $_SESSION['film']['Titel'].$endung;  
		$_SESSION['film']['username'] = $_SESSION['user'];
		$makeWebsite = new Website($_SESSION['film']);
		$makeWebsite->build();
		$_SESSION['titel'] = null;
	}
	if(isset($_GET['delUserFilm'])) {
		$verify = new DbRequest('r', 'film', 'UserID, Titel, Poster', 'id="'.$_GET['delUserFilm'].'"');
		$resID = $verify->controller();
		if($resID[0]['UserID'] == $_SESSION['userID']) {
			$delFilm = new DbRequest('e', 'film', 'id = '.$_GET['delUserFilm']);
			file_put_contents('checkIDfilm.txt', $_GET['delUserFilm']);
			$delFilm->controller();
			$withoutWhitespace = str_replace(" ", "", $resID[0]['Titel']);
			unlink("./filmpages/$withoutWhitespace.php");
			unlink("./poster/".$resID[0]['Poster']);
			$delTopic = new DbRequest('e', 'topics', 'Topic = "'.$resID[0]['Titel'].'"');
			$delTopic->controller();
			$delPosts = new DbRequest('e', 'posts', 'topicID = '.$_GET['delUserFilm']); // ID vom Film - FALSCH!!!!
			$delPosts->controller();
			echo $resID[0]['Titel'].' wurde geloescht!';
		} 
	} 
	if(isset($_GET['updateMovie'])) {
		$dataMovie = json_decode($_GET['updateMovie'], true);
		$str = "";
		$ek = '';
		$counter = 0;
		$strz = '';
		file_put_contents('posterA.txt', $dataMovie[0]['Id']);
		foreach($dataMovie as $k1 => $v1) {
			foreach($dataMovie[$k1] as $k2 => $v2) {
				$strz .= $k1.'::'.$k2.'::'.$v2;
				$ek .= "$k2, $v2";
				$dataMovie[$k1]['username'] = $_SESSION['user'];
				if(count($dataMovie[$k1]) - 2 > $counter) {
					$str .= "$k2='$v2', ";
				} else {
					$str .= "$k2='$v2'";
				}
				$counter++;
				$makeWebsite = new Website($dataMovie[$k1]);
				$makeWebsite->build();
				file_put_contents('ask.txt', $strz);
			}
			$updateMovie = new DbRequest("ch", "film", $str.' WHERE Id ', $k1."'");
			$updateMovie->controller();
			$updateMovieData = new DbRequest('r', 'film', '*', "UserID = '".$_GET['get']."'");
			$resMovieUpdate = $updateMovieData->controller();
			echo json_encode($resMovieUpdate);
		}
	}
	if(isset($_GET['getPosts'])) {
		$cmd = 'INNER JOIN topics on topics.Id = posts.topicID WHERE posts.userID = "'.$_GET['getPosts'].'"';
		$posts = new DbRequest('join', 'posts', 'posts.Content, posts.Datum, topics.Topic' , $cmd);
		$data = $posts->controller(); 
		echo json_encode($data);
	}
	if(isset($_GET['newComment'])) {
		$data = json_decode($_GET['newComment'], true);
		$sendArr = ['topicID'=>$data[0],'postID'=>$data[1],'userID'=>$data[2],'content'=>$data[3]];
    	$save = new DbRequest('w', "comment", $sendArr);
		$save->controller();
		$updateData = new DbRequest('r', 'comment', '*', 'postID = "'.$data[1].'"');
		$arrSend = $updateData->controller();
 		echo json_encode($arrSend);

	}
	if(isset($_GET['deleteComment'])) {
		$delData = json_decode($_GET['deleteComment'], true);
		$deleteComment =  new DbRequest('e', 'comment', 'id = "'.$delData[0].'"');
		$deleteComment->controller();
		$updateData = new DbRequest('r', 'comment', '*', 'postID = "'.$delData[2].'"');
		$arrSend = $updateData->controller();
 		echo json_encode($arrSend);
	}


?>