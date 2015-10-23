var RETURNING_ITEM = 'customerOrderReturningItem';

Template.dispatchedOrder.onCreated(function(){
    
    Session.set(RETURNING_ITEM, false);
    
});


Template.dispatchedOrder.helpers({

    'items': function(){
        
        return OrderItems.find({order: this._id}).map(function(item){
	        return _.extend(Inventory.findOne(item.sku), item);
        });
        
    },
    
    'itemFeedback': function(){
	    return Feedback.find({order: this.order, item: this.sku});
    },
    
    'returningItem': function(){
	    return Session.get(RETURNING_ITEM) === this._id;
    },
    
    'cannotRemoveReturn': function(){
	    return (this.markedForReturn || 0) <= this.quantity - (this.returned || 0);
    },
    
    'cannotAddReturn': function(){
	    return (this.markedForReturn || 0) >= this.quantity - (this.returned || 0);
    }
    
});

Template.dispatchedOrder.events({
	
	'click .return-start': function(){
		Session.set(RETURNING_ITEM, this._id);
	},
    
    'submit .return-form': function(event, template){
		
		event.preventDefault();
		
		var markedForReturn = Math.min(this.quantity, template.$('.return-quantity').val());
		var feedback = template.$('.return-feedback').val();
		
		OrderItems.update(this._id, {
			$set: {markedForReturn: markedForReturn}
		})
		
		if(feedback){
			
			Feedback.insert({
				order: this.order,
				item: this._id,
				from: Meteor.userId(),
				createdAt: new Date(),
				content: feedback
			})
			
		}
                
    },
    
    'click .edit-feedback': function(){
        Session.set(EDITING_FEEDBACK, true);
    },
    
    'input .feedback-editor': function(event, template){
        
        Session.set(FEEDBACK_BLANK, template.$('.feedback-textarea').val().length === 0)
        
    },
    
    'submit .feedback-editor': function(event, template){
        
        event.preventDefault();
        
        var feedback = template.$('.feedback-textarea').val();
        
        var setter = {};
        setter['items.' + this._id + '.feedback'] = feedback;
        
        Orders.update(this.inOrder, {
            $set: setter
        });
        
        Session.set(EDITING_FEEDBACK, false);
        
    }
    
})