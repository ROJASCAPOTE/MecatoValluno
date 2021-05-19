<?php

require_once '/Controller/LoginController.php';

class App 
{
    
    //ARCHIVO QUE GESTIONA LAS RUTAS EN LA URL Y LAS DIREGE A SU RESPECTIVO CONTROLADOR
    function __construct(){
      try {
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = explode('/', $url);

        $archivoController = 'Controller/' . $url[0] . 'Controller.php';
        
        if(file_exists($archivoController) and $url[0] != ''){
            require_once $archivoController;
            
            $nameClass = $url[0] . 'Controller';
            $controller = new $nameClass; //llamo a la clase
            
            if(isset($url[1]) and $url[1] != ''){
                //LLAMO EL METODO
                $controller->{$url[1]}();
            }else{
               if(method_exists($controller, 'index')){
                    $controller->index();
               }else{
                echo '<h1>Error 500... No se encontro la vista.</h1> ';
               }
            }

        }else if($archivoController == 'Controller/Controller.php'){
            $controller = new LoginController(true);
        }
        else{
            echo '<h1>Error de ruta</h1>';
        }
      } catch (Throwable $th) {
         echo '<h1>Error 500.';
      }  
        
    }
}
