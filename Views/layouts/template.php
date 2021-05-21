<?php 
//session_start();
$user = null;
if(isset($_SESSION["login"])){
    $user = $_SESSION["login"][0];
    //var_dump($user);
} 
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Title -->
    <title><?php echo TUTULO_APP; ?> </title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php echo URL_PATH; ?>public/img/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">

    <!-- DEMO CHARTS -->
    <link rel="stylesheet" href="<?php echo URL_PATH; ?>public/demo/chartist.css">
    <link rel="stylesheet" href="<?php echo URL_PATH; ?>public/demo/chartist-plugin-tooltip.css">

    <!-- Template -->
    <link rel="stylesheet" href="<?php echo URL_PATH; ?>public/graindashboard/css/graindashboard.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="<?php echo URL_PATH; ?>public/demo/chartist-plugin-tooltip.css">
    <link rel="stylesheet" href="<?php echo URL_PATH; ?>public/css/main.css">
</head>

<body class="has-sidebar has-fixed-sidebar-and-header">
    <!-- Header -->
    <?php include_once PATH_FOLDER . '/Views/layouts/includes/header.php'; ?>
    <!-- End Header -->

    <main class="main">
    <div class="lds-hourglass"></div>
        <!-- Sidebar Nav -->
        <?php include_once PATH_FOLDER . '/Views/layouts/includes/menu.php'; ?>
        <!-- End Sidebar Nav -->


        <?php include_once PATH_FOLDER . '/Views/content.php'; ?>


    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous">
    </script>
    <!-- <script src="<?php echo URL_PATH; ?>public/js/jquery-3.6.0.min.js"></script> -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="<?php echo URL_PATH; ?>public/graindashboard/js/graindashboard.js"></script>
    <script src="<?php echo URL_PATH; ?>public/graindashboard/js/graindashboard.vendor.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <scipt src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.3/dist/jquery.validate.min.js"></script>
    <script src="<?php echo URL_PATH; ?>public/js/ahDataTable.js" ></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.3.1/jspdf.umd.min.js"></script>

    <?php include_once PATH_FOLDER . '/Views/scripts.php'; ?>

</body>

</html>