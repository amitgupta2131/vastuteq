import Utility from './helper/utility.class.js';
import Attribute from './handlers/attribute.class.js';
import Model from './helper/model.class.js';
import Modal from './helper/modal.class.js';
import Object from './object.class.js';
import Assist from './helper/assist.class.js';
import ActionBox from './helper/actionbox.class.js';
import StageZero from './stages/stagezero.class.js';
import StageFirst from './stages/stagefirst.class.js';
import StageSecond from './stages/stagesecond.class.js';
import StageThird from './stages/stagethird.class.js';
import StageFourth from './stages/stagefourth.class.js';
import StageFifth from './stages/stagefifth.class.js';
import Draw from './draw.class.js';

class App {

  constructor({BASE_URL, DIRECTION_DATA}) {

    // ?  C L A S S  V A R I A B L E 
    this.isCreatingMap = false;
    this.hasImportedMap = false;

    this.BASE_URL = BASE_URL;
    this.DIRECTION_DATA = DIRECTION_DATA;
    this.fill = '#EF5350';
    this.strokeWidth = 2;
    this.strokeColor = '#6869AB';
    this.objectDataList = [];

    
    this.model = new Model();

    this.imageData = [];
    this.zoomData = { x: 0, y: 0, k: 1 };
    this.DISABLE = true;

    // ?  H O U S E  M A P

    this.mapId = (localStorage.hasOwnProperty('selectedMapId') == true) ? 
    localStorage.getItem("selectedMapId") : null;

    this.houseMap = this.model.getHouseMap(this.mapId)[0];
    this.mapBoundariesCoords = (this.mapId == null) ? [] : this.houseMap.customBoundariesCoords;
    this.centroid = (this.mapId == null) ? [] : this.houseMap.centroid;
    this.faceCoords = (this.mapId == null) ? [] : this.houseMap.faceCoords;
    this.distanceBetweenTwoPoints = (this.mapId == null) ? null : this.houseMap.dimension;
    this.angle = (this.mapId == null) ? 0 : -parseFloat(this.houseMap.degree);
    this._stage = (this.mapId == null) ? 0 : this.houseMap.stage;
    this.selectedDirection = this.DIRECTION_DATA.sixteen;
    this._type = (this.mapId == null) ? 0 : this.houseMap.type;
    this.division = 16;

    // ?  A P P  F U N C T I O N A L I T Y
    this.zoomDisplay = d3.select('.zoom-display');

    // ?  C A N V A S  S I Z E
    this.canvasSize = {
      width: d3.select("#drawArea").node().offsetWidth,
      height: d3.select("#drawArea").node().offsetHeight,
    };

    // ?  Z O O M
    this.zoom = d3.zoom()
      .on("zoom", () => {
        this.canvas.attr("transform", d3.event.transform);
        $(".zoom-display").val(Math.round(d3.event.transform.k * 100));
        this.zoomData = d3.event.transform;
      });

    // ?  M A I N  C A N V A S

    this.svg = d3
      .select("#drawArea")
      .append("svg")
      .attr("id", "canvas")
      .attr("width", this.canvasSize.width)
      .attr("height", this.canvasSize.height)

    this.canvas = this.svg
      .append("g")
      .attr("id", "main-group");


    // ? O B J E C T 
    this.activeObject;
    this.assist = new Assist();
    this.actionbox = new ActionBox();
    this.modal = new Modal();

    // ? I M P O R T E D  C L A S S E S
    this.attribute = new Attribute()
      .setX(0).setY(0)
      .setWidth(this.canvasSize.width)
      .setHeight(this.canvasSize.height)
      .setAngle(0);


    // ?  A L L  E V E N T  L I S T E N E R  F U N C T I O N S
    this._menuItemListener();
    this._dropItemEventListener();
    this._objectEventListener();
    this._zoomEventListener();
    this._windowResizeEventListener();
    this._objectPropertiesEventListener();
    this._alignObejctToBrahmnabhi();
    this._activityObjectsEventHandler();
    this._objectListener();
    this._colorStateEventListener();
  



    // ?  A P P  I N I T I A L I Z E
    this._init();
  }

