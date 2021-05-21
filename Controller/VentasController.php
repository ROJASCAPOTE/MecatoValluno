<?php

include_once PATH_FOLDER . 'Models/Venta.php';

class VentasController extends Controller{


    function __construct(){
        $this->dataUser = $this->auth();
        $this->venta = new Venta();
    }

    function index(){
        $this->dataUser = $this->auth([2,6]);
        $this->renderView('Views/admin/ventas/index.php', 'template');
    }

    function datos_tabla(){
        $user_id = $_GET['user'];

        $resul = $this->venta->traer($user_id);
        echo json_encode($resul);
    }

    function crear(){    
        $data = $_POST['dataPost'];
        $resul = null;
        foreach ($data as $value) {
            $resul = $this->venta->crear(intval($value['producto_id']), intval($value['cantidad']), intval($value['cliente_id']), intval($this->dataUser['id']));
        }
        
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['venta_id'];
        $cant = $_POST['cant'];
        $resul = $this->venta->eliminar($id, $cant);
        echo json_encode($resul);
    }


}