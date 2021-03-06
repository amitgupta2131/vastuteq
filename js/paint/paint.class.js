import Utility from "../paint/utility.class.js";
import Tool from "../paint/tool.class.js";
import Fill from "../paint/fill.class.js";

export default class Paint {
	constructor(canvasId) {

		// ENABLING TOOLBOXES
		d3.select('.toolbox.right').classed('d-none', false);
		d3.select('.toolbox.left').classed('d-none', false);
		d3.select('#rightSidebar').classed('d-none', true);
		d3.select('[data-menu-item="save"]').classed('d-none', false);
		d3.select('[data-menu-item="exit"]').classed('d-none', false);
		d3.select('.current-position').classed('d-none', false);
		d3.select('[data-menu-item="import-map"]').classed('d-none', true);

        this.canvas = document.getElementById(canvasId);
		this.context = this.canvas.getContext("2d");
		this.undoStack = [];
		this.undoLimit = 3;

		this.activeTool = Tool.TOOL_LINE;
		this.lineWidth = "1";
		this.brushSize = "4";
		this.selectedColor = "#000000";

		this.commandEventListener();
		this.toolEventListener();
		this.lineWidthEventListener();
		this.brushEventEventListener();
        this.colorEventListener();
        
        this.init();
        this.drawGrid(d3.select('#paintCanvasBackground'));
	}

	// Setter functions
	// To current active tool
	set activeTool(tool) {
		this.tool = tool;
	}

	// To set current selected color
	set selectedColor(color) {
		this.color = color;
		this.context.fillStyle = this.color;
		this.context.strokeStyle = this.color;
	}

	// To set shapes and pencel stroke size
	set lineWidth(lineWidth) {
		this._lineWidth = lineWidth;
	}

	// To set brush stroke size
	set brushSize(brushSize) {
		this._brushSize = brushSize;
	}

	init() {
		this.canvas.onmousedown = (e) => this.onMouseDown(e);
	}

	onMouseDown(e) {
		this.savedImage = this.context.getImageData(
			0,
			0,
			this.context.canvas.width,
			this.context.canvas.height
		);

		if (this.undoStack.length >= this.undoLimit) this.undoStack.shift();
		this.undoStack.push(this.savedImage);

		this.canvas.onmousemove = (e) => this.onMouseMove(e);
		document.onmouseup = (e) => this.onMouseUp(e);
		this.startPos = Utility.getMouseCoordsOnCanvas(this.canvas, e);

		if (this.tool == Tool.TOOL_PENCIL || this.tool == Tool.TOOL_BRUSH) {
			this.context.beginPath();
			this.context.moveTo(this.startPos.x, this.startPos.y);
		} else if (this.tool == Tool.TOOL_PAINT_BUCKET) {
			new Fill(
				this.canvas,
				Math.round(this.startPos.x),
				Math.round(this.startPos.y),
				this.color
			);
		}
	}

	onMouseMove(e) {
		console.log(this.tool);
		this.currentPos = Utility.getMouseCoordsOnCanvas(this.canvas, e);

		switch (this.tool) {
			case Tool.TOOL_LINE:
			case Tool.TOOL_RECTANGLE:
			case Tool.TOOL_CIRCLE:
			case Tool.TOOL_TRIANGLE:
				this.drawShape();
				break;
			case Tool.TOOL_PENCIL:
				this.drawFreeLine(this._lineWidth);
				break;
			case Tool.TOOL_BRUSH:
				this.drawFreeLine(this._brushSize);
				break;
			case Tool.TOOL_ERASER:
				this.context.clearRect(
					this.currentPos.x,
					this.currentPos.y,
					this._brushSize,
					this._brushSize
				);
				break;
		}
	}

	onMouseUp(e) {
		this.canvas.onmousemove = null;
		document.onmouseup = null;
	}

	drawShape() {
		this.context.putImageData(this.savedImage, 0, 0);
		this.context.beginPath();
		this.context.lineWidth = this._lineWidth;

		if (Tool.TOOL_LINE == this.tool) {
			this.context.moveTo(this.startPos.x, this.startPos.y);
			this.context.lineTo(this.currentPos.x, this.currentPos.y);
		} else if (Tool.TOOL_RECTANGLE == this.tool) {
			this.context.rect(
				this.startPos.x,
				this.startPos.y,
				this.currentPos.x - this.startPos.x,
				this.currentPos.y - this.startPos.y
			);
		} else if (Tool.TOOL_CIRCLE == this.tool) {
			let distance = Utility.calcHypotenuse(this.startPos, this.currentPos);
			this.context.arc(
				this.startPos.x,
				this.startPos.y,
				distance,
				0,
				2 * Math.PI,
				false
			);
		} else if (Tool.TOOL_TRIANGLE == this.tool) {
			this.context.moveTo(
				this.startPos.x + (this.currentPos.x - this.startPos.x) / 2,
				this.startPos.y
			);
			this.context.lineTo(this.startPos.x, this.currentPos.y);
			this.context.lineTo(this.currentPos.x, this.currentPos.y);
			this.context.closePath();
		}
		this.context.stroke();
	}

