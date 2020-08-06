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
        <option value="3" selected>3 X 3</option>
        <option value="9">9 X 9</option>
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

      if(gridType == 3) {
        that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: 3});
      }
      else {
        that.assist.drawPolygonGrid({points: that.vedicMapBoundariesCoords, noOfLines: 9});
      }
    })

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
