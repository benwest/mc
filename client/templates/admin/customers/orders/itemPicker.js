Template.admin_itemPicker.helpers({
    
    'items': function(){
        
        return OrderItems.find({order: this._id}).map(function(item){
	        return _.extend(Inventory.findOne(item.sku), item);
        });
        
    },
    
    'addOwner': function(inventory){
        
        var owner = this._id;
        
        return _.map(inventory, function(item){
            item.owner = owner;
            return item;
        });
        
    },

    'orderTotal': function(){
        return _.reduce(this.items, function(memo, item, key){
            return memo + Inventory.findOne(key).cost * item.quantity;
        }, 0)
    }

})

Template.admin_itemPicker.events({
    
    'click .items-order .item-row': function(){
        
        if(this.quantity === 1){
            
            OrderItems.remove(this._id);
            
        } else {
            
            OrderItems.update(this._id, {
                $inc: {quantity: -1}
            });
        }
        
    },
    
    'click .items-inventory .item-row': function(){
        
        var itemInOrder = OrderItems.findOne({sku: this._id, order: this.owner});
        
        if(itemInOrder){
	        
	        OrderItems.update(itemInOrder._id, {
		        $inc: {quantity: 1}
	        })
	        
        } else {
	        
	        OrderItems.insert({
		        order: this.owner,
		        sku: this._id,
		        quantity: 1,
		        markedForReturn: 0,
		        returned: 0
	        });
	        
        }
        
    },
})