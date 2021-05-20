<?php

class Sede extends bdConnect
{
    function  __construct(){
    
    }

    function traer_sedes(){
        $conn = $this->conectar();
        $query = "SELECT sedes.id, sedes.nombre, sedes.dir , ciudad.nombre as ciudad, sedes.fecha_registro, ciudad.id as ciudad_id, ciudad.pais_id as pais_id
        FROM sedes 
        INNER JOIN ciudad ON ciudad.id = sedes.ciudad_id";
        $resul = $this->consulta_sql($conn, $query);
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'dir' => $consulta['dir'],
                'ciudad' => $consulta['ciudad'],
                'ciudad_id' => $consulta['ciudad_id'],
                'pais_id' => $consulta['pais_id'],
                'fecha_registro' => $consulta['fecha_registro']
            ]);
            
        }
        return $data;
    }

    function crear($nom_sede, $id_ciudad, $dir){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "INSERT INTO sedes (nombre, ciudad_id, dir, fecha_registro) VALUE ('$nom_sede',$id_ciudad,'$dir', '$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM sedes WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function editar($nom_sede, $id_ciudad, $dir, $idsede){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "UPDATE sedes SET nombre='$nom_sede', ciudad_id=$id_ciudad, dir='$dir' WHERE id=$idsede" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function por_ciudad($id_ciudad){
        $conn = $this->conectar();
        $query = "SELECT sedes.id, sedes.nombre as nombre, sedes.dir
        FROM sedes 
        INNER JOIN ciudad ON ciudad.id = sedes.ciudad_id WHERE sedes.ciudad_id = $id_ciudad" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'dir' => $consulta['dir']
            ]);
        }

        return $data;
    }
}
