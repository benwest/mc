Template.orders.helpers({
	'looks': function(){
		return _.map(this.universe.looks, function(value, key){
			return Looks.findOne(key);
		})
	},
	'colors':function(){
		return _.map(this.universe.colors, function(value, key){
			return Colors.findOne(key);
		})
	},
	'orders': function(){
		return Orders.find({owner: Meteor.userId()}, {sort: {placedAt: -1}})
	},
	'forChild': function(){
		return Children.findOne(this.forChild).name;
	},
	'lastActionDate': function(){
		return this[this.status + 'At'];
	}
})