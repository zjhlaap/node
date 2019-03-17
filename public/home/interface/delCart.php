<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $type = $_GET["type"];
    if($type==1){
        $id = $_GET["id"];
        $r = mysqli_query($con,"DELETE FROM `cart` WHERE `id` = $id");
    }else if($type ==2){
       $id = $_GET["id"];
       $count = $_GET["count"];
        $r = mysqli_query($con,"UPDATE `cart` SET `count` = $count WHERE `pid` = $id");
        echo $count;
    }
?>