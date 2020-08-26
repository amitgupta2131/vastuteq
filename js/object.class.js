import ObjectModel from './helper/objectmodel.class.js';

export default class Object {

  constructor({mapId, layer, data}) {

    this.mapId = mapId;
    this.layer = layer;
    this.data = data;

    this.objectModel = new ObjectModel();

    this.id = (data.id != undefined) ? data.id : this.uniqueID();

    d3.selectAll(`.svg-object`).classed('deactive', true);
    d3.selectAll(`.svg-object`).classed('active', false);
    d3.selectAll(`.sjx-svg-wrapper`).classed('d-none', true);
    $('#myRange').val(1);
    $('.range-value').text(1);

    this.g = this.layer.append("g")
    .classed('svg-object', true)
    .classed('active', true)
    .classed('saved', (data.id != undefined || data.saveable != undefined)? true : false)
    .attr('data-id',this.id)
    .attr('data-object', data.name)
    .attr('opacity',1)
    .attr('transform', (data.transform === "abc") ? null : data.transform );

    this.g.append('image')
    .classed('object', true)
    .attr('xmlns','http://www.w3.org/2000/svg')
    .attr("xlink:href", data.src)
    .attr('x', data.x)
    .attr('y', data.y)
    .attr("width", data.width)
    .attr("height", data.height);

    this.init();

  }

  init() {
    let that = this;

    let objectModelData = {
      id: this.id,
      name: this.data.name,
      src: this.data.src,
      x: this.data.x,
      y: this.data.y,
      width: this.data.width,
      height: this.data.height,
      transform: "abc",
      type: this.data.type
    }

    // object
    this.svgOptions = {
          container: '#vastuteqCanvas',
          rotationPoint: false,
          proportions: true,
          snap: {
              x: 10,
              y: 10,
              angle: 5
          },
          cursorMove: 'move',
          cursorRotate: 'crosshair',
          cursorResize: 'pointer',  
      

          onInit(el) {
            // fires on tool activation
            if(that.data.saveable != undefined){
              console.log('in');
               that.objectModel.add(that.mapId, objectModelData)
            }

          },
            onMove({ clientX, clientY, dx, dy, transform }) {
              // fires on moving

            },
            onResize({ clientX, clientY, dx, dy, width, height }) {
                // fires on resizing
                if(d3.select('.svg-object.saved.active[data-object]').node() != null) {

                  let object  = d3.select('.svg-object.saved.active[data-object]');
                  let objectId = object.attr('data-id');
                  let image = object.select('image.object');

                  let x = image.attr('x'), y = image.attr('y');
                  let objectTransform = object.attr('transform');

                  that.objectModel.editProperties(
                    objectId,
                    {x:x, y:y, width:width, height:height, transform:objectTransform}
                  );
                }
            },
            onRotate({ clientX, clientY, delta, transform }) {
                // fires on rotation
                if(d3.select('.svg-object.saved.active[data-object]').node() != null) {
                  let object  = d3.select('.svg-object.saved.active[data-object]');
                  let objectId = object.attr('data-id');
                  let image = object.select('image.object');

                  let x = image.attr('x'), y = image.attr('y');
                  let width = image.attr('width'), height = image.attr('height');
                  let objectTransform = object.attr('transform');

                  that.objectModel.editProperties(
                    objectId,
                    {x:x, y:y, width:width, height:height, transform:objectTransform}
                  );
                }
            },
          onDrop({ clientX, clientY }) {
              // fires on drop
              if(d3.select('.svg-object.saved.active[data-object]').node() != null) {
                let object  = d3.select('.svg-object.saved.active[data-object]');
                let objectId = object.attr('data-id');
                let image = object.select('image.object');
                let x = image.attr('x'), y = image.attr('y');
                let width = image.attr('width'), height = image.attr('height');
                let objectTransform = object.attr('transform');

                that.objectModel.editProperties(
                  objectId,
                  {x:x, y:y, width:width, height:height, transform:objectTransform}
                );
              }
          },
          onDestroy(el) {
              // fires on tool deactivation
          }
    };
  
    this.object = subjx(`.svg-object[data-id="${this.id}"]`).drag(this.svgOptions);
    this.controls = this.object[0].controls;
    this.controls.setAttribute("data-id",this.id);

    //Code to rotate VPM to North
    if(this.data.name == "VPM" || this.data.name == "9MS") {
      let vpmObject = d3.select(`.svg-object[data-object='${this.data.name}']`).select('image.object');
      let x = parseFloat(vpmObject.attr('x')), y = parseFloat(vpmObject.attr('y')), 
      width = parseFloat(vpmObject.attr('width')), height = parseFloat(vpmObject.attr('height'));
      let vpmPolygon = [[x,y], [x+width,y], [x+width,y+height], [x,y+height]];
      let vpmCentroid = d3.polygonCentroid(vpmPolygon);
      let edgeAngle = this.calTopRightEdgeAngle((x+width),y,vpmCentroid[0],vpmCentroid[1])

      this.object[0].exeRotate({
        delta : this.degreesToRadians(45 + (this.data.northAngle + this.data.angle) - edgeAngle)
      });
    }
  }

  remove(objectName) {
    d3.select(`.svg-object[data-object="${objectName}"]`).remove();
  }

  getObject() {
    return {'objectName':this.data.name, 'controls':this.object[0].controls, 'active': true};
  }

  degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  calTopRightEdgeAngle(ex, ey, cx, cy) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  uniqueID(length = 12) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
  }


}