  // ?  A L L  L O C A L  F U N C T I O N S
  _init() {
    let that = this;

    // //FIRST LAYER OF GROUP FOR HOUSE MAP IMAGE
    // this.firstLayer = this.canvas.append("g").attr("id", "firstLayer").style('pointer-events', 'all');

    // //SECOND LAYER OF GROUP FOR BACKGROUND GRID
    // this.secondLayer = this.canvas.append("g").attr("id", "secondLayer");

    this.RECT_SIZE = {
      x: Utility.centerOfCanvas(this.canvasSize, 1200, 1200).x,
      y: Utility.centerOfCanvas(this.canvasSize, 1200, 1200).y,
      width: 1200,
      height: 1200
    }

    this.screenBoundariesCoords = [
      [this.RECT_SIZE.x, this.RECT_SIZE.y],
      [this.RECT_SIZE.width, this.RECT_SIZE.y],
      [this.RECT_SIZE.width, this.RECT_SIZE.height],
      [this.RECT_SIZE.x, this.RECT_SIZE.height]
    ]

    // this.rect = this.secondLayer
    // .append("rect")
    // .attr('data-object','rects')
    // .attr("x", this.RECT_SIZE.x)
    // .attr("y", this.RECT_SIZE.y)
    // .attr("width", this.RECT_SIZE.width)
    // .attr("height", this.RECT_SIZE.height)
    // .style("fill-opacity", 0)
    // .style("stroke-dasharray", 10)
    // .style("stroke", "#68b2a1")
    // .style("stroke-width", 4);

    if(this.mapId != null) {
      d3.select('.drawing-tools').classed('d-none', true);

      let data = {
        matrix: this.houseMap.imageData.matrix,
        src: this.houseMap.imageData.src,
        width: this.houseMap.imageData.width,
        height: this.houseMap.imageData.height,
        x: this.houseMap.imageData.x,
        y: this.houseMap.imageData.y,
      };


      let object = new Object({
        layer: this.canvas,
        data: data,
        objectName: 'map',
        attribute: this.attribute,
        transform: this.houseMap.imageData.transform,
      });
      //console.log(object.getObject());
      this.hasImportedMap = true;
      d3.select('#rightSidebar').classed('d-none', false);

      this.start();
    }

  }

  _mapInit() {



    // INITIALIZING STAGE
    this._stage = 0;

    //  M O U S E  E V E N T S
    this.addMouseEvent();

    d3.select('.drawing-tools').classed('d-none', true);
  
  }


  // ?  S T A R T

