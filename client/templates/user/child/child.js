var DELETE_CHILD_CONFIRM = "deleteChildConfirm";

Template.child.onCreated(function(){
    Session.set(DELETE_CHILD_CONFIRM, false);
});

function childLikesBrand(childId, brandId){
    return _.contains(Children.findOne(childId).brands, brandId);
}

function childLikesUniverse(childId, universeId){
    return Children.findOne(childId).universes[universeId] !== undefined;
}

function lastOrder(childId){
    return Orders.findOne({forChild: childId}, {
           sort: {placedAt: -1, limit: 1} 
    })
}

Template.child.onDestroyed(function(){
	sessionDelete('childJustAdded');
})

Template.child.helpers({
	
	'readyToOrder': function(){
		
		var settings = globalSettings();
		
		return _.keys(this.universe.colors).length > settings.minColors && _.keys(this.universe.looks).length >= settings.minLooks;
		
	},
	
	'lastOrder': function(){
				
		var orders = Orders.find({
			forChild: this._id,
			status: {
				$in: ['placed', 'dispatched']
			}
		}).fetch();
		
		return _.chain(orders)
			.sortBy(function(order){
				return order[order.status + 'At'];
			})
			.last()
			.value();
	},
	
	'actionTime': function(){
		return this[this.status + 'At'];
	},
	
	'moreOrders': function(){
		return Orders.find({
			forChild: this._id,
			status: {
				$in: ['placed', 'dispatched']
			}
		}).count() - 1;
	},
	
	'noUniverse': function(){
		return this.universe.shapes.length === 0;
	},
	
	'moreColors': function(){
		var settings = globalSettings();
		return Math.max( settings.minColors - _.keys(this.universe.colors).length, 0 );
	},

	'moreLooks': function(){
		var settings = globalSettings();
		return Math.max( settings.minLooks - _.keys(this.universe.looks).length, 0 );
	},
	
	'moreColorsAndLooks': function(){
		var settings = globalSettings();
		var colors = Math.max( settings.minColors - _.keys(this.universe.colors).length, 0 );
		var looks = Math.max( settings.minLooks - _.keys(this.universe.looks).length, 0 );
		return colors + looks;
	},
	
	'justAdded': function(){
		return Session.equals('childJustAdded', this._id);
	}

});

Template.child.events({
    
    'click .remove': function(event, template){
        Session.set(DELETE_CHILD_CONFIRM, this._id);
    },
    'click .cancel-remove': function(event, template){
        Session.set(DELETE_CHILD_CONFIRM, false);
    },
    'click .confirm-remove': function(event, template){
        Session.set(DELETE_CHILD_CONFIRM, false);
        Children.remove(this._id);
        Router.go('/profile');
    }
    
})