<?php

include_once PATH_FOLDER . 'Models/Nomina.php';

class NominaController extends Controller{


    function __construct(){
        $this->dataUser = $this->auth();
        $this->nomina = new Nomina();
    }

    function index(){
        $this->dataUser = $this->auth([6,4]);
        $this->renderView('Views/admin/nomina/index.php', 'template');
    }

    function datos_tabla(){
        $resul = $this->nomina->traer();
        echo json_encode($resul);
    }

    function crear(){    
        $resul = $this->nomina->crear($_POST['empleado_id'], $_POST['valor']);
        
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['id'];
        $resul = $this->nomina->eliminar($id);
        echo json_encode($resul);
    }


}