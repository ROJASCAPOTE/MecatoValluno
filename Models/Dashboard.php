<?php

class Dashboard extends bdConnect
{
    function  __construct(){
    
    }

    function cant_productos_proceso(){
        $conn = $this->conectar();
        $query = "SELECT count(*) as en_proceso FROM proceso_producto
        INNER JOIN inv_productos productos ON productos.id = proceso_producto.inv_producto_id
        WHERE productos.estado = 0;" ;

        $resul = $this->consulta_sql($conn, $query);
        $resul = $resul->fetch_assoc();
        return $resul;
    }

    function inversion_materia(){
        $conn = $this->conectar();
        $query = "SELECT sum(cantidad * precio_unitario) as total
        FROM inv_materia_prima" ;

        $resul = $this->consulta_sql($conn, $query);
        $resul = $resul->fetch_assoc();
        return $resul;
    }

    function total_ventas(){
        $conn = $this->conectar();
        $query = "SELECT sum(cantidad *
        (SELECT precio_unitario FROM inv_productos sproductos WHERE sproductos.id = venta_productos.producto_id)) as total
        FROM venta_productos" ;

        $resul = $this->consulta_sql($conn, $query);
        $resul = $resul->fetch_assoc();
        return $resul;
    }

    function traer(){
        $conn = $this->conectar();
        $query = "SELECT usuarios.nombre, pago_comision.valor, pago_comision.fecha_registro 
        FROM pago_comision
        INNER JOIN usuarios ON usuarios.id = pago_comision.vendedor_id
            ";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'nombre' => $consulta['nombre'],
                'valor' => $consulta['valor'],
                'fecha_registro' => $consulta['fecha_registro']
            ]);
            
        }
        return $data;
    }



}
