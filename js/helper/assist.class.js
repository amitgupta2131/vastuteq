import { DIRECTION_EIGHT, DIRECTION_SIXTEEN, DIRECTION_THIRTYTWO } from "./directiondetails.class.js";
import Utility from './utility.class.js';

export default class Assist {

    constructor() {

        this.DATA_EIGHT = [
            {name: 'N', value: 1, color: "blue"}, {name: 'NE', value: 1, color: "blue"}, {name: 'E', value: 1, color: "green"}, 
            {name: 'SE', value: 1, color: "red"}, {name: 'S', value: 1, color: "red"}, {name: 'SW', value: 1, color: "yellow"}, 
            {name: 'W', value: 1, color: "white"}, {name: 'NW', value: 1, color: "white"}
        ];

        this.DATA_SIXTEEN = [
            {name: 'N', value: 1, color: "blue"}, {name: 'NNE', value: 1, color: "blue"}, {name: 'NE', value: 1, color: "blue"},
            {name: 'ENE', value: 1, color: "green"}, {name: 'E', value: 1, color: "green"}, {name: 'ESE', value: 1, color: "green"},
            {name: 'SE', value: 1, color: "red"}, {name: 'SSE', value: 1, color: "red"}, {name: 'S', value: 1, color: "red"},
            {name: 'SSW', value: 1, color: "yellow"}, {name: 'SW', value: 1, color: "yellow"},  {name: 'WSW', value: 1, color: "white"},
            {name: 'W', value: 1, color: "white"}, {name: 'WNW', value: 1, color: "white"}, {name: 'NW', value: 1, color: "white"},
            {name: 'NNW', value: 1, color: "blue"}
        ];

        this.DATA_THIRTYTWO = [
            {name: 'N4', value: 1, color: "white"}, {name: 'N5', value: 1, color: "white"}, {name: 'N6', value: 1, color: "white"}, 
            {name: 'N7', value: 1, color: "white"}, {name: 'N8', value: 1, color: "green"}, {name: 'E1', value: 1, color: "white"},
            {name: 'E2', value: 1, color: "blue"}, {name: 'E3', value: 1, color: "blue"}, {name: 'E4', value: 1, color: "green"}, 
            {name: 'E5', value: 1, color: "blue"}, {name: 'E6', value: 1, color: "blue"}, {name: 'E7', value: 1, color: "red"},
            {name: 'E8', value: 1, color: "green"}, {name: 'S1', value: 1, color: "yellow"}, {name: 'S2', value: 1, color: "red"}, 
            {name:'S3', value: 1, color: "red"}, {name: 'S4', value: 1, color: "red"}, {name: 'S5', value: 1, color: "green"}, 
            {name: 'S6', value: 1, color: "yellow"}, {name: 'S7', value: 1, color: "yellow"}, {name: 'S8', value: 1, color: "yellow"}, 
            {name: 'W1', value: 1, color: "white"}, {name: 'W2', value: 1, color: "red"}, {name: 'W3', value: 1, color: "red"},
            {name: 'W4', value: 1, color: "white"}, {name: 'W5', value: 1, color: "white"}, {name: 'W6', value: 1, color: "yellow"}, 
            {name: 'W7', value: 1, color: "white"}, {name: 'W8', value: 1, color: "yellow"}, {name: 'N1', value: 1, color: "yellow"},
            {name: 'N2', value: 1, color: "white"}, {name: 'N3', value: 1, color: "blue"}
        ];
    }


    drawMask({ layer, points, size }) {

        layer.select('g.mask').remove();

        this.root = layer.append("g").classed('surface-mask', true);

        this.mask = this.root
            .append("defs")
            .append("mask")
            .attr("id", "myMask");

        this.mask.append("rect")
            .attr("x", size.x)
            .attr("y", size.y)
            .attr("width", size.width)
            .attr("height", size.height)
            .style("fill", "white")
            .style("fill-opacity", 0.95);

        this.mask.append("polygon")
            .attr("points", points);

        this.series = this.root
            .attr("class", "mask")
            .attr("width", size.width)
            .attr("height", size.height)
            .append("g")
            .attr("transform", "translate(0,0)");

        this.rect = this.series
            .append("rect")
            .attr("x", size.x)
            .attr("y", size.y)
            .attr("width", size.width)
            .attr("height", size.height)
            .attr("mask", "url(#myMask)")
            .style("fill", "#f8f8f8")
            .style("fill-opacity", 0.95);
    }

