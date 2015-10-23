Template.cancelledOrder.events({
    
    'click .send-feedback': function(event, template){
        
        var feedback = template.$('.order-feedback').val();
        
        if(!feedback) return;
        
        Orders.update(this._id, {
            $set: {feedback: feedback}
        });
        
    }
    
})