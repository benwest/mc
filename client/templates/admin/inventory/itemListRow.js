Template.admin_inventoryListRow.helpers({
    
    'cannotSubtractQuantity': function(){
        return this.available === 0;
    }
    
});

Template.admin_inventoryListRow.events({
    
    'click .delete-item': function(){
        
        Inventory.remove(this._id);
        
    },
    
    'click .subtract-quantity': function(){
        
        Inventory.update(this._id, {$inc: {quantity: -1}});
        
    },
    
    'click .add-quantity': function(){
        
        Inventory.update(this._id, {$inc: {quantity: 1}});
        
    }
    
})