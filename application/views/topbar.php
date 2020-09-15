<section class="header" style="position:fixed;z-index:10">
    <div class="title-bar" style="justify-content:left;">
        <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/images/logo.jpg') ?>" alt="logo" width="30">
        

        <!-- Tool Menus -->
        <?php $method = $this->router->fetch_method();
        $user = $this->MainModel->selectAllFromWhere("login", array("userId" => $_SESSION['userInfo']['userId']));
        $userImg = $user[0]['userImg'];
        if ($method == 'draw') {
        ?>
            <nav class="navbar navbar-expand-lg navbar-light  p-0 pl-2" style="z-index:100;">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item dropdown mousePos d-none">
                            <span class="mouse-position-x"></span>
                            <span class="mouse-position-y"></span>
                        </li>
                        <li class="nav-item dropdown active d-none">
                            <a class="nav-link dropdown-toggle menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                File
                            </a>
                            <div class="dropdown-menu active" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="#" data-behavior="create" data-menu-item="create-map" id="open-btn">Create Map</a>
                                <!-- <a class="dropdown-item" href="#" data-behavior="import" data-menu-item="import-map">Import Map</a> -->
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


                <li class="nav-item dropdown">
                    <a class="nav-link text-white menu-item p-0" href="#" id="fileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        File
                    </a>
                    <div class="dropdown-menu" aria-labelledby="fileDropdown">
                        <a class="dropdown-item" href="#" id="newProject"><!--<i class="fas fa-plus"></i>&nbsp;&nbsp; -->New Project</a>
                        <a class="dropdown-item savebtn d-none" href="#" >Save</a>
                        <a class="dropdown-item" href="<?php echo base_url('Main/logout') ?>">Exit</a>
                        <a class="dropdown-item" href="<?php echo base_url('Main/createMap') ?>">Create Map</a>
                        <a class="dropdown-item" onclick="javascript:toggleFullScreen()" href="#">Full Screen</a>
                        
                    </div>

                </li>
                <li class="nav-item dropdown d-none measurement-section">
                    <a class="nav-link text-white menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Options
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" data-menu-item="set-measurement">Set measurement</a>
                        <a class="dropdown-item" href="#" data-menu-item="get-measurement">Get measurement</a>
                    </div>
                </li>
                <li class="nav-item dropdown d-none tools-section">
                    <a class="nav-link text-white menu-item" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Tools
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown" id="toolMenu">
                        <!-- <a class="dropdown-item" href="#" id="vpm">Vpm</a>
                        <a class="dropdown-item" href="#" id="mvpc">Shakti Chakra</a>
                        <a class="dropdown-item" href="#" id="mvc">Maha Vastu Chakra</a> -->
                        <a class="dropdown-item d-none" href="#" data-menu-item="get-marma">Marma</a>
                        <a class="dropdown-item d-none" href="#" data-menu-item="get-shanmahanti">Shanmahanti</a>
                    </div>
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
                <li class="nav-item d-none dropdown getReport">
                    <a class="nav-link text-white menu-item" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reports</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" id="objColor">Set Object Colour</a>
                        <a class="dropdown-item" href="#" id="inlineRadio1">Object/Activity wise report</a>
                        <a class="dropdown-item" href="#" id="inlineRadio2">Zone wise object</a>
                    </div>
                </li>
                <li class="nav-item">
                    <img class="profile thumbnail rounded-circle" src="<?php echo $userImg != '' ? base_url('uploads/') . $userImg : base_url('assets/images/thumbnail.png') ?>" alt="user" width="20" id="profileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileButton">
                        <a class="dropdown-item modal__trigger" href="#" data-toggle="modal" data-target="#settingModal"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
                        <a class="dropdown-item" href="<?php echo base_url('Main/logout') ?>"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log Out</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</section>

<!-- 
    //////////////////////////////// --- Setting  M O D A L ---  ////////////////////////////////
    -->

<div class="modal fade bd-example-modal-lg" id="settingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="max-width:765px">
        <div class="modal-content" style="min-height:460px">
            <div class="modal-header p-1 pl-3 pr-3">
                <h5 class="modal-title" id="settingTitle">Settings</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form style="margin:0px" action="<?php echo base_url('Main/updateUser') ?>" method='post' enctype="multipart/form-data">
                    <?php $user = $this->MainModel->selectAllFromWhere("login", array("userId" => $_SESSION['userInfo']['userId']))[0]; ?>
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label for="name">Name</label>
                            <input type="text" hidden class="form-control" name='id' value="<?php echo $user['userId'] ?>">
                            <input type="text" hidden class="form-control" name='method' value="<?php echo current_url() ?>">
                            <input type="text" class="form-control" name="name" value="<?php echo $user['name'] ?>">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="phone">Phone No.</label>
                            <input type="number" class="form-control" name="phone" value="<?php echo $user['mobileNo'] ?>">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="exampleFormControlInput1">Email address</label>
                            <input type="email" class="form-control" name="email" placeholder="name@example.com" readonly value="<?php echo $user['email'] ?>">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" name="password" value="<?php echo $user['password'] ?>">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="address">Address</label>
                            <textarea class="form-control" name="address" value="<?php echo $user['address'] ?>"><?php echo $user['address'] ?></textarea>
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="image">User Image</label>
                            <div class="row">
                                <img class="col-sm-4" src="<?php echo $userImg != '' ? base_url('uploads/') . $userImg : '' ?>" height="50" width="50">
                                <input class="col-sm-8" type="file" class="form-control" name="usrImage">
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary" style="float:right;">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Message pop up -->
<?php if (!empty($this->session->flashdata('error'))) { ?>
    <script>
        let error = '<?php echo $this->session->flashdata('error'); ?>';
        showAlert(error, 'danger');
    </script>
<?php } ?>
<?php if (!empty($this->session->flashdata('success'))) { ?>
    <script>
        let error = '<?php echo $this->session->flashdata('success'); ?>';
        showAlert(error, 'success');
        
    </script>
<?php } ?>

<script>
    d3.select('#newProject').on('click', function() {
        window.location.href = base_url + 'Main/importMap';
    });

    function toggleFullScreen() {
        var a = $(window).height() - 10;

        if (!document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }
</script>