  start() {

    switch (this._stage) {
      // ? STAGE FOR TRANSFORM MAP
      case 0: {
        // STAGE ZERO
        this.displayMessage("Rotate/Resize House Map for best fit", "danger");
        let stageZero = new StageZero();
        stageZero.startDrawing(this);

      }
      break;
      // ?   STAGE FOR PIN BOUNDARIES
      case 1:
        {
          // STAGE FIRST
          this.wrapperDelete('map');
          this.displayMessage("Start pinning by simply clicking on map borders", "danger");
          let stageFirst = new StageFirst({ layer: this.canvas, className: "map-surface" });
          stageFirst.startDrawing(this);

        }
        break;
      // ? STAGE FOR FACING POINT SELECTION
      case 2:
        {
          // STAGE SECOND
          let stageSecond = new StageSecond();

          if(this._type == "custom") {
            this.wrapperDelete('map');
            this.displayMessage("Select facing wall", "danger");
            this.assist.drawMask({ layer: this.canvas, points: this.mapBoundariesCoords, size: this.RECT_SIZE });
            this.assist.drawBoundaries({ layer: this.canvas, points: this.mapBoundariesCoords });
            this.assist.drawBharamNabhi({ layer: this.canvas, centroid: this.centroid });
            stageSecond.startDrawing(this);
          } else {
            d3.select('.properties-section.decs').classed('d-none',true);
            this.wrapperDelete('map');
            this.hideMessage();
            this.division = 8;
            this.selectedDirection = this.DIRECTION_DATA.eight;
            this.faceCoords = [this.mapBoundariesCoords[0],this.mapBoundariesCoords[1]];

            this.assist.drawMask({ layer: this.canvas, points: this.mapBoundariesCoords, size: this.RECT_SIZE });
            this.assist.drawPolygon(this.canvas, this.mapBoundariesCoords, 3, true, false);
            this.assist.drawBharamNabhi({ layer: this.canvas, centroid: this.centroid });
            this.assist.drawGrid(this.canvas, this.centroid, this.faceCoords, this.screenBoundariesCoords, this.division, this.angle, this.selectedDirection, this._type);
            this.assist.drawDirectionLines(this.canvas, this.faceCoords, this.centroid, this.division, this.angle);
            stageSecond.startVedic(this);
          }


        }
        break;
      case 3:
        {

          // STAGE THIRD
          this.hideMessage();
          this.wrapperDelete('map');

          d3.select('.align-center-wrapper').classed('d-none',false);
          d3.select('.zoom-state-wrapper').classed('d-none',false);
          d3.select('.zoom-wrapper').classed('d-none',false);

          this.assist.drawBackgroundGrid(this.canvas, this.centroid, this.faceCoords, this.division, this.angle, this.DIRECTION_DATA.sixteen);
          this.assist.drawMask({ layer: this.canvas, points: this.mapBoundariesCoords, size: this.RECT_SIZE });
          this.assist.drawBoundaries({ layer: this.canvas, points: this.mapBoundariesCoords });
          this.assist.drawBharamNabhi({ layer: this.canvas, centroid: this.centroid });
          this.assist.drawDirectionLines(this.canvas, this.faceCoords, this.centroid, this.division, this.angle);
          this.assist.drawFacingLine(this.canvas, this.centroid, this.faceCoords);
          this.assist.drawGrid(this.canvas, this.centroid, this.faceCoords, this.screenBoundariesCoords, this.division, this.angle, this.DIRECTION_DATA.sixteen);
          d3.select('.facing-degree').text(`${Math.abs(this.angle)}°`)

          this.screenPolygons = Utility.getIntersectionPoints(this.calNorthAngle(), this.centroid, this.screenBoundariesCoords, this.division);
          this.mapPolygonsArray = Utility.getIntersectionPoints(this.calNorthAngle()+this.angle, this.centroid, this.mapBoundariesCoords, this.division);
          this.mapPolygonsAreaArray = Utility.getPolygonsArea(this.mapPolygonsArray);

          // console.log(this.screenBoundariesCoords,this.mapBoundariesCoords,this.faceCoords,typeof this.centroid.x);
          // console.log(this.screenPolygons,this.mapPolygonsArray,this.mapPolygonsAreaArray);

          // ? DRAW BAR CHART
          this.modal.drawMap({ areaArr: this.mapPolygonsAreaArray, division: this.division, dimension: this.distanceBetweenTwoPoints });

          let stageThird = new StageThird(this.attribute);
          stageThird.startDrawing(this);


        }
        break;
      case 4:
        {

          // STAGE FOURTH
          this.displayMessage("Select two points to define scale of the drawing", "danger");
          let layer = d3.select('#drawArea').append('svg').attr('id','drawCanvas');
          let stageFourth = new StageFourth({ layer: layer, className: "find-distance" });
          stageFourth.startDrawing(this);

        }
        break;
        case 5:
        {

          // STAGE FOURTH
          this.displayMessage("Select two points to define scale of the drawing", "danger");
          let layer = d3.select('#drawArea').append('svg').attr('id','drawCanvas');
          let stageFifth = new StageFifth({ layer: layer, className: "find-distance" });
          stageFifth.startDrawing(this);

        }
        break;
      default:
        break;

    }

  }


  end(stage) {
    this.DISABLE = true;
    this._response = false;
    stage.end(this);
  }



  // ?  M O U S E   E V E N T S
  addMouseEvent() {
    // CLASS REFERENCE
    let that = this;

    d3.select('#canvas').on('click', function () {
      let zoomActive = (d3.select('#zoom-state').attr('data-zoom-state') == 'enable') ? true : false;
      if (zoomActive) {
        that.showToast("Warning!", "Please disable zoom first", "Reset", this)
      }
    })

  }


  // ?  A L L  G E T T E R S  A N D  S E T T E R S  ? //

  set activeTool(tool) {
    this.tool = tool;
  }

  set activeStrokeWidth(width) {
    this.strokeWidth = width;
  }

  set activeStrokeColor(color) {
    this.strokeColor = color;
  }

