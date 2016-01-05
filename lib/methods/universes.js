Meteor.methods({
	
	saveUniverse: function(id, universe){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
				
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(universe, {
			shapes: [{
				bounds: {
					bottom: Number,
					top: Number,
					height: Number,
					width: Number,
					left: Number,
					right: Number
				},
				center: {
					x: Number,
					y: Number
				},
				points: [Number],
				color: Match.Optional(String),
				image: Match.Optional(String),
				offset: Match.Optional({
					x: Number,
					y: Number
				}),
				scale: Match.Optional(Number)
			}],
			colors: Match.Where(function(colors){
				return _.every(colors, function(value, key){
					check(value, Number);
					return Colors.findOne(key) !== undefined;
				})
			}),
			looks: Match.Where(function(looks){
				return _.every(looks, function(value, key){
					check(value, Number);
					return Looks.findOne(key) !== undefined;
				})
			})
		});
		
		Children.update(id, { $set: {universe: universe} } );
		
		return id;
		
	}
	
})