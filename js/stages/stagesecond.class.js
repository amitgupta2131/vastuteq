import ActionBox from "../helper/actionbox.class.js";
import Utility from "../helper/utility.class.js";

export default class StageSecond {
  constructor() {
    this.actionbox = new ActionBox();
  }

  startVedic(REF) {
    let that = REF;
    let diagonalChecked = false, gridChecked = false, gridType = 3;
    let actionBox = this.actionbox.clear().get();

    let row = actionBox.append('div')
      .classed('form-row', true);

    let col1 = row.append('div')
      .classed('col-md-6', true);
    let col2 = row.append('div')
      .classed('col-md-6', true);
    let col3 = row.append('div')
      .classed('col-md-12', true);

    let enableDiagonalsWrapper = col1.append('div')
      .classed('form-check', true);
    let enableDiagonals = enableDiagonalsWrapper.append('input')
      .classed('form-check-input', true).attr('type', 'checkbox');

    enableDiagonalsWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Diagonals');

    let enableGridWrapper = col2.append('div')
      .classed('form-check', true);
    let enableGrid = enableGridWrapper.append('input')
      .classed('form-check-input', true).attr('type', 'checkbox');

    enableGridWrapper.append('label').attr('class', 'form-check-label, text-sm').html('Grid');

    let mapGridType = col3
      .append('select').attr('class', 'form-control form-control-sm text-sm')
      .html(`
        <option value="3" selected>3</option>
        <option value="9">9</option>
    `);

    this.actionbox.show();

    enableDiagonals.on('click', function () {
      diagonalChecked = d3.select(this).property("checked");
      if (diagonalChecked) {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      } else {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      }
    })

    enableGrid.on('click', function () {
      gridChecked = d3.select(this).property("checked");
      if (gridChecked) {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      } else {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      }
    })

    mapGridType.on('change', function () {
      gridType = mapGridType.property('value');

      if (gridType == 3) {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      }
      else {
        that.assist.drawMask({ layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE });
        that.assist.drawPolygon(that.canvas, that.mapBoundariesCoords, gridType, true, gridChecked, diagonalChecked);
        that.assist.drawBharamNabhi({ layer: that.canvas, centroid: that.centroid });
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle, that.selectedDirection, that._type);
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
      }
    })

  }

  startDrawing(REF) {
    var face = '';

    let that = REF;
    let str, pointA, pointB;

    let actionBox = that.actionbox.clear().get();

    let actionText = actionBox
      .append("p")
      .attr("class", "text-uppercase text-sm actionbox-text")
      .text("Select face");

    let actionBody = actionBox
      .append("div")
      .attr("class", "p-1 mb-1");

    let selectbox = actionBody.append("select").attr("class", "face-select form-control form-control-sm text-sm");

    let faceSelectData = [];
    for (let i = 0; i < that.mapBoundariesCoords.length; i++) {
      let j = i < that.mapBoundariesCoords.length - 1 ? i + 1 : 0;
      faceSelectData.push({
        text: `wall P${i} - P${j}`,
        value: [that.mapBoundariesCoords[i], that.mapBoundariesCoords[j]]
      });
    }


    let options = selectbox.selectAll("option")
      .data(faceSelectData)
      .enter()
      .append("option")
      .attr("class", "text-uppercase text-sm");

    options.text(function (d) {
      return d.text;
    })
      .attr("value", function (d) {
        return d.value;
      });

    selectbox.attr('value', faceSelectData[0].value);

    str = selectbox.node().value.split(',');
    pointA = [parseInt(str[0]), parseInt(str[1])];
    pointB = [parseInt(str[2]), parseInt(str[3])];

    this.actionbox.show();

    let gMapBtn = actionBody.append("button")
      .attr("class", "mt-2 btn btn-primary col-sm-12 text-sm")
      .text('Gmap');

    let angleInputbox = actionBody.append("input")
      .attr("class", "mt-2 form-control form-control-sm text-sm")
      .attr('type', 'number').attr('placeholder', 'Degree');

    let degreeUpdateBtn = actionBody.append("button")
      .attr("class", "mt-2 form-control form-control-sm text-sm")
      .text('Update');

    selectbox.on("change", function () {
      str = d3.select(this).node().value.split(',');
      pointA = [parseInt(str[0]), parseInt(str[1])];
      pointB = [parseInt(str[2]), parseInt(str[3])];
    })

    degreeUpdateBtn.on("click", function () {

      let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
      that.angle = -theta;

      if ((pointA == undefined || pointB == undefined) || (pointA == "" || pointB == "")) {
        this.showToast("Warning!", "Please select desired wall.");
      } else {
        face = $(".face-select").find(":selected").text();
        localStorage.setItem("face", face);
        that.actionbox.clear().hide();
        that.faceCoords = [pointA, pointB];
        that.model.editFaceCoords(that.mapId, [pointA, pointB]);
        that.model.editFaceWall(that.mapId, face);
        that._stage = 3;
        that.model.editStage(that.mapId, 3);
        that.model.editDegree(that.mapId, angleInputbox.property('value'));
        that._type == "vedic" ? that.vedicStart() : that.start();
      }

    });

    gMapBtn.on('click', function () {
      let houseMaps = JSON.parse(localStorage.getItem('houseMaps'));
      let centerPoint = houseMaps[0].centroid;
      let nPoint = { x: centerPoint.x, y: 0 };
      
      let pPoint = Utility.getPerpendicularPoint(pointA, pointB, centerPoint);
      let angle =  Utility.find_angle(nPoint, centerPoint, pPoint);
      angle = Math.round(angle * 180 / 3.14);
      angle = centerPoint.x < pPoint.x ? angle : 360 - angle
      angleInputbox.attr('value',angle);
      angleInputbox.attr('disabled',true);
      that.model.editGmap(that.mapId, true);
      localStorage.setItem('Gmap','true')
      
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
