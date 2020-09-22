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

    <script defer src="<?php echo base_url('js/app.js') ?>" type="module"></script>

    <script>
        const propertyId = '<?php echo $propertyId; ?>';
    </script>

</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->

    <?php include 'topbar.php' ?>
    <input class="import-map-file d-none" type="file">

    <!-- //////////////////////////////Cliend and property details form////////////////// -->
    <div class="container client-form d-none">
        <div class="row">
            <div class="card col-md-12 p-0 mt-5">
                <div class="card-header bg-primary">
                    <h5 class="modal-title text-white text-center" id="exampleModalLabel">
                        Client & Property Details
                    </h5>
                </div>
                <div class="card-body">
                    <form method="post" id="cpDetails">
                        <div>

                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Full Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control form-control-sm" id="clientName" name="cName" placeholder="Name" required />

                                </div>

                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Mobile No.</label>
                                    <input type="text" class="form-control form-control-sm" id="mNumber" name="mNumber" placeholder="Mobile No." />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Landline No.</label>
                                    <input type="number" class="form-control form-control-sm" name="lNumber" placeholder="Landline No." />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Email </label>
                                    <input type="email" class="form-control form-control-sm" name="cEmail" placeholder="Email" />
                                </div>
                                <div class="col-md-6 clientContainer d-none" id="clients"></div>
                            </div>
                            <div class="form-row">

                                <div class="form-group col-md-3">
                                    <label for="inputAddress">Client Address</label>
                                    <textarea class="form-control form-control-sm" name="cAddress" placeholder="1234 Main St"></textarea>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Property Name </label>
                                    <input type="text" class="form-control form-control-sm" name="pname" placeholder="property name" />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Category </label>
                                    <select class="form-control form-control-sm" name="category" id="category" placeholder="property category">
                                        <option value="">Select Category</option>
                                        <?php if (isset($category) && !empty($category)) {
                                            for ($i = 0; $i < count($category); $i++) { ?>
                                                <option tId="<?php echo $category[$i]['id']; ?>" value=" <?php echo $category[$i]['category']; ?>"><?php echo $category[$i]['category']; ?></option>
                                        <?php }
                                        } ?>
                                    </select>
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Type</label>
                                    <select class="form-control form-control-sm" name="type" id="type" placeholder="property type">
                                        <option value="">Select Type</option>

                                    </select>
                                </div>
                            </div>


                            <!-- 
                            <div class="form-row">
                                
                            </div> -->
                            <!-- <div class="form-row">
                               
                            </div> -->



                            <div class="form-row">
                                <div class="form-group col-md-3">
                                    <label for="inputAddress">Property Address</label>
                                    <textarea class="form-control form-control-sm" name="address" row='6' placeholder="property address"></textarea>
                                </div>
                                <div class="form-group col-md-3">

                                    <label for="inputEmail4">Grah Pravesh Date</label>
                                    <input type="date" class="form-control form-control-sm" name="gpDate" placeholder="Grah Pravesh Date (Optional)" />

                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">First Visit Date</label>
                                    <input type="date" class="form-control form-control-sm" name="fvDate" placeholder="First Visit Date" />
                                </div>
                                <div class="form-group col-md-3">
                                    <label for="inputEmail4">Property Purchase/opening Date</label>
                                    <input type="date" class="form-control form-control-sm" name="ppDate" placeholder="Property Purchase/opening Date" />
                                </div>
                            </div>


                        </div>
                </div>
                <div class="card-footer text-muted">
                    <input type="submit" value="Save Info" class="btn btn-outline-primary btn-sm rounded-0 float-right">
                    <div class="btn btn-primary text-sm d-none float-right" data-behavior="import"> Import Map</div>

                </div>
                </form>
            </div>

        </div>
    </div>


    <!-- 
    //////////////////////////////// --- D R A W  A R E A ---  ////////////////////////////////
    -->
    <section id="drawArea" class="flex d-none flex-column justify-content-center align-items-center">
        <div class="row col-sm-5 d-none" style="margin-top:100px;" id="mapImportOption">
            <!-- <div class="col-sm-6 text-primary"  data-behavior="import" style="cursor:pointer;margin-left:auto;margin-right:auto">
                <center><img src="<?php echo base_url('assets/icons/importMap.svg') ?>" width="100px">Import Map</img></center>
            </div> -->
            <div class="col-sm-6 text-primary d-none" data-behavior="create" style="cursor:pointer">
                <center><img src="<?php echo base_url('assets/icons/createMap.svg') ?>" width="100px">Create Map</img></center>
            </div>
        </div>
    </section>

    <!-- PAINT TOOLBOX LEFT START -->

    <div class="toolbox left d-none">
        <div class="group commands">
            <div class="item" data-command="undo" title="Undo">
                <img src="<?php echo base_url('assets/paint/undo-icon.png') ?>" />
            </div>
            <div class="item" data-command="download" title="Save As">
                <img src="<?php echo base_url('assets/paint/file-download.png') ?>" />
            </div>
        </div>
        <div class="group tools">
            <div class="item active" data-tool="line" title="Line Tool">
                <img src="<?php echo base_url('assets/paint/line-icon.png') ?>" />
            </div>
            <div class="item" data-tool="rectangle" title="Rectangle Tool">
                <img src="<?php echo base_url('assets/paint/rect-icon.png') ?>" />
            </div>
            <div class="item" data-tool="circle" title="Circle Tool">
                <img src="<?php echo base_url('assets/paint/circle-icon.png') ?>" />
            </div>
            <div class="item" data-tool="triangle" title="Triangle Tool">
                <img src="<?php echo base_url('assets/paint/tri-icon.png') ?>" />
            </div>
        </div>

        <div class="group tools">
            <div class="item" data-tool="pencil" title="Pencil Tool">
                <img src="<?php echo base_url('assets/paint/pencil-icon.png') ?>" />
            </div>
            <div class="item" data-tool="brush" title="Brush Tool">
                <img src="<?php echo base_url('assets/paint/brush-icon.png') ?>" />
            </div>
            <div class="item" data-tool="paint-bucket" title="Paint Bucket Tool">
                <img src="<?php echo base_url('assets/paint/paint-bucket-icon.png') ?>" />
            </div>
            <div class="item" data-tool="eraser" title="Eraser Tool">
                <img src="<?php echo base_url('assets/paint/eraser-icon.png') ?>" />
            </div>
        </div>


        <div class="group stroks pencil">
            <div class="item active" data-line-width="1" title="1 Pixel">
                <div class="stroke" style="width:1px;height: 1px;"></div>
            </div>
            <div class="item" data-line-width="5" title="5 Pixels">
                <div class="stroke" style="width:5px;height: 5px;"></div>
            </div>
            <div class="item" data-line-width="10" title="10 Pixels">
                <div class="stroke" style="width:10px;height: 10px;"></div>
            </div>
            <div class="item" data-line-width="15" title="15 Pixels">
                <div class="stroke" style="width:15px;height: 15px;"></div>
            </div>
            <div class="item" data-line-width="20" title="20 Pixels">
                <div class="stroke" style="width:20px;height: 20px;"></div>
            </div>
        </div>

        <div class="group stroks brush" style="display:none;">
            <div class="item active" data-brush-size="4" title="4 Pixels">
                <div class="stroke" style="width:4px;height: 4px;"></div>
            </div>
            <div class="item" data-brush-size="8" title="8 Pixels">
                <div class="stroke" style="width:8px;height: 8px;"></div>
            </div>
            <div class="item" data-brush-size="12" title="12 Pixels">
                <div class="stroke" style="width:12px;height: 12px;"></div>
            </div>
            <div class="item" data-brush-size="16" title="16 Pixels">
                <div class="stroke" style="width:16px;height: 16px;"></div>
            </div>
            <div class="item" data-brush-size="20" title="20 Pixels">
                <div class="stroke" style="width:20px;height: 20px;"></div>
            </div>
        </div>
    </div>

    <!-- PAINT TOOLBOX LEFT END -->


    <!-- PAINT TOOLBOX RIGHT START -->

    <div class="toolbox right d-none">
        <div class="group colors">
            <div class="item" data-color="#ffffff">
                <div class="swatch" style="background-color:#ffffff"></div>
            </div>
            <div class="item active" data-color="#000000">
                <div class="swatch" style="background-color:#000000"></div>
            </div>
            <div class="item" data-color="#ff0000">
                <div class="swatch" style="background-color:#ff0000"></div>
            </div>
            <div class="item" data-color="#00ff00">
                <div class="swatch" style="background-color:#00ff00"></div>
            </div>
            <div class="item" data-color="#0000ff">
                <div class="swatch" style="background-color:#0000ff"></div>
            </div>
            <div class="item" data-color="#00ffff">
                <div class="swatch" style="background-color:#00ffff"></div>
            </div>
            <div class="item" data-color="#ff00ff">
                <div class="swatch" style="background-color:#ff00ff"></div>
            </div>
            <div class="item" data-color="#ffff00">
                <div class="swatch" style="background-color:#ffff00"></div>
            </div>
            <div class="item" data-color="#c46f0f">
                <div class="swatch" style="background-color:#c46f0f"></div>
            </div>
            <div class="item" data-color="#fd8f27">
                <div class="swatch" style="background-color:#fd8f27"></div>
            </div>
            <div class="item" data-color="#0099ff">
                <div class="swatch" style="background-color:#0099ff"></div>
            </div>
            <div class="item" data-color="#ff009d">
                <div class="swatch" style="background-color:#ff009d"></div>
            </div>
        </div>
    </div>

    <!-- PAINT TOOLBOX RIGHT END -->



    <!-- ////////////// Icon Sidebar Toggle Start ////////////////////////////////////-->
    <div class="formwrapper d-none" id="right_sidebar">
        <div class="refer-form-slide">
            <h3 id="corporate_contact" class="row">
                <button type="button" class="obj-btn btn-primary col-sm-6 rounded-0" data-toggle="#objects">Objects</button>
                <button type="button" class="obj-btn btn-light col-sm-6 rounded-0" data-toggle="#activities">Activities</button></h3>
            <!-- For Objects -->
            <div id="objects" class="row message active">
                <div class="objectsBar col-sm-3">
                    <div class="objectimg" data-toggle="#obj1">
                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="40" title="single sofa">
                    </div>

                    <div class="objectimg" data-toggle="#obj2">
                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="50" title="single bed" title="chair icon">
                    </div>
                    <div class="objectimg" data-toggle="#obj3">
                        <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="50" title="double bed">
                    </div>
                    <div class="objectimg" data-toggle="#obj4">
                        <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="50" title="bathtub">
                    </div>
                    <div class="objectimg" data-toggle="#obj5">
                        <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="50" title="bookshelf">
                    </div>
                    <div class="objectimg" data-toggle="#obj6">
                        <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="50" title="dinning table">
                    </div>
                    <div class="objectimg" data-toggle="#obj7">
                        <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="50" title="wardrobe">
                    </div>
                    <div class="objectimg" data-toggle="#obj8">
                        <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="50" title="table">
                    </div>
                </div>

                <div class="col-sm-9 objcontainer">
                    <section id="obj1" class="overflow-auto row subobj-container active">
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/singe_sofa.svg') ?>" data-name="single-sofa">
                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="70" title="single-sofa">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" data-name="single-bed">
                            <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="70" title="single-bed">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/double_bed.svg') ?>" data-name="double-bed">
                            <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="70" title="double-bed">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" data-name="bathtub">
                            <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="70" title="bathtub">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" data-name="bookshelf">
                            <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="70" title="bookshelf">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/table01.svg') ?>" data-name="dinning-table">
                            <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="70" title="dinning-table">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" data-name="wardrobe">
                            <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="70" title="wardrobe">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/study_table.svg') ?>" data-name="table">
                            <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="70" title="table">
                        </div>

                    </section>
                    <section id="obj2" class="overflow-auto row subobj-container">
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="70" title="single bed" title="chair icon">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/singe_sofa.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="70" title="single sofa">
                        </div>

                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/double_bed.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="70" title="double bed">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="70" title="bathtub">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="70" title="bookshelf">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/table01.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="70" title="dinning table">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="70" title="wardrobe">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/study_table.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="70" title="table">
                        </div>

                    </section>
                </div>

            </div>
            <!-- For Activities -->
            <div id="activities" class="row message">
                <div class="objectsBar col-sm-3">
                    <div class="objectimg" data-toggle="#act1">
                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="40" title="single sofa">
                    </div>

                    <div class="objectimg" data-toggle="#act2">
                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="50" title="single bed" title="chair icon">
                    </div>
                    <div class="objectimg" data-toggle="#act3">
                        <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="50" title="double bed">
                    </div>
                    <div class="objectimg" data-toggle="#act4">
                        <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="50" title="bathtub">
                    </div>
                    <div class="objectimg" data-toggle="#act5">
                        <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="50" title="bookshelf">
                    </div>
                    <div class="objectimg" data-toggle="#act6">
                        <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="50" title="dinning table">
                    </div>
                    <div class="objectimg" data-toggle="#act7">
                        <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="50" title="wardrobe">
                    </div>
                    <div class="objectimg" data-toggle="#act8">
                        <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="50" title="table">
                    </div>
                </div>

                <div class="col-sm-9 objcontainer">
                    <section id="act1" class="overflow-auto row subobj-container active">
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/singe_sofa.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="70" title="single sofa">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="70" title="single bed" title="chair icon">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/double_bed.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="70" title="double bed">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="70" title="bathtub">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="70" title="bookshelf">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/table01.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="70" title="dinning table">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="70" title="wardrobe">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/study_table.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="70" title="table">
                        </div>

                    </section>
                    <section id="act2" class="overflow-auto row subobj-container">
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="70" title="single bed" title="chair icon">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/singe_sofa.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="70" title="single sofa">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/double_bed.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/double_bed_icon.svg') ?>" alt="" width="70" title="double bed">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bathtub_icon.svg') ?>" alt="" width="70" title="bathtub">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/bookshelf_icon.svg') ?>" alt="" width="70" title="bookshelf">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/table01.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/dining_table_icon.svg') ?>" alt="" width="70" title="dinning table">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/wardrobe_02_icon.svg') ?>" alt="" width="70" title="wardrobe">
                        </div>
                        <div class="object-item col-sm-6" data-src="<?php echo base_url('assets/objects/study_table.svg') ?>">
                            <img src="<?php echo base_url('assets/objects/table_01_icon.svg') ?>" alt="" width="70" title="table">
                        </div>

                    </section>
                </div>

            </div>
            <div alt="corporate-nomination" id="fixed_image">
                <h4><i class="fa fa-object-ungroup" aria-hidden="true"></i></h4>
            </div>
        </div>
    </div>
    <!-- ///////////// Icon Sidebar Toggle Start /////////////////////////////////////-->

    <!-- 
    //////////////////////////////// --- R I G H T  S I D E B A R ---  ////////////////////////////////
    -->
    <section id="rightSidebar" class="p-1 border d-none">
        <ul class="nav nav-pills pb-2 pt-2" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
                <a class="nav-link active" id="pills-properties-tab" data-toggle="tab" href="#pills-properties" role="tab" aria-controls="properties" aria-selected="true">Properties</a>
            </li>
            <li class="nav-item" role="presentation">
                <a class="nav-link disabled" id="pills-object-tab" data-toggle="tab" href="#pills-object-container" role="tab" aria-controls="object" aria-selected="false">Object/Activity</a>
            </li>
        </ul>

        <div class="tab-content p-1" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
                <!-- PROPERTIES SECTION -->

                <div class="input-group input-group-sm mb-1 d-none zoom-functionality">
                    <input type="number" class="form-control zoom-display" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="100">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary p-0 border-0 dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="input-group-text border_style" id="inputGroup-sizing-sm">
                                <img src="<?php echo base_url('assets/icons/zoom-in.svg') ?>" alt="" width="18">
                            </span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#" data-zoom="50">50%</a>
                            <a class="dropdown-item" href="#" data-zoom="75">75%</a>
                            <a class="dropdown-item" href="#" data-zoom="100">100%</a>
                            <a class="dropdown-item" href="#" data-zoom="200">200%</a>
                        </div>
                    </div>

                    <!-- <ul class="navbar-nav mr-2">
                        <li class="nav-item">
                            <a class="nav-link object-align-center" href="#" id="abc" name="align-center" title="Align to center">
                                <img src="<?php echo base_url('assets/icons/chevron.svg') ?>" alt="" width="20">
                            </a>
                        </li>
                    </ul> -->

                    <ul class="navbar-nav mr-2">
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="print" name="print" title="Print">
                                <img src="<?php echo base_url('assets/icons/print.svg') ?>" alt="" width="20">
                            </a>
                        </li>
                        <li class="nav-item savebtn">
                            <a class="nav-link" href="#" id="save" name="save" title="Save">
                                <img src="<?php echo base_url('assets/images/save.svg') ?>" alt="" width="20">
                            </a>
                        </li>
                        <li class="nav-item" onclick="javascript:toggleFullScreen()">
                            <a class="nav-link" href="#" id="fullScreen" name="fullScreen" title="Full Screen">
                                <img src="<?php echo base_url('assets/images/full-screen.svg') ?>" alt="" width="20">
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- ACTION ATTRIBUTE -->
                <div class="actionbox container p-2 border mb-1"></div>

                <!-- ADDITIONAL ATTRIBUTES -->
                <!-- <div class="additional container p-2 border mb-3">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 p-1 border d-flex flex-column justify-content-center align-items-center object-align-center">
                                <img src="<?php echo base_url('assets/icons/chevron.svg') ?>" alt="" width="20">
                                <div class="name text-xs">align-center</div>
                            </div>
                            <div class="col-md-6 p-1 border d-flex flex-column justify-content-center align-items-center object-color-toggle" data-color-state="colorless">
                                <img src="<?php echo base_url('assets/icons/colorless.svg') ?>" alt="" width="20">
                                <div class="name text-xs">color toggle</div>
                            </div>
                        </div>
                    </div>
                </div> -->

                <!-- OPACITY ATTRIBUTE -->
                <div class="properties-section opacity structure p-2  border d-none mb-2">
                    
                    <div class="col-md-12 row">
                    <h5 class="text-uppercase col-sm-4 pl-0 pr-1 mb-0 text-sm overflow-elipsis properties-title object">opacity</h5>
                        <div class="slide-container col-sm-8 pl-1 d-flex justify-content-between align-items-center">
                            <input type="range" min="0.1" max="1" step="0.1" value="1" class="slider" id="myRange">
                            <span class="range-value">1</span>
                        </div>
                    </div>
                    <div class="additional container">
                        <div class="col-md-12">
                            <div class="row">
                            <div class="col-md-4 p-1 border d-flex flex-column justify-content-center align-items-center object-fixed-toggle">
                                    <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                                    <div class="name text-xs">Float</div>
                                </div>
                                <div class="col-md-4 p-1 border d-flex flex-column d-none justify-content-center align-items-center object-delete-toggle">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <div class="name text-xs">Delete</div>
                                </div> 
                                <div class="col-md-4 d-none p-1 border flex-column justify-content-center align-items-center object-align-center">
                                    <img src="<?php echo base_url('assets/icons/chevron.svg') ?>" alt="" width="20">
                                    <div class="name text-xs text-center">align-center</div>
                                </div>
                                <!-- <div class="col-md-4 p-1 border d-flex flex-column d-none justify-content-center align-items-center object-color-toggle" data-color-state="colorless">
                                <img src="<?php echo base_url('assets/icons/colorless.svg') ?>" alt="" width="20">
                                <div class="name text-xs">color toggle</div>
                            </div> -->
                                                              
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DESCRIPTION ATTRIBUTE -->
                <div class="mt-1 pb-3 properties-section decs">
                    <h5 class="text-uppercase text-sm overflow-elipsis properties-title">Description</h5>
                    <div class="container p-2 border property description text-sm overflow-scroll"></div>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-object-container" role="tabpanel" aria-labelledby="pills-object-tab">
                <!-- OBJECT AND ACTIVITY SECTION -->
                <ul class="nav nav-pills pb-2 pt-2" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="pills-object-tab1" data-toggle="tab" href="#pills-object" role="tab" aria-controls="object" aria-selected="true">Object</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-activity-tab" data-toggle="tab" href="#pills-activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
                    </li>
                </ul>

                <div class="tab-content" id="pills-TabContent">
                    <div class="tab-pane fade show active" id="pills-object" role="tabpanel" aria-labelledby="pills-object-tab1">
                        <!-- OBJECT SECTION -->

                        <!-- <input class="form-control form-control-sm text-sm mb-3" type="text" placeholder="Search..."> -->
                        <div class="col-md-12 border p-1">
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'single.svg' ?>" alt="" width="20">
                                    Almirah & Cabinets</div>
                                <div class="row collapse" id="collapse1">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'ALMIRAH & CABINETS');
                                    });
                                    for ($i = 0; $i < count($arr); $i++) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $arr[$i]['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $arr[$i]['imagePath'] ?>" type="object" title="<?php echo $arr[$i]['type'] ?>">
                                            <img src="<?php echo base_url('assets/objects/') . $arr[$i]['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'shower.svg' ?>" alt="" width="20">
                                    Bathroom Accessories</div>
                                <div class="row collapse" id="collapse2">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'BATHROOM ACCESSORIES');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'acquarium.svg' ?>" alt="" width="20">
                                    Decorative Items</div>
                                <div class="row collapse" id="collapse3">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'DECORATIVE ITEMS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'transformer.svg' ?>" alt="" width="20">
                                    Electrical Items</div>
                                <div class="row collapse" id="collapse4">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'ELECTRICAL ITEMS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'speaker.svg' ?>" alt="" width="20">
                                    Electronic Item</div>
                                <div class="row collapse" id="collapse5">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'ELECTRONIC ITEM');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'floor.svg' ?>" alt="" width="20">
                                    Entertainment</div>
                                <div class="row collapse" id="collapse6">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'ENTERTAINMENT');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/') . $value['imagePath'] ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Furniture</div>
                                <div class="row collapse" id="collapse7">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'FURNITURE');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse8" aria-expanded="false" aria-controls="collapse8">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Furniture Garden</div>
                                <div class="row collapse" id="collapse8">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'FURNITURE (GARDEN)');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse9" aria-expanded="false" aria-controls="collapse9">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Kitchen Accesories</div>
                                <div class="row collapse" id="collapse9">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'KITCHEN ACCESSORIES');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse10" aria-expanded="false" aria-controls="collapse10">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Machinery</div>
                                <div class="row collapse" id="collapse10">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'MACHINERY');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse11" aria-expanded="false" aria-controls="collapse11">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Medical</div>
                                <div class="row collapse" id="collapse11">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'MEDICAL');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse12" aria-expanded="false" aria-controls="collapse12">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Miscellaneous</div>
                                <div class="row collapse" id="collapse12">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'MISCELLANEOUS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse13" aria-expanded="false" aria-controls="collapse13">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Office Accessories</div>
                                <div class="row collapse" id="collapse13">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'OFFICE ACCESSORIES');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse14" aria-expanded="false" aria-controls="collapse14">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Plant Kingdom</div>
                                <div class="row collapse" id="collapse14">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'PLANT KINGDOM');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse15" aria-expanded="false" aria-controls="collapse15">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Pooja Items</div>
                                <div class="row collapse" id="collapse15">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'POOJA ITEMS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse16" aria-expanded="false" aria-controls="collapse16">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Teaching Aids</div>
                                <div class="row collapse" id="collapse16">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'TEACHHING AIDS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse17" aria-expanded="false" aria-controls="collapse17">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Vehicle</div>
                                <div class="row collapse" id="collapse17">
                                    <?php
                                    $arr = array_filter($objects, function ($ar) {
                                        return ($ar['accessories'] == 'VEHICLE');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="object">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="tab-pane fade" id="pills-activity" role="tabpanel" aria-labelledby="pills-activity-tab">
                        <!-- ACTIVITY SECTION -->

                        <input class="form-control form-control-sm text-sm mb-3" type="text" placeholder="Search...">
                        <div class="col-md-12 border p-1">
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse18" aria-expanded="false" aria-controls="collapse18">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Bedroom</div>
                                <div class="row collapse" id="collapse18">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'BEDROOM');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse19" aria-expanded="false" aria-controls="collapse19">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Educational</div>
                                <div class="row collapse" id="collapse19">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'EDUCATIONAL');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse20" aria-expanded="false" aria-controls="collapse20">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Kitchen</div>
                                <div class="row collapse" id="collapse20">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'KITCHEN');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse21" aria-expanded="false" aria-controls="collapse21">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Machine Room</div>
                                <div class="row collapse" id="collapse21">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'MACHINE ROOM');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse22" aria-expanded="false" aria-controls="collapse22">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Medical</div>
                                <div class="row collapse" id="collapse22">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'MEDICAL');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse23" aria-expanded="false" aria-controls="collapse23">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Miscellaneous</div>
                                <div class="row collapse" id="collapse23">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'MISCELLANEOUS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse24" aria-expanded="false" aria-controls="collapse24">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Office Rooms</div>
                                <div class="row collapse" id="collapse24">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'OFFICE ROOMS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse25" aria-expanded="false" aria-controls="collapse25">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Other Rooms</div>
                                <div class="row collapse" id="collapse25">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'OTHER ROOMS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse26" aria-expanded="false" aria-controls="collapse26">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Recreation</div>
                                <div class="row collapse" id="collapse26">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'RECREATION');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse27" aria-expanded="false" aria-controls="collapse27">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Relegious</div>
                                <div class="row collapse" id="collapse27">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'RELEGIOUS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse28" aria-expanded="false" aria-controls="collapse28">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">
                                    Stores</div>
                                <div class="row collapse" id="collapse28">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'STORES');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2 border-bot">
                                <div class="heading text-capitalize text-sm font-weight-bold" data-toggle="collapse" data-target="#collapse29" aria-expanded="false" aria-controls="collapse29">
                                    <img class="img_pos" src="<?php echo base_url('assets/objects/') . 'sofa_icon.svg' ?>" alt="" width="20">

                                    Tanks</div>
                                <div class="row collapse" id="collapse29">
                                    <?php
                                    $arr = array_filter($activities, function ($ar) {
                                        return ($ar['accessories'] == 'TANKS');
                                    });
                                    foreach ($arr as $key => $value) {
                                    ?>
                                        <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="<?php echo $value['type'] ?>" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="<?php echo $value['type'] ?>" type="activity">
                                            <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                        </div>
                                    <?php } ?>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>


        <div class="mt-3 properties-section fill d-none">
            <h5 class="text-uppercase text-sm overflow-elipsis properties-title"> Fill</h5>
            <div class="row border-bottom no-gutters">
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#E1F5FE" style="background-color: #E1F5FE;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#29B6F6" style="background-color: #29B6F6;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#FFCDD2" style="background-color: #FFCDD2;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete active" data-color="#EF5350" style="background-color: #EF5350;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#E1BEE7" style="background-color: #E1BEE7;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#AB47BC" style="background-color: #AB47BC;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#C8E6C9" style="background-color: #C8E6C9;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#66BB6A" style="background-color: #66BB6A;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#FFF9C4" style="background-color: #FFF9C4;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#FFEE58" style="background-color: #FFEE58;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#FFCCBC" style="background-color: #FFCCBC;"></div>
                </div>
                <div class="col-md-1 ml-2 mr-2 mb-3">
                    <div class="color-pallete" data-color="#FF7043" style="background-color: #FF7043;"></div>
                </div>
            </div>
        </div>
        <div class="mt-3 properties-section stroke d-none">
            <h5 class="text-uppercase text-sm overflow-elipsis properties-title">Stroke</h5>
            <div class="row border-bottom no-gutters">
                <div class="col-md-4 ml-2 mr-2">
                    <div class=" input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm"><img src="<?php echo base_url('assets/icons/stroke.svg') ?>" alt="angle" width="10"></span>
                        </div>
                        <input type="text" class="form-control text-center text-sm stroke-width" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="1">
                    </div>
                </div>
                <div class="col-md-6 ml-2 mr-2">
                    <div class=" input-group input-group-sm mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-sm">
                                <div class="color-box rounded-circle border"></div>
                            </span>
                        </div>
                        <input type="text" class="form-control text-center text-sm stroke-color" aria-label="Small" aria-describedby="inputGroup-sizing-sm" value="6495ED">
                    </div>
                </div>
            </div>
        </div>


    </section>


    <!-- 
    //////////////////////////////// --- A P P  M O D A L ---  ////////////////////////////////
    -->

    <div class="modal fade bd-example-modal-lg" id="appModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                </div>
            </div>
        </div>
    </div>

    <!-- 
    //////////////////////////////// --- REPORT  M O D A L ---  ////////////////////////////////
    -->

    <div class="modal fade bd-example-modal-lg" id="reportModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title" id="exampleModalLongTitle"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                </div>
            </div>
        </div>
    </div>

    <!-- 
    //////////////////////////////// --- A P P  A L E R T ---  ////////////////////////////////
    -->

    <div class="alert alert-dismissible pt-1 pb-1 pl-2 pr-2 fade" role="alert" id="appAlert">
        <strong class="text-capitalize text-bold"></strong> <span class="text-normal"></span>
        <button type="button" class="close p-0 pr-2" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <!-- 
    //////////////////////////////// --- A P P  T O A S T ---  ////////////////////////////////
    -->

    <div class="modal" tabindex="-1" role="dialog" id="appToast">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p></p>
                </div>
                <div class="modal-footer p-1 pl-3 pr-3">
                    <button type="button" class="btn btn-outline-warning btn-sm" data-dismiss="modal"></button>
                </div>
            </div>
        </div>
    </div>

</body>


<!-- SWEET ALERT JS -->
<script src="<?php echo base_url('js/helper/sweetalert.js') ?>"></script>

<script>
    $(document).ready(function() {
        $('.client-form').removeClass('d-none');
        let behaviour = '<?php echo isset($behavior) ? $behavior : "import" ?>'
        if (behaviour == 'create') {
            $('[data-behavior="create"]').trigger('click')
        }
    })
    $('#newProject').on('click', function() {

        localStorage.removeItem("houseMaps");
        window.location.href = BASE_URL + 'Main/importMap';


    })

    function removeHouseMap() {
        localStorage.removeItem('houseMaps');
        localStorage.removeItem('selectedMapId');
    }
</script>

</html>