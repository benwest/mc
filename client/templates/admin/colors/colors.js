function makeNice(){
	
	var colors = Colors.find();
	
	var numColors = colors.count();
	
	var x = 0, y = 0;
	
	var xs = [0];
	var ys = [0];
	
	var layers = 1;
	
	var angle = 0;
	var angleStep = Math.PI / 4;
	
	for(var i = 1; i < numColors; ++i){
		
		if(angle + (angleStep*.95) > Math.PI * 2){
			
			layers++;
			
			angleStep = Math.PI / (layers * 4);
			
			console.log(layers, angleStep);
			
			angle = 0;
			
		}
			
		angle += angleStep;
		
		x = Math.cos(angle + Math.PI) * layers;
		y = Math.sin(angle + Math.PI) * layers;
		
		xs.push(x);
		ys.push(y);
		
	}
	
	
	var size = 100 / ((layers * 2) + 1);
	var center = 50 - size/2;
	var radius = size * 0.66;
		
	colors.map(function(color, i){
			
			color.x = center + xs[i] * size;
			color.y = center + ys[i] * size;
			color.radius = radius;
			
			Colors.update(color._id, color);
			
	});

	
}

Template.admin_colors.helpers({
	
	'colors': function(){
		
		return Colors.find();
		
	}
	
});

Template.admin_colors.events({
	
	'click .add-color': function(event, template){
		
		var color = template.$('.color-input').val();
		var name = Session.get('adminColorName');
		
		if(!color || !name) return;
		
		Colors.insert({
			color: color,
			name: name
		});
		
		makeNice();
		
	},
	
	'click .remove-color': function(event, template){
		
		Colors.remove(this._id);
		
		makeNice();
		
	}
	
})