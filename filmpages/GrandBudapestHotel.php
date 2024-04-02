<?php
            $session = 'f';
            $userlogin = 'style=\'display: none;\'';
            session_start();
            if(isset($_SESSION['userID'])) {
                $userlogin = 'style="display: block;"';
                $session = 't';
            }
            ?>
            <!DOCTYPE html>
            <head><link rel="stylesheet" href="../css/style.css"><title>Grand Budapest Hotel</title>
            </head>
            <body>
            <nav>
            <a href='../start.php'>
            <div id='logo'>
            <p>Kino</p>
            <p>gefühle.</p>
            </div>
            </a>
            <div id='selection'>
            <a href='#'>Über</a>
            <div></div>
            <a href='../filme.php'>Filme</a>
            <div></div>
            <a href='#'>Blog</a>
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
                <li><a href='#'>Gefühle entdecken</a></li>
                <li><a href='#'>Anmelden</a></li>
                <li><a href='#'>Etwas_01</a></li>
                <li><a href='#'>Etwas_02</a></li>
                <li><a href='../start.php?logout' <?= $userlogin; ?> id='head-logout'>Abmelden</a></li>
            </ol>
            </div>
            <div id='finder' style='padding:1%;border:1px solid #BFBEBB;border-radius:10px;width:50%;grid-column:2/3;grid-row:1/3;align-self:center;justify-self:center;'><input type='find' placeholder='Filme...' style='margin-left:25px;'></div>
            <div id='outOfFinder' style='background:rgba(128, 128, 128, 0.8);display:none;position:absolute;top:110px;left:450px;border-radius:10px;padding:1%;z-index:111'></div>
            </nav>
            <p id='userPanel' <?= $userlogin; ?> >Hello, <?= $_SESSION['user'] ;?><br><a href='../home.php'>Zurück zu Dashboard</a></p> 
            <div id='main-film'>
            <h1>Grand Budapest Hotel</h1>
            <div id='poster'><img src='../poster/Grand Budapest Hotel.jpg'></div>
            <div id='movie-info'><p>Regisseur: Wes Anderson</p><p>Genre: Komödie</p><p>Datum: 2014-01-01</p><p>Dauern: 130</p></div>
            <p id='opinion'>Es wurde von <span style='color:blue;'>deepViolet</span> geschrieben<span style='color:blue;font-weight:bold;'> : </span> "<i>Toll!"</i></p><div id='forum-link-bck'><a href='../forum.php?Topic=Grand Budapest Hotel' id='forum-link'>Forum</a></div>
            <div id='film-footer'>
            <p>Kinogefühle © 2023</p>
            <a href='#'>Rechtlinien<span style='font-weight:bold;color:blue;font-size:21px;'> : <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a><div class='footer-circle'></div>
            <div class='footer-circle'></div><a href='#'>Impressum<span style='font-weight:bold;color:blue;font-size:21px;'> :. <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a>
            <div class='footer-circle'></div><a href='#'>Kontakt zu Kinogefühle<span style='font-weight:bold;color:blue;font-size:21px;'> :.. <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a>
            <div class='footer-circle'></div>
            </div>
            <script>
                let sessionJS = "<?= $session; ?>";
                if(sessionJS != 't') {
                    console.log('SESSION nicht da');
                    let link = document.querySelector('#forum-link');
                    console.log(link);
                    link.onclick = function (e) {console.log('AA'); e.preventDefault(); window.alert('Meld Dich ein, um das Forum zu besuchen!');};   
                }
            </script>
            <script src='../js/filme-finder.js'></script>
            </body>
            </html>