Template.cancelledOrder.events({
    
    'click .send-feedback': function(event, template){
        
        var feedback = template.$('.order-feedback').val();
        
        if(!feedback) return;
        
        Meteor.call('addOrderFeedback', feedback);
        
    }
    
})