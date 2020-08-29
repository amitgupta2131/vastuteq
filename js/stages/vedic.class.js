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

    //Adding radio buttons


    this.actionBody = actionBox.append('div')
        .attr('class', 'row actionbox-body')
        .style('margin','0px');

    this.actionsdiv = this.actionBody.append('div')
        .attr('class', 'form-check mb-3').style('margin-left','auto');


    this.actionBtnVedic = this.actionsdiv.append('input')
        .attr('class', 'form-check-input text-sm')
        .attr('type', 'radio')
        .attr('name', 'vedic')
        .attr('id', 'vedicRadio')
        .attr('value', 'vedic')
        .attr('checked',true);
    this.actionLabelVedic = this.actionsdiv.append('label')
    .attr('class', 'form-check-label text-sm')
    .attr('for', 'vedicRadio')
    .html('Vedic');


    this.actionsdiv2 = this.actionBody.append('div')
        .attr('class', 'form-check').style('margin-left','8px').style('margin-right','auto');;


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

    $('input[type="radio"]').on('click',function(){

      let value = $(this).val();
      if(value == 'mahavastu'){
      d3.select('g.sjx-svg-wrapper').remove(); 
      d3.select('g.vedic-polygon').remove();

      that.centroid = Utility.getCentroid(that.mapBoundariesCoords);      
      that._stage = 3;
      that.start()
      }
    })

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

    let html = `<a class="nav-link text-dark menu-item" href="#" id="fixed" role="button">
                  Fixed Tools
                </a>  
                <a class="nav-link text-dark menu-item" href="#" id="floating" role="button">
                  Floating Tools
                </a>  <div class="dropdown-menu"  id="fixedToolMenu">
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
      </div> 

      <div class="dropdown-menu"  id="floatingToolMenu">
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


    // mapGridType.on('click', '#floating', function () {
      
    //   $('#floatingToolMenu').remove();
    //   $('#fixedToolMenu').remove();
    //   let objId = $(this).attr('id');
    //   alert(objId)
    //   if (objId == 'fixed') {
        
    //     $('#toolMenu').append(fixedMenu)
    //   } else if (objId == 'floating') {
       
    //     $('#toolMenu').append(floatingMenu)
    //   }
    // })

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
            angle: that.angle,
            type: objType
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
