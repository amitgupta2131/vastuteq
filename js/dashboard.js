import Model from './helper/model.class.js';
import saveUserData from './helper/saveUserData.class.js';

let model = new Model();

let maps = model.getMaps();

localStorage.hasOwnProperty('selectedMapId') == true ? localStorage.removeItem("selectedMapId") : null;

let mainArea = d3.select('#mapsContainer');

for (let i in maps) {
	var container = mainArea.append('div').attr('class', 'col-lg-4 col-md-6 col-sm-12 mb-4')
	var cardContainer = container.append('div').attr('class', 'card rounded bubbly-button p-1')
		.attr('data-map-id', maps[i].id);
	cardContainer.append('img').attr('class', 'card-img-top').attr('src', maps[i].imageData.src)
	var cardBody = cardContainer.append('div').attr('class', 'card-body border-top border-thick')
	cardBody.append('div').attr('class', 'project-name card-text').text(`Property ID: ${maps[i].id}`)
	cardBody.append('div').attr('class', 'last-update card-text').text('Last edited 19 hours ago')

}

d3.selectAll('[data-map-id]').on('click', function () {
	let id = d3.select(this).attr('data-map-id');
	let selectedMapId = localStorage.getItem("selectedMapId") || 0;
	localStorage.setItem("selectedMapId", id);
	//console.log("id: ",id);

	window.location.href = base_url+'/Main/draw';
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


	

	$('.save-client-info').on('click',function(e) {
		e.preventDefault();
		let mNo = $("[name='mNumber']").val();
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
	function addsuccess(content,targetTextarea) {
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
	function typeSuccess(content,targetTextarea) {
		var result = JSON.parse(content);
		console.log(result)
		if (result != "") {
			let html = ''
			for(let i in result){
				html += `<option value="${result[i]['type']}">${result[i]['type']}</option>`
			}
			$('#type').html(html)
		
		} else {
			showAlert(result.error, 'danger');		
		}
	}

});



