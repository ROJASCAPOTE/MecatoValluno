<div class="content" style="min-width: 90%;">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Nomina</h5>
                </div>
                <div class="card-body pt-0 ">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-cliente" type="button">Nuevo Pago
                            </button></div>
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <input type="hidden" id="user_id_login" value="<?php echo $user['id']; ?>">
                    <table class="table text-center" id="myTable" data-page-length='1'>
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Empleado</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Valor</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Fecha de Pago</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Opciones</th>
                            </tr>
                        </thead>
                        <tbody id="data-table">


                        </tbody>
                    </table>
                    <nav>
                        <ul class="pagination">
                            
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
 <div class="modal fade " id="modal-crear-usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nuevo Pago</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Empleados</label>
                          <select class="form-control" id="select-empleados">
                      
                          </select>
                        </div>

                        <hr>

                        <div class="form-group">
                            <label for="formCant">Valor del Pago</label>
                            <input type="number" class="form-control" id="pago">
                        </div>

                    </form>
                   
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success btn-crear-cliente">Finalizar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/nomina/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>