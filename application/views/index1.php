<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>vastuTeq</title>

  <!-- FAVICON -->
  <link rel="icon" href="<?php echo base_url('icons/favicon.ico')?>" type="image/ico">
  <!-- FONTAWESOME CSS -->
  <link rel="stylesheet" href="<?php echo base_url('assets/fontawesome/css/all.min.css')?>">
  <!-- CUSTOM CSS -->
  <link rel="stylesheet" href="<?php echo base_url('css/index.css')?>">
  <!-- JQUERY -->
  <script src="<?php echo base_url('js/helper/jquery.min.js')?>"></script>
  <!-- D3 JS SCRIPT -->
  <script src="<?php echo base_url('js/main.js')?>" type="module" defer></script>
  <!-- Ajax library -->
  <script src="<?php echo base_url('js/MyScriptLibrary.js')?>"></script>
  <!-- Notify library -->
  <script src="<?php echo base_url('js/bootstrap-notify.min.js')?>"></script>
  <!-- Latest compiled and minified CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">

</head>

<body style="background-color: #3a3b3c;">
  <section class="--login-page">
    <div class="logo-box">
      <img class="logo" src="<?php echo base_url('assets/logo/logo2.svg')?>" alt="logo">
    </div>
    <div class="login-box">
      <form action="<?php echo base_url('Login/verifyUser');?>" method="post">
        <div class="form" id="form">
          <div class="field email">
            <div class="icon"></div>
            <input class="input" id="email" type="email" placeholder="Email" name="email" autocomplete="off" />
          </div>
          <div class="field password">
            <div class="icon"></div>
            <input class="input" id="password" type="password" name="password" placeholder="Password" />
          </div>
          <input type="submit" class="button" value="LOGIN" id="submit">
          <div class="side-top-bottom"></div>
          <div class="side-left-right"></div>
          <small>Fill in the form</small>
        </div>
      </form>
    </div>
  </section> 
    
    <?php if(!empty($this->session->flashdata('error'))){ ?>
      <script>
    let error = '<?php echo $this->session->flashdata('error'); ?>';
    showAlert(error, 'danger');
    </script>
    <?php } ?>
  
</body>

</html>