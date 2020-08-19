import Utility from "./helper/utility.class.js";
import ObjectModel from "./helper/objectmodel.class.js";
import Model from "./helper/model.class.js";
import Modal from "./helper/modal.class.js";
import Object from "./object.class.js";
import Assist from "./helper/assist.class.js";
import ActionBox from "./helper/actionbox.class.js";
import StageZero from "./stages/stagezero.class.js";
import StageFirst from "./stages/stagefirst.class.js";
import StageSecond from "./stages/stagesecond.class.js";
import StageThird from "./stages/stagethird.class.js";
import StageFourth from "./stages/stagefourth.class.js";
import StageFifth from "./stages/stagefifth.class.js";
import Vedic from "./stages/vedic.class.js";

export default class Vastuteq {
  constructor(mapId, imageData, baseUrl) {

    // DISABLING TOOLBOXES
    d3.select(".toolbox.right").classed("d-none", true);
    d3.select(".toolbox.left").classed("d-none", true);
    d3.select(".current-position").classed("d-none", true);
    d3.select("#rightSidebar").classed("d-none", false);

    // ?  C L A S S  V A R I A B L E
    this.BASE_URL = baseUrl;

    // ? O B J E C T S
    
    // Create new housemap i.e localstorage entry
    this.model = new Model(mapId);
   
    //Storing and retrieving image properties to housemap
    this.objectModel = new ObjectModel();
    
    //List all helper functions for Mahavastu and Vedic actions
    this.assist = new Assist();
    
    //Action box on right side, which is populated based on 
    //required actions in each stage
    this.actionbox = new ActionBox();
    
    //Draw Bar Chart
    this.modal = new Modal();

    this.imageData = imageData;

    this.DISABLE = true;
    this.zoomData = { x: 0, y: 0, k: 1 };

    // ?  H O U S E  M A P

    this.mapId = mapId;

    this.houseMap = this.model.getHouseMap(this.mapId)[0];

    this.mapBoundariesCoords = this.houseMap == undefined ? [] : this.houseMap.customBoundariesCoords;
    this.vedicMapBoundariesCoords = this.houseMap == undefined ? [] : this.houseMap.vedicBoundariesCoords;
    // console.log(`My coord ${JSON.parse(this.houseMap.vedicBoundariesCoords)}`);
    this.centroid = this.houseMap == undefined ? [] : this.houseMap.centroid;
    this.faceCoords = this.houseMap == undefined ? [] : this.houseMap.faceCoords;
    this.distanceBetweenTwoPoints = this.houseMap == undefined ? null : this.houseMap.dimension;
    this.angle = this.houseMap == undefined ? 0 : -parseFloat(this.houseMap.degree);
    this._stage = this.houseMap == undefined ? 0 : this.houseMap.stage;
    this._type = this.houseMap == undefined ? 0 : this.houseMap.type;
    // this.division = 8;

    // ?  A P P  F U N C T I O N A L I T Y

    // ?  Z O O M
    this.zoom = d3.zoom().on("zoom", () => {
      this.canvas.attr("transform", d3.event.transform);
      $(".zoom-display").val(Math.round(d3.event.transform.k * 100));
      this.zoomData = d3.event.transform;
    });
    this.zoomDisplay = d3.select(".zoom-display");

    // ?  C A N V A S  S I Z E
    this.canvasSize = {
      width: d3.select("#drawArea").node().offsetWidth - 250,
      height: d3.select("#drawArea").node().offsetHeight + 1,
    };

    // ?  M A I N  C A N V A S
    this.svg = d3
      .select("#drawArea")
      .append("svg")
      .attr("id", "vastuteqCanvas")
      .attr("width", this.canvasSize.width)
      .attr("height", this.canvasSize.height);

    this.drawCanvas =  d3
    .select("#drawArea")
    .append("svg")
    .attr("id", "drawCanvas")
    .classed('d-none', true)
    .attr("width", this.canvasSize.width)
    .attr("height", this.canvasSize.height); 

    this.canvas = this.svg.append("g").attr("id", "main-group");

    this.RECT_SIZE = {
      x: Utility.centerOfCanvas(this.canvasSize, this.canvasSize.width, this.canvasSize.widthd).x,
      y: Utility.centerOfCanvas(this.canvasSize, this.canvasSize.height, this.canvasSize.height).y,
      width: this.canvasSize.width,
      height: this.canvasSize.height,
    };

    this.screenBoundariesCoords = [
      [this.RECT_SIZE.x, this.RECT_SIZE.y],
      [this.RECT_SIZE.width, this.RECT_SIZE.y],
      [this.RECT_SIZE.width, this.RECT_SIZE.height],
      [this.RECT_SIZE.x, this.RECT_SIZE.height],
    ];

    this.houseMapObject = new Object({
      mapId: this.mapId,
      layer: this.canvas,
      data: this.imageData,
    });

    // ALL EVENT LISTENER
    this._objectEventListener();
    this._itemEventListener();
    this._alignObejctToBrahmnabhi();
    this._colorStateEventListener();
    this._menuItemEventListener();
    this._zoomEventListener();

    (this._type == "vedic") ? this.vedicStart() : this.start();
  }

