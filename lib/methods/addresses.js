Meteor.methods({
	addAddress: function(address){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(address, {
			line1: String,
			line2: Match.OneOf(String, Boolean),
			city: String,
			county: String,
			country: String,
			postcode: String
		});
		
		address.default = Addresses.find({owner: Meteor.userId()}).count() === 0;
		address.owner = Meteor.userId();
		
		var id = Addresses.insert(address);
		
		return address.default && id;
		
	},
	
	removeAddress: function(id){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		var address = Addresses.findOne(id);
		
		if(!address || address.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		Addresses.remove(id);
		
	},
	
	makeAddressDefault: function(id){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		var address = Addresses.findOne(id);
		
		if(!address || address.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		Addresses.find({owner: Meteor.userId()}).map(function(address){
			
			Addresses.update(address._id, {
				$set: {
					'default': address._id === id
				}
			})
			
		})
		
	}
})