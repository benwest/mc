Template.orders.helpers({
	'orders': function(){
		return Orders.find({owner: Meteor.userId()})
	},
	'forChild': function(){
		return Children.findOne(this.forChild).name;
	},
	'lastActionDate': function(){
		return this[this.status + 'At'];
	}
})