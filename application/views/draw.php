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

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-0 pr-2 pl-2">
        <a class="navbar-brand m-auto" href="#">VastuTeq</a>
    </nav>

    <nav class="navbar navbar-expand-lg navbar-light bg-light p-0 pl-2 border">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">

                <li class="nav-item dropdown active">
                    <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        File
                    </a>
                    <div class="dropdown-menu active" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" data-behavior="create" data-menu-item="create-map" id="open-btn">Create Map</a>
                        <a class="dropdown-item" href="#" data-behavior="import" data-menu-item="import-map">Import Map</a>
                        <input class="import-map-file d-none" type="file">
                        <div class="dropdown-divider d-none"></div>
                        <a class="dropdown-item d-none" href="#" data-menu-item="add-image">Add Image</a>
                        <div class="dropdown-divider d-none"></div>
                        <a class="dropdown-item d-none" href="#" data-menu-item="save">Save As</a>
                        <a class="dropdown-item d-none" href="#" data-menu-item="exit">Exit</a>
                    </div>
                </li>

                <li class="nav-item dropdown d-none">
                    <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Edit
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#">Undo</a>
                        <a class="dropdown-item" href="#">Redo</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Clear</a>
                    </div>
                </li>

                <li class="nav-item dropdown d-none measurement-section">
                    <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" data-menu-item="set-measurement">Set measurement</a>
                        <a class="dropdown-item" href="#" data-menu-item="get-measurement">Get measurement</a>
                    </div>
                </li>
                <li class="nav-item dropdown tools-section">
                    <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tools
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" data-menu-item="get-marma">Marma</a>
                        <a class="dropdown-item" href="#" data-menu-item="get-shanmahanti">Shanmahanti</a>
                    </div>
                </li>
                
            </ul>

            <ul class="navbar-nav mr-auto drawing-tools d-none">
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img class="drawing-tool" src="<?php echo base_url('assets/icons/select.svg') ?>" alt="tool"></a>
                </li>
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img class="drawing-tool" src="<?php echo base_url('assets/icons/text.svg') ?>" alt="tool"></a>
                </li>
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img class="drawing-tool" src="<?php echo base_url('assets/icons/pen.svg') ?>" alt="tool"></a>
                </li>
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="rectangle"><img class="drawing-tool" src="<?php echo base_url('assets/icons/rectangle.svg') ?>" alt="tool"></a>
                </li>
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="line"><img class="drawing-tool" src="<?php echo base_url('assets/icons/line.svg') ?>" alt="tool" title="line"></a>
                </li>
                <li class="nav-item dropdown ml-2 mr-2">
                    <a class="nav-link tool menu-item" href="#" role="button" data-tool="polygon"><img class="drawing-tool" src="<?php echo base_url('assets/icons/polygon.svg') ?>" alt="tool"></a>
                </li>
            </ul>
        </div>
    </nav>


    <!-- <section class="header">
        <section class="header" style="position:unset">
            <div class="title-bar" style="justify-content:left;">
                <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/logo/logo2.svg') ?>" alt="logo" width="130">
                M E N U  I T E M S
                <div class="menu-sidebar">
                    <ul class="nav menu" style="float:right">
                        <li class="nav-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="<?php echo base_url('Main') ?>" data-menu-item="dashboard">Dashboard</a>
                        </li>
                        <li class="nav-item">
                            <a href="<?php echo base_url('Main/ayadhi') ?>" data-menu-item="aayadi-calculator">Ayadi Calculator</a>
                        </li>
                        <li class="nav-item">
                            <a href="<?php echo base_url('Main/devtas') ?>" data-menu-item="devtas">Devtas</a>
                        </li>
                        <li class="nav-item">
                            <a href="<?php echo base_url('Main/propertyInfo') ?>" onclick="removeHouseMap()" data-menu-item="new-project"><i class="fas fa-plus"></i>&nbsp;&nbsp;New Project</a>
                        </li>
                        <li class="nav-item">
                            <img class="profile thumbnail rounded-circle" src="<?php echo base_url('assets/images/thumbnail.png') ?>" alt="user" width="20" id="profileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileButton">
                                <a class="dropdown-item modal__trigger" href="#" data-modal="#modal3"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
                                <a class="dropdown-item" href="<?php echo base_url('Main/logout') ?>"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Sign Out</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="dynamicBar">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Drafts</li>
                </ol>
            </nav>
            <div class="dynamicbar-right">
                <a href="<?php echo base_url('Main/propertyInfo') ?>" class="btn btn-sm btn-outline rounded-0"><i class="fas fa-plus"></i>&nbsp;&nbsp;New Project</a>
                <img class="profile thumbnail rounded-circle" src="<?php echo base_url('assets/images/thumbnail.png') ?>" alt="user" width="20" id="profileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileButton">
                    <a class="dropdown-item modal__trigger" href="#" data-modal="#modal3"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
                    <a class="dropdown-item" href="<?php echo base_url('Main/logout') ?>"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Sign Out</a>
                </div>
            </div>
        </div>
        </section>
        <nav class="navbar navbar-expand-lg navbar-light border">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                  <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link  text-dark dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            File
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#" data-behavior="create" id="open-btn">Create Map</a>
                            <a class="dropdown-item" href="#" data-behavior="import" >Import Map</a>
                            <input class="import-map-file" type="file" style="display:none">
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" data-menu-item="add image">Add Image</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#" data-menu-item="save">Save</a>
                            <a class="dropdown-item object" href="#" data-menu-item="vpm">VPM</a>
                            <a class="dropdown-item object" href="#" data-menu-item="mvpc">MVPC</a> 
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-dark menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Edit
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Undo</a>
                            <a class="dropdown-item" href="#">Redo</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="#">Clear</a>
                        </div>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link text-dark dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Options
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#" data-menu-item="measuring-tape">Set measurement</a>
                            <a class="dropdown-item" href="#" data-menu-item="get-measurement">Get measurement</a>
                        </div>
                    </li>
                </ul>

                <ul class="navbar-nav mr-auto drawing-tools d-none">
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img src="<?php echo base_url('assets/icons/select.svg') ?>" alt="tool" width="20"></a>
                    </li>
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img src="<?php echo base_url('assets/icons/text.svg') ?>" alt="tool" width="20"></a>
                    </li>
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="select"><img src="<?php echo base_url('assets/icons/pen.svg') ?>" alt="tool" width="20"></a>
                    </li>
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="rectangle"><img src="<?php echo base_url('assets/icons/rectangle.svg') ?>" alt="tool" width="20"></a>
                    </li>
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="line"><img src="<?php echo base_url('assets/icons/line.svg') ?>" alt="tool" width="20" title="line"></a>
                    </li>
                    <li class="nav-item dropdown ml-2 mr-2">
                        <a class="nav-link tool menu-item" href="#" role="button" data-tool="polygon"><img src="<?php echo base_url('assets/icons/polygon.svg') ?>" alt="tool" width="20"></a>
                    </li>
                </ul>

                <ul class="navbar-nav mr-2 print-wrapper d-none">
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="print" name="print">
                            <img src="<?php echo base_url('assets/icons/print.svg') ?>" alt="" width="20">
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav mr-1 zoom-state-wrapper d-none">
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="zoom-state" data-zoom-state="disable" name="zoom-state">
                            <img src="<?php echo base_url('assets/icons/zoom-disable.svg') ?>" alt="" width="20">
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li class="nav-item dropdown zoom-wrapper d-none">
                        <div class="container mr-1">
                            <input type="number" class="form-control form-control-sm zoom-display" value="100">
                            <a href="#" class="dropdown-toggle zoom-options" id="navbarDropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"></a>
                            <span class="percent-icon">%</span>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" data-zoom="35">35 %</a>
                                <a class="dropdown-item" href="#" data-zoom="50">50 %</a>
                                <a class="dropdown-item" href="#" data-zoom="100">100 %</a>
                                <a class="dropdown-item" href="#" data-zoom="200">200 %</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item" href="#" data-zoom="fit">Fit to screen</a>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        </nav>
    </section> -->

    <!-- 
    //////////////////////////////// --- D R A W  A R E A ---  ////////////////////////////////
    -->
    <section id="drawArea" class="d-flex flex-column justify-content-center align-items-center">
        <p><span class="text-primary" data-behavior="import">Import Map</span></p>
        <p><span class="text-primary" data-behavior="create">Create Map</span></p>
    </section>


    <!-- PAINT TOOLBOX LEFT START -->

    <div class="toolbox left d-none">
        <div class="group commands">
            <div class="item" data-command="undo" title="Undo">
                <img src="<?php echo base_url('assets/paint/undo-icon.png') ?>" />
            </div>
            <div class="item" data-command="download" title="Download">
                <img src="<?php echo base_url('assets/paint/download-icon.png') ?>" />
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
            <div class="item" data-line-width="2" title="2 Pixels">
                <div class="stroke" style="width:2px;height: 2px;"></div>
            </div>
            <div class="item" data-line-width="3" title="3 Pixels">
                <div class="stroke" style="width:3px;height: 3px;"></div>
            </div>
            <div class="item" data-line-width="4" title="4 Pixels">
                <div class="stroke" style="width:4px;height: 4px;"></div>
            </div>
            <div class="item" data-line-width="5" title="5 Pixels">
                <div class="stroke" style="width:5px;height: 5px;"></div>
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
                <a class="nav-link disabled" id="pills-object-tab" data-toggle="tab" href="#pills-object" role="tab" aria-controls="object" aria-selected="false">Object/Activity</a>
            </li>
        </ul>

        <div class="tab-content p-1" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-properties" role="tabpanel" aria-labelledby="pills-properties-tab">
                <!-- PROPERTIES SECTION -->

                <div class="input-group input-group-sm mb-3 d-none zoom-functionality">
                    <div class="input-group-prepend bg-white">
                        <span class="input-group-text" id="inputGroup-sizing-sm">
                            <img src="<?php echo base_url('assets/icons/zoom-in.svg') ?>" alt="" width="18">
                        </span>
                    </div>
                    <input type="number" class="form-control zoom-display" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" value="100">
                    <div class="input-group-append">
                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                        <a class="dropdown-item" href="#" data-zoom="50">50%</a>
                        <a class="dropdown-item" href="#" data-zoom="75">75%</a>
                        <a class="dropdown-item" href="#" data-zoom="100">100%</a>
                        <a class="dropdown-item" href="#" data-zoom="200">200%</a>
                        </div>
                    </div>
                </div>

                <!-- ACTION ATTRIBUTE -->
                <div class="actionbox container p-2 border mb-3"></div>

                <!-- ADDITIONAL ATTRIBUTES -->
                <div class="additional container p-2 border mb-3 d-none">
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
                </div>

                <!-- OPACITY ATTRIBUTE -->
                <div class="properties-section opacity structure p-2  border d-none mb-2">
                    <h5 class="text-uppercase text-sm overflow-elipsis properties-title object">opacity</h5>
                    <div class="col-md-12 ml-2 mr-2">
                        <div class="slide-container d-flex justify-content-between align-items-center">
                            <input type="range" min="0.1" max="1" step="0.1" value="1" class="slider" id="myRange">
                            <span class="range-value">1</span>
                        </div>
                    </div>
                </div>

                <!-- DESCRIPTION ATTRIBUTE -->
                <div class="mt-3 pb-3 properties-section decs">
                    <h5 class="text-uppercase text-sm overflow-elipsis properties-title">Description</h5>
                    <div class="container p-2 border property description text-sm overflow-scroll"></div>
                </div>

            </div>
            <div class="tab-pane fade" id="pills-object" role="tabpanel" aria-labelledby="pills-object-tab">
                <!-- OBJECT AND ACTIVITY SECTION -->
                <ul class="nav nav-pills pb-2 pt-2" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="pills-object-tab" data-toggle="tab" href="#pills-object" role="tab" aria-controls="object" aria-selected="true">Object</a>
                    </li>
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-activity-tab" data-toggle="tab" href="#pills-activity" role="tab" aria-controls="activity" aria-selected="false">Activity</a>
                    </li>
                </ul>

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-object" role="tabpanel" aria-labelledby="pills-object-tab">
                        <!-- OBJECT SECTION -->

                        <input class="form-control form-control-sm text-sm mb-3" type="text" placeholder="Search...">
                        <div class="col-md-12 border p-1">
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Sofa</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Bed</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Wardrobe</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tab-pane fade" id="pills-activity" role="tabpanel" aria-labelledby="pills-activity-tab">
                        <!-- ACTIVITY SECTION -->

                        <input class="form-control form-control-sm text-sm mb-3" type="text" placeholder="Search...">
                        <div class="col-md-12 border p-1">
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Sofa</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="sofa" data-src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" title="sofa">
                                        <img src="<?php echo base_url('assets/objects/sofa_icon.svg') ?>" alt="" width="35">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Bed</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="bed" data-src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" title="bed">
                                        <img src="<?php echo base_url('assets/objects/single_bed_icon.svg') ?>" alt="" width="35">
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-2 mb-2">
                                <div class="heading text-capitalize text-sm">Wardrobe</div>
                                <div class="row">
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
                                    <div class="col-md-4 border d-flex flex-column justify-content-center align-items-center object-item cursor-pointer" data-object-item="wardrobe" data-src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" title="wardrobe">
                                        <img src="<?php echo base_url('assets/objects/wardrobe_icon.svg') ?>" alt="" width="35">
                                    </div>
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
    $("#fixed_image").click(function() {
        // alert('Hello');
        $('.refer-form-slide').toggleClass('refer-form-slide-active');
    });

    $('.objectimg').on('click', function() {
        let toggleId = $(this).attr('data-toggle');
        $('.subobj-container').removeClass('active')
        $(`${toggleId}`).addClass('active')
    });

    $('.obj-btn').on('click', function() {
        $(this).removeClass("btn-light").addClass("btn-primary");
        $(this).siblings().removeClass("btn-primary").addClass("btn-light");
        let toggleId = $(this).attr('data-toggle');
        let toggleId2 = $(this).siblings().attr('data-toggle');
        $(`${toggleId2}`).removeClass('active')
        $(`${toggleId}`).addClass('active')
        $(`${toggleId} .objcontainer .subobj-container:first`).addClass('active')

    });

    function removeHouseMap() {
        localStorage.removeItem('houseMaps');
        localStorage.removeItem('selectedMapId');
    }
</script>

</html>