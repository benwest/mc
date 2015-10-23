var CANCELLING_ORDER = 'orderActionsCancelOrderConfirm';

Template.admin_orderActions.onCreated(function(){
    Session.set(CANCELLING_ORDER, false);
});

Template.admin_orderActions.helpers({
    'items': function(){
        return OrderItems.find({order: this._id}).map(function(item){
	        return _.extend(Inventory.findOne(item.sku), item);
        });
    },
    'orderWarnings': function(){
        return allOrderWarnings(this)
    },
    'orderNotifications': function(){
        return allOrderNotifications(this);
    },
    'status': function(status){
        return this.status === status;
    },
    'orderNeedsDispatch': function(){
        return orderNeedsDispatch(this);
    },
    'orderNeedsCompleting': function(){
        return orderNeedsCompleting(this);
    },
    'cancellingOrder': function(){
        return Session.get(CANCELLING_ORDER);
    }
})

Template.admin_orderActions.events({
    
    'click .order-dispatch': function(){
        
        Orders.update(this._id, {$set: {
            status: 'dispatched',
            dispatchedAt: new Date()
        }});
        
    },
    
    'click .order-complete': function(){
	    
	    Orders.update(this._id, {
		    $set: {
			    status: 'completed',
			    completedAt: new Date()
		    }
	    });
	    
    },
    
    'click .order-cancel': function(){
        Session.set(CANCELLING_ORDER, true);
    },
    
    'click .cancel-cancel': function(){
        Session.set(CANCELLING_ORDER, false);
    },
    
    'click .confirm-cancel': function(){
        Orders.update(this._id, {
            $set: {
                status: 'cancelled', 
                cancelledAt: new Date()
            }
        });
    }
    
})