  set activeFill(fill) {
    this.fill = fill;
  }




  // ?  A L L  L I S T E N E R  F U N C T I O N  ? //

  _activityObjectsEventHandler() {
    // CLASS REFERENCE
    let that = this;

    //For objectbar
    d3.select('.nav-link.object-toggle').on('click', function () {
      (d3.select('#objectbar').classed('active') == true) ?
        d3.select('#objectbar').classed('active', false) :
        d3.select('#objectbar').classed('active', true);
    })

    //For activitybar
    d3.select('.nav-link.object-toggle1').on('click', function () {
      (d3.select('#activitybar').classed('active') == true) ?
        d3.select('#activitybar').classed('active', false) :
        d3.select('#activitybar').classed('active', true);
    })

    //For Print
    d3.select('#print').on('click', function () {
      window.print();
    })


    d3.selectAll('.object-item').on('click', function () {
      let src = d3.select(this).attr('data-src');
      let objectName = d3.select(this).attr('data-name');
      console.log('title',objectName,d3.select(this));

      let size = {width: 70, height: 70}
      let position = Utility.centerOfCanvas(that.canvasSize, size.width, size.height);

      let data = {
        src: src,
        width: size.width,
        height: size.height,
        x: position.x,
        y: position.y
      };

      let object = new Object({
        layer: that.canvas,
        data: data,
        objectName: objectName,
        attribute: that.attribute
      });

    })
  }


  // ? A L I G N  O B J E C T  T O  C E N T E R
  _alignObejctToBrahmnabhi() {
    // CLASS REFERENCE
    let that = this;

    d3.select('[name="align-center"]').on('click', () => {
      if (d3.select('.svg-object.active[data-object]').node() != null) {

        let object = d3.select('.svg-object.active[data-object]');
        let id = object.attr('id');
        let wrapper = d3.select(`.sjx-svg-wrapper[data-id="${id}"]`);


        let objectName = object.attr('data-object');
        let src = object.select('image').attr('href');
        let width = object.select('image').attr('width');
        let height = object.select('image').attr('height');
        let x = this.centroid.x - width / 2;
        let y = this.centroid.y - height / 2;

        object.remove();
        wrapper.remove();

        // console.log("x",object.select('image').attr('x'),"y",object.select('image').attr('x'));

        let data = {
          src: src,
          width: width,
          height: height,
          x: x,
          y: y
        }
        let objectInstance = new Object({
          layer: that.canvas,
          data: data,
          canvasSize: that.canvasSize,
          objectName: objectName,
          attribute: that.attribute,
        });

        // object.select('image').attr('x', `${this.centroid.x - width / 2}`);
        // object.select('image').attr('y',`${this.centroid.y - height / 2}`);
        // console.log(this.centroid.x - width / 2,this.centroid.y - height / 2);
        // object.attr('transform',"").attr('data-cx',"").attr('data-cy',"");
        // wrapper.attr('transform',"");
      }

    })
  }


  // ? O B J E C T  C L I C K  E V E N T  L I S T E N E R
  _objectEventListener() {
    // CLASS REFERENCE
    let that = this;

    let x = this.attribute.getXAttribute();
    let y = this.attribute.getYAttribute();
    let width = this.attribute.getWidthAttribute();
    let height = this.attribute.getHeightAttribute();
    let angle = this.attribute.getAngleAttribute();
    let opacity = this.attribute.getOpacityAttribute();

    x.on('change', function () {
      let value = d3.select(this).property('value');
      let string = d3.select('.active[data-map-object]').style('transform')
      let numbers = string.match(/[+-]?\d+/g).map(Number);
      let xValue = numbers[4], yValue = numbers[5];
      d3.select('.active[data-map-object]').attr('transform', `translate(${value},${yValue})`)
      // console.log("x and y: ",xValue,typeof xValue," | ",yValue,typeof yValue);
    })

    y.on('change', function () {
      let value = d3.select(this).property('value');
      let string = d3.select('.active[data-map-object]').style('transform')
      let numbers = string.match(/[+-]?\d+/g).map(Number);
      let xValue = numbers[4], yValue = numbers[5];
      d3.select('.active[data-map-object]').attr('transform', `translate(${xValue},${value})`)
      // console.log(string, numbers, "x and y: ", xValue, typeof xValue, " | ", yValue, typeof yValue, `translate(${xValue},${value})`);
    })

    opacity.on('change', function () {
      let value = d3.select(this).property('value');
      d3.select('.range-value').text(value);

      d3.select('.svg-object.active[data-object]').style('opacity', value);
    })

  }