    drawBoundaries({ layer, points, type = "custom"}) {

        layer.select('g.map-boundaries').remove();

        let g = layer.append('g').classed('map-boundaries', true);

        g.append('polygon')
            .attr('points', points)
            .style('stroke', '#6869AB')
            .style('stroke-width', 2)
            .style('fill-opacity', 0);

        if(type == "custom"){
            for (let i = 0; i < points.length; i++) {
                let circle = g.selectAll('circles')
                    .data([points[i]]).enter()
                    .append('circle')
                    .classed('dragger', true)
                    .attr('cx', points[i][0])
                    .attr('cy', points[i][1])
                    .attr('r', 4)
                    .attr('fill', '#FDBC07')
                    .attr('stroke', '#000');
   
                g.append('text').text(`P${i}`)
                    .attr('x', points[i][0] - 5)
                    .attr('y', points[i][1] - 7)
                    .attr('fill', '#FFE13E')
                    .attr('font-weight', '700');

            }
        }
    }

    drawDirectionLines(layer, faceCoords, centroid, division = 8, angle = 0) {

        layer.selectAll('g.direction-lines').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let increment = (360 / parseInt(division));
        let data;

        if(division == 8) { data = this.DATA_EIGHT; }
        else if(division == 16) { data = this.DATA_SIXTEEN; }
        else if(division == 32) { data = this.DATA_THIRTYTWO; }

        for (let i = 0; i < division; i++) {
            let direction = layer
                .append('g').classed('direction-lines group', true)
                .append("line")
                .attr("stroke-dasharray", "5,5")
                .attr("x1", centroid.x)
                .attr("y1", centroid.y)
                .attr("x2", parseFloat(centroid.x) + 800)
                .attr("y2", centroid.y)
                .attr("transform", "rotate(" + (nAngle + angle) + " " + centroid.x + " " + centroid.y + ")")
                .attr("stroke", (i == 0 ? "red" : "darkorange"))
                .attr("stroke-width", (i == 0 ? 2 : 1))
                .classed("directions", true)
                .attr('data-direction-name', data[i].name);
            nAngle += increment;
        }
    }

    drawBharamNabhi({ layer, centroid }) {

        layer.select('g.bharamnabhi').remove();

        // To draw centeroid of House Map starts
        let g = layer.append('g').classed('bharamnabhi', true);

        g.append("circle")
            .classed("inner-circle", true)
            .attr("cx", centroid.x)
            .attr("cy", centroid.y)
            .attr('r', 3)
            .style('fill', '#000')

        g.append("circle")
            .classed("outer-circle", true)
            .attr("cx", centroid.x)
            .attr("cy", centroid.y)
            .attr("r", 15)
            .attr("fill", "#EF5350")
            .attr('fill-opacity', 0.5)
            .attr("stroke", "#000")
            .attr("is-handle", "true");

    }

