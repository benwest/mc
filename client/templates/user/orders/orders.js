Template.orders.helpers({
	'looks': function(){
		return _.map(this.looks, function(id){
			return Looks.findOne(id);
		})
	},
	'colors':function(){
		return _.map(this.colors, function(id){
			return Colors.findOne(id);
		})
	},
	'orders': function(){
		var orders = Orders.find({owner: Meteor.userId()}, {sort: {placedAt: -1}}).map(function(order){
			if(!order.i2iId) return order;
			order.i2iOrderHeader = new ReactiveVar(null);
			Meteor.call('sqlOrderHeader', order, function(err, res){
				console.log(res);
				if(err){
					console.log(err);
				} else {
					if(res.length){
						order.i2iOrderHeader.set(res[0]);
					} else {
						order.i2iOrderHeader.set(false);
					}
				}
			});
			return order;
		})
		return orders;
	},
	'status': function(){
		
		return i2iStatusDescription(this);
		
	},
	'forChild': function(){
		return Children.findOne(this.forChild).name;
	},
	'lastActionDate': function(){
		return this[this.status + 'At'];
	},
	'showReturnLink': function(){
		
		var status = i2iStatusDescription( this.i2iStatus.get() );
		
		return status === 'Dispatched' && !this.returnConfirmed;
	}
})