<section class="header" style="position:fixed;z-index:10">
    <div class="title-bar" style="justify-content:left;">
        <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/images/logo.jpg') ?>" alt="logo" width="30">
        <ul class="nav menu">
            <li class="nav-item mousePos d-none">
                <span class="mouse-position-x"></span>
                <span class="mouse-position-y"></span>
            </li>
        </ul>

        <!-- Getting image for showing in menu -->
        <?php $method = $this->router->fetch_method();
        $user = $this->MainModel->selectAllFromWhere("login", array("userId" => $_SESSION['userInfo']['userId']));
        $userImg = $user[0]['userImg']; ?>


        <!-- M E N U  I T E M S -->
        <div class="menu-sidebar">
            <ul class="nav menu" style="float:right">
                <li class="nav-item dropdown">
                    <a class="nav-link text-white menu-item p-0" href="#" id="fileDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        File
                    </a>
                    <div class="dropdown-menu" aria-labelledby="fileDropdown">
                        <a class="dropdown-item" href="#" id="newProject">New Project</a>
                        <a class="dropdown-item savebtn d-none" href="#">Save</a>
                        <a class="dropdown-item" href="#" id='createMap'>Create Map</a>
                        <a class="dropdown-item" href="#" id="editMap">Edit Map</a>
                        <a class="dropdown-item" onclick="javascript:toggleFullScreen()" href="#">Full Screen</a>
                        <a class="dropdown-item exit" href="#">Exit</a>
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
                    </div>
                </li>
                <!-- <li class="nav-item">
                    <a href="<?php echo base_url('Main') ?>">Dashboard</a>
                </li> -->
                <li class="nav-item">
                    <a href="#" id="ayadhi">Ayadi Calculator</a>
                </li>
                <li class="nav-item">
                    <a href="#" id="devtas">Devtas</a>
                </li>
                <li class="nav-item d-none dropdown getReport">
                    <a class="nav-link text-white menu-item" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Reports</a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="#" id="objColor">Set Object Colour</a>
                        <a class="dropdown-item" href="#" id="inlineRadio1">Object/Activity wise report</a>
                        <a class="dropdown-item" href="#" id="inlineRadio2">Zone wise object</a>
                        <a class="dropdown-item" href="#" id="sixteenZoneColor">Set 16 Zone color</a>
                    </div>
                </li>
                <li class="nav-item">
                    <img class="profile thumbnail rounded-circle" src="<?php echo $userImg != '' ? base_url('uploads/') . $userImg : base_url('assets/images/thumbnail.png') ?>" alt="user" width="20" id="profileButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="profileButton">
                        <a class="dropdown-item" href="#" id="setting" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
                        <div class="dropdown-menu dropdown-menu-right p-option row p-0" aria-labelledby="setting">
                            <div class="col-sm-4 p-0 b-right pt-3 pb-3">
                                <a class="dropdown-item" id="profile"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Profile</a>
                                <a class="dropdown-item row m-0" id="language"><i class="fa fa-language" aria-hidden="true"></i>&nbsp;&nbsp;Language</a>
                            </div>
                            <div class="col-sm-8 p-0">
                                <form class="m-0 profile-form" action="<?php echo base_url('Main/updateUser') ?>" method='post' enctype="multipart/form-data">
                                    <?php $user = $this->MainModel->selectAllFromWhere("login", array("userId" => $_SESSION['userInfo']['userId']))[0]; ?>

                                    <div class="row m-0 p-3 col-sm-12">
                                        <div class="md-form col-sm-12">
                                            <i class="fa fa-user prefix grey-text"></i>
                                            <input type="text" hidden class="form-control" name='id' value="<?php echo $user['userId'] ?>">
                                            <input type="text" hidden class="form-control" name='method' value="<?php echo current_url() ?>">
                                            <input type="text" class="form-control" name="name" placeholder="Full Name" value="<?php echo $user['name'] ?>">

                                        </div>

                                        <div class="md-form col-sm-12">
                                            <i class="fa fa-phone-square prefix grey-text"></i>
                                            <input type="number" class="form-control validate" name="phone" required placeholder="Phone No" value="<?php echo $user['mobileNo'] ?>">

                                        </div>
                                        <div class="md-form col-sm-12">
                                            <i class="fa fa-envelope prefix grey-text"></i>
                                            <input type="email" class="form-control validate" name="email" required placeholder="Email" readonly value="<?php echo $user['email'] ?>">

                                        </div>
                                        <div class="md-form col-sm-12">
                                            <i class="fa fa-unlock-alt prefix grey-text"></i>
                                            <input type="password" class="form-control validate" name="password" required placeholder="Password" value="<?php echo $user['password'] ?>">
                                        </div>
                                        <div class="md-form col-sm-12">
                                            <i class="fa fa fa-map-marker prefix grey-text"></i>
                                            <textarea class="form-control md-textarea validate" rows="1" name="address" required placeholder="Address" value="<?php echo $user['address'] ?>"><?php echo $user['address'] ?></textarea>
                                        </div>
                                        <div class="md-form col-sm-12">
                                            <img class="rounded-circle prefix" src="<?php echo $userImg != '' ? base_url('uploads/') . $userImg : '' ?>" alt="User Image" height="30" width="30">
                                            <input class="form-control validate" type="file"  class="form-control" name="usrImage">
                                        </div>

                                        <div class="col-sm-12">
                                            <button type="submit" class="btn btn-primary" style="float:right;">Update</button>
                                        </div>
                                    </div>


                                </form>
                                <div class="col-sm-12 row p-4 m-0 hide text-center lan-container">
                                    <div class="form-check col-sm-3 mt-r-5">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="eng" value="eng" checked>
                                        <label class="form-check-label text-sm" for="eng">
                                            ENG
                                        </label>
                                    </div>
                                    <div class="form-check col-sm-3 mt-r-5">
                                        <input class="form-check-input" type="radio" name="exampleRadios" id="hindi" value="hindi">
                                        <label class="form-check-label text-sm" for="hindi">
                                            हिं
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <a class="dropdown-item exit" href="#"><i class="fas fa-sign-out-alt"></i>&nbsp;&nbsp;Log Out</a>
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
                <h5 class="modal-title" id="settingTitle">User Profile</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body p-0">
                <form style="margin:0px" action="<?php echo base_url('Main/updateUser') ?>" method='post' enctype="multipart/form-data">
                    <?php $user = $this->MainModel->selectAllFromWhere("login", array("userId" => $_SESSION['userInfo']['userId']))[0]; ?>
                    <div class="row m-0">
                        <div class="col-sm-6 p-0" style="background:#e3e3e3;">
                            <div class="text-center bg-primary">
                                <div class="pro-style">
                                    <img class="rounded-circle" src="<?php echo $userImg != '' ? base_url('uploads/') . $userImg : '' ?>" alt="User Image" height="100" width="100">
                                    <div><?php echo $user['name'] ?></div>
                                </div>
                            </div>
                            <div class="mt-5r ml-auto mr-auto p-3">
                                <div class="row m-0"><span class="text-info col-sm-5">Phone No : </span><span class="col-sm-7"><?php echo $user['mobileNo'] ?></span></div>
                                <div class="row m-0"><span class="text-info col-sm-5">Email : </span><span class="col-sm-7"><?php echo $user['email'] ?></span></div>
                                <div class="row m-0"><span class="text-info col-sm-5">Password : </span><span class="col-sm-7"><?php echo $user['password'] ?></span></div>
                                <div class="row m-0"><span class="text-info col-sm-5">Address : </span><span class="col-sm-7"><?php echo $user['address'] ?></span></div>
                            </div>

                        </div>
                        <div class="row m-0 p-3 col-sm-6">
                            <div class="md-form col-sm-12">
                                <i class="fa fa-user prefix grey-text"></i>
                                <input type="text" hidden class="form-control" name='id' value="<?php echo $user['userId'] ?>">
                                <input type="text" hidden class="form-control" name='method' value="<?php echo current_url() ?>">
                                <input type="text" class="form-control" name="name" placeholder="Full Name">

                            </div>

                            <div class="md-form col-sm-12">
                                <i class="fa fa-phone-square prefix grey-text"></i>
                                <input type="number" class="form-control validate" name="phone" required placeholder="Phone No">

                            </div>
                            <div class="md-form col-sm-12">
                                <i class="fa fa-envelope prefix grey-text"></i>
                                <input type="email" class="form-control validate" name="email" required placeholder="Email" readonly value="<?php echo $user['email'] ?>">

                            </div>
                            <div class="md-form col-sm-12">
                                <i class="fa fa-unlock-alt prefix grey-text"></i>
                                <input type="password" class="form-control validate" name="password" required placeholder="Password">
                            </div>
                            <div class="md-form col-sm-12">
                                <i class="fa fa fa-map-marker prefix grey-text"></i>
                                <textarea class="form-control md-textarea validate" rows="1" name="address" required placeholder="Address"></textarea>
                            </div>
                            <div class="md-form col-sm-12">
                                <i class="fa fa-camera prefix grey-text"></i>
                                <input class="form-control validate" type="file" required class="form-control" name="usrImage">
                            </div>

                            <div class="col-sm-12">
                                <button type="submit" class="btn btn-primary" style="float:right;">Update</button>
                            </div>
                        </div>
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
    function toggleFullScreen() {
        var a = $(window).height() - 10;


        if (!document.fullscreenElement && // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
                increaseMapScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
                increaseMapScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                increaseMapScreen();
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

    function increaseMapScreen() {
        var totalHeight = screen.height
        $('#vastuteqCanvas').attr('height', totalHeight);
        $('.mask').attr('height', totalHeight);
        $('#myMask rect').attr('height', totalHeight);
        $('.mask g rect').attr('height', totalHeight);
        $('#paintCanvas').attr('height', totalHeight);
        $('#paintCanvasBackground').attr('height', totalHeight);
    }



    $('#newProject').on('click', function() {
        confirmSave('Main/importMap');
    });

    $('#createMap').on('click', function() {
        confirmSave('Main/createMap');
    });

    $('#editMap').on('click', function() {
        confirmSave('Main');
    });

    $('.exit').on('click', function() {
        confirmSave('Main/logout');
    });

    $('#ayadhi').on('click', function() {
        confirmSave('Main/ayadhi')
    })

    $('#devtas').on('click', function() {
        confirmSave('Main/devtas')
    })

    function confirmSave(url = '') {
        let method = '<?php echo current_url() ?>';
        let importMap = method.match(/importMap/g);
        let draw = method.match(/draw/g)
        if (importMap != null || draw != null) {

            swal("Before Redirecting, want to save Map data or Discard it ?", {
                    buttons: {
                        Save: true,
                        Discard: true,
                    },
                })
                .then((value) => {
                    switch (value) {

                        case "Save":
                            $('.savebtn').trigger('click');
                            window.location.href = BASE_URL + url;
                            break;

                        case "Discard":
                            window.location.href = BASE_URL + url;

                        default:
                            break;
                    }
                })

        } else {
            window.location.href = BASE_URL + url;
        }
    }
    // window.addEventListener('beforeunload', (event) => {
    //     // Cancel the event as stated by the standard.
    //     event.preventDefault();
    //     // Chrome requires returnValue to be set.        
    //     $('.savebtn').trigger('click');
    // });
</script>