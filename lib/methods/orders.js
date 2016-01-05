Meteor.methods({
	/*
	createOrder: function(order){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(order, {
			forChild: String,
			address: String,
			garments: [String],
			organic: Boolean
		});
		
		var child = Children.findOne(order.forChild);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		var address = Addresses.findOne(order.address);
		
		if(!address || address.owner !== this.userId ){
			throw new Meteor.Error('not-authorised');
		}
		
		order.address = EJSON.clone(address);
		order.sizing = EJSON.clone(child.sizing);
		order.universe = EJSON.clone(child.universe);
		order.placedAt = new Date();
		order.status = 'placed';
		order.items = {};
		order.number = Orders.find().count() + 1;
		order.owner = Meteor.userId();
		
		Orders.insert(order);
		
		return order.number;
		
	},*/
	
	getClientToken: function(){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.isServer){
		
			var bt = BrainTreeConnect({
		        environment: Braintree.Environment.Sandbox,
		        merchantId: Meteor.settings.braintree.merchantID,
		        publicKey: Meteor.settings.braintree.publicKey,
		        privateKey: Meteor.settings.braintree.privateKey
			});
			
			var user = Meteor.users.findOne(this.userId);
			
			if(user.profile.braintreeId){
				return bt.clientToken.generate({
					customerId: user.profile.braintreeId
				});
			} else {
				return bt.clientToken.generate({});
			}
			
		}
		
	},
	
	placeOrder: function(order, nonce){

		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(order, {
			garments: [String],
			organic: Boolean,
			repeat: Match.OneOf(false, String),
			comments: Match.OneOf(false, String),
			address: String,
			forChild: String
		});
		check(nonce, String);
		
		var child = Children.findOne(order.forChild);
		
		if(!child || child.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		var address = Addresses.findOne(order.address);
		
		if(!address || address.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		order.address = EJSON.clone(address);
		
		order.sizing = EJSON.clone(child.sizing);
		order.colors = EJSON.clone(child.colors);
		order.looks = EJSON.clone(child.looks);
		order.owner = this.userId;
		
		if(Meteor.isServer){
			
			var bt = BrainTreeConnect({
		        environment: Braintree.Environment.Sandbox,
		        merchantId: Meteor.settings.braintree.merchantID,
		        publicKey: Meteor.settings.braintree.publicKey,
		        privateKey: Meteor.settings.braintree.privateKey
			});
			
			var sale = bt.transaction.sale({
				amount: "1.00",
				paymentMethodNonce: nonce,
				options: {
					storeInVaultOnSuccess: true
				}
			})
			
			order.braintreeId = sale.transaction.customer.id;
			
			order.status = 'placed';
			order.placedAt = Date.now();
			order.number = Orders.find().count() + 1;
			
			Orders.insert(order);
			
			return order.number;
						
		}
		
	},
	
	cancelOrder: function(id){
		
		if(!this.userId){
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
							
	},
	
	addOrderFeedback: function(id, feedback){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(id, String);
		check(feedback, String);
		
		var order = Orders.findOne(id);
		
		if(!order || order.owner !== this.userId) return;
		
		Orders.update(id, {$set: {feedback: feedback}})
		
	}
	
})