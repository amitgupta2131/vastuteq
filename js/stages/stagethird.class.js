import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js';
import editText from '../EditText.class.js'
import Utility from "../helper/utility.class.js";
import ObjectModel from "../helper/objectmodel.class.js";
import Assist from "../helper/assist.class.js";

export default class StageThird {

  constructor(attribute) {
    this.attribute = attribute;
    this.actionbox = new ActionBox();
  }

  startDrawing(REF) {
    let that = REF;
    let classRef = this;

    $('#pills-object-tab').removeClass('disabled');

    let actionBox = this.actionbox.clear().get();

    // d3.select('[data-menu-item="vpm"]').classed('active', true);
    // d3.select('[data-menu-item="mvpc"]').classed('active', true);

    let actionText = actionBox
      .append("p")
      .attr("class", "text-uppercase text-sm actionbox-text")
      .text("");



    //Adding radio buttons
    this.actionBox = this.actionbox.clear().get();

    this.actionBody = this.actionBox.append('div')
      .attr('class', 'row actionbox-body')
      .style('margin', '0px');

    this.actionsdiv = this.actionBody.append('div')
      .attr('class', 'form-check mb-3').style('margin-left', 'auto');


    this.actionBtnVedic = this.actionsdiv.append('input')
      .attr('class', 'form-check-input text-sm')
      .attr('type', 'radio')
      .attr('name', 'vedic')
      .attr('id', 'vedicRadio')
      .attr('value', 'vedic');
    this.actionLabelVedic = this.actionsdiv.append('label')
      .attr('class', 'form-check-label text-sm')
      .attr('for', 'vedicRadio')
      .html('Vedic');


    this.actionsdiv2 = this.actionBody.append('div')
      .attr('class', 'form-check').style('margin-left', '8px').style('margin-right', 'auto');;


    this.actionBtnmahavastu = this.actionsdiv2.append('input')
      .attr('class', 'form-check-input')
      .attr('type', 'radio')
      .attr('name', 'mahavastu')
      .attr('id', 'mahavastuRadio')
      .attr('value', 'mahavastu')
      .attr('checked', true);
    this.actionLabelMahavastu = this.actionsdiv2.append('label')
      .attr('class', 'form-check-label text-sm')
      .attr('for', 'mahavastuRadio')
      .html('Mahavastu');

    $('input[type="radio"]').on('click', function () {

      let value = $(this).val();
      if (value == 'vedic') {
        that.centroid = Utility.getVedicCenteroid(that.vedicMapBoundariesCoords);
        removeToolsImages();
        let objName = localStorage.getItem('vedicImgObj');
        that.objectDelete(objName);
        that.model.editType(that.mapId, 'vedic');
        that.model.editCentroid(that.mapId, that.centroid) 
        that._stage = 3;
        that.vedicStart()
      } else {

        that.centroid = Utility.getCentroid(that.mapBoundariesCoords);
        that._stage = 3;
        that.start()
      }
    })


    let actionBody = actionBox
      .append("div")
      .attr("class", "form-row actionbox-body");

    let faceSelectbox = actionBody.append('div').attr('class', 'col-md-6')
      .append("select").attr('name', 'select-face').attr("class", "form-control form-control-sm text-sm");
    faceSelectbox.append('option').html('select Face');

    let face = localStorage.getItem("face");

    for (let i = 0; i < that.mapBoundariesCoords.length; i++) {
      let j = i < that.mapBoundariesCoords.length - 1 ? i + 1 : 0;
      let optionText = `Wall P${i} - P${j}`;

      if (face.trim().toLowerCase() == optionText.trim().toLowerCase()) {
        faceSelectbox.append("option").attr("value", [
          that.mapBoundariesCoords[i],
          that.mapBoundariesCoords[j],
        ]).attr('selected', 'selected')
          .text(optionText);
      } else {
        faceSelectbox.append("option").attr("value", [
          that.mapBoundariesCoords[i],
          that.mapBoundariesCoords[j],
        ])
          .text(optionText);

      }

    }

    let gridSelectbox = actionBody.append('div').attr('class', 'col-md-6')
      .append("select").attr('name', 'select-grid').attr("class", "form-control form-control-sm text-sm")
      .html(
        `<option value="" selected>Select Grid</option>
        <option value="8">8 Division</option>
        <option value="16">16 Division</option>
        <option value="32">32 Division</option>
        `
      );

    let angleInputbox = actionBody.append('div').attr('class', 'col-md-6')
      .append("input").attr("class", "mt-2 form-control form-control-sm text-sm")
      .attr('name', 'angleInputbox').attr('type', 'number').attr('placeholder', 'Degree').attr('value', Math.abs(that.angle));

    let degreeUpdateBtn = actionBody.append('div').attr('class', 'col-md-6')
      .append("button").attr("class", "mt-2 form-control form-control-sm text-sm")
      .text('Update');

    let container = actionBox.append('div').attr('class', 'form-row justify-content-between p-2');

    let barchartContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .attr('data-action-object', 'barchart').attr('data-toggle', 'modal').attr('data-target', '#appModal')
      .style('flex-direction', 'column').style('height', '42px').style('min-width', '55px');
    let barchart = barchartContainer.append('img').attr('src', `${that.BASE_URL}assets/icons/barchart.svg`).attr('width', 20);
    barchartContainer.append('span').style('margin-top', '1px').style('font-size', '9px').text('barchart');


    let divisonOfDevtasContainer = container.append('div').attr('class', 'col-md-8 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction', 'column').style('height', '42px').style('min-width', '55px');
    let divisonOfDevtas = divisonOfDevtasContainer.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/dots.svg`).attr('width', 20);
    divisonOfDevtasContainer.append('span').style('margin-top', '1px').style('font-size', '9px').text('division of devtas');

    let addText = container.append('div').attr('class', 'mt-2 col-md-2 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction', 'column').style('height', '42px').style('min-width', '55px');

    let addTextIcon = addText.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/text.svg`).attr('width', 20);
    addText.append('span').style('margin-top', '1px').style('font-size', '9px').text('Add Text');