  // ? M A H A V A S T U   S T A R T

  start() {
    switch (this._stage) {
      // ? STAGE FOR TRANSFORM MAP
      case 0:
        {
          // STAGE ZERO
          this.displayMessage("Rotate/Resize House Map for best fit", "danger");
          $(".property.description").html(
            "Rotate/Resize House Map for best fit"
          );
          let stageZero = new StageZero();
          stageZero.startDrawing(this);
        }
        break;
      // ?   STAGE FOR PIN BOUNDARIES
      case 1:
        {
          // STAGE FIRST
          this.wrapperDelete("map");
          this.displayMessage(
            "Start pinning by simply clicking on map borders",
            "danger"
          );
         let htmlText="Start pinning by clicking on map borders. <br/><br/>Press \" CTRL + Z \" keys to undo";

          $(".property.description").html(htmlText);
          let stageFirst = new StageFirst({
            layer: this.canvas,
            className: "map-surface",
          });
          stageFirst.startDrawing(this);
        }
        break;
      // ? STAGE FOR FACING POINT SELECTION
      case 2:
        {
          // STAGE SECOND
          this.wrapperDelete("map");
          this.displayMessage("Select facing wall", "danger");
          let htmlText= "Select facing wall from the Dropdown box";
          $(".property.description").html(htmlText);
          this.assist.drawMask({
            layer: this.canvas,
            points: this.mapBoundariesCoords,
            size: this.RECT_SIZE,
          });
          this.assist.drawBoundaries({
            layer: this.canvas,
            points: this.mapBoundariesCoords,
          });
          this.assist.drawBharamNabhi({
            layer: this.canvas,
            centroid: this.centroid,
          });
          let stageSecond = new StageSecond();
          stageSecond.startDrawing(this);
        }
        break;
      case 3:
        {
          // STAGE THIRD
          this.hideMessage();
          this.wrapperDelete("map");

          d3.select(".align-center-wrapper").classed("d-none", false);
          d3.select(".zoom-state-wrapper").classed("d-none", false);
          d3.select(".zoom-wrapper").classed("d-none", false);
          d3.select(".measurement-section").classed("d-none", false);
          d3.select('.zoom-functionality').classed('d-none',false);
          d3.select('.tools-section').classed('d-none',false);
          d3.select('.getReport').classed('d-none',false);
          this.drawCanvas.classed('d-none', true);
          $(".property.description").html("");

          this.assist.drawBackgroundGrid(
            this.canvas,
            this.centroid,
            this.faceCoords,
            this.division,
            this.angle
          );
          this.assist.drawMask({
            layer: this.canvas,
            points: this.mapBoundariesCoords,
            size: this.RECT_SIZE,
          });
          this.assist.drawBoundaries({
            layer: this.canvas,
            points: this.mapBoundariesCoords,
          });
          this.assist.drawBharamNabhi({
            layer: this.canvas,
            centroid: this.centroid,
          });
          this.assist.drawDirectionLines(
            this.canvas,
            this.faceCoords,
            this.centroid,
            this.division,
            this.angle
          );
          this.assist.drawFacingLine(
            this.canvas,
            this.centroid,
            this.faceCoords
          );
          this.assist.drawGrid(
            this.canvas,
            this.centroid,
            this.faceCoords,
            this.screenBoundariesCoords,
            this.division,
            this.angle
          );
          d3.select(".facing-degree").text(`${Math.abs(this.angle)}°`);

          this.screenPolygons = Utility.getIntersectionPoints(
            this.calNorthAngle(),
            this.centroid,
            this.screenBoundariesCoords,
            this.division
          );
          this.mapPolygonsArray = Utility.getIntersectionPoints(
            this.calNorthAngle() + this.angle,
            this.centroid,
            this.mapBoundariesCoords,
            this.division
          );
          this.mapPolygonsAreaArray = Utility.getPolygonsArea(
            this.mapPolygonsArray
          );

          // console.log(this.screenBoundariesCoords,this.mapBoundariesCoords,this.faceCoords,typeof this.centroid.x);
          // console.log(this.screenPolygons,this.mapPolygonsArray,this.mapPolygonsAreaArray);

          // ? DRAW BAR CHART
          this.modal.drawMap({
            areaArr: this.mapPolygonsAreaArray,
            division: this.division,
            dimension: this.distanceBetweenTwoPoints,
          });

          // DRAW OBJECTS & ACTIVITIES
          let objects = this.objectModel.getObject(this.mapId);
          let objectData, objectLayer = this.canvas.append("g").classed("objects-group", true);

          for (let i in objects) {
            objectData = {
              id: objects[i].image.id,
              name: objects[i].image.name,
              src: objects[i].image.src,
              x: objects[i].image.x,
              y: objects[i].image.y,
              width: objects[i].image.width,
              height: objects[i].image.height,
              transform: objects[i].image.transform,
            };

            // //Check if Object is in any of the directions
            // console.log(objectData);
            // this.mapPolygonsArrayWithDirections = Utility.getIntersectionPoints(
            //   this.calNorthAngle() + this.angle,
            //   this.centroid,
            //   this.mapBoundariesCoords,
            //   this.division,
            //   "polygonDirections"
            // );
            
            // // console.log("Map:",this.mapPolygonsArrayWithDirections);
            // let testPoint = [objectData.x,objectData.y];
            // this.mapPolygonsArrayWithDirections.forEach(element => {
            //   // console.log("testPoint",testPoint);
            //   // console.log("element",element);
            //   console.log("res",element.direction,d3.polygonContains(element.polygon[0],testPoint));
            // });
            
            new Object({mapId: this.mapId,layer: objectLayer,data: objectData });
          }

          let stageThird = new StageThird(this.attribute);
          stageThird.startDrawing(this);
        }
        break;
      case 4:
        {
          // STAGE FOURTH
          this.drawCanvas.classed('d-none', false);
          this.displayMessage(
            "Select two points to define scale of the drawing",
            "danger"
          );
          this.stageFourth = null;
          this.drawCanvas.selectAll('*').remove();
          this.stageFourth = new StageFourth({
            layer: this.drawCanvas,
            className: "find-distance",
          });
          this.stageFourth.startDrawing(this);
        }
        break;
      case 5:
        {
          // STAGE FOURTH
          this.drawCanvas.classed('d-none', false);
          this.displayMessage(
            "Select two points to define scale of the drawing",
            "danger"
          );
          this.stageFifth = null;
          this.drawCanvas.selectAll('*').remove();
          this.stageFifth = new StageFifth({
            layer: this.drawCanvas,
            className: "find-distance",
          });
          this.stageFifth.startDrawing(this);
        }
        break;
      default:
        break;
    }
  }

