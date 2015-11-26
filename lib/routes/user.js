Router.route('/profile', {
    action: function(){
        authorise(this, 'profile');
    }
});

Router.route('/addChild', authoriseThis);

Router.route('/children', authoriseThis);

Router.route('/child/:childId', {
	name: 'child',
    waitOn: function(){
		return Meteor.subscribe('children');
    },
    data: function(){
        return Children.findOne(this.params.childId);
    },
    action: function(){
        authoriseWithData(this, 'child');
    }
});

Router.route('/editor/:childId', {
	name: 'editor',
	data: function(){
		return Children.findOne(this.params.childId);
	},
	waitOn: function(){
		return Meteor.subscribe('children');
	},
	action: function(){
		
		if( this.data() ){
			
			this.layout('blankMaster');
			this.render('editor');
			
		} else {
			
			this.render('loading');
			
		}
		
	}
})

Router.route('/account', {
	name: 'account',
	waitOn: function(){
		return Meteor.subscribe('addresses');
	},
	action: function(){
		authorise(this, 'account');
	}
});

Router.route('/order-form/:childId', {
    name: 'orderForm',
    waitOn: function(){
	    return [
		    Meteor.subscribe('garmentTypes'),
		    Meteor.subscribe('addresses')
	    ]
    },
    data: function(){
        return Children.findOne(this.params.childId);
    },
    action: function(){
        authoriseWithData(this, 'orderForm');
    }
});

Router.route('/orders', {
	name: 'orders',
	waitOn: function(){
		return Meteor.subscribe('orders');
	}
})

Router.route('/order/:orderNumber', {
    name: 'order',
    waitOn: function(){
	    return Meteor.subscribe('orders');
    },
    data: function(){
        return Orders.findOne({number: parseInt(this.params.orderNumber)});
    },
    action: function(){
        authoriseWithData(this, 'order');
    }
})

function authoriseWithData(route, template){
    
    if(Meteor.user()){
	    if(route.data()){
	        if(ownsData(route)){
	            route.render(template);
	        } else {
	            route.render('not-authorised')
	        }
	    } else {
		    route.render('loading');
	    }
    } else {
        route.render('login');
    }    
}

function ownsData(route){
    return Meteor.user().username === 'admin' || route.data().owner === Meteor.userId();
}

function authoriseThis(){
    authorise(this, this.route.getName());
}

function authorise(route, template, data){
    
    if(Meteor.user()){
        route.render(template, data);
    } else {
        route.render('login');
    }
}