    faceSelectbox.on("change", function () {

      let str = d3.select(this).node().value.split(',');
      let pointA = [parseInt(str[0]), parseInt(str[1])];
      let pointB = [parseInt(str[2]), parseInt(str[3])];
      let face = $('select[name = "select-face"] option:selected').text()
      // console.log(face)
      that.model.editFaceWall(that.mapId, face);
      that.faceCoords = [pointA, pointB];
      that.model.editFaceCoords(that.mapId, [pointA, pointB]);

      let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
      that.angle = -theta;
      that.model.editDegree(that.mapId, angleInputbox.property('value'));

      // that.start();
      that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle,);
      that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
      that.assist.drawBoundaries({ layer: that.canvas, points: that.mapBoundariesCoords });
      that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
      that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
      that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle,);
      d3.select(".facing-degree").text(`${Math.abs(theta)}°`);
      that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(), that.centroid, that.screenBoundariesCoords, that.division);
      that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle() + that.angle, that.centroid, that.mapBoundariesCoords, that.division);
      that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

      // ? DRAW BAR CHART
      that.modal.drawMap({ areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints });


    })

    gridSelectbox.on("change", function () {
      let division = d3.select(this).property('value');
      that.division = division;
      if (division != "") {
        // that.start();
        that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle);
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawBoundaries({ layer: that.canvas, points: that.mapBoundariesCoords });
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
        that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);

        that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(), that.centroid, that.screenBoundariesCoords, that.division);
        that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle() + that.angle, that.centroid, that.mapBoundariesCoords, that.division);
        that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

        // ? DRAW BAR CHART
        that.modal.drawMap({ areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints });
        Utility.getObjectDirection(that.calNorthAngle(), that.centroid, that.angle, that.mapBoundariesCoords, that.division)
      } else {
        showAlert('Please select any grid', 'danger')
      }
    })

    $('[data-object-item]').on('click', function () {
      // alert('hello');
      Utility.getObjectDirection(that.calNorthAngle(), that.centroid, that.angle, that.mapBoundariesCoords, 8)

    })


    addText.on("click", function () {

      let data = {
        name: 'Edit Text',
        src: '',
        width: 200,
        height: 200,
        x: that.centroid.x - 200 / 2,
        y: that.centroid.y - 200 / 2,
        transfrom: "",
        northAngle: that.calNorthAngle(),
        angle: that.angle,
        type: 'editText'
      }
      let obj = new editText({
        layer: that.canvas,
        data: data
      });


    })



    degreeUpdateBtn.on("click", function () {

      let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
      that.angle = -theta;
      that.model.editDegree(that.mapId, angleInputbox.property('value'));
      d3.select(".facing-degree").text(`${Math.abs(theta)}°`);

      // that.start();
      that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle);
      that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
      that.assist.drawBoundaries({ layer: that.canvas, points: that.mapBoundariesCoords });
      that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
      that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
      that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);

      that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(), that.centroid, that.screenBoundariesCoords, that.division);
      that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle() + that.angle, that.centroid, that.mapBoundariesCoords, that.division);
      that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

      // for(let i in that.mapPolygonsArray){
      //   for(let j in that.mapPolygonsArray[i])
      //   that.secondLayer.append('polygon').attr('points',that.mapPolygonsArray[i][j]).style('fill-opacity','0').style('stroke','green').style('stroke-width','5');
      // }

      // ? DRAW BAR CHART
      that.modal.drawMap({ areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints });
    })




    let html = `<a class="nav-link text-dark menu-item" href="#" id="fixed" role="button">
    Fixed Tools
  </a>  
  <a class="nav-link text-dark menu-item" href="#" id="floating" role="button">
    Floating Tools
  </a>  
  <div class="dropdown-menu"  id="fixedToolMenu" style="background:#e1dfdf">
  <a class="dropdown-item" type='fixed' href="#" value="VPM" id="vpm">Vpm</a>
  <a class="dropdown-item" type='fixed' href="#" value="MVPC" id="mvpc">Shakti Chakra</a>
  <a class="dropdown-item" type='fixed' href="#" value="MVC" id="mvc">Maha Vastu Chakra</a>
</div> 

<div class="dropdown-menu"  id="floatingToolMenu">
<a class="dropdown-item" href="#" value="VPM" id="vpm">Vpm</a>
<a class="dropdown-item" href="#" value="MVPC" id="mvpc">Shakti Chakra</a>
<a class="dropdown-item" href="#" value="MVC" id="mvc">Maha Vastu Chakra</a>
</div> `;

    let mapGridType = $('#toolMenu').html(html);

    mapGridType.on('mouseover', '#fixed', function () {
      $('#fixedToolMenu').removeClass('dropdown-menu')
      $('#fixedToolMenu').addClass('dropdown-menu-show')
      $('#floatingToolMenu').removeClass('dropdown-menu-show')
      $('#floatingToolMenu').addClass('dropdown-menu')
    });

    mapGridType.on('mouseover', '#floating', function () {
      // alert('hello')
      $('#floatingToolMenu').removeClass('dropdown-menu')
      $('#floatingToolMenu').addClass('dropdown-menu-show')
      $('#fixedToolMenu').removeClass('dropdown-menu-show')
      $('#fixedToolMenu').addClass('dropdown-menu')

    });


    mapGridType.on('click', 'a', function () {

      let gridType = $(this).attr('value');

      //toggling fixed and floating menu
      $('#fixedToolMenu').addClass('dropdown-menu')
      $('#fixedToolMenu').removeClass('dropdown-menu-show')
      $('#floatingToolMenu').removeClass('dropdown-menu-show')
      $('#floatingToolMenu').addClass('dropdown-menu')

      let objType = $(this).attr('type');



      let wrapper = $(`g.sjx-svg-wrapper`).remove();
      //remove grid
      $('g.vedic-polygon').remove();

      //remove vedic image
      let imgName = localStorage.getItem('vedicImgObj')
      if (imgName != null || imgName != '') {
        that.objectDelete(imgName);
        that.objectVpm = null
        localStorage.removeItem('vedicImgObj')
        d3.select('.properties-section.opacity').classed('d-none', true);
      }

      switch (gridType) {
        case "VPM":
          drawMahavastuImages('VPM', 'vpm.svg');
          break;

        case "MVPC":
          drawMahavastuImages('MVPC', 'MVPC.svg');
          break;

        case "MVC":
          drawMahavastuImages('MVC', 'mvc.png');
          break;
        default:          
          break;
      }

      function drawMahavastuImages(objName, objImageSrc, object) {
        localStorage.setItem('vedicImgObj', objName)
        if (that.objectVpm == null || that.objectVpm == undefined) {

          d3.select('.properties-section.opacity').classed('d-none', false);
          d3.select(objName.parentNode).classed('active', true);
          that.model.editVpmtoggle(that.mapId, true);

          let data = {
            name: objName,
            src: that.BASE_URL + 'assets/images/' + objImageSrc,
            width: 400,
            height: 400,
            x: that.centroid.x - 400 / 2,
            y: that.centroid.y - 400 / 2,
            transfrom: "",
            northAngle: that.calNorthAngle(),
            angle: that.angle,
            type: objType
          }
          that.objectVpm = new Object({
            layer: that.canvas,
            data: data
          });

        } else {

          that.objectDelete(objName);
          that.objectVpm = null
          localStorage.removeItem('vedicImgObj')
          d3.select('.properties-section.opacity').classed('d-none', true);

        }

        if (that.objectVpm == null || that.objectVpm == undefined) {
          d3.select(objName.parentNode).classed('active', false);
        }

      }

      //delete tools images
      $('.object-delete-toggle').on('click', function () {
        // alert('hello')
        let imgName = localStorage.getItem('vedicImgObj')
        if (imgName != null || imgName != '') {
          that.objectDelete(imgName);
          that.objectVpm = null
          localStorage.removeItem('vedicImgObj')
          d3.select('.properties-section.opacity').classed('d-none', true);
        }
      })
      // that.vedic.startDrawing(that);
      //   that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: gridType});
    })

    // let vpm = $('#vpm')


    // vpm.on('click', function () {

    //   if (classRef.objectVpm == null || classRef.objectVpm == undefined) {
    //     d3.select('.properties-section.opacity').classed('d-none', false);
    //     d3.select(this.parentNode).classed('active', true);
    //     that.model.editVpmtoggle(that.mapId, true);
    //     let data = {
    //       name: "VPM",
    //       src: that.BASE_URL + 'assets/images/vpm.svg',
    //       width: 400,
    //       height: 400,
    //       x: that.centroid.x - 400 / 2,
    //       y: that.centroid.y - 400 / 2,
    //       transfrom: "",
    //       northAngle: that.calNorthAngle(),
    //       angle: that.angle
    //     }
    //     console.log(this)
    //     console.log(that.canvas)
    //     classRef.objectVpm = new Object({
    //       layer: that.canvas,
    //       data: data
    //     });
    //   } else {
    //     that.objectDelete('VPM');
    //     classRef.objectVpm = null;
    //     d3.select('.properties-section.opacity').classed('d-none', true);
    //   }

    //   if (classRef.objectVpm == null || classRef.objectVpm == undefined)
    //     d3.select(this.parentNode).classed('active', false);

    // })

    // let mvm = $('#mvpc')

    // mvm.on('click', function () {
    //   if (classRef.objectMvm == null || classRef.objectMvm == undefined) {
    //     d3.select('.color-state-wrapper').classed('d-none', false);
    //     d3.select('.properties-section.opacity').classed('d-none', false);
    //     d3.select(this.parentNode).classed('active', true);
    //     that.model.editMvpctoggle(that.mapId, true);
    //     let data = {
    //       name: "MVM",
    //       src: that.BASE_URL + 'assets/images/MVPC.svg',
    //       width: 400,
    //       height: 400,
    //       x: that.centroid.x - 400 / 2,
    //       y: that.centroid.y - 400 / 2,
    //       transfrom: "",
    //     }
    //     classRef.objectMvm = new Object({
    //       layer: that.canvas,
    //       data: data
    //     });
    //   } else {
    //     d3.select('.color-state-wrapper').classed('d-none', true);
    //     that.objectDelete('MVM');
    //     classRef.objectMvm = null;
    //     d3.select('.properties-section.opacity').classed('d-none', true);
    //   }

    //   if (classRef.objectMvm == null || classRef.objectMvm == undefined)
    //     d3.select(this.parentNode).classed('active', false);

    // })

    // let mvc = $('#mvc')

    // mvc.on('click', function () {

    //   if (classRef.objectMVC == null || classRef.objectMVC == undefined) {
    //     d3.select('.properties-section.opacity').classed('d-none', false);
    //     d3.select(this.parentNode).classed('active', true);
    //     that.model.editVpmtoggle(that.mapId, true);
    //     let data = {
    //       name: "MVC",
    //       src: that.BASE_URL + 'assets/images/mvc.png',
    //       width: 400,
    //       height: 400,
    //       x: that.centroid.x - 400 / 2,
    //       y: that.centroid.y - 400 / 2,
    //       transfrom: "",
    //       northAngle: that.calNorthAngle(),
    //       angle: that.angle
    //     }
    //     console.log(this)
    //     console.log(that.canvas)
    //     classRef.objectMVC = new Object({
    //       layer: that.canvas,
    //       data: data
    //     });
    //   } else {
    //     that.objectDelete('MVC');
    //     classRef.objectMVC = null;
    //     d3.select('.properties-section.opacity').classed('d-none', true);
    //   }

    //   if (classRef.objectMVC == null || classRef.objectMVC == undefined)
    //     d3.select(this.parentNode).classed('active', false);

    // });


    //delete tools images
    $('.object-delete-toggle').on('click', function () {
      // alert('hello')
      removeToolsImages()
    });

    function removeToolsImages() {
      if (classRef.objectVpm != null || classRef.objectVpm != undefined) {
        that.objectDelete('VPM');
        classRef.objectVpm = null;
        d3.select('.properties-section.opacity').classed('d-none', true);
      }
      if (classRef.objectMvm != null || classRef.objectMvm != undefined) {
        that.objectDelete('MVM');
        classRef.objectMvm = null;
        d3.select('.properties-section.opacity').classed('d-none', true);
      }
      if (classRef.objectMVC != null || classRef.objectMVC != undefined) {
        that.objectDelete('MVC');
        classRef.objectMVC = null;
        d3.select('.properties-section.opacity').classed('d-none', true);
      }
    }

    divisonOfDevtasContainer.on('click', function () {
      console.log(d3.select(this).classed('active'), 'working');
      if (d3.select(this).classed('active') == false) {
        console.log('in');
        if (d3.polygonContains(that.mapBoundariesCoords, [that.centroid.x, that.centroid.y])) {
          console.log('in');
          d3.select(this).classed('active', true);
          that.assist.drawDivisionOfDevtas(that.angle, that.canvas, that.mapBoundariesCoords, that.faceCoords, that.centroid);
        } else {
          alert("Software does not cater for this requirement currently");
        }
      } else {
        d3.select(this).classed('active', false);
        that.assist.drawDivisionOfDevtas(that.angle, that.canvas, that.mapBoundariesCoords, that.faceCoords, that.centroid, false);
      }
    })


    this.actionbox.show();

    //Removing object/activity
    $('body').on('click', '.remove', function () {

      let objects = JSON.parse(localStorage.getItem('objects'));
      let objReport = JSON.parse(localStorage.getItem('objectReport'));
      let objid = localStorage.getItem('selectedMapId');
      let newObj = [];
      let newObjReport = [];
      let id = $(this).attr('obj-id');
      let name = $(this).attr('obj-name');

      // deleting object from array
      var filteredObj = objects.find(function (item, i) {
        let index = '';
        if (item.image.id == id) {
          delete objects[i];
          delete objReport[i];
        }
        return index;
      });

      //create new object array after deleting element
      objects.forEach(element => {
        newObj.push(element)
      });

      objReport.forEach(element => {
        newObjReport.push(element)
      });


      //removing old objects and adding new objects in localstorage
      localStorage.removeItem('objects');
      localStorage.setItem('objects', JSON.stringify(newObj))
      localStorage.removeItem('objectReport');
      localStorage.setItem('objectReport', JSON.stringify(newObjReport))


      //Updating new object array in database
      let objHandler = new ObjectModel()
      let result = objHandler.updateObjectsInDataBase(objid);

      var formData = new FormData();
      formData.append('id', objid);
      formData.append('reportData', JSON.stringify(newObjReport));
      var url = BASE_URL + "/Main/updateReportData";
      AjaxPost(formData, url, updateReportDatasuccess, AjaxError);

      function updateReportDatasuccess(content, targetTextarea) {
        var result = JSON.parse(content);
        if (result[0] == 'success') {
          //Removing object from map
          $(`.svg-object[data-object="${name}"]`).remove();
          $(`.sjx-svg-wrapper[data-id="${id}]"`).remove();

          showAlert('Item Removed', 'success');
        }
      }


    })

  }

}