<?php 

class bdConnect{

    function __construct(){
        
    }

    function conectar(){
        $conn = new mysqli(SERVERNAME_BD, USERNAME_BD, PASSWORD_BD, DATABASE);
        // Check connection
        if($conn->connect_errno) {
            return  $conn->connect_error;
        }
        return $conn;
    }

    function consulta_sql($conn, $sql){
        $resul = $conn->query($sql);
        return $resul;
    }

    function cerrar_conexion($conn){
        $conn->close();
    }

    function fecha_actual(){
        date_default_timezone_set('America/Bogota');
        $hoy = date('Y-m-d H:i:s');
        return $hoy;
    }
}