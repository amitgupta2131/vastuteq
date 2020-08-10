import ActionBox from "../helper/actionbox.class.js";
import Utility from "../helper/utility.class.js";


export default class Vedic {
  constructor() {
    this.actionbox = new ActionBox();
  }

  startDrawing(REF) {
    let that = REF;
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
    let enableDiagonals  = enableDiagonalsWrapper.append('input')
     .property('checked', true).classed('form-check-input', true)
     .attr('type', 'checkbox');
    
    enableDiagonalsWrapper.append('label').attr('class','form-check-label, text-sm').html('Diagonals');

    let enableGridWrapper = col2.append('div')
    .classed('form-check', true);
    let enableGrid  = enableGridWrapper.append('input')
     .property('checked', true).classed('form-check-input', true)
     .attr('type', 'checkbox');
   
    enableGridWrapper.append('label').attr('class','form-check-label, text-sm').html('Grid');

    let mapGridText = col3
      .append('p').attr('class', 'text-sm')
      .html('GRID TYPE');

    let mapGridType = col3
      .append('select').attr('class', 'form-control form-control-sm text-sm')
      .html(`
        <option value="3GL" selected>3 X 3 Grid Layout</option>
        <option value="3GD">3 X 3 Grid Diagonal</option>
        <option value="9DL">9 X 9 Disha Lord Numero Grid</option>
        <option value="9GL">9 X 9 Grid Layout</option>
        <option value="9SG">Maha Vastu Square Grid</option>
        <option value="9MS">Marma Sthana</option>
        <option value="9SM">Shanmahanti</option>
        <option value="9SD">Shubh Dwar</option>
        
    `);

    this.actionbox.show();

    enableDiagonals.on('click', function(){
      diagonalChecked = d3.select(this).property("checked");
      if(diagonalChecked) {
          d3.select('.diagonals-container').classed('d-none',false);
      } else {
          d3.select('.diagonals-container').classed('d-none',true);
      }
    })

    enableGrid.on('click', function(){
      gridChecked = d3.select(this).property("checked");
      if(gridChecked) {
        d3.select('.vedic-grid-container').classed('d-none',false);
      } else {
        d3.select('.vedic-grid-container').classed('d-none',true);
      }
    })

    mapGridType.on('change', function() {

      gridType = mapGridType.property('value');

      let wrapper = $(`g.sjx-svg-wrapper`).remove();

      switch (gridType){
         case "3GL" : 
              that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"red",strokeWidth:2});
              that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"red", noOfLines: 3,strokeWidth:2});
              that.createObject('g.vedic-polygon');
              that.vedic = new Vedic(); 
                break;
        case "3GD" : 
              that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
              that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 3,strokeWidth:2});
              that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 3,strokeWidth:2});
              that.createObject('g.vedic-polygon');
              that.vedic = new Vedic(); 
              break;
        case "9DL" : 
              that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
              that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.createObject('g.vedic-polygon');
              that.vedic = new Vedic(); 
                break;
        case "9GL" : 
              that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
              that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.createObject('g.vedic-polygon');
              that.vedic = new Vedic(); 
                break;
        case "9SG" : 
              that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
              that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
              that.createObject('g.vedic-polygon');
              that.vedic = new Vedic(); 
                break;
        case "9MS" : 
                that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
                that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.assist.drawMarmSthana({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.createObject('g.vedic-polygon');
                that.vedic = new Vedic(); 
                  break;
        case "9SM": 
                that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
                that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.createObject('g.vedic-polygon');
                that.vedic = new Vedic(); 
                  break;
        case "9SD" : 
                that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:2});
                that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: 9,strokeWidth:2});
                that.createObject('g.vedic-polygon');
                that.vedic = new Vedic(); 
                  break;
         default: drawVedic(that,"red",3,2); break;
      }
    
      // that.vedic.startDrawing(that);
      //   that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: gridType});
    })

  }

  drawVedic(that,color="red",noOfLines=3,strokeWidth) {

    // that.wrapperDelete("map");
    that.assist.drawPolygon({layer: that.canvas, points: that.vedicMapBoundariesCoords,strokeColor:"blue",strokeWidth:strokeWidth});
    // that.assist.drawPolygonDiagonals({points: that.vedicMapBoundariesCoords});
    that.assist.drawPolygonGridWithDiagonals({points: that.vedicMapBoundariesCoords, color:"blue", noOfLines: gridType,strokeWidth:2});
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
