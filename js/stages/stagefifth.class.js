import ActionBox from '../helper/actionbox.class.js';
import Utility from '../helper/utility.class.js';

export default class StageFifth {

    constructor({layer, className}) {
        
        /* 
            ?  L O C A L  V A R I A B L E S
        */

        this.layer = layer;
        this.className = className;

        this.actionbox = new ActionBox();

        this.dragging = false;
        this.drawing = false;
        this.disable = false;
        this.startPoint = [];
        this.points = [];
        this.g;

        // DRAGGER
        this.dragger = d3.drag()
        .on('drag', this.handleDrag)
        .on('start end', (d) => { this.dragging = false; });

        // this.undo();
        
    }

    startDrawing(REF) {

        // CLASS REFERENCE
        let that = this;

        this.layer.on("mousemove", function () {
            if(that.disable) return;
            if(!that.drawing) return;
    
            let g = d3.select(`g.${that.className}`);
            g.select('line').remove();
            let line = g.append('line')
            .attr('x1', that.startPoint[0])
            .attr('y1', that.startPoint[1])
            .attr('x2', d3.mouse(this)[0] + 2)
            .attr('y2', d3.mouse(this)[1])
            .attr('stroke', '#EF5350')
            .attr('stroke-width', 3);

        })

        this.layer.on("mouseup", function () {
            if(that.disable) return;
            if(that.dragging) return;
        
            that.drawing = true;

            //let closeCoord = Utility.closestCoord(REF.mapBoundariesCoords, d3.mouse(this));
            that.startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];
    
            if(that.layer.select(`g.${that.className}`).empty()) that.g = that.layer.append('g').attr('class', that.className);
    
            that.points.push(d3.mouse(this));
            that.g.select('polyline').remove();
            
            let polyline = that.g.append('polyline').attr('points', that.points)
            .style('fill', 'none').attr('stroke', '#EF5350').attr('stroke-width', 3);

            if(that.points.length == 2) {
                d3.select(`g.${that.className} line`).remove();
                that.disable = true; 
                that.end(REF); 
            }
            
        })
    }

    end(REF) {
        let that = REF;

        let actionBox = this.actionbox.clear().get();
        
        let actionText = actionBox.append('p')
        .attr('class','text-uppercase text-sm actionbox-text')
        .text('Distance');

        let actionBody = actionBox.append('div')
        .attr('class','form-row actionbox-body');

        this.distance = actionBody.append('div')
        .attr('class', 'col-md-12').append('input')
        .property('readonly', true)
        .attr('type','text').attr('class', 'form-control form-control-sm text-sm')
        .attr('placeholder', 'Distance');

        let dimension = that.distanceBetweenTwoPoints;
        let distance = Math.sqrt(Math.pow(this.points[0][0] - this.points[1][0], 2) + Math.pow(this.points[0][1] - this.points[1][1], 2));

        swal(`The distance is ${Math.round(distance*dimension.scale/dimension.distance,2)} ${dimension.unit}`);

        that._stage = 3;
        that.start();


        // this.distance.attr('value',`${Math.round(distance*dimension.scale/dimension.distance,2)} ${dimension.unit}`);


    }

    undo() {

        document.addEventListener('keydown', (event) => {
            if(this.polygonClosed = true && this.points.length < 0) return false;
            if (event.ctrlKey && event.key === 'z') {
              this.points.pop();
              this.startPoint = this.points[this.points.length-1];
              this.g.select('polyline').remove();
              this.g.append('polyline').attr('points', this.points)
              .style('fill', 'none').attr('stroke', '#EF5350').attr('stroke-width','3');
              this.g.selectAll('circle:last-of-type').remove();
            }
            else if (event.metaKey && event.key === 'z'){
              this.points.pop();
              this.startPoint = this.points[this.points.length-1];
              this.g.select('polyline').remove();
              this.g.append('polyline').attr('points', this.points)
              .style('fill', 'none').attr('stroke', '#EF5350').attr('stroke-width','3');
              this.g.selectAll('circle:last-of-type').remove();
            }
        });
    }

    showToast(heading, msg, type="warning") {
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

    remove() {
        this.layer.select(`g.${this.className}`).remove();
    }
}