  // ? M E N U  I T E M  L I S T E N E R
  _menuItemListener() {
    // CLASS REFERENCE
    let that = this;

    d3.selectAll('[data-menu-item]').on('click', function () {
      let menuItem = d3.select(this).attr('data-menu-item');
      switch (menuItem) {
        case "new file": {
          that.isCreatingMap = true;
          that.draw = new Draw();
        }
          break;
        case "import map": {
          let content = $('#main-group').html()
          if (content == '') {
            document.querySelector('input.import-map-file').click();
          } else {
            let result = confirm("There is already a map imported, Would you like to discard all changes");
            if (result) {
              $('#main-group').empty();
              // alert(propertyId)
              localStorage.removeItem("houseMaps");
              that.model.deleteHouseMapDB(propertyId)
              document.querySelector('input.import-map-file').click();
            }
          }

          //  alert()
        }
          break;

        case "save" : {
          let id = propertyId
          let updatedField = { name: 'complete', value: '1' };
          let houseMaps = that.model.getHouseMap(propertyId)
          let result = that.model.updateHouseMapInDataBase(id, houseMaps, updatedField);
          showAlert("Saved successfully",'success')
        }
        break;
        case "vpm": {
          let size = {width: 400, height: 400}
          let position = Utility.centerOfCanvas(that.canvasSize, size.width, size.height);

          let data = {
            src: `${that.BASE_URL}assets/images/vpm.svg`,
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y
          }
          let object = new Object({
            layer: that.secondLayer,
            data: data,
            objectName: 'VPM',
            attribute: that.attribute
          });
        }
          break;
        case "mvpc": {
          let size = {width: 400, height: 400}
          let position = Utility.centerOfCanvas(that.canvasSize, size.width, size.height);

          let data = {
            src: `${that.BASE_URL}assets/images/mvm.svg`,
            width: size.width,
            height: size.height,
            x: position.x,
            y: position.y
          }
          let object = new Object({
            layer: that.secondLayer,
            data: data,
            objectName: 'MVPC',
            attribute: that.attribute
          });
        }
          break;
        case "measuring-tape": {
          that._stage = 4;
          that.start();
        }
        break;
        case "get-measurement": {
          console.log(that.distanceBetweenTwoPoints);
          if(that.distanceBetweenTwoPoints != null){
          that._stage = 5;
          that.start();
          }else {
            alert("Please set measurement first!!");
          }
        }
        break;
        case "dashboard": {

        }
        case "new-project": {

        }
        case "aayadi-calculator": {

        }
        case "devtas": {

        }
        break;
        default:
          break;
      }
    })

    document.querySelector("input.import-map-file").addEventListener("change", function () {

      var file = document.querySelector("input.import-map-file").files[0];
      if (file.type != "image/jpeg" && file.type != "image/jpg" && file.type != "image/png") {
        showAlert("Only JPEG,PNG and JPG files are allowed",'danger')
      } else {
        var reader = new FileReader();

        reader.addEventListener("load", (e) => {
          let imageData = reader.result;
          let img = new Image();

          img.onload = function () {
            // image  has been loaded
            let size = Utility.resizeObject(that.canvasSize, this.width, this.height);
            let position = Utility.centerOfCanvas(that.canvasSize, size.width, size.height);

            let data = {
              src: img.src,
              width: size.width,
              height: size.height,
              x: position.x,
              y: position.y
            };

            that._mapInit();

            let object = new Object({
              layer: that.canvas,
              data: data,
              objectName: 'map',
              attribute: that.attribute
            });


            that.mapId = propertyId;
            that.houseMap = that.model.add({ id: that.mapId, image: { src: img.src, width: size.width, height: size.height, x:position.x, y:position.y, transform: "" } });
            localStorage.setItem("selectedMapId", that.mapId);
            that.hasImportedMap = true;
            d3.select('#rightSidebar').classed('d-none', false);
            that.start();
            that.DISABLE = false;

          };

          img.src = imageData;

        }, false);

        if (file) {
          reader.readAsDataURL(file);
        }
      }


    });
  }



