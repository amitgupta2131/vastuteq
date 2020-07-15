export default class Tool {

    static Rectangle(canvas) {
        var self = this, rect, rectData = [], isDown = false, m1, m2, isDrag = false, isDisable = false;
            
        canvas.on('mousedown', function() {
            m1 = d3.mouse(this);
            if (!isDown && !isDrag && isDisable == false) {
                self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
                self.rectangleElement = canvas.append('rect').attr('class', 'rectangle').call(dragR);
                self.pointElement1 = canvas.append('circle').attr('class', 'pointC').call(dragC1);
                self.pointElement2 = canvas.append('circle').attr('class', 'pointC').call(dragC2);            
                self.pointElement3 = canvas.append('circle').attr('class', 'pointC').call(dragC3);
                self.pointElement4 = canvas.append('circle').attr('class', 'pointC').call(dragC4);
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
                self.rectData[1] = { x: m2[0], y: m2[1] };
                updateRect();
            } 
        });  

        // canvas.on('mouseup', function() {
        //     isDown = false;
        //     isDrag = false;
        //     disableMouseEvent();
        // })
        
        function updateRect() {  
            rect = self.rectangleElement;
            rect.style('fill-opacity',0)
                .style('stroke','black')
                .style('stroke-width', 2)
                .attr('x', self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x)
                .attr('y', self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y)
                .attr('width', Math.abs(self.rectData[1].x - self.rectData[0].x))
                .attr('height', Math.abs(self.rectData[1].y - self.rectData[0].y)); 
            
            var point1 = self.pointElement1.data(self.rectData);
            point1.attr('r', 5)
                .attr('cx', self.rectData[0].x)
                .attr('cy', self.rectData[0].y);        
            var point2 = self.pointElement2.data(self.rectData);
            point2.attr('r', 5)
                .attr('cx', self.rectData[1].x)
                .attr('cy', self.rectData[1].y);
            var point3 = self.pointElement3.data(self.rectData);
            point3.attr('r', 5)
                .attr('cx', self.rectData[1].x)
                .attr('cy', self.rectData[0].y);        
            var point4 = self.pointElement4.data(self.rectData);
            point4.attr('r', 5)
                .attr('cx', self.rectData[0].x)
                .attr('cy', self.rectData[1].y);
        }
        
        var dragR = d3.drag().on('drag', dragRect);
        
        function dragRect() {
            var e = d3.event;
            for(var i = 0; i < self.rectData.length; i++){
                self.rectangleElement
                    .attr('x', self.rectData[i].x += e.dx )
                    .attr('y', self.rectData[i].y += e.dy );
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
            self.pointElement1
                .attr('cx', function(d) { return d.x += e.dx })
                .attr('cy', function(d) { return d.y += e.dy });        
            updateRect();   
        }   
        
        function dragPoint2() {
            var e = d3.event;
            self.pointElement2
                .attr('cx', self.rectData[1].x += e.dx )
                .attr('cy', self.rectData[1].y += e.dy );
            updateRect();   
        }   
        
        function dragPoint3() {
            var e = d3.event;
            self.pointElement3
                .attr('cx', self.rectData[1].x += e.dx )
                .attr('cy', self.rectData[0].y += e.dy );     
            updateRect();   
        }   
        
        function dragPoint4() {
            var e = d3.event;
            self.pointElement4
                .attr('cx', self.rectData[0].x += e.dx )
                .attr('cy', self.rectData[1].y += e.dy );
            updateRect();   
        }
        
        function disableMouseEvent() {
            isDisable = true;
            canvas.on('mousedown', null);
            canvas.on('mousemove', null);
            canvas.on('mouseup', null);
        }
    }


    static Line(canvas) {

        var layer = canvas.append('g')
            .classed('shape', true)
            .attr('data-shape','line')
            .on('click', function() {
                d3.selectAll('.shape[data-shape]').selectAll('.pointC').style('display','none');
                d3.select(this).selectAll('.pointC').style('display','block');
            });

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
            line.style('stroke','black')
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
}