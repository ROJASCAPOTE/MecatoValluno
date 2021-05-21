<div class="content">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Usuarios <?php echo $data['titulo']; ?></h5>
                </div>
                <div class="card-body pt-0">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-usuario" type="button">Nuevo
                                Usuario
                            </button></div>
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <input type="hidden" value="<?php echo $data['rol']; ?>" id="rol-vista">
                    <table class="table" id="myTable">
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Nombre</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Correo</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Ciudad</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Dirección</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Rol</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Sede</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody id="data-table">


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <!-- Footer -->
    <?php include_once PATH_FOLDER . '/Views/layouts/includes/footer.php'; ?>
    <!-- End Footer -->
</div>

<!-- Modal Crear Cliente -->
<div class="modal fade" id="modal-crear-usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="formNombre">Nombre</label>
                        <input type="text" class="form-control" id="formNombre">
                    </div>
                    <div class="form-group">
                        <label for="formEmail">Correo</label>
                        <input type="email" class="form-control" id="formEmail">
                    </div>
                    <div class="form-group">
                        <label for="formDir">Direccíon</label>
                        <input type="text" class="form-control" id="formDir">
                    </div>
                    <div class="form-group">
                        <label for="formPais">Pais</label>
                        <select class="form-control" id="selectPais">
            
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="formPais">Ciudad</label>
                        <select class="form-control" id="selectCiudad">
            
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="formPais">Sede</label>
                        <select class="form-control" id="selectSede">
            
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="formCiudad">Rol</label>
                        <select class="form-control" id="formRol">
                
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="formPassword">Contraseña</label>
                        <input type="password" class="form-control" id="formPassword">
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success btn-crear-cliente" editar="no">Crear</button>
            </div>
        </div>
    </div>
</div>
<!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/usuarios/sistema.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>