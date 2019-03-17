<?php
    header("content-type:text/html;charset=utf-8");
    $con = mysqli_connect("localhost","root","root","jkzy");
    $id = $_GET["id"];
    $r = mysqli_fetch_assoc(mysqli_query($con,"SELECT * FROM `product` WHERE `id` = $id"));
    echo json_encode($r);
?>