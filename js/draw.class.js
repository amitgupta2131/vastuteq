import Tool from './helper/tool.class.js';

export default class Draw {

    constructor({canvas, canvasSize}) {
        this.canvas = canvas;
        this.canvasSize = canvasSize;

        this.isDown = false;
        this.isDrag = false;
        this.m1,this.m2;
        // this.start();
        this.toolsEventListener();

    }

    // start() {
    //     Tool.Line(this.canvas);
    // }

    toolsEventListener() {
        let that = this;

        d3.selectAll('[data-tool]').on('click', function() {
            let tool = d3.select(this).attr('data-tool');
            d3.selectAll('.shape[data-shape]').selectAll('.pointC').style('display','none');

            switch(tool) {
                case "line" : {
                    Tool.Line(that.canvas);
                } 
            }

        });
    }
    


}