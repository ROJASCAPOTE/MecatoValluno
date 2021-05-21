<div class="content" style="min-width: 90%;">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Configuracion</h5>
                </div>
                <div class="card-body pt-0 ">
                    <!-- <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-pais" type="button">Nuevo
                                Ciudad
                            </button></div> -->
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <table class="table text-center">
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Id</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">% de Comision</th>
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
                        <label for="formComision">% de Comision</label>
                        <input type="number" class="form-control" id="formComision">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-success btn-crear-cliente" >Actualizar</button>
            </div>
        </div>
    </div>
</div>
<!-- End Modal -->

    <!-- Footer -->
    <?php include_once PATH_FOLDER . '/Views/layouts/includes/footer.php'; ?>
    <!-- End Footer -->
</div>



<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/configuracion/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>