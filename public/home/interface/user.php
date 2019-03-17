<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $type = $_GET["type"];
    if($type==1){
        $tel = $_GET["tel"];
        $pass = $_GET["pass"];
        $sql = "INSERT INTO `user` (`tel`,`password`) VALUES ('$tel','$pass')";
        $r = mysqli_query($sql);
        if($r){
            echo 1;
        }
    }else if($type == 2){
        $user = $_GET["tel"];$pass = $_GET["pass"];
        $r = mysqli_fetch_assoc(mysqli_query($con,"SELECT * FROM `user` WHERE `tel` = $user"));
        if($r){
            echo json_encode($r);
        }else{
            echo 0;
        }
    }
?>