    drawBackgroundGrid(layer, centroid, faceCoords, division = 8, angle = 0) {

        layer.select('g.background-pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let gridAngle = 360 / 8, radius = 800, data = [];
        // console.log("drawBackgroundGrid nAngle: ",gridAngle + nAngle + angle);

        if(division == 8) { data = this.DATA_EIGHT; }
        else if(division == 16) { gridAngle += 360/division; data = this.DATA_SIXTEEN; }
        else if(division == 32) { gridAngle += 360/16 + 360/division; data = this.DATA_THIRTYTWO; }

        let arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let pie = d3
            .pie()
            .startAngle(Math.PI / (division))
            .endAngle(Math.PI * 2 + Math.PI / division);

        let svg = layer
            .append("g").classed('background-pie-chart', true)
            .attr("transform", "translate(" + centroid.x + "," + centroid.y + ")");

        let g = svg
            .selectAll(".arc")
            .data(pie(data.map(function (d) { return d.value; })))
            .enter()
            .append("g")
            .attr("transform", "rotate(" + (gridAngle + nAngle + angle) + ")");

        g.append("path")
            .attr("class", function (d, i) {return "B-" + data[i].name;})
            .attr("d", arc)
            .style('fill', function (d, i) { return data[i].color })
            .style("fill-opacity", "0");
    }

    drawGrid(layer, centroid, faceCoords, screenBoundariesCoords, division = 8, angle = 0, type="mahavastu") {
        layer.select('g.pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let data = [], gridAngle = 360 / 8, radius = 800, directionData, directionDetail;

        // console.log("drawGrid nAngle: ",gridAngle + nAngle + angle);

        let directions = [{ dir: 'N', baseAng: 90 }, { dir: 'E', baseAng: 360 }, { dir: 'S', baseAng: 270 }, { dir: 'W', baseAng: 180 }]
        let activeDir;

        for (let m = 0, n = m + 1; m < screenBoundariesCoords.length; m++, n++) {
            (m == screenBoundariesCoords.length - 1) ? n = 0 : null;
            let ip = Utility.linesIntersection(centroid.x, centroid.y, (centroid.x + Math.cos(nAngle * 0.0174533) * 3200), (centroid.y + Math.sin(nAngle * 0.0174533) * 3200), ...screenBoundariesCoords[m], ...screenBoundariesCoords[n]);
            if (ip) { activeDir = directions[m]; }
        }

        let newAng;

        if (division == 8) {
            newAng = 45;
        }
        else if (division == 16) {
            newAng = 67.5;
        }
        else {
            newAng = 56.25;
        }

        if(division == 8) { directionData = this.DATA_EIGHT; directionDetail = DIRECTION_EIGHT; }
        else if(division == 16) { gridAngle += 360/division; directionData   = this.DATA_SIXTEEN; directionDetail = DIRECTION_SIXTEEN; }
        else if(division == 32) { gridAngle += 360/16 + 360/division; directionData  = this.DATA_THIRTYTWO; directionDetail = DIRECTION_THIRTYTWO; }

        for (let i = 0; i < division; i++) {
            var temp = { name: directionData[i].name, value: directionData[i].value, detail: directionDetail[i] };
            data.push(temp);
        }

        let arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0);

        let pie = d3
            .pie()
            .startAngle(Math.PI / division)
            .endAngle(Math.PI * 2 + Math.PI / division);

        let svg = layer
            .append("g").classed('pie-chart', true)
            .attr("transform", "translate(" + centroid.x + "," + centroid.y + ")");

        let g = svg
            .selectAll(".arc")
            .data(pie(data.map(function (d) { return d.value; })))
            .enter()
            .append("g")
            .attr("transform", "rotate(" + (gridAngle + nAngle + angle) + ")");

        g.append("path")
            .attr("class", function (d, i) { return data[i].name; })
            .attr("data-detail", function(d,i) { return data[i].detail; })
            .attr("d", arc)
            .attr("stroke", "#21252963")
            .style("fill-opacity", "0");

        g.append("text")
            .attr("transform", function (d) {
                var _d = arc.centroid(d);
                _d[0] *= 1;	//multiply by a constant factor
                _d[1] *= 1;	//multiply by a constant factor
                return "translate(" + _d + ") rotate(" + (activeDir.baseAng - angle - newAng) + ")";
            })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
            .style("fill", "#000")
            .text(function (d, i) {
                return data[i].name;
            });

        g.on("mouseover", function () {
            if(type == "vedic") return false; 
            let className = d3.select(this).select("path").attr("class");
            let detail = d3.select(this).select("path").attr("data-detail");  
            
            d3.select(".B-" + className)
                .style("fill-opacity", "0.75");

            d3.select(this)
                .select("path")
                .style("fill", "green")
                .style("fill-opacity", "0.1");

            d3.select('.property.description').text(detail);

        }).on("mouseout", function () {
            if(type == "vedic") return false; 
            let className = d3.select(this).select("path").attr("class");

            d3.select(".B-" + className)
                .style("fill-opacity", "0");
            d3.select(this)
                .select("path")
                .style("fill", "#fff")
                .style("fill-opacity", "0");
        });
    }

    drawFacingLine(layer, centroid, faceCoords, active = true) {

        if(active == false) {
            layer.select('.facing').remove();
            layer.select('.facing-degree').remove();
            return false;
        }

        let perpendicularPointOnFacingWall = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);

        layer.select('.facing').remove();
        layer.select('.facing-degree').remove();

        let facingLine = layer
            .append("line")
            .classed("facing", true)
            .attr("x1", centroid.x)
            .attr("y1", centroid.y)
            .attr("x2", perpendicularPointOnFacingWall.x)
            .attr("y2", perpendicularPointOnFacingWall.y)
            .attr("stroke", "red")
            .attr("stroke-width", 4);

        let facingDegree = layer
            .append("text")
            .classed("facing-degree", true)
            .attr("x", perpendicularPointOnFacingWall.x)
            .attr("y", perpendicularPointOnFacingWall.y)
            .attr("fill", "red")
            .style('font-size', '16px')
            .style('font-family', 'Raleway-Bold')
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .text("0°");
    }

    drawPolygon({layer, points, strokeColor = "red", strokeWidth = 4}) {
        layer.select('g.vedic-polygon').remove();
        let g = layer.append('g')
        .classed('vedic-polygon', true);

        g.append('polygon')
        .attr('points', points)
        .style('stroke', strokeColor)
        .style('stroke-width', strokeWidth)
        .style('fill-opacity', '0');
    }

