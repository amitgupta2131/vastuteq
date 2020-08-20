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
  d3.select(".toolbox.right").classed("d-none", false);
  d3.select(".toolbox.left").classed("d-none", false);
  d3.select(".mousePos").classed("d-none", false);
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

  canvasRuler = new ruler({
    container: document.querySelector("#canvasArea"),
  });

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
  if(reportData != null){
  $('#reportModal .modal-body').empty();
  $('#reportModal .modal-dialog').css('min-width', '1150px');
  $('#reportModal .modal-content').css('min-height', '460px');
  $('#reportModal .modal-title').text('Object Wise Report');
  $('#reportModal .modal-body').attr('id', 'ReportPrintableContent');  
  

//Add Print Button
  $('#reportModal .modal-body').append(`<div style="position:relative">
  <button class="btn btn-outline-primary btn-sm text-sm pl-3 pr-3" id="rPrint" style="position:absolute;right:60px;top:-49px">Print</button>
  </div>`) 

  $('#reportModal .modal-body').append('<div id="rtable"></div>')
  let reportTable = `<table class="table table-bordered table-hover mt-2">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Object Name</th>
      <th scope="col">Object Direction</th>
      
    </tr>
  </thead>
  <tbody>`
  let count = 1;
  for (let data of reportData) {
    let keys = Object.keys(data)
    // console.log(keys)
    for (let i = 2; i < keys.length; i++) {
      reportTable += `<tr>
      <th scope="row">${count++}</th>
      <td>${data.name}</td>
      <td>${keys[i]}</td>      
      
    </tr>`
    }
  }
  reportTable += `</tbody>
</table>`
  $('#rtable').html(reportTable)   
  $('#reportModal .modal-body').append(`<div class="form-group">
  <label for="exampleFormControlTextarea1">Recommendation</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>`) 
  $('#reportModal').modal('show')
}
else{
  showAlert('Select the grid first','danger')
}
}

function zoneWiseReport() {
  let reportData = JSON.parse(localStorage.getItem('objectReport'));  
  if(reportData != null){
  $('#reportModal .modal-body').empty();
  $('#reportModal .modal-dialog').css('min-width', '1150px');
  $('#reportModal .modal-content').css('min-height', '460px');
  $('#reportModal .modal-title').text('Zone Wise Report');
  $('#reportModal .modal-body').attr('id', 'ReportPrintableContent');
  

//Add Print Button
$('#reportModal .modal-body').append(`<div style="position:relative">
<button class="btn btn-outline-primary btn-sm text-sm pl-3 pr-3" id="rPrint" style="position:absolute;right:60px;top:-49px">Print</button>
</div>`) 

$('#reportModal .modal-body').append('<div id="rtable"></div>')
  let div = localStorage.getItem('reportDivision');
  let modal = new Modal()
  let directions = modal.getDivData(div)
  

  let reportTable = `<table class="table table-bordered table-hover mt-2">
                     <thead>
                     <tr>
                     <th scope="col">#</th>
                     <th scope="col">Directions</th>
                     <th scope="col">Objects</th>
                     </tr>
                 </thead>
                 <tbody>`
  let count = 1;
  for (let data of directions) {

    reportTable += `<tr >
        <th scope="row">${count++}</th>
        <td>${data.name}</td><td id="${data.name}">`
    for (let dData of reportData) {
      let keys = Object.keys(dData)
      // console.log(dData);
      // console.log(keys)
      for (let i = 2; i < keys.length; i++) {
        if (keys[i] == data.name) {
          reportTable += dData.name + ','
          reportTable.replace(/,\s*$/, "");
        }
      }

     

    }
    reportTable += `</td></tr>`
    console.log($(`#reportModal .modal-body #rtable #${data.name}`).html());
  }

  for (let data of directions) {
    console.log(data.name)
    console.log($(`#${data.name}`).attr('id'))
  }
  reportTable += `</tbody>
</table>`
  $('#rtable').html(reportTable)
  $('#reportModal .modal-body').append(`<div class="form-group">
  <label for="exampleFormControlTextarea1">Recommendation</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
</div>`) 
  $('#reportModal').modal('show')
}else{
  showAlert('Select the grid first','danger')
}
}

$('#inlineRadio1').on('click', function () {
  objectWiseReport()

})

$('#inlineRadio2').on('click', function () {
  zoneWiseReport()

})

$('#reportModal').on('click', '#rPrint', () => {
  $('#drawArea').css('display', 'none');  
  window.print();  
  $('#drawArea').css('display', 'flex');
})

