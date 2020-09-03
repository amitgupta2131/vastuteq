import Model from './helper/model.class.js';
import saveUserData from './helper/saveUserData.class.js';

let model = new Model();

let maps = model.getMaps();

localStorage.hasOwnProperty('selectedMapId') == true ? localStorage.removeItem("selectedMapId") : null;

let mainArea = d3.select('#mapsContainer');

d3.select('#createMap').on('click', function () {
	// let id = uniqueID();
	// localStorage.setItem("selectedMapId", id);
	window.location.href = base_url + 'Main/createMap';


})

d3.select('#importMap').on('click', function () {
	// // let id = uniqueID();
	// // localStorage.setItem("selectedMapId", id);
	window.location.href = base_url + 'Main/importMap';



})



// d3.select('#newProject').on('click', function () {
// 	// let id = uniqueID();
// 	// localStorage.setItem("selectedMapId", id);
// 	window.location.href = base_url + 'Main/propertyInfo';


// })

$('#houseMaps').on('click', '[data-map-id]', function () {

	let id = d3.select(this).attr('data-map-id');
	localStorage.setItem("selectedMapId", id);
	console.log(id)
	//saving data in backend through ajax
	var formData = new FormData();
	formData.append('id', id);
	var url = base_url + "/Main/getHousemapsDetails";
	AjaxPost(formData, url, HouseMapssuccess, AjaxError);
	function HouseMapssuccess(content, targetTextarea) {
		var result = JSON.parse(content);
		//creating housemap data for localstorage
		result[0].id = result[0].mapId
		if (result[0].centroid.trim() != "" && result[0].customBoundariesCoords.trim() != "" && result[0].faceCoords.trim() != "" && result[0].vedicBoundariesCoords.trim() != "" && result[0].dimension.trim() != "") {
			result[0].centroid = JSON.parse(result[0].centroid)
			result[0].customBoundariesCoords = JSON.parse(result[0].customBoundariesCoords)
			result[0].faceCoords = JSON.parse(result[0].faceCoords)
			result[0].vedicBoundariesCoords = JSON.parse(result[0].vedicBoundariesCoords)
			result[0].dimension = JSON.parse(result[0].dimension)
			console.log(result[0].dimension)
		}

		result[0].imageData = JSON.parse(result[0].imageData)
		result[0].stage = parseInt(result[0].stage)
		delete result[0].mapId;
		delete result[0].propertId;
		localStorage.removeItem("houseMaps");
		localStorage.removeItem("reportDivision");
		localStorage.setItem("houseMaps", JSON.stringify(result));

		//creating object data for localstorage
		if (result[0].objects != "") {
			localStorage.removeItem("objects");
			localStorage.setItem("objects", result[0].objects);
		}

		//creating EditText object data for localstorage
		if (result[0].edit_text_objects != "") {
			localStorage.removeItem("EditTextObjects");
			localStorage.setItem("EditTextObjects", result[0].edit_text_objects);
		}

		//creating reportData for local storage
		if (result[0].reportData != "") {
			localStorage.removeItem("objectReport");
			localStorage.setItem("objectReport", result[0].reportData);
		}

		console.log(result[0].objects)
	}

	window.location.href = base_url + '/Main/draw/' + btoa(id);
})

$('#houseMaps').on('click', '.deleteMap', function () {
	let result = confirm("Are you sure to delete this housemap");
	if (result) {
		let id = $(this).attr('dId');
		//saving data in backend through ajax
		var formData = new FormData();
		formData.append('id', id);
		var url = base_url + "/Main/deletehouseMaps";
		AjaxPost(formData, url, deleteSuccess, AjaxError);
		function deleteSuccess(content, targetTextarea) {
			var result = JSON.parse(content);
			if (result[0] == 'success') {
				showAlert(result[1], 'success')
				window.location.reload()
			} else {
				window.location.reload()
			}

		}
	} else {
		return false;
	}
})


$(document).ready(function () {


	var $toggleButton = $('.toggle-button'),
		$menuWrap = $('.menu-wrap'),
		$sidebarArrow = $('.sidebar-menu-arrow');

	// Hamburger button

	$toggleButton.on('click', function () {
		$(this).toggleClass('button-open');
		$menuWrap.toggleClass('menu-show');
	});

	// Sidebar navigation arrows

	$sidebarArrow.click(function () {
		$(this).next().slideToggle(300);
	});




	$('.save-client-info').on('click', function (e) {
		e.preventDefault();
		let mNo = $("[name='mNumber']").val();
		let str = $("[name='cName']").val();
		alert(str)
		if ($.isNumeric(str.split('')[0])) {
			showAlert('Name Should not be start from numeric value', 'danger')
			return false;
		}
		if (mNo.trim().length != 10) {
			showAlert('Mobile No. should be 10 digit', 'danger')
			return false;
		} else {
			var formData = new FormData(document.getElementById('clientInfo'));
			// formData.append('id', id);
			var url = base_url + "/Main/addClient";
			AjaxPost(formData, url, addsuccess, AjaxError);
		}

	})
	function addsuccess(content, targetTextarea) {
		var result = JSON.parse(content);
		// console.log(result)
		if (result[0] == "success") {
			let html = `<option value="${result[2]}">${result[3]}</option>`
			$('#clients').append(html);
			showAlert(result[1], 'success');
			$('#modal1').toggle()
			$('.modal-backdrop').toggle()

		} else {
			showAlert(result[1], 'danger');
		}
	}

	$('#category').change(function () {
		let value = $('option:selected').val()
		let id = $('option:selected').attr('tId')
		if (value == '') {
			showAlert('Please select any category')
		} else {
			var formData = new FormData();
			formData.append('id', id);
			var url = base_url + "/Main/getType";


			AjaxPost(formData, url, typeSuccess, AjaxError);
		}
	});
	function typeSuccess(content, targetTextarea) {
		var result = JSON.parse(content);
		console.log(result)
		if (result != "") {
			let html = ''
			for (let i in result) {
				html += `<option value="${result[i]['type']}">${result[i]['type']}</option>`
			}
			$('#type').html(html)

		} else {
			showAlert(result.error, 'danger');
		}
	}

});

$('#clientName').on('keyup', function () {
	let value = $(this).val();


	var formData = new FormData();
	formData.append('value', value);
	var url = base_url + "/Main/getClientDetails";
	AjaxPost(formData, url, clientSuccess, AjaxError);

	function clientSuccess(content, targetTextarea) {
		var result = JSON.parse(content);

		if (result != "") {
			console.log(result)
			$('#clients').empty();
			result.forEach(element => {
				$('#clients').removeClass('d-none')
				$('#clients').append(`<a href="#">${element.name}, ${element.mobileNo}, ${element.email}</a>`)
			});
		} else {
			showAlert(result.error, 'danger');
		}
	}
})

$('#clients').on('click','a',function(){
	let data = $(this).text().split(',');
	$("input[name='cName']").val(data[0]);
	$("#mNumber").val(data[1]);
	$("input[name='cEmail']").val(data[2]);
	$('#clients').addClass('d-none')
});

$("input[type='submit']").on('click',function(e){
e.preventDefault;
let category = $('#category option:selected').val();
let type = $('#type option:selected').val();
if(category == '' || type == ""){
	showAlert('all * values are required','danger');
	return false;
}
return true;

})



