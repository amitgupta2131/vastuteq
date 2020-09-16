import Paint from "./paint/paint.class.js";
import Behavior from "./behavior.class.js";
import Vastuteq from "./vastuteq.class.js";
import Model from "./helper/model.class.js";
import Modal from "./helper/modal.class.js";


var isCreateMap = false,
  isImportMap = false;

var importMapApp, createMapApp, canvasRuler;

if (localStorage.hasOwnProperty('selectedMapId') == true) {
  let selectedMapId = localStorage.getItem("selectedMapId");
  let model = new Model();
  let houseMap = model.getHouseMap(selectedMapId)[0];
  // console.log("H", houseMap);
  if (houseMap != undefined) {
    let data = {
      name: "map",
      src: houseMap.imageData.src,
      x: houseMap.imageData.x,
      y: houseMap.imageData.y,
      width: houseMap.imageData.width,
      height: houseMap.imageData.height,
      transform: houseMap.imageData.transform,
    };

    importMapApp = new Vastuteq(selectedMapId, data, BASE_URL);
  }

}

function createMap() {
  // ENABLING TOOLBOXES
  // let size = parseInt(item.value)
  d3.select(".toolbox.right").classed("d-none", false);
  d3.select(".toolbox.left").classed("d-none", false);
  d3.select(".mousePos").classed("d-none", false);
  d3.select(".client-form").classed("d-none", true);
  $('#drawArea').removeClass('d-none');
  let canvasSize = drawAreaSize(35, 35);

  console.log(canvasSize)
  let canvasArea = d3
    .select("#drawArea")
    .append("div")
    .attr("id", "canvasArea")
    .classed("border", true);

  let backgroundGridCanvas = d3
    .select("#drawArea")
    .append("svg")
    .attr("id", "paintCanvasBackground");

  let canvas = d3
    .select("#drawArea")
    .append("canvas")
    .attr("id", "paintCanvas")
    .classed("border", true);

  backgroundGridCanvas.attr("width", canvasSize.width);
  backgroundGridCanvas.attr("height", canvasSize.height);
  canvas.attr("width", canvasSize.width);
  canvas.attr("height", canvasSize.height);

  canvasRuler = new ruler({
    container: document.querySelector("#canvasArea"),
  });
  // canvasRuler.api.setScale(2);

  createMapApp = new Paint("paintCanvas");

  isCreateMap = true;
}

function importMap() {
  $("input.import-map-file[type='file']").click();
}

function initImportMap() {
  if (isCreateMap) {
  } else if (isImportMap) {
  } else {
  }
  return true;
}

function initCreateMap() {
  if (isImportMap) {
    swal({
      title: "Are you sure?",
      text: "This work will be closed and saved !",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDo) => {
      if (willDo) {

        let canvasSize = drawAreaSize(35, 35);

        let canvasArea = d3
          .select("#drawArea")
          .append("div")
          .attr("id", "canvasArea")
          .classed("border", true);

        let backgroundGridCanvas = d3
          .select("#drawArea")
          .append("svg")
          .attr("id", "paintCanvasBackground");

        let canvas = d3
          .select("#drawArea")
          .append("canvas")
          .attr("id", "paintCanvas")
          .classed("border", true);

        backgroundGridCanvas.attr("width", canvasSize.width);
        backgroundGridCanvas.attr("height", canvasSize.height);
        canvas.attr("width", canvasSize.width);
        canvas.attr("height", canvasSize.height);

        return true;

        // swal("Your drawing is exported successfully.", {
        //     icon: "success",
        // });
      } else {
        return false;
      }
    });
  } else if (isCreateMap) {
    swal({
      title: "Are you sure?",
      text: "Once removed, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDo) => {
      if (willDo) {
        // CLEARING CANVAS
        clearCanvas(document.getElementById("paintCanvas"));

        return true;
      } else {
        return false;
      }
    });
  } else {
    let canvasSize = drawAreaSize(35, 35);

    let canvasArea = d3
      .select("#drawArea")
      .append("div")
      .attr("id", "canvasArea")
      .classed("border", true);

    let backgroundGridCanvas = d3
      .select("#drawArea")
      .append("svg")
      .attr("id", "paintCanvasBackground");

    let canvas = d3
      .select("#drawArea")
      .append("canvas")
      .attr("id", "paintCanvas")
      .classed("border", true);

    backgroundGridCanvas.attr("width", canvasSize.width);
    backgroundGridCanvas.attr("height", canvasSize.height);
    canvas.attr("width", canvasSize.width);
    canvas.attr("height", canvasSize.height);

    return true;
  }
}

