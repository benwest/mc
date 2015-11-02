DPR = window.devicePixelRatio || 1;
CANVAS_RATIO = 210/297;
MONTHS = [];

(function(){
	
	var month;
	var mo = moment([2012, 0, 1]);
	
	for(var i = 0; i < 12; ++i){
		
		month = mo.month(i);
				
		MONTHS[i] = {
			name: mo.format('MMMM'),
			days: mo.daysInMonth()
		}
		
	}
		
})();

drawShape = (function(){
	
	imageCropCanvas = document.createElement('canvas');
	imageCropCtx = imageCropCanvas.getContext('2d');
	imageCropCtx.fillStyle = 'green';
	
	imageCache = function(id){
		
		if(!imageCache.cache[id]){
		
			var imageObj = LookImages.findOne(id);
			var img = new Image();
			img.src = imageObj.url;
			
			imageCache.cache[id] = {
				ratio: imageObj.w / imageObj.h,
				element: img
			};
			
		}
		
		return imageCache.cache[id];
		
	}
	
	imageCache.cache = {};
	
	function plot(points, canvas, ctx, options){
		
		var limit = options.limit === undefined ? Infinity : options.limit;
			
		for(var i = 0; i < points.length; i += 2){
			
			if(i > limit) return;
				
			ctx.lineTo(
				points[i] * canvas.width,
				points[i+1] * canvas.height
			);
		
		}
		
	}
	
	return function(shape, canvas, ctx, options){
		
		if(options === undefined) options = {};
		
		ctx.beginPath();
		
		if(options.selected){
			
			ctx.beginPath();
			ctx.strokeStyle = '#000000';
			ctx.lineWidth = 1.5 * DPR;
			ctx.setLineDash( [] );
			plot( shape.points, canvas, ctx, options );
			ctx.closePath();
			ctx.stroke();
			
			ctx.beginPath();
			ctx.strokeStyle = '#FFFFFF';
			ctx.lineWidth = 2 * DPR;
			ctx.setLineDash( [10 * DPR, 10 * DPR] );
			plot( shape.points, canvas, ctx, options );
			ctx.closePath();
			ctx.stroke();
			
		} else if(shape.color){
			
			plot(shape.points, canvas, ctx, options);
			ctx.fillStyle = shape.color;
			ctx.fill();
			
		} else if (shape.image){
						
			imageCropCanvas.width = shape.bounds.width * canvas.width;
			imageCropCanvas.height = shape.bounds.height * canvas.height;
			imageCropCtx.globalCompositeOperation = 'source-over';
			plot(
				_.map(shape.points, function(point, i){
					return point - (i % 2 ? shape.bounds.top : shape.bounds.left);
				}),
				canvas,
				imageCropCtx,
				options
			);
			imageCropCtx.fill();
			imageCropCtx.globalCompositeOperation = 'source-atop';
			var image = imageCache(shape.image);
			if(image.ratio > CANVAS_RATIO){
				var imageW = canvas.width;
				var imageH = canvas.width / image.ratio;
			} else {
				var imageW = canvas.height * image.ratio;
				var imageH = canvas.height;
			}
			imageCropCtx.drawImage(
				image.element,
				-shape.offset.x * canvas.width,
				-shape.offset.y * canvas.height,
				imageW * shape.scale,
				imageH * shape.scale
			);
			ctx.drawImage(
				imageCropCanvas,
				shape.bounds.left * canvas.width,
				shape.bounds.top * canvas.height
			);
			
		}
		
	}
	
})();

