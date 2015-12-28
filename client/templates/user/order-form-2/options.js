function validate(){
	var valid;
	if(Session.get('orderFormRepeat')){
		valid = !!Session.get('orderFormRepeatInterval');
	} else {
		valid = true;
	}
	Session.set('orderFormMaxStage', valid ? 3 : 2);
	return valid;
}

Template.orderFormOptions.helpers({
	isOrganic: function(){
		return Session.get('orderFormOrganic');
	},
	repeat: function(){
		return Session.get('orderFormRepeat');
	},
	valid: validate
})

Template.orderFormOptions.events({
	'click .organic': function(){
		Session.set('orderFormOrganic', !Session.get('orderFormOrganic'));
	},
	
	'click .repeat .check': function(){
		Session.set('orderFormRepeat', !Session.get('orderFormRepeat'));
		validate();
	},
	
	'click .next': function(){
		Session.set('orderFormStage', 3);
	}
})