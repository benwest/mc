function svgShape(shape, scaleX, scaleY){
	
	var ret = '';
	var id;
	
	if(shape.image){
		id = _.uniqueId();
		ret += '<defs><clipPath id="' + id + '">';
	}
	
	ret += '<path fill="' + (shape.color || '#000000') + '" d="';
	
	ret += 'M' + shape.points[0] * scaleX + ' ' + shape.points[1] * scaleY + ' ';
	
	for(var i = 2; i < shape.points.length; i += 2){
		
		ret += 'L' + shape.points[i] * scaleX + ' ' + shape.points[i+1] * scaleY + ' ';
		
	}
	
	ret += '" />';
	
	if(shape.image){
		
		ret += "</clipPath></defs>";
		
		var image = LookImages.findOne(shape.image);
		var imageRatio = image.w / image.h;
		
		var w, h;
		
		if(imageRatio > CANVAS_RATIO){
			w = CANVAS_RATIO;
			h = CANVAS_RATIO / imageRatio;
		} else {
			w = imageRatio / CANVAS_RATIO;
			h = 1;
		}
				
		w = w * shape.scale * scaleX;
		h = h * shape.scale * scaleY;
					
		var x = (shape.bounds.left - shape.offset.x) * scaleX;
		var y = (shape.bounds.top - shape.offset.y) * scaleY;
			
		ret += '<image xlink:href="' + image.url + '" x="' + x + 'px" y="' + y + 'px" width="' + w + 'px" height="' + h + 'px" clip-path="url(#' + id + ')"/>';
		
	}
	
	return ret;
	
}

function svgUniverse(universe, width){
	
	var width = width || 500;
	
	var height = width / CANVAS_RATIO
	
	var ret = '<svg class="svg-universe" width="' + width + 'px" height="' + height + 'px" viewBox="0 0 ' + width + ' ' + height+ '" >';
	
	ret += '<rect fill="#FFFFFF" width="' + width + '" height="' + height + '" />';
	
	for(var i = universe.shapes.length - 1; i >= 0; --i){
		ret += svgShape(universe.shapes[i], width, height);
	}
	
	ret += '</svg>';
	
	return ret;
	
}

Template.registerHelper('svgUniverse', svgUniverse)