Inventory = new Mongo.Collection('inventory');

Meteor.methods({
    
    'changeInventoryQuantity': function(itemId, amount){
        
        var item = Inventory.findOne(itemId);
        
        if(!item) return;
        if(item.quantity + amount < 0) return;
        
        Inventory.update(itemId, {$inc: { quantity: amount }});
        
    }
    
});