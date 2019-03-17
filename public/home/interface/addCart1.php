<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $type = $_GET["type"];
    if($type==1){
        $id = $_GET["id"];
        $sql1 = mysqli_fetch_assoc(mysqli_query($con,"SELECT * FROM `cart` WHERE `pid` = $id"));
        if(!$sql1){
            $sql = mysqli_query($con,"INSERT INTO `cart` (`pid`) VALUE ($id)");
            echo $sql;
        }else{
            $count = $sql1["count"] + 1;
             $sql = mysqli_query($con,"UPDATE `cart` SET `count`= $count WHERE `pid` = $id");
             echo $sql;
        }

    }else{
        $sql = mysqli_query($con,"SELECT * FROM `cart` c LEFT JOIN `product` p ON c.pid = p.id");
        $arr = [];
        while($r = mysqli_fetch_assoc($sql)){
           array_push($arr,$r);
        }
        echo json_encode($arr);
    }
?>