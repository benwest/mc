Template.children.helpers({
	'children': function(){
		return Children.find({owner: Meteor.userId()})
	},
	'colors': function(){
		return _.map(this.universe.colors, function(value, key){
			var color = Colors.findOne(key);
			color.times = value;
			return color;
		});
	},
	'looks': function(){
		return _.map(this.universe.looks, function(value, key){
			var look = Looks.findOne(key);
			look.times = value;
			return look;
		});
	},
	'moreColors': function(){
		var settings = globalSettings();
		return Math.max( settings.minColors - _.keys(this.universe.colors).length, 0 );
	},
	'moreLooks': function(){
		var settings = globalSettings();
		return Math.max( settings.minLooks - _.keys(this.universe.looks).length, 0 );
	},
	'canPlaceOrder': function(){
		var settings = globalSettings();
		return _.keys(this.universe.colors).length >= settings.minColors && _.keys(this.universe.looks).length >= settings.minLooks;
	}
})