    drawPolygonDiagonals({points, color = "red", strokeWidth = 4}) {
        d3.select('g.vedic-polygon').select('g.diagonals-container').remove();

        let container = d3.select('g.vedic-polygon').append('g')
        .classed('diagonals-container', true);

        container.append('line')
        .attr('x1',points[0][0])
        .attr('y1',points[0][1])
        .attr('x2',points[2][0])
        .attr('y2',points[2][1])
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

        container.append('line')
        .attr('x1',points[1][0])
        .attr('y1',points[1][1])
        .attr('x2',points[3][0])
        .attr('y2',points[3][1])
        .attr('stroke',color)
        .attr('stroke-width', strokeWidth);
    }

    drawPolygonGrid({points , noOfLines = 3, color = "red", strokeWidth = 4}) {
        d3.select('g.vedic-polygon').select('g.vedic-grid-container').remove();

        let layer = d3.select('g.vedic-polygon').append('g').classed('vedic-grid-container', true);

        let upperLine = Utility.divideIntoSegments([points[0][0],points[0][1]], [points[1][0],points[1][1]], noOfLines);
        let bottomLine = Utility.divideIntoSegments([points[3][0],points[3][1]], [points[2][0],points[2][1]], noOfLines);
        let leftLine = Utility.divideIntoSegments([points[0][0],points[0][1]], [points[3][0],points[3][1]], noOfLines);
        let rightLine = Utility.divideIntoSegments([points[1][0],points[1][1]], [points[2][0],points[2][1]], noOfLines);

        // FOR HORIZONTAL LINES
        for(let i=0; i<noOfLines-1; i++){
            layer.append('line').classed('horizontal-lines', true)
            .attr('x1',leftLine[i].x).attr('y1',leftLine[i].y)
            .attr('x2',rightLine[i].x).attr('y2',rightLine[i].y)
            .style('stroke', 'red')
            .style('stroke-width', 4);
        }
        // FOR VERTICAL LINES
        for(let i=0; i<noOfLines-1; i++){
            layer.append('line').classed('vertical-lines', true)
            .attr('x1',upperLine[i].x).attr('y1',upperLine[i].y)
            .attr('x2',bottomLine[i].x).attr('y2',bottomLine[i].y)
            .style('stroke', 'red')
            .style('stroke-width', 4);
        }
    }

