import editText from './helper/editTextModel.class.js';

export default class EditText {

    constructor({ mapId, layer, data }) {

        this.mapId = mapId;
        this.layer = layer;
        this.data = data;


        this.editTextModel = new editText();
        this.id = (data.id != undefined) ? data.id : this.uniqueID();
        data.id = this.id;
        d3.selectAll(`.svg-object`).classed('deactive', true);
        d3.selectAll(`.svg-object`).classed('active', false);
        d3.selectAll(`.sjx-svg-wrapper`).classed('d-none', true);

        //adding EditText fields
        if (data.name = "Edit Text") {

            var margin = {
                left: 5,
                right: 5,
                top: 5,
                bottom: 5
            };

            var chart = this.layer
                .append("g")
                .classed('svg-object', true)
                .classed('active', true)
                .classed('saved', true)
                .attr('data-id', this.id)
                .attr('data-object', data.name + this.id)
                .attr('transform', (data.transform === "abc") ? null : data.transform);
            // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var data = [this.data];

            chart.selectAll("text")
                .data(data)
                .enter()
                .append("foreignObject")
                .attr('class', 'fObject')
                .attr("x", this.data.x)
                .attr("y", this.data.y)
                .attr("width", "100px")
                .attr("height", "30px")


                .append('xhtml:div')

                .attr("width", "100px")
                .attr("height", "30px")
                .append('div')
                .attr("contentEditable", true)
                .text(function (d) {
                    return d.name
                });

            chart.append('image')
                .attr('class', 'removeEditText d-none')
                .attr('xmlns', 'http://www.w3.org/2000/svg')
                .attr("xlink:href", BASE_URL + 'assets/icons/remove.svg')
                .attr('x', data[0].x - 10)
                .attr('y', data[0].y - 10)
                .attr('height', '20')
                .attr('width', '20')
                .attr('obj-id', data[0].id)
                .attr('obj-name', data[0].name + this.id)
                .style('position', 'relative')


        }


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
            type: this.data.type,
            ref: this.data.ref
        }

        // object

        this.svgOptions = {
            container: '#vastuteqCanvas',
            rotationPoint: false,
            proportions: true,
            resizable: true,
            rotatable: true,
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

                if (that.mapId != undefined) {
                    console.log(that.data.name);
                    that.editTextModel.add(that.mapId, objectModelData)
                }

            },
            onMove({ clientX, clientY, dx, dy, transform }) {
                // fires on moving

            },
            onResize({ clientX, clientY, dx, dy, width, height }) {
                // fires on resizing
                if (d3.select('.svg-object.saved.active[data-object]').node() != null) {

                    let object = d3.select('.svg-object.saved.active[data-object]');
                    let objectId = object.attr('data-id');
                    let image = object.select('foreignObject.fObject');
                    let widt = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('width');
                    let heigt = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('height');
                    let x = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('x');
                    let y = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('y');
                    image.attr('width', widt); image.attr('height', heigt);
                    image.select('div div').attr('width', widt); image.select('div').attr('height', heigt);
                    image.select('div div').attr('style', `height:${heigt}px`)
                    image.attr('x', x), image.attr('y', y);
                    object.select('image').attr('height', 20);
                    object.select('image').attr('width', 20);
                    let transform = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"]`).attr('transform')
                    let objectTransform = object.attr('transform', transform);

                    that.editTextModel.editProperties(
                        objectId,
                        { x: x, y: y, width: widt, height: heigt, transform: transform }
                    );
                }
            },
            onRotate({ clientX, clientY, delta, transform }) {
                // fires on rotation
                if (d3.select('.svg-object.saved.active[data-object]').node() != null) {
                    let object = d3.select('.svg-object.saved.active[data-object]');
                    let objectId = object.attr('data-id');
                    let image = object.select('foreignObject.fObject');
                    let widt = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('width');
                    let heigt = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('height');
                    let x = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('x');
                    let y = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"] .sjx-svg-box-group rect`).attr('y');

                    image.attr('x'), image.attr('y');
                    let width = image.attr('width'), height = image.attr('height');
                    let transform = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"]`).attr('transform')
                    let objectTransform = object.attr('transform', transform);

                    that.editTextModel.editProperties(
                        objectId,
                        { x: x, y: y, width: widt, heigt: height, transform: transform }
                    );
                }
            },
            onDrop({ clientX, clientY }) {
                // fires on drop
                if (d3.select('.svg-object.saved.active[data-object]').node() != null) {
                    let object = d3.select('.svg-object.saved.active[data-object]');
                    let objectId = object.attr('data-id');
                    let image = object.select('foreignObject.fObject');
                    let x = image.attr('x'), y = image.attr('y');
                    let width = image.attr('width'), height = image.attr('height');
                    let transform = d3.select(`.sjx-svg-wrapper[data-id="${objectId}"]`).attr('transform')
                    let objectTransform = object.attr('transform', transform);
                    object.select('image').attr('x', x - 10);
                    object.select('image').attr('y', y - 10);
                    that.editTextModel.editProperties(
                        objectId,
                        { x: x, y: y, width: width, height: height, transform: transform }
                    );
                }
            },
            onDestroy(el) {
                // fires on tool deactivation
            }

        };


        this.object = subjx(`.svg-object[data-id="${this.id}"]`).drag(this.svgOptions);
        this.controls = this.object[0].controls;
        this.controls.setAttribute("data-id", this.id);


    }

    remove(objectName) {
        d3.select(`.svg-object[data-object="${objectName}"]`).remove();
    }

    getObject() {
        return { 'objectName': this.data.name, 'controls': this.object[0].controls, 'active': true };
    }

    degreesToRadians(degrees) {
        var pi = Math.PI;
        return degrees * (pi / 180);
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
        return Math.floor(Math.pow(10, length - 1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1));
    }


}
