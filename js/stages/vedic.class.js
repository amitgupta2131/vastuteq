import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js';
import Utility from "../helper/utility.class.js";
import editText from '../EditText.class.js'
import EditTextModel from "../helper/editTextModel.class.js";


export default class Vedic {
  constructor() {
    this.actionbox = new ActionBox();
    d3.select('.properties-section.opacity').classed('d-none', true);
    $('.properties-section.opacity').addClass('d-flex');
    $('.properties-section.opacity .col-md-12.row').addClass('d-none');
    $('.object-delete-toggle').addClass('d-none');
    $('.object-delete-toggle').removeClass('d-flex');
    // $('.object-align-center').addClass('d-none');
    // $('.object-align-center').removeClass('d-flex');
    let unloackClass = $('.object-fixed-toggle').children().eq(0).attr('class')

    if (unloackClass != 'svg-inline--fa fa-unlock-alt fa-w-14') {
      $('.object-fixed-toggle').children().eq(0).attr('class', '');
      $('.object-fixed-toggle').children().eq(0).addClass('svg-inline--fa fa-unlock-alt fa-w-14');
    }
    if (unloackClass == 'fa fa-unlock-alt') {
      $('.object-fixed-toggle').children().eq(0).attr('class', '');
      $('.object-fixed-toggle').children().eq(0).addClass('fa fa-unlock-alt');
    }
    $('.object-fixed-toggle .name').html('Float')

  }