    drawDivisionOfDevtas(angle, canvas, mapBoundariesCoords, faceCoords, centroid , state = true) {
        if(!state) {
            canvas.select('g.division-of-devtas').remove();
            return false;
        }
        let layer = canvas.append('g').classed('division-of-devtas', true);
        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
              
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let increment = 360/32;
        let ipArray = Utility.getIntersectionPoints(    angle, centroid, mapBoundariesCoords, 32, "intersectionPoints");
        
        let outerArray = [];
        let len = ipArray.length;
        console.log("ipArray",ipArray);
        for (let i=0;i<len;i++) {
            let j = i+1;
            (i+1==len)? j=0:j=(i+1);
            let farthestPoint = ipArray[i].ip;
            if (ipArray[i].direction == ipArray[j].direction){
                //compare distance from centroid and store the farther point in outer array
                let d1=Utility.distanceBetweenTwoPoints(centroid, ipArray[i].ip);
                let d2=Utility.distanceBetweenTwoPoints(centroid, ipArray[j].ip);
                farthestPoint= (d1>d2)?ipArray[i].ip:ipArray[j].ip;
            }
            else {
                //store current point as farthest point in that direction
                outerArray.push({ip:farthestPoint});
            }
        }
       
        let brahma = outerArray.map((pts) => {
            return [
                (centroid.x + (pts.ip[0]- centroid.x) / 3 ),
                (centroid.y + (pts.ip[1]- centroid.y) / 3 )
            ]
        });

        let twoThirdArr = outerArray.map((pts) => {
            return [
              (centroid.x + (pts.ip[0]- centroid.x) * 2 / 3 ),
              (centroid.y + (pts.ip[1]- centroid.y) * 2 / 3 )
            ]
        });

        let halfOfMidCircleArr = outerArray.map((pts) => {
            return [
                (centroid.x + (pts.ip[0]- centroid.x) / 2 ),
                (centroid.y + (pts.ip[1]- centroid.y) / 2 )
            ]
        });

    
       
        if (outerArray.length==32){
            console.log("good to go");
            //Draw outer 32 devtas
            let len = outerArray.length;
            for (let i=0;i<len;i++) {
                let j = i+1;
                (i+1==len)? j=0:j=(i+1);
                let outerPolygon = [];
                outerPolygon.push(outerArray[i].ip);
                outerPolygon.push(outerArray[j].ip);
                outerPolygon.push(twoThirdArr[j]);
                outerPolygon.push(twoThirdArr[i]);
                layer.append('polygon').attr('points',outerPolygon).style('fill-opacity',0).style('stroke','red').style('stroke-width',2);
            }

            //Draw 2nd layer
                let aapaha = [];
                aapaha.push(twoThirdArr[4]);
                aapaha.push(twoThirdArr[5]);
                aapaha.push(twoThirdArr[6]);
                aapaha.push(halfOfMidCircleArr[6]);
                aapaha.push(halfOfMidCircleArr[5]);
                aapaha.push(halfOfMidCircleArr[4]);
                console.log("outer",aapaha);
                layer.append('polygon').attr('points',aapaha).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);
            
                let aapahaVatsa = [];
                aapahaVatsa.push(twoThirdArr[6]);
                aapahaVatsa.push(twoThirdArr[7]);
                aapahaVatsa.push(twoThirdArr[8]);
                aapahaVatsa.push(halfOfMidCircleArr[8]);
                aapahaVatsa.push(halfOfMidCircleArr[7]);
                aapahaVatsa.push(halfOfMidCircleArr[6]);
                console.log("outer",aapahaVatsa);
                layer.append('polygon').attr('points',aapahaVatsa).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let savita = [];
                savita.push(twoThirdArr[12]);
                savita.push(twoThirdArr[13]);
                savita.push(twoThirdArr[14]);
                savita.push(halfOfMidCircleArr[14]);
                savita.push(halfOfMidCircleArr[13]);
                savita.push(halfOfMidCircleArr[12]);
                console.log("outer",savita);
                layer.append('polygon').attr('points',savita).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let savitra = [];
                savitra.push(twoThirdArr[14]);
                savitra.push(twoThirdArr[15]);
                savitra.push(twoThirdArr[16]);
                savitra.push(halfOfMidCircleArr[16]);
                savitra.push(halfOfMidCircleArr[15]);
                savitra.push(halfOfMidCircleArr[14]);
                console.log("outer",savita);
                layer.append('polygon').attr('points',savitra).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let indra = [];
                indra.push(twoThirdArr[20]);
                indra.push(twoThirdArr[21]);
                indra.push(twoThirdArr[22]);
                indra.push(halfOfMidCircleArr[22]);
                indra.push(halfOfMidCircleArr[21]);
                indra.push(halfOfMidCircleArr[20]);
                console.log("outer",indra);
                layer.append('polygon').attr('points',indra).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let jaya = [];
                jaya.push(twoThirdArr[22]);
                jaya.push(twoThirdArr[23]);
                jaya.push(twoThirdArr[24]);
                jaya.push(halfOfMidCircleArr[24]);
                jaya.push(halfOfMidCircleArr[23]);
                jaya.push(halfOfMidCircleArr[22]);
                console.log("outer",indra);
                layer.append('polygon').attr('points',jaya).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let rudra = [];
                rudra.push(twoThirdArr[28]);
                rudra.push(twoThirdArr[29]);
                rudra.push(twoThirdArr[30]);
                rudra.push(halfOfMidCircleArr[30]);
                rudra.push(halfOfMidCircleArr[29]);
                rudra.push(halfOfMidCircleArr[28]);
                console.log("outer",rudra);
                layer.append('polygon').attr('points',rudra).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

                let rajyakshama = [];
                rajyakshama.push(twoThirdArr[30]);
                rajyakshama.push(twoThirdArr[31]);
                rajyakshama.push(twoThirdArr[0]);
                rajyakshama.push(halfOfMidCircleArr[0]);
                rajyakshama.push(halfOfMidCircleArr[31]);
                rajyakshama.push(halfOfMidCircleArr[30]);
                console.log("outer",rajyakshama);
                layer.append('polygon').attr('points',rajyakshama).style('fill-opacity',0).style('stroke','blue').style('stroke-width',2);

            //Draw Brahma
            layer.append('polygon').attr('points',brahma).style('fill-opacity',0).style('stroke','red').style('stroke-width',2);
            // layer.append('polygon').attr('points',twoThirdArr).style('fill-opacity',0).style('stroke','red').style('stroke-width',2);
            // layer.append('polygon').attr('points',halfOfMidCircleArr).style('fill-opacity',0).style('stroke','red').style('stroke-width',2);
        }
        else {
            console.log("Should select 32 zones");
        }

        

    }

    uniqueID(){
        return Math.random().toString(36).slice(2);
    }

}