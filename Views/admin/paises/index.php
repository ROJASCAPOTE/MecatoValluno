<div class="content">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Paises</h5>
                </div>
                <div class="card-body pt-0">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-pais" type="button">Nuevo
                                Pais
                            </button></div>
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Pais</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Fecha de Registro</th>
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
<div class="modal fade" id="modal-crear-pais" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Pais</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="formNombre">Nombre</label>
                        <input type="text" class="form-control" id="formPais">
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
$ruta = URL_PATH . 'public/js/paises_ciudades/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>