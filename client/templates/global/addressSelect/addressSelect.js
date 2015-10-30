function initAddress(id){
	Session.set(id, [{
		value: false,
		i: 0,
		id: id + '_' + 0,
		placeholder: 'Add an address'
	}]);
}

Template.addressSelect.onCreated(function(){
	initAddress(this.data.id + 'New');
	if(this.data.select) Session.set(this.data.id, false);
});

Template.addressSelect.onDestroyed(function(){
	sessionDelete(this.data.id + 'New');
})

Template.addressSelect.helpers({
	
	'canSelect': function(){
	
		return this.select && 'can-select';
		
	},
	
	'addresses': function(){
		
		return Addresses.find({owner: Meteor.userId()});
		
	},
	
	'selected': function(context){

		if(!context.select) return;
		
		var sel = Session.get(context.id);
		
		if(!sel) {
			sel = Addresses.findOne({owner: Meteor.userId(), default: true});
			Session.set(context.id, sel);
		}
		
		return this._id === sel._id && 'selected';
		
	},
	
	'newAddressLines': function(){
		
		var address = Session.get(this.id + 'New');
		
		if(address[address.length - 1].value){
			address.push({
				value: false,
				i: address.length,
				id: this.id + '_' + address.length
			})
		}
		
		return address;
		
	},
	
	'newAddress': function(){
		
		return _.some(Session.get(this.id + 'New'), function(a){ return a.value });
		
	}
})

Template.addressSelect.events({
	
	'click .saved-address': function(event, template){
		
		if(template.data.select) Session.set(template.data.id, this);
		
	},
	
	'click .make-default-address': function(){
		
		e.stopPropagation();
		
		var oldDefault = Addresses.findOne({owner: Meteor.userId(), default: true});
		
		if(oldDefault){
		
			Addresses.update(oldDefault._id, {
				$set: {default: false}
			});
		
		}
		
		Addresses.update(this._id, {
			$set: {default: true}
		});
		
	},
	
	'click .delete-address': function(){
		
		e.stopPropagation();
		
		Addresses.remove(this._id);
		
	},
		
	'input span': function(event, template){
				
		var element = $(event.target);
		
		var i = Number(this.id.split('_')[1]);
		
		var address = Session.get(template.data.id + 'New');
		
		var text = element.text();
		
		if(address[i]){
			address[i].value = text;
		} else {
			address.push({
				value: text,
				i: i,
				id: template.data.id + '_' + i
			});
		}
		
		Session.set(template.data.id, address);
		
	},
	
	'click .save-address': function(event, template){
		
		var address = _.chain(Session.get(template.data.id + 'New'))
			.pluck('value')
			.filter(_.identity)
			.value();
		
        Addresses.insert({
	        owner: Meteor.userId(),
	        address: address,
	        default: Addresses.find({owner: Meteor.userId()}).count() === 0
        })
        
		initAddress(template.data.id + 'New');
		
	}
	
})