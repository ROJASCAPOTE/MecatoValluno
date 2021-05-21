<?php
$path = str_replace('config.php','',realpath(__FILE__));
$url_path = 'http://' . $_SERVER["HTTP_HOST"] . "/Mecateate/";
//$url_path = 'http://' . $_SERVER["HTTP_HOST"] ; //Servidor

//Datos para conexion a la BD
$servername = "localhost";
$database = "mecateate";
$username = "root";
$password = "";

define("TUTULO_APP", "MecateateCali");
define("PATH_FOLDER", $path);
define("URL_PATH", $url_path);
define("SERVERNAME_BD",  $servername);
define("DATABASE",  $database);
define("USERNAME_BD",  $username);
define("PASSWORD_BD",  $password);

