<?php

class Ciudad extends bdConnect
{
    function  __construct(){
    
    }

    function traer_ciudades(){
        $conn = $this->conectar();
        $query = "SELECT ciudad.id, ciudad.nombre, ciudad.fecha_registro, pais.nombre as pais, 
            ciudad.pais_id
            FROM ciudad
            INNER JOIN pais ON pais.id = ciudad.pais_id ORDER BY ciudad.fecha_registro DESC
            ";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'pais' => $consulta['pais'],
                'idpais' => $consulta['pais_id'],
                'fecha_registro' => $consulta['fecha_registro']
            ]);
            
        }
        return $data;
    }

    function crear($ciudad, $idpais){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "INSERT INTO ciudad (nombre, pais_id, fecha_registro) VALUE ('$ciudad',$idpais, '$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM ciudad WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function editar($idciudad, $nom_ciudad, $id_pais){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "UPDATE ciudad SET nombre='$nom_ciudad', pais_id='$id_pais' WHERE id=$idciudad" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function pais($idpais){
        $conn = $this->conectar();
        $query = "SELECT * FROM ciudad WHERE pais_id = $idpais " . PHP_EOL;
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
