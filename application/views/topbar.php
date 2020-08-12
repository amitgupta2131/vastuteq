<section class="header" style="position:unset">
    <div class="title-bar" style="justify-content:left;">
        <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/images/logo.jpg') ?>" alt="logo" width="50">

        <!-- Tool Menus -->
        <?php $method = $this->router->fetch_method();
        if ($method == 'draw') {
        ?>
            <nav class="navbar navbar-expand-lg navbar-light  p-0 pl-2" style="z-index:100;">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">

                        <li class="nav-item dropdown active d-none">
                            <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                File
                            </a>
                            <div class="dropdown-menu active" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" data-behavior="create" data-menu-item="create-map" id="open-btn">Create Map</a>
                                <a class="dropdown-item" href="#" data-behavior="import" data-menu-item="import-map">Import Map</a>
                                <!-- <input class="import-map-file d-none" type="file"> -->
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
                            <a class="nav-link dropdown-toggle text-white menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Options
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" data-menu-item="set-measurement">Set measurement</a>
                                <a class="dropdown-item" href="#" data-menu-item="get-measurement">Get measurement</a>
                            </div>
                        </li>
                        <li class="nav-item dropdown d-none tools-section">
                            <a class="nav-link dropdown-toggle text-white menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Tools
                            </a>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="toolMenu">
                            <a class="dropdown-item" href="#" id="vpm">Vpm</a>
                            <a class="dropdown-item" href="#" id="mvpc">Mvpc</a>
                                <a class="dropdown-item d-none" href="#" data-menu-item="get-marma">Marma</a>
                                <a class="dropdown-item d-none" href="#" data-menu-item="get-shanmahanti">Shanmahanti</a>
                            </div>
                        </li>

                    </ul>

                    <!-- <ul class="navbar-nav mr-2">
                        <li class="nav-item">
                            <a class="nav-link object-align-center" href="#" id="abc" name="align-center">
                                <img src="http://localhost/vastuteq5/assets/icons/chevron.svg" alt="" width="20">
                            </a>
                        </li>
                    </ul>

                    <ul class="navbar-nav mr-2">
                        <li class="nav-item">
                            <a class="nav-link" href="#" id="print" name="print">
                                <img src="http://localhost/vastuteq5/assets/icons/print.svg" alt="" width="20">
                            </a>
                        </li>
                    </ul> -->

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
        <?php } ?>
        <!-- M E N U  I T E M S -->
        <div class="menu-sidebar">
            <ul class="nav menu" style="float:right">
                <!-- <li class="nav-item">
                        <a id="createMap" href="#">Create Map</a>
                    </li>
                    <li class="nav-item">
                        <a id="importMap" href="#" data-behavior="import" >Import Map</a>
                    </li> -->


                <li class="nav-item">
                    <a href="#" id="newProject"><i class="fas fa-plus"></i>&nbsp;&nbsp;New Project</a>
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