  startDrawing(REF) {
    let that = REF;
    let classRef = this;
    let diagonalChecked = false, gridChecked = false, gridType = 3;
    let actionBox = this.actionbox.clear().get();

    //Adding radio buttons


    this.actionBody = actionBox.append('div')
      .attr('class', 'row actionbox-body')
      .style('margin', '0px');

    this.actionsdiv = this.actionBody.append('div')
      .attr('class', 'form-check mb-1').style('margin-left', 'auto');


    this.actionBtnVedic = this.actionsdiv.append('input')
      .attr('class', 'form-check-input text-sm')
      .attr('type', 'radio')
      .attr('name', 'vedic')
      .attr('id', 'vedicRadio')
      .attr('value', 'vedic')
      .attr('checked', true);
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
      .attr('value', 'mahavastu');
    this.actionLabelMahavastu = this.actionsdiv2.append('label')
      .attr('class', 'form-check-label text-sm')
      .attr('for', 'mahavastuRadio')
      .html('Mahavastu');

    $('input[name="mahavastu"]').on('click', function () {
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
              if (value == 'mahavastu') {
                let objName = localStorage.getItem('vedicImgObj');
                d3.select('g.sjx-svg-wrapper').remove();
                d3.select('g.vedic-polygon').remove();
                $('.fObject').parent().remove();
                d3.select('.properties-section.opacity').classed('d-none', true);
                d3.select('.properties-section.opacity').classed('d-flex', false);
                d3.select('.object-delete-toggle').classed('d-none', false);
                d3.select('.object-delete-toggle').classed('d-flex', true);
                d3.select('.toggle-fixed').classed('d-flex', true);
                that.objectDelete(objName);
                that.centroid = Utility.getCentroid(that.mapBoundariesCoords);
                that.model.editType(that.mapId, 'mahavastu');
                that.model.editCentroid(that.mapId, that.centroid);
                that._stage = 3;
                that.start()
              }
              break;
            }
            case "Discard": {
              let value = $(this).val();
              if (value == 'mahavastu') {
                let objName = localStorage.getItem('vedicImgObj');
                d3.select('g.sjx-svg-wrapper').remove();
                d3.select('g.vedic-polygon').remove();
                $('.fObject').parent().remove();
                d3.select('.properties-section.opacity').classed('d-none', true);
                d3.select('.properties-section.opacity').classed('d-flex', false);
                d3.select('.object-delete-toggle').classed('d-none', false);
                d3.select('.object-delete-toggle').classed('d-flex', true);
                d3.select('.toggle-fixed').classed('d-flex', true);
                that.objectDelete(objName);
                that.centroid = Utility.getCentroid(that.mapBoundariesCoords);
                that.model.editType(that.mapId, 'mahavastu');
                that.model.editCentroid(that.mapId, that.centroid);
                that._stage = 3;
                that.start()
              }
              break;
            }
            default:
              break;
          }
        })

    });



    let row = actionBox.append('div')
      .classed('form-row', true);

    let col1 = row.append('div')
      .classed('col-md-12 row m-0', true);
    // let col2 = row.append('div')
    //   .classed('col-md-6 mb-3', true);
    // let col3 = row.append('div')
    //   .classed('col-md-12', true);



    // let enableDiagonalsWrapper = col1.append('div')
    //   .classed('form-check', true);
    // let enableDiagonals = enableDiagonalsWrapper.append('input')
    //   .property('checked', true).classed('form-check-input', true)
    //   .attr('type', 'checkbox');

    // enableDiagonalsWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Diagonals');

    // let enableGridWrapper = col2.append('div')
    //   .classed('form-check', true);
    // let enableGrid = enableGridWrapper.append('input')
    //   .property('checked', true).classed('form-check-input', true)
    //   .attr('type', 'checkbox');

    // enableGridWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Grid');
    let addText = col1.append('div').attr('class', 'mr-2 col-md-5 d-flex justify-content-center align-items-center border object-actions').style('margin-left', 'auto')
      .style('flex-direction', 'column').style('height', '42px').style('min-width', '80px');

    let addTextIcon = addText.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/text.svg`).attr('width', 20);
    addText.append('span').style('margin-top', '1px').style('font-size', '9px').text('Add Text');

    let deleteContainer = col1.append('div').attr('class', 'col-md-5 p-1 border d-flex flex-column d-none justify-content-center align-items-center text-delete-toggle').attr('data-action-object', 'delete').style('height', '42px').style('margin-right', 'auto')
    let deleteText = deleteContainer.append('i').attr('class', 'fa fa-trash').attr('aria-hidden', 'true')
    deleteContainer.append('div').attr('class', 'name text-xs').text('Delete');

    // deleteContainer.on('click', function () {
    //   $('.removeEditText').trigger('click');

    // })

    this.actionbox.show();

    let html = `
      <a class="dropdown-item" type="fixed" href="#" id="3GL" value="3GL" selected>3 X 3 Grid Layout</a>
      <a class="dropdown-item" type="fixed" href="#" id="3GD" value="3GD">3 X 3 Grid Diagonal</a>
      <a class="dropdown-item" type="fixed" href="#" id="9DL" value="9DL">9 X 9 Disha Lord Numero Grid</a>
      <a class="dropdown-item" type="fixed" href="#" id="9GL" value="9GL">9 X 9 Grid Layout</a>
      <a class="dropdown-item" type="fixed" href="#" id="9SG" value="9SG">Maha Vastu Square Grid</a>
      <a class="dropdown-item" type="fixed" href="#" id="9MS" value="9MS">Marma Sthana</a>
      <a class="dropdown-item" type="fixed" href="#" id="9SM" value="9SM">Shanmahanti</a>
      <a class="dropdown-item" type="fixed" href="#" id="9SD" value="9SD">Shubh Dwar</a>
      <a class="dropdown-item" type="fixed" href="#" id="KSGP" value="KSGP">Karna Sutra Golden points</a>
      <a class="dropdown-item" type="fixed" href="#" id="KSMP" value="KSMP">Karna Sutra Marma Points</a>        
      <a class="dropdown-item" type="fixed" href="#" id="CG" value="CG">Circle Grid</a>
      <a class="dropdown-item" type="fixed" href="#" id ="vpm1" value="VPM">VPM</a>
       `;

    let mapGridType = $('#toolMenu').html(html);

    // enableDiagonals.on('click', function () {
    //   diagonalChecked = d3.select(this).property("checked");
    //   if (diagonalChecked) {
    //     d3.select('.diagonals-container').classed('d-none', false);
    //   } else {
    //     d3.select('.diagonals-container').classed('d-none', true);
    //   }
    // });

    // enableGrid.on('click', function () {
    //   gridChecked = d3.select(this).property("checked");
    //   if (gridChecked) {
    //     d3.select('.vedic-grid-container').classed('d-none', false);
    //   } else {
    //     d3.select('.vedic-grid-container').classed('d-none', true);
    //   }
    // });

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
        ref: 'V'
      }
      let obj = new editText({
        mapId: that.mapId,
        layer: that.canvas,
        data: data
      });


    });


    mapGridType.on('click', 'a', function () {

      gridType = $(this).attr('value');
      let objType = $(this).attr('type');
      let lockClass = 'svg-inline--fa fa-unlock-alt fa-w-14';
      $('.object-fixed-toggle').children().eq(0).removeClass();
      $('.object-fixed-toggle').children().eq(0).addClass(lockClass);
      $('.object-fixed-toggle .name').html('Float');
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
        case "3GL":
          $('.properties-section.opacity').addClass('d-flex');
          $('.properties-section.opacity .col-md-12.row').addClass('d-none');
          $('.object-delete-toggle').addClass('d-none');
          $('.object-delete-toggle').removeClass('d-flex');
          // $('.object-align-center').addClass('d-flex');
          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "red", strokeWidth: 2, name: '3GL' });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "red", noOfLines: 3, strokeWidth: 2 });
          that.createObject('g.vedic-polygon', objType);
          that.vedic = new Vedic();
          break;
        case "3GD":
          $('.properties-section.opacity').addClass('d-flex');
          $('.properties-section.opacity .col-md-12.row').addClass('d-none');
          $('.object-delete-toggle').addClass('d-none');
          $('.object-delete-toggle').removeClass('d-flex');
          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2, name: '3GD' });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 3, strokeWidth: 2 });
          that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 3, strokeWidth: 2 });
          that.createObject('g.vedic-polygon', objType);
          that.vedic = new Vedic();
          break;
        case "9DL":

          // that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
          // that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic(); 
          drawVedicImages('9DL', '9 by 9 disha lord numero.jpeg')

          break;
        case "9GL":
          $('.properties-section.opacity').addClass('d-flex');
          $('.properties-section.opacity .col-md-12.row').addClass('d-none');
          $('.object-delete-toggle').addClass('d-none');
          $('.object-delete-toggle').removeClass('d-flex');
          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2, name: '9GL' });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          that.createObject('g.vedic-polygon', objType);
          that.vedic = new Vedic();
          break;
        case "9SG":
          // that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2 });
          // that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          // that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic();
          drawVedicImages('9SG', 'Mahavastu Square Grid.jpeg')
          break;
        case "9MS":
          // that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
          // that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.assist.drawMarmSthana({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic();              

          drawVedicImages('9MS', 'marmSthana.png')
          //  if(result == null){
          //   that.objectVpm = null
          //  }

          break;
        case "9SM":
          // that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2 });
          // that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          // that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic();
          drawVedicImages('9SM', 'Subh Dwar.png')
          break;
        case "9SD":
          // that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
          // that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic();
          drawVedicImages('9SD', 'Subh Dwar.png')
          break;
        case "KSGP":
          drawVedicImages('KSGP', 'karma.png')
          break;

        case "KSMP":
          drawVedicImages('KSMP', 'Karna Sutra Marma Points.jpeg')
          break;

        case "CG":
          drawVedicImages('CG', 'degreeCircleTransparent.png')
          break;

        case "VPM":
          drawVedicImages('VPM', 'vpm.svg')


          break;
        default:
          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "red", strokeWidth: 2 });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "red", noOfLines: 3, strokeWidth: 2 });
          that.createObject('g.vedic-polygon');
          that.vedic = new Vedic();
          break;
      }

      function drawVedicImages(objName, objImageSrc, object) {
        let d1 = Utility.distanceOfTwoPoints(that.vedicMapBoundariesCoords[0], that.vedicMapBoundariesCoords[1]);
        let d2 = Utility.distanceOfTwoPoints(that.vedicMapBoundariesCoords[1], that.vedicMapBoundariesCoords[2]);
        let width = d1 < d2 ? d1 : d2;

        localStorage.setItem('vedicImgObj', objName)
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
        }
      });


      // that.vedic.startDrawing(that);
      //   that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: gridType});
    })

  }

  drawVedic(that, color = "red", noOfLines = 3, strokeWidth) {

    // that.wrapperDelete("map");
    that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: strokeWidth });
    // that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords});
    that.assist.drawPolygonGridWithDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: gridType, strokeWidth: 2 });
    that.createObject('g.vedic-polygon');
    that.vedic = new Vedic();
  }



  showToast(heading, msg, type = "warning") {
    let toastbox = d3.select('#appToast');
    toastbox.select('.modal-title').html(heading)
      .classed(`text-${type}`, true);
    toastbox.select('.modal-body').html(msg);
    toastbox.select('.modal-footer').style('display', 'none');
    $('#appToast').modal('show');
  }

  hideToast() {
    $('#appToast').modal('hide');
  }

}
