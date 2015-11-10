function svgShape(shape, scaleX, scaleY){
	
	var ret = '<path fill="' + (shape.color || '#000000') + '" d="';
	
	ret += 'M' + shape.points[0] * 500 + ' ' + shape.points[1] * 500 + ' ';
	
	for(var i = 2; i < shape.points.length; i += 2){
		
		ret += 'L' + shape.points[i] * scaleX + ' ' + shape.points[i+1] * scaleY + ' ';
		
	}
	
	ret += '" />';
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