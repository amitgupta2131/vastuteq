<?php


class Login extends ci_controller
{
	
	public function __construct()
	{
		parent::__construct();
		// $this->load->helper('url');
		// $this->load->model('MainModel');
		// $this->load->model('CustomModel');
		date_default_timezone_set("Asia/Kolkata");
		
		if (isset($_SESSION['userInfo'])&&!empty($_SESSION['userInfo'])) {
			redirect(base_url('Main'));
		}
	}

	public function index()
	{
		
		$this->load->view('index1');
		
	}

	public function verifyUser()
	{
	   
		
		if(isset($_POST['email']) && isset($_POST['password']))
		{
			
			$email = $_POST['email'];
			$password = $_POST['password'];

			$result = $this->MainModel->selectAllFromWhere("login",Array("email"=>$email,"password"=>$password));
			$result1 = $this->MainModel->selectAllFromWhere("login",Array("userId"=>$email,"password"=>$password));
			
			if(!$result && !$result1){
				$this->session->set_flashdata("error","Please enter valid credentials");
				redirect(base_url('Login/index'));
			}else if(!$result && $result1){
				$result = $result1;
			}

			if($result)
			{
				if($result[0]['isAdmin']){
				$this->session->set_userdata("userInfo",$result[0]);
				redirect(base_url("Main/admin"));
				}else{
				$this->session->set_userdata("userInfo",$result[0]);
				redirect(base_url("Main"));
				}
				
				

			}
			else
			{
				
				$this->session->set_flashdata("error","Please enter valid credentials");
				redirect(base_url('Login/index'));
			}
			
		}
		else
		{
			$this->session->set_flashdata("error","System error found, Please contact service provider");
		}
		
	}
}

?>