(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var TAU = Math.PI * 2;
var MIN_SIZE = .5 / DPR;

var bigCircles = [], smallCircles = [], frame;

function color(colors){
			
	var colors = _.map(colors, function(color){
		return Colors.findOne(color).color;
	})

	if(colors.length === 0) colors = ['rgba(0,0,0,0)']
	
	_.each(smallCircles, function(circ){
		circ.color = _.sample(colors);
	})
			
}

Template.blobs.onRendered(function(){
	
	var template = this;
	
	this.data.uid = _.uniqueId();
	this.data.smallSize = this.data.smallSize || 1;
	this.data.minSize = this.data.minSize || 0.5;
	this.data.big = this.data.big === undefined ? Infinity : this.data.big;
	
	var $canvas = this.$('.blobs');
	var canvas = $canvas[0];
	var ctx = canvas.getContext('2d');
	var halfWidth, halfHeight, halfDiagonal;
	
	function resize(){
		canvas.width = window.innerWidth * DPR;
		canvas.height = window.innerHeight * DPR;
		$canvas.css({
			width: window.innerWidth,
			height: window.innerHeight
		})
		halfWidth = window.innerWidth / 2;
		halfHeight = window.innerHeight / 2;
		halfDiagonal = Math.sqrt(halfWidth * halfWidth + halfHeight * halfHeight);
	}
	
	var i = 0;
	
	function tick(){
		
		function draw(circle){
			circle.x += circle.vx;
			circle.y += circle.vy;
			
			var normX = circle.x - halfWidth;
			var normY = circle.y - halfHeight;
			var distance = Math.sqrt(normX * normX + normY * normY);
			var normalisedDistance = normalize(distance, 0, halfDiagonal);
			var easedDistance = normalisedDistance*normalisedDistance*normalisedDistance;
			var radius = clamp(scale( easedDistance, 0, 1, circle.r * 0.1, circle.r), MIN_SIZE, circle.r);
						
			if(circle.x < -circle.r) circle.x += window.innerWidth + circle.r * 2;
			if(circle.x > window.innerWidth + circle.r) circle.x -= window.innerWidth + circle.r * 2;
			if(circle.y < -circle.r) circle.y += window.innerHeight + circle.r * 2;
			if(circle.y > window.innerHeight + circle.r) circle.y -= window.innerHeight + circle.r * 2;
			
			if(circle.type === 'color'){
				ctx.fillStyle = circle.color;
				ctx.beginPath();
				ctx.arc(circle.x * DPR, circle.y * DPR, radius * DPR, 0, TAU);
				ctx.fill();				
			} else {
				ctx.drawImage(circle.canvas, (circle.x - radius) * DPR, (circle.y - radius) * DPR, radius * 2 * DPR, radius * 2 * DPR);
			}
		}
		
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		_.each(smallCircles, draw);
		_.each(bigCircles, draw);
						
		template.data.frame = requestAnimationFrame(tick);
		
	}
	
	function make(){
		
		bigCircles = [];
		smallCircles = [];
				
		var colors = _.map(template.data.colors, function(color){
			return Colors.findOne(color).color;
		});
		
		var looks = _.map(template.data.looks, function(id){
			return Looks.findOne(id).thumb;
		});
		
		if(looks[0] === undefined) looks = [];
		
		var size = Math.max(window.innerWidth, window.innerHeight);
		var smallOnes = Math.round(size / 3);
		
		function velocity(min, max){
			var v = scale(Math.random(), 0, 1, min, max);
			return Math.random() > .5 ? v : -v;
		}
		
		for (var i = 0; i < smallOnes; ++i) {
			smallCircles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				r: Math.max( size / 800, 2) * template.data.smallSize * (Math.random() * window.innerWidth/1600 + 1),
				vx: velocity(0, 0.25),
				vy: velocity(0, 0.25),
				type: 'color',
				color: '#000000'
			})
		}
		
		if(template.data.big !== false){
			
			var bigColors = [];
			
			for(var i = 0; i < colors.length; ++i){
				bigColors.push({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					r: Math.max(window.innerWidth, window.innerHeight) / 8,
					vx: velocity(0, .75),
					vy: velocity(0, .75),
					type: 'color',
					color: colors[i]
				})
			}
			
			var bigLooks = [];
						
			for(i = 0; i < looks.length; ++i){
				bigLooks.push({
					x: Math.random() * window.innerWidth,
					y: Math.random() * window.innerHeight,
					r: Math.max(window.innerWidth, window.innerHeight) / 8,
					vx: velocity(0, .75),
					vy: velocity(0, .75),
					type: 'image',
					image: looks[i]
				});
			}
			
			bigLooks = _.map(bigLooks, function(circle){
				
				var canvas = document.createElement('canvas');
				var ctx = canvas.getContext('2d');
				canvas.width = circle.r * 2 * DPR;
				canvas.height = circle.r * 2 * DPR;
				var image = new Image();
				image.onload = function(){
					ctx.beginPath();
					ctx.arc(circle.r * DPR, circle.r * DPR, circle.r * DPR, 0, TAU);
					ctx.fill();
					ctx.globalCompositeOperation = 'source-in';
					var w, h;
					var ratio = image.height / image.width;
					if(image.width > image.height){
						h = circle.r * 2 * DPR;
						w = h / ratio;
					} else {
						w = circle.r * 2 * DPR;
						h = w * ratio;
					}
					ctx.drawImage(image, 0, 0, w, h);
				}
				image.src = circle.image;
				circle.canvas = canvas;
				return circle;
				
			});
			
			bigCircles = bigColors.concat(bigLooks);
			
		}
		
	}
	
	var lazyMake = _.debounce(function(){
		make();
		color(template.data.colors);
	}, 300);
	
	$(window).on('resize.blobs' + this.data.uid, function(){
		resize();
		lazyMake();
	});
	
	resize();
	make();
	color(template.data.colors);
	tick();
	
})

Template.blobs.helpers({
	colors: function(){
		color(this.colors);
	}
})

Template.blobs.onDestroyed(function(){
		
	$(window).off('resize.blobs' + this.data.uid);
	
	cancelAnimationFrame(this.data.frame);
	
})

