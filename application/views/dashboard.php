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
    <script>
        const base_url = '<?php echo base_url() ?>'
    </script>

</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    <section class="header">
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
                    <li class="nav-item">
                        <a href="<?php echo base_url('Main/propertyInfo') ?>" ><i class="fas fa-plus"></i>&nbsp;&nbsp;New Project</a>
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
        <!-- <div id="dynamicBar">
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
        </div> -->
    </section>

    <!-- M E N U  I C O N -->





    <!-- 
    //////////////////////////////// --- D R A W  A R E A ---  ////////////////////////////////
    -->
    <section id="mainArea" class="p-4">
        <div id="mapsContainer" class="row justify-content-md-start">
            <!-- <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="card rounded border border-primary bubbly-button" data-toggle="modal" data-target="#modal">
                    <div class="card-body d-flex justify-content-center align-items-center">
                        <h5 class="text-small text-primary create-new">
                            Create New Project
                        </h5>
                    </div>
                </div>
            </div> -->

            <!-- <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="card rounded bubbly-button p-1">
                        <img class="card-img-top" src="/assets/images/swastika.svg" alt="Card image cap">
                        <div class="card-body">
                            <div class="project-name card-text">
                                Project Name
                            </div>
                            <div class="last-update card-text">
                                Last edited 19 hours ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="card rounded bubbly-button p-1">
                        <img class="card-img-top" src="/assets/images/om.svg" alt="Card image cap">
                        <div class="card-body">
                            <div class="project-name card-text">
                                Project Name
                            </div>
                            <div class="last-update card-text">
                                Last edited 19 hours ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="card rounded bubbly-button p-1">
                        <img class="card-img-top" src="/assets/images/swastika.svg" alt="Card image cap">
                        <div class="card-body">
                            <div class="project-name card-text">
                                Project Name
                            </div>
                            <div class="last-update card-text">
                                Last edited 19 hours ago
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div class="card rounded bubbly-button p-1">
                        <img class="card-img-top" src="/assets/images/om.svg" alt="Card image cap">
                        <div class="card-body">
                            <div class="project-name card-text">
                                Project Name
                            </div>
                            <div class="last-update card-text">
                                Last edited 19 hours ago
                            </div>
                        </div>
                    </div>
                </div> -->
        </div>
    </section>


    <!-- 
    //////////////////////////////// --- R I G H T  S I D E B A R ---  ////////////////////////////////
    -->
    <!-- <section class="right-sidebar"></section> -->


    <!-- 
    //////////////////////////////// --- A P P  M O D A L ---  ////////////////////////////////
    -->

    <!-- <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Client & Property
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                        <div class="form-group">
                            <label for="inputEmail4">Select Client</label>
                            <div class="form-row">
                            <select class="form-control form-control-sm col-md-6" id="clients">
                                <option value="">Selet Owner</option>
                                <option value="">Client 1</option>
                                <option value="">Client 2</option>
                                <option value="">Client 3</option>
                            </select>                            
                            <button type="button" class="btn col-md-2 btn-sm rounded-0 addClient" data-toggle="modal" data-target="#modal1">
                                Add Client
                            </button>
                            </div>
                        </div>
                        
                   

                    <!-- <form id="propertyForm"></form>
                    <div class="modal-footer p-1 pl-3 pr-3">
                        <button type="button" class="btn btn-outline-primary btn-sm rounded-0" id="addMore">
                            Add More Property
                        </button>
                        <button type="button" class="btn btn-outline-secondary btn-sm rounded-0" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm rounded-0 save-info">
                            Save Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-left: 1px;">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Client & Property
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modal1">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5 class="mb-4">Client Info</h5>
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Full Name</label>
                                <input type="text" class="form-control form-control-sm" id="cName" placeholder="Name" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Mobile No.</label>
                                <input type="number" class="form-control form-control-sm" id="mNumber" placeholder="Mobile No." />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control form-control-sm" id="cEmail" placeholder="Email" />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputAddress">Address</label>
                                <input type="text" class="form-control form-control-sm" id="cAddress" placeholder="1234 Main St" />
                            </div>
                        </div>
                    </form>
                    <div class="modal-footer p-1 pl-3 pr-3">
                        <button type="button" class="btn btn-outline-secondary btn-sm rounded-0" data-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-outline-primary btn-sm rounded-0 save-client-info">
                            Save Info
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div> -->

</body>

</html>