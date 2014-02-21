<?php

//Connect to database from here

ini_set('display_errors', 0);

$host = 'localhost';
$user = 'user';
$pass = 'pass';
$db = 'db';



$con = mysql_connect($host, $user, $pass); 
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
//select the database | Change the name of database from here
mysql_select_db($db); 



?>