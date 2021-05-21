<?php

class Nomina extends bdConnect
{
    function  __construct(){
    
    }

    function traer(){
        $conn = $this->conectar();
        $query = "SELECT pago_nomina.id as pago_id, pago_nomina.valor, usuarios.nombre,
        pago_nomina.fecha_registro as fecha 
        FROM pago_nomina
        INNER JOIN usuarios ON usuarios.id = pago_nomina.empleado_id" . PHP_EOL;

        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['pago_id'],
                'empleado' => $consulta['nombre'],
                'pago' => $consulta['valor'],
                'fecha'  => $consulta['fecha']
            ]);
            
        }
        return $data;
    }

    function crear($empleado_id, $pago){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        
        $query = "INSERT INTO pago_nomina (valor, empleado_id, fecha_registro) VALUE ('$pago','$empleado_id','$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);

        return $resul;
    }

   

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM pago_nomina WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);

        return $resul;
    }



}
