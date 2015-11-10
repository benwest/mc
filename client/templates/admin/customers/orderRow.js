Template.admin_customerDetailOrderRow.helpers({
    'child': function(){
        return Children.findOne(this.forChild);
    },
    'garments':function(){
        return _.map(this.garments, function(garment){
	        return '<b>' + garment + '</b>';
        });
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
})