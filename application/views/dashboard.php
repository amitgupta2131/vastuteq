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
    <link rel="stylesheet" href="<?php echo base_url('css/main.css') ?>">
<!-- google fonts -->
<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">

    <!-- JQUERY -->
    <script src="<?php echo base_url('js/helper/jquery.min.js') ?>"></script>
    <!-- POPPER JS -->
    <script src="<?php echo base_url('js/helper/popper.min.js') ?>"></script>
    <!-- BOOTSTRAP JS -->
    <script src="<?php echo base_url('js/helper/bootstrap.min.js') ?>"></script>
    <!-- FONTAWESOME JS -->
    <script src="<?php echo base_url('assets/fontawesome/js/all.min.js') ?>"></script>
    <!-- D3 JS -->
    <script src="<?php echo base_url('js/d3.min.js') ?>"></script>
    <!-- CUSTOM JS -->
    <script src="<?php echo base_url('js/dashboard.js') ?>" type="module" defer></script>
    <!-- Ajax library -->
    <script src="<?php echo base_url('js/MyScriptLibrary.js') ?>"></script>
    <!-- Notify library -->
    <script src="<?php echo base_url('js/bootstrap-notify.min.js') ?>"></script>
    <script>
        const base_url = '<?php echo base_url() ?>'
    </script>

</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    

    <!-- M E N U  I C O N -->
    <?php include 'topbar.php' ?>




    <!-- 
    //////////////////////////////// --- D R A W  A R E A ---  ////////////////////////////////
    -->
    <section id="mainArea" class="p-4">
        <div id="mapsContainer" class="row justify-content-md-start">
         
            <?php
            if (isset($property) && !empty($property)) {
                // echo "<pre>";
                // print_r($property);
                // die;
                for ($i = 0; $i < count($property); $i++) {

                    $imageResource = json_decode($property[$i]['imageData'], true);
            ?>
                    <div class="col-lg-3 col-md-4 col-sm-12 mb-4">
                        <div class="card rounded bubbly-button p-1">
                        <a href = "<?php echo $imageResource['src'] ?>" download title="click image for download"><img class="card-img-top" src="<?php echo $imageResource['src'] ?>"></a>
                            <div class="card-body p-2 border-top border-thick">                                
                                <div class="project-name card-text">
                                    <span class="col-sm-5">Name : </span>
                                    <span class="col-sm-7"><?php echo $property[$i]['propertyName'] ?></span>
                                </div>
                                <div class="project-name card-text">
                                    <span class="col-sm-5">Category : </span>
                                    <span class="col-sm-7"><?php echo $property[$i]['category'] ?></span>
                                </div>
                                <div class="project-name card-text">
                                    <span class="col-sm-5">Type : </span>
                                    <span class="col-sm-7"><?php echo ucwords($property[$i]['type']) ?></span>
                                </div>                               
                            </div>
                            <div class="row m-0">
                                <div class="col-sm-7"></div>
                            <button title="Delete" class="btn btn-danger deleteMap mr-2 col-sm-2"  style="text-align:center;cursor:pointer"  dId="<?php echo $property[$i]['propertyId'] ?>"><i class="fas fa-trash"></i></button> 
                            <button title="Edit" class="btn btn-primary col-sm-2" data-map-id="<?php echo $property[$i]['mapId'] ?>" aria-hidden="true" style="cursor:pointer"><i class="far fa-edit"></i></button>
                            </div>
                        </div>
                    </div>
            <?php }
            } ?>
        </div>
    </section>

    <!-- <div class="p-4 container" style="max-width:1340px;">
        <div class="row" style="margin-top:3rem">
            <div class="card" style="width:100%">
                <div class="card-header row m-0">
                    <h4 class="dash-h col-sm-11">House Maps</h4>
                    
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table dataTable table-bordered">
                            <thead class="bg-light">
                                <tr >
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Type</th>
                                    <th>Map Image</th>   
                                    <th style="text-align:center">Action</th>                 

                                </tr>
                            </thead>
                            <tbody id="houseMaps">
                                <?php if (isset($property) && !empty($property)) {
                                    // echo "<pre>";
                                    // print_r($property);
                                    // die;
                                    for ($i = 0; $i < count($property); $i++) { 
                                        $imageResource = json_decode($property[$i]['imageData'], true);?>
                                    
                                        <tr>
                                            
                                            <td><?php echo $property[$i]['mapId'] ?></td>
                                            <td><?php echo $property[$i]['propertyName'] ?></td>
                                            <td><?php echo $property[$i]['category'] ?></td>
                                            <td><?php echo $property[$i]['type'] ?></td>
                                            <td><a href = "<?php echo $imageResource['src'] ?>" download><img src="<?php echo $imageResource['src'] ?>" width="100" ></a></td>
                                            <td style="text-align:center">
                                            <button class="btn btn-danger deleteMap"  style="text-align:center"  dId="<?php echo $property[$i]['propertyId'] ?>" style="cursor:pointer">Delete</button> 
                                            <button class="btn btn-primary" data-map-id="<?php echo $property[$i]['mapId'] ?>" aria-hidden="true" style="cursor:pointer">Edit</button></td>
                                        </tr>
                                <?php }
                                } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div> -->

    <!-- data table -->
    <!-- <link rel="stylesheet" href="<?php echo base_url('assets/custom/jquery.dataTables.min.css') ?>">
    <script src="<?php echo base_url('assets/custom/jquery.dataTables.min.js') ?>"></script>

    <script>
        $('.dataTable').dataTable();
    </script> -->
  
</body>

</html>