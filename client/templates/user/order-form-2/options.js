Template.orderFormOptions.helpers({
	isOrganic: function(){
		return Session.get('orderFormOrganic');
	},
	repeat: function(){
		return Session.get('orderFormRepeat');
	},
	comments: function(){
		return Session.get('orderFormComments')
	},
	valid: function(){
		return orderFormValidators.options();
	}
})

Template.orderFormOptions.events({
	'click .organic': function(){
		Session.set('orderFormOrganic', !Session.get('orderFormOrganic'));
	},
	
	'click .repeat .check': function(){
		if(Session.equals('orderFormRepeat', true)){
			Session.set('orderFormRepeat', false);
			Session.set('orderFormRepeatInterval', false);
		} else {
			Session.set('orderFormRepeat', true);
		}
	},
	
	'click .next': function(){
		orderFormSetStage(2);
	}
})