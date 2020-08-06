import Paint from "./paint/paint.class.js";

export default class Draw {
  constructor() {
    this.TOP = 90,this.LEFT = 35,this.RIGHT = 35;

    // ENABLING TOOLBOXES
    d3.select(".toolbox.right").classed("d-none", false);
    d3.select(".toolbox.left").classed("d-none", false);

    this.canvasSize = this.drawAreaSize(this.LEFT, this.RIGHT);

    console.log(this.canvasSize);

    this.canvasArea = d3
      .select("#drawArea")
      .append("div")
      .attr("id", "canvasArea");

    this.backgroundGridCanvas = d3
      .select("#drawArea")
      .append("svg")
      .attr("id", "paintCanvasBackground");

    this.canvas = d3
      .select("#drawArea")
      .append("canvas")
      .attr("id", "paintCanvas");

    this.backgroundGridCanvas.attr("width", this.canvasSize.width);
    this.backgroundGridCanvas.attr("height", this.canvasSize.height);
    this.canvas.attr("width", this.canvasSize.width);
    this.canvas.attr("height", this.canvasSize.height);

    new ruler({container: document.querySelector('#canvasArea')}); 

    this.paint = new Paint("paintCanvas");

  }

  drawAreaSize(LEFT, RIGHT) {
    return {
      width: d3.select("#drawArea").node().offsetWidth - (LEFT + RIGHT),
      height: d3.select("#drawArea").node().offsetHeight,
    }
  }
}
