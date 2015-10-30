Template.universePreview.onRendered(function(){
	
	this.id = _.uniqueId();
	this.outer = this.$('.universe-preview-outer');
	this.inner = this.$('.universe-preview-inner');
	this.canvas = this.$('canvas')[0];
	this.ctx = this.canvas.getContext('2d');
	
	this.totalPoints = _.reduce(this.data.shapes, function(memo, shape){ return memo + shape.points.length / 2; }, 0);
	
	this.steps = 0;
	this.finished = false;
	
	var template = this;
	
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
		if(step !== false) template.steps++;
				
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