<?php

include_once PATH_FOLDER . 'Models/Config.php';

class ConfiguracionController extends Controller{


    function __construct(){
        $this->config = new Config();
    }

    function index(){
        $this->renderView('Views/admin/config/index.php', 'template');
    }

    function datos_tabla(){
        $resul = $this->config->traer();
        echo json_encode($resul);
    }

    function actualizar(){
        $idcomision = $_POST['id'];
        $comision = $_POST['comision'];
        $resul = $this->config->editar($idcomision,$comision);
        echo json_encode($resul);
    }


}