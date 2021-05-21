<aside id="sidebar" class="js-custom-scroll side-nav">
  <ul id="sideNav" class="side-nav-menu side-nav-menu-top-level mb-0">

    <!-- Dashboard -->
    <li class="side-nav-menu-item active">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>dashboard">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-dashboard"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Dashboard</span>
      </a>
    </li>
    <!-- End Dashboard -->

    <?php if($user['rol_id'] == 3 || $user['rol_id'] == 6) { ?>
    <!-- Title -->
    <li class="sidebar-heading h6">Inventario</li>
    <!-- End Title -->

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>productos">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-briefcase"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Productos</span>
      </a>
    </li>

    
    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>materiaprima">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-package"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Materia Prima</span>
      </a>
    </li>

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>produccion">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-calendar"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Programación de Producción</span>
      </a>
    </li>
  <?php } ?>

    <!-- Title -->
    <li class="sidebar-heading h6">Modulo Personas</li>
    <!-- End Title -->
    <?php if($user['rol_id'] == 6) { ?>
    <!-- Documentation -->
    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>roles">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-anchor"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Roles</span>
      </a>
    </li>
    <!-- End Documentation -->
  <?php } ?>

  <?php if($user['rol_id'] == 6 || $user['rol_id'] == 2 || $user['rol_id'] == 1) { ?>
    <!-- Users -->
    <li class="side-nav-menu-item side-nav-has-menu">
      <a class="side-nav-menu-link media align-items-center" href="#" data-target="#subUsers">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-user"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Usuarios</span>
        <span class="side-nav-control-icon d-flex">
          <i class="gd-angle-right side-nav-fadeout-on-closed"></i>
        </span>
        <span class="side-nav__indicator side-nav-fadeout-on-closed"></span>
      </a>
    <?php } ?>

      <?php if($user['rol_id'] == 2) { ?>
      <!-- Users: subUsers -->
      <ul id="subUsers" class="side-nav-menu side-nav-menu-second-level mb-0">
        <li class="side-nav-menu-item">
          <a class="side-nav-menu-link" href="<?php echo URL_PATH; ?>usuarios/clientes">Clientes</a>
        </li>
      <?php } ?>

        <?php if($user['rol_id'] == 6) { ?>
        <li class="side-nav-menu-item">
          <a class="side-nav-menu-link" href="<?php echo URL_PATH; ?>usuarios/proveedores">Proveedores</a>
        </li>
        <li class="side-nav-menu-item">
          <a class="side-nav-menu-link" href="<?php echo URL_PATH; ?>usuarios/empleados">Empleados</a>
        </li>
        <?php } ?>

        <?php if($user['rol_id'] == 6) { ?>
        <li class="side-nav-menu-item">
          <a class="side-nav-menu-link" href="<?php echo URL_PATH; ?>usuarios/sistema">Sistema</a>
        </li>
      <?php } ?>

      </ul>
      <!-- End Users: subUsers -->
    </li>
    <!-- End Users -->
    <?php if($user['rol_id'] == 2 || $user['rol_id'] == 6) { ?>
    <li class="sidebar-heading h6">Vendedores</li>
    
    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>ventas">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-shopping-cart-full"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Ventas</span>
      </a>
    </li>
<?php } ?>

<?php if($user['rol_id'] == 6 || $user['rol_id'] == 1 || $user['rol_id'] == 4) { ?>
    <li class="sidebar-heading h6">Pagos</li>

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>nomina">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-book"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Gestion de Nomina</span>
      </a>
    </li>
  <?php } ?>
  
    <?php if($user['rol_id'] == 6) { ?>
    <!-- Title -->
    <li class="sidebar-heading h6">Configuracion</li>
    <!-- End Title -->

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>paises">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-world"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Paises</span>
      </a>
    </li>

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>ciudad">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-angle-double-right"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Ciudades</span>
      </a>
    </li>

    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>sedes">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-angle-double-right"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Sedes</span>
      </a>
    </li>

    <!-- Settings -->
    <li class="side-nav-menu-item">
      <a class="side-nav-menu-link media align-items-center" href="<?php echo URL_PATH; ?>configuracion">
        <span class="side-nav-menu-icon d-flex mr-3">
          <i class="gd-settings"></i>
        </span>
        <span class="side-nav-fadeout-on-closed media-body">Configuracion</span>
      </a>
    </li>
    <!-- End Settings -->
  <?php } ?>
  </ul>
</aside>