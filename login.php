
<!DOCTYPE html>
<html lang="es">

<head>
    <!-- Title -->
    <title>Login | <?php echo TUTULO_APP ?></title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

    <!-- Favicon -->
    <link rel="shortcut icon" href="<?php PATH_FOLDER ?>public/img/favicon.ico">

    <!-- Template -->
    <link rel="stylesheet" href="<?php PATH_FOLDER ?>public/graindashboard/css/graindashboard.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Orelega+One&display=swap" rel="stylesheet">
    <style>
        .titulo-login{
            font-family: 'Orelega One', cursive;
            color: black;
            font-weight: 700;
        }
    </style>
</head>

<body class="">

    <main class="main">

        <div class="content">

            <div class="container-fluid pb-5">

                <div class="row justify-content-md-center">
                    <div class="card-wrapper col-12 col-md-4 mt-5">
                        <div class="brand text-center mb-3">
                            <h1 class="titulo-login">MECATEATE CALI!!</h1>
                            <?php 
                                if(isset($_GET['e']) && $_GET['e'] == 'false'){
                                    echo '<span style="color:red">Credenciales invalidas</span> ';
                                }
                            ?>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title">Identificarse</h4>
                                <form action="<?php echo URL_PATH; ?>login/iniciar" method="POST">
                                    <div class="form-group">
                                        <label for="email">Correo</label>
                                        <input id="email" type="email" class="form-control" name="email" required=""
                                            autofocus="">
                                    </div>

                                    <div class="form-group">
                                        <label for="password">Contraseña
                                        </label>
                                        <input id="password" type="password" class="form-control" name="password"
                                            required="">
                                        <div class="text-right">
                                            
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="form-check position-relative mb-2">
                                            <input type="checkbox" class="form-check-input d-none" id="remember"
                                                name="remember">
                                            <!-- <label class="checkbox checkbox-xxs form-check-label ml-1" for="remember"
                                                data-icon="&#xe936">Remember Me</label> -->
                                        </div>
                                    </div>

                                    <div class="form-group no-margin">
                                        <button type="submit" class="btn btn-primary btn-block">
                                            Iniciar Sesión
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>
                        </div>
                        <footer class="footer mt-3">
                            <div class="container-fluid">
                                <div class="footer-content text-center small">
                                    
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>



            </div>

        </div>
    </main>

    <script src="<?php PATH_FOLDER ?>public/graindashboard/js/graindashboard.js"></script>
    <script src="<?php PATH_FOLDER ?>public/graindashboard/js/graindashboard.vendor.js"></script>
</body>

</html>