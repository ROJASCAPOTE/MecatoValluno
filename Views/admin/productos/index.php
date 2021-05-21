<div class="content" style="min-width: 90%;">
<div class="row">
  <input type="hidden" value="<?php echo URL_PATH; ?>" id="url-path">
    <div class="col-sm-12">
        <div class="card ">
            <div class="card-header">
                <h5 class="h6 font-weight-semi-bold text-uppercase mb-0">Productos</h5>
            </div>
            <div class="card-body pt-0 ">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-6">
                        <div class="input-group">
                            <div class="input-group-append">
                              <i class="gd-search icon-text icon-text-sm btn-buscar"></i>
                          </div>
                          <input class="form-control form-control-icon-text" placeholder="Buscar" type="text" id="buscar">
                      </div>

                  </div>
                  <div class="col-sm-3"></div>
              </div>
              <hr>
              <br>
              <div class="row" id="contenedor-productos">
                  
              </div>  
          </div>
      </div>

  </div>
</div>



<!-- Footer -->
<?php include_once PATH_FOLDER . '/Views/layouts/includes/footer.php'; ?>
<!-- End Footer -->
</div>


<!-- Importo los scripts de esta pagina -->
<?php 
$ruta = URL_PATH . 'public/js/productos/main.js';
$scripts[] = "<script src='$ruta'></script>" . PHP_EOL; 
?>