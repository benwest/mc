Meteor.methods({
	
	placeOrder: function(order){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(order, {
			forChild: String,
			address: String,
			garments: [String]
		});
		
		var child = Children.findOne(order.forChild);
		
		if(!child || child.owner !== Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		var address = Addresses.findOne(order.address);
		
		if(!address || address.owner !== Meteor.userId() ){
			throw new Meteor.Error('not-authorised');
		}
		
		order.address = EJSON.clone(address);
		order.sizing = EJSON.clone(child.sizing);
		order.universe = EJSON.clone(child.universe);
		order.placedAt = new Date();
		order.status = 'placed';
		order.items = {};
		order.number = Orders.find().count() + 1; //i2i??
		order.owner = Meteor.userId();
		
		Orders.insert(order);
		
		//i2i: insert order
		
		return order.number;
		
	},
	
	cancelOrder: function(id){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		
		var order = Orders.findOne(id);
		
		if(!order) return;
					
		if( (Meteor.user().username !== 'admin') && (order.owner !== Meteor.userId() || order.status !== 'placed') ){
			throw new Meteor.Error('not-authorised');
		}
		
		Orders.update(id, {
			$set: {
				status: 'cancelled',
				cancelledAt: new Date()
			}
		})
		
		//i2i: change order status to cancelled
					
	},
	
	addOrderFeedback: function(id, feedback){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		check(feedback, String);
		
		var order = Orders.findOne(id);
		
		if(!order || order.owner !== Meteor.userId()) return;
		
		Orders.update(id, {$set: {feedback: feedback}})
		
	}
	
})