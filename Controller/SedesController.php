<?php

include_once PATH_FOLDER . 'Models/Sede.php';

class SedesController extends Controller 
{
    function __construct(){
        $this->dataUser = $this->auth();
        $this->sede = new Sede();
    }

    function index(){
        $this->dataUser = $this->auth(6);
        $this->renderView('Views/admin/sedes/index.php', 'template');
    }

    function crear(){
        $nom_sede = $_POST['nom_sede'];
        $id_ciudad = $_POST['idciudad'];
        $dir = $_POST['dir'];
        $resul = $this->sede->crear($nom_sede, $id_ciudad, $dir);
        echo json_encode($resul);
    }

    function datos_tabla(){
        $resul = $this->sede->traer_sedes();
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['idsede'];
        echo json_encode($this->sede->eliminar($id));
    }

    function editar(){
        $nom_sede = $_POST['nom_sede'];
        $id_ciudad = $_POST['idciudad'];
        $idsede = $_POST['idsede'];
        $dir = $_POST['dir'];
        $resul = $this->sede->editar($nom_sede, $id_ciudad, $dir, $idsede);
        echo json_encode($resul);
    }

    //Traigo las sedes dependiendo de la ciudad
    function ciudad(){
        $id_ciudad = $_POST['idciudad'];
        $resul = $this->sede->por_ciudad($id_ciudad);

        echo json_encode($resul);
    }
    

}
