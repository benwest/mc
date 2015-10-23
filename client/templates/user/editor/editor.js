var CANVAS_WIDTH = 'editorCanvasWidth';
var CANVAS_HEIGHT = 'editorCanvasHeight';
var MODE = 'editorMode';
var LAYOUT = 'editorLayout';
var DRAWING = 'editorDrawing';
var CURRENT_COLOR = 'editorCurrentColor';
var SHOW_PEN = 'editorShowPen';
var SELECTED_SHAPE = 'editorSelectedShape';
var DRAGGING_SHAPE = 'editorDraggingShape';
var UNDO = 'editorUndo';
var ORIENTATION = 'editorOrientation';
var modes = {};

_.each([
	'PICKING_TOOL',
	'PICKING_COLOR',
	'DRAWING_COLOR'
], function(mode, i){ modes[mode] = i });

var dpr = window.devicePixelRatio || 1;

var pen;
var canvasContainer, canvas, ctx;

function draw(shapes){
	
	function drawShape(shape){
		
		ctx.moveTo( shape.points[0], shape.points[1] );
		
		ctx.beginPath();
		
		for( var i = 2; i < shape.points.length; i += 2 ){
			
			ctx.lineTo(
				shape.points[i] * canvas.width,
				shape.points[i+1] * canvas.height
			);
			
		}
		
		ctx.closePath();
		
	}
		
	ctx.clearRect( 0, 0, canvas.width, canvas.height );
	
	var shape, i, j;
	
	for( i = shapes.length - 1; i >= 0; --i ){
		
		shape = shapes[i];
		
		ctx.fillStyle = shape.color;
		
		drawShape(shape);
		
		ctx.fill('evenodd');
		
	}
	
	var selectedShape = Session.get(SELECTED_SHAPE);
	
	if(selectedShape !== false){
			
		ctx.strokeStyle = '#000000';
		ctx.lineWidth = 2 * dpr;
		ctx.setLineDash( [] );
		drawShape( shapes[selectedShape] );
		ctx.stroke();
		
		ctx.strokeStyle = '#FFFFFF';
		ctx.setLineDash( [10 * dpr, 10 * dpr] );
		drawShape( shapes[selectedShape] );
		ctx.stroke();
		
	}
	
}

function findShape(shapes, x, y, lazy){
		
	var xmin, ymin, xmax, ymax;
	
	var idx = -1;
	
	var found = _.some(shapes, function(shape){
		
		idx++;
		
		//Bounding box test
		
		xmin = Infinity;
		ymin = Infinity;
		xmax = -Infinity;
		ymax = -Infinity;
		
		for(var i = 0; i < shape.points.length; i += 2){
			
			xmin = Math.min(xmin, shape.points[i]);
			xmax = Math.max(xmax, shape.points[i]);
			ymin = Math.min(ymin, shape.points[i+1]);
			ymax = Math.max(ymax, shape.points[i+1]);
			
		}
		
		if( x > xmin && x < xmax && y > ymin && y < ymax ){
			
			if(lazy) return true;
								
			//Hit test (W. Randolph Franklin)
			
			var j = shape.points.length - 2;
			var inside = false;
			
			for( i = 0; i <= shape.points.length; i += 2 ){
				
				if(
					( shape.points[i + 1] > y !== shape.points[j + 1] > y ) &&
					x < ( shape.points[j] - shape.points[i] ) * ( y - shape.points[i + 1] ) / ( shape.points[j + 1] - shape.points[i + 1]) + shape.points[i]
				) {
					inside = !inside;
				}
			
				j = i;
				
			}
			
			return inside;
			
		} else {
			
			return false;
			
		};
		
	});
	
	return found ? idx : false;
	
}


// Layout helpers

var CANVAS_RATIO = 210/297;
var TOP_BAR_HEIGHT = 50;
var GUTTERS = 20;
var HELP_TEXT_HEIGHT = 50;
var MAX_SIDE_COLUMN_SIZE = 200;

function makeCSSTransform(x, y){
	return 'transform: translate3d(' + x + 'px, ' + y + 'px, 0);';
}