function drawAreaSize(LEFT, RIGHT) {
  console.log(d3.select("#drawArea").node().offsetWidth)
  return {
    width: d3.select("#drawArea").node().offsetWidth - (LEFT + RIGHT),
    height: d3.select("#drawArea").node().offsetHeight,
  };
}

function clearCanvas(canvas) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// MOUSE POSITION

$("#drawArea").mousemove(function (e) {
  $(".mouse-position-x").html(`X: ${e.pageX - 50}`);
  $(".mouse-position-y").html(`Y: ${e.pageY - 80}`);
});

// DECIDE BEHAVIOR OF APP

$("[data-behavior]").on("click", function () {
  let menuItem = $(this).attr("data-behavior");
  switch (menuItem) {
    case Behavior.CREATE:
      {
        // feetModal();
        createMap();
      }
      break;

    case Behavior.IMPORT:
      {
        importMap();
      }
      break;

    default:
      break;
  }
});

$('[data-menu-item]').on("click", function () {

  let menuItem = $(this).attr('data-menu-item');

  if (menuItem == "save") {
    // SAVE IMAGE LOCALLY
    var canvas = document.getElementById("paintCanvas");
    var image = canvas
      .toDataURL("housemap_by_vastuteq/png", 1.0)
      .replace("housemap_by_vastuteq/png", "image/octet-stream");
    var link = document.createElement("a");
    link.download = "my-image.png";
    link.href = image;
    link.click();

    // CLEARING CANVAS
    clearCanvas(document.getElementById("paintCanvas"));

    swal("Your drawing is exported successfully.", {
      icon: "success",
    });

  } else if (menuItem == "exit") {

    swal({
      title: "Are you sure?",
      text: "Once removed, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDo) => {
      if (willDo) {

        createMapApp = null;
        window.location.href = BASE_URL + '/Main/draw/' + btoa(selectedMapId);
        return true;
      } else {
        return false;
      }
    });
  }

});

document
  .querySelector("input.import-map-file")
  .addEventListener("change", function () {
    var file = document.querySelector("input.import-map-file").files[0];
    $('#drawArea').removeClass('d-none');
    if (
      file.type != "image/jpeg" &&
      file.type != "image/jpg" &&
      file.type != "image/png"
    ) {
      showAlert("Only JPEG,PNG and JPG files are allowed", "danger");
    } else {
      var reader = new FileReader();

      reader.addEventListener(
        "load",
        (e) => {
          let imageData = reader.result;
          let img = new Image();

          img.onload = function () {
            // image  has been loaded

            let size = resizeObject(
              drawAreaSize(0, 250),
              this.width,
              this.height
            );
            let position = centerOfCanvas(
              drawAreaSize(0, 250),
              size.width,
              size.height
            );

            localStorage.removeItem('selectedMapId');
            localStorage.removeItem('houseMaps');
            localStorage.removeItem('objectReport');
            console.log(localStorage.getItem('selectedMapId'));
            let mapId = uniqueID();
            localStorage.setItem("selectedMapId", mapId);
            let houseMap = [];

            let data = {
              name: "map",
              src: img.src,
              x: position.x,
              y: position.y,
              width: size.width,
              height: size.height,
              transform: "abc",
            };
            houseMap.push(data);
            console.log(houseMap);
            localStorage.setItem("houseMaps", JSON.stringify(houseMap));
            console.log(localStorage.getItem('houseMaps'));
            importMapApp = new Vastuteq(mapId, data, BASE_URL);
          };

          img.src = imageData;
        },
        false
      );

      if (file) {
        reader.readAsDataURL(file);
      }
    }
  });

