Router.route('/profile/:userId', {
    data: function(){
        debugger;
        return Meteor.users.findOne(this.params.userId);
    },
    action: function(){
    
        if(this.data()._id === Meteor.user()._id){
            this.redirect('/profile');
        } else if( Meteor.user().username === 'admin' ){
            this.render('profile');
        } else {
            this.render('not-authorised')
        }
        
    }
});

Router.route('/admin', function(){
    this.redirect('/admin/customers');
});

Router.route('/admin/customers',{
    name: 'admin_customers',
    action: function(){
        authoriseAdmin(this, 'admin_customers');
    }
})

Router.route('/admin/customer/:customerId', {
    name: 'admin_customer',
    data: function(){
        return Meteor.users.findOne(this.params.customerId);
    },
    action: function(){
        authoriseAdmin(this, 'admin_customers');
    }
})

Router.route('/admin/inventory',{
    name: 'admin_inventory',
    action: function(){
        authoriseAdmin(this, 'admin_inventory');
    }
})

Router.route('/admin/inventory/:itemId',{
    name: 'admin_singleItem',
    data: function(){
        return Inventory.findOne(this.params.itemId);
    },
    action: function(){
        authoriseAdmin(this, 'admin_singleItem');
    }
})

Router.route('/admin/brands',{
    name: 'admin_brands',
    action: function(){
        authoriseAdmin(this, 'admin_brands');
    }
})

Router.route('/admin/colours',{
    name: 'admin_colors',
    action: function(){
        authoriseAdmin(this, 'admin_colors');
    }
})

Router.route('/admin/garment-types',{
    name: 'admin_garment_types',
    waitOn: function(){
	    return Meteor.subscribe('garmentTypes');
    },
    action: function(){
        authoriseAdmin(this, 'admin_garment_types');
    }
})

Router.route('/admin/looks',{
    name: 'admin_looks',
    action: function(){
        authoriseAdmin(this, 'admin_looks');
    }
})

Router.route('/admin/universes',{
    name: 'admin_universes',
    action: function(){
        authoriseAdmin(this, 'admin_universes');
    }
})

Router.route('/admin/settings',{
    name: 'admin_settings',
    action: function(){
        authoriseAdmin(this, 'admin_settings');
    }
})

function authoriseAdmin(route, template){
    
    if(Meteor.user()){
        if(Meteor.user().username === 'admin'){ // Secure??? No!
            route.render(template);
        } else {
            route.render('not-authorised');
        }
    } else {
        route.render('login');
    }
    
}