var CANCELLING = 'placedOrderCancelling';

Template.placedOrder.onCreated(function(){
    Session.set(CANCELLING, false);
});

Template.placedOrder.helpers({
    
    'cancellingOrder': function(){
            
        return Session.get(CANCELLING);
            
    }
    
})

Template.placedOrder.events({
    
    'click .cancel-button': function(event, template){
            
        Session.set(CANCELLING, true);
        
    },
    
    'click .cancel-cancel': function(){
        
        Session.set(CANCELLING, false);
        
    },
    
    'click .cancel-confirm': function(){
        
        Meteor.call('cancelOrder', this._id);
        
    }
    
})