document.querySelector("#drawArea").addEventListener("dragover", (e) => {
  e.preventDefault();
  d3.select("#drawArea").classed("bg-primary", true);
  d3.selectAll(".drawarea-text").classed("d-none", true);
  d3.selectAll(".drop-map").classed("d-none", false);
});

document.querySelector("#drawArea").addEventListener("dragleave", (e) => {
  e.preventDefault();
  d3.select("#drawArea").classed("bg-primary", false);
  d3.selectAll(".drawarea-text").classed("d-none", false);
  d3.selectAll(".drop-map").classed("d-none", true);
});

document.querySelector("#drawArea").addEventListener("drop", (e) => {
  e.preventDefault();

  let that = this;
  let file = e.dataTransfer.files;

  if (file || file[0]) {
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onloadend = function (e) {
      let imageData = e.target.result;
      let img = new Image();

      img.onload = function () {
        // image  has been loaded

        let size = resizeObject(that.canvasSize, this.width, this.height);
        let position = centerOfCanvas(that.canvasSize, size.width, size.height);

        let id = uniqueID();
        localStorage.setItem("selectedMapId", id);

        let data = {
          name: "map",
          src: img.src,
          x: position.x,
          y: position.y,
          width: size.width,
          height: size.height,
          transform: "abc",
        };

        importMapApp = new Vastuteq(id, data, BASE_URL);

        img.src = imageData;
      };
    };
  }
});

// ! FUNCTION TO ALIGN OBJECT INSIDE CANVAS
function centerOfCanvas(canvasSize, width = 0, height = 0) {
  return {
    x: (canvasSize.width - width) / 2,
    y: (canvasSize.height - height) / 2,
  };
}

// ! FUNCTION TO RESIZE IMAGE TO FIT IN CANVAS
function resizeObject(canvasSize, width = 0, height = 0) {
  let imageRatio = width / height;
  let maxHeight = canvasSize.height * 0.8;
  let finalHeight = 0;
  if (height > maxHeight) {
    finalHeight = maxHeight;
  } else {
    finalHeight = height;
  }

  let finalWidth = finalHeight * imageRatio;

  return {
    width: finalWidth,
    height: finalHeight,
  };
}

function uniqueID() {
  return `P-${Math.random().toString(36).slice(2)}`;
}

//For Print
d3.select('#print').on('click', function () {
  window.print();
})

//For REPORT GENERATE

function objectWiseReport() {
  let reportData = JSON.parse(localStorage.getItem('objectReport'));
  let objects = JSON.parse(localStorage.getItem('objects'));
  if (reportData != null && reportData != '') {
    $('#reportModal .modal-body').empty();
    $('#reportModal .modal-dialog').css('min-width', '1150px');
    $('#reportModal .modal-content').css('min-height', '460px');
    $('#reportModal .modal-title').text('Object/Activity Wise Report');
    $('#reportModal .modal-body').attr('id', 'ReportPrintableContent');


    //Add Print Button
    $('#reportModal .modal-body').
      append(`<div style="position:relative">
              <button class="btn btn-outline-primary btn-sm text-sm pl-3 pr-3" id="rPrint" style="position:absolute;right:60px;top:-49px">Print</button>
            </div>`)


    //Creating Report table
    $('#reportModal .modal-body').append('<div id="rtable"></div>')
    let reportTable = `<table class="table table-bordered table-hover mt-2">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Object/Activity Name</th>
                            <th scope="col">Direction</th>
                            <th scope="col">Type</th> 
                            <th scope="col">Object Colour</th>
                            <th scope="col">Recommended Colour</th>        
                          </tr>
                        </thead>
                        <tbody>`
    let count = 1;
    for (let data of reportData) {
      let type = '';
      objects.map(object => object.image.id == data.id ?
        type = object.image.type
        : object)
      let keys = Object.keys(data)
      for (let i = 2; i < keys.length; i++) {
        if (keys[i] != 'color' && keys[i] != 'recommendedColor') {
          reportTable += `<tr>
                          <th scope="row">${count++}</th>
                          <td>${data.name}</td>
                          <td>${keys[i]}</td>      
                          <td>${type}</td> 
                          <td>${data.color != undefined ? data.color : ""}</td>
                          <td>${data.recommendedColor != undefined ? data.recommendedColor : ""}</td>
                        </tr>`
        }
      }
    }
    reportTable += `</tbody></table>`
    //appending table to modal body
    $('#rtable').html(reportTable)
    //adding text area after report table for custom report
    $('#reportModal .modal-body').
      append(`<div class="form-group">
              <label for="exampleFormControlTextarea1">Recommendation</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>`)
    //Show modal
    $('#reportModal').modal('show')
  }
  else {
    showAlert('Add objects and then Select the grid Before generate the report', 'danger')
  }
}

