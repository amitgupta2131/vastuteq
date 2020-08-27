import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js';
import Utility from "../helper/utility.class.js";


export default class Vedic {
  constructor() {
    this.actionbox = new ActionBox();
  }

  startDrawing(REF) {
    let that = REF;
    let classRef = this;
    let diagonalChecked = false, gridChecked = false, gridType = 3;
    let actionBox = this.actionbox.clear().get();

    let row = actionBox.append('div')
      .classed('form-row', true);

    let col1 = row.append('div')
      .classed('col-md-6 mb-3', true);
    let col2 = row.append('div')
      .classed('col-md-6 mb-3', true);
    let col3 = row.append('div')
      .classed('col-md-12', true);



    let enableDiagonalsWrapper = col1.append('div')
      .classed('form-check', true);
    let enableDiagonals = enableDiagonalsWrapper.append('input')
      .property('checked', true).classed('form-check-input', true)
      .attr('type', 'checkbox');

    enableDiagonalsWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Diagonals');

    let enableGridWrapper = col2.append('div')
      .classed('form-check', true);
    let enableGrid = enableGridWrapper.append('input')
      .property('checked', true).classed('form-check-input', true)
      .attr('type', 'checkbox');

    enableGridWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Grid');
    this.actionbox.show();
    // let mapGridText = col3
    //   .append('p').attr('class', 'text-sm')
    //   .html('GRID TYPE');


    // toolsArea.html(`<a class="dropdown-item" value="" href="#" id="vpm">Vpm</a>`)
    let mapGridType = $('#toolMenu')
      .html(`
        <a class="dropdown-item" href="#" id="3GL" value="3GL" selected>3 X 3 Grid Layout</a>
        <a class="dropdown-item" href="#" id="3GD" value="3GD">3 X 3 Grid Diagonal</a>
        <a class="dropdown-item" href="#" id="9DL" value="9DL">9 X 9 Disha Lord Numero Grid</a>
        <a class="dropdown-item" href="#" id="9GL" value="9GL">9 X 9 Grid Layout</a>
        <a class="dropdown-item" href="#" id="9SG" value="9SG">Maha Vastu Square Grid</a>
        <a class="dropdown-item" href="#" id="9MS" value="9MS">Marma Sthana</a>
        <a class="dropdown-item" href="#" id="9SM" value="9SM">Shanmahanti</a>
        <a class="dropdown-item" href="#" id="9SD" value="9SD">Shubh Dwar</a>
        <a class="dropdown-item" href="#" id="KSGP" value="KSGP">Karna Sutra Golden points</a>
        <a class="dropdown-item" href="#" id="KSMP" value="KSMP">Karna Sutra Marma Points</a>        
        <a class="dropdown-item" href="#" id="CG" value="CG">Circle Grid</a>
        <a class="dropdown-item" href="#" id ="vpm1" value="VPM">VPM</a>
        
    `);
    // let vpm = $('#vpm1').attr('data-src', `${that.BASE_URL}assets/images/vpm.svg`);
    // let MS9 = $('#9MS').attr('data-src', `${that.BASE_URL}assets/images/Marma Sthana.png`);
    // let DL9 = $('#9DL').attr('data-src', `${that.BASE_URL}assets/images/9 by 9 disha lord numero.jpeg`);
    // let mvm = $('#mvpc').attr('data-action-object', `${that.BASE_URL}assets/icons/vpm.svg`);
    // let mvc = $('#mvc').attr('data-action-object', `${that.BASE_URL}assets/images/mvc.png`);


    enableDiagonals.on('click', function () {
      diagonalChecked = d3.select(this).property("checked");
      if (diagonalChecked) {
        d3.select('.diagonals-container').classed('d-none', false);
      } else {
        d3.select('.diagonals-container').classed('d-none', true);
      }
    });

    enableGrid.on('click', function () {
      gridChecked = d3.select(this).property("checked");
      if (gridChecked) {
        d3.select('.vedic-grid-container').classed('d-none', false);
      } else {
        d3.select('.vedic-grid-container').classed('d-none', true);
      }
    });


    mapGridType.on('click', 'a', function () {

      gridType = $(this).attr('value');

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
      console.log(imgName)
      switch (gridType) {
        case "3GL":

          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "red", strokeWidth: 2 });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "red", noOfLines: 3, strokeWidth: 2 });
          that.createObject('g.vedic-polygon');
          that.vedic = new Vedic();
          break;
        case "3GD":

          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2 });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 3, strokeWidth: 2 });
          that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 3, strokeWidth: 2 });
          that.createObject('g.vedic-polygon');
          that.vedic = new Vedic();
          break;
        case "9DL":

          // that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
          // that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
          // that.createObject('g.vedic-polygon');
          // that.vedic = new Vedic(); 
          drawVedicImages('DL9', '9 by 9 disha lord numero.jpeg')

          break;
        case "9GL":
          that.assist.drawPolygon({ layer: that.canvas, points: that.vedicMapBoundariesCoords, strokeColor: "blue", strokeWidth: 2 });
          that.assist.drawPolygonGrid({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          that.assist.drawPolygonDiagonals({ points: that.vedicMapBoundariesCoords, color: "blue", noOfLines: 9, strokeWidth: 2 });
          that.createObject('g.vedic-polygon');
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
          //  console.log(that.objectVpm);
          //        if(that.objectVpm == null || that.objectVpm == undefined) {
          //         console.log("Create");
          //           d3.select('.properties-section.opacity').classed('d-none',false);
          //           d3.select(this.parentNode).classed('active', true);
          //           that.model.editVpmtoggle(that.mapId,true);

          //           let data = {
          //             name: "VPM",
          //             src: that.BASE_URL+'assets/images/vpm.svg',
          //             width: 400,
          //             height: 400,
          //             x: that.centroid.x - 400 / 2,
          //             y: that.centroid.y - 400 / 2,
          //             transfrom: "",
          //             northAngle: that.calNorthAngle(),
          //             angle: that.angle
          //           }
          //           that.objectVpm = new Object({
          //             layer: that.canvas,
          //             data: data
          //           });
          //           console.log(that.objectVpm);
          //         } else {
          //           console.log("Delete");
          //           that.objectDelete('VPM');
          //           that.objectVpm = null;
          //         }

          //         if(that.objectVpm == null || that.objectVpm == undefined){     
          //           d3.select(this.parentNode).classed('active', false);
          //         }
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
        localStorage.setItem('vedicImgObj', objName)
        if (that.objectVpm == null || that.objectVpm == undefined) {
          console.log("Create");
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
            angle: that.angle
          }
          that.objectVpm = new Object({
            layer: that.canvas,
            data: data
          });

        } else {
          console.log("Delete");
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