  // ?  D R O P  O B J E CT   E V E N T  L I S T E N E R
  _dropItemEventListener() {

    document.querySelector("#drawArea").addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    document.querySelector("#drawArea").addEventListener("drop", (e) => {
      e.preventDefault();

      let that = this;
      let file = e.dataTransfer.files;

      if (file || file[0]) {
        let reader = new FileReader();
        reader.readAsDataURL(file[0]);
        reader.onloadend = function (e) {
          let imageData = e.target.result;
          let img = new Image();

          img.onload = function () {
            // image  has been loaded

            let size = Utility.resizeObject(that.canvasSize, this.width, this.height);
            let position = Utility.centerOfCanvas(that.canvasSize, size.width, size.height);

            let data = {
              src: img.src,
              width: size.width,
              height: size.height,
              x: position.x,
              y: position.y
            };

            let object = new Object({
              layer: that.canvas,
              data: data,
              objectName: 'map',
              attribute: that.attribute
            });

            that.mapId = propertyId;
            that.houseMap = that.model.add({ id: that.mapId, image: { src: img.src, width: size.width, height: size.height, x:position.x, y:position.y, transform: "" } });
            localStorage.setItem("selectedMapId", that.mapId);
            that.hasImportedMap = true;
            d3.select('#rightSidebar').classed('d-none', false);
            that.start();
            that.DISABLE = false;

          };
          img.src = imageData;
        };
      }
    });

  }


  // ?   L I S T E N E R
  _attributeEventListener() {
    // CLASS REFERENCE
    let that = this;

    // OBJECT ON CLICK LISTENER
    this.attribute.on('click', function () {
      let name = d3.select(this).attr('data-object');
      let property = d3.select(this).node().getBoundingClientRect();
      d3.selectAll('[data-object]').classed('active-object', false);
      d3.select(this).classed('active-object', true);
      that.active = d3.select(this);

      that.attribute.setName(name)
      that.attribute.setX(property.x)
      that.attribute.setY(property.y)
      that.attribute.setWidth(property.width)
      that.attribute.setHeight(property.height)
      that.attribute.setAngle(0)

    })
  }