function zoneWiseReport() {
  let reportData = JSON.parse(localStorage.getItem('objectReport'));
  let objects = JSON.parse(localStorage.getItem('objects'));
  if (reportData != null && reportData != '') {
    $('#reportModal .modal-body').empty();
    $('#reportModal .modal-dialog').css('min-width', '1150px');
    $('#reportModal .modal-content').css('min-height', '460px');
    $('#reportModal .modal-title').text('Zone Wise Report');
    $('#reportModal .modal-body').attr('id', 'ReportPrintableContent');


    //Add Print Button
    $('#reportModal .modal-body').append(`<div style="position:relative">
                                          <button class="btn btn-outline-primary btn-sm text-sm pl-3 pr-3" id="rPrint" style="position:absolute;right:60px;top:-49px">Print</button>
                                          </div>`)
    //create table for report showing
    $('#reportModal .modal-body').append('<div id="rtable"></div>')
    let div = localStorage.getItem('reportDivision')
    if (div == null || div == "") {
      div = 8;
    }
    console.log(div)
    let modal = new Modal()
    let directions = modal.getDivData(div)


    let reportTable = `<table class="table table-bordered table-hover mt-2">
                     <thead>
                     <tr>
                     <th scope="col">#</th>
                     <th scope="col">Directions</th>
                     <th scope="col">Objects</th>
                     <th scope="col">Activities</th>
                     </tr>
                 </thead>
                 <tbody>`
    let count = 1;
    for (let data of directions) {
      reportTable += `<tr>
                    <th scope="row">${count++}</th>
                    <td>${data.name}</td>
                    <td class="${data.name}">`
      for (let dData of reportData) {
        let keys = Object.keys(dData)
        let type = '';
        objects.map(object => object.image.id == dData.id ?
          type = object.image.type
          : object)

        for (let i = 2; i < keys.length; i++) {
          if (keys[i] == data.name && type == 'object') {
            reportTable += dData.name + ',';
          }
        }
      }
      reportTable += `</td><td class="${data.name}1">`
      for (let dData of reportData) {
        let keys = Object.keys(dData)
        let type = '';
        objects.map(object => object.image.id == dData.id ?
          type = object.image.type
          : object)

        for (let i = 2; i < keys.length; i++) {
          if (keys[i] == data.name && type == 'activity') {
            reportTable += dData.name + ',';
          }
        }
      }

      reportTable += `</td></tr>`
    }
    reportTable += `</tbody></table>`
    //Append report table to modal body  
    $('#rtable').html(reportTable)
    //Append text area after report table for any custom information
    $('#reportModal .modal-body').
      append(`<div class="form-group">
              <label for="exampleFormControlTextarea1">Recommendation</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>`)

    //Remove last comma from Report table td
    for (let data of directions) {
      let txt = $(`.${data.name}`).text().replace(/,\s*$/, "");
      let txt1 = $(`.${data.name}1`).text().replace(/,\s*$/, "");
      $(`.${data.name}`).text(txt);
      $(`.${data.name}1`).text(txt1);
    }
    //Show report Modal
    $('#reportModal').modal('show')
  } else {
    showAlert('Add objects and then Select the grid Before generate the report', 'danger')
  }
}

