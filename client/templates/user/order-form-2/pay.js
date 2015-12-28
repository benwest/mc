var BRAINTREE_READY = 'orderFormBraintreeReady';

Template.orderFormPay.onCreated(function(){
	Session.set(BRAINTREE_READY, false);
})

Template.orderFormPay.onRendered(function(){
	
	var template = this;
	
	Meteor.call('getClientToken', function(err, res){
	    					    
	    if(err) {
		    console.log(err)
		} else {
						
			braintree.setup(res.clientToken, 'dropin', {
				container: 'payment-form',
				onReady: function(){
					Session.set(BRAINTREE_READY, true);
				},
				onPaymentMethodReceived: function(response){
					
					console.log(response);
					
					Meteor.call('placeOrder', template.data._id, response.nonce, function(err, res){
						console.log(err, res);
					});
					
				}
			})
			
		}
	    
    })

})

Template.orderFormPay.helpers({
	'ready': function(){
		return Session.get(BRAINTREE_READY) && 'ready';
	}
})

Template.orderFormPay.events({
	'click .pay': function(event, template){
		
		Meteor.call('placeOrder', template.data.number, function(err, res){
			console.log(err, res);
		})
		
	}
})