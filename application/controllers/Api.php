<?php
require APPPATH . '/libraries/REST_Controller.php';
// defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends REST_Controller
{

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		redirect(__CLASS__ . '/sendDetails');
	}
	//Api method to get devtas details
	public function getDevtasData_post()
	{
		if (isset($_POST['devtaName']) && !empty($_POST['devtaName'])) {
			$name = strtolower($_POST['devtaName']);
			$result =  $this->MainModel->selectAllFromWhere('devtasdetails', array('name' => $name));
			if (!empty($result)) {
				echo (json_encode($result));
			} else {
				$error = array('error' => 'There is nothing with entered devta name');
				echo json_encode($error);
			}
		} else {
			$error = array('error' => 'Devta name required');
			echo json_encode($error);
		}
	}

	//Api method to get barchart and divisions colors
	public function getcolor_post()
	{
		if (isset($_POST['division']) && !empty($_POST['division'])) {
			$div = $_POST['division'];
			$result =  $this->MainModel->selectAllFromTableOrderBy('colors', 'serial', 'ASC', array('divisions' => $div));
			if (!empty($result)) {
				echo (json_encode($result));
			} else {
				$error = array('error' => 'There is nothing with entered devta name');
				echo json_encode($error);
			}
		} else {
			$error = array('error' => 'Devta name required');
			echo json_encode($error);
		}
	}

	//Api method to get Ayadhi result
	public function getAyadhiResult_post()
	{
		if (isset($_POST['remainders']) && !empty($_POST['remainders'])) {

			$div = json_decode($_POST['remainders']['remainders'], true);
			$keys = array_keys($div);
			$result = [];
			// print_r($div); 
			// print_r($keys);die;
			for ($i = 0; $i < count($keys); $i++) {
				$con = array('name' => $keys[$i], 'remainder' => $div[$keys[$i]]);
				$result1 =  $this->MainModel->selectAllFromWhere('ayadhi',  $con);
				// print_r($result1);die;
				if (!empty($result1)) {
					$result[$keys[$i]] = $result1[0];
				} else {
					$result[$keys[$i]] = '';
				}
			}

			if (!empty($result)) {
				echo json_encode($result);
			} else {
				$error = array('error' => 'Something wrong contact to IT');
				echo json_encode($error);
			}
		} else {
			$error = array('error' => 'Plase enter values array');
			echo json_encode($error);
		}
	}

	//Api method to get divisions details i.e. 8grid data, 16 grid data, 32 grid data
	public function getdivisions_post()
	{
		if (isset($_POST['grid']) && !empty($_POST['grid'])) {

			$div = strtolower($_POST['grid']);

			if ($div == 'eight') {
				$result =  $this->MainModel->selectAllFromWhere('eightdirectiondata');
			} else if ($div == 'sixteen') {
				$result =  $this->MainModel->selectAllFromWhere('sixteenzones');
			} else {
				$result =  $this->MainModel->selectAllFromWhere('thirtytwogates');
			}

			if (!empty($result)) {
				echo json_encode($result);
			} else {
				$error = array('error' => 'Something wrong contact to IT');
				echo json_encode($error);
			}
		} else {
			$error = array('error' => 'Plase enter values array');
			echo json_encode($error);
		}
	}

	//Api method to get divisions details i.e. 8grid data, 16 grid data, 32 grid data with colors
	public function getColorAndDetails_post()
	{
		if (isset($_POST['grid']) && !empty($_POST['grid'])) {

			$div = strtolower($_POST['grid']);

			if ($div == 'eight') {
				$result =  $this->MainModel->getColorAndDetils('eightdirectiondata',$div);
			} else if ($div == 'sixteen') {
				$result =  $this->MainModel->getColorAndDetils('sixteenzones',$div);
			} else {
				$result =  $this->MainModel->getColorAndDetils('thirtytwogates',$div);
			}

			if (!empty($result)) {
				echo json_encode($result);
			} else {
				$error = array('error' => 'Something wrong contact to IT');
				echo json_encode($error);
			}
		} else {
			$error = array('error' => 'Plase enter values array');
			echo json_encode($error);
		}
	}
}
