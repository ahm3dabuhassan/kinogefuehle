<?php
	require_once './function.inc.php';
	if(!isset($_SESSION)) 
    { 
        session_start(); 
		if($_SESSION['userID']) {
			include "./accept.php";
		} else {
			header('location:../start.html');	
		} 
    } 
	echo "Echo aus Accept.";
	echo $_SESSION['userID'];
	$read = new DbRequest('r','users', '*');
	$response = $read->controller();
?>
	<div id='home-main'>
		<div id='sider'>
		</div>
		<div id='overview'>
			<div id='addFilm'>
				<h3>Fügen Sie Film ein<span style='color: blue; font-weight:bold; font-size: 48px;'>.</span></h3>	
					<button id='addFilm-button' name='addFilm'>Add..[ ]</button>
			</div>
		</div>
	</div>
	<script>
	let fetchConn = {
		host: 'http://127.0.0.1:8000/php/fetchOverview.php?addFilm=',
		init: function (data) {
			fetch(fetchConn.host+data)
			.then(response => {
				return response.text();
			})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			})
		}
	}
	
	let addFilm = {
		trigger: document.getElementById('addFilm-button'),
		parent: document.getElementById('addFilm'),
		elements: ['Titel', 'Regisseur', 'Genre', 'Datum', 'Dauern'],
		variables: {
			'lab': null,
			'inp': null
		},
		values: {
			source: null,
			storage: {}
		},
		task: function () {
			addFilm.trigger.innerHTML = 'Absenden';
			for(let i=0; i<addFilm.elements.length; i++) {
				addFilm.variables['lab'] = document.createElement('label');
				addFilm.variables['inp'] = document.createElement('input');
				addFilm.variables['inp'].className = 'addFilm';
				addFilm.variables['lab'].className = 'addFilm';
				addFilm.variables['inp'].id = addFilm.elements[i];
				addFilm.variables['inp'].name = addFilm.elements[i];
				addFilm.variables['lab'].htmlFor = addFilm.elements[i];
				addFilm.variables['lab'].innerHTML = addFilm.elements[i];
				addFilm.parent.appendChild(addFilm.variables['lab']);
				addFilm.parent.appendChild(addFilm.variables['inp']);
			}
			addFilm.trigger.removeEventListener("click", addFilm.task);
			addFilm.trigger.addEventListener('click', addFilm.saveValues);
		},
		assignEvent: function (e) {
			addFilm.trigger.addEventListener('click', addFilm.task);
		},
		saveValues: function () {
			addFilm.values.source = document.querySelectorAll('#addFilm > input');
			addFilm.values.storage['UserID'] = '<?= $_SESSION['userID'] ?>';
			for(let i=0; i<addFilm.values.source.length; i++) {
				addFilm.values.storage[addFilm.values.source[i].id] = addFilm.values.source[i].value;
			}
			fetchConn.init(JSON.stringify(addFilm.values.storage));
			console.log(fetchConn.init(JSON.stringify(addFilm.values.storage)));
		}
	
	}

	let mkLogOutButton = {
		parent: document.querySelector('#menu-show'),
		storage: [],
		elements: ['li', 'a', 'home.php?logout'],
		build: function () {
			for(let i=0; i<mkLogOutButton.elements.length - 1; i++) {
				mkLogOutButton.storage[i] = document.createElement(mkLogOutButton.elements[i]); 
			}
			mkLogOutButton.storage[1].href = mkLogOutButton.elements[2];
			mkLogOutButton.storage[1].innerHTML = 'Logout';
			mkLogOutButton.storage[1].setAttribute('style', 'color: orange; font-weight: bold');
			mkLogOutButton.storage[0].appendChild(mkLogOutButton.storage[1]);
			mkLogOutButton.parent.appendChild(mkLogOutButton.storage[0]);
		}
	} 
	addFilm.assignEvent();
	mkLogOutButton.build();
</script>