  // ?  Z O O M  E V E N T  L I S T E N E R
  _zoomEventListener() {
    // CLASS REFERENCE
    let that = this;

    // ZOOM LISTENER
    d3.select('.zoom-display').on('keyup', function () {
      if (that.zoomState == false) return false;
      let zoom = d3.select(this).property('value') / 100;
      let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * zoom), (that.canvasSize.height * zoom)).x;
      let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * zoom), (that.canvasSize.height * zoom)).y;
      let newK = zoom
      that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
      that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
    })


    d3.selectAll('[data-zoom]').on('click', function () {
      if (that.zoomState == false) return false;

      let zoom = d3.select(this).attr('data-zoom');

      switch (zoom) {
        case "35": {
          let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 0.35), (that.canvasSize.height * 0.35)).x;
          let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 0.35), (that.canvasSize.height * 0.35)).y;
          let newK = 0.35
          that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
          that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
          $(".zoom-display").val(35);
        }
          break;
        case "50": {
          let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 0.5), (that.canvasSize.height * 0.5)).x;
          let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 0.5), (that.canvasSize.height * 0.5)).y;
          let newK = 0.5
          that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
          that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
          $(".zoom-display").val(50);
        }
          break;
        case "100": {
          let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 1), (that.canvasSize.height * 1)).x;
          let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 1), (that.canvasSize.height * 1)).y;
          let newK = 1
          that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
          that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
          $(".zoom-display").val(100);
        }
          break;
        case "200": {
          let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 2), (that.canvasSize.height * 2)).x;
          let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 2), (that.canvasSize.height * 2)).y;
          let newK = 2
          that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
          that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
          $(".zoom-display").val(200);
        }
          break;
        case "fit": {
          let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 1), (that.canvasSize.height * 1)).x;
          let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * 1), (that.canvasSize.height * 1)).y;
          let newK = 1
          that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
          that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
          $(".zoom-display").val(200);
        }
          break;
        default:
          break;
      }
    })

    // ZOOM STATE
    d3.select('#zoom-state').on('click', function () {
      let element = d3.select(this);
      let state = element.attr('data-zoom-state');
      if (state === 'enable') {
        that.zoomState = false;
        that.svg.on('.zoom', null);
        element.attr('data-zoom-state', 'disable');
        element.select('img').attr('src', `${that.BASE_URL}assets/icons/zoom-disable.svg`);
      } else {
        that.zoomState = true;
        that.svg.call(that.zoom)
        that.zoom.transform(that.canvas, d3.zoomIdentity.translate(that.zoomData.x, that.zoomData.y).scale(that.zoomData.k));
        element.attr('data-zoom-state', 'enable');
        element.select('img').attr('src', `${that.BASE_URL}assets/icons/zoom-enable.svg`);
      }
    })

  }


  // ?  W I N D O W  R E S I Z E  E V E N T  L I S T E N E R
  _windowResizeEventListener() {
    // CLASS REFERENCE
    let that = this;

    // WINDOW - RESIZER LISTENER
    d3.select(window).on('resize.updatesvg', function () {
      let width = d3.select("#drawArea").node().offsetWidth;
      let height = d3.select("#drawArea").node().offsetHeight;
  
      // ? RESIZE SVG ON WINDOW SIZE CHANGE
      that.svg.attr('width',width).attr('height',height);
      that.attribute.setWidth(width)
      that.attribute.setHeight(height)

      // ?  C A N V A S  S I Z E
      that.canvasSize = {
        width: width,
        height: height,
      };

    //   //  RECT SIZE RESIZE 
    //   that.RECT_SIZE = {
    //     x: Utility.centerOfCanvas(that.canvasSize, 3000).x,
    //     y: Utility.centerOfCanvas(that.canvasSize, 3000).y,
    //     width: 3000,
    //     height: 3000
    //   }

    //   // RECT 
    //   that.rect.attr('x', that.RECT_SIZE.x).attr('y', that.RECT_SIZE.y);
    })
  }


  // ?  O B J E C T  P R O P E R T I E S  E V E N T  L I S T E N E R
  _objectPropertiesEventListener() {

    // CLASS REFERENCE
    let that = this;

    // STRUCTURE PROPERTY 
    d3.selectAll('[data-structure-property]').on('change', function () {
      let property = d3.select(this).attr('data-structure-property');
      let value = d3.select(this).property('value');
      switch (property) {
        case "x": {
        }
          break;
        case "y": {

        }
          break;
        case "width": {

        }
          break;
        case "height": {

        }
          break;
        case "angle": {

        }
        default:
          break;
      }
    });

  }

  // ?  C O L O R  E V E N T  L I S T E N E R
  _colorEventListener() {
    d3.selectAll('[data-color]').on('click', function () {
      d3.selectAll('[data-color]').classed('active', false);
      d3.select(this).classed('active', true);

      this.color = d3.select(this).attr('data-color');

    })
  }

  // ?  S T R O K E  E V E N T  L I S T E N E R
  _colorEventListener() {
    d3.selectAll('.stroke-width').on('click', function () {

      this.stroke = d3.select(this).property('value');

    })
  }


  // ?  D 3  H E L P E R  F U N C T I O N S
  moving() {
    d3.select(this).attr("transform", d3.event.transform);
  }


  // ? C O L O R   S T A T E  L I S T E N E R
  _colorStateEventListener() {
    let that = this;
    d3.select('.color-state').on('click', function() {
      let colorState = d3.select(this);
      if(colorState.attr('data-color-state') == "colorless") {
        colorState.attr('data-color-state', "colorful");
        colorState.select('img').attr('src',`${that.BASE_URL}assets/icons/colorful.svg`);
        
        let object = d3.select(`g.svg-object[data-object="MVM"]`);
        let image = object.select('image.object');
        image.attr('xlink:href',`${that.BASE_URL}assets/images/mvm.svg`);

        // let transform = image.attr('transform'), x = image.attr('x'), y = image.attr('y'), 
        // width = image.attr('width'), height = image.attr('height');

        
      }else {
        colorState.attr('data-color-state', "colorless");
        colorState.select('img').attr('src',`${that.BASE_URL}assets/icons/colorless.svg`);
        
        let object = d3.select(`g.svg-object[data-object="MVM"]`);
        let image = object.select('image.object');
        image.attr('xlink:href',`${that.BASE_URL}assets/images/MVPC.svg`);

      }
    })
  }

  // 
  _objectListener() {
    $('body').on('dblclick', 'g.sjx-svg-wrapper', function() {
      let wrapper = $(this);
      let id = wrapper.attr('data-id');
      let object = $(`#${id}`);
      object.removeClass('active');
      object.addClass('deactive');
      wrapper.addClass('d-none');
    });
    $('body').on('dblclick', 'g.svg-object[data-object]', function() {
      d3.selectAll(`.svg-object`).classed('deactive', true);
      d3.selectAll(`.sjx-svg-wrapper`).classed('d-none', true);
      let object = $(this);
      let id = object.attr('id');
      let wrapper = $(`g.sjx-svg-wrapper[data-id="${id}"]`);
      object.addClass('active');
      object.removeClass('deactive');
      wrapper.removeClass('d-none');
    });
  }

  objectDelete(objectName){
    let object = $(`g.svg-object[data-object="${objectName}"]`);
    let wrapper = $(`g.sjx-svg-wrapper[data-id="${object.attr('id')}"]`);
    wrapper.remove();
    object.remove();
    
  }

  wrapperDelete(objectName){
    let object = $(`g.svg-object[data-object="${objectName}"]`);
    object.removeClass('active');
    object.removeClass('sjx-drag');
    let wrapper = $(`g.sjx-svg-wrapper[data-id="${object.attr('id')}"]`);
    wrapper.remove();
  }


  // ?   L O C A L  F U N C T I O N S

  clearMap() {
    localStorage.hasOwnProperty('houseMaps') == true ? localStorage.removeItem("houseMaps") : null;
  }

  disableMouseEvent(layer) {
    layer.on("mousedown", null).on("mousemove", null).on("mouseup", null);
  }

  deactiveMouseEvent() {
    this.rect.style('display', 'none');
  }

  activeMouseEvent() {
    this.rect.style('display', 'block');
  }

  calNorthAngle() {
    const perpendicularPoints = Utility.getPerpendicularPoint(this.faceCoords[0], this.faceCoords[1], this.centroid);
    return Utility.getAngle(this.centroid.x, this.centroid.y, perpendicularPoints.x, perpendicularPoints.y);
  }

  displayMessage(msg, type = 'warning') {
    let alertbox = d3.select('#appAlert').classed(`alert-${type}`, true);
    alertbox.select('strong').html('Info! ');
    alertbox.select('span').html(`${msg}`);
    alertbox.classed('show', true)

  }

  hideMessage() {
    d3.select('#appAlert').classed('show', false);
  }

  showToast(heading, msg, buttonText, ref, type = "warning") {
    let toastbox = d3.select('#appToast');
    toastbox.select('.modal-title').html(heading)
      .classed(`text-${type}`, true);
    toastbox.select('.modal-body').html(msg);
    let btn = toastbox.select('button.btn').style('display', 'none');

    $('#appToast').modal('show');
  }

  hideToast() {
    $('#appToast').modal('hide');
  }


}



async function getDirectionData() {
  var formData = new FormData();
  formData.append('grid', 'eight');   
  var url = BASE_URL + "/Main/getColorAndDetails";
  var eightDivision = JSON.parse(await AjaxPostPromise(formData, url).catch(AjaxError));

  formData = new FormData();
  formData.append('grid', 'sixteen');  
  url = BASE_URL + "/Main/getColorAndDetails";
  var sixteenDivision = JSON.parse(await AjaxPostPromise(formData, url).catch(AjaxError));

  formData = new FormData();
  formData.append('grid', 'thirtytwo');  
  url = BASE_URL + "/Main/getColorAndDetails";
  var thirtytwoDivision = JSON.parse(await AjaxPostPromise(formData, url).catch(AjaxError));

  return {eight: eightDivision, sixteen: sixteenDivision, thirtytwo: thirtytwoDivision};
}

getDirectionData().then((getDirectionData) => new App({BASE_URL: BASE_URL, DIRECTION_DATA: getDirectionData}));