	drawFreeLine(lineWidth) {
		this.context.lineWidth = lineWidth;
		this.context.lineTo(this.currentPos.x, this.currentPos.y);
		this.context.lineCap = "round";
		this.context.lineJoin = "round";
		this.context.stroke();
	}

	undoPaint() {
		if (this.undoStack.length > 0) {
			this.context.putImageData(
				this.undoStack[this.undoStack.length - 1],
				0,
				0
			);
			this.undoStack.pop();
		} else {
			alert("No undo available");
		}
	}

	// ALL LISTENER FUNCTIONS

	commandEventListener() {
		document.querySelectorAll("[data-command]").forEach((el) => {
			el.addEventListener("click", (e) => {
				let command = el.getAttribute("data-command");

				if (command == "undo") {
					this.undoPaint();
				} else if (command == "download") {
					var canvas = document.getElementById("paintCanvas");
					var image = canvas
						.toDataURL("image/jpg", 1.0)
						.replace("image/jpg", "image/octet-stream");
					var link = document.createElement("a");
					link.download = "my-image.jpg";
					link.href = image;
					link.click();
				}
			});
		});
	}

	toolEventListener() {
		document.querySelectorAll("[data-tool]").forEach((el) => {
			el.addEventListener("click", (e) => {
				document.querySelector("[data-tool].active").classList.toggle("active");
				el.classList.toggle("active");
				let selectedTool = el.getAttribute("data-tool");
				this.activeTool = selectedTool;

				switch (selectedTool) {
					case Tool.TOOL_LINE:
					case Tool.TOOL_RECTANGLE:
					case Tool.TOOL_CIRCLE:
					case Tool.TOOL_TRIANGLE:
					case Tool.TOOL_PENCIL:
						document.querySelector(".group.pencil").style.display = "block";
						document.querySelector(".group.brush").style.display = "none";
						break;
					case Tool.TOOL_BRUSH:
						document.querySelector(".group.pencil").style.display = "none";
						document.querySelector(".group.brush").style.display = "block";
						break;
					case Tool.TOOL_ERASER:
						document.querySelector(".group.pencil").style.display = "none";
						document.querySelector(".group.brush").style.display = "block";
						break;
					default:
						document.querySelector(".group.pencil").style.display = "none";
						document.querySelector(".group.brush").style.display = "none";
				}
			});
		});
	}

	lineWidthEventListener() {
		document.querySelectorAll("[data-line-width]").forEach((el) => {
			el.addEventListener("click", (e) => {
				document
					.querySelector("[data-line-width].active")
					.classList.toggle("active");
				el.classList.toggle("active");

				this.lineWidth = el.getAttribute("data-line-width");
			});
		});
	}

	brushEventEventListener() {
		document.querySelectorAll("[data-brush-size]").forEach((el) => {
			el.addEventListener("click", (e) => {
				document
					.querySelector("[data-brush-size].active")
					.classList.toggle("active");
				el.classList.toggle("active");

				this.brushSize = el.getAttribute("data-brush-size");
			});
		});
	}

	colorEventListener() {
		document.querySelectorAll("[data-color]").forEach((el) => {
			el.addEventListener("click", (e) => {
				document
					.querySelector("[data-color].active")
					.classList.toggle("active");
				el.classList.toggle("active");

				this.selectedColor = el.getAttribute("data-color");
			});
		});
    }
    
    drawGrid(canvas) {

        var gridOptions = {
            minorLines: {
                separation: 5,
                color: "#eeeeee"
            },
            majorLines: {
                separation: 50,
                color: "#ddd"
            }
        };

        this.drawGridLines(canvas, gridOptions.minorLines);
        this.drawGridLines(canvas, gridOptions.majorLines);

        return;
    }

    drawGridLines(cnv, lineOptions) {

        var iWidth = cnv.attr('width');
        var iHeight = cnv.attr('height');

        let g = cnv.append('g');

        var iCount = null;
        var i = null;
        var x = null;
        var y = null;

        iCount = Math.floor(iWidth / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            x = (i * lineOptions.separation);
            g.append('line')
            .attr('x1', x).attr('y1', 0)
            .attr('x2', x).attr('y2', iHeight)
            .style("stroke",lineOptions.color);
        }

        iCount = Math.floor(iHeight / lineOptions.separation);

        for (i = 1; i <= iCount; i++) {
            y = (i * lineOptions.separation);
            g.append('line')
            .attr('x1', 0).attr('y1', y)
            .attr('x2', iWidth).attr('y2', y)
            .style("stroke",lineOptions.color);
        }

        return;
    }
}
