<?php 
    class DbRequest { 

        const DBACCESS = [
            'u' => 'ahm3d_kino',
            'p' => 'airbag2323_23',
            'h' => 'localhost',
            'dbn' => 'ahm3d_kino'
        ];
        static $connection = null;
        static $response = null;
        static $command = [
            '1' => null,
            '2' => null,
            'counter' => 0 
        ];
        function __construct($flag, $table, $data = null, $condition = null) { 
            $this->flag = $flag;
            $this->data = $data;
            $this->table = $table;
            $this->condition = $condition;
        }
        function controller() {
            self::$connection = new PDO('mysql:host='.self::DBACCESS['h'].';dbname='.self::DBACCESS['dbn'], self::DBACCESS['u'], self::DBACCESS['p']);
            switch($this->flag) {
                case 'r': // read,  $data = string
                	if ($this->condition != null) {
                		self::$command['1'] = "SELECT $this->data FROM $this->table WHERE $this->condition";
                	} else {
                		self::$command['1'] = "SELECT $this->data FROM $this->table";
                	}
                    self::$response = self::$connection->query(self::$command['1']);
                    return self::$response->fetchAll(PDO::FETCH_NAMED);
                break; 
                case 'w': // write,  $data = array, 
                        $counter = 0;
                        self::$command['1'] = "INSERT INTO $this->table (";
                        self::$command['2'] = " VALUES (";
                        foreach($this->data as $key => $value) { 
                            if(self::$command['counter'] < count($this->data)-1) {
                                self::$command['1'] .= "$key, ";
                                self::$command['2'] .= "'$value',";          
                            }
                            if(self::$command['counter'] == count($this->data)-1) {
                                self::$command['1'] .= "$key)";
                                self::$command['2'] .= "'$value') $this->condition";
                            }
                           self::$command['counter']++;
                        }
                        self::$command['1'] = self::$command['1'].' '.self::$command['2'];
                        self::$response = self::$connection->exec(self::$command['1']); 
                        self::$response = null;
                break;
                case 'e': // erase, $data = string
					self::$command['1'] = "DELETE FROM $this->table WHERE $this->data";
                    self::$response = self::$connection->exec(self::$command['1']); 
                    self::$response = null;
                break;
                case 'ch': // change, tabel, target, new value.
                    self::$command['1'] = "UPDATE $this->table SET $this->data = '$this->condition";
                    $bm = self::$command['1'];
                    self::$response = self::$connection->exec(self::$command['1']);
                    self::$response = null;
                break;
                case 'join': 
                    if ($this->condition != null) {
                		self::$command['1'] = "SELECT $this->data FROM $this->table $this->condition";
                	} else {
                		self::$command['1'] = "SELECT $this->data FROM $this->table";
                	}
                    self::$response = self::$connection->query(self::$command['1']);
                    return self::$response->fetchAll(PDO::FETCH_NAMED);
                break;
            }
        self::$command['1'] = null;
        self::$response = null;
        }
        function findDuplicate($columname, $value, $table) {
            self::$command['1'] = "SELECT COUNT($columname) FROM $table where $columname = '$value'";
            self::$response = self::$connection->query(self::$command['1']);
            $out = self::$response->fetchAll(PDO::FETCH_NAMED);
            return $out[0]['COUNT(Titel)'];
        }
    }

    class Website {
        static $things = [
            'css' => '<link rel="stylesheet" href="../css/style.css">',
            'html' => '',
            'fileName' => null,
            'withoutWhitespace' => null
        ];
        function __construct($data) {
            $this->data = $data;
        } 
        function build() {
            self::$things['fileName'] = $this->data['Titel'].'.php';
            self::$things['html'] = "<?php
            \$session = 'f';
            \$userlogin = 'style=\'display: none;\'';
            session_start();
            if(isset(\$_SESSION['userID'])) {
                \$userlogin = 'style=\"display: block;\"';
                \$session = 't';
            }
            ?>
            <!DOCTYPE html>
            <head>".self::$things['css'].
            "<title>".$this->data['Titel']."</title>
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
                <li><a href='../start.php?logout' <?= \$userlogin; ?> id='head-logout'>Abmelden</a></li>
            </ol>
            </div>
            <div id='finder' style='padding:1%;border:1px solid #BFBEBB;border-radius:10px;width:50%;grid-column:2/3;grid-row:1/3;align-self:center;justify-self:center;'><input type='find' placeholder='Filme...' style='margin-left:25px;'></div>
            <div id='outOfFinder' style='background:rgba(128, 128, 128, 0.8);display:none;position:absolute;top:110px;left:450px;border-radius:10px;padding:1%;z-index:111'></div>
            </nav>
            <p id='userPanel' <?= \$userlogin; ?> >Hello, <?= \$_SESSION['user'] ;?><br><a href='../home.php'>Zurück zu Dashboard</a></p> 
            <div id='main-film'>
            <h1>".$this->data['Titel']."</h1>
            <div id='poster'><img src='../poster/".$this->data['poster']."'></div>
            <div id='movie-info'><p>Regisseur: ".$this->data['Regisseur']."</p><p>Genre: ".$this->data['Genre']."</p><p>Datum: ".$this->data['Datum']."</p><p>Dauern: ".$this->data['Dauern']."</p></div>
            <p id='opinion'>Es wurde von <span style='color:blue;'>".$this->data['username']."</span> geschrieben<span style='color:blue;font-weight:bold;'> : </span> \"<i>".$this->data['Gedanke']."\"</i></p><div id='forum-link-bck'><a href='../forum.php?Topic=".$this->data['Titel']."' id='forum-link'>Forum</a></div>
            <div id='film-footer'>
            <p>Kinogefühle © 2023</p>
            <a href='#'>Rechtlinien<span style='font-weight:bold;color:blue;font-size:21px;'> : <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a><div class='footer-circle'></div>
            <div class='footer-circle'></div><a href='#'>Impressum<span style='font-weight:bold;color:blue;font-size:21px;'> :. <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a>
            <div class='footer-circle'></div><a href='#'>Kontakt zu Kinogefühle<span style='font-weight:bold;color:blue;font-size:21px;'> :.. <span style='font-weight:bold;color:#E6E6E6;font-size:21px;'>.</span></span></a>
            <div class='footer-circle'></div>
            </div>
            <script>
                let sessionJS = \"<?= \$session; ?>\";
                if(sessionJS != 't') {
                    console.log('SESSION nicht da');
                    let link = document.querySelector('#forum-link');
                    console.log(link);
                    link.onclick = function (e) {console.log('AA'); e.preventDefault(); window.alert('Meld Dich ein, um das Forum zu besuchen!');};   
                }
            </script>
            <script src='../js/filme-finder.js'></script>
            </body>
            </html>"; 
            $sx = '';
            foreach($this->data as $k => $v) {
                $sx .= "$k::$v";
            }
            self::$things['withoutWhitespace'] = str_replace( " ", "", self::$things['fileName']);  
            file_put_contents("./filmpages/". self::$things['withoutWhitespace'], self::$things['html']);       
        }
    } 

    class Forum {
        static $DB = [
            'connection' => null,
            'response' => null,
            'joinCommand' => null
        ]; 
        static $PS = [
            'connection' => null,
            'response' => null,
            'joinCommand' => null
        ]; 
        static $output = '';
        static $buttonDisabled = null;
        function __construct($topic = '0', $userID = '0') { 
            $this->topic = $topic;
            $this->userID = $userID;
        }
        function askDB() {
            self::$DB['connection'] = new DbRequest("r", "topics", "*", "Topic = '$this->topic'");
            self::$DB['response'] = self::$DB['connection']->controller();
            return self::$DB['response'];
        } 
        function showPosts() {
            self::$DB['joinCommand'] = 'INNER JOIN posts on topics.id = posts.topicID INNER JOIN users on users.Id = posts.userID WHERE topics.Topic = "'.$this->topic.'"'; 
            self::$DB['connection'] = new DbRequest("join", "topics", "topics.Id, topics.Topic, posts.Content, posts.Datum, posts.userID, posts.Id AS idButton, users.Username", self::$DB['joinCommand']);
            self::$DB['response'] = self::$DB['connection']->controller();
            for($i=0; $i<count(self::$DB['response']); $i++) {
            self::$output .= "<div class='forum-parent'>";
             self::$output .=  "<div class='forum-post' id='".self::$DB['response'][$i]['idButton']."' value='".$i."'>";
             if($this->userID != self::$DB['response'][$i]['userID']) {
                self::$buttonDisabled = "disabled";   
             } else {
                self::$buttonDisabled = null;
             }
             self::$output .=  "<div value='".$i."'><button class='forum-posts-button' name='edit' value='".self::$DB['response'][$i]['idButton']."' ".self::$buttonDisabled.">Edit</button>";
             self::$output .=  "<button class='forum-posts-button' id='".$i."' name='delete' value='".self::$DB['response'][$i]['idButton']."' ".self::$buttonDisabled.">Delete</button></div>";
             self::$output .=  "<div value=".$i." id=".self::$DB['response'][$i]['idButton']."><p class='forum-content'>".self::$DB['response'][$i]['Content']."</p>";
             self::$output .=  "<p class='forum-date'>".self::$DB['response'][$i]['Datum']."</p>";
             self::$output .= "<p class='forum-user'>".self::$DB['response'][$i]['Username']."</p></div>";
             
             self::$output .=  "</div>";
             self::$output .= "<div class='forum-add-comment'><button class='forum-add-comment-button' id='".$i."' name='".self::$DB['response'][$i]['idButton']."/".self::$DB['response'][$i]['Id']."' active='false' task='write' value='0'>Add Comment</button></div>";
             self::$output .= "<div class='forum-comment-box' id='".$i."'>";
             self::$PS['joinCommand'] = 'INNER JOIN users ON comment.userID = users.Id WHERE postID ="'.self::$DB['response'][$i]['idButton'].'"';
             self::$PS['connection'] = new DbRequest("join", "comment", "comment.id AS cmtID, comment.postID, comment.userID, comment.content, comment.datum, users.Username", self::$PS['joinCommand']);
             self::$PS['response'] = self::$PS['connection']->controller();
             self::$output .= "<p class='forum-comment-header' id='".$i."'>Anzahl der Kommentaren: ".count(self::$PS['response'])."</p>";
             for($z=0; $z<count(self::$PS['response']); $z++){
                 if(count(self::$PS['response']) != 0){ 
                       if($_SESSION['userID'] == self::$PS['response'][$z]['userID']){ 
                        self::$output .= "<button class='forum-comment-delete' id='".($z)."' name='".self::$PS['response'][$z]['cmtID']."/".$_SESSION['userID']."/".self::$PS['response'][$z]['postID']."/".($i)."' style='display:none;'>X</button>";
                       }
                       self::$output .= "<div class='forum-comment-box-post' id='".$i."'>";
                       self::$output .= "<p class='cmnt-hidden-part'>".self::$PS['response'][$z]['Username']."</p>";
                       self::$output .= "<p class='cmnt-hidden-part'>".self::$PS['response'][$z]['datum']."</p>";
                       self::$output .= "<p class='cmnt-hidden-part'>".self::$PS['response'][$z]['content']."</p>";
                       self::$output .= "</div>"; 
                }else {
                   self::$output .= "<p>Keine Kommentare zu diesem Post</p>";
                }
             }
             self::$output .= "</div>";
             self::$output .= "</div>";
            }
           return self::$output;
        }
        function savePosts($data) {
            self::$DB['connection'] = new DbRequest("w", "posts", $data);
            self::$DB['connection']->controller();   
        }
        function showTopics() {
            self::$DB['joinCommand'] = 'INNER JOIN users on posts.userID = users.Id GROUP BY posts.Datum, users.Username';
            self::$DB['connection'] = new DbRequest("join", "posts", "MAX(Datum), Username", self::$DB['joinCommand']);
            self::$DB['response'] = self::$DB['connection']->controller();
            return self::$DB['response'];
        }
    }

  	class RegexTest {
  		const PATTERNS = [
  			'Username' => '/^[a-zA-Z0-9\.\#\@\-]{4,15}$/',
  			'Password' => '/^[a-zA-Z0-9\.\#\@\-]{8,15}$/',
  			'Firstname' => '/^[a-zA-ZäÄüÜß]{2,10}$/',
  			'Lastname' => '/^[a-zA-ZäÄüÜß\-\s]{2,10}$/',
	  		'Email' => '/^[a-zA-Z\-\_0-13]{3,10}@[a-zA-Z]{3,10}.[a-zA-Z]{2,5}$/'
  		];
  		static $testCounter = 0;
  		function __construct($data) {
  			$this->data = $data;
  		}
  		function go() {
  			foreach($this->data as $k => $v) {
  				if (preg_match(self::PATTERNS[$k], $v)) {
  					self::$testCounter++;
  				} else {
  					echo "<p style='color: red;'>$k wurde von Ihnen falsch eingetragen.</p><br>";
  				}
  			}
  			if (self::$testCounter == count($this->data)) {
  				return true;
  			} else {
  				return false;
  			}
  		}
  	}
?>