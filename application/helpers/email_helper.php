<?php
function sentmail($to = null, $subject = null, $mail_body = null, $target_file = null)
{
    $CI = &get_instance();

    // $email = base64_decode($email); 

    $config = array(
        'protocol' => 'smtp',
        'smtp_host' => 'ssl://mail.vastuteq.com',
        'smtp_port' => 465,
        'smtp_user' => 'info@vastuteq.com',
        'smtp_pass' => '^r6P#8u[1qME',
        'mailtype' => 'html',
        'charset' => 'iso-8859-1'
    );
    $CI->load->library('email', $config);
    $CI->email->set_newline("\r\n");
    $CI->email->initialize($config);

    $CI->email->from($config['smtp_user']);
    $CI->email->to($to);

    $CI->email->subject($subject);
    $CI->email->message($mail_body);
    $CI->email->attach($target_file);

    $r = $CI->email->send();
    // echo $CI->email->print_debugger();
    // die;
    if ($r) {
        return true;
    } else {

        return false;
    }
}
