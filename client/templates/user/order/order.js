Template.order.helpers({
    
    'title': function(){
        
        return Children.findOne(this.forChild).name + "'s Order";
        
    },
    
    'lastActionTime': function(){
	    	    
	    return moment(this[this.status + 'At']).format('H[:]MM [on] MMMM Do YYYY');
	    
    },
    
    'sizes': function(){
	    
	    return _.map(this.sizing, function(value, key){
		    return {
			    name: key,
			    value: value
		    }
	    })
	    
    },
	
    'templateName': function(){
        
        return this.status + 'Order';
        
    },
    
    'colors': function(){
	    
	    var i = 0;
	    
	    return _.map( this.universe.colors, function(value, key){
		    
		    var look = Colors.findOne(key);
		    look.times = value;
		    look.i = i++;
		    return look;
		    
	    })
	    
    },
    
    'looks': function(){
	    
	    var i = 0;
	    
	    return _.map( this.universe.looks, function(value, key){
		    
		    var look = Looks.findOne(key);
		    look.times = value;
		    look.i = i++;
		    return look;
		    
	    })
	    
    }

    
});