<?php

class Produccion extends bdConnect
{
    function  __construct(){
    
    }

    function traer_datos(){
        $conn = $this->conectar();
        $query = "SELECT * FROM inv_productos WHERE estado = 0
                ORDER BY fecha_registro DESC";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'cantidad' => $consulta['cantidad'],
                'estado' => $consulta['estado'],
                'fecha_inicio' => $consulta['fecha_inicio'],
                'fecha_fin' => $consulta['fecha_fin']
            ]);
            
        }
        return $data;
    }

    function crear($nombre, $cant, $valor, $path_imagen, $estado, $f_inicio, $f_fin, $materia_prima){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "INSERT INTO inv_productos (nombre, cantidad, precio_unitario, imagen, estado, fecha_inicio, fecha_fin, fecha_registro) VALUE ('$nombre','$cant','$valor', '$path_imagen', '$estado', '$f_inicio', '$f_fin', '$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        //VALIDO QUE SE HAYA GUARDADO EL PRODUCTO Y PROCESDO A VINCULAR LA MATERIA PRIMA
        if($resul == true AND count($materia_prima) != 0){
            //OBTENFDO EL ID DEL PRODUCTO QUE ACABO DE CREAR
            $id_producto = $this->consulta_sql($conn, 
                'SELECT MAX(id) as id FROM inv_productos');
            $id_producto = $id_producto->fetch_assoc();
            $id_producto = $id_producto['id'];
            
            foreach ($materia_prima as $materia_id) {
                $query = "INSERT INTO proceso_producto 
                (inv_producto_id,materia_prima_id,fecha_registro) 
                VALUE ($id_producto,$materia_id,'$fecha')" . PHP_EOL;
                $resul = $this->consulta_sql($conn, $query);
                if($resul == true){
                    $this->consumir_materia_prima($conn, $materia_id);
                }
            }
            
        }

        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM inv_productos WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function actualizar_estado($nuevo_estado, $producto_id){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $query = "UPDATE inv_productos SET estado='$nuevo_estado' WHERE id=$producto_id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function consumir_materia_prima($conn, $materia_id){
        $data = $this->consulta_sql($conn, 
                'SELECT cantidad FROM inv_materia_prima LIMIT 1');
        $data = $data->fetch_assoc();
        $cantidad = $data['cantidad'] - 1; //Le resto 1 cantidad por cada recorrido

        $query = "UPDATE inv_materia_prima SET cantidad='$cantidad' WHERE id=$materia_id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);

    }

}