function makeCSS(x, y, w, h){
	
	var ret = '';
	
	ret += 'width: ' + w + 'px; ';
	ret += 'height: ' + h + 'px; ';
	ret += makeCSSTransform(x, y);
	
	return ret;
	
}

var hiddenStyle = ' opacity: 0; pointer-events: none; z-index: 0';

function makeSizes(){
		
	if( window.innerWidth > window.innerHeight ){
		
		Session.set(ORIENTATION, 'landscape');
		
		var primaryHeight = window.innerHeight - HELP_TEXT_HEIGHT - TOP_BAR_HEIGHT;
		var primaryWidth = primaryHeight * CANVAS_RATIO;
		var primaryLeft = (window.innerWidth / 2) - (primaryWidth / 2);
		var primaryTop = TOP_BAR_HEIGHT;
	
		var secondaryWidth = Math.min( ((window.innerWidth - primaryWidth) / 2) - GUTTERS * 2, MAX_SIDE_COLUMN_SIZE );
		var secondaryHeight = primaryHeight;
		var secondaryLeft = (primaryLeft / 2) - (secondaryWidth / 2);
		var secondaryTop = TOP_BAR_HEIGHT;
			
		var leftLeft = secondaryLeft;
		var leftTop = secondaryTop;
		var leftWidth = secondaryWidth;
		var leftHeight = secondaryHeight;
		
		var rightTop = leftTop;
		var rightLeft = window.innerWidth - secondaryLeft - secondaryWidth;
		var rightWidth = leftWidth;
		var rightHeight = leftHeight;
		
	} else {
		
		Session.set(ORIENTATION, 'portrait');
		
		var secondaryTop = (window.innerHeight * 0.7) + GUTTERS;
		var secondaryHeight = window.innerHeight - secondaryTop - HELP_TEXT_HEIGHT;
		var secondaryWidth = window.innerWidth - GUTTERS * 2;
		var secondaryLeft = GUTTERS;
		
		var primaryTop = TOP_BAR_HEIGHT;
		var primaryHeight = secondaryTop - GUTTERS - TOP_BAR_HEIGHT;
		var primaryWidth = primaryHeight * CANVAS_RATIO;
		var primaryLeft = (window.innerWidth - primaryWidth) / 2;
		
		var leftLeft = secondaryLeft;
		var leftTop = secondaryTop;
		var leftHeight = secondaryHeight;
		var leftWidth = secondaryWidth/2 - GUTTERS/2;
		
		var rightLeft = leftLeft + leftWidth + GUTTERS;
		var rightTop = leftTop;
		var rightHeight = leftHeight;
		var rightWidth = leftWidth;
		
	}
	
	return {
		primary: {
			x: primaryLeft,
			y: primaryTop,
			w: primaryWidth,
			h: primaryHeight
		},
		secondary: {
			x: secondaryLeft, 
			y: secondaryTop, 
			w: secondaryWidth,
			h: secondaryHeight
		},
		left: {
			x: leftLeft,
			y: leftTop,
			w: leftWidth,
			h: leftHeight
		},
		right: {
			x: rightLeft,
			y: rightTop,
			w: rightWidth,
			h: rightHeight
		}
	}
	
}

function getCSS(region, hidden){
	
	var box = Session.get(LAYOUT)[region];
	
	var css = makeCSS(box.x, box.y, box.w, box.h);
	
	if(hidden) css += hiddenStyle;
	
	return css;
	
}

function scaleShape(shape, scale){

	var x, y, d, a;
	
	for(var i = 0; i < shape.points.length; i += 2){
		
		x = shape.points[i];
		y = shape.points[i+1];
		
		x -= shape.center.x;
		y -= shape.center.y;
		
		d = Math.sqrt( x*x + y*y );
		
		a = Math.atan2(y, x);
		
		shape.points[i] = (Math.cos(a) * d * scale) + shape.center.x;
		shape.points[i+1] = (Math.sin(a) * d * scale) + shape.center.y;
		
	}
	
}

var colorWheelData;

(function(){
	var img = new Image();
	img.onload = function(){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = 500,
		canvas.height = 500;
		ctx.drawImage(img, 0, 0);
		colorWheelData = ctx.getImageData(0,0,canvas.width, canvas.height).data;
	}
	img.src = '/img/colorWheel.jpg';
})();