function setObjColor() {
  let reportData = JSON.parse(localStorage.getItem('objectReport'));
  let objects = JSON.parse(localStorage.getItem('objects'));
  if (reportData != null && reportData != '') {
    $('#reportModal .modal-body').empty();
    $('#reportModal .modal-dialog').css('min-width', '1150px');
    $('#reportModal .modal-content').css('min-height', '460px');
    $('#reportModal .modal-title').text('Set object colour');
    $('#reportModal .modal-body').attr('id', 'setObjColor');



    //creating object color selection box
    let objColor = `<div class="form-group">
                  <select class="form-control objColor" >
                    <option>Red</option>
                    <option>Blue</option>
                    <option>Green</option>
                    <option>Orange</option>
                    <option>Black</option>
                  </select>
                </div>`

    //Creating Report table
    $('#reportModal .modal-body').append('<div id="rtable"></div>')
    let reportTable = `<table id="colorTable" class="table table-bordered table-hover mt-2">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Object/Activity Name</th>                            
                            <th scope="col">Type</th> 
                            <th scope="col">Object Colour</th>
                            <th scope="col">Recommended Colour</th>        
                          </tr>
                        </thead>
                        <tbody>`
    let count = 1;
    for (let data of reportData) {
      let type = '';
      objects.map(object => object.image.id == data.id ?
        type = object.image.type
        : object)

      reportTable += `<tr>
                          <th scope="row">${count++}</th>
                          <td>${data.name}</td>                              
                          <td>${type}</td> 
                          <td>${objColor}</td>
                          <td>${objColor}</td>
                        </tr>`
    }

    reportTable += `</tbody></table>`
    //appending table to modal body
    $('#rtable').html(reportTable)
    $('#rtable').append(`<button class="btn btn-primary" id="setColor" data-dismiss="modal" aria-label="Close" style="float:right">Set</button>`)

    //Show modal
    $('#reportModal').modal('show')
  }
  else {
    showAlert('Sorry, There is no object please add object first', 'danger')
  }
}

$('#inlineRadio1').on('click', function () {
  objectWiseReport()

})

$('#inlineRadio2').on('click', function () {
  zoneWiseReport()

})

$('#objColor').on('click', function () {
  setObjColor()

})

$('#reportModal').on('click', '#setColor', function () {

  //creating report data with color
  let colorArr = [];
  let newReportData = [];
  let reportData = JSON.parse(localStorage.getItem('objectReport'));
  $('#reportModal #rtable table tbody tr').each(function () {
    let name = $(this).find('td:eq(0)').html();
    let color = $(this).find('td:eq(2)').find('option:selected').html();
    let recomColor = $(this).find('td:eq(3)').find('option:selected').html();
    colorArr.push({ name: name, color: color, recommendedColor: recomColor });
  });
  for (let i = 0; i < colorArr.length; i++) {
    newReportData.push($.extend({}, reportData[i], colorArr[i]));
  }

  console.log(newReportData)
  //update data in localstorage
  localStorage.removeItem('objectReport')
  localStorage.setItem('objectReport', JSON.stringify(newReportData))

  //update Report data in database
  console.log(localStorage.getItem('selectedMapId'))
  var formData = new FormData();
  formData.append('id', localStorage.getItem('selectedMapId'));
  formData.append('reportData', JSON.stringify(newReportData));
  var url = BASE_URL + "/Main/updateReportData";
  AjaxPost(formData, url, updateReportDatasuccess, AjaxError);

  function updateReportDatasuccess(content, targetTextarea) {
    var result = JSON.parse(content);
    showAlert(result[1], result[0]);
  }

})

$('#reportModal').on('click', '#rPrint', () => {
  $('#drawArea').css('display', 'none');
  window.print();
  $('#drawArea').css('display', 'flex');
});

function feetModal() {
  $('#reportModal .modal-body').empty();
  $('#reportModal .modal-dialog').css('max-width', '470px');
  $('#reportModal .modal-content').css('min-height', '200px');
  $('#reportModal .modal-title').text('Select Draw Area size');
  $('#reportModal .modal-body').attr('id', 'feetModal');

  let html = `<div class="row" style="margin:0">
                <div class="form-group col-sm-6">
                  <label for="text">Enter Width</label>
                  <input type="number" class="form-control" id="text">                  
                </div>
                <div class="form-group col-sm-6">
                  <label for="unit">Select Unit</label>
                  <select class="form-control" id="unit">
                    <option>feet</option>
                    <option>meter</option>                    
                  </select>
                </div>
                <div class="col-sm-12">
                <button class="btn btn-primary" id="feetSubmit" style="float:right">OK</button>
                </div>
              </div>`

  $('#reportModal .modal-body').html(html)
  $('#reportModal').modal('show')
}

