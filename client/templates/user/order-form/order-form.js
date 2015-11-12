var GARMENTS_LIST = 'orderFormGarmentsList';
var SIZES_LIST = 'orderFormSizesList';
var SIZES_ENTERED = 'orderFormSizesEntered';
var SIZING_CONFIRMED = 'orderFormSizingConfirmed';


Template.orderForm.onCreated(function(){
    
    //Get which garments are valid for this child, and determine sizings needed, and their defaults
    var child = this.data;
	var age = getAge(child.dob);
	var sizes = {};
	var garments = _.filter( GarmentTypes.find().fetch(), function(garment){
		if( garment.gender !== 'Both' && garment.gender.toLowerCase !== child.gender ) return false;
		if( garment.minAge && garment.minAge >= age ) return false;
		if( garment.maxAge && garment.maxAge <= age ) return false;
		sizes[garment.sizing] = child.sizing[garment.sizing] || false;
		return true;
	});
	
	Session.set(GARMENTS_LIST, garments);
	Session.set(SIZES_LIST, sizes);
	Session.set(SIZES_ENTERED, {});
	Session.set(SIZING_CONFIRMED, false);

});

Template.orderForm.helpers({
	
	'title': function(){
		return this.name + "'s new order";
	},
	
	'colors': function(){
		
		return _.chain(this.universe.colors)
			.map(function(value, key){
				
				var color = Colors.findOne(key);
				
				return {
					color: color.color,
					name: color.name,
					times: value
				}
			})
			.sortBy(function(obj){return obj.times})
			.reverse()
			.value();
		
	},
	'looks': function(){
		
		var minTimes = _.min(this.universe.looks);
		var maxTimes = _.max(this.universe.looks);
		
		var maxSize = 2.5;
		var minSize = Math.max(maxSize - (maxTimes - minTimes), 1)
				
		return _.chain(this.universe.looks)
			.map(function(value, key){
				
				var scaledTimes = scale(value, minTimes, maxTimes, minSize, maxSize);
				scaledTimes = nearest(scaledTimes, 0.5);
				scaledTimes = String(scaledTimes).replace('.', '-');
				
				var look = Looks.findOne(key);
				look.times = value;
				look.textClass = 'text-xbold';
				
				return look;
				
			})
			.sortBy(function(obj){return obj.times})
			.reverse()
			.map(function(obj, i){obj.i = i; return obj;})
			.value();
		
	},
	
	'garmentNames': function(){
		return _.pluck( Session.get(GARMENTS_LIST), 'name' ).join(', ');
	},
	
	'sizingInstructions': function(){
		
		var sizes = Session.get(SIZES_LIST);
		var i = 0;
		var length = _.keys(sizes).length;
		
		return _.map( sizes, function(value, size, list){
			
			return {
				name: size,
				inputId: SIZES_ENTERED + '.' + size,
				value: value,
				i: i++,
				length: length
			}
			
		});
				
		/*
		
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
		
		return _.map(list, function(item){ item.length = list.length; return item })
		
		*/
	},
	
	'enteredSizes': function(){
		
		var sizes = Session.get(SIZES_ENTERED);
		var i = 0;
		var length = _.keys(sizes).length;
		
		return _.map( sizes, function(value, key){
			
			return {
				name: key,
				value: value,
				i: i++,
				length: length
			}
			
		})
		
	},
	
	'sizingValid': function(){
		
		return Session.get('orderFormHeight') && Session.get('orderFormWeight') && Session.get('orderFormShoes');
		
		/*
		
		var list = Session.get(SIZES_LIST);
		var entered = Session.get(SIZES_ENTERED);
		return _.keys(entered).length === _.keys(list).length;
		
		*/
		
	},
	
	'sizingConfirmed': function(){
		return Session.get(SIZING_CONFIRMED);
	}
})

Template.orderForm.events({
	
	'click .confirm-sizing': function(){
		Session.set(SIZING_CONFIRMED, true);
	},
	
	'click .change-sizing': function(){
		Session.set('sizingConfirmed', false);
	},

    'click .place-order': function(event, template){
		
        var orderNumber = Orders.find({}).count() + 1;
        
        var sizing = {
	        height: Session.get('orderFormHeight'),
	        weight: Session.get('orderFormWeight'),
	        shoes: Session.get('orderFormShoes')
        }
                
        Orders.insert({
            owner: Meteor.user()._id,
            number: orderNumber,
            forChild: this._id,
            address: EJSON.clone( Addresses.findOne( Session.get('orderFormAddress') ) ),
            garments: _.pluck( Session.get('orderFormGarments'), 'name'),
            sizing: sizing,
            universe: EJSON.clone(this.universe),
            placedAt: new Date(),
            status: 'placed',
            items: {}
        });
        		
		Children.update(this._id, {
			$set: {sizing: sizing}
		})
		
        Router.go('/order/' + orderNumber);
        
        /*
        
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
        
        */
        
    }
    
})