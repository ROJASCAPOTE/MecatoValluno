<div class="content" style="min-width: 90%;">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Registro de Ventas</h5>
                </div>
                <div class="card-body pt-0 ">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-cliente" type="button">Nueva Venta
                            </button></div>
                    </div>
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <input type="hidden" id="user_id_login" value="<?php echo $user['id']; ?>">
                    <table class="table text-center" id="myTable" data-page-length='1'>
                        <thead>
                            <tr>
                                <th class="font-weight-semi-bold border-top-0 py-2">Nombre</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Cantidad</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Precio Unitario</th>
                                <th class="font-weight-semi-bold border-top-0 py-2">Total</th>
                                 <th class="font-weight-semi-bold border-top-0 py-2">Cliente</th>
                                 <th class="font-weight-semi-bold border-top-0 py-2">Fecha Venta</th>
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
 <div class="modal fade " id="modal-crear-usuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nueva Venta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Cliente</label>
                          <select class="form-control" id="select-cliente">
                      
                          </select>
                        </div>

                        <hr>

                        <div class="form-group">
                          <label for="exampleFormControlSelect1">Producto</label>
                          <select class="form-control" id="select-producto">
                      
                          </select>
                        </div>

                        <div class="form-group">
                            <label for="formCant">Cantidad</label>
                            <input type="number" class="form-control" id="cantidad">
                        </div>

                        <button class="btn btn-info btn-agregar-producto" type="button">Agregar</button>
                    </form>
                    <br>
                    <hr>
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table" >
                                <thead>
                                  <tr>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Producto</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Cantidad</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Valor Unitario</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody id="table-productos">
                                                                      
                                    <tr id="total">
                                        <td></td>
                                        <td></td>
                                        <td colspan="2" class="table-active">Total: $0</td>
                                    </tr>
                                </tbody>
                              </table>
                        </div>
                    </div>
                    

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success btn-crear-cliente">Registrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/ventas/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>