$('#reportModal .modal-body').on('click', '#feetSubmit', function () {
  let val = $("#text").val();
  let unit = $("#unit").val();
  if (val == '') {
    showAlert('Please enter width', 'danger')
    // $("#text").focus
    // return false;
  } else {
    $('#reportModal').modal('hide')
    let item = { value: val, unit: unit }
    createMap(item);
  }
})

$('.savebtn').on('click', function () {
  let model = new Model();
  let mapId = localStorage.getItem('selectedMapId');
  let houseMap = model.getHouseMap(mapId);
  model.updateHouseMapInDataBase(mapId, houseMap, '', 'true');
})

$('#clientName').on('keyup', function () {
  let value = $(this).val();


  var formData = new FormData();
  formData.append('value', value);
  var url = BASE_URL + "/Main/getClientDetails";
  AjaxPost(formData, url, clientSuccess, AjaxError);

  function clientSuccess(content, targetTextarea) {
    var result = JSON.parse(content);

    if (result != "") {
      // console.log(result)
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

$('#clients').on('click', 'a', function () {
  let data = $(this).text().split(',');
  $("input[name='cName']").val(data[0]);
  $("#mNumber").val(data[1]);
  $("input[name='cEmail']").val(data[2]);
  $("textarea[name='cAddress']").focus();
  $('#clients').addClass('d-none')
});

$("input").on('click', function () {
  $('#clients').addClass('d-none')
});


$('input[type="submit"]').on('click', function (e) {
  e.preventDefault();
  var formData = new FormData(document.getElementById('cpDetails'));
  var url = BASE_URL + "/Main/addProperty";
  AjaxPost(formData, url, detailsSuccess, AjaxError);
  function detailsSuccess(content, targetTextarea) {
    var result = JSON.parse(content);
    if (result != "" && result.type == 'success') {
      $('.client-form .card').addClass('card-form');
      $('.client-form .card-header').removeClass('bg-primary');
      $('.client-form .modal-title').removeClass('text-white');
      $('.client-form .card-body .form-group').removeClass('col-md-3');
      $('.client-form .card-body .form-group').addClass('col-md-6 row m-0 form-border');
      $('.client-form .card-body .form-group label').addClass('col-md-6 text-info');
      $('.client-form .card-body .form-group input').addClass('col-md-6');
      $('.client-form .card-body .form-group textarea').addClass('col-md-6');
      $('.client-form .card-body .form-group select').addClass('col-md-6');
      $('.client-form input').attr('disabled', 'true');
      $('textarea').attr('disabled', 'true');
      $('select').attr('disabled', 'true');
      $('.client-form input').addClass('input-disable');
      $('textarea').addClass('input-disable');
      $('textarea').attr('rows','1');
      $('select').addClass('input-disable');
      $('[data-behavior="import"]').removeClass('d-none');
      $('input[value="Save Info"]').addClass('d-none');

    } else {
      showAlert(result.error, 'danger');
    }
  }

});

$(document).ready(function () {
  $('[data-behavior="import"]').on('click', function (e) {
    e.preventDefault();

    // $('.client-form').addClass('d-none');
    // $('[data-behavior="import"]').trigger('click');
    // importMap()
  })

  $('#category').change(function () {
    let value = $('option:selected').val()
    let id = $('option:selected').attr('tId')
    if (value == '') {
      showAlert('Please select any category')
    } else {
      var formData = new FormData();
      formData.append('id', id);
      var url = BASE_URL + "/Main/getType";


      AjaxPost(formData, url, typeSuccess, AjaxError);
    }
  });
  function typeSuccess(content, targetTextarea) {
    var result = JSON.parse(content);
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

  $('.fObject').on('mouseover',function(){    
    $(this).siblings().removeClass('d-none');
  })
})



