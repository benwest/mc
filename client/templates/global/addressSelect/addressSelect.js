Template.addressSelect.onCreated(function(){
	Session.set(this.data.id, []);
});

Template.addressSelect.onDestroyed(function(){
	sessionDelete(this.data.id);
})

Template.addressSelect.helpers({
	
	'addresses': function(){
		
		if( !Meteor.user() ) return false;
		
		return _.map( Meteor.user().profile.addresses, function(address, i){
			
			return {
				address: address,
				i: i,
				html: _.reduce(address, function(memo, line){ return memo + line + '<br>' }, '')
			}
			
		} )
	},
	
	'newAddressLines': function(){
		
		var formId = this.id;
		
		var lines = _.map(Session.get(formId), function(line, i){
			return {
				value: line,
				i: i,
				id: formId + '_' + i,
				placeholder: i ? false : 'Add an address'
			}
		});
		
		lines.push({
			value: false,
			i: lines.length,
			id: formId + '_' + lines.length,
			placeholder: lines.length ? false : 'Add an address'
		});
		
		return lines;
		
	}
})

Template.addressSelect.events({
	
	'input span': function(event, template){
		
		var element = $(event.target);
		
		var i = this.id.split('_')[1];
		
		var address = Session.get(template.data.id);
		
		var text = element.text();
		
		address[i] = text;
				
		address = _.filter(address, _.identity);
		
		Session.set(template.data.id, address);
		
	}
	
})