<?php
/*
//Connect to database from here
$link = mysql_connect('localhost', 'vietscie', 'bciR6tW5'); 
if (!$link) {
    die('Could not connect: ' . mysql_error());
}
//select the database | Change the name of database from here
mysql_select_db('vietscie_dir'); 


*/
//Connect to database from here

ini_set('display_errors', 0);




$host = 'localhost';
$user = 'vietscie';
$pass = 'uIlTBRv8';
$db = 'vietscie_dir';


/*
$host = 'localhost';
$user = 'root';
$pass = 'root';
$db = 'test';
$vsetable = 'vietsciexdir';
$logintable = 'tbl_user2"';
*/

$con = mysql_connect($host, $user, $pass); 
if (!$con) {
    die('Could not connect: ' . mysql_error());
}
//select the database | Change the name of database from here
mysql_select_db($db); 



?>