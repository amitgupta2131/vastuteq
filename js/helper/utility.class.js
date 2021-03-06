import ObjectModel from "../helper/objectmodel.class.js";
export default class Utility {

  // ! FUNCTION TO ALIGN OBJECT INSIDE CANVAS
  static centerOfCanvas(canvasSize, width = 0, height = 0) {
    return { x: ((canvasSize.width / 2) - (width / 2)), y: ((canvasSize.height / 2) - (height / 2)) }
  }

  // ! FUNCTION TO RESIZE IMAGE TO FIT IN CANVAS
  static resizeObject(canvasSize, width = 0, height = 0) {
    let imageRatio = width / height;
    let maxHeight = canvasSize.height * 0.8;
    let finalHeight = 0;
    if (height > maxHeight) {
      finalHeight = maxHeight;
    }
    else {
      finalHeight = height;
    }

    let finalWidth = finalHeight * imageRatio;

    return {
      width: finalWidth,
      height: finalHeight
    };
  }

  // ! FUNCTION TO FIND CENTEROID 
  static getCentroid(pts) {
    pts = [pts];
    let first = pts[0][0], last = pts[0][pts[0].length - 1];
    if (first[0] != last[1] || first[1] != last[0]) pts.push(first[0]);
    let twicearea = 0, x = 0, y = 0, nPts = pts[0].length, p1, p2, f;
    for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
      p1 = pts[0][i];
      p2 = pts[0][j];
      f = (p1[1] - first[1]) * (p2[0] - first[0]) -
        (p2[1] - first[1]) * (p1[0] - first[0]);
      twicearea += f;
      x += (p1[0] + p2[0] - 2 * first[0]) * f;
      y += (p1[1] + p2[1] - 2 * first[1]) * f;
    }
    f = twicearea * 3;
    return {
      x: parseFloat(x / f + first[0]),
      y: parseFloat(y / f + first[1]),
    };
  }

  // ! TO FIND VEDIC CENTEROID
  static getVedicCenteroid(pts) {
    return this.linesIntersection(pts[0][0], pts[0][1], pts[2][0], pts[2][1], pts[1][0], pts[1][1], pts[3][0], pts[3][1]);
  }

  // ! TO FIND VEDIC SURFACE POINTS
  static getVedicSurfacePoints(pts) {
    // MIN X AND MAX X
    let minX = pts.reduce((min, p) => (p[0] < min ? p[0] : min), pts[0][0]);
    let maxX = pts.reduce((max, p) => (p[0] > max ? p[0] : max), pts[0][0]);

    // MIN Y AND MAX Y
    let minY = pts.reduce((min, p) => (p[1] < min ? p[1] : min), pts[0][1]);
    let maxY = pts.reduce((max, p) => (p[1] > max ? p[1] : max), pts[0][1]);

    return [
      [minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
    ];
  }

  // ! TO FIND CLOSEST COORDINATE
  static closestCoord(arr, coord) {
    let minDiff = 50, ans = [];
    for (let i in arr) {
      let x = Math.abs(coord[0] - arr[i][0]);
      let y = Math.abs(coord[1] - arr[i][1]);
      if (x + y < minDiff) {
        minDiff = x + y;
        ans = [arr[i][0], arr[i][1]];
      }
    }
    return ans;
  }

  // ! TO CHECK CLOSEST COORDINATE
  static isClosestCoord(source, target) {
    let minDiff = 10;
    let x = Math.abs(target[0] - source[0]);
    let y = Math.abs(target[1] - source[1]);
    if (x + y < minDiff) {
      minDiff = x + y;
      return true;
    } else {
      return false;
    }
  }

  // ! TO FIND PERPENDICULAR POINT
  static getPerpendicularPoint(A, B, C) {
    var x1 = A[0], y1 = A[1], x2 = B[0],
      y2 = B[1], x3 = C.x, y3 = C.y;
    var px = x2 - x1, py = y2 - y1,
      dAB = px * px + py * py;
    var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
    var x = x1 + u * px, y = y1 + u * py;
    return { x: x, y: y }; //this is D
  }

  // ! TO FIND ANGLE FROM ONE TO ANOTHER POINT
  static getAngle(cx, cy, ex, ey) {
    let dy = ey - cy;
    let dx = ex - cx;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    return parseFloat((theta).toFixed(3));
  }

  // ! TO FIND LINE INTERSECTION
  static linesIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    // Check if none of the lines are of length 0

    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    let denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);


    // Lines are parallel
    if (denominator === 0) {
      return false;
    }

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

    // is the intersection along the segments
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    // Return a object with the x and y coordinates of the intersection
    let x = x1 + ua * (x2 - x1);
    let y = y1 + ua * (y2 - y1);

    return { x, y };
  }

  // ! GET INTERSECTION POINTS
  static getIntersectionPoints(nAngle, centroid, mapBoundariesCoords, division = 8, type = "polygon") {
    let directions;
    let ipArray = [];
    let outerPolygons = [];
    let polygons = [];
    let extremePoints = [];
    let ang = [], temp = nAngle, leftDeg, rightDeg;

    if (division == 4) directions = ['N', 'E', 'S', 'W'];
    else if (division == 8) directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    else if (division == 16) directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    else if (division == 32) directions = ['N4', 'N5', 'N6', 'N7', 'N8', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'N1', 'N2', 'N3'];

    for (let i = 0; i < division; i++) {
      leftDeg = (temp - (360 / (division * 2))) * 0.0174533;
      rightDeg = (temp + (360 / (division * 2))) * 0.0174533;
      ang.push({ ang: directions[i], lDeg: leftDeg, rDeg: rightDeg });
      temp += (360 / division);
    }

    // FOR INTERSECTION ARRAY
    for (let j = 0; j < ang.length; j++) {
      let point1 = [centroid.x, centroid.y];
      let point2 = [centroid.x + Math.cos(ang[j].lDeg) * 1300, centroid.y + Math.sin(ang[j].lDeg) * 1300];

      for (let m = 0, n = m + 1; m < mapBoundariesCoords.length; m++, n++) {
        (m == mapBoundariesCoords.length - 1) ? n = 0 : null;

        let ip = this.linesIntersection(...point1, ...point2, ...mapBoundariesCoords[m], ...mapBoundariesCoords[n]);
        if (ip) ipArray.push({ direction: ang[j].ang, wall: [mapBoundariesCoords[m], mapBoundariesCoords[n]], ip: [ip.x, ip.y] })
      }
    }

    // d3.select('#eightLayer').append('line').attr('x1',centroid.x).attr('y1',centroid.y)
    // .attr('x2',(centroid.x + Math.cos(ang[0].lDeg) * 1000)).attr('y2',(centroid.y + Math.sin(ang[0].lDeg) * 1000))
    // .style('stroke','red').style('stroke-width', 3);

    if ((type == "polygon") || (type == "polygonDirections")) {

      // FOR POLYGON ARRAY
      for (let j = 0; j < ang.length; j++) {
        let point = [centroid.x + Math.cos(ang[j].lDeg) * 1000, centroid.y + Math.sin(ang[j].lDeg) * 1000];
        extremePoints.push(point);
      }

      for (let j = 0; j < division; j++) {
        let k = (j == division - 1) ? 0 : j + 1;
        outerPolygons.push({ direction: directions[j], points: [extremePoints[j], extremePoints[k], [centroid.x, centroid.y]] });
      }
      if (type == "polygon") {
        polygons = Utility.getPolygonsArray(outerPolygons, mapBoundariesCoords);
      }
      else {
        // console.log("type=",type);
        polygons = Utility.getPolygonsArrayAndDirection(outerPolygons, mapBoundariesCoords);
        // console.log("polygons: ",polygons);
      }
      // console.log("polygons: ",polygons);
      // console.log("outer polygons: ",outerPolygons);
    }

    return (type == "polygon" || type == "polygonDirections") ? polygons : ipArray;

  }

  // ! GET X,Y COORDINATION ARRAY
  static getPoints(x, y, height, width) {
    let point = [];
    point.push([x, y]);
    point.push([parseInt(x) + parseInt(width), y]);
    point.push([x, parseInt(y) + parseInt(height)]);
    point.push([parseInt(x) + parseInt(width), parseInt(y) + parseInt(height)]);
    return point
  }

  // ! GET POLYGON ARRAY
  static getPolygonsArray(source, clip) {
    let intersectionArr = [];
    for (let i = 0; i < source.length; i++) {
      intersectionArr.push(greinerHormann.intersection(source[i].points, clip))
    }
    return intersectionArr;
  }

  // ! GET POLYGONS AREA ARRAY
  static getPolygonsArea(arr) {
    let areaArr = [];

    for (let i in arr) {
      let area = 0;

      if (arr[i] != null || arr[i] != undefined) {
        for (let j in arr[i]) {
          area += Math.abs(d3.polygonArea(arr[i][j]));
        }
      }
      areaArr.push(area);
    }

    return areaArr;
  }

  // ! GET POLYGON ARRAY WITH DIRECTIONS
  //   TO IDENTIFY WHERE THE OBJECTS HAVE BEEN PLACED
  static getPolygonsArrayAndDirection(source, clip) {
    let intersectionArr = [];
    for (let i = 0; i < source.length; i++) {
      let data = {
        direction: source[i].direction,
        polygon: greinerHormann.intersection(source[i].points, clip)
      }
      //  console.log("data",data);
      intersectionArr.push(data);
    }
    return intersectionArr;
  }

  // ! DIVIDE INTO SEGMENTS
  static divideIntoSegments(startPoint, endPoint, segments) {
    let x1 = startPoint[0],
      y1 = startPoint[1],
      x2 = endPoint[0],
      y2 = endPoint[1];

    let dx = (x2 - x1) / segments;
    let dy = (y2 - y1) / segments;

    let interiorPoints = [];

    for (let i = 1; i < segments; i++)
      interiorPoints.push({
        x: (x1 + i * dx).toFixed(1),
        y: (y1 + i * dy).toFixed(1),
      });

    return interiorPoints;
  }
  // ! GET DISTANCE BETWEEN TWO GIVEN POINTS
  static distanceBetweenTwoPoints(startPoint, endPoint) {
    let deltaX = startPoint.x - endPoint.x;
    let deltaY = startPoint.y - endPoint.y;
    let dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return (dist);
  };


  static getObjectDirection(calNorthAngle, centroid, angle, mapBoundariesCoords, division) {
    let objectModel = new ObjectModel();
    let objects = objectModel.getObject(localStorage.getItem('selectedMapId'));
    console.log('objects',objects);
    let objectData;
    let div = $('select[name="select-grid"]').val();
    let objectReport = [];
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
      //Check if Object is in any of the directions
      // console.log(objectData);
      let mapPolygonsArrayWithDirections = Utility.getIntersectionPoints(
        calNorthAngle + angle,
        centroid,
        mapBoundariesCoords,
        division,
        "polygonDirections"
      );
      let data = {};
      let testPoint = Utility.getPoints(objectData.x, objectData.y, objectData.height, objectData.width);
      // console.log("Map:",mapPolygonsArrayWithDirections);


      mapPolygonsArrayWithDirections.forEach(element => {
        // console.log("testPoint",testPoint);
        // console.log("element",element);
        let dir = element.direction
        testPoint.forEach(point => {
          if (d3.polygonContains(element.polygon[0], point)) {
            data['id'] = objectData.id;
            data['name'] = objectData.name;
            data[dir] = d3.polygonContains(element.polygon[0], point);
          }
        });



        // console.log("res", element.direction, d3.polygonContains(element.polygon[0], testPoint3))
      });

      objectReport.push(data)
      // console.log(data)
    }
    // console.log(objectReport)
    localStorage.removeItem('objectReport');
    localStorage.removeItem('reportDivision');
    localStorage.setItem('objectReport', JSON.stringify(objectReport));
    localStorage.setItem('reportDivision', div);
    
    //update Report data in database
      console.log(localStorage.getItem('selectedMapId'))
      var formData = new FormData();
      formData.append('id', localStorage.getItem('selectedMapId'));
      formData.append('reportData', JSON.stringify(objectReport));
      var url = BASE_URL + "/Main/updateReportData";
      AjaxPost(formData, url, updateReportDatasuccess, AjaxError);



      function updateReportDatasuccess(content, targetTextarea) {
          var result = JSON.parse(content);
          return content;
      }
  
  }


}