  // ? V E D I C   S T A R T
  vedicStart() {
    console.log("Vedic stage",this._stage);
    switch (this._stage) {
      case 2 : {
        // STAGE SECOND
        this.wrapperDelete("map");
        this.displayMessage("Select facing wall", "danger");
        $(".property.description").html("Select facing wall");
        this.assist.drawMask({layer: this.canvas, points: this.mapBoundariesCoords,size: this.RECT_SIZE,});
        this.assist.drawBoundaries({layer: this.canvas, points: this.mapBoundariesCoords});
        this.assist.drawBharamNabhi({layer: this.canvas, centroid: this.centroid,});
        this.assist.drawPolygon({layer: this.canvas, points: this.vedicMapBoundariesCoords});

        let stageSecond = new StageSecond();
        stageSecond.startDrawing(this);
      } break;

      case 3 : {
        this.hideMessage();
        this.wrapperDelete("map");
        d3.select('.zoom-functionality').classed('d-none',false);
        d3.select(".properties-section.decs").classed('d-none', true);
        d3.select(".measurement-section").classed("d-none", false);         
        d3.select('.tools-section').classed('d-none',false);
        // d3.select('#vpm').classed('d-none',true);
        // d3.select('#mvpc').classed('d-none',true);
        this.assist.drawMask({layer: this.canvas, points: this.mapBoundariesCoords,size: this.RECT_SIZE,});
        this.assist.drawBoundaries({layer: this.canvas, points: this.mapBoundariesCoords});
        this.assist.drawBharamNabhi({layer: this.canvas, centroid: this.centroid,});
        this.assist.drawDirectionLines(this.canvas, this.faceCoords, this.centroid, this.division, this.angle);
        this.assist.drawGrid(this.canvas, this.centroid, this.faceCoords, this.screenBoundariesCoords, this.division, this.angle, "vedic");
        
        this.assist.drawPolygon({layer: this.canvas, points: this.vedicMapBoundariesCoords});
        this.assist.drawPolygonDiagonals({points: this.vedicMapBoundariesCoords});
        this.assist.drawPolygonGrid({points: this.vedicMapBoundariesCoords});
        this.createObject('g.vedic-polygon');
        this.vedic = new Vedic();
        this.vedic.startDrawing(this);
      }
    }
  }

