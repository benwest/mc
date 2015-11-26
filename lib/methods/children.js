Meteor.methods({
	
	addChild: function(data){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(data, {
			name: String,
			gender: Match.OneOf('boy', 'girl'),
			dob: Date
		});
		
		return Children.insert({
			owner: Meteor.userId(),
			name: data.name,
			dob: data.dob,
			gender: data.gender,
			sizing: {
				height: false,
				weight: false,
				shoes: false
			},
			universe: {
				shapes: [],
				colors: [],
				looks: []
			}
		});
		
	},
	
	removeChild: function(id){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		Children.remove(id);
		
	},
	
	updateSizes: function(id, sizes){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var child = Children.findOne(id);
		
		if(!child || child.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(sizes, {
			height: Number,
			weight: Number,
			shoes: Number
		});
		
		Children.update(id, {
			$set: {sizing: sizes}
		})
		
	}
	
})