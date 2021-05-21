
<?php

include_once PATH_FOLDER . 'Models/Paises.php';

class PaisesController extends Controller{


    function __construct(){
        $this->dataUser = $this->auth();
        $this->pais = new Paises();
    }

    function index(){
        $this->dataUser = $this->auth(6);
        $this->renderView('Views/admin/paises/index.php', 'template');
    }

    function crear(){
        $nom_pais = $_POST['pais'];
        $resul = $this->pais->crear($nom_pais);
        echo json_encode($resul);
    }

    function datos_tabla(){
        $resul = $this->pais->traer_paises();
        echo json_encode($resul);
    }

    function eliminar(){
        $id = $_POST['idpais'];
        echo json_encode($this->pais->eliminar($id));
    }

    function editar(){
        $nom_pais = $_POST['pais'];
        $id_pais = $_POST['idpais'];
        $resul = $this->pais->editar($id_pais, $nom_pais);
        echo json_encode($resul);
    }

    function tiene_ciudades(){
        $idpais = $_POST['idpais'];
        $resul = $this->pais->cant_ciudades($idpais);

        if($resul == 0){
            $resul = false;
        }else{
            $resul = true;
        }
        echo json_encode($resul);
    }


}
