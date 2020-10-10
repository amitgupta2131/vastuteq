$(document).ready(function () {
    $('.dataTable').dataTable();
    $('#cnsltInfo').submit(function (e) {
        e.preventDefault;
        let mNo = $("[name='mNumber']").val();
        if (mNo.trim().length != 10) {
            showAlert('Mobile No. should be 10 digit', 'danger')
            return false;
        } else {
            return true;
        }


    });

    $('#csltTable').on('click', '.delete', function (e) {
        e.preventDefault();
        let id = $(this).attr('did');
        id = atob(id)
        var formData = new FormData();
        formData.append('id', id);
        var url = base_url + "/Main/delete";
        AjaxPost(formData, url, deleteSucccess, AjaxError);

    })
    function deleteSucccess(content, targetTextarea) {
        var result = JSON.parse(content);
        // console.log(result)
        if (result[0] == "success") {
            showAlert(result[1], 'success');
            window.location.href = base_url + '/Main/admin'


        } else {
            showAlert(result[1], 'danger');
        }
    }

    $('#csltTable').on('click', '.edit', function (e) {
        e.preventDefault();
        let id = $(this).attr('eid');
        id = atob(id)
        var $row = $(this).closest("tr"),       // Finds the closest row <tr> 
            $tds = $row.find("td");             // Finds all children <td> elements
        let data = [];
        $.each($tds, function () {               // Visits every single <td> element
            data.push($(this).text());        // Prints out the text within the <td>
        });
        let name = data[1].split(' ');
        $('#id').attr('value', id)
        $('#method').attr('value', 'edit')
        $('#fname').attr('value', name[0])
        $('#lname').attr('value', name[1])
        $('#mNumber').attr('value', data[4])
        $('#email').attr('value', data[3])        
        $('#address').text(data[5])
        console.log(data);
        console.log(name);


    });

    $('input[type = "radio"]').on('click', function () {
        let inp1 = `<div class="form-group col-sm-4 mb-1" id="cheqNo">
                        <label for="chequeNo" class="text-md">Cheque No.</label>
                        <input type="text" class="form-control form-control-sm" id="chequeNo" name="chequeNo" placeholder="Cheque No">
                    </div>`;
        let inp2 = `<div class="form-group col-sm-4 mb-1" id="tranNo">
                       <label for="tId" class="text-md">Tranzaction Id</label>
                       <input type="text" class="form-control form-control-sm" id="tId" name="tId" placeholder="Tranzaction Id">
                    </div>`;

        let value = $(this).val();
        if (value == 'cash') {
            $('.radio-form #cheqNo').remove();
            $('.radio-form #tranNo').remove();
            $('.radio-form .form-group').removeClass('col-sm-4');
            $('.radio-form .form-group').addClass('col-sm-6')
        } else if (value == 'cheque') {
            $('.radio-form #tranNo').remove();
            $('.radio-form .form-group').removeClass('col-sm-6');
            $('.radio-form .form-group').addClass('col-sm-4');
            $('.radio-form').append(inp1);
        } else {
            $('.radio-form #cheqNo').remove();
            $('.radio-form .form-group').removeClass('col-sm-6');
            $('.radio-form .form-group').addClass('col-sm-4');
            $('.radio-form').append(inp2);
        }
    })

})