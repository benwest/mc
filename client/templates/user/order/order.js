Template.order.helpers({
    
    'childName': function(){
        
        return Children.findOne(this.forChild).name;
        
    },
    
    'templateName': function(){
        
        return this.status + 'Order';
        
    },
    
    'garments': function(){
	    
	    return _.map(this.garments, function(size, garmentId){
		    return GarmentTypes.findOne(garmentId).name + ' (' + size + ')';
	    });
	    
    }
    
});