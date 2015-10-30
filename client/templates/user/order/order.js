Template.order.helpers({
    
    'childName': function(){
        
        return Children.findOne(this.forChild).name;
        
    },
    
    'address': function(){
	    return Addresses.findOne(this.address).address;
    },
    
    'garments': function(){
	    return _.map(this.garments, function(garment){
		    return garment = GarmentTypes.findOne(garment).name;
	    });
	    
    },
    
    'sizes': function(){
	    return _.map(this.sizing, function(value, key){
		    return value + ' for ' + key;
	    })
    },
	
    'templateName': function(){
        
        return this.status + 'Order';
        
    },

    
});