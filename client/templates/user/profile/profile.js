var ERRORS = "addChildErrors";

Template.profile.onCreated(function(){
    Session.set(ERRORS, {});
});

Template.profile.helpers({
	'greeting': function(){
		
		var hr = moment().hour();
		
		if(hr < 12){
			return 'Good morning';
		} else if(hr < 19){
			return 'Good afternoon';
		} else {
			return 'Good evening';
		}
				
	},
	'childrenObjs': function(){
		return Children.find();
	},
    'children': function(){
		return Children.find({owner: Meteor.userId()}).map(function(child){
			return '<a href="/child/' + child._id + '">' + child.name + '</a>';
		});
    },
    'oneChild': function(){
	    return Children.find({owner: Meteor.userId()}).count() === 1;
    },
    'firstChild': function(){
	    return Children.findOne({owner: Meteor.userId()});
    },
	'lastOrder': function(){
		var orders = Orders.find({
			owner: Meteor.userId(),
			status: {
				$ne: 'cancelled'
			}
		}).fetch();
		
		return _.chain(orders)
			.sortBy(function(order){
				return order[order.status + 'At'];
			})
			.last()
			.value();
		
	},
	'moreOrders': function(){
		return Orders.find({
			owner: Meteor.userId(),
			status: {
				$ne: 'cancelled'
			}
		}).count() - 1;
	},
	'forChild':function(){
		return Children.findOne(this.forChild).name;
	},
	'actionTime': function(){
		return moment(this[this.status + 'At']).fromNow();
	},
	'readyToOrder': function(){
				
		var settings = globalSettings();
		
		return _.some( Children.find({owner: Meteor.userId()}).fetch(), function(child){
			
			return _.keys(child.universe.colors).length >= settings.minColors && _.keys(child.universe.looks).length >= settings.minLooks;
			
		})
	}
});