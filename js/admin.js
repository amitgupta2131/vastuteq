$(document).ready(function () {
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

        $('#id').attr('value',id)
        $('#method').attr('value','edit')
        $('#name').attr('value',data[1])
        $('#mNumber').attr('value',data[2])
        $('#email').attr('value',data[3])
        $('#password').attr('value',data[4])
        $('#address').attr('value',data[5])
        $('#address').text(data[5])
        console.log(data);
        

    });   

})