import ActionBox from "../helper/actionbox.class.js";
import Utility from "../helper/utility.class.js";
import Object from '../object.class.js';

export default class StageZero {
  constructor() {
    this.actionbox = new ActionBox();
  }

  startDrawing(REF) {

    let that = REF;
    let angleCount = 0;

    this.actionBox = this.actionbox.clear().get();

    this.actionBox.append('p')
    .attr('class','text-uppercase text-sm actionbox-text')
    .text('Rotate');

    this.actionBody = this.actionBox.append('div')
    .attr('class','row actionbox-body');

    this.rotator = this.actionBody.append('div')
    .attr('class','col-md-12 d-flex justify-content-center mb-2').append('button')
    .attr('class','btn btn-outline-success btn-sm btn-block text-sm')
    .html('90 Degree');

    this.actionBtnYes = this.actionBody.append('div')
    .attr('class','col-md-12 d-flex justify-content-center mt-2')
    .append('button')
    .attr('class','btn btn-outline-primary btn-sm btn-block text-sm m-auto')
    .html('START PINNING');

    this.actionbox.show();

//Clicking on 90 degree roation button
    this.rotator.on("click", (e) => {
      let angles = ['matrix(0,1,-1,0,792.5,-237.5)','matrix(-1,0,0,-1,1030,555)',
      'matrix(0,-1,1,0,237.5,792.5)','matrix(1,0,0,1,0,0)'];

      // let angles = ['rotate(90)','rotate(180)','rotate(270)','rotate(360)'];

      if(angleCount == 4) angleCount = 0;

      //Selecting the uploaded image and attaching a wrapper to it
      let object = d3.select('.svg-object[data-object="map"]');
      let id = object.attr('id');
      let wrapper = d3.select(`.sjx-svg-wrapper[data-id="${id}"]`);

      //Saving uploaded image object properties like width, height and
      //centre of canvas
      let objectName = object.attr('data-object');
      let src = object.select('image').attr('href');
      let width = object.select('image').attr('width');
      let height = object.select('image').attr('height');
      let position = Utility.centerOfCanvas(that.canvasSize, width, height);

      object.remove();
      wrapper.remove();

      //Storing image properties to recreate
      let data = {
        name: objectName,
        src: src,
        x: position.x,
        y: position.y,
        width: width,
        height: height,
        transform: angles[angleCount]
      }

      let objectInstance = new Object({
        layer: that.canvas,
        data: data,
      });
      
      angleCount++;
    })

    //Once required rotation is done move on
    //by saving image data into local storage and performing start() function of stage 1
    this.actionBtnYes.on("click", (e) => {

        this.actionbox.clear().hide();

        let object = d3.select('.svg-object[data-object="map"]');
        let image = object.select('image.object')
        let data = {
          id: that.mapId,
          name: "map",
          src: image.attr('href'),
          x: image.attr('x'),
          y: image.attr('y'),
          width: image.attr('width'),
          height: image.attr('height'),
          transform: (object.attr('transform') == null) ? "abc" : object.attr('transform')
        }

        // console.log("x",x,"y",y,"width",width,"height",height,"transform",transform,"src",src);

        that.houseMap = that.model.add({ id: that.mapId, image: data});

        // that.model.editMapImageData(that.mapId,{"x":x, "y":y, "width":width, "height":height, "src":src, "transform":transform});
        // that.model.editStage(that.mapId, 1);
        
        that._stage = 1;
        that.start();

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