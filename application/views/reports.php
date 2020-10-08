<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vastuTeq</title>

    <!-- FAVICON -->
    <link rel="icon" href="<?php echo base_url('assets/icons/favicon.ico') ?>" type="image/ico">
    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/bootstrap.min.css') ?>">
    <!-- FONTAWESOME CSS -->
    <link rel="stylesheet" href="<?php echo base_url('assets/fontawesome/css/all.min.css') ?>">
    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/app.css') ?>">
    <!-- MODAL CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/modal.css') ?>">
    <!-- RULER CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/ruler.min.css') ?>">
    <!-- summernote -->
    <link rel="stylesheet" href="<?php echo base_url('css/summernote-bs4.min.css') ?>">


    <!-- BASE URL -->
    <script>
        const BASE_URL = "<?php echo base_url() ?>";
    </script>
    <!-- JQUERY -->
    <script src="<?php echo base_url('js/helper/jquery.min.js') ?>"></script>
    <!-- POPPER JS -->
    <script src="<?php echo base_url('js/helper/popper.min.js') ?>"></script>
    <!-- BOOTSTRAP JS -->
    <script src="<?php echo base_url('js/helper/bootstrap.min.js') ?>"></script>
    <!-- BLOB -->
    <script src="<?php echo base_url('js/helper/blob.js') ?>"></script>
    <!-- FILE SAVER -->
    <script src="<?php echo base_url('js/helper/filesaver.js') ?>"></script>
    <!-- SUBJX -->
    <script src="<?php echo base_url('js/helper/subjx.js') ?>"></script>
    <!-- GREINER - HORMANN POLYGON CLIPPING ALGORITHM -->
    <script src="<?php echo base_url('js/helper/clip.js') ?>"></script>
    <!-- D3 JS SCRIPT -->
    <script src="<?php echo base_url('js/d3.min.js') ?>"></script>
    <!-- FONTAWESOME JS -->
    <script src="<?php echo base_url('assets/fontawesome/js/all.min.js') ?>"></script>
    <!-- APP CLASS JS -->
    <!-- <script src="<?php echo base_url('js/app.class.js') ?>" type="module" defer></script> -->
    <!-- MODAL JS -->
    <script src="<?php echo base_url('js/modal.js') ?>"></script>
    <!-- Ajax library -->
    <script src="<?php echo base_url('js/MyScriptLibrary.js') ?>"></script>
    <!-- Notify library -->
    <script src="<?php echo base_url('js/bootstrap-notify.min.js') ?>"></script>
    <!-- D3 JS SCRIPT -->
    <script src="<?php echo base_url('js/helper/ruler.min.js') ?>"></script>
    <!-- Summernote -->
    <script src="<?php echo base_url('js/summernote-bs4.min.js') ?>"></script>

    <script defer src="<?php echo base_url('js/reports.js') ?>" type="module"></script>



</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->

    <?php include 'topbar.php' ?>
    <div class="row m-0 mt-3 report-container">
        <div class="col-2 p-4 b-right">
            <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a class="nav-link active" id="tab1" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true">Set Object Colour</a>
                <a class="nav-link" id="tab2" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true">Set 16 Zone Colour</a>
                <a class="nav-link" id="tab3" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true">Main Gate Entry</a>
                <a class="nav-link" id="tab4" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-home" aria-selected="true">Object/Activity Wise Report</a>
                <a class="nav-link" id="tab5" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-profile" aria-selected="false">Zone Activity Report</a>
                <a class="nav-link" id="tab6" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-messages" aria-selected="false">Zone Object Report</a>
                <a class="nav-link" id="tab7" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false">Zone Colour Report</a>
                <a class="nav-link" id="tab8" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false">Consultant Report</a>
                <a class="nav-link" id="tab9" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false">Complete Report</a>
                <a class="nav-link" id="tab10" data-toggle="pill" href="#" role="tab" aria-controls="v-pills-settings" aria-selected="false">Ayadhi Report</a>

            </div>
        </div>
        <div class="col-10 p-4">
            <div class="tab-content" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="main-tab-right" role="tabpanel" aria-labelledby="v-pills-home-tab">

                </div>
            </div>
        </div>
    </div>


</body>


<!-- SWEET ALERT JS -->
<script src="<?php echo base_url('js/helper/sweetalert.js') ?>"></script>

</html>