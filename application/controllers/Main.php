<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Main extends CI_Controller
{

	public function __construct()
	{
		parent::__construct();
		// $this->load->helper('url');
		// $this->load->model('MainModel');
		// $this->load->model('CustomModel');
		date_default_timezone_set("Asia/Kolkata");

		if (!isset($_SESSION['userInfo']) && empty($_SESSION['userInfo'])) {
			redirect(base_url('Login'));
		}
	}
	public function index()
	{
		$userId = $_SESSION['userInfo']['userId'];
		$data['property'] = $this->MainModel->gethouseMapsDetails($userId);
		// echo "<pre>"; print_r($data['property']);die;
		$this->load->view('dashboard',$data);
	}

	public function propertyInfo()
	{
		$this->addProperty();
		// $data['clients'] = $this->MainModel->selectAllFromTableOrderBy('clientdetails', 'name', 'ASC');
		// $data['category'] = $this->MainModel->selectAllFromTableOrderBy('property_category', 'category', 'ASC');
		// $this->load->view('propertyInfo', $data);
	}

	public function createMap() {
		$data['behavior'] = "create";
		$this->load->view('draw.php',$data);
	}

	public function importMap() {
		$data['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');
		$data['behavior'] = "import";
		$this->load->view('draw.php',$data);
	}

	public function getType()
	{
		if (isset($_POST['id']) && !empty($_POST['id'])) {
			$data = $this->MainModel->selectAllFromTableOrderBy('property_type', 'type', 'ASC', array('categoryId' => $_POST['id']));
			echo json_encode($data);
		} else {
			echo (json_encode(array('error' => 'No data found contact to IT')));
		}
	}

	public function addClient()
	{

		$validate = $this->MainModel->selectAllFromWhere("clientdetails", array("email" => $_POST['cEmail']));

		if ($validate) {
			echo json_encode(array("error", "Client Already Exist"));
		} else {
			$insertData = array(
				'userId' => $_SESSION['userInfo']['userId'],
				'name'	=> validateInput($_POST['cName']),
				'mobileNo' => validateInput($_POST['mNumber']),
				'email'	=> validateInput($_POST['cEmail']),
				'address' => validateInput($_POST['cAddress']),
			);
			$insertData['cId'] =   $this->MainModel->getNewIDorNo("C-", 'clientdetails');
			$result = $this->MainModel->insertInto('clientdetails', $insertData);
			if ($result) {
				echo json_encode(array("success", "Client successfully added", $insertData['cId'], $_POST['cName']));
				// $this->session->set_flashdata("success", "Client successfully added");
				// redirect(base_url('Main/propertyInfo'));
			} else {
				echo json_encode(array("error", "Something went wrong contact to IT"));
				// $this->session->set_flashdata("error", "Something went wrong contact to IT");
				// redirect(base_url('Main/propertyInfo'));
			}
		}
	}

	public function addProperty()
	{

		$insertData = array(
			'userId' => $_SESSION['userInfo']['userId'],
			'clientId'	=> "1234567890",
			'propertyName' => "DUMMY PROPERTY",
			'category'	=> "RESIDENTIAL",
			'type' => "FLAT",
			'propertyAddress' => "DUMMY ADDRESS",
			'grahPravesh_date' => "2020-07-28",
			'firstVisit_date' => "2020-07-28",
			'opening_date' => "2020-07-28",
		);
		$insertData['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');

		$result = $this->MainModel->insertInto('propertydetails', $insertData);
		if ($result) {
				$this->session->set_flashdata("success", "Client successfully added");
				redirect(base_url('Main/draw/') . base64_encode($insertData['propertyId']));
		} else {
				$this->session->set_flashdata("error", "Something went wrong contact to IT");
				redirect(base_url('Main/propertyInfo'));
		}




		// if (!empty($_POST['client']) && !empty($_POST['name']) && !empty($_POST['category']) && !empty($_POST['type']) && !empty($_POST['address'])) {
		// 	$insertData = array(
		// 		'userId' => $_SESSION['userInfo']['userId'],
		// 		'clientId'	=> validateInput($_POST['client']),
		// 		'propertyName' => validateInput($_POST['name']),
		// 		'category'	=> validateInput($_POST['category']),
		// 		'type' => validateInput($_POST['type']),
		// 		'propertyAddress' => validateInput($_POST['address']),
		// 		'grahPravesh_date' => validateInput($_POST['gpDate']),
		// 		'firstVisit_date' => validateInput($_POST['fvDate']),
		// 		'opening_date' => validateInput($_POST['ppDate']),
		// 	);
		// 	$insertData['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');
		// 	$result = $this->MainModel->insertInto('propertydetails', $insertData);
		// 	if ($result) {
		// 		$this->session->set_flashdata("success", "Client successfully added");
		// 		redirect(base_url('Main/draw/') . base64_encode($insertData['propertyId']));
		// 	} else {
		// 		$this->session->set_flashdata("error", "Something went wrong contact to IT");
		// 		redirect(base_url('Main/propertyInfo'));
		// 	}
		// } else {
		// 	$this->session->set_flashdata("error", "All fields are required");
		// 	redirect(base_url('Main/propertyInfo'));
		// }
	}

	public function draw($id = null)
	{
		$data['propertyId'] = base64_decode($id);
		// print_r($data);die;
		$this->load->view('draw',$data);
	}

	public function devtas()
	{

		$this->load->view('devtas');
	}

	public function ayadhi()
	{

		$this->load->view('ayadi');
	}

	public function admin()
	{
		$data['users'] = $this->MainModel->selectAllFromTableOrderBy('login', 'name', 'ASC', array('isAdmin' => '0'));
		$this->load->view('admin', $data);
	}

	public function addUser()
	{
		// print_r($_POST);die;
		if (isset($_POST['email']) && !empty($_POST['email'])) {

			if ($_POST['method'] == 'edit') {

				$this->editUser($_POST);
			}
			$validate = $this->MainModel->selectAllFromWhere("login", array("email" => $_POST['email']));
			if ($validate) {
				$this->session->set_flashdata("error", "Consultant Already Exist");
				redirect(base_url('Main/admin'));
			} else {
				$insertData = array(
					'password' => validateInput($_POST['password']),
					'isAdmin' => 0,
					'name'	=> validateInput($_POST['name']),
					'mobileNo' => validateInput($_POST['mNumber']),
					'email'	=> validateInput($_POST['email']),
					'address' => validateInput($_POST['address']),
				);
				$insertData['userId'] =   $this->MainModel->getNewIDorNo("usr-", 'login');
				$result = $this->MainModel->insertInto('login', $insertData);
				if ($result) {
					$this->session->set_flashdata("success", "Consultant successfully added");
					redirect(base_url('Main/admin'));
				} else {
					$this->session->set_flashdata("error", "Something went wrong contact to IT");
					redirect(base_url('Main/admin'));
				}
			}
		} else {
			$this->session->set_flashdata("error", "Something went wrong contact to IT");
			redirect(base_url('Main/admin'));
		}
	}

	public function editUser($data)
	{
		if (isset($data) && !empty($data)) {

			$insertData = array(
				'password' => validateInput($data['password']),
				'isAdmin' => 0,
				'name'	=> validateInput($data['name']),
				'mobileNo' => validateInput($data['mNumber']),
				'email'	=> validateInput($data['email']),
				'address' => validateInput($data['address']),
			);
			$result = $this->MainModel->updateWhere('login', $insertData, array('userId' => validateInput($data['id'])));

			if ($result) {
				$this->session->set_flashdata("success", "Client successfully updated");
				redirect(base_url('Main/admin'));
			} else {
				$this->session->set_flashdata("error", "Something went wrong contact to IT");
				redirect(base_url('Main/admin'));
			}
		} else {
			$this->session->set_flashdata("error", "Something went wrong contact to IT");
			redirect(base_url('Main/admin'));
		}
	}

	public function addhouseMaps()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'mapId'	=> ($_POST['id']),
				'propertId'	=> ($_POST['propertyId']),
				'centroid' => ($_POST['centroid']),
				'complete' => ($_POST['complete']),
				'customBoundariesCoords' => ($_POST['customBoundariesCoords']),
				'dimension' => ($_POST['dimension']),
				'faceCoords' => ($_POST['faceCoords']),
				'imageData' => ($_POST['imageData']),
				'stage' => ($_POST['stage']),
				'type' => ($_POST['type']),
				'degree' => ($_POST['degree']),
				'vedicBoundariesCoords' => ($_POST['vedicBoundariesCoords']),
				'vpmtoggle' => ($_POST['vpmtoggle']),
				'mvpctoggle' => ($_POST['mvpctoggle']),
				'objects' => ($_POST['objects']),
				'activities' => ($_POST['activities']),
			);

			$result = $this->MainModel->insertInto('housemaps', $insertData);
			if ($result) {
				echo json_encode(array("success", "Details Saved"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}


	public function updatehouseMaps()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'centroid' => ($_POST['centroid']),
				'complete' => ($_POST['complete']),
				'customBoundariesCoords' => ($_POST['customBoundariesCoords']),
				'dimension' => ($_POST['dimension']),
				'faceCoords' => ($_POST['faceCoords']),
				'imageData' => ($_POST['imageData']),
				'stage' => ($_POST['stage']),
				'type' => ($_POST['type']),
				'degree' => ($_POST['degree']),
				'vedicBoundariesCoords' => ($_POST['vedicBoundariesCoords']),
				'vpmtoggle' => ($_POST['vpmtoggle']),
				'mvpctoggle' => ($_POST['mvpctoggle']),
				'objects' => ($_POST['objects']),
				'activities' => ($_POST['activities']),
			);

			$result = $this->MainModel->updateWhere('housemaps', $insertData, array('mapId'	=> ($_POST['id'])));
			if ($result) {
				echo json_encode(array("success", "Details Updated"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}

	public function deletehouseMaps(){
		$result = $this->MainModel->deleteFromTable('housemaps', array('mapId' => $_POST['id']));
		if ($result) {
			echo json_encode(array('success', 'Successfully Deleted'));
		} else {
			echo json_encode(array('error', 'Something wrong contact to IT'));
		}
	}

	public function delete()
	{
		$result = $this->MainModel->deleteFromTable('login', array('userId' => $_POST['id']));
		if ($result) {
			echo json_encode(array('success', 'Successfully Deleted'));
		} else {
			echo json_encode(array('error', 'Something wrong contact to IT'));
		}
	}

	public function addDevtas()
	{
		$insertData = array(
			// 'zone' => '',
			'devta' => '',
			'grid' => $_POST['1'],
			'color' => $_POST['2'],
			'effect' => $_POST['3']
			// 'dishaPalakWeapon' => $_POST['4'],
			// 'asthalakshmi' => $_POST['5'],
			// 'color' => $_POST['6'],
			// 'description' => $_POST['7']
		);
		$result = $this->MainModel->insertInto('thirtytwogates', $insertData);
	}

	public function logout()
	{

		//	$this->session->sess_destroy();
		$this->session->unset_userdata('userInfo');
		redirect(base_url("Login"));
	}

	// Api call function to get devta details on devtas page
	public function getDevta()
	{
		if (isset($_POST['name']) && !empty($_POST['name'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getDevtasData"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('devtaName' => $_POST['name']))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter devta name'));
		}
	}

	// Api call function to get colors object on draw page
	public function getColor()
	{
		if (isset($_POST['division']) && !empty($_POST['division'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getcolor"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('division' => $_POST['division']))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter devta name'));
		}
	}

	// Api call function to get Ayadhi result
	public function getAyadhiResult()
	{
		if (isset($_POST['remainders']) && !empty($_POST['remainders'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getAyadhiResult"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('remainders' => $_POST))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter devta name'));
		}
	}

	// Api call function to get Grid result
	public function getGridData()
	{
		if (isset($_POST['grid']) && !empty($_POST['grid'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getdivisions"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('grid' => $_POST['grid']))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter devta name'));
		}
	}

	// Api call function to get colorsAnd Details result
	public function getColorAndDetails()
	{
		if (isset($_POST['grid']) && !empty($_POST['grid'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getColorAndDetails"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('grid' => $_POST['grid']))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter grid'));
		}
	}

	// Api call function to get colorsAnd Details result
	public function getHousemapsDetails()
	{
		if (isset($_POST['id']) && !empty($_POST['id'])) {
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, base_url("Api/getHouseMaps"));
			curl_setopt($ch, CURLOPT_POST, 1);
			curl_setopt(
				$ch,
				CURLOPT_POSTFIELDS,
				http_build_query(array('id' => $_POST['id']))
			);
			// Receive server response ...
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
			$server_output = curl_exec($ch);
			curl_close($ch);
			if (!empty($server_output)) {
				echo $server_output;
			} else {
				echo json_encode(array('error' => 'Something wrong contact to IT.'));
			}
		} else {
			echo json_encode(array('error' => 'Please enter map id'));
		}
	}


	public function getDate(){
		echo(Date('yy-m-d'));
		
	}

}
