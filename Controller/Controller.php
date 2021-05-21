<?php 
//ESTE ES EL CONTROLADOR QUE CARGA POR DEFAULT CUANDO SE ACCEDE A LA URL /

class Controller{

    function __construct(){
       
    }

    function renderView($vista, $template, $data = null){
        $pathTemplate = PATH_FOLDER . 'Views/layouts/' . $template . '.php';
        $vistaContenido = PATH_FOLDER . $vista;

        require_once $pathTemplate;
    }

    function auth($rol = null){

    	if(session_status() != PHP_SESSION_ACTIVE){
    		session_start();
    	}
    	$url = URL_PATH;
    	$rol_id = null;

    	if(!isset($_SESSION["login"])){
    		header("Location: $url" . PHP_EOL);
    	}
    	$data = $_SESSION["login"][0];
    	$rol_id = $data['rol_id'];
    	if($rol != null){
    		if($rol_id != null && $rol_id != $rol ){
    			echo '<h1 style="color: red;">No tiene permisos para esta vista.</h1>';
    		}
    	}

    	return $data;
    }

}