Meteor.methods({
	
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
		
	},
	
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
	
	placeOrder: function(orderId, nonce){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(orderId, String);
		check(nonce, String);
		
		var order = Orders.findOne(orderId);
		
		if(!order){
			throw new Meteor.Error('invalid-order', 'Order ' + orderNumber + ' does not exist');
		}
		
		if(order.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		var userId = this.userId;
		
		if(Meteor.isServer){
		
			var bt = BrainTreeConnect({
		        environment: Braintree.Environment.Sandbox,
		        merchantId: Meteor.settings.braintree.merchantID,
		        publicKey: Meteor.settings.braintree.publicKey,
		        privateKey: Meteor.settings.braintree.privateKey
			});
			
			return bt.transaction.sale({
				amount: "1.00",
				paymentMethodNonce: nonce,
				options: {
					storeInVaultOnSuccess: true
				}
			}, function(err, res){
				
				console.log(err, res);
				
				var user = Meteor.users.findOne(userId);
									
				Meteor.users.update(userId, {
					$set: {
						'profile.braintreeId': res.transaction.customer.id
					}
				})
				
			})
		
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
		
		//i2i: change order status to cancelled
					
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