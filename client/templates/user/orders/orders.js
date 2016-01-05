Template.orders.helpers({
	'looks': function(){
		return _.map(this.looks, function(id){
			return Looks.findOne(id);
		})
	},
	'colors':function(){
		return _.map(this.colors, function(id){
			return Colors.findOne(id);
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