var ADDRESS_LINES = {
	line1: 'Address line 1',
	line2: 'Address line 2',
	city: 'City',
	country: 'Country',
	postcode: 'Postcode'
};

var ADDING_ADDRESS = 'addingNewAddress';

Template.addressSelect.onCreated(function(){
	Session.set(ADDING_ADDRESS, false);
	var lines = {}
	_.each(ADDRESS_LINES, function(val, key){ lines[key] = false; });
	Session.set(this.data.id + 'New', lines);
	if(this.data.select) {
		var defaultAddress = Addresses.findOne({owner: Meteor.userId(), default: true});
		Session.set(this.data.id, defaultAddress ? defaultAddress._id : false );
	}
});

function getAddress(id){
	
	var address = {};
	
	_.each(ADDRESS_LINES, function(value, key){
		address[key] = Session.get(id + 'New' + key);
	})
	
	return address;
}

function validate(address){
	
	return _.every(address, function(value, key){
		if(key === 'line2') return true;
		return !!value;
	})
	
}

function addressValid(id){
	
	return validate(getAddress(id));
	
}

Template.addressSelect.helpers({
	
	'addingAddress': function(){
		
		return Session.get(ADDING_ADDRESS);
		
	},
	
	'canSelect': function(){
	
		return this.select && 'can-select';
		
	},
	
	'addresses': function(){
		
		return Addresses.find({owner: Meteor.userId()});
		
	},
	
	'selected': function(context){

		if(!context.select) return;
		
		var sel = Session.get(context.id);
		
		return this._id === sel && 'selected';
		
	},
	
	'newAddressLines': function(){
		
		var formId = this.id;
		
		return _.map( ADDRESS_LINES, function(value, key){
			
			return {
				name: value,
				inputId: formId + 'New' + key,
				unrequired: key === 'line2'
			}
			
		})
		
	},
	
	'newAddressValid': function(){
				
		return addressValid(this.id);
		
	}
})

Template.addressSelect.events({
	
	'click .add-address': function(event, template){
		Session.set(ADDING_ADDRESS, !Session.get(ADDING_ADDRESS) );		
	},
	
	'click .saved-address': function(event, template){
		
		if(template.data.select) Session.set(template.data.id, this._id);
		
	},
	
	'click .make-default-address': function(event){
		
		event.stopPropagation();
		
		Meteor.call('makeAddressDefault', this._id);
		
	},
	
	'click .delete-address': function(e){
		
		e.stopPropagation();
		
		Meteor.call('removeAddress', this._id);
		
	},
		
	'click .save-address': function(event, template){
		
		debugger;
				
		var address = getAddress(template.data.id);
		
		if(!validate(address)) return;
		
		Meteor.call('addAddress', address, function(error, result){
			
			if(error){
				alert(error.reason);
				return;
			}
			
			if(result && template.data.select) Session.set(template.data.id, result);
			
			_.each(ADDRESS_LINES, function(val, key){ Session.set(template.data.id + 'New' + key, false) });
			Session.set(ADDING_ADDRESS, false);
			
		})
				
		
		
	}
	
})