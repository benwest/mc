var BRAINTREE_READY = 'orderFormBraintreeReady';
var ERROR = 'orderFormError';

Template.orderFormPay.onCreated(function(){
	Session.set(BRAINTREE_READY, false);
	Session.set(ERROR, false);
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
					
					var order = {
						garments: _.pluck(Session.get('orderFormGarments'), 'name'),
						organic: Session.get('orderFormOrganic'),
						repeat: Session.get('orderFormRepeatInterval'),
						comments: Session.get('orderFormComments'),
						address: Session.get('orderFormAddress'),
						forChild: template.data._id
					}

					Meteor.call('placeOrder', order, response.nonce, function(err, res){
						console.log(err, res);
						if(err) {
							Session.set(ERROR, error.reason);
						} else {
							Router.go('/order/' + res);
						}
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

Template.orderFormPay.events({	/*
	'click .pay': function(event, template){
		
		Meteor.call('placeOrder', template.data.number, function(err, res){
			console.log(err, res);
		})
		
	}
	*/
})