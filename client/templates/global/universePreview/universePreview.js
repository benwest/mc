var id, outer, inner, canvas, ctx, shapes, totalPoints, animationFrame;

var steps = 0;
var finished = false;

function draw(step){
			
	if(step === false && !finished) return;
	if(step !== false) steps += 1;
	
	var shape, i, j;
	
	ctx.clearRect(0,0,canvas.width,canvas.height);
	
	var drawnPoints = 0;
	
	for( i = shapes.length - 1; i >= 0; --i ){
		
		shape = shapes[i];
		
		ctx.fillStyle = shape.color;
		
		ctx.moveTo( shape.points[0], shape.points[1] );
		drawnPoints++;
		
		ctx.beginPath();
		
		for( j = 2; j < shape.points.length; j += 2 ){
			
			if(drawnPoints >= steps) break;
			
			ctx.lineTo(
				shape.points[j] * canvas.width,
				shape.points[j+1] * canvas.height
			);
			
			drawnPoints++;
			
		}
		
		ctx.closePath();
		
		ctx.fill('evenodd');
		if(drawnPoints >= steps) break;
		
	}
	
	if(!finished) animationFrame = requestAnimationFrame(draw);
	
}

function size(){
			
	var w = outer.width();
	var h = outer.height();
	
	var containerWidth, containerHeight;
	
	if(w/h > CANVAS_RATIO){
		
		containerHeight = h;
		containerWidth = h * CANVAS_RATIO;
		
	} else {
		
		containerWidth = w;
		containerHeight = w / CANVAS_RATIO;
		
	}
	
	inner.width(containerWidth).height(containerHeight);
	
	canvas.width = containerWidth * DPR;
	canvas.height = containerHeight * DPR;
	
	draw(false);
	
}

Template.universePreview.onRendered(function(){
	
	id = _.uniqueId();
	outer = this.$('.universe-preview-outer');
	inner = this.$('.universe-preview-inner');
	canvas = this.$('canvas')[0];
	ctx = canvas.getContext('2d');
	shapes = this.data.shapes;
	totalPoints = _.reduce(shapes, function(memo, shape){ return memo + shape.points.length / 2; }, 0);
	
	steps = 0;
	finished = false;
	
	$(window).on('resize.' + id, size);
	size();
	requestAnimationFrame(draw);
	
});

Template.universePreview.onDestroyed(function(){
	
	$(window).off( '.' + id );
	if(!finished) cancelAnimationFrame(animationFrame);
	
});