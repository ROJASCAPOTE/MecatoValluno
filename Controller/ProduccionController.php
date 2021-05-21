<?php

include_once PATH_FOLDER . 'Models/Produccion.php';

class ProduccionController extends Controller 
{
    function __construct(){
        $this->dataUser = $this->auth([3,6]);
        $this->produccion = new Produccion();
    }

    function index(){

        $this->renderView('Views/admin/produccion/index.php', 'template');
    }

    function crear(){
        $imagen = $_FILES['imagen'];
        //Creo la logica para subir el archivo al servidor y luego envio la ruta (path)
        // a la BD
        if (isset($imagen['tmp_name'])) {
          $source = $imagen["tmp_name"];
          $destination = PATH_FOLDER . 'public/storage/' . $imagen["name"];
          move_uploaded_file($source, $destination);
        }
        $resul = $this->produccion->crear($_POST['nombre'],$_POST['cant'],$_POST['valor'],
        $imagen["name"], 0, $_POST['fecha_inicio'], $_POST['fecha_fin'], $_POST['materia_prima']);
        echo json_encode($resul);

    }

    function datos_tabla(){
        $resul = $this->produccion->traer_datos();
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['producto_id'];
        echo json_encode($this->produccion->eliminar($id));
    }

    function cambiar_estado(){
        $nuevo_estado = $_POST['estado'];
        $producto_id = $_POST['producto'];
        $resul = $this->produccion->actualizar_estado($nuevo_estado, $producto_id);
        echo json_encode($resul);
    }

       

}
