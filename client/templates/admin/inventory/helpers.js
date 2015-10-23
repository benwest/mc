Template.registerHelper('inventoryQuery', function(){
    
    return Inventory.find({}).map(function(item){
    
	    var itemId = item._id;
	    var inOrders = 0;
	    var sold = 0;
	    var itemsInOrders = OrderItems.find({sku: itemId}).fetch();
	    
	    _.forEach(itemsInOrders, function(item){
	        	        
	        if(item.returned === item.quantity) return;
	        
	        var order = Orders.findOne(item.order);
	        
	        if(order.status !== 'complete') {
	            inOrders += item.quantity - item.returned;
	        } else {
	            sold += item.quantity - item.returned;
	        }
	        
	    });
	    
	    item.inOrders = inOrders;
	    item.sold = sold;
	    item.available = item.quantity - inOrders - sold;
	    return item;
	    
	});
    
});
