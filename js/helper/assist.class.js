// import { DIRECTION_EIGHT, DIRECTION_SIXTEEN, DIRECTION_THIRTYTWO } from "./directiondetails.class.js";
import Utility from './utility.class.js';

export default class Assist {
    constructor() {

        // this.DATA_EIGHT = [
        //     { name: 'N', value: 1, color: "blue" }, { name: 'NE', value: 1, color: "blue" }, { name: 'E', value: 1, color: "green" },
        //     { name: 'SE', value: 1, color: "red" }, { name: 'S', value: 1, color: "red" }, { name: 'SW', value: 1, color: "yellow" },
        //     { name: 'W', value: 1, color: "white" }, { name: 'NW', value: 1, color: "white" }
        // ];


        // this.DATA_SIXTEEN = [
        //     { name: 'N', value: 1, color: "blue" }, { name: 'NNE', value: 1, color: "blue" }, { name: 'NE', value: 1, color: "blue" },
        //     { name: 'ENE', value: 1, color: "green" }, { name: 'E', value: 1, color: "green" }, { name: 'ESE', value: 1, color: "green" },
        //     { name: 'SE', value: 1, color: "red" }, { name: 'SSE', value: 1, color: "red" }, { name: 'S', value: 1, color: "red" },
        //     { name: 'SSW', value: 1, color: "yellow" }, { name: 'SW', value: 1, color: "yellow" }, { name: 'WSW', value: 1, color: "white" },
        //     { name: 'W', value: 1, color: "white" }, { name: 'WNW', value: 1, color: "white" }, { name: 'NW', value: 1, color: "white" },
        //     { name: 'NNW', value: 1, color: "blue" }
        // ];

        // this.DATA_THIRTYTWO = [
        //     { name: 'N4', value: 1, color: "white", effect: `The Entrance Ensures Abundance Of Money, Inherited And / Or Earned.` }, { name: 'N5', value: 1, color: "white", effect: `This Entrance Makes People Religious, Non-aggressive And Calm.` }, {
        //         name: 'N6', value: 1, color: "white", effect: `The Entrance Makes Residents Behave In A Manner That People Generally 
        //     Disapprove Of. People Usually Avoid Listening To Them.` },
        //     {
        //         name: 'N7', value: 1, color: "white", effect: `This Entrance Instigates Rebellious Attitude Among Young Girls And Makes 
        //     Them Go Against The Family’s Culture And Social Beliefs. In The Indian Context, 
        //     A Girl In Such A Family May Resort To An Inter Caste Marriage.` }, { name: 'N8', value: 1, color: "green", effect: `Such A Entrance Paves Way For A Higher Bank Balance For Its Occupants.` }, { name: 'E1', value: 1, color: "white", effect: `This Entrance Causes Fire Accidents And Unexpected Losses` },
        //     {
        //         name: 'E2', value: 1, color: "blue", effect: `This Entrance Induces Wasteful Expenditure. For An Expecting Mother, 
        //     It Will Increase The Probability Of Birth Of Baby.` }, { name: 'E3', value: 1, color: "blue", effect: `This Is An Auspicious Zone Entrance Which Brings Money, Profits And Overall Success` }, {
        //         name: 'E4', value: 1, color: "green", effect: `This Entrance Helps The Inhabitants Build Beneficial And Close Association With 
        //     Government Officials Or With Those In Authority` },
        //     { name: 'E5', value: 1, color: "blue", effect: `This Entrance Makes People Extremely Short-tempered, Bordering On Insanity At Times.` }, { name: 'E6', value: 1, color: "blue", effect: `This Entrance Makes It Difficult For People To Keep Their Word Making Them Appear Unreliable.` }, { name: 'E7', value: 1, color: "red", effect: `People Of Such Houses Become Insensitive Towards The Problems Of Other People.` },
        //     { name: 'E8', value: 1, color: "green", effect: `This Entrance Paves Way For Accidents, Financial Losses, Burglary And Other Such Problems.` }, { name: 'S1', value: 1, color: "yellow", effect: `This Entrance Negatively Impacts Children, Especially The Boys Of The House. Their Actions Go Against Their Parents Expectations.` }, { name: 'S2', value: 1, color: "red", effect: `This Entrance Increase The Tendency To Work For Others. It Is Good For People Working In M Or Similar Setups,` },
        //     { name: 'S3', value: 1, color: "red", effect: `This Entrance Brings Immense Prosperity. The Occupants Of Such A House Become Smarter And Their Work Gets Done Easily` }, { name: 'S4', value: 1, color: "red", effect: `Industries In Such Plots Are Highly Successful. The Family Residing In Such A Space Is Bless With More Sons.` }, { name: 'S5', value: 1, color: "green", effect: `The People In Such Houses Are Rarely Free From Debts. They Feel Incapable Of Making Good Use Of Their Intellect.` },
        //     { name: 'S6', value: 1, color: "yellow", effect: `A Door Abysmal Poverty` }, { name: 'S7', value: 1, color: "yellow", effect: `People Residing In Such Houses Suffer, As Their Efforts Towards A Profession Or Relationship Keep Going Waste. They Remain Disconnected And Unhappy.` }, {
        //         name: 'S8', value: 1, color: "yellow", effect: `The Most Ominous Entrance, It Results In Such Behaviour And Attitude, Which Gradually Disconnects The Family From The Rest Of The World, 
        //     Thereby Severely Affecting Their Finance And Relationships,` },
        //     { name: 'W1', value: 1, color: "white", effect: `This Entrance IS NEGATIVE FOT THE RESIDENTS Financial Position And Life Span` }, {
        //         name: 'W2', value: 1, color: "red", effect: `The Entrance Creates Instability In Career. People Residing Here Lack Clarity Of Thought And Vision. They Turn Insure, Especially Of 
        //     Their Near And Dear Ones.` }, { name: 'W3', value: 1, color: "red", effect: `This Entrance Brings Astounding Growth And Prosperity.` },
        //     { name: 'W4', value: 1, color: "white", effect: `It Offers No Particular Benefits Or Harms. Life In Such Houses Is Generally Smooth. Overall It Is Good Entrance.` }, { name: 'W5', value: 1, color: "white", effect: `The Entrance Makes One A Perfectionist To The Extent Of Becoming Delusional And Overambitious. One Starts Expecting Unrealistic Gains.` }, { name: 'W6', value: 1, color: "yellow", effect: `This Entrance Makes People Prone To Mental Depression.` },
        //     { name: 'W7', value: 1, color: "white", effect: `An Entrance In This Zone Causes Loss Of General Happiness In The House. At Times, It Induces The Person To Resort To Drugs And Alcohol.` }, { name: 'W8', value: 1, color: "yellow", effect: `This Entrance Affects The Mentality Of Residents In Such A Way That They Do Not Mind Adopting Unfair And Unlawful Means For Their Own Benefit.` }, { name: 'N1', value: 1, color: "yellow", effect: `In Such A House, The Inhabitants Becomes Susceptible To Harm Caused By Bad Intentions Of Other People.` },
        //     { name: 'N2', value: 1, color: "white", effect: `A Fear Of Enemies, That Is Not Entirely Unfounded, Stalks People Living In Such Houses, Residents Feel That Others Are Jealous Of Them.` }, { name: 'N3', value: 1, color: "blue", effect: `This Door Bring Lots Of Money And Male Progeny For Those Who Occupy It.` }
        // ];

        // console.log(this.DATA_THIRTYTWO);
        // for(let i=0;i<this.DATA_THIRTYTWO.length;i++){
        //     var formData = new FormData();
        //     formData.append('1', this.DATA_THIRTYTWO[i]['name']);
        //     formData.append('2', this.DATA_THIRTYTWO[i]['color']);
        //     formData.append('3', this.DATA_THIRTYTWO[i]['effect']);
        //     // formData.append('4', DIRECTION_SIXTEEN[i]['DISHAPALAKWEAPON']); 
        //     // formData.append('5', DIRECTION_SIXTEEN[i]['ASTHLAKSHMI']);  
        //     // formData.append('6', DIRECTION_SIXTEEN[i]['COLOUR']);  
        //     // formData.append('7', DIRECTION_SIXTEEN[i]['desc']);            
        //     var url = BASE_URL + "/Main/addDevtas";
        //     AjaxPost(formData, url, devtaSuccess, AjaxError);
        // }
        // function devtaSuccess(content, targetTextarea) {
        //     console.log('done')
        // }

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
            .style("fill", "#283333")
            .style("fill-opacity", 0.95);
    }

