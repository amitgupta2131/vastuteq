<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>vastuTeq</title>

    <!-- FAVICON -->
    <link rel="icon" href="<?php echo base_url('assets/icons/favicon.ico') ?>" type="image/ico">
    <!-- POPPER JS -->
    <script src="<?php echo base_url('js/helper/popper.min.js') ?>"></script>
    <!-- BOOTSTRAP CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/bootstrap.min.css') ?>">
    <!-- FONTAWESOME CSS -->
    <link rel="stylesheet" href="<?php echo base_url('assets/fontawesome/css/all.min.css') ?>">
    <!-- CUSTOM CSS -->
    <link rel="stylesheet" href="<?php echo base_url('css/main.css') ?>">
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- BOOTSTRAP JS -->
    <script src="<?php echo base_url('js/helper/bootstrap.min.js') ?>"></script>
    <!-- FONTAWESOME JS -->
    <script src="<?php echo base_url('assets/fontawesome/js/all.min.js') ?>"></script>
    <!-- Ajax library -->
    <script src="<?php echo base_url('js/MyScriptLibrary.js') ?>"></script>
    <!-- Notify library -->
    <script src="<?php echo base_url('js/bootstrap-notify.min.js') ?>"></script>
    <!-- CUSTOM JS -->
    <script src="<?php echo base_url('js/admin.js') ?>" type="module" defer></script>
    <script>
        const base_url = '<?php echo base_url() ?>'
    </script>
    

</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    <section class="header" style="position:unset">
        <div class="title-bar" style="justify-content:left;">
            <img class="logo" style="margin-left:20px" src="<?php echo base_url('assets/logo/logo2.svg') ?>" alt="logo" width="130">
            <!-- M E N U  I T E M S -->
            <div class="menu-sidebar">
                <ul class="nav menu" style="float:right">
                    <!-- <li class="nav-item">
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
                        <a href="<?php echo base_url('Main/propertyInfo') ?>"><i class="fas fa-plus"></i>&nbsp;&nbsp;New Project</a>
                    </li> -->
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

    <div class="p-4 container" style="max-width:1340px;">
        <div class="row">
            <div class="card" style="width:100%">
                <div class="card-header row m-0">
                    <h4 class="dash-h col-sm-11">Consultants</h4>
                    <a class="col-sm-1 btn btn-primary btn-xs text-white" data-toggle="modal" data-target="#modal1"> Add new</a>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table dataTable table-border">
                            <thead class="bg-light">
                                <tr class="border-0">
                                    <th class="border-0">Sr. No.</th>
                                    <th class="border-0">Name</th>
                                    <th class="border-0">Mobile No.</th>
                                    <th class="border-0">Email</th>
                                    <th class="border-0">Password</th>
                                    <th class="border-0">Address</th>
                                    <th class="border-0">Action</th>

                                </tr>
                            </thead>
                            <tbody id="csltTable">
                                <?php if (isset($users) && !empty($users)) {
                                    for ($i = 0; $i < count($users); $i++) { ?>
                                        <tr>
                                            <td><?php echo $i + 1 ?></td>
                                            <td><?php echo $users[$i]['name'] ?></td>
                                            <td><?php echo $users[$i]['mobileNo'] ?></td>
                                            <td><?php echo $users[$i]['email'] ?></td>
                                            <td><?php echo $users[$i]['password'] ?></td>
                                            <td><?php echo $users[$i]['address'] ?></td>
                                            <td><i class="fa fa-trash delete" aria-hidden="true" dId="<?php echo base64_encode($users[$i]['userId'])?>"></i> <i data-toggle="modal" data-target="#modal1" class="fas fa-edit edit" eId="<?php echo base64_encode($users[$i]['userId'])?>" aria-hidden="true"></i></td>
                                        </tr>
                                <?php }
                                } ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- 
    //////////////////////////////// --- Client & Property Form ---  ////////////////////////////////
    -->

    <!-- //Client save form modal -->
    <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-left: 1px;">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header p-1 pl-3 pr-3">
                    <h5 class="modal-title" id="exampleModalLabel">
                        Client Info
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modal1">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">

                    <form action="<?php echo base_url('Main/addUser') ?>" method="post" id="cnsltInfo">
                        <div>
                            <div class="form-row">

                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Name</label>
                                    <input type="text" class="form-control form-control-sm" id="name" name="name" placeholder="Consultant name" required />
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Mobile No.</label>
                                    <input type="number" class="form-control form-control-sm" id="mNumber" name="mNumber" placeholder="Consultant Phone Number" required />


                                </div>                                

                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" class="form-control form-control-sm" id="email" name="email" placeholder="Consultant email address" required>

                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputEmail4">Password</label>
                                    <input type="text" class="form-control form-control-sm" id="password" name="password" placeholder="Password@#$1234" required>

                                </div>
                                <div class="form-group col-md-12">
                                    <label for="inputAddress">Address</label>
                                    <textarea class="form-control form-control-sm" id="address" name="address" placeholder="Consultant Address" required /></textarea>
                                </div>
                            </div>



                        </div>

                        <div class="modal-footer p-1 pl-3 pr-3">
                            <input hidden id="method" name="method" value="save">
                            <input hidden id="id" name="id" value="">
                            <button type="button" class="btn btn-outline-secondary btn-sm rounded-0" data-dismiss="modal">
                                Close
                            </button>
                            <input type="submit" value="Save Info" class="btn btn-outline-primary btn-sm rounded-0 float-right">


                    </form>
                </div>
            </div>
        </div>
    </div>    
    </div>


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

    <!-- data table -->
    <link rel="stylesheet" href="<?php echo base_url('assets/custom/jquery.dataTables.min.css') ?>">
    <script src="<?php echo base_url('assets/custom/jquery.dataTables.min.js') ?>"></script>

    <script>
        $('.dataTable').dataTable();
    </script>
</body>

</html>