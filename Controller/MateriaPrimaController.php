<?php

include_once PATH_FOLDER . 'Models/MateriaPrima.php';

class MateriaPrimaController extends Controller{


    function __construct(){
        $this->dataUser = $this->auth();
        $this->materia = new MateriaPrima();
    }

    function index(){
        $this->dataUser = $this->auth([3,6]);
        $this->renderView('Views/admin/materia_prima/index.php', 'template');
    }

    function datos_tabla(){
        $resul = $this->materia->traer();
        echo json_encode($resul);
    }

    function crear(){    
        $data = $_POST['datos'];
        $resul = $this->materia->crear(
            $data['descripcion'], $data['cantidad'], $data['valor']);
        echo json_encode($resul);
    }

    function editar(){
        $data = $_POST['datos'];
        $resul = $this->materia->editar($data['id'],
            $data['descripcion'], $data['cantidad'], $data['valor']);
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['idmateria_prima'];
        $resul = $this->materia->eliminar($id);
        echo json_encode($resul);
    }


}