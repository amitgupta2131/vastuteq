import { DIRECTION_EIGHT, DIRECTION_SIXTEEN, DIRECTION_THIRTYTWO } from "./directiondetails.class.js";
import Utility from './utility.class.js';

export default class Assist {

    constructor() {

        this.DATA_EIGHT = [
            { name: 'N', value: 1, color: "blue" }, { name: 'NE', value: 1, color: "blue" }, { name: 'E', value: 1, color: "green" },
            { name: 'SE', value: 1, color: "red" }, { name: 'S', value: 1, color: "red" }, { name: 'SW', value: 1, color: "yellow" },
            { name: 'W', value: 1, color: "white" }, { name: 'NW', value: 1, color: "white" }
        ];

        this.DATA_SIXTEEN = [
            { name: 'N', value: 1, color: "blue" }, { name: 'NNE', value: 1, color: "blue" }, { name: 'NE', value: 1, color: "blue" },
            { name: 'ENE', value: 1, color: "green" }, { name: 'E', value: 1, color: "green" }, { name: 'ESE', value: 1, color: "green" },
            { name: 'SE', value: 1, color: "red" }, { name: 'SSE', value: 1, color: "red" }, { name: 'S', value: 1, color: "red" },
            { name: 'SSW', value: 1, color: "yellow" }, { name: 'SW', value: 1, color: "yellow" }, { name: 'WSW', value: 1, color: "white" },
            { name: 'W', value: 1, color: "white" }, { name: 'WNW', value: 1, color: "white" }, { name: 'NW', value: 1, color: "white" },
            { name: 'NNW', value: 1, color: "blue" }
        ];

        this.DATA_THIRTYTWO = [
            { name: 'N4', value: 1, color: "white" }, { name: 'N5', value: 1, color: "white" }, { name: 'N6', value: 1, color: "white" },
            { name: 'N7', value: 1, color: "white" }, { name: 'N8', value: 1, color: "green" }, { name: 'E1', value: 1, color: "white" },
            { name: 'E2', value: 1, color: "blue" }, { name: 'E3', value: 1, color: "blue" }, { name: 'E4', value: 1, color: "green" },
            { name: 'E5', value: 1, color: "blue" }, { name: 'E6', value: 1, color: "blue" }, { name: 'E7', value: 1, color: "red" },
            { name: 'E8', value: 1, color: "green" }, { name: 'S1', value: 1, color: "yellow" }, { name: 'S2', value: 1, color: "red" },
            { name: 'S3', value: 1, color: "red" }, { name: 'S4', value: 1, color: "red" }, { name: 'S5', value: 1, color: "green" },
            { name: 'S6', value: 1, color: "yellow" }, { name: 'S7', value: 1, color: "yellow" }, { name: 'S8', value: 1, color: "yellow" },
            { name: 'W1', value: 1, color: "white" }, { name: 'W2', value: 1, color: "red" }, { name: 'W3', value: 1, color: "red" },
            { name: 'W4', value: 1, color: "white" }, { name: 'W5', value: 1, color: "white" }, { name: 'W6', value: 1, color: "yellow" },
            { name: 'W7', value: 1, color: "white" }, { name: 'W8', value: 1, color: "yellow" }, { name: 'N1', value: 1, color: "yellow" },
            { name: 'N2', value: 1, color: "white" }, { name: 'N3', value: 1, color: "blue" }
        ];
        this.DEVTAS = [
            { direction: "N4" ,name: 'Bhallat', value: 41, text: "Discriminator,Parkhi" },
            { direction: "N5" ,name: 'Soma', value: 42, text: "Solution,Drive" },
            { direction: "N6" ,name: 'Bhujang', value: 43, text: "Doctor,Healer" },
            { direction: "N7" ,name: 'Aditi', value: 44, text: "Caretaker,Councellor" },
            { direction: "N8" ,name: 'Diti', value: 45, text: "Instructor,Pt Teacher" }, 
            { direction: "E1" ,name: 'Shikhi', value: 14, text: "Subject Expert,Bhram Gyani" },
            { direction: "E2" ,name: 'Parjanya', value: 15, text: "Producer,Fertilizer" },
            { direction: "E3" ,name: 'Jayant', value: 16, text: "Excellent Performer,Achiever" },
            { direction: "E4" ,name: 'Mahendra', value: 17, text: "Top Boss,King" },
            { direction: "E5" ,name: 'Surya', value: 18, text: "Executer,Awakener" },
            { direction: "E6",name: 'Satya', value: 19, text: "Court,Dharma" },
            { direction: "E7" ,name: 'Bhrisha', value: 20, text: "Researher,Grinder" },
            { direction: "E8" ,name: 'Antriksh', value: 21, text: "Market Space,Bandwidth" },
            { direction: "S1" ,name: 'Anil', value: 22, text: "Elevator,Fire" },
            { direction: "S2" ,name: 'Pusha', value: 23, text: "HighWay Security,Recoverer" },
            { direction: "S3" ,name: 'Vitasta', value: 24, text: "Ancimory Service Provider" },
            { direction: "S4" ,name: 'Griha Spatya', value: 25, text: "Binder,Commander" },
            { direction: "S5" ,name: 'Yama', value: 26, text: "Finer,Sortor" },
            { direction: "S6" ,name: 'Gandharva', value: 27, text: "whActor,Performing Artist" },
            { direction: "S7" ,name: 'Bhriangraj', value: 28, text: "Cleasner,Drainer" },
            { direction: "S8" ,name: 'Mrigah', value: 29, text: "Shooter,Hunter" },
            { direction: "W1" ,name: 'Pitra', value: 30, text: "Anctestors Legacy" },
            { direction: "W2" ,name: 'Dauwarik', value: 31, text: "Gaurd Security System" },
            { direction: "W3" ,name: 'Sugreev', value: 32, text: "Capturer,Gainer" },
            { direction: "W4" ,name: 'Puspdant', value: 33, text: "Grammarian,Ustaad,maestro" },
            { direction: "W5" ,name: 'Varun', value: 34, text: "Ed,CBI,Vigilance" },
            { direction: "W6" ,name: 'Asur', value: 35, text: "Informer,Secret Agent" },
            { direction: "W7" ,name: 'Shosha', value: 36, text: "Depressive,Dryer" },
            { direction: "W8" ,name: 'Papyakshma', value: 37, text: "Alcoholic,Addicted" },
            { direction: "N1" ,name: 'Roga', value: 38, text: "Vyeakent,Fatigue" },
            { direction: "N2" ,name: 'Ahir', value: 39, text: "Shaker,Attacker" },
            { direction: "N3" ,name: 'Mukhya', value: 40, text: "Designer,System Maker" },
            
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
            .style("fill-opacity", 0.5);

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

    drawBoundaries({ layer, points, type = "custom" }) {

        layer.select('g.map-boundaries').remove();

        let g = layer.append('g').classed('map-boundaries', true);

        g.append('polygon')
            .attr('points', points)
            .style('stroke', '#6869AB')
            .style('stroke-width', 2)
            .style('fill-opacity', 0);

        if (type == "custom") {
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
                    .attr('fill', 'black')
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

        if (division == 8) { data = this.DATA_EIGHT; }
        else if (division == 16) { data = this.DATA_SIXTEEN; }
        else if (division == 32) { data = this.DATA_THIRTYTWO; }

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

        if (division == 8) { data = this.DATA_EIGHT; }
        else if (division == 16) { gridAngle += 360 / division; data = this.DATA_SIXTEEN; }
        else if (division == 32) { gridAngle += 360 / 16 + 360 / division; data = this.DATA_THIRTYTWO; }

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
            .attr("class", function (d, i) { return "B-" + data[i].name; })
            .attr("d", arc)
            .style('fill', function (d, i) { return data[i].color })
            .style("fill-opacity", "0");
    }

    drawGrid(layer, centroid, faceCoords, screenBoundariesCoords, division = 8, angle = 0, type = "mahavastu") {
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
            //else { console.log("Assist Class: No intersection point found.") }
        }

        let newAng = this.getAngleBasedOnDivisions(division);


        if (division == 8) { directionData = this.DATA_EIGHT; directionDetail = DIRECTION_EIGHT; }
        else if (division == 16) { gridAngle += 360 / division; directionData = this.DATA_SIXTEEN; directionDetail = DIRECTION_SIXTEEN; }
        else if (division == 32) { gridAngle += 360 / 16 + 360 / division; directionData = this.DATA_THIRTYTWO; directionDetail = DIRECTION_THIRTYTWO; }

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
            .attr("data-detail", function (d, i) { return data[i].detail; })
            .attr("d", arc)
            // .attr("stroke", "#21252963")
            .attr("stroke", "#F7E7BD")
            .style("fill-opacity", "0");

        g.append("text")
            .attr("transform", function (d) {
                var _d = arc.centroid(d);

                // console.log(_d)
                _d[0] *= 0.6;	//multiply by a constant factor
                _d[1] *= 0.6;	//multiply by a constant factor

                return "translate(" + _d + ") rotate(" + (activeDir.baseAng - angle - newAng) + ")";
            })
            .attr("dy", ".50em")
            .style("text-anchor", "middle")
            .style("fill", "#000")
            .text(function (d, i) {
                return data[i].name;
            });

        g.on("mouseover", function () {
            if (type == "vedic") return false;
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
            if (type == "vedic") return false;
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

        if (active == false) {
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

    drawPolygon({ layer, points, strokeColor = "red", strokeWidth = 2,name='3GL' }) {
        console.log(points)
        layer.select('g.vedic-polygon').remove();
        let g = layer.append('g')
            .classed('vedic-polygon', true)
            .classed('object-item', true)
            .attr('name',name);

        g.append('polygon')
            .attr('points', points)
            .attr('data-object-item', 'vedicRectangle')
            .attr('data-src', 'drawing')
            .style('stroke', strokeColor)
            .style('stroke-width', strokeWidth)
            .style('fill-opacity', '0');
    }

    drawPolygonDiagonals({ points, color = "red", strokeWidth = 4 }) {
        d3.select('g.vedic-polygon').select('g.diagonals-container').remove();

        let container = d3.select('g.vedic-polygon').append('g')
            .classed('diagonals-container', true);

        container.append('line')
            .attr('x1', points[0][0])
            .attr('y1', points[0][1])
            .attr('x2', points[2][0])
            .attr('y2', points[2][1])
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);

        container.append('line')
            .attr('x1', points[1][0])
            .attr('y1', points[1][1])
            .attr('x2', points[3][0])
            .attr('y2', points[3][1])
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);
    }

    drawPolygonGrid({ points, noOfLines = 3, color = "red", strokeWidth = 2 }) {
        d3.select('g.vedic-polygon').select('g.vedic-grid-container').remove();

        let layer = d3.select('g.vedic-polygon').append('g').classed('vedic-grid-container', true);

        let upperLine = Utility.divideIntoSegments([points[0][0], points[0][1]], [points[1][0], points[1][1]], noOfLines);
        let bottomLine = Utility.divideIntoSegments([points[3][0], points[3][1]], [points[2][0], points[2][1]], noOfLines);
        let leftLine = Utility.divideIntoSegments([points[0][0], points[0][1]], [points[3][0], points[3][1]], noOfLines);
        let rightLine = Utility.divideIntoSegments([points[1][0], points[1][1]], [points[2][0], points[2][1]], noOfLines);

        // FOR HORIZONTAL LINES
        for (let i = 0; i < noOfLines - 1; i++) {
            layer.append('line').classed('horizontal-lines', true)
                .attr('x1', leftLine[i].x).attr('y1', leftLine[i].y)
                .attr('x2', rightLine[i].x).attr('y2', rightLine[i].y)
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth);
        }
        // FOR VERTICAL LINES
        for (let i = 0; i < noOfLines - 1; i++) {
            layer.append('line').classed('vertical-lines', true)
                .attr('x1', upperLine[i].x).attr('y1', upperLine[i].y)
                .attr('x2', bottomLine[i].x).attr('y2', bottomLine[i].y)
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth);
        }
    }

    drawMarmSthana({ points, noOfLines = 3, color = "red", strokeWidth = 2 }) {

        d3.select('g.vedic-polygon').select('g.vedic-grid-container').remove();

        let layer = d3.select('g.vedic-polygon').append('g').classed('vedic-grid-container', true);

        let upperLine = Utility.divideIntoSegments([points[0][0], points[0][1]], [points[1][0], points[1][1]], noOfLines);
        let bottomLine = Utility.divideIntoSegments([points[3][0], points[3][1]], [points[2][0], points[2][1]], noOfLines);
        let leftLine = Utility.divideIntoSegments([points[0][0], points[0][1]], [points[3][0], points[3][1]], noOfLines);
        let rightLine = Utility.divideIntoSegments([points[1][0], points[1][1]], [points[2][0], points[2][1]], noOfLines);

        // FOR HORIZONTAL LINES
        for (let i = 0; i < noOfLines - 1; i++) {
            layer.append('line').classed('horizontal-lines', true)
                .attr('x1', leftLine[i].x).attr('y1', leftLine[i].y)
                .attr('x2', rightLine[i].x).attr('y2', rightLine[i].y)
                .attr('stroke', color)
                .attr('stroke-width', color)
                .attr('stroke-width', strokeWidth);

        }
        // FOR VERTICAL LINES
        for (let i = 0; i < noOfLines - 1; i++) {
            layer.append('line').classed('vertical-lines', true)
                .attr('x1', upperLine[i].x).attr('y1', upperLine[i].y)
                .attr('x2', bottomLine[i].x).attr('y2', bottomLine[i].y)
                .attr('stroke', color)
                .attr('stroke-width', strokeWidth);
        }

        d3.select('g.vedic-polygon').select('g.diagonals-container').remove();

        let container = d3.select('g.vedic-polygon').append('g')
            .classed('diagonals-container', true);
        // this.drawLine(container,
        //               points[0][0],points[0][1],
        //               points[2][0],points[2][1],
        //               color,strokeWidth);
        // this.drawLine(container,
        //                 points[1][0],points[1][1],
        //                 points[3][0],points[3][1],
        //                 color,strokeWidth);

        container.append('line')
            .attr('x1', points[0][0])
            .attr('y1', points[0][1])
            .attr('x2', points[2][0])
            .attr('y2', points[2][1])
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);

        container.append('line')
            .attr('x1', points[1][0])
            .attr('y1', points[1][1])
            .attr('x2', points[3][0])
            .attr('y2', points[3][1])
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);

        // FOR Slanting LINES

        layer.append('line').classed('slanting-lines', true)
            .attr('x1', upperLine[1].x).attr('y1', upperLine[1].y)
            .attr('x2', rightLine[6].x).attr('y2', rightLine[6].y)
            .attr('stroke', color)
            .attr('stroke-width', color)
            .attr('stroke-width', strokeWidth);

        layer.append('line').classed('slanting-lines', true)
            .attr('x1', bottomLine[6].x).attr('y1', bottomLine[6].y)
            .attr('x2', leftLine[1].x).attr('y2', leftLine[1].y)
            .attr('stroke', color)
            .attr('stroke-width', color)
            .attr('stroke-width', strokeWidth);

        layer.append('line').classed('slanting-lines', true)
            .attr('x1', upperLine[6].x).attr('y1', upperLine[6].y)
            .attr('x2', leftLine[6].x).attr('y2', leftLine[6].y)
            .attr('stroke', color)
            .attr('stroke-width', color)
            .attr('stroke-width', strokeWidth);

        layer.append('line').classed('slanting-lines', true)
            .attr('x1', bottomLine[1].x).attr('y1', bottomLine[1].y)
            .attr('x2', rightLine[1].x).attr('y2', rightLine[1].y)
            .attr('stroke', color)
            .attr('stroke-width', color)
            .attr('stroke-width', strokeWidth);
    }
    drawDivisionOfDevtas(angle, canvas, mapBoundariesCoords, faceCoords, centroid, state = true) {
        if (!state) {
            canvas.select('g.division-of-devtas').remove();
            return false;
        }
        let layer = canvas.append('g').classed('division-of-devtas', true);
        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);

        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let increment = 360 / 32;
        let ipArray = Utility.getIntersectionPoints(nAngle+angle, centroid, mapBoundariesCoords, 32, "intersectionPoints");
        console.log(ipArray);
        let outerArray = [];
        let len = ipArray.length;
        let devtas = this.DEVTAS

