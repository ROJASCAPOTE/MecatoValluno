<?php

class Config extends bdConnect
{
    function  __construct(){
    
    }

    function traer(){
        $conn = $this->conectar();
        $query = "SELECT * FROM formula_comision
            
            ";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'comision' => $consulta['porce_venta'],
            ]);
            
        }
        return $data;
    }

    function editar($id, $comision){
        $conn = $this->conectar();
        //$fecha = $this->fecha_actual();
        $query = "UPDATE formula_comision SET porce_venta='$comision' WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }


}
