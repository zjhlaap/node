<?php
    header('content-type:text/html;charset=utf-8');
    $con = mysqli_connect("localhost","root","root","jkzy");
    $id = $_GET["dataId"];
    $res = mysqli_query($con,"SELECT * FROM `product` WHERE `term_id` = $id");
    $arr1 = array();
    while($r = mysqli_fetch_assoc($res)){
        array_push($arr1,$r);
    }
    echo json_encode($arr1);
?>