  end(stage) {
    this.DISABLE = true;
    this._response = false;
    stage.end(this);
  }

  createObject(selector) {
      // object
      let svgOptions = {
        container: '#vastuteqCanvas',
        rotationPoint: false,
        proportions: true,
    // restrict moving
    // spreads to dragging one element 
    // restrict: 'selector',
        snap: {
          x: 10,
          y: 10,
          angle: 5
        },
        cursorMove: 'move',
        cursorRotate: 'crosshair',
        cursorResize: 'pointer',  
      };

      let id = this.uniqueID();

      d3.select(selector).attr('id', id);
      let object = subjx(selector).drag(svgOptions);
      let controls = object[0].controls;
      controls.setAttribute("data-id", id);
      object[0].exeRotate({
        delta : this.degreesToRadians((this.calNorthAngle() + this.angle) - this.calTopRightEdgeAngle()),
      });
  }

  _menuItemEventListener() {
    let that = this;
    $('[data-menu-item]').on('click', function() {
      let menuItem = d3.select(this).attr('data-menu-item');
      switch (menuItem) {
        case "set-measurement": {
          console.log('set-measurement');
          that._stage = 4;
          that.start();

        } break;
        case "get-measurement": {
          console.log('get-measurement');
          that._stage = 5;
          that.start();

        } break;
        case "get-marma": {
          console.log('get-marma');
          // that._stage = 5;
          // that.start();

        } break;
        case "get-shanmahanti": {
          console.log('get-shanmahanti');
          // that._stage = 5;
          // that.start();

        } break;
        default: break;
      }
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
        let mVariable = parseFloat(`.${zoom}`);
        if(zoom >= 100 ){
          mVariable = mVariable * 10;
        }
        console.log(mVariable)
        let newK = parseInt(zoom)/100;
        // let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * mVariable), (that.canvasSize.height * mVariable)).x;
            // let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * mVariable), (that.canvasSize.height * mVariable)).y;
            let newX = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * mVariable), (that.canvasSize.height * mVariable)).x;
            let newY = Utility.centerOfCanvas(that.canvasSize, (that.canvasSize.width * mVariable), (that.canvasSize.height * mVariable)).y;
            // let newK = 0.75
            that.svg.call(that.zoom.transform, d3.zoomIdentity.translate(newX, newY).scale(newK));
            that.zoomData.x = newX, that.zoomData.y = newY, that.zoomData.k = newK;
            $(".zoom-display").val(newK*100);
        
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

  _objectEventListener() {
    
    $("body").on("dblclick", "g.sjx-svg-wrapper", function () {
      let wrapper = $(this);
      let id = wrapper.attr("data-id");
      let object = $(`.svg-object[data-id="${id}"]`);
      object.removeClass("active");
      object.addClass("deactive");
      wrapper.addClass("d-none");
    });

    $("body").on("dblclick", "g.svg-object[data-object]", function () {
      d3.selectAll(`.svg-object`).classed("deactive", true);
      d3.selectAll(`.svg-object`).classed("active", false);
      d3.selectAll(`.sjx-svg-wrapper`).classed("d-none", true);
      let object = $(this);
      let id = object.attr("data-id");
      let opacity = object.attr("opacity");
      let wrapper = $(`g.sjx-svg-wrapper[data-id="${id}"]`);
      object.addClass("active");
      object.removeClass("deactive");
      wrapper.removeClass("d-none");
      $("#myRange").val(opacity);
      $(".range-value").text(opacity);
    });

    // OBJECT OPACITY EVENT LISTENER
    $("#myRange").on("change", function () {
      let value = $(this).val();
      $(".range-value").text(value);
      $(".svg-object.active[data-object]").attr("opacity", value);
    });
  }

  _itemEventListener() {
    let that = this;

    $(".object-item[data-object-item]").on("click", function () {
      let name = $(this).attr("data-object-item");
      let src = $(this).attr("data-src");

      let size = { width: 60, height: 60 };
      let position = Utility.centerOfCanvas(
        that.canvasSize,
        size.width,
        size.height
      );

      let data = {
        name: name,
        src: src,
        x: position.x,
        y: position.y,
        width: size.width,
        height: size.height,
        transform: "",
        saveable: true,
      };

      let item = new Object({
        mapId: that.mapId,
        layer: that.canvas,
        data: data,
        saveable: true,
      });
    });
  }

  // ? A L I G N  O B J E C T  T O  C E N T E R
  _alignObejctToBrahmnabhi() {
    // CLASS REFERENCE
    let that = this;

    d3.select('.object-align-center').on("click", () => {
      
      let selectedItem = d3.select(".svg-object.active[data-object]");
        if (selectedItem.node() != null) {
            if(selectedItem.classed('saved') == false) {
                let object = d3.select(".svg-object.active[data-object]");
                let id = object.attr("data-id");
                let wrapper = d3.select(`.sjx-svg-wrapper[data-id="${id}"]`);

                let objectName = object.attr("data-object");
                let src = object.select("image").attr("href");
                let width = object.select("image").attr("width");
                let height = object.select("image").attr("height");
                let x = this.centroid.x - width / 2;
                let y = this.centroid.y - height / 2;

                object.remove();
                wrapper.remove();

                let data = {
                name: objectName,
                src: src,
                x: x,
                y: y,
                width: width,
                height: height,
                northAngle: that.calNorthAngle(),
                angle: that.angle
                };
                let objectInstance = new Object({
                mapId: that.mapId,
                layer: that.canvas,
                data: data,
                });
            }
        }
    });
  }

  // ? C O L O R   S T A T E  L I S T E N E R
  _colorStateEventListener() {
    let that = this;
    d3.select(".object-color-toggle").on("click", function () {
      let colorState = d3.select(this);
      if (colorState.attr("data-color-state") == "colorless") {
        colorState.attr("data-color-state", "colorful");
        colorState
          .select("img")
          .attr("src", `${that.BASE_URL}assets/icons/colorful.svg`);

        let object = d3.select(`g.svg-object[data-object="MVM"]`);
        let image = object.select("image.object");
        image.attr("xlink:href", `${that.BASE_URL}assets/images/mvm.svg`);

        // let transform = image.attr('transform'), x = image.attr('x'), y = image.attr('y'),
        // width = image.attr('width'), height = image.attr('height');
      } else {
        colorState.attr("data-color-state", "colorless");
        colorState
          .select("img")
          .attr("src", `${that.BASE_URL}assets/icons/colorless.svg`);

        let object = d3.select(`g.svg-object[data-object="MVM"]`);
        let image = object.select("image.object");
        image.attr("xlink:href", `${that.BASE_URL}assets/images/MVPC.svg`);
      }
    });
  }

  displayMessage(msg, type = "warning") {
    let alertbox = d3.select("#appAlert").classed(`alert-${type}`, true);
    alertbox.select("strong").html("Info! ");
    alertbox.select("span").html(`${msg}`);
    alertbox.classed("show", true);
  }

  hideMessage() {
    d3.select("#appAlert").classed("show", false);
  }

  objectDelete(objectName) {
    this.wrapperDelete(objectName);
    let object = $(`g.svg-object[data-object="${objectName}"]`);
    let wrapper = $(`g.sjx-svg-wrapper[data-id="${object.attr("id")}"]`);
    wrapper.remove();
    object.remove();
    
  }

  wrapperDelete(objectName) {
    let object = $(`g.svg-object[data-object="${objectName}"]`);
    object.removeClass("active");
    object.removeClass("sjx-drag");
    let wrapper = $(`g.sjx-svg-wrapper[data-id="${object.attr("data-id")}"]`);
    wrapper.remove();
  }

  calNorthAngle() {
    const perpendicularPoints = Utility.getPerpendicularPoint(
      this.faceCoords[0],
      this.faceCoords[1],
      this.centroid
    );
    return Utility.getAngle(
      this.centroid.x,
      this.centroid.y,
      perpendicularPoints.x,
      perpendicularPoints.y
    );
  }

  degreesToRadians(degrees) {
    var pi = Math.PI;
    return degrees * (pi/180);
  }

  calTopRightEdgeAngle() {
    var dy = (this.vedicMapBoundariesCoords[1][1]+this.vedicMapBoundariesCoords[0][1])/2 - this.centroid.y;
    var dx = (this.vedicMapBoundariesCoords[1][0]+this.vedicMapBoundariesCoords[0][0])/2 - this.centroid.x;

    // var dy = this.vedicMapBoundariesCoords[1][1] - this.centroid.y;
    // var dx = this.vedicMapBoundariesCoords[1][0] - this.centroid.x;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }

  uniqueID(){
    return Math.random().toString(36).slice(2);
  }

}
