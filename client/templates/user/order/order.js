Template.order.onCreated(function(){
	Session.set('back', '/orders/');
})

Template.order.onDestroyed(function(){
	Session.set('back', false);
})

Template.order.helpers({
    
    'title': function(){
        return posessive(Children.findOne(this.forChild).name) + " Order";
    },
    
    'forChild': function(){
	    return Children.findOne(this.forChild).name;
    },
    
    'lastActionTime': function(){    
	    return moment(this[this.status + 'At']).format('H[:]MM [on] MMMM Do YYYY');
    },    
    'colors': function(){  
	    return _.map(this.colors, function(id){
		    return Colors.findOne(id)
	    })
    },
    'looks': function(){  
	    return _.map(this.looks, function(id){
		    return Looks.findOne(id)
	    })
    }

    
});