function pushUndo(shapes){
	var undos = Session.get(UNDO);
	undos.push(deepClone(shapes));
	Session.set(UNDO, undos);
}

Template.editor.onCreated(function(){
	
	Session.set(MODE, modes.PICKING_TOOL);
	Session.set(SHOW_PEN, false);
	Session.set(DRAWING, false);
	Session.set(CURRENT_COLOR, '#000000');
	Session.set(LAYOUT, makeSizes());
	Session.set(SELECTED_SHAPE, false);
	Session.set(DRAGGING_SHAPE, false);
	Session.set(UNDO, [[]]);
	
});

Template.editor.onRendered(function(){
	
	pen = this.$('.editor-pen');
	canvasContainer = this.$('.editor-canvas');
	var width = canvasContainer.width();
	var height = width * 1.41;
	canvas = this.$('canvas')[0];
	canvas.width = width * dpr;
	canvas.height = height * dpr;
	ctx = canvas.getContext('2d');
	draw(this.data.universe.shapes);
	
	var self = this;
	var canvasSizer = $('#sizer');
	
	$(window).on('resize.editorCanvas', function(){
		Session.set(LAYOUT, makeSizes());
		canvas.height = (window.innerHeight - HELP_TEXT_HEIGHT) * dpr;
		canvas.width = canvas.height * CANVAS_RATIO;
		draw(self.data.universe.shapes);
	});
	
});

Template.editor.onDestroyed(function(){
	$(window).off('resize.editorCanvas');
})

Template.editor.helpers({
	
	'helpText': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.PICKING_TOOL:
			
				if(this.universe.shapes.length){
					
					debugger;
					
					var settings = globalSettings();
					
					var moreColors = Math.max( settings.minColors - this.universe.colors.length, 0 );
					var moreLooks = Math.max( settings.minLooks - this.universe.looks.length, 0 );
					
					if(moreColors || moreLooks){
						
						var ret = 'Looking good! You just need to add ';
						
						if(moreColors) ret += numberAsWords(moreColors) + ' more ' + plural(moreColors, 'colour');
						if(moreColors && moreLooks) ret += ' and ';
						if(moreLooks) ret += numberAsWords(moreLooks) + ' more ' + plural(moreLooks, 'look');
						
						ret += '.'
						
						return ret;
						
					} else {
						
						
						
					}
					
				} else {
					return 'Add a colour or a style to get started.';
				}
							
			case modes.PICKING_COLOR:
				return 'Pick your favourite colour,';
				
			case modes.DRAWING_COLOR:
				return 'Draw with ' + (Modernizr.touch ? 'your finger.' : 'the mouse.');
			
		}
		
	},
	
	'canUndo': function(){
		return Session.get(UNDO).length > 1;
	},
	
	'canvasStyle': function(){
				
		switch( Session.get(MODE) ){
			
			case modes.PICKING_TOOL:
				return getCSS('primary');
				
			case modes.PICKING_COLOR:
				return getCSS('secondary');
				
			case modes.DRAWING_COLOR:
				return getCSS('primary');
				
			default:
				return getCSS('secondary', true);
			
		}
	
	},
	
	'colorButtonStyle': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.PICKING_TOOL:
				return getCSS('left');
				
			case modes.PICKING_COLOR:
				return getCSS('primary', true);
				
			case modes.DRAWING_COLOR:
				return getCSS('secondary', true);
				
			default:
				return getCSS('left', true);
			
		}
		
	},
	
	'lookButtonStyle': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.PICKING_TOOL:
				return getCSS('right')
				
			case modes.PICKING_STYLE:
				return getCSS('primary', true);
				
			default:
				return getCSS('right', true);
			
		}
		
	},
	
	'doneButtonStyle': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.DRAWING_COLOR:
				return getCSS('right');
				
			default:
				return getCSS('right', true);
			
		}
		
	},
	
	'colorWheelStyle': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.PICKING_COLOR:
				return getCSS('primary');
				
			case modes.DRAWING_COLOR:
				return getCSS('secondary');
				
			case modes.PICKING_TOOL:
				return getCSS('left', true);
				
			default:
				return getCSS('secondary', true);
			
		}
	
	},
	
	'shapeControlsClass': function(){
		
		
		
	},
	
	'shapeControlsStyle': function(){
		
		var selectedShape = Session.get(DRAGGING_SHAPE);
		
		if( selectedShape === false ) {
			selectedShape = Session.get(SELECTED_SHAPE);
		} else {
			selectedShape = selectedShape.shape;
		}
		
		if( selectedShape === false ) return hiddenStyle;
		
		var shape = this.universe.shapes[ selectedShape ];
		
		var cx = shape.center.x;
		var cy = shape.center.y;
				
		var offset = Session.get(LAYOUT).primary;
		
		cx *= offset.w;
		cy *= offset.h;
		
		cx += offset.x;
		cy += offset.y;
		
		cx = Math.min( offset.x + offset.w, Math.max( cx, offset.x ) );
		cy = Math.min( offset.y + offset.h, Math.max( cy, offset.y ) );
		
		return makeCSSTransform(cx, cy);
		
	}
		
});

