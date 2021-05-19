<?php

class Paises extends bdConnect{

    function  __construct(){
    
    }

    function traer_paises(){
        $conn = $this->conectar();
        $query = "SELECT * FROM pais";
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

    function crear($pais){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "INSERT INTO pais (nombre, fecha_registro) VALUE ('$pais', '$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM pais WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function editar($id, $nom){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "UPDATE pais SET nombre='$nom' WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function cant_ciudades($idpais){
        $conn = $this->conectar();

        $query = "SELECT * FROM ciudad WHERE pais_id=$idpais" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul->num_rows;
    }

}
