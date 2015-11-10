Template.children.helpers({
	'children': function(){
		return Children.find({owner: Meteor.userId()})
	}
})