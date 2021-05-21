<?php 

include_once PATH_FOLDER . 'Models/Usuario.php';

class UsuariosController extends Controller{

    function __construct(){
        $this->dataUser = $this->auth();
        $this->usuarios = new Usuario();       
    }

    function clientes(){
         //Este es el rol de los clientes que se va a usar para traer solo los usuarios clientes
        $data = [  
            'rol' => 5,
            'titulo' => 'Clientes'
        ]; 
        $resul = $this->auth([2,6]);
        $this->renderView('Views/admin/usuarios/sistema.php', 'template', $data);
    }

    function proveedores(){
        $data = [  
            'rol' => 7,
            'titulo' => 'Proveedores'
        ]; 
        $resul = $this->auth(1);
        $this->renderView('Views/admin/usuarios/sistema.php', 'template', $data);
    }

    function empleados(){
        $data = [  
            'rol' => 2,
            'titulo' => 'Empleados'
        ]; 
        $resul = $this->auth([1,6]);
        $this->renderView('Views/admin/usuarios/sistema.php', 'template', $data);
    }

    function sistema(){
        $data = [  
            'rol' => 0,
            'titulo' => 'Sistema'
        ]; 
        $resul = $this->auth(6);
        $this->renderView('Views/admin/usuarios/sistema.php', 'template', $data);
    }

    function consultar_roles(){
        $roles = new Roles();
        echo json_encode($roles->traer_roles());
    }

    function crear(){    
        $data = $_POST['datos'];
        $resul = $this->usuarios->crear(
            $data['nombre'], $data['email'], $data['dir'], $data['ciudad_id'], $data['rol'],
            $data['pass'], $data['sede']
        );
        echo json_encode($resul);
    }

    function editar(){
        $data = $_POST['datos'];
        //Si no viene el ID del usuario entonces no hago nada
        if($data['iduser'] == 0)
            return;
        
        $resul = $this->usuarios->editar($data);
        echo json_encode($resul);
    }

    function eliminar(){
        $resul = $this->usuarios->eliminar($_POST['iduser']);
        echo json_encode($resul);
    }

    function datos_tabla(){
        $rol = $_GET['rol'];
        $resul = $this->usuarios->traer($rol);
        echo json_encode($resul);
    }

    
}