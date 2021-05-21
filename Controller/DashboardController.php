<?php

include_once PATH_FOLDER . 'Models/Dashboard.php';

class DashboardController extends Controller{


    function __construct(){
         setlocale(LC_MONETARY, 'es_CO');
        $this->dataUser = $this->auth();
        $this->dash = new Dashboard();
    }

    function index(){
        //$this->dataUser = $this->auth([6,4])
        $cant_proceso = (int)$this->dash->cant_productos_proceso()['en_proceso'];
        $inversion_materia_prima = (int)$this->dash->inversion_materia()['total'];
        $total_ventas = (int)$this->dash->total_ventas()['total'];
        $data = [
            'cant_proceso' => $cant_proceso,
            'inversion_materia' => number_format($inversion_materia_prima),
            'total_ventas' => number_format($total_ventas)

        ];
        $this->renderView('Views/admin/dashboard/index.php', 'template', $data);
    }

    function datos_tabla(){
        $resul = $this->dash->traer();
        echo json_encode($resul);
    }

    


}