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
    <!-- Ajax library -->
    <script src="<?php echo base_url('js/MyScriptLibrary.js') ?>"></script>
    <!-- Notify library -->
    <script src="<?php echo base_url('js/bootstrap-notify.min.js') ?>"></script>
    <!-- Date Picker libraries -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/css/bootstrap-datetimepicker.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js"></script>
    <script>
        const base_url = '<?php echo base_url() ?>';
        let data = ''
    </script>
</head>

<body>
    <!-- 
    //////////////////////////////// --- H E A D E R ---  ////////////////////////////////
    -->
    <!-- M E N U  I C O N -->
    <?php include 'topbar.php' ?>










    <!-- 
    //////////////////////////////// --- Client & Property Form ---  ////////////////////////////////
    -->
    <div class="container">
        <div class="row">
            <div class="card col-md-12 p-0 mt-5">
                <div class="card-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                       Client & Property Details
                    </h5>
                </div>
                <div class="card-body">
                    <form action="<?php echo base_url('Main/addProperty') ?>" method="post">
                        <div>

                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Full Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control form-control-sm" id="clientName" name="cName" placeholder="Name" required />
                                    
                                </div>
                                
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Mobile No. <span class="text-danger">*</span></label>
                                    <input type="input" class="form-control form-control-sm" id="mNumber" name="mNumber" placeholder="Mobile No." required />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Landline No.</label>
                                    <input type="number" class="form-control form-control-sm" name="lNumber" placeholder="Landline No." />
                                </div>
                                
                                <div class="col-md-6 clientContainer d-none" id="clients"></div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Email <span class="text-danger">*</span></label>
                                    <input type="email" class="form-control form-control-sm" name="cEmail" placeholder="Email" required />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputAddress">Client Address</label>
                                    <textarea class="form-control form-control-sm" name="cAddress" placeholder="1234 Main St" ></textarea>
                                </div>
                            </div>



                            <div class="form-row">
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Property Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control form-control-sm" name="pname" placeholder="property name" required />
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Category <span class="text-danger">*</span></label>
                                    <select class="form-control form-control-sm" name="category" id="category" placeholder="property category">
                                        <option value="">Select Category</option>
                                        <?php if (isset($category) && !empty($category)) {
                                            for ($i = 0; $i < count($category); $i++) { ?>
                                                <option tId="<?php echo $category[$i]['id']; ?>" value=" <?php echo $category[$i]['category']; ?>"><?php echo $category[$i]['category']; ?></option>
                                        <?php }
                                        } ?>
                                    </select>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Type <span class="text-danger">*</span></label>
                                    <select class="form-control form-control-sm" name="type" id="type" placeholder="property type">
                                        <option value="">Select Type</option>

                                    </select>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <label for="inputAddress">Property Address <span class="text-danger">*</span></label>
                                    <textarea class="form-control form-control-sm" name="address" row='6' placeholder="property address" ></textarea>
                                </div>
                            </div>



                            <div class="form-row">
                                <div class="form-group col-md-4">

                                    <label for="inputEmail4">Grah Pravesh Date <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control form-control-sm" name="gpDate" placeholder="Grah Pravesh Date (Optional)" required/>

                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">First Visit Date</label>
                                    <input type="date" class="form-control form-control-sm" name="fvDate" placeholder="First Visit Date"/>
                                </div>
                                <div class="form-group col-md-4">
                                    <label for="inputEmail4">Property Purchase/opening Date</label>
                                    <input type="date" class="form-control form-control-sm" name="ppDate" placeholder="Property Purchase/opening Date" />
                                </div>
                            </div>

                            <!-- 
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Select Client</label>
                                <div class="form-row">
                                    <select class="form-control form-control-sm col-md-6" name="client" id="clients">
                                        <option value="">Select Owner</option>
                                        <?php if (isset($clients) && !empty($clients)) {
                                            for ($i = 0; $i < count($clients); $i++) { ?>
                                                <option value="<?php echo $clients[$i]['cId']; ?>"><?php echo $clients[$i]['name']; ?></option>
                                        <?php }
                                        } ?>
                                    </select>
                                    <button type="button" class="btn col-md-1 btn-outline-primary btn-sm addClient" data-toggle="modal" data-target="#modal1">
                                        <i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div> -->


                        </div>
                </div>
                <div class="card-footer text-muted">
                    <input type="submit" value="Save Info" class="btn btn-outline-primary btn-sm rounded-0 float-right">

                </div>
                </form>
            </div>

        </div>
    </div>

    <!-- //Client form modal -->
    <!-- <div class="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="margin-left: 1px;">
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

                    <form method="post" id="clientInfo">
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Full Name</label>
                                <input type="text" class="form-control form-control-sm" name="cName" placeholder="Name" required />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Mobile No.</label>
                                <input type="number" class="form-control form-control-sm" name="mNumber" placeholder="Mobile No." required />
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">Email</label>
                                <input type="email" class="form-control form-control-sm" name="cEmail" placeholder="Email" required />
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputAddress">Client Address</label>
                                <input type="text" class="form-control form-control-sm" name="cAddress" placeholder="1234 Main St" required />
                            </div>
                        </div>

                        <div class="modal-footer p-1 pl-3 pr-3">
                            <button type="button" class="btn btn-outline-secondary btn-sm rounded-0" data-dismiss="modal">
                                Close
                            </button>
                            <input type="button" value="Save Info" class="btn btn-outline-primary btn-sm rounded-0 save-client-info">


                    </form>
                </div>
            </div>
        </div>
    </div> -->
    </div>
    <script>
        $(function() {
            $('#datetimepicker3').datetimepicker();
        });
    </script>
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
</body>

</html>