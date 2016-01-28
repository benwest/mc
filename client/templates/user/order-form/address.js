Template.orderFormAddress.helpers({
	valid: function(){
		return orderFormValidators.address();
	}
})

Template.orderFormAddress.events({
	'click .next': function(){
		orderFormSetStage(3);
	}
})