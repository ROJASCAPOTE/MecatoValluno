<?php

include_once PATH_FOLDER . 'Models/Usuario.php';

class LoginController extends Controller{

    function __construct($inicio = false){
    	$this->usuario = new Usuario();
    	if($inicio){
    		require_once './login.php';
    	}
        
    }

    function iniciar(){
    	$email = $_POST['email'];
    	$pass = $_POST['password'];
    	$url = URL_PATH;
    	$estadoLogin = false;
    	$dataUser = [];

    	if($email != null && $pass != null){
    		$resul = $this->usuario->traer_autenticar($email, $pass);

    		foreach ($resul as $user) {
    			if($email == $user['email'] && password_verify($pass,$user['pass'])){
    				$estadoLogin = true;
    				array_push($dataUser, $user);
    				break;
    			}
    		}

    		if($estadoLogin){
    			session_start();
    			$url = $url . "usuarios/sistema";
    			$_SESSION["login"] = $dataUser;
    			header("Location: $url" . PHP_EOL);
    		}else{
    			header("Location: $url?e=false" . PHP_EOL);
    		}

    	}else{
    		
    		header("Location: $url" . PHP_EOL);
    	}
    }

    function logout(){
    	$url = URL_PATH;
    	if(isset($_SESSION["login"])){
		    unset($_SESSION["login"]); //elimino el index login y sus datos
		}
		//Borro las cookies
		if (ini_get("session.use_cookies")) {
			$params = session_get_cookie_params();
			setcookie(session_name(), '', time() - 42000,
				$params["path"], $params["domain"],
				$params["secure"], $params["httponly"]
			);
		}
    	session_destroy();
    	header("Location: $url" . PHP_EOL);
    }

}