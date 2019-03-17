<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $r1 = mysqli_query($con,"SELECT * FROM `product`");
    $arr = [];
    while($r = mysqli_fetch_assoc($r1)){
        array_push($arr,$r);
    }
    echo json_encode($arr);
?>