Template.orderFormAddress.helpers({
	valid: function(){
		var address = Session.get("orderFormAddress");
		if(address){
			Session.set('orderFormMaxStage', Math.max(Session.get('orderFormMaxStage'), 2));
			return true;
		} else {
			Session.set('orderFormMaxStage', 1);
			return false;
		}
	}
})

Template.orderFormAddress.events({
	'click .next': function(){
		Session.set('orderFormStage', 2);
	}
})