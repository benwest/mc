makeColorWheel = function(){
	
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

Meteor.methods({
	
	addColor: function(data){
		
		if(Meteor.user().username !== 'admin' ){
			throw new Meteor.Error('not-authorised');
		}
		
		check(data, {
			color: String,
			name: String
		})
		
		Colors.insert(data);
		
		makeColorWheel();
		
	},
	
	removeColor: function(id){
		
		if(Meteor.user().username !== 'admin' ){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		Colors.remove(id);
		
		makeColorWheel();
		
	}
})