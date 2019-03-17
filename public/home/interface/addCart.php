<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $type = $_GET["type"];
    if($type==1){
        $id = $_GET["id"];
        $sql = mysqli_query("INSERT INTO `Cart` (`pid`) VALUES ('$id')");
        if($sql){
            echo 1;
        }
    }else{

    }
?>