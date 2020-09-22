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
    <script>const BASE_URL = '<?php echo base_url();?>';</script>
   <!-- JQUERY -->
   <script src="<?php echo base_url('js/helper/jquery.min.js')?>"></script>
     
</head>
<body>
<!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    
    <?php include 'topbar.php' ?>
    
    <section class="devtas-main justify-content-between align-items-center row devtas_container" style="margin-top:4rem !important">
    <button class="btn btn-primary" style="float:right;position:fixed;top:40px;right:50px" id="backbtn">Back</button>  
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
        <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
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
                                <div class="col-md-4 desc text-uppercase text-sm">name:</div>
                                <div id="devta-name" class="col-md-7 desc text-uppercase text-sm"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 text-uppercase desc text-sm">direction:</div>
                                <div id="devta-direction" class="col-md-7 desc text-uppercase text-sm"></div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 text-uppercase desc text-sm">color:</div>
                                <div id="devta-color" class="col-md-7 desc text-uppercase text-sm"></div>
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