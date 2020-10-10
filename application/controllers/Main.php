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
		$this->load->view('dashboard', $data);
	}

	public function propertyInfo()
	{

		$data['category'] = $this->MainModel->selectAllFromTableOrderBy('property_category', 'category', 'ASC');
		$this->load->view('propertyInfo', $data);
	}

	public function getClientDetails()
	{
		$value = $_POST['value'];
		$data = $this->MainModel->getClientDetails($value);
		echo json_encode($data);
	}

	public function createMap()
	{
		$data['behavior'] = "create";
		$this->load->view('draw.php', $data);
	}

	public function importMap()
	{
		$data['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');
		$data['category'] = $this->MainModel->selectAllFromTableOrderBy('property_category', 'category', 'ASC');
		$data['objects'] =   $this->MainModel->selectAllFromWhere('icons', array('category' => 'objects'));
		$data['activities'] =   $this->MainModel->selectAllFromWhere('icons', array('category' => 'activities'));
		$data['behavior'] = "import";
		$this->load->view('draw.php', $data);
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

		// $insertData = array(
		// 	'userId' => $_SESSION['userInfo']['userId'],
		// 	'clientId'	=> "1234567890",
		// 	'propertyName' => "DUMMY PROPERTY",
		// 	'category'	=> "RESIDENTIAL",
		// 	'type' => "FLAT",
		// 	'propertyAddress' => "DUMMY ADDRESS",
		// 	'grahPravesh_date' => "2020-07-28",
		// 	'firstVisit_date' => "2020-07-28",
		// 	'opening_date' => "2020-07-28",
		// );
		// $insertData['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');

		// $result = $this->MainModel->insertInto('propertydetails', $insertData);
		// if ($result) {
		// 	// $this->session->set_flashdata("success", "Client successfully added");
		// 	redirect(base_url('Main/draw/') . base64_encode($insertData['propertyId']));
		// } else {
		// 	$this->session->set_flashdata("error", "Something went wrong contact to IT");
		// 	redirect(base_url('Main/propertyInfo'));
		// }

		//$clientData['cId'] = '';
		$cId = $_POST['cId'];
		if (!empty($_POST['cName'])) {

			$clientData = array(
				'userId' => $_SESSION['userInfo']['userId'],
				'clientName'	=> validateInput($_POST['cName']),
				'clientMobileNo' => validateInput($_POST['mNumber']),
				'clientEmail'	=> validateInput($_POST['cEmail']),
				'clientAddress' => validateInput($_POST['cAddress']),
				'landlineNo' => validateInput($_POST['lNumber']),
				'cId' => $cId
			);
			$clientValidate =   $this->MainModel->selectAllFromWhere('clientdetails', array('clientEmail' => $clientData['clientEmail'], 'clientMobileNo' => $clientData['clientMobileNo']));

			if (!$clientValidate) {
				$clientData['cId'] =   $this->MainModel->getNewIDorNo("C-", 'clientdetails');
				$result = $this->MainModel->insertInto('clientdetails', $clientData);

				// if ($result) {
				// 	echo json_encode(array("success", "Client successfully added", $insertData['cId'], $_POST['cName']));
				// } else {
				// 	echo json_encode(array("error", "Something went wrong contact to IT"));
				// }
			}
		}

		if (!empty($_POST['cName'])) {


			$insertData = array(
				'userId' => $_SESSION['userInfo']['userId'],
				'clientId' => $cId,
				'propertyName' => validateInput($_POST['pname']),
				'category'	=> validateInput($_POST['category']),
				'type' => validateInput($_POST['type']),
				'propertyAddress' => validateInput($_POST['address']),
				'grahPravesh_date' => validateInput($_POST['gpDate']),
				'firstVisit_date' => validateInput($_POST['fvDate']),
				'opening_date' => validateInput($_POST['ppDate']),
			);
			$insertData['propertyId'] =   $this->MainModel->getNewIDorNo("P-", 'propertydetails');
			$result = $this->MainModel->insertInto('propertydetails', $insertData);
			if ($result) {
				// $this->session->set_flashdata("success", "property successfully added");
				// redirect(base_url('Main/draw/') . base64_encode($insertData['propertyId']));
				echo (json_encode(array('clientDetails' => $clientData, 'propertyDetails' => $insertData, 'type' => "success")));
			} else {
				echo (json_encode(array("error", "Could not add propert information, contact IT")));
				// redirect(base_url('Main/propertyInfo'));
			}
		} else {
			echo (json_encode(array("error", "All fields with * are required")));
			// redirect(base_url('Main/propertyInfo'));
		}
	}

	public function draw($id = null)
	{
		$data['propertyId'] = base64_decode($id);
		$data['objects'] =   $this->MainModel->selectAllFromWhere('icons', array('category' => 'objects'));
		$data['activities'] =   $this->MainModel->selectAllFromWhere('icons', array('category' => 'activities'));
		$this->load->view('draw', $data);
	}

	public function devtas()
	{

		$this->load->view('devtas');
	}

	public function ayadhi()
	{

		$this->load->view('ayadi');
	}

	public function reports()
	{

		$this->load->view('reports');
	}

	public function admin()
	{
		$data['users'] = $this->MainModel->selectAllFromTableOrderBy('login', 'firstName', 'ASC', array('isAdmin' => '0'));
		$this->load->view('admin', $data);
	}

	public function addUser()
	{
		// echo '<pre>';
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
					'isAdmin' => 0,
					'firstName'	=> validateInput($_POST['fname']),
					'lastName'	=> validateInput($_POST['lname']),
					'mobileNo' => validateInput($_POST['mNumber']),
					'email'	=> validateInput($_POST['email']),
					'address' => validateInput($_POST['address']),
					'paymentType' => validateInput($_POST['payment']),
					'amount' => validateInput($_POST['amount']),
					'chequeNo' => isset($_POST['chequeNo'])?validateInput($_POST['chequeNo']):'',
					'tranzactionId' => isset($_POST['tId'])?validateInput($_POST['tId']):'',
					'date' => validateInput($_POST['date']),
				);
				$insertData['password'] = $this->passwordGenerate(12);
				

				// Create user Id
				$prefix = substr($insertData['firstName'], 0, 3).substr($insertData['lastName'], 0, 3);
				$insertData['userId'] =   $this->MainModel->getNewUserIDorNo($prefix, 'login');				

				// Send email to user
				$this->load->helper('email');
				$to = $insertData['email'];
				$sub = 'No Reply';
				$mess = 'Dear ' . $insertData['firstName'] . ' ' . $insertData['lastName'] . ',' . '<br>' . 'Find your creadiential and click on below link for further process' . '<br>' . 'link: ' . base_url('Login') . '<br>User Id: ' . $insertData['userId'] . '<br>' . 'Password: ' . $insertData['password'];
				if (sentmail($to, $sub, $mess)) {
					$result = $this->MainModel->insertInto('login', $insertData);
					if ($result) {
						$this->session->set_flashdata("success", "Consultant successfully added");
						redirect(base_url('Main/admin'));
					} else {
						$this->session->set_flashdata("error", "Consultant could not be added contact to IT");
						redirect(base_url('Main/admin'));
					}
				} else {
					$this->session->set_flashdata('error', 'Something Wrong try again after some time.');
					redirect(base_url('Main/admin'));
				}
			}
		} else {
			$this->session->set_flashdata("error", "Insuffiecient data found");
			redirect(base_url('Main/admin'));
		}
	}

	public function editUser($data)
	{
		if (isset($data) && !empty($data)) {

			$insertData = array(
				'password' => validateInput($data['password']),
				'isAdmin' => 0,
				'firstName'	=> validateInput($_POST['fname']),
				'lastName'	=> validateInput($_POST['lname']),
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

	public function uploadImage($FILES, $POST)
	{
		// print_r($_FILES["usrImage"]);die;
		$target_dir = "uploads/";
		$target_file = $target_dir . basename($FILES["usrImage"]["name"]);
		$imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
		// Check if image file is a actual image or fake image


		// Check if file already exists
		if (file_exists($target_file)) {
			$this->session->set_flashdata("error", "Sorry, file already exists.");
			redirect($POST['method']);
		}

		// Check file size
		if ($FILES["usrImage"]["size"] > 500000) {
			$this->session->set_flashdata("error", "Sorry, your file is too large, file size will be 500kb");
			redirect($POST['method']);
		}

		// Allow certain file formats
		if (
			$imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
			&& $imageFileType != "gif"
		) {
			$this->session->set_flashdata("error", "Sorry, only JPG, JPEG, PNG & GIF files are allowed.");
			redirect($POST['method']);
		}

		if (move_uploaded_file($FILES["usrImage"]["tmp_name"], $target_file)) {
			return true;
		} else {
			return false;
		}
	}


	public function updateUser()
	{


		if (isset($_POST) && !empty($_POST)) {

			$uploadResult =	$this->uploadImage($_FILES, $_POST);
			if ($uploadResult) {
				$insertData = array(
					'password' => validateInput($_POST['password']),
					'isAdmin' => 0,
					'name'	=> validateInput($_POST['name']),
					'mobileNo' => validateInput($_POST['phone']),
					'email'	=> validateInput($_POST['email']),
					'address' => validateInput($_POST['address']),
					'userImg' => $_FILES["usrImage"]["name"]
				);
				$result = $this->MainModel->updateWhere('login', $insertData, array('userId' => validateInput($_POST['id'])));

				if ($result) {
					$this->session->set_flashdata("success", "Client successfully updated");
					redirect($_POST['method']);
				} else {
					$this->session->set_flashdata("error", "Something went wrong contact to IT");
					redirect($_POST['method']);
				}
			} else {
				$this->session->set_flashdata("error", "Sorry, there was an error uploading your file.");
				redirect($_POST['method']);
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
				'gMap' => ($_POST['gMap']),
				'reportData' => ''
			);

			$result = $this->MainModel->insertInto('housemaps', $insertData);
			// $result2 = $this->MainModel->insertInto('housemaps_temp', $insertData);
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
				'gMap' => ($_POST['gMap']),
				'reportData' => ''
			);

			$result = $this->MainModel->updateWhere('housemaps', $insertData, array('mapId'	=> ($_POST['id'])));
			if ($result) {
				echo json_encode(array("success", "Details Saved"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}

	public function updateObjects()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'objects' => ($_POST['objects']),
			);

			$result = $this->MainModel->updateWhere2('housemaps', $insertData, array('mapId'	=> ($_POST['id'])));
			if ($result) {
				echo json_encode(array("success", "Details Updated"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}

	public function updateTextObjects()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'edit_text_objects' => ($_POST['objects']),
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

	public function updateReportData()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'reportData' => ($_POST['reportData']),
			);

			$result = $this->MainModel->updateWhere('housemaps', $insertData, array('mapId'	=> ($_POST['id'])));
			if ($result) {
				echo json_encode(array("success", "Report Details Saved"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}

	public function updateObjectsAndReportData()
	{
		if (isset($_POST) && !empty($_POST)) {
			$insertData = array(
				'reportData' => $_POST['reportData'],
				'objects' => $_POST['object']
			);

			$result = $this->MainModel->updateWhere2('housemaps', $insertData, array('mapId'	=> ($_POST['id'])));
			if ($result) {
				echo json_encode(array("success", "Report Details Saved"));
			} else {
				echo json_encode(array("error", "Details are not saved contact to IT"));
			}
		} else {
			echo json_encode(array("error", "Something went wrong contact to IT"));
		}
	}

	public function deletehouseMaps()
	{

		$result1 = $this->MainModel->deleteFromTable('housemaps', array('propertId' => $_POST['id']));
		$result2 = $this->MainModel->deleteFromTable('propertydetails', array('propertyId' => $_POST['id']));
		if ($result1 && $result2) {
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

	//get 16 zone data with colors
	public function getSixteenZoneData()
	{
		$id = $_POST['id'];
		$result = $this->MainModel->selectSixteenZoneData();
		$colors = $this->MainModel->selectAllFromWhere("sixteen_zone_color", array("houseMapId" => $id));
		if ($result && $colors) {
			echo json_encode(array('zoneData' => $result, 'userColors' => $colors));
		} else {
			echo json_encode(array('error', 'No data found'));
		}
	}

	//get consultant report
	public function consultantReport()
	{
		$id = $_POST['id'];
		$report = $this->MainModel->selectAllFromWhere("consultant_report", array("mapId" => $id));
		if ($report) {
			echo json_encode(array('success', $report));
		} else {
			echo json_encode(array('error', 'No data found'));
		}
	}

	//getProperty Details
	public function getPropertyHousemapDetails()
	{
		$id = $_POST['id'];
		$report = $this->MainModel->getPropertyHousemapDetails($id);
		if ($report) {
			echo json_encode(array('success', $report));
		} else {
			echo json_encode(array('error', 'No data found'));
		}
	}

	public function saveConsultantReport()
	{

		$data = array(
			'mapId' => $_POST['id'],
			'report' => $_POST['value'],
		);

		$report = $this->MainModel->selectAllFromWhere("consultant_report", array("mapId" => $data['report']));
		if (!$report) {
			$result = $this->MainModel->insertInto("consultant_report", $data);
			if ($result) {
				echo json_encode(array('success', 'Report saved successfully'));
			} else {
				echo json_encode(array('error', 'Report could not saved contact to IT'));
			}
		} else {
			echo json_encode(array('error', 'HouseMap already contains consultant Report'));
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

	//save 16 zone color data
	public function saveSixteenZoneColorData()
	{
		if (isset($_POST['mapId']) && !empty($_POST['mapId']) && isset($_POST['data']) && !empty($_POST['data'])) {
			$insertData = array(
				'houseMapId' => validateInput($_POST['mapId']),
				'colors' => $_POST['data']

			);
			$validate = $this->MainModel->selectAllFromWhere("sixteen_zone_color", array("houseMapId" => $insertData['houseMapId']));
			if (!$validate) {
				$result = $this->MainModel->insertInto("sixteen_zone_color", $insertData);
				if ($result) {
					echo json_encode(array('success', '16 Zone color is successfullt set'));
				} else {
					echo json_encode(array('error', '16 Zone color could not be set, contact to IT'));
				}
			} else {
				echo json_encode(array('error', '16 Zone color is already set for this HouseMAp'));
			}
		} else {
			echo json_encode(array('error', 'Insuffiecient data found'));
		}
	}

	//get client property data
	public function getClientPropertData()
	{
		$id = $_POST['id'];
		if (isset($id) && !empty($id)) {
			$result = $this->MainModel->getClientPropertyHousemapDetails($id, $_SESSION['userInfo']['userId']);
			if ($result) {
				echo json_encode(array('success', $result));
			} else {
				echo json_encode(array('error', 'No data found'));
			}
		} else {
			echo json_encode(array('error', 'No id found'));
		}
	}


	public function getDate()
	{
		echo (Date('yy-m-d'));
	}

	function passwordGenerate($length)
	{
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		return substr(str_shuffle($chars), 0, $length);
	}
}
