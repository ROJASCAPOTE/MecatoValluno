<?php

class Roles extends bdConnect
{
    function  __construct(){
    
    }

    function traer_roles(){
        $conn = $this->conectar();
        $query = "SELECT * FROM rol";
        $resul = $this->consulta_sql($conn, $query);
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'fecha_registro' => $consulta['fecha_registro']
            ]);
            
        }

        return $data;
    }
}
