<?php

include_once PATH_FOLDER . 'Models/Productos.php';

class ProductosController extends Controller 
{
    function __construct(){
        $this->dataUser = $this->auth();
        $this->productos = new Productos();
    }

    function index(){
        $this->auth([3,6]);
        $this->renderView('Views/admin/productos/index.php', 'template');
    }

    function datos(){
        $resul = $this->productos->traer_datos();
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['producto_id'];
        echo json_encode($this->productos->eliminar($id));
    }

    function cambiar_estado(){
        $nuevo_estado = $_POST['estado'];
        $producto_id = $_POST['producto'];
        $resul = $this->produccion->actualizar_estado($nuevo_estado, $producto_id);
        echo json_encode($resul);
    }

    function busqueda(){
        $busq = $_POST['busqueda'];
        $resul = $this->productos->buscar($busq);
        echo json_encode($resul);
    }

       

}
