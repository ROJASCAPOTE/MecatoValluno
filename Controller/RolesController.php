<?php

include_once PATH_FOLDER . 'Models/Roles.php';

class RolesController extends Controller{

    function __construct(){
        $this->dataUser = $this->auth();
    }

    function index(){
        $this->dataUser = $this->auth(6);
        $roles = new Roles();
        $data = $roles->traer_roles();
       
        $this->renderView('Views/admin/roles/index.php', 'template', $data);
    }

    function roles_all(){
        $roles = new Roles();
        $data = $roles->traer_roles();
        echo json_encode($data);
    }


}