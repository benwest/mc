var i2iInsertOrder = queryFactory(
		"INSERT INTO vwMagentoSalesOrderHeader " +
		"(OrderID, AccountID, ContactID, OrderStatus, BraintreeID, RaisedDate, soDelAdd1, soDelAdd2, soDelAdd3, soDelPC, soDelCountry, SOUserDef2, SOUserDef3, SOUserDef4, SOUserDef5, SOUserDef6, SOUserDef7, SOUserDef8, SOUserDef9) " +
		"SELECT SONextSalNum, '{parentId}', '{childId}', 'WS1', '{braintreeId}', GETDATE(), '{address1}', '{address2}', '{addressCity}', '{addressPostcode}', '{addressCountry}', '{childName}', '{height}', '{weight}', '{shoes}', '{garments}', '{comments}', '{colors}', '{looks}' " +
		"FROM tblSONextSalNum; " +
		"UPDATE tblSONextSalNum " +
		"SET [SONextSalNum] = SONextSalNum + 1"
	)
	
var i2iReturnItem = queryFactory(
		"UPDATE tblSODetail " + 
		"SET UD15 = N'{returnedQty}' " +
		"WHERE (SODetSONum = N'{orderID}') AND (SODetLineNum = {lineNumber}); " +
		"UPDATE tblSODetail " +
		"SET UD14 = N'{returnReason}' " +
		"WHERE (SODetSONum = N'{orderID}') AND (SODetLineNum = {lineNumber})"
	)

var i2iUpdateCourier = queryFactory(
	"UPDATE tblSOMaster " +
	"SET SOUserDef5 = N'{courier}' " +
	"WHERE (SONum = N'{orderID}')"
)

function braintreeConnect(){
	
	if(Meteor.settings.production){
		return BrainTreeConnect({
	        environment: Braintree.Environment.Production,
	        merchantId: Meteor.settings.braintree.merchantID,
	        publicKey: Meteor.settings.braintree.publicKey,
	        privateKey: Meteor.settings.braintree.privateKey
		})
	} else {
		return BrainTreeConnect({
	        environment: Braintree.Environment.Sandbox,
	        merchantId: Meteor.settings.braintreeSandbox.merchantID,
	        publicKey: Meteor.settings.braintreeSandbox.publicKey,
	        privateKey: Meteor.settings.braintreeSandbox.privateKey
		})

	}
	
}

Meteor.methods({
	
	getClientToken: function(){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.isServer){
		
			var bt = braintreeConnect();
			
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
			
			var bt = braintreeConnect();
			
			var sale = bt.transaction.sale({
				amount: "1.00",
				paymentMethodNonce: nonce,
				options: {
					storeInVaultOnSuccess: true
				}
			});
			
			order.braintreeId = sale.transaction.customer.id;
			
			order.status = 'placed';
			order.placedAt = Date.now();
			order.number = Orders.find().count() + 1;
						
			var user = Meteor.users.findOne(this.userId);
			
			if(Meteor.settings.i2i){
				
				order.i2iId = Sql.q('SELECT SONextSalNum FROM tblSONextSalNum')[0].SONextSalNum;
				
				var i2iComments = '';
				i2iComments += order.organic ? 'Organic products only' : 'No organic preference';
				i2iComments += '; ';
				i2iComments += order.repeat ? 'Repeat every ' + order.repeat : 'One-off order';
				i2iComments += '; ';
				i2iComments += order.comments ? order.comments : 'No comments';
				
				var colorNames = _.map(order.colors, function(id){
						return Colors.findOne(id).name;
					}).join(', ');
					
				var lookNames = _.map(order.looks, function(id){
						return Looks.findOne(id).name;
					}).join(', ');
				
				i2iInsertOrder({
					parentId: user.profile.i2iId,
					childId: child.i2iId,
					braintreeId: order.braintreeId,
					childName: child.name,
					height: child.sizing.height + 'cm',
					weight: child.sizing.weight + 'kg',
					shoes: 'Shoe size ' + child.sizing.shoes,
					garments: order.garments.join(', '),
					comments: i2iComments,
					colors: colorNames,
					looks: lookNames,
					address1: order.address.line1,
					address2: order.address.line2 || '-',
					addressCity: order.address.city,
					addressPostcode: order.address.postcode,
					addressCountry: order.address.country
				})
				
			}
			
			if(Meteor.settings.email){
				emailAnja(user.profile.firstName + ' ' + user.profile.lastName + ' has ordered a box', [
					'Order number: ' + order.number,
					'Customer: ' + user.profile.firstName + ' ' + user.profile.lastName,
					'For child: ' + child.name,
					'\tGender: ' + child.gender,
					'\tDate of birth: ' + moment(child.dob).format('MMMM Do YYYY'),
					'Sizes:',
					'\tHeight: ' + order.sizing.height + 'cm',
					'\tWeight: ' + order.sizing.weight + 'kg',
					'\tShoe size: ' + order.sizing.shoes,
					'Garments: ' + order.garments.join(', '),
					'Colours: ' + order.colors.map(function(c){ return Colors.findOne(c).name }).join(', '),
					'Looks: ' + order.looks.map(function(l){ return Looks.findOne(l).name }).join(', '),
					'Repeat order: ' + (order.repeat ? 'Every ' + order.repeat : 'No'),
					'Organic products only: ' + (order.organic ? 'Yes' : 'No'),
					'Delivery address:',
					'\t' + order.address.line1,
					'\t' + (order.address.line2 || ''),
					'\t' + order.address.country,
					'\t' + order.address.city,
					'\t' + order.address.postcode,
					'Comments: ' + (order.comments || 'None'),
					'Braintree Vault ID: ' + order.braintreeId
				]);
			}
			
			Meteor.users.update(user._id, {
				$set: {
					'profile.braintreeId': order.braintreeId
				}
			})
			
			Orders.insert(order);
			
			return order.i2iId;
						
		}
		
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
		
	},
	
	sendReturn: function(orderId, data, courier){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(orderId, String);
		
		var order = Orders.findOne(orderId);
		
		if(order.owner !== this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(data, [
			{
				lineNumber: Number,
				returnReason: String,
				returnedQty: Number
			}
		]);
		
		check(courier, Match.OneOf('interlink', 'collect+'));
		
		if(Meteor.isServer){
			
			_.each(data, function(item){
				
				i2iReturnItem({
					lineNumber: item.lineNumber,
					returnedQty: item.returnedQty,
					returnReason: item.returnReason.replace("'", ""),
					orderID: order.i2iId
				});
				
			});
			
			i2iUpdateCourier({
				courier: courier,
				orderID: order.i2iId
			})
			
		}
		
		Orders.update(orderId, {
			$set: {
				returnConfirmed: true
			}
		})
		
		
		
	},
	
	resetOrder: function(){
		var orderId = Orders.findOne({i2iId: 100042})._id;
		Orders.update(orderId, {
			$set: {
				returnConfirmed: false
			}
		})
	}
	
})