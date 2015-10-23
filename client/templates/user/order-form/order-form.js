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
		var names = _.pluck( GarmentTypes.find({}).fetch(), 'name' );
		var selected = Session.get(SELECTED_GARMENTS);
		var ret = _.filter( names, function(name){
			return !_.some( selected, function(garment){
				return garment.name === name
			})
		}).join(', ');
		console.log(ret);
		return ret;
	},
	'notLast': function(){
		return this.i !== Session.get(SELECTED_GARMENTS).length - 1;
	},
	'selectedGarments': function(){
		
		var selected = Session.get(SELECTED_GARMENTS)
		var newGarment = Session.get('orderFormNewGarment');
		
		if(newGarment) {
			newGarment = GarmentTypes.findOne({name: newGarment});
			newGarment.i = selected.length;
			selected.push(newGarment);
			Session.set('orderFormNewGarment', false);
			Session.set(SELECTED_GARMENTS, selected);
		}
		
		return selected;
		
	},
	'allGarmentsSelected': function(){
		return Session.get(SELECTED_GARMENTS).length >= GarmentTypes.find({}).count();
	}
})

Template.orderForm.events({
    
	'click .select-garments': function(event, template){
		
		Session.set('orderFormHasSelectedGarments', true);
		Session.set(SELECTING_GARMENTS, !Session.get(SELECTING_GARMENTS));
		
	},
	
	'click .remove-garment': function(){
		
		var selected = Session.get(SELECTED_GARMENTS);
		selected.splice(this.i, 1);
		_.forEach(selected, function(garm, i){
			garm.i = i;
		})
		Session.set(SELECTED_GARMENTS, selected);
		
	},
    
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