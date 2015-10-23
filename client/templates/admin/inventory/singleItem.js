Template.admin_singleItem.helpers({
    
    'quantifiedItem': function(){
        return attachItemQuantities(this);
    },
 
    'relatedOrders': function(){
        
        var itemId = this._id;
        
        return ordersWithItem(itemId).map(function(order){
            
            var item = order.items[itemId];
            
            return {
                number: order.number,
                status: order.status,
                owner: order.owner,
                quantity: item.quantity,
                markedForRetun: item.markedForReturn,
                returned: item.returned || 'None',
                feedback: item.feedback
            }
            
        });
        
    }
    
})

Template.admin_singleItem.events({
    
    'submit #subtract-quantity': function(event, template){
        
        event.preventDefault();
        
        var amount = parseInt(template.$('#subtract-quantity-input').val());
        
        if(amount > this.available) return;
        
        Meteor.call('changeInventoryQuantity', this._id, -amount);
        
    },
    
    'submit #add-quantity': function(event, template){
        
        event.preventDefault();
        
        var amount = parseInt(template.$('#add-quantity-input').val());
        
        Meteor.call('changeInventoryQuantity', this._id, amount);
        
    },
    
})