function showPen(){
	
	if(Modernizr.touch) return;
	
	Session.set(SHOW_PEN, true);
	
	$(window).on('mousemove.pen', function(e){
		pen.css({
			top: e.clientY,
			left: e.clientX
		})
	})
	
}

function hidePen(){
	
	if(Modernizr.touch) return;
	
	Session.set(SHOW_PEN, false);
	
	$(window).off('mousemove.pen');
	
}

Template.editor.events({
	
	'click .colors-button': function(){
		
		Session.set( MODE, modes.PICKING_COLOR );
		
	},
	
	'click .done-button': function(){
		
		hidePen();
		
		switch( Session.get( MODE ) ){
			
			case modes.DRAWING_COLOR:
				Session.set(MODE, modes.PICKING_TOOL);
			
		}
		
	},
	
	'mouseenter .color-wheel': function(){
		
		if( Session.get(MODE) === modes.PICKING_COLOR ) showPen();
		
	},
	
	'mouseleave .color-wheel': function(){
		
		hidePen();
		
	},
	
	'mousemove .color-wheel': function(event){
		
		if( Session.get(MODE) !== modes.PICKING_COLOR ) return;
				
		var size = $(event.target).width();
		var x = Math.floor( (event.offsetX / size) * 500 );
		var y = Math.floor( (event.offsetY / size) * 500 );
		
		var rIndex = x * 4 + y * 500 * 4;
	
		var color = 'rgb(' + colorWheelData[rIndex] + ', ' + colorWheelData[rIndex + 1] + ', ' + colorWheelData[rIndex + 2] + ')';
		
		Session.set(CURRENT_COLOR, color);
		
		pen.css({
			top: event.clientY,
			left: event.clientX,
			background: color
		});
		
	},
	
	'click .color-wheel': function(){
		
		Session.set(DRAWING, false);
				
		switch( Session.get(MODE) ){
			
			case modes.PICKING_COLOR:
				Session.set(MODE, modes.DRAWING_COLOR);
				break;
				
			case modes.DRAWING_COLOR:
				Session.set(MODE, modes.PICKING_COLOR);
				break;
			
		}
		
	},
	
	'mouseenter canvas': function(){
		
		if( Session.get(MODE) === modes.DRAWING_COLOR ) showPen();
		
	},
	
	'mouseleave canvas': function(){
		
		hidePen();
		
	},
	
	'click canvas': function(){
		
		switch( Session.get(MODE) ){
			
			case modes.PICKING_COLOR:
				Session.set(MODE, modes.PICKING_TOOL);
				break;
			
		}
		
	},
	
	'mousedown canvas': function(event){
		
		if( event.button !== 0 ) return;
		
		var canvas = $(event.target);
		var x = event.offsetX / canvas.width();
		var y = event.offsetY / canvas.height();
		
		var mode = Session.get(MODE);
				
		if( mode === modes.DRAWING_COLOR ){
						
			Session.set(DRAWING, true);
			
			pushUndo(this.universe.shapes);
			
			this.universe.shapes.unshift({
				color: Session.get(CURRENT_COLOR),
				points: [x, y]
			})
			
			this.universe.colors = _.uniq( _.pluck( this.universe.shapes, 'color' ) );
			
		} else if (mode === modes.PICKING_TOOL ){
			
			var selectedShape;
			
			if(Modernizr.touch){
				
				selectedShape = findShape(this.universe.shapes, x, y);
				
				Session.set(SELECTED_SHAPE, selectedShape);
				
			} else {
				
				selectedShape = Session.get(SELECTED_SHAPE);
				
			}
			
			if( selectedShape !== false ) {
				
				pushUndo(this.universe.shapes);
				
				Session.set(DRAGGING_SHAPE, {
					shape: selectedShape,
					x: x,
					y: y
				});
				
			}
		}

	},
	
	'mouseup': function(){
		
		if(Session.get(DRAWING)){
			
			var shape = this.universe.shapes[0];
			
			var cx = 0;
			var cy = 0;
			
			for( var i = 0; i < shape.points.length; i += 2){
				
				cx += shape.points[i];
				cy += shape.points[i+1];
				
			}
			
			cx /= shape.points.length / 2;
			cy /= shape.points.length / 2;
			
			shape.center = {x: cx, y: cy};
				
			Session.set(DRAWING, false);
			
		}
		
		if(Session.get(DRAGGING_SHAPE)){
			Session.set(DRAGGING_SHAPE, false);
		}

		
	},
	
	'mousemove canvas': function(event){
		
		var canvas = $(event.target);
		var x = event.offsetX / canvas.width();
		var y = event.offsetY / canvas.height();
		
		if( Session.get(DRAWING) ){
			
			var points = this.universe.shapes[0].points;
			points.push( x, y );
			
		} else if( Session.get(MODE) === modes.PICKING_TOOL ){
			
			var draggingShape = Session.get(DRAGGING_SHAPE);
			
			if( draggingShape ){
				
				var shape = this.universe.shapes[ draggingShape.shape ];
				var deltaX = x - draggingShape.x;
				var deltaY = y - draggingShape.y;
								
				for(var i = 0; i < shape.points.length; i += 2){
					
					shape.points[i] += deltaX;
					shape.points[i+1] += deltaY;
					
				}
				
				shape.center.x += deltaX;
				shape.center.y += deltaY;
				
				Session.set(DRAGGING_SHAPE, {
					shape: draggingShape.shape,
					x: draggingShape.x + deltaX,
					y: draggingShape.y + deltaY
				});
				
			} else if(!Modernizr.touch) {
								
				Session.set( SELECTED_SHAPE, findShape(this.universe.shapes, x, y, Session.get(SELECTED_SHAPE) !== false) );
				
			}
			
		}

		draw( this.universe.shapes );
		
	},
	
	'click .controls-delete': function(){
		
		var selectedShape = Session.get(SELECTED_SHAPE);
		
		if(selectedShape !== false){
			
			pushUndo(this.universe.shapes);
			
			this.universe.shapes.splice(selectedShape, 1);
			
			Session.set(SELECTED_SHAPE, false);
			
			draw(this.universe.shapes);
			
		}
		
	},
	
	'click .controls-scaleup': function(){
		
		var selectedShape = Session.get(SELECTED_SHAPE);
		
		if(selectedShape !== false){
			
			pushUndo(this.universe.shapes);
			
			scaleShape( this.universe.shapes[ selectedShape ], 1.2);
			
			draw(this.universe.shapes);
			
		}
			
	},
	
	'click .controls-scaledown': function(){
		
		var selectedShape = Session.get(SELECTED_SHAPE);
		
		if(selectedShape !== false){
			
			pushUndo(this.universe.shapes);			
			
			scaleShape( this.universe.shapes[ selectedShape ], 0.8);
			
			draw(this.universe.shapes);
			
		}
			
	},
	
	'click #undo': function(){
		
		var undos = Session.get(UNDO);
		
		this.universe.shapes = undos.pop();
		
		Session.set(UNDO, undos);
		
		draw(this.universe.shapes);
		
	},
	
	'click #finished': function(){
				
		Children.update(this._id, {$set: {universe: this.universe}});
		
		Router.go('/child/' + this._id);
		
	}
	
});