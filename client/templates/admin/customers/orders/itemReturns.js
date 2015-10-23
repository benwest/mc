Template.admin_itemReturns.helpers({
	
	'items': function(){
		
		return OrderItems.find({order: this._id}).map(function(item){
	        return _.extend(Inventory.findOne(item.sku), item);
        });
		
	},
	
	'notifications': function(){
		return allItemNotifications(this);
	}
	
});

Template.admin_itemReturns.events({
	
	"input .returned-input": function(event, template){
		
		var returned = $(event.target).val();
		
		returned = Math.min(returned, this.markedForReturn);
		
		OrderItems.update(this._id, {
			$set: {returned: returned}
		});
		
	}
	
});