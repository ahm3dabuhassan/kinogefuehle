<?php
require './function.inc.php';

if(isset($_GET['read'])) {
   $askForUsers = new DbRequest('r', $_GET['read'], '*');
   $res = $askForUsers->controller();
   $res['table'] = $_GET['read'];
   echo json_encode($res);
}
if(isset($_GET['delete'])) {
     $data = json_decode($_GET['delete']); 
     if(isset($_GET['delete'])) {
        switch($data[1]) {
          case 'users': 
            $del = new DbRequest('e', $data[1], 'Id = '.$data[0]);
            $del->controller();
            $update =  new DbRequest('r', $data[1], '*');
            $updateRes = $update->controller();
            $updateRes['table'] = $data[1];
            echo json_encode($updateRes);
          break; 
          case 'film': 
            $del = new DbRequest('e', $data[1], 'Id = '.$data[0]);
            $del->controller();
            $update =  new DbRequest('r', $data[1], '*');
            $updateRes = $update->controller();
            $updateRes['table'] = $data[1];
            echo json_encode($updateRes);
          break;
          case 'posts': 
            $del = new DbRequest('e', $data[1], 'Id = '.$data[0]);
            $del->controller();
            $update =  new DbRequest('r', $data[1], '*');
            $updateRes = $update->controller();
            $updateRes['table'] = $data[1];
            echo json_encode($updateRes);
          break;     
        }
      }
      
}
if(isset($_GET['update'])) {
    $dataUpdate = json_decode($_GET['update'], true);
    $str = '';
    $counter = 0;
    $id = null;
    foreach($dataUpdate as $k => $v) {
      if($k != 'table') {
        if($k == 'Id') {
          $id = $v;
        }
        if(count($dataUpdate) - 2 > $counter) {
          $str .= "$k='$v', ";
        } else {
          $str .= "$k='$v'";
        }
      }
      $counter++;
    }
    $update = new DbRequest("ch", $dataUpdate['table'], $str.' WHERE Id ', $id."'");
    $update->controller();
    $updateTable =  new DbRequest('r', $dataUpdate['table'], '*');
    $updateRes = $updateTable->controller();
    $updateRes['table'] = $dataUpdate['table'];
    echo json_encode($updateRes);
}

