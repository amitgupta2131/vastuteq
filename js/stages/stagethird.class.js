import ActionBox from "../helper/actionbox.class.js";
import Object from '../object.class.js'
import Utility from "../helper/utility.class.js";

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
  
      let actionBody = actionBox
        .append("div")
        .attr("class", "form-row actionbox-body");  
  
      let faceSelectbox = actionBody.append('div').attr('class','col-md-6')
      .append("select").attr('name','select-face').attr("class", "form-control form-control-sm text-sm");
      faceSelectbox.append('option').html('select Face');

      let face = localStorage.getItem("face");
      
      for (let i = 0; i < that.mapBoundariesCoords.length; i++) {
        let j = i < that.mapBoundariesCoords.length - 1 ? i + 1 : 0;
        let optionText = `Wall P${i} - P${j}`;
        
        if(face.trim().toLowerCase() == optionText.trim().toLowerCase()){
          faceSelectbox.append("option").attr("value", [
            that.mapBoundariesCoords[i],
            that.mapBoundariesCoords[j],
          ]).attr('selected','selected')
          .text(optionText);         
        }else{
          faceSelectbox.append("option").attr("value", [
            that.mapBoundariesCoords[i],
            that.mapBoundariesCoords[j],
          ])
          .text(optionText);
         
        }
        
      }

      let gridSelectbox = actionBody.append('div').attr('class','col-md-6')
      .append("select").attr('name','select-grid').attr("class", "form-control form-control-sm text-sm")
      .html(
        `
        <option value="8">8 Division</option>
        <option value="16" selected>16 Division</option>
        <option value="32">32 Division</option>
        `
      );

      let angleInputbox = actionBody.append('div').attr('class','col-md-6')
      .append("input").attr("class", "mt-2 form-control form-control-sm text-sm")
      .attr('type', 'number').attr('placeholder', 'Degree').attr('value',Math.abs(that.angle));

      let degreeUpdateBtn = actionBody.append('div').attr('class','col-md-6')
      .append("button").attr("class", "mt-2 form-control form-control-sm text-sm")
      .text('Update');

      let container = actionBox.append('div').attr('class', 'form-row justify-content-between p-2');

      let barchartContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      .attr('data-action-object', 'barchart').attr('data-toggle', 'modal').attr('data-target', '#appModal')
      .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let barchart = barchartContainer.append('img').attr('src', `${that.BASE_URL}assets/icons/barchart.svg`).attr('width', 20);
      barchartContainer.append('span').style('margin-top','1px').style('font-size','9px').text('barchart');

      // let vpmContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      // .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let vpm = $('#vpm').attr('data-action-object', `${that.BASE_URL}assets/icons/mvm.svg`)
      // .append('img').attr('src', `${that.BASE_URL}assets/icons/mvm.svg`).attr('width', 20).attr('id', 'vpmimg');
      // vpmContainer.append('span').style('margin-top','1px').style('font-size','9px').text('vpm');

      // let mvmContainer = container.append('div').attr('class', 'col-md-3 d-flex justify-content-center align-items-center border object-actions')
      // .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let mvm = $('#mvpc').attr('data-action-object', `${that.BASE_URL}assets/icons/vpm.svg`);
      // .append('img').attr('src', `${that.BASE_URL}assets/icons/vpm.svg`).attr('width', 20).attr('id', 'mvpcimg');
      // mvmContainer.append('span').style('margin-top','1px').style('font-size','9px').text('mvpc');

      let divisonOfDevtasContainer = container.append('div').attr('class', 'col-md-8 d-flex justify-content-center align-items-center border object-actions')
      .style('flex-direction','column').style('height','42px').style('min-width','55px');
      let divisonOfDevtas = divisonOfDevtasContainer.attr('data-action-object', `${that.BASE_URL}assets/icons/dots.svg`).append('img').attr('src', `${that.BASE_URL}assets/icons/dots.svg`).attr('width', 20);
      divisonOfDevtasContainer.append('span').style('margin-top','1px').style('font-size','9px').text('division of devtas');
  
      faceSelectbox.on("change", function() {
        let str = d3.select(this).node().value.split(',');
        let pointA = [parseInt(str[0]),parseInt(str[1])];
        let pointB = [parseInt(str[2]),parseInt(str[3])];
        let face = $('select[name = "select-face"] option:selected').text()
        // console.log(face)
        that.model.editFaceWall(that.mapId,face);
        that.faceCoords = [pointA, pointB];
        that.model.editFaceCoords(that.mapId, [pointA, pointB]);

        // that.start();
        that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle,);
        that.assist.drawMask({layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
        that.assist.drawBoundaries({layer: that.canvas, points: that.mapBoundariesCoords});
        that.assist.drawBharamNabhi({layer: that.canvas, centroid: that.centroid});
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
        that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle,);

        that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
        that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle()+that.angle,that.centroid,that.mapBoundariesCoords, that.division);
        that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

        // ? DRAW BAR CHART
        that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
        

      })

      gridSelectbox.on("change", function() {
        let division = d3.select(this).property('value');
        that.division = division;

        // that.start();
        that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle);
        that.assist.drawMask({layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
        that.assist.drawBoundaries({layer: that.canvas, points: that.mapBoundariesCoords});
        that.assist.drawBharamNabhi({layer: that.canvas, centroid: that.centroid});
        that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
        that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
        that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);

        that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
        that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle()+that.angle,that.centroid,that.mapBoundariesCoords, that.division);
        that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

        // ? DRAW BAR CHART
        that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
      })

      degreeUpdateBtn.on("click", function() {
       
          let theta = (angleInputbox.property('value') == "") ? 0 : parseFloat(angleInputbox.property('value'));
          that.angle = -theta;
          that.model.editDegree(that.mapId, angleInputbox.property('value'));
          d3.select(".facing-degree").text(`${Math.abs(theta)}°`);
  
          // that.start();
          that.assist.drawBackgroundGrid(that.canvas, that.centroid, that.faceCoords, that.division, that.angle);
          that.assist.drawMask({layer: that.canvas, points: that.mapBoundariesCoords, size: that.RECT_SIZE});
          that.assist.drawBoundaries({layer: that.canvas, points: that.mapBoundariesCoords});
          that.assist.drawBharamNabhi({layer: that.canvas, centroid: that.centroid});
          that.assist.drawDirectionLines(that.canvas, that.faceCoords, that.centroid, that.division, that.angle);
          that.assist.drawFacingLine(that.canvas, that.centroid, that.faceCoords);
          that.assist.drawGrid(that.canvas, that.centroid, that.faceCoords, that.screenBoundariesCoords, that.division, that.angle);
  
          that.screenPolygons = Utility.getIntersectionPoints(that.calNorthAngle(),that.centroid,that.screenBoundariesCoords, that.division);
          that.mapPolygonsArray = Utility.getIntersectionPoints(that.calNorthAngle()+that.angle,that.centroid,that.mapBoundariesCoords, that.division);
          that.mapPolygonsAreaArray = Utility.getPolygonsArea(that.mapPolygonsArray);

          // for(let i in that.mapPolygonsArray){
          //   for(let j in that.mapPolygonsArray[i])
          //   that.secondLayer.append('polygon').attr('points',that.mapPolygonsArray[i][j]).style('fill-opacity','0').style('stroke','green').style('stroke-width','5');
          // }

          // ? DRAW BAR CHART
          that.modal.drawMap({areaArr: that.mapPolygonsAreaArray, division: that.division, dimension: that.distanceBetweenTwoPoints});
      })

      //click from toolbar vpm event
      // $('#vpm').on('click',function(){
      // $('#vpmimg').click()
      // })

      //click from toolbar mvpc event
      // $('#mvpc').on('click',function(){
      //   $('#mvpcimg').click()
      //   })
      
      vpm.on('click', function() {
        
        if(classRef.objectVpm == null || classRef.objectVpm == undefined) {
          d3.select('.properties-section.opacity').classed('d-none',false);
          d3.select(this.parentNode).classed('active', true);
          that.model.editVpmtoggle(that.mapId,true);
          let data = {
            name: "VPM",
            src: that.BASE_URL+'assets/images/vpm.svg',
            width: 400,
            height: 400,
            x: that.centroid.x - 400 / 2,
            y: that.centroid.y - 400 / 2,
            transfrom: "",
            northAngle: that.calNorthAngle(),
            angle: that.angle
          }
          classRef.objectVpm = new Object({
            layer: that.canvas,
            data: data
          });
        } else {
          that.objectDelete('VPM');
          classRef.objectVpm = null;
        }

        if(classRef.objectVpm == null || classRef.objectVpm == undefined)
          d3.select(this.parentNode).classed('active', false);

      })

      mvm.on('click', function() {
        if(classRef.objectMvm == null || classRef.objectMvm == undefined) {
          d3.select('.color-state-wrapper').classed('d-none', false);
          d3.select('.properties-section.opacity').classed('d-none',false);
          d3.select(this.parentNode).classed('active', true);
          that.model.editMvpctoggle(that.mapId,true);
          let data = {
            name: "MVM",
            src: that.BASE_URL+'assets/images/MVPC.svg',
            width: 400,
            height: 400,
            x: that.centroid.x - 400 / 2,
            y: that.centroid.y - 400 / 2,
            transfrom: "",
          }
          classRef.objectMvm = new Object({
            layer: that.canvas,
            data: data
          });
        } else {
          d3.select('.color-state-wrapper').classed('d-none', true);
          that.objectDelete('MVM');
          classRef.objectMvm = null; 
        }

        if(classRef.objectMvm == null || classRef.objectMvm == undefined)
          d3.select(this.parentNode).classed('active', false);

      })

      divisonOfDevtasContainer.on('click', function() {
        console.log(d3.select(this).classed('active'), 'working');
        if(d3.select(this).classed('active') == false) {
          console.log('in');
          if(d3.polygonContains(that.mapBoundariesCoords, [that.centroid.x,that.centroid.y])) {
            console.log('in');
            d3.select(this).classed('active', true);
            that.assist.drawDivisionOfDevtas(that.angle,that.canvas, that.mapBoundariesCoords, that.faceCoords, that.centroid);
          }else {
            alert("Software does not cater for this requirement currently");
          }
        }else {
          d3.select(this).classed('active', false);
          that.assist.drawDivisionOfDevtas(that.angle, that.canvas, that.mapBoundariesCoords, that.faceCoords, that.centroid, false);
        }
      })


      this.actionbox.show();
  
    }

}