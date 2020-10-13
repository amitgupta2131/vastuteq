$(document).ready(function () {

    $('#fPassword').click(function (e) {
        e.preventDefault();
        let form = ` <div class="form-group">
                        <input type="email" name="email" class="form-control" required aria-describedby="emailHelp" placeholder="Enter Email Address...">
                    </div>
                    <button type="button" id="next" class="button">
                      Next
                    </button>`;
        $('#fPassword').addClass('d-none');
        $('#form').html(form);
    });

    $('#form1').on('click', '#next', function () {
        let mail = $('input[type="email"]').val();
        let formData = new FormData();
        formData.append('email', mail);
        let url = BASE_URL + 'Login/validateMail';
        AjaxPost(formData, url, typeSuccess, AjaxError);
        function typeSuccess(content, targetTextarea) {
            let response = JSON.parse(content);
            if (response[0] == 'success') {
                let formFields = `<div class="form-group"><label for="new-password">New Password</label>
                    <input type="email" hidden name="email" id="email" value="${mail}" class="form-control">
                    <input type="password" name="new-password" id="new-password" class="form-control">
                </div>
                <div class="form-group">
                    <label for="confirm-password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="confirm-password" class="form-control">
                </div>                                               
                    <input type="submit" value="Update" class="button">
                    <div class="side-top-bottom"></div>
                    <div class="side-left-right"></div>
                `
                $(`#form1`).attr('action', BASE_URL + 'Login/updatePassword');
                $('#form').html(formFields);
            } else {
                showAlert(response[1], 'danger');
            }
        }

    });

    $('#form1').on('submit', function (e) {
        let nPass = $('#new-password').val();
        let cPass = $('#confirm-password').val();
        if (nPass != cPass) {
            showAlert('Password does not match','warning');
            $('#confirm-password').focus();
            return false;
        } else {
            return true;
        }

    });

});