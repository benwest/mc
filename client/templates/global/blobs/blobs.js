var DPR = window.devicePixelRatio || 1;
var TAU = Math.PI * 2;
var requestAnimationFrame = window.requestAnimationFrame || function(f){};
var cancelAnimationFrame = window.cancelAnimationFrame || function(i){return clearInterval(i)};

var running = false;

Template.blobs.onRendered(function(){
	
	var template = this;
	
	this.data.smallSize = this.data.smallSize || 1;
	this.data.minSize = this.data.minSize || 0.5;
	this.data.colors = _.map(this.data.colors, function(color){
		return Colors.findOne(color).color;
	})
	
	var canvas = $('.blobs')[0];
	var ctx = canvas.getContext('2d');
	var halfWidth, halfHeight, halfDiagonal;
	
	function resize(){
		canvas.width = window.innerWidth * DPR;
		canvas.height = window.innerHeight * DPR;
		halfWidth = window.innerWidth / 2;
		halfHeight = window.innerHeight / 2;
		halfDiagonal = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
	}
	
	var circles;
	var i = 0;
	
	function tick(){
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		_.each(circles, function(circle){
			
			circle.x += circle.vx;
			circle.y += circle.vy;
			
			var normX = circle.x - halfWidth;
			var normY = circle.y - halfHeight;
			var distance = Math.sqrt(normX * normX + normY * normY);
			var normalisedDistance = normalize(distance, 0, halfDiagonal);
			var easedDistance = normalisedDistance*normalisedDistance*normalisedDistance;
			var radius = clamp(scale( easedDistance, 0, 1, circle.r * 0.1, circle.r), template.data.minSize, circle.r);
						
			if(circle.x < -circle.r) circle.x += window.innerWidth + circle.r * 2;
			if(circle.x > window.innerWidth + circle.r) circle.x -= window.innerWidth + circle.r * 2;
			if(circle.y < -circle.r) circle.y += window.innerHeight + circle.r * 2;
			if(circle.y > window.innerHeight + circle.r) circle.y -= window.innerHeight + circle.r * 2;
			
			ctx.fillStyle = circle.color;
			ctx.beginPath();
			ctx.arc(circle.x * DPR, circle.y * DPR, radius * DPR, 0, TAU);
			ctx.fill();
						
		})
				
		requestAnimationFrame(tick);
		
	}
	
	function make(){
		
		circles = [];
		
		var size = Math.max(window.innerWidth, window.innerHeight);
		
		var smallOnes = Math.round(size / 3);
		
		for(var i = 0; i < smallOnes; ++i){
			
			circles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				r: Math.max( size / 800, 2)  * template.data.smallSize,
				vx: Math.random() - .5,
				vy: Math.random() - .5,
				color: _.sample(template.data.colors)
			})
			
		}
		
		for(var i = 0; i < template.data.big; ++i){
			circles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				r: Math.max(window.innerWidth, window.innerHeight) / 8,
				vx: Math.random() * 4 - 2,
				vy: Math.random() * 4 - 2,
				color: template.data.colors[i]
			})
		}
		
	}
	
	$(window).on('resize.blobs', resize);
	
	resize();
	make();
	tick();
	
})

Template.blobs.onDestroyed(function(){
	
	$(window).off('resize.blobs');
	
	//cancelAnimationFrame(this.data.frame);
	
})

