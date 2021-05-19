<?php

class MateriaPrima extends bdConnect
{
    function  __construct(){
    
    }

    function traer(){
        $conn = $this->conectar();
        $query = "SELECT * FROM inv_materia_prima";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'desc' => $consulta['nombre'],
                'cant' => $consulta['cantidad'],
                'valor' => $consulta['precio_unitario']
            ]);
            
        }
        return $data;
    }

    function crear($desc,$cant,$valor){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "INSERT INTO inv_materia_prima (nombre, cantidad,precio_unitario,fecha_registro) VALUE ('$desc','$cant','$valor','$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function editar($id,$desc,$cant,$valor){
        $conn = $this->conectar();
        //$fecha = $this->fecha_actual();
        $query = "UPDATE inv_materia_prima SET nombre='$desc',cantidad='$cant',precio_unitario='$valor'
        WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM inv_materia_prima WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }



}
