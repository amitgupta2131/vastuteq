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
                        <a class="dropdown-item modal__trigger" href="#" data-toggle="modal" data-target="#settingModal"><i class="fas fa-cog"></i>&nbsp;&nbsp;Setting</a>
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

    function increaseMapScreen(){
        var totalHeight = screen.height
        $('#vastuteqCanvas').attr('height',totalHeight);
        $('.mask').attr('height',totalHeight);
        $('#myMask rect').attr('height',totalHeight);
        $('.mask g rect').attr('height',totalHeight);
        $('#paintCanvas').attr('height',totalHeight);
        $('#paintCanvasBackground').attr('height',totalHeight);
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