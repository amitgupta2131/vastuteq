import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js';
import editText from '../EditText.class.js'
import Utility from "../helper/utility.class.js";
import ObjectModel from "../helper/objectmodel.class.js";
import EditTextModel from "../helper/editTextModel.class.js";
import Assist from "../helper/assist.class.js";

export default class StageThird {

  constructor(attribute) {
    this.attribute = attribute;
    this.actionbox = new ActionBox();
    d3.select('.properties-section.opacity').classed('d-none', true);
    $('.svg-inline--fa.fa-trash').removeClass('d-none');
    $('.svg-inline--fa.fa-trash').addClass('d-flex');
  }

  startDrawing(REF) {
    let that = REF;
    let classRef = this;
    let gMap = localStorage.getItem('Gmap');

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
      .attr('class', 'form-check mb-1').style('margin-left', 'auto');


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

    $('input[name="vedic"]').on('click', function () {
      swal("Before Redirecting, want to save Map data or Discard it ?", {
        buttons: {
          Save: true,
          Discard: true,
        },
      })
        .then((value) => {
          switch (value) {

            case "Save": {
              $('.savebtn').trigger('click');
              let value = $(this).val();
              if (value == 'vedic') {
                // $('.savebtn').trigger('click')
                that.centroid = Utility.getVedicCenteroid(that.vedicMapBoundariesCoords);
                removeToolsImages();
                let objName = localStorage.getItem('vedicImgObj');
                that.objectDelete(objName);
                that.model.editType(that.mapId, 'vedic');
                that.model.editCentroid(that.mapId, that.centroid)
                $('.fObject').parent().remove();
                $(`g.sjx-svg-wrapper[data-id]`).remove();
                that._stage = 3;
                that.vedicStart()
              } else {

                that.centroid = Utility.getCentroid(that.mapBoundariesCoords);
                that._stage = 3;
                that.start()
              }
              break;
            }
            case "Discard": {
              let value = $(this).val();
              if (value == 'vedic') {
                // $('.savebtn').trigger('click')
                that.centroid = Utility.getVedicCenteroid(that.vedicMapBoundariesCoords);
                removeToolsImages();
                let objName = localStorage.getItem('vedicImgObj');
                that.objectDelete(objName);
                that.model.editType(that.mapId, 'vedic');
                that.model.editCentroid(that.mapId, that.centroid)
                $('.fObject').parent().remove();
                $(`g.sjx-svg-wrapper[data-id]`).remove();
                that._stage = 3;
                that.vedicStart()
              } else {

                that.centroid = Utility.getCentroid(that.mapBoundariesCoords);
                that._stage = 3;
                that.start()
              }
              break;
            }

            default:
              break;
          }
        })

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
    let gMapBtn = actionBody.append("button")
      .attr("class", "mt-1 btn btn-primary d-none g-map col-sm-12 text-sm")
      .text('Gmap');
    let angleInputbox = actionBody.append('div').attr('class', 'col-md-4')
      .append("input").attr("class", "mt-1 form-control form-control-sm text-sm").style('height', '50px')
      .attr('name', 'angleInputbox').attr('type', 'number').attr('placeholder', 'Degree').attr('value', Math.abs(that.angle));

    if (gMap == true || gMap == "true") {
      angleInputbox.attr('disabled', true);
    }

    let degreeUpdateBtn = actionBody.append('div').attr('class', 'col-md-4')
      .append("button").attr("class", "mt-1 form-control form-control-sm text-sm").style('height', '50px')
      .text('Update');

    let divisonOfDevtasContainer = actionBody.append('div').attr('class', 'col-md-4 mt-1 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction', 'column').style('height', '50px').style('min-width', '55px');
    let divisonOfDevtas = divisonOfDevtasContainer.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/dots.svg`).attr('width', 20);
    divisonOfDevtasContainer.append('span').style('margin-top', '1px').style('text-align', 'center').style('font-size', '9px').text('division of devtas');

    let container = actionBox.append('div').attr('class', 'form-row justify-content-between pt-1 pl-2 pr-2 pb-0');

    let barchartContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .attr('data-action-object', 'barchart')
      .style('flex-direction', 'column').style('height', '50px').style('min-width', '55px');
    let barchart = barchartContainer.append('img').attr('src', `${that.BASE_URL}assets/icons/barchart.svg`).attr('width', 20);
    barchartContainer.append('span').style('margin-top', '1px').style('font-size', '9px').text('barchart');


    let addText = container.append('div').attr('class', 'col-md-2 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction', 'column').style('height', '50px').style('min-width', '55px');

    let addTextIcon = addText.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/text.svg`).attr('width', 20);
    addText.append('span').style('margin-top', '1px').style('font-size', '9px').text('Add Text');

    let deleteContainer = container.append('div').attr('class', 'col-md-4 p-1 border d-flex flex-column d-none justify-content-center align-items-center text-delete-toggle').attr('data-action-object', 'delete').style('height', '50px')
    let deleteText = deleteContainer.append('i').attr('class', 'fa fa-trash').attr('aria-hidden', 'true')
    deleteContainer.append('div').attr('class', 'name text-xs').text('Delete');

    let pointA, pointB;

    faceSelectbox.on("change", function () {

      let str = d3.select(this).node().value.split(',');
      pointA = [parseInt(str[0]), parseInt(str[1])];
      pointB = [parseInt(str[2]), parseInt(str[3])];
      
      let face = $('select[name = "select-face"] option:selected').text()
      localStorage.setItem('face',face)
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
      if(gMap == false || gMap == "false"){
      that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
      that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle,);
      alert('running')
      console.log(gMap)
      }
     
      
      d3.select(".facing-degree").text(`${Math.abs(theta)}°`);
      that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(), that.centroid, that.screenBoundariesCoords, that.division);
      that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle() + that.angle, that.centroid, that.mapBoundariesCoords, that.division);
      that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

      // ? DRAW BAR CHART
      that.modal.drawMap({ areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints });
      if(gMap == true || gMap == "true"){
      $('.g-map').trigger('click');
      }
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
    });

    gMapBtn.on('click', function () {
      let houseMaps = JSON.parse(localStorage.getItem('houseMaps'));
      let centerPoint = houseMaps[0].centroid;
      let nPoint = { x: centerPoint.x, y: 0 };

      let pPoint = Utility.getPerpendicularPoint(pointA, pointB, centerPoint);
      let angle = Utility.find_angle(nPoint, centerPoint, pPoint);
      angle = (angle * 180 / 3.14);
      angle = centerPoint.x < pPoint.x ? angle : 360 - angle
      angleInputbox.attr('value', angle);
      angleInputbox.attr('disabled', true);   

    })

    $('[data-object-item]').on('click', function () {
      // alert('hello');
      Utility.getObjectDirection(that.calNorthAngle(), that.centroid, that.angle, that.mapBoundariesCoords, '8')

    })

    barchart.on("click", function () {
      let grid = $('[name="select-grid"]').find('option:selected').val();
      if (grid != '') {
        $('#appModal').modal('show');
      } else {
        showAlert('Please select grid first', 'warning')
      }

    })


    addText.on("click", function () {

      let data = {
        name: 'Edit Text',
        src: '',
        width: 130,
        height: 30,
        x: that.centroid.x - 130 / 2,
        y: that.centroid.y - 30 / 2,
        transfrom: "",
        northAngle: that.calNorthAngle(),
        angle: that.angle,
        type: 'editText',
        ref: 'M'
      }
      let obj = new editText({
        mapId: that.mapId,
        layer: that.canvas,
        data: data
      });


    })



    degreeUpdateBtn.on("click", function () {

      let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
      console.log(theta)
      that.angle = -theta;
      that.model.editDegree(that.mapId, angleInputbox.property('value'));
      

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
      d3.select(".facing-degree").text(`${Math.abs(theta)}°`);
      // for(let i in that.mapPolygonsArray){
      //   for(let j in that.mapPolygonsArray[i])
      //   that.secondLayer.append('polygon').attr('points',that.mapPolygonsArray[i][j]).style('fill-opacity','0').style('stroke','green').style('stroke-width','5');
      // }

      // ? DRAW BAR CHART
      that.modal.drawMap({ areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints });
    })




    let html = `<a class="dropdown-item" type="fixed" href="#" value="VPM" id="vpm">Vpm</a>
<a class="dropdown-item" href="#" type="fixed" value="MVPC" id="mvpc">Shakti Chakra</a>
<a class="dropdown-item" href="#" type="fixed" value="MVC" id="mvc">Maha Vastu Chakra</a>
 `;

    let mapGridType = $('#toolMenu').html(html);




    mapGridType.on('click', 'a', function () {

      let gridType = $(this).attr('value');
      let objType = $(this).attr('type');
      let lockClass = 'svg-inline--fa fa-unlock-alt fa-w-14';

      $('.object-fixed-toggle').children().eq(0).removeClass();
      $('.object-fixed-toggle').children().eq(0).addClass(lockClass);
      $('.object-delete-toggle').addClass('d-flex');
      $('.object-fixed-toggle .name').html('Float')
      $(`g.sjx-svg-wrapper`).addClass('d-none');
      $('.object-align-center').removeClass('d-flex');
      // $('.object-align-center').addClass('d-flex');


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
        let d1 = Utility.distanceOfTwoPoints(that.vedicMapBoundariesCoords[0], that.vedicMapBoundariesCoords[1]);
        let d2 = Utility.distanceOfTwoPoints(that.vedicMapBoundariesCoords[1], that.vedicMapBoundariesCoords[2]);
        let width = d1 < d2 ? d1 : d2;
        if (that.objectVpm == null || that.objectVpm == undefined) {

          d3.select('.properties-section.opacity').classed('d-none', false);
          d3.select(objName.parentNode).classed('active', true);
          that.model.editVpmtoggle(that.mapId, true);

          let data = {
            name: objName,
            src: that.BASE_URL + 'assets/images/' + objImageSrc,
            width: width,
            height: width,
            x: that.centroid.x - width / 2,
            y: that.centroid.y - width / 2,
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
          d3.select('.properties-section.opacity').classed('d-flex', false);
        }
      })
      // that.vedic.startDrawing(that);
      //   that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: gridType});
    })




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

    // $('.object-fixed-toggle').on('click', function () {
    //   let unlockClass = 'svg-inline--fa fa-lock fa-w-14';
    //   let lockClass = 'svg-inline--fa fa-unlock-alt fa-w-14';
    //   let eClass = $(this).children().attr('class');
    //   console.log(eClass)
    //   if (eClass == unlockClass) {
    //     $(this).children().eq(0).removeClass(eClass);
    //     $(this).children().eq(0).addClass(lockClass);
    //     $(`g.sjx-svg-wrapper`).addClass('d-none');
    //     $('.object-align-center').removeClass('d-flex');
    //     $('.object-fixed-toggle .name').html('Float')
    //   } else {
    //     $(this).children().eq(0).removeClass(eClass);
    //     $(this).children().eq(0).addClass(unlockClass);
    //     $(`g.sjx-svg-wrapper`).removeClass('d-none')
    //     $('.object-align-center').addClass('d-flex');
    //     $('.object-fixed-toggle .name').html('Fixed')
    //   }
    // })

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
      swal("Are you sure to delete it?", {
        buttons: {
          Delete: true,
          Cancel: true,
        },
      })
        .then((value) => {
          switch (value) {

            case "Delete":
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

              console.log(newObj)
              console.log(newObjReport)
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
              formData.append('object', JSON.stringify(newObj));
              var url = BASE_URL + "/Main/updateObjectsAndReportData";
              AjaxPost(formData, url, updateReportDatasuccess, AjaxError);

              function updateReportDatasuccess(content, targetTextarea) {
                var result = JSON.parse(content);
                if (result[0] == 'success') {
                  //Removing object from map
                  $(`.svg-object[data-id="${id}"]`).remove();
                  $(`.sjx-svg-wrapper[data-id="${id}"]`).remove();

                  showAlert('Item Removed', 'success');
                }
              }
              break;
            case "Cancel":
              break;

            default:
              break;
          }

        })

    });

    

  }

}