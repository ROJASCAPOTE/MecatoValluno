<div class="content" style="min-width: 90%;">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Materia Prima</h5>
                </div>
                <div class="card-body pt-0 ">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-cliente" type="button">Comprar Materia Prima
                            </button></div>
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <table class="table text-center" id="myTable" data-page-length='1'>
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Nombre</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Cantidad</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Valor Unitario</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody id="data-table">


                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination">
                            <!-- <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link " href="#">Next</a></li> -->
                        </ul>
                    </nav>
                </div>
            </div>
        </div>

    </div>

   

    <!-- Footer -->
    <?php include_once PATH_FOLDER . '/Views/layouts/includes/footer.php'; ?>
    <!-- End Footer -->
</div>

 <!-- Modal Crear Materia Prima -->
 <div class="modal fade" id="modal-crear-usuario" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nueva Materia Prima</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                            <label for="formDesc">Descripcion</label>
                            <input type="text" class="form-control" id="formDesc">
                        </div>

                    <div class="form-group">
                            <label for="formValor">Valor Unitario</label>
                            <input type="number" class="form-control" id="formValor">
                        </div>

                        <div class="form-group">
                            <label for="formCant">Cantidad</label>
                            <input type="number" class="form-control" id="formCant">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success btn-crear-cliente">Crear</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/materia_prima/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>