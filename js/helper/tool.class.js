export default class Tool {

    static Rectangle(canvas, mainLayer) {
        var layer = mainLayer.append('g')
        .classed('shape', true)
        .attr('data-shape','line')
        .on('click', function() {
            d3.selectAll('.shape[data-shape]').selectAll('.pointC').style('display','none');
            d3.select(this).selectAll('.pointC').style('display','block');
            d3.selectAll('.shape[data-shape]').classed('active', false);
            layer.classed('active', true);
        });

        d3.selectAll('.shape[data-shape]').classed('active', false);
        layer.classed('active', true);    

        var rect, rectData = [], isDown = false, 
        m1, m2, isDrag = false, isDisable = false, rectangleElement,
        pointElement1, pointElement2, pointElement3, pointElement4;
            
        canvas.on('mousedown', function() {
            m1 = d3.mouse(this);
            if (!isDown && !isDrag && isDisable == false) {
                rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
                rectangleElement = layer.append('rect').attr('class', 'rectangle').call(dragR);
                pointElement1 = layer.append('circle').attr('class', 'pointC').call(dragC1);
                pointElement2 = layer.append('circle').attr('class', 'pointC').call(dragC2);            
                pointElement3 = layer.append('circle').attr('class', 'pointC').call(dragC3);
                pointElement4 = layer.append('circle').attr('class', 'pointC').call(dragC4);
                updateRect();
                isDrag = false;
                
            } else { 
                isDrag = true;
            }
            isDown = !isDown;     
        })
        
        canvas.on('mousemove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag && isDisable == false) { 
                rectData[1] = { x: m2[0], y: m2[1] };
                updateRect();
            } 
        });  

        canvas.on('mouseup', function() {
            isDown = false;
            isDrag = false;
            disableMouseEvent();
        })
        
        function updateRect() {  
            rect = rectangleElement;
            rect.attr('stroke', '#000')
                .style('fill-opacity',0)
                .style('stroke-width', 2)
                .attr('x', rectData[1].x - rectData[0].x > 0 ? rectData[0].x :  rectData[1].x)
                .attr('y', rectData[1].y - rectData[0].y > 0 ? rectData[0].y :  rectData[1].y)
                .attr('width', Math.abs(rectData[1].x - rectData[0].x))
                .attr('height', Math.abs(rectData[1].y - rectData[0].y)); 
            
            var point1 = pointElement1.data(rectData);
            point1.attr('r', 5)
                .attr('cx', rectData[0].x)
                .attr('cy', rectData[0].y);        
            var point2 = pointElement2.data(rectData);
            point2.attr('r', 5)
                .attr('cx', rectData[1].x)
                .attr('cy', rectData[1].y);
            var point3 = pointElement3.data(rectData);
            point3.attr('r', 5)
                .attr('cx', rectData[1].x)
                .attr('cy', rectData[0].y);        
            var point4 = pointElement4.data(rectData);
            point4.attr('r', 5)
                .attr('cx', rectData[0].x)
                .attr('cy', rectData[1].y);
        }
        
        var dragR = d3.drag().on('drag', dragRect);
        
        function dragRect() {
            var e = d3.event;
            for(var i = 0; i < rectData.length; i++){
                rectangleElement
                    .attr('x', rectData[i].x += e.dx )
                    .attr('y', rectData[i].y += e.dy );
            }
            rect.style('cursor', 'move');
            updateRect();
        }
        
        var dragC1 = d3.drag().on('drag', dragPoint1);
        var dragC2 = d3.drag().on('drag', dragPoint2);
        var dragC3 = d3.drag().on('drag', dragPoint3);
        var dragC4 = d3.drag().on('drag', dragPoint4);
        
        function dragPoint1() {
            var e = d3.event;
            pointElement1
                .attr('cx', function(d) { return d.x += e.dx })
                .attr('cy', function(d) { return d.y += e.dy });        
            updateRect();   
        }   
        
        function dragPoint2() {
            var e = d3.event;
            pointElement2
                .attr('cx', rectData[1].x += e.dx )
                .attr('cy', rectData[1].y += e.dy );
            updateRect();   
        }   
        
        function dragPoint3() {
            var e = d3.event;
            pointElement3
                .attr('cx', rectData[1].x += e.dx )
                .attr('cy', rectData[0].y += e.dy );     
            updateRect();   
        }   
        
        function dragPoint4() {
            var e = d3.event;
            pointElement4
                .attr('cx', rectData[0].x += e.dx )
                .attr('cy', rectData[1].y += e.dy );
            updateRect();   
        }
        
        function disableMouseEvent() {
            isDisable = true;
            canvas.on('mousedown', null);
            canvas.on('mousemove', null);
            canvas.on('mouseup', null);
        }
    }


    static Line(canvas, mainLayer) {

        var layer = mainLayer.append('g')
            .classed('shape', true)
            .attr('data-shape','line')
            .on('click', function() {
                d3.selectAll('.shape[data-shape]').selectAll('.pointC').style('display','none');
                d3.select(this).selectAll('.pointC').style('display','block');
                d3.selectAll('.shape[data-shape]').classed('active', false);
                layer.classed('active', true);    
            });
        d3.selectAll('.shape[data-shape]').classed('active', false);
        layer.classed('active', true);    

        var self = this, line, lineData = [], 
        isDown = false, m1, m2, isDrag = false, 
        isDisable = false, lineElement, pointElement1,
        pointElement2;
            
        canvas.on('mousedown', function() {
            m1 = d3.mouse(this);
            if (!isDown && !isDrag && isDisable == false) {
                lineData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
                lineElement = layer.append('line').attr('class', 'line').call(dragR);
                pointElement1 = layer.append('circle').attr('class', 'pointC').call(dragC1);
                pointElement2 = layer.append('circle').attr('class', 'pointC').call(dragC2);
                updateLine();
                isDrag = false;
            } else { 
                isDrag = true;
            }
            isDown = !isDown;     
        })
        
        canvas.on('mousemove', function() {
            m2 = d3.mouse(this);
            if(isDown && !isDrag && isDisable == false) { 
                lineData[1] = { x: m2[0], y: m2[1] };
                updateLine();
            } 
        });  

        canvas.on('mouseup', function() {
            isDown = false;
            isDrag = false;
            disableMouseEvent();
        })
        
        function updateLine() {  
            line = lineElement;
            line.attr('stroke', '#000')
                .style('stroke-width', 2)
                .attr('x1', lineData[0].x)
                .attr('y1', lineData[0].y)
                .attr('x2', lineData[1].x)
                .attr('y2', lineData[1].y); 
            
            var point1 = pointElement1.data(lineData);
            point1.attr('r', 5)
                .attr('cx', lineData[0].x)
                .attr('cy', lineData[0].y);        
            var point2 = pointElement2.data(lineData);
            point2.attr('r', 5)
                .attr('cx', lineData[1].x)
                .attr('cy', lineData[1].y);
        }

        var dragR = d3.drag().on('drag', dragLine);
        var dragStop = d3.drag().on('drag', null);
        
        function dragLine() {
            var e = d3.event;
            for(var i = 0; i < lineData.length; i++){
                lineElement
                    .attr('x', lineData[i].x += e.dx )
                    .attr('y', lineData[i].y += e.dy );
            }
            line.style('cursor', 'move');
            updateLine();
        }
        
        var dragC1 = d3.drag().on('drag', dragPoint1);
        var dragC2 = d3.drag().on('drag', dragPoint2);
        
        function dragPoint1() {
            var e = d3.event;
            pointElement1
                .attr('cx', function(d) { return d.x += e.dx })
                .attr('cy', function(d) { return d.y += e.dy });        
            updateLine();   
        }   
        
        function dragPoint2() {
            var e = d3.event;
            pointElement2
                .attr('cx', lineData[1].x += e.dx )
                .attr('cy', lineData[1].y += e.dy );
            updateLine();   
        }

        function disableMouseEvent() {
            isDisable = true;
            canvas.on('mousedown', null);
            canvas.on('mousemove', null);
            canvas.on('mouseup', null);
        }
        

    }

    static Polygon(canvas, mainLayer, ref) {

        var layer = mainLayer.append('g')
        .classed('shape', true)
        .attr('data-shape','polygon')
        .on('click', function() {
            d3.selectAll('.shape[data-shape]').selectAll('.pointC').style('display','none');
            d3.select(this).selectAll('.pointC').style('display','block');
            d3.selectAll('.shape[data-shape]').classed('active', false);
            layer.classed('active', true);
        });
        d3.selectAll('.shape[data-shape]').classed('active', false);
        layer.classed('active', true);    

        var polygonData = [], startPoint = [], isDrawing = false,
        isDragging = false, isDisable = false, g;

        var dragger = d3.drag()
        .on('drag', handleDrag)
        .on('start end', (d) => { isDragging = false; });

        canvas.on('mouseup', function() {
            if(isDisable) return;
            if(isDragging) return;

            isDrawing = true;

            startPoint = d3.mouse(this);
            if(layer.select(`g.polygon`).empty()) g = layer.append('g').attr('class', 'polygon');
            if(d3.event.target.hasAttribute('is-handle')) { closePolygon(); }

            polygonData.push(d3.mouse(this));
            g.select('polyline').remove();
            var polyline = g.append('polyline').attr('points', polygonData)
            .style('fill', 'none').attr('stroke', 'black').attr('stroke-width', 2);

            g.append('circle')
            .attr('cx', startPoint[0])
            .attr('cy', startPoint[1])
            .attr('r', 4)
            .attr('fill', 'yellow')
            .attr('stroke', '#000')
            .attr('is-handle', 'true')
            .style('cursor', 'pointer');
        })

        canvas.on("mousemove", function () {
            if(isDisable) return;
            if(!isDrawing) return;
    
            let g = d3.select(`g.polygon`);
            g.select('line').remove();
            let line = g.append('line')
            .attr('x1', startPoint[0])
            .attr('y1', startPoint[1])
            .attr('x2', d3.mouse(this)[0] + 2)
            .attr('y2', d3.mouse(this)[1])
            .attr('stroke', 'black')
            .attr('stroke-width', '2');
        })

        function closePolygon() {
            if(isDisable) return;
            d3.select(`g.polygon`).remove();
            let g = layer.append('g').classed('polygon', true);

            g.append('polygon')
            .attr('points', polygonData)
            .style('stroke', '#000')
            .style('stroke-width', 2)
            .style('fill-opacity', 0);

            for(let i = 0; i < polygonData.length; i++){
                let circle = g.selectAll('circles')
                .data([polygonData[i]]).enter()
                .append('circle')
                .classed('polygon-resize-handler', true)
                .attr('cx', polygonData[i][0])
                .attr('cy', polygonData[i][1])
                .attr('r', 4)
                .attr('fill', '#FDBC07')
                .attr('stroke', '#000')
                .attr('is-handle', 'true')
                .call(dragger)
                .style('cursor', 'move');
            }

            isDisable = true;
            isDrawing = false;
            end();

        }

        function handleDrag(d) {
            if(isDrawing) return;

            isDragging = true;

            let dragCircle = d3.select(this), newPoints = [], circle, text;
            let poly = d3.select(this.parentNode).select('polygon');
            let polyLine = d3.select(this.parentNode).select('polyline');
            let circles = d3.select(this.parentNode).selectAll('circle')["_groups"][0];
            dragCircle.attr('cx', d3.event.x).attr('cy', d3.event.y);

            console.log(d3.select(this),circles,poly);

            for(let i = 0; i < circles.length; i++){
                circle = d3.select(circles[i]);
                newPoints.push([circle.attr('cx'), circle.attr('cy')]);
            }

            polygonData = [];
            polygonData.push(...newPoints);
            console.log(polygonData);
            poly.attr('points', newPoints);
        }

        function end() {

            ref.actionBox = ref.actionbox.clear().get();

            ref.actionText = ref.actionBox.append('p')
            .attr('class','text-uppercase text-sm actionbox-text')
            .text('Is drawing complete ?');
    
            ref.actionBody = ref.actionBox.append('div')
            .attr('class','row actionbox-body');
    
            ref.actionBtnYes = ref.actionBody.append('div')
            .attr('class','col-md-3')
            .append('button')
            .attr('class','btn btn-outline-primary btn-sm text-sm')
            .html('YES');
    
            ref.actionBtnReset = ref.actionBody.append('div')
            .attr('class', 'col-md-3')
            .append('button')
            .attr('class','btn btn-outline-danger btn-sm text-sm')
            .html('RESET');

            ref.actionbox.show();

            ref.actionBtnYes.on("click", (e) => {

                if(polygonData.length > 2 && Math.abs(d3.polygonArea(polygonData)) > 5000) {

                    d3.selectAll('.polygon-resize-handler').style('display','none');
                    d3.select('#canvas').style('background','white');
                    d3.select('#main-group').classed('d-none',true);

                    var svgString = getSVGString(d3.select('#canvas').node());
                    svgString2Image( svgString, ref.canvasSize.width, ref.canvasSize.height, 'jpeg', save ); // passes Blob and filesize String to the callback

                    function save( dataBlob, filesize ){
                        saveAs( dataBlob, 'house-map.jpeg' ); // FileSaver.js function
                    }

                    d3.select('#main-group').classed('d-none',false);
                    d3.select('#canvas').style('background','none');
                    

                } else {
                    // this.showToast("Warning!","Please select proper area.","Reset",this)
                    // this.actionBtnYes.property('disabled', true);
                }
            })

            ref.actionBtnReset.on("click", (e) => {
                d3.select('.drawing-group').selectAll('*').remove();
            })
        }

        // Below are the functions that handle actual exporting:
        // getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
        function getSVGString( svgNode ) {
            svgNode.setAttribute('xlink', 'http://www.w3.org/1999/xlink');
            var cssStyleText = getCSSStyles( svgNode );
            appendCSS( cssStyleText, svgNode );

            var serializer = new XMLSerializer();
            var svgString = serializer.serializeToString(svgNode);
            svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
            svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

            return svgString;

            function getCSSStyles( parentElement ) {
                var selectorTextArr = [];

                // Add Parent element Id and Classes to the list
                selectorTextArr.push( '#'+parentElement.id );
                for (var c = 0; c < parentElement.classList.length; c++)
                        if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
                            selectorTextArr.push( '.'+parentElement.classList[c] );

                // Add Children element Ids and Classes to the list
                var nodes = parentElement.getElementsByTagName("*");
                for (var i = 0; i < nodes.length; i++) {
                    var id = nodes[i].id;
                    if ( !contains('#'+id, selectorTextArr) )
                        selectorTextArr.push( '#'+id );

                    var classes = nodes[i].classList;
                    for (var c = 0; c < classes.length; c++)
                        if ( !contains('.'+classes[c], selectorTextArr) )
                            selectorTextArr.push( '.'+classes[c] );
                }

                // Extract CSS Rules
                var extractedCSSText = "";
                for (var i = 0; i < document.styleSheets.length; i++) {
                    var s = document.styleSheets[i];
                    
                    try {
                        if(!s.cssRules) continue;
                    } catch( e ) {
                            if(e.name !== 'SecurityError') throw e; // for Firefox
                            continue;
                        }

                    var cssRules = s.cssRules;
                    for (var r = 0; r < cssRules.length; r++) {
                        if ( contains( cssRules[r].selectorText, selectorTextArr ) )
                            extractedCSSText += cssRules[r].cssText;
                    }
                }
                

                return extractedCSSText;

                function contains(str,arr) {
                    return arr.indexOf( str ) === -1 ? false : true;
                }

            }

            function appendCSS( cssText, element ) {
                var styleElement = document.createElement("style");
                styleElement.setAttribute("type","text/css"); 
                styleElement.innerHTML = cssText;
                var refNode = element.hasChildNodes() ? element.children[0] : null;
                element.insertBefore( styleElement, refNode );
            }
        }


        function svgString2Image( svgString, width, height, format, callback ) {
            var format = format ? format : 'png';

            var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            var image = new Image();
            image.onload = function() {
                context.clearRect ( 0, 0, width, height );
                context.drawImage(image, 0, 0, width, height);

                canvas.toBlob( function(blob) {
                    var filesize = Math.round( blob.length/1024 ) + ' KB';
                    if ( callback ) callback( blob, filesize );
                });

                
            };

            image.src = imgsrc;
        }


    }
}