<?php

class Venta extends bdConnect
{
    function  __construct(){
    
    }

    function traer($user_id){
        $conn = $this->conectar();
        $query = "SELECT venta.id as venta_id, productos.nombre, venta.cantidad, productos.precio_unitario as precio_uni,
            (
                (SELECT precio_unitario FROM inv_productos as sproductos WHERE sproductos.id = venta.producto_id) *
                (SELECT cantidad FROM venta_productos as sventa WHERE sventa.id = venta.id)
            ) as total,
            (SELECT susuarios.nombre FROM usuarios as susuarios WHERE susuarios.id = venta.cliente_id) as cliente,
            usuarios.nombre as vendedor, venta.fecha_registro as fecha_venta
            FROM venta_productos as venta
            INNER JOIN inv_productos as productos ON productos.id = venta.producto_id
            INNER JOIN usuarios ON usuarios.id = venta.vendedor_id
            WHERE venta.vendedor_id = $user_id" . PHP_EOL;

        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'venta_id' => $consulta['venta_id'],
                'nombre' => $consulta['nombre'],
                'cant' => $consulta['cantidad'],
                'precio_uni' => $consulta['precio_uni'],
                'total' => $consulta['total'],
                'cliente' => $consulta['cliente'],
                'vendedor' => $consulta['vendedor'],
                'fecha_venta' => $consulta['fecha_venta']
            ]);
            
        }
        return $data;
    }

    function crear($producto_id, $cant, $cliente_id, $vendedor_id){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        
        $query = "INSERT INTO venta_productos (producto_id, cantidad,cliente_id,vendedor_id,fecha_registro) VALUE ($producto_id,'$cant',$cliente_id,$vendedor_id,'$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        if($resul == true){
            $this->mermar_cant_producto($producto_id, $cant);
            $this->registrar_comision_vendedor($cant, $vendedor_id, $producto_id);
        }
        return $resul;
    }

    function mermar_cant_producto($producto_id, $cant_producto_vendido){
        $conn = $this->conectar();
        $res_cant = $this->consulta_sql($conn,"SELECT cantidad FROM inv_productos WHERE id=$producto_id" . PHP_EOL);
        $res_cant = $res_cant->fetch_assoc();
        $cantidad_total = intval($res_cant['cantidad']) - intval($cant_producto_vendido);

        $query = "UPDATE inv_productos SET cantidad='$cantidad_total' WHERE id=$producto_id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function registrar_comision_vendedor($cant, $vendedor_id, $producto_id){
        $fecha = $this->fecha_actual();
        $conn = $this->conectar();

        $venta_id = $this->consulta_sql($conn, 
                'SELECT MAX(id) as id FROM venta_productos');
        $venta_id = $venta_id->fetch_assoc();
        $venta_id = $venta_id['id'];

        $resul = $this->consulta_sql($conn,"SELECT precio_unitario FROM inv_productos WHERE id=$producto_id" . PHP_EOL);
        $resul = $resul->fetch_assoc();

        $precio_unit = intval($resul['precio_unitario']);
        $cantidad = intval($cant);

        $comision = $this->consulta_sql($conn,"SELECT porce_venta FROM formula_comision LIMIT 1");
        $comision = $comision->fetch_assoc();
        $comision = floatval($comision['porce_venta']) / 100;

        $valor_comision = $cantidad * $precio_unit;
        $valor_comision = $valor_comision * $comision;

        //REGISTRO LA COMISION
        $query = "INSERT INTO pago_comision (valor, vendedor_id,venta_id, fecha_registro) VALUE ($valor_comision,$vendedor_id, $venta_id, '$fecha')" . PHP_EOL;

        $resul = $this->consulta_sql($conn, $query);

    } 

    function eliminar($id, $cant_venta){
        $conn = $this->conectar();
        $query = "DELETE FROM venta_productos WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);


        if($resul){
            //Consulto la tabla de ventas para sacar el producto_id
            $res_producto_Id = $this->consulta_sql($conn,"SELECT producto_id FROM venta_productos WHERE id=$id" . PHP_EOL);
            $res_producto_Id = $res_producto_Id->fetch_assoc();
            $producto_id = $res_producto_Id['producto_id'];

            //Consulto la cantidad de productos en inv
            $res_cant = $this->consulta_sql($conn,"SELECT cantidad FROM inv_productos WHERE id=$producto_id" . PHP_EOL);
            $res_cant = $res_cant->fetch_assoc();

            $cantidad_total = intval($res_cant['cantidad']);
            $cant_venta = intval($cant_venta);

            $total = $cantidad_total + $cant_venta;
            $query = "UPDATE inv_productos SET cantidad='$total' WHERE id=$producto_id" . PHP_EOL;

            $resul = $this->consulta_sql($conn, $query);
        }
        return $resul;
    }



}
