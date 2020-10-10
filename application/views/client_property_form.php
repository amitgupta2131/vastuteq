<div class="container client-form d-none">
    <div class="row">
        <div class="card p-card col-md-12 p-0 mt-5">
            <div class="card-body p-0">
                <form method="post" id="cpDetails">
                    <div class="row m-0">
                        <div class="card c-card col-sm-6">
                            <div class="card-header">
                                Client Details
                            </div>
                            <div class="card-body client-body">
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-4 text-md">Full Name <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control col-sm-8 form-control-sm" id="clientName" name="cName" placeholder="Name" required />
                                    <input type="text" hidden class="form-control form-control-sm" id="cId" name="cId" required />

                                </div>

                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-4 text-md">Mobile No.</label>
                                    <input type="text" class="form-control col-sm-8 form-control-sm" id="mNumber" name="mNumber" placeholder="Mobile No." />
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-4 text-md">Landline No.</label>
                                    <input type="number" class="form-control col-sm-8 form-control-sm" name="lNumber" placeholder="Landline No." />
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-4 text-md">Email </label>
                                    <input type="email" class="form-control col-sm-8 form-control-sm" name="cEmail" placeholder="Email" />
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputAddress" class="col-sm-4 text-md">Client Address</label>
                                    <textarea class="form-control col-sm-8 form-control-sm" name="cAddress" placeholder="1234 Main St"></textarea>
                                </div>

                                <div class="clientContainer d-none" id="clients"></div>
                            </div>
                        </div>


                        <div class="card c-card col-sm-6">
                            <div class="card-header">
                                Property Details
                            </div>
                            <div class="card-body property-body">
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-6 text-md">Property Name </label>
                                    <input type="text" class="form-control col-sm-6 form-control-sm" name="pname" placeholder="property name" />
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-6 text-md">Category </label>
                                    <select class="form-control col-sm-6 form-control-sm" name="category" id="category" placeholder="property category">
                                        <option value="">Select Category</option>
                                        <?php if (isset($category) && !empty($category)) {
                                            for ($i = 0; $i < count($category); $i++) { ?>
                                                <option tId="<?php echo $category[$i]['id']; ?>" value=" <?php echo $category[$i]['category']; ?>"><?php echo $category[$i]['category']; ?></option>
                                        <?php }
                                        } ?>
                                    </select>
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-6 text-md">Type</label>
                                    <select class="form-control col-sm-6 form-control-sm" name="type" id="type" placeholder="property type">
                                        <option value="">Select Type</option>

                                    </select>
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputAddress" class="col-sm-6 text-md">Property Address</label>
                                    <textarea class="form-control col-sm-6 form-control-sm" name="address" row='6' placeholder="property address"></textarea>
                                </div>
                                <div class="form-group mb-1 row">

                                    <label for="inputEmail4" class="col-sm-6 text-md">Grah Pravesh Date</label>
                                    <input type="date" class="form-control col-sm-6 form-control-sm" name="gpDate" placeholder="Grah Pravesh Date (Optional)" />

                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-6 text-md">First Visit Date</label>
                                    <input type="date" class="form-control col-sm-6 form-control-sm" name="fvDate" placeholder="First Visit Date" />
                                </div>
                                <div class="form-group mb-1 row">
                                    <label for="inputEmail4" class="col-sm-6 text-md">Property Purchase/opening Date</label>
                                    <input type="date" class="form-control col-sm-6 form-control-sm" name="ppDate" placeholder="Property Purchase/opening Date" />
                                </div>
                            </div>
                            <div class="card-footer text-muted">
                                <input type="submit" value="Save Info" class="btn btn-outline-primary btn-sm rounded-0 float-right">
                                <div class="btn btn-primary text-sm d-none float-right" data-behavior="import"> Import Map</div>

                            </div>
                        </div>

                        <!-- 
                            <div class="form-row">
                                
                            </div> -->
                        <!-- <div class="form-row">
                               
                            </div> -->






                    </div>
            </div>

            </form>
        </div>

    </div>

    <div class="row mt-3 mb-3 property-table d-none">
        <div class="card col-sm-12">
            <div class="card-header">
                Previous Properties of client
            </div>
            <div class="card-body">
                <table class="table" id="propertyTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ddff</td>
                            <td>sfsfd</td>
                            <td>sdfsfsf</td>
                            <td>fsdfsf</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<script>
    $(document).ready(function() {
        $('#propertyTable').DataTable();
    });
</script>