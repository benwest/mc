Template.universePreview.onRendered(function(){
	
	var template = this;
	
	template.id = _.uniqueId();
	template.outer = template.$('.universe-preview-outer');
	template.inner = template.$('.universe-preview-inner');
	template.canvas = template.$('canvas')[0];
	template.ctx = template.canvas.getContext('2d');
	
	template.autorun(function(){
		
		var data = Template.currentData();
		
		template.totalPoints = _.reduce(data.shapes, function(memo, shape){ return memo + shape.points.length / 2; }, 0);
		template.steps = 0;
		template.finished = false;
		template.data = data;
		
	});
	
	function size(){
				
		var w = template.outer.width();
		var h = template.outer.height();
				
		var containerWidth, containerHeight;
		
		if(w/h > CANVAS_RATIO){
			
			containerHeight = h;
			containerWidth = h * CANVAS_RATIO;
			
		} else {
			
			containerWidth = w;
			containerHeight = w / CANVAS_RATIO;
			
		}
		
		template.inner.width(containerWidth).height(containerHeight);
		
		template.canvas.width = containerWidth * DPR;
		template.canvas.height = containerHeight * DPR;
		
		draw(false);
		
	}
	
	$(window).on('resize.' + this.id, size);
	size();
	
	function draw(step){
		
		if(step === false && !template.finished) return;
		if(step !== false) template.steps += 4;
				
		var drawnPoints = 0;
				
		template.ctx.clearRect(0, 0, template.canvas.width, template.canvas.height);
		
		var shape, numPoints, limit;
		
		for(var i = template.data.shapes.length - 1; i >= 0; --i){
			
			shape = template.data.shapes[i];
			
			numPoints = shape.points.length;
			
			if(drawnPoints + numPoints > template.steps){
				limit = template.steps - drawnPoints;
			} else {
				limit = numPoints;
			}
			
			drawShape(shape, template.canvas, template.ctx, {limit: limit});
			
			drawnPoints += limit;
			
			if(drawnPoints / 2 >= template.totalPoints) template.finished = true;
			if(drawnPoints >= template.steps) break;
			
			
		}
		
		if(!template.finished) template.animationFrame = requestAnimationFrame(draw);
		
	}
	
	this.animationFrame = requestAnimationFrame(draw);
	
});

Template.universePreview.onDestroyed(function(){
	
	$(window).off( '.' + this.id );
	if(!this.finished) cancelAnimationFrame(this.animationFrame);
	
});