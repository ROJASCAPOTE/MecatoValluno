<?php

include_once PATH_FOLDER . 'Models/Ciudad.php';

class CiudadController extends Controller 
{
    function __construct(){
        $this->dataUser = $this->auth();
        $this->ciudad = new Ciudad();
    }

    function index(){
        $this->dataUser = $this->auth(6);
        $this->renderView('Views/admin/ciudades/index.php', 'template');
    }

    function crear(){
        $nom_ciudad = $_POST['ciudad'];
        $id_pais = $_POST['idpais'];
        $resul = $this->ciudad->crear($nom_ciudad, $id_pais);
        echo json_encode($resul);
    }

    function datos_tabla(){
        $resul = $this->ciudad->traer_ciudades();
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['idciudad'];
        echo json_encode($this->ciudad->eliminar($id));
    }

    function editar(){
        $nom_ciudad = $_POST['ciudad'];
        $idciudad = $_POST['idciudad'];
        $idpais = $_POST['idpais'];
        $resul = $this->ciudad->editar($idciudad, $nom_ciudad, $idpais);
        echo json_encode($resul);
    }

    //Obtengo las ciudades relacionadas al Pias
    function ciudad_x_pais(){
        $idpais = $_POST['idpais'];
        $resul = $this->ciudad->pais($idpais);
        echo json_encode($resul);
    }
    

}
