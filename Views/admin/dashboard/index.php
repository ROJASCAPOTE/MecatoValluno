<div class="content" style="min-width: 90%;" >
    <div class="mb-3 mb-md-4 d-flex justify-content-between">
        <div class="h3 mb-0">Dashboard</div>
        <div class="d-flex flex-row-reverse bd-highlight" style="margin-right: 20px;">
              <button type="button" class="btn btn-danger mb-2 mr-2 btn-pdf" id="ignorePDF">
                <i class="gd-file icon-text align-middle mr-2"></i>
                <span class="align-middle">PDF</span>
            </button>
        </div>
    </div>
    <div class="row" id="content">
        <!-- CARDS INFORMES -->
        
        <div class="row">
            
            <div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
                <!-- Widget -->
                <div class="card flex-row align-items-center p-3 p-md-4">
                    <div class="icon icon-lg bg-soft-primary rounded-circle mr-3">
                        <i class="gd-bar-chart icon-text d-inline-block text-primary"></i>
                    </div>
                    <div>
                        <h3 class="lh-1 mb-1"><?php echo $data['cant_proceso']; ?></h3>
                        <h6 class="mb-0">Productos en Produccion</h6>
                    </div>
                   <!--  <i class="gd-arrow-up icon-text d-flex text-success ml-auto"></i> -->
                </div>
                <!-- End Widget -->
            </div>

            <div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
                <!-- Widget -->
                <div class="card flex-row align-items-center p-3 p-md-4">
                    <div class="icon icon-lg bg-soft-secondary rounded-circle mr-3">
                        <i class="gd-wallet icon-text d-inline-block text-secondary"></i>
                    </div>
                    <div>
                        <h3 class="lh-1 mb-1">$<?php echo $data['inversion_materia']; ?></h3>
                        <h6 class="mb-0">Inversion en Materia Prima</h6>
                    </div>
                    <i class="gd-arrow-down icon-text d-flex text-danger ml-auto"></i>
                </div>
                <!-- End Widget -->
            </div>

            <div class="col-md-6 col-xl-4 mb-3 mb-xl-4">
                <!-- Widget -->
                <div class="card flex-row align-items-center p-3 p-md-4">
                    <div class="icon icon-lg bg-soft-warning rounded-circle mr-3">
                        <i class="gd-money icon-text d-inline-block text-warning"></i>
                    </div>
                    <div>
                        <h3 class="lh-1 mb-1">$<?php echo $data['total_ventas']; ?></h3>
                        <h6 class="mb-0">Total de Ventas</h6>
                    </div>
                    <i class="gd-arrow-up icon-text d-flex text-success ml-auto"></i>
                </div>
                <!-- End Widget -->
            </div>

        </div>

        <!-- CARDS INFORMES -->

        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Comision Vendedores</h5>
                </div>
                <div class="card-body pt-0 ">
                    <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
                    <input type="hidden" id="user_id_login" value="<?php echo $user['id']; ?>">
                    
                    <div class="row">
                        <div class="col-sm-12">
                            <table class="table text-center" id="myTable" data-page-length='1'>
                                <thead>
                                    <tr>
                                        <th class="font-weight-semi-bold border-top-0 py-2">Nombre</th>
                                        <th class="font-weight-semi-bold border-top-0 py-2">Valor Comision</th>
                                        <th class="font-weight-semi-bold border-top-0 py-2">Fecha de Pago</th>
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

            <div class="col-sm-6">
            </div>

        </div>



        <!-- Footer -->
        <?php include_once PATH_FOLDER . '/Views/layouts/includes/footer.php'; ?>
        <!-- End Footer -->
    </div>

</div>
<!-- End Modal -->

<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/dashboard/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>