        for (let i = 0; i < len; i++) {
            let j = i + 1;
            (i + 1 == len) ? j = 0 : j = (i + 1);
            let farthestPoint = ipArray[i].ip;
            if (ipArray[i].direction == ipArray[j].direction) {
                //compare distance from centroid and store the farther point in outer array
                let d1 = Utility.distanceBetweenTwoPoints(centroid, ipArray[i].ip);
                let d2 = Utility.distanceBetweenTwoPoints(centroid, ipArray[j].ip);
                farthestPoint = (d1 > d2) ? ipArray[i].ip : ipArray[j].ip;
            }
            else {
                //store current point as farthest point in that direction
                outerArray.push({ ip: farthestPoint , direction : ipArray[i].direction});
            }
        }

        let brahma = outerArray.map((pts) => {
            return [
                (centroid.x + (pts.ip[0] - centroid.x) / 3),
                (centroid.y + (pts.ip[1] - centroid.y) / 3)
            ]
        });

        

        let twoThirdArr = outerArray.map((pts) => {
            return [
                (centroid.x + (pts.ip[0] - centroid.x) * 2 / 3),
                (centroid.y + (pts.ip[1] - centroid.y) * 2 / 3)
            ]
        });

        let halfOfMidCircleArr = outerArray.map((pts) => {
            return [
                (centroid.x + (pts.ip[0] - centroid.x) / 2),
                (centroid.y + (pts.ip[1] - centroid.y) / 2)
            ]
        });



