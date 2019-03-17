<?php
      header('content-type:text/html;charset=utf-8');
      $con = mysqli_connect("localhost","root","root","jkzy");
      $sql = mysqli_query($con,"SELECT * FROM `nav` WHERE `pid` = 1");
      $arr = array();
     while($r=mysqli_fetch_assoc($sql)){
          $r["son"] = array();
          $sql1 = mysqli_query($con,"SELECT * FROM `nav` WHERE `pid` = $r[id]");
          while($r1 = mysqli_fetch_assoc($sql1)){
              array_push($r["son"],$r1);
          }
          array_push($arr,$r);
     }
      echo json_encode($arr);
  ?>