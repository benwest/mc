var DEFAULT_ADDRESS = 'orderFormDefaultAddress';
var ORDER_ADDRESS = 'orderFormAddress';
var SELECTING_GARMENTS = 'orderFormSelectingGarments';
var SELECTED_GARMENTS = 'orderFormSelectedGarments';


Template.orderForm.onCreated(function(){
    var profileAddress = Meteor.users.findOne(this.data.owner).profile.address || '';
    Session.set(DEFAULT_ADDRESS, profileAddress);
    Session.set(ORDER_ADDRESS, profileAddress);
    Session.set(SELECTING_GARMENTS, true);
    Session.set(SELECTED_GARMENTS, []);
})

Template.orderForm.helpers({
	'garmentSelectors': function(){
		var selected = Session.get(SELECTED_GARMENTS);
		var range = selected.length;
		if(range < GarmentTypes.find({}).count() ) range++;
		return _.range(range);
	},
	'garmentSelectorId': function(){
		return 'orderFormGarment' + this.valueOf();
	},
	'garmentNames': function(){
		var child = this;
		var age = getAge(child.dob);
		var garments = GarmentTypes.find({}).fetch();
		var selected = Session.get(SELECTED_GARMENTS);
		var ret = _.filter( garments, function(garment){
			if( garment.gender !== 'Both' && garment.gender.toLowerCase !== child.gender ) return false;
			if( garment.minAge && garment.minAge >= age ) return false;
			if( garment.maxAge && garment.maxAge <= age ) return false;
			if( _.some( selected, function(selectedGarment){
				return garment.name === selectedGarment.name;
			}) ) return false;
			return true;
		});
		return _.pluck(ret, 'name').join(', ');
	},
	'sizingInstructions': function(){
		var child = this;
		var list = _.chain(Session.get('orderFormGarments'))
			.pluck('name')
			.map(function(garment){
				return GarmentTypes.findOne({name: garment}).sizing;
			})
			.uniq()
			.map(function(name, i){
				return {
					name: name,
					i: i,
					value: child.sizing[name] || false
				}
			})
			.value();
		
		Session.set('orderFormSizing', list);
		
		return _.map(list, function(item){ item.length = list.length; return item })
	},
	'sizingValid': function(){
		
		var sizings = Session.get('orderFormSizing');
		
		return _.every(sizings, function(s){return Session.get(s.name)});
		
	}
})

Template.orderForm.events({

    'click .place-order': function(event, template){
        
        var address = Session.get(ORDER_ADDRESS);
        var garms = Session.get(ORDER_GARMENTS);
        
        var errors = {};
        
        if(!address) errors.address = 'Please enter your delivery address.';
        if(!_.keys(garms).length) errors.garments = 'Please select the garments you need.';
        
        Session.set(ERRORS, errors);
        if(_.keys(errors).length) return;
        
        var colors = _.map(this.colors, function(color){return color});
        var brands = _.map(this.brands, function(brand){return brand});
        var universes = _.clone(this.universes);
        
        var orderNumber = Orders.find({}).count() + 1;
        
        Orders.insert({
            owner: Meteor.user()._id,
            number: orderNumber,
            forChild: this._id,
            address: address,
            garments: garms,
            colors: colors,
            brands: brands,
            universes: universes,
            placedAt: new Date(),
            status: 'placed',
            items: {}
        });
        
        if(Session.get(SAVE_ADDRESS)){
            
            Meteor.users.update(Meteor.userId(), {
                $set: {'profile.address': address}
            });
            
        }
        
        Router.go('/order/' + orderNumber);
        
    }
    
})