        if (outerArray.length == 32) {
            // console.log(outerArray);
            tooltip(brahma, '1', 'Brahma');
            // tooltip(brahma, '1', 'Brahma,Building Purpose,Created services of products');
        // console.log(brahma)
            //Draw outer 32 devtas
            let len = outerArray.length;
            for (let i = 0; i < len; i++) {
                let j = i + 1;
                (i + 1 == len) ? j = 0 : j = (i + 1);
                let outerPolygon = [];
                outerPolygon.push(outerArray[i].ip);
                outerPolygon.push(outerArray[j].ip);
                outerPolygon.push(twoThirdArr[j]);
                outerPolygon.push(twoThirdArr[i]);
                layer.append('polygon')
                    .attr('points', outerPolygon).style('fill-opacity', 0).style('stroke', 'red').style('stroke-width', 2);
                    // let id = getDevtaId(outerArray[i].direction);
                    let d = outerArray[i].direction;
                    console.log(d)
                    let id = devtas.filter(function(e){
                           if (e.direction == d) {return e};
                    })
                    console.log(id);
                    tooltip(outerPolygon, id[0].value, id[0].name);
            }

            //Draw 2nd layer
            let aapaha = [];
            aapaha.push(twoThirdArr[3]);
            aapaha.push(twoThirdArr[4]);
            aapaha.push(twoThirdArr[5]);
            aapaha.push(halfOfMidCircleArr[5]);
            aapaha.push(halfOfMidCircleArr[4]);
            aapaha.push(halfOfMidCircleArr[3]);
            // console.log("outer",aapaha);
            layer.append('polygon').attr('points', aapaha).attr('id', 'aapaha').style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(aapaha, '6', 'Aapaha');
            // tooltip(aapaha, '6', 'Aapaha,Distributor,Kapha');
            


            let aapahaVatsa = [];
            aapahaVatsa.push(twoThirdArr[5]);
            aapahaVatsa.push(twoThirdArr[6]);
            aapahaVatsa.push(twoThirdArr[7]);
            aapahaVatsa.push(halfOfMidCircleArr[7]);
            aapahaVatsa.push(halfOfMidCircleArr[6]);
            aapahaVatsa.push(halfOfMidCircleArr[5]);
            // console.log("outer",aapahaVatsa);
            layer.append('polygon').attr('points', aapahaVatsa).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(aapahaVatsa, '7', 'AapahaVatsa');
            // tooltip(aapahaVatsa, '7', 'AapahaVatsa,Nutrients,Nutritionist');
            let savita = [];
            savita.push(twoThirdArr[11]);
            savita.push(twoThirdArr[12]);
            savita.push(twoThirdArr[13]);
            savita.push(halfOfMidCircleArr[13]);
            savita.push(halfOfMidCircleArr[12]);
            savita.push(halfOfMidCircleArr[11]);
            // console.log("outer",savita);
            layer.append('polygon').attr('points', savita).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(savita, '8', 'Savita');
            // tooltip(savita, '8', 'Savita,Motivature,Venture Capitalist');

            let savitra = [];
            savitra.push(twoThirdArr[13]);
            savitra.push(twoThirdArr[14]);
            savitra.push(twoThirdArr[15]);
            savitra.push(halfOfMidCircleArr[15]);
            savitra.push(halfOfMidCircleArr[14]);
            savitra.push(halfOfMidCircleArr[13]);
            // console.log("outer",savita);
            layer.append('polygon').attr('points', savitra).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(savitra, '9', 'Savitra');
            // tooltip(savitra, '9', 'Savitra,Money Finance');

            let indra = [];
            indra.push(twoThirdArr[19]);
            indra.push(twoThirdArr[20]);
            indra.push(twoThirdArr[21]);
            indra.push(halfOfMidCircleArr[21]);
            indra.push(halfOfMidCircleArr[20]);
            indra.push(halfOfMidCircleArr[19]);
            // console.log("outer",indra);
            layer.append('polygon').attr('points', indra).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(indra, '10', 'Indra');
            // tooltip(indra, '10', 'Indra,Bussiness Developer');

            let jaya = [];
            jaya.push(twoThirdArr[21]);
            jaya.push(twoThirdArr[22]);
            jaya.push(twoThirdArr[23]);
            jaya.push(halfOfMidCircleArr[23]);
            jaya.push(halfOfMidCircleArr[22]);
            jaya.push(halfOfMidCircleArr[21]);
            // console.log("outer",indra);
            layer.append('polygon').attr('points', jaya).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(jaya, '11', 'Jaya');
            // tooltip(jaya, '11', 'Jaya,Instrumental');

            let rudra = [];
            rudra.push(twoThirdArr[27]);
            rudra.push(twoThirdArr[28]);
            rudra.push(twoThirdArr[29]);
            rudra.push(halfOfMidCircleArr[29]);
            rudra.push(halfOfMidCircleArr[28]);
            rudra.push(halfOfMidCircleArr[27]);
            // console.log("outer",rudra);
            layer.append('polygon').attr('points', rudra).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(rudra, '12', 'Rudra');
            // tooltip(rudra, '12', 'Rudra,Controller');

            let rajyakshama = [];
            rajyakshama.push(twoThirdArr[29]);
            rajyakshama.push(twoThirdArr[30]);
            rajyakshama.push(twoThirdArr[31]);
            rajyakshama.push(halfOfMidCircleArr[31]);
            rajyakshama.push(halfOfMidCircleArr[30]);
            rajyakshama.push(halfOfMidCircleArr[29]);
            // console.log("outer",rajyakshama);
            layer.append('polygon').attr('points', rajyakshama).style('fill-opacity', 0).style('stroke', 'blue').style('stroke-width', 2);
            tooltip(rajyakshama, '13', 'Rajyakshama');
            // tooltip(rajyakshama, '13', 'Rajyakshama,Law Enforcement Officer');

            let bhudhar = [];
            bhudhar.push(brahma[29]);
            bhudhar.push(brahma[30]);
            bhudhar.push(brahma[31]);
            bhudhar.push(brahma[0]);
            bhudhar.push(brahma[1]);
            bhudhar.push(brahma[2]);
            bhudhar.push(brahma[3]);
            bhudhar.push(brahma[4]);
            bhudhar.push(brahma[5]);
            bhudhar.push(halfOfMidCircleArr[5]);
            bhudhar.push(halfOfMidCircleArr[4]);
            bhudhar.push(halfOfMidCircleArr[3]);
            bhudhar.push(twoThirdArr[3]);
            bhudhar.push(twoThirdArr[2]);
            bhudhar.push(twoThirdArr[1]);
            bhudhar.push(twoThirdArr[0]);
            bhudhar.push(twoThirdArr[31]);
            bhudhar.push(halfOfMidCircleArr[31]);
            bhudhar.push(halfOfMidCircleArr[30]);
            bhudhar.push(halfOfMidCircleArr[29]);
            

            // console.log("outer",bhudhar);
            layer.append('polygon').attr('points', bhudhar).style('fill-opacity', 0).style('stroke', 'black').style('stroke-width', 2);
            tooltip(bhudhar, '2', 'Bhudhar');
            // tooltip(bhudhar, '2', 'Bhudhar,Regular Activities Task Master');

            let aryama = [];
            aryama.push(brahma[5]);
            aryama.push(brahma[6]);
            aryama.push(brahma[7]);
            aryama.push(brahma[8]);
            aryama.push(brahma[9]);
            aryama.push(brahma[10]);
            aryama.push(brahma[11]);
            aryama.push(brahma[12]);
            aryama.push(brahma[13]);
            aryama.push(halfOfMidCircleArr[13]);
            aryama.push(halfOfMidCircleArr[12]);
            aryama.push(halfOfMidCircleArr[11]);
            aryama.push(twoThirdArr[11]);
            aryama.push(twoThirdArr[10]);
            aryama.push(twoThirdArr[9]);
            aryama.push(twoThirdArr[8]);
            aryama.push(twoThirdArr[7]);
            aryama.push(halfOfMidCircleArr[7]);
            aryama.push(halfOfMidCircleArr[6]);
            aryama.push(halfOfMidCircleArr[5]);

            // console.log("outer",aryama);
            layer.append('polygon').attr('points', aryama).style('fill-opacity', 0).style('stroke', 'black').style('stroke-width', 2);
            tooltip(aryama, '3', 'Aryama');
            // tooltip(aryama, '3', 'Aryama,Networker,Connector');

            let viviswan = [];
            viviswan.push(brahma[13]);
            viviswan.push(brahma[14]);
            viviswan.push(brahma[15]);
            viviswan.push(brahma[16]);
            viviswan.push(brahma[17]);
            viviswan.push(brahma[18]);
            viviswan.push(brahma[19]);
            viviswan.push(brahma[20]);
            viviswan.push(brahma[21]);
            viviswan.push(halfOfMidCircleArr[21]);
            viviswan.push(halfOfMidCircleArr[20]);
            viviswan.push(halfOfMidCircleArr[19]);
            viviswan.push(twoThirdArr[19]);
            viviswan.push(twoThirdArr[18]);
            viviswan.push(twoThirdArr[17]);
            viviswan.push(twoThirdArr[16]);
            viviswan.push(twoThirdArr[15]);
            viviswan.push(halfOfMidCircleArr[15]);
            viviswan.push(halfOfMidCircleArr[14]);
            viviswan.push(halfOfMidCircleArr[13]);

            // console.log("outer",viviswan);
            layer.append('polygon').attr('points', viviswan).style('fill-opacity', 0).style('stroke', 'black').style('stroke-width', 2);
            tooltip(viviswan, '4', 'Viviswan');
            // tooltip(viviswan, '4', 'Viviswan,Celebrity,Well Positioned');

            let mitra = [];
            mitra.push(brahma[21]);
            mitra.push(brahma[22]);
            mitra.push(brahma[23]);
            mitra.push(brahma[24]);
            mitra.push(brahma[25]);
            mitra.push(brahma[26]);
            mitra.push(brahma[27]);
            mitra.push(brahma[28]);
            mitra.push(brahma[29]);
            mitra.push(halfOfMidCircleArr[29]);
            mitra.push(halfOfMidCircleArr[28]);
            mitra.push(halfOfMidCircleArr[27]);
            mitra.push(twoThirdArr[27]);
            mitra.push(twoThirdArr[26]);
            mitra.push(twoThirdArr[25]);
            mitra.push(twoThirdArr[24]);
            mitra.push(twoThirdArr[23]);
            mitra.push(halfOfMidCircleArr[23]);
            mitra.push(halfOfMidCircleArr[22]);
            mitra.push(halfOfMidCircleArr[21]);

            // console.log("outer",mitra);
            layer.append('polygon')
                .attr('points', mitra)
                .style('fill-opacity', 0)
                .style('stroke', 'black')
                .style('stroke-width', 2);
                tooltip(mitra, '5', 'Mitra');
            // tooltip(mitra, '5', 'Mitra,Friend,Arbitrator');

            // let centerPoint = d3.polygonCentroid(mitra);
            // layer.append('text')
            //     .attr('class', 'barsEndlineText')
            //     .attr('text-anchor', 'middle')
            //     .attr("x", centerPoint[0])
            //     .attr("y", centerPoint[1])
            //     .text('2').style('fill', 'black')


            function tooltip(centerpoint, text1, text2) {
                let centerPoint = d3.polygonCentroid(centerpoint);
                let toolTipText = text2.split(',');
                let tooltip;
                // for(let i=0; i<toolTipText.length;i++){
                tooltip = layer.append("text")
                    .attr('class', 'barsEndlineText')
                    .attr('text-anchor', 'middle')
                    .attr("x", centerPoint[0])
                    .attr("y", centerPoint[1]+15)
                    .style("position", "absolute")
                    .style("visibility", "hidden")
                    .style('fill', 'blue')
                    // .style("filter", "url(#solid)")
                    .text(text2);
                // }
                layer.append('text')
                    .attr('class', 'barsEndlineText')
                    .attr('text-anchor', 'middle')
                    .attr("x", centerPoint[0])
                    .attr("y", centerPoint[1])
                    .text(text1).on("mouseover", function () { return tooltip.style("visibility", "visible"); })
                    .on("mouseout", function () { return tooltip.style("visibility", "hidden"); });
            }


        }
        else {
            console.log("Should select 32 zones");
        }
    }


    uniqueID() {
        return Math.random().toString(36).slice(2);
    }

    getAngleBasedOnDivisions(numberOfDivisions) {
        switch (numberOfDivisions) {
            case 8: return 45;
            case 16: return 67.5;
            case 32: return 56.5;
            default: return 67.5;
        }
    };
    drawLine(container, x1, y1, x2, y2, color, strokewidth) {
        container.append('line')
            .attr('x1', x1)
            .attr('y1', y1)
            .attr('x2', x2)
            .attr('y2', y2)
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);
    }



}