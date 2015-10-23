Template.admin_master.helpers({
    'customerNotifications': function(){
        return allNotificationCount();
    },
    'customerWarnings': function(){
        return allWarningCount();
    }
});

Template.admin_master.events({
    
    'submit .find-order': function(event, template){
        
        event.preventDefault();
        
        var orderNumber = template.$('.order-finder').val();
        
        if(!orderNumber) return;
        
        var order = Orders.findOne({number: parseInt(orderNumber)});
        
        if(!order) return;
        
        Router.go('/admin/customer/' + order.owner);
        
        template.$('.order-finder').val('');
        
    },
    'click .logout': function() {
        Meteor.logout();
        Router.go('home');
    }
    
    
    
})

