STAGE_NAMES = ['garments', 'options', 'address', 'pay'];

orderFormVisitable = function(i){
	if(i === 0) return true;
	if(i > Session.get('orderFormMaxStage') + 1) return false;
	var visitable = true;
	while(visitable && i--) {
		visitable = orderFormValidators[STAGE_NAMES[i]]();		
	}
	return visitable;
}

orderFormSetStage = function(to){
	if(orderFormVisitable(to) && !Session.equals('orderFormStage', to)) {
		Session.set('orderFormMaxStage', Math.max(to, Session.get('orderFormMaxStage')) )
		Session.set('orderFormStage', to);
	}
}

orderFormValidators = {
	garments: function(){
		return !!Session.get('orderFormGarments').length
	},
	options: function(){
		var valid;
		if(Session.get('orderFormRepeat')){
			valid = !!Session.get('orderFormRepeatInterval');
		} else {
			valid = true;
		}
		return valid;
	},
	address: function(){
		return !!Session.get("orderFormAddress");
	},
	pay: function(){
		return true;
	}
}