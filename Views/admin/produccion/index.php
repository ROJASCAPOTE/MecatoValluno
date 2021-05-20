<div class="content" style="min-width: 90%;">
    <div class="row">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Programacion de Produccion</h5>
                </div>
                <div class="card-body pt-0 ">
                    <div class="d-flex flex-row-reverse bd-highlight">
                        <div class="p-2 bd-highlight">
                            <button class="btn btn-primary btn-nuevo-cliente" type="button">Crear nueva programacion
                            </button></div>
                        </div>
                        <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                        <table class="table text-center" id="myTable" data-page-length='1'>
                            <thead>
                                <tr>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Nombre del Producto</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Cantidad</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Estado</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Fecha Inicio</th>
                                    <th class="font-weight-semi-bold border-top-0 py-2">Fecha Fin</th>
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
    <div class="modal fade" id="modal-crear-usuario" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nueva Programacion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="form-produccion" method="POST" enctype="multipart/form-data" >
                    <div class="form-group">
                        <label for="formDesc">Nombre del Producto</label>
                        <input type="text" class="form-control" id="formNom" name="nombre">
                    </div>

                    <div class="form-group">
                        <label for="formValor">Cantidad</label>
                        <input type="number" class="form-control" id="formCant" name="cant">
                    </div>

                    <div class="form-group">
                        <label for="formValor">Valor Unitario</label>
                        <input type="number" class="form-control" id="formValor" name="valor">
                    </div>

                    <div class="form-group">
                      <label for="formImg">Imagen del Producto</label>
                      <input type="file" class="form-control-file" id="formImg" accept="image/*" name="imagen">
                  </div>

                  <div class="form-group">
                      <label for="select-materia-prima">Material Prima</label>
                      <select multiple class="form-control" id="select-materia-prima" name="materia_prima[]">
                        
                    </select>
                </div>

                  <div class="form-group">
                    <label for="formValor">Fecha Inicio</label>
                    <input type="date" class="form-control" id="formFinicio" name="fecha_inicio">
                </div>

                <div class="form-group">
                    <label for="formValor">Fecha Fin</label>
                    <input type="date" class="form-control" id="formFfin" name="fecha_fin">
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

<!-- Modal Cambiar Estado -->
    <div class="modal fade" id="modal-cambiar-estado" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Cambiar Estado</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form method="POST"  >

                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Nuevo Estado</label>
                      <select class="form-control" id="select-estado">
                        <option value="0">Seleccione un estado</option>
                        <option value="1">Finalizado</option>
                    </select>
                </div>

                </form>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-success btn-actualizar-estado">Crear</button>
        </div>
    </div>
</div>
</div>
<!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/produccion/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>