    drawBoundaries({ layer, points }) {

        layer.select('g.map-boundaries').remove();

        let g = layer.append('g').classed('map-boundaries', true);

        g.append('polygon')
            .attr('points', points)
            .style('stroke', '#6869AB')
            .style('stroke-width', 2)
            .style('fill-opacity', 0);

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

            g.append('text').text(String.fromCharCode(i + 65).toUpperCase())
                .attr('x', points[i][0] - 5)
                .attr('y', points[i][1] - 7)
                .attr('fill', '#FFE13E')
                .attr('font-weight', '700');

        }
    }

    drawDirectionLines(layer, faceCoords, centroid, division = 8, angle = 0) {

        layer.selectAll('g.direction-lines').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let increment = (360 / parseInt(division));

        // console.log((360/parseInt(division)), division, layer, facingWallPoints,centeroid,division,angle);
        // console.log("nAngle: ",nAngle);

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
                .classed("directions", true);
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

    async drawBackgroundGrid(layer, centroid, faceCoords, division = 8, angle = 0) {

        layer.select('g.background-pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let gridAngle = 360 / 8, radius = 800, data = [];

        //calling ajax to fetch result data from database
        var formData = new FormData();
        if (division == 8) { formData.append('division', 'eight'); }
        else if (division == 16) { formData.append('division', 'sixteen'); }
        else if (division == 32) { formData.append('division', 'thirtytwo'); }

        var url = BASE_URL + "/Main/getColor";

        let content = await AjaxPostPromise(formData, url).catch(AjaxError);


        let result = JSON.parse(content);
console.log(result)
        if (result.length == 8) { data.push(result) }
        else if (result.length == 16) { gridAngle += 360 / division; data.push(result); }
        else if (result.length == 32) { gridAngle += 360 / division; data.push(result); }
        data = data[0]
        // console.log(data);
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
            .attr("class", function (d, i) {
                return "B-" + data[i].name;
            })
            .attr("d", arc)
            .style('fill', function (d, i) { return data[i].mainColor })
            .style("fill-opacity", "0");
    }

    async drawGrid(layer, centroid, faceCoords, screenBoundariesCoords, division = 8, angle = 0) {

        layer.select('g.pie-chart').remove();

        let perpendicularPoints = Utility.getPerpendicularPoint(faceCoords[0], faceCoords[1], centroid);
        let nAngle = Utility.getAngle(centroid.x, centroid.y, perpendicularPoints.x, perpendicularPoints.y);
        let data = [], gridAngle = 360 / 8, radius = 800, directionData, directionDetail;

        let directions = [{ dir: 'N', baseAng: 90 }, { dir: 'E', baseAng: 360 }, { dir: 'S', baseAng: 270 }, { dir: 'W', baseAng: 180 }]
        let activeDir;

        for (let m = 0, n = m + 1; m < screenBoundariesCoords.length; m++, n++) {
            (m == screenBoundariesCoords.length - 1) ? n = 0 : null;
            let ip = Utility.linesIntersection(centroid.x, centroid.y, (centroid.x + Math.cos(nAngle * 0.0174533) * 3200), (centroid.y + Math.sin(nAngle * 0.0174533) * 3200), ...screenBoundariesCoords[m], ...screenBoundariesCoords[n]);
            if (ip) { activeDir = directions[m]; }
        }
        //calling ajax to fetch result data from database
        var formData = new FormData();
        if (division == 8) { formData.append('grid', 'eight'); }
        else if (division == 16) { formData.append('grid', 'sixteen'); }
        else if (division == 32) { formData.append('grid', 'thirtytwo'); }

        let url = BASE_URL + "/Main/getColorAndDetails";
        let content = await AjaxPostPromise(formData, url).catch(AjaxError);


        let result = JSON.parse(content);
        console.log(result)
        if (result.length == 8) { data.push(result) }
        else if (result.length == 16) { gridAngle += 360 / division; data.push(result); }
        else if (result.length == 32) { gridAngle += 360 / division; data.push(result); }
        data = data[0];
        

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
            .attr("data-detail", function (d, i) {
                if (data[i].divisions == 'EIGHT') {//sending description data to show
                    return JSON.stringify({
                        asthalakshmi: data[i].asthalakshmi,
                        color: data[i].color,
                        description: data[i].description,
                        direction: data[i].direction,
                        dishaPalakDiety: data[i].dishaPalakDiety,
                        dishaPalakVehicle: data[i].dishaPalakVehicle,
                        dishaPalakWeapon: data[i].dishaPalakWeapon,
                        dishaRulingPlanet: data[i].dishaRulingPlanet,
                        description: data[i].description
                    })
                } else if (data[i].divisions == 'SIXTEEN') {
                        return JSON.stringify({
                            attribute : data[i].attribute,
                            itCovers : data[i].itCovers
                        })
                } else {
                    return JSON.stringify({
                        effect : data[i].effect
                        
                    })
                }
            })
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
            .style("fill", "white")
            .text(function (d, i) {
                return data[i].name;
            });

        g.on("mouseover", function () {
            let className = d3.select(this).select("path").attr("class");
            console.log(className);
            let detail = d3.select(this).select("path").attr("data-detail");
            detail = JSON.parse(detail);
            let len = Object.keys(detail).length;           
            
            //formating detail object to be show on description
            if(len == 8){
                detail = ` DISHA RULING PLANET : ${detail.dishaRulingPlanet}
                DISHA PALAK DIETY : ${detail.dishaPalakDiety}
                DISHA PALAK VEHICLE : ${detail.dishaPalakVehicle}
                DISHA PALAK WEAPON : ${detail.dishaPalakWeapon}
                ASTHLAKSHMI : ${detail.asthalakshmi}
                COLOUR : ${detail.color}
                DESCRIPTION : ${detail.description} `
            } else if(len == 2){
                detail = ` ATTRIBUTE : ${detail.attribute}
                IT COVERS : ${detail.itCovers} `
            }else{
                detail = `${detail.effect}`
            }
            
            d3.select(".B-" + className)
                .style("fill-opacity", "0.75");

            d3.select(this)
                .select("path")
                .style("fill", "green")
                .style("fill-opacity", "0.1");

            d3.select('.property.description').text(detail);

        }).on("mouseout", function () {
            let className = d3.select(this).select("path").attr("class");

            d3.select(".B-" + className)
                .style("fill-opacity", "0");
            d3.select(this)
                .select("path")
                .style("fill", "#fff")
                .style("fill-opacity", "0");
        });
    }


    drawFacingLine(layer, centroid, faceCoords) {

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
            .style('font-size', '14px')
            .style('font-family', 'Raleway_Bold')
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .text("0°");
    }

}