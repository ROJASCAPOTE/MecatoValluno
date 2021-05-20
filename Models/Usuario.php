<?php

include_once PATH_FOLDER . "Tools/bdConnect.php";

class Usuario extends bdConnect
{
    function  __construct(){
    
    }

    function traer($rol){
        $where_rol = '';
        if($rol != 0){
            $where_rol = "WHERE usuarios.rol_id = $rol" . PHP_EOL;
        }
        $conn = $this->conectar();
        $query = "SELECT usuarios.id, usuarios.nombre, usuarios.email, usuarios.dir, rol.nombre as rol,
            ciudad.nombre as ciudad, usuarios.ciudad_id, usuarios.fecha_registro, pais.id as pais_id,
            IFNULL(sedes.nombre, 'Ninguna')  as sede, sedes.id as idsede
            FROM usuarios
            INNER JOIN ciudad ON ciudad.id = usuarios.ciudad_id 
            INNER JOIN rol ON rol.id = usuarios.rol_id
            INNER JOIN pais ON ciudad.pais_id = pais.id
            LEFT JOIN sedes ON sedes.id = usuarios.sede_id
            $where_rol
            ORDER BY usuarios.fecha_registro DESC
            " . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'ciudad' => $consulta['ciudad'],
                'ciudad_id' => $consulta['ciudad_id'],
                'rol' => $consulta['rol'],
                'email' => $consulta['email'],
                'dir' => $consulta['dir'],
                'pais_id' => $consulta['pais_id'],
                'sede' => $consulta['sede'],
                'idsede' => $consulta['idsede']
            ]);
            
        }
        return $data;
    }

    function crear($nom,$email,$dir,$idciudad,$rol,$pass,$sede_id){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $password = password_hash($pass, PASSWORD_BCRYPT);
        $query = "INSERT INTO usuarios (nombre, email,pass,pass_visible, rol_id,
        ciudad_id, dir, sede_id, fecha_registro) VALUE ('$nom','$email','$password', '$pass', $rol, $idciudad, '$dir', $sede_id, '$fecha')" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function eliminar($id){
        $conn = $this->conectar();
        $query = "DELETE FROM usuarios WHERE id=$id" . PHP_EOL;
        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function editar($data){
        $conn = $this->conectar();
        $fecha = $this->fecha_actual();
        $nombre = $data["nombre"];
        $email = $data["email"];
        $password = null;
        $pass_visible = $data['pass'];
        
        $rol = $data['rol'];
        $ciudad_id = $data['ciudad_id'];
        $ciudad_id = $data['ciudad_id'];
        $dir = $data['dir'];
        $sede_id = $data['sede'];
        $iduser = $data["iduser"];

        $param_pass = '';
        $param_pass_visible = '';
        if($data['pass'] != '' || count($data['pass']) > 2){
            $password =  password_hash($data['pass'], PASSWORD_BCRYPT);
            $param_pass = ", pass='$password'";
            $param_pass_visible = ", pass_visible='$pass_visible'";
        }
        $query = "UPDATE usuarios SET nombre='$nombre',email='$email' $param_pass $param_pass_visible,
        rol_id=$rol, ciudad_id=$ciudad_id, dir='$dir',sede_id=$sede_id
        WHERE id=$iduser" . PHP_EOL;

        $resul = $this->consulta_sql($conn, $query);
        return $resul;
    }

    function traer_autenticar($email, $pass){
        $conn = $this->conectar();
        $query = "SELECT * FROM usuarios";
        $resul = $this->consulta_sql($conn, $query);
 
        $data = [];
        while($consulta = $resul->fetch_assoc()){
            array_push($data, [
                'id' => $consulta['id'],
                'nombre' => $consulta['nombre'],
                'email' => $consulta['email'],
                'pass' => $consulta['pass'],
                'rol_id' => $consulta['rol_id'],
                'sede_id' => $consulta['sede_id'],
                
            ]);
            
        }
        return $data;
    }

    
}
