var ERRORS = "addChildErrors";

Template.profile.onCreated(function(){
    Session.set(ERRORS, {});
});

Template.profile.helpers({
    'children': function(){
		return Children.find({owner: this._id}).map(function(child){
			return '<a href="/child/' + child._id + '">' + child.name + '</a>';
		});
    },
    'firstChild': function(){
	    return Children.findOne({owner: this._id});
    },
	'lastOrder': function(){
		return Orders.findOne({
			owner: this._id,
			status: {
				$in: ['placed', 'dispatched']
			}
		});
	},
	'readyToOrder': function(){
		
		var settings = globalSettings();
		
		return _.some( Children.find({owner: this._id}).fetch(), function(child){
			
			return child.universe.colors.length >= settings.minColors && child.universe.looks.length >= settings.minLooks;
			
		})
	}
});