<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vastuTeq</title>
    <!-- FAVICON -->
    <link rel="icon" href="<?php echo base_url('assets/icons/favicon.ico')?>" type="image/ico">
    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/bootstrap.min.css')?>">
    <!-- FONTAWESOME CSS -->
    <link rel="stylesheet" href="<?php echo base_url('assets/fontawesome/css/all.min.css')?>">
    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/devtas.css')?>">
    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/main.css') ?>">
    <script>const base_url = '<?php echo base_url()?>'</script>
   
     
</head>
<body>
<!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    <section class="header" style="position:unset">
        <div class="title-bar" style="justify-content:left;">
            <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/logo/logo2.svg') ?>" alt="logo" width="130">
            <!-- M E N U  I T E M S -->
            <div class="menu-sidebar">
                <ul class="nav menu" style="float:right">
                    <li class="nav-item">
                        <a href="#">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo base_url('Main') ?>">Dashboard</a>
                    </li>
                    
                    <li class="nav-item">
                        <a href="<?php echo base_url('Main/ayadhi') ?>">Ayadi Calculator</a>
                    </li>
                    <li class="nav-item">
                        <a href="<?php echo base_url('Main/devtas') ?>">Devtas</a>
                    </li>
                    <li>
                        <img class="profile thumbnail rounded-circle" src="<?php echo base_url('assets/images/thumbnail.png') ?>" alt="user" width="20" id="profileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileButton">
                            <a class="dropdown-item modal__trigger" href="#" data-modal="#modal3"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
                            <a class="dropdown-item" href="<?php echo base_url('Main/logout') ?>"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Sign Out</a>
                        </div>
                    </li>
                </ul>
            </div>            
        </div>
       
    </section>
    <section class="p-4 devtas-main justify-content-between align-items-center row devtas_container">
        <div class="leftside">
        </div>
        <div class="rightside">
            <img src="<?php echo base_url('assets/images/chakra.png')?>" alt="" width="470">
        </div>
    </section>

    <!-- 
    //////////////////////////////// --- A P P  M O D A L ---  ////////////////////////////////
    -->

    <div class="modal fade bd-example-modal-lg " id="appModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header p-1 pl-3 pr-3">
              <h5 class="modal-title" id="devtaTitle"></h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <div class="row" id="desc-container">
                    <div class="col-md-4 border-right">
                        <div class="top container">
                            <div class="devta-image">
                                <img id="devta-img" src="" alt="devta-img">
                            </div>
                        </div>
                        <div class="bottom container mt-3">
                            <div class="row">
                                <div class="col-md-4 text-uppercase text-sm" style="font-family: 'Raleway-SemiBold'">name:</div>
                                <div id="devta-name" class="col-md-7 text-uppercase text-sm"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 text-uppercase text-sm" style="font-family: 'Raleway-SemiBold'">direction:</div>
                                <div id="devta-direction" class="col-md-7 text-uppercase text-sm"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 text-uppercase text-sm" style="font-family: 'Raleway-SemiBold'">color:</div>
                                <div id="devta-color" class="col-md-7 text-uppercase text-sm"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-8 overflow-auto">
                        <div class="col-md-12">
                            <h5 class="title">Devta Sloka</h5>
                            <p id="devta-sloka" class="desc"></p>
                        </div>
                        <div class="col-md-12">
                            <h5 class="title">Devta Description</h5>
                            <p id="devta-description" class="desc"></p>
                        </div>
                        <div class="col-md-12">
                            <h5 class="title">Other Details</h5>
                            <ul id="other-details" class="desc"></ul>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>


    <!-- JQUERY -->
    <script src="<?php echo base_url('js/helper/jquery.min.js')?>"></script>
    <!-- POPPER JS -->
    <script src="<?php echo base_url('js/helper/popper.min.js')?>"></script>
    <!-- BOOTSTRAP JS -->
    <script src="<?php echo base_url('js/helper/bootstrap.min.js')?>"></script>
    <!-- D3 JS SCRIPT -->
    <script src="<?php echo base_url('js/d3.min.js')?>"></script>
    <!-- FONTAWESOME JS -->
    <script src="<?php echo base_url('assets/fontawesome/js/all.min.js')?>"></script>
    <!-- CUSTOM JS -->
    <script src="<?php echo base_url('js/devtas.js')?>"></script>
    <!-- Ajax library -->
    <script src="<?php echo base_url('js/MyScriptLibrary.js') ?>"></script>
    <!-- Notify library -->
    <script src="<?php echo base_url('js/bootstrap-notify.min.js') ?>"></script>

</body>
</html>