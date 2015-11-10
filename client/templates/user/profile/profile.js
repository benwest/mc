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
		return Children.find({owner: this._id});
	},
    'children': function(){
		return Children.find({owner: this._id}).map(function(child){
			return '<a href="/child/' + child._id + '">' + child.name + '</a>';
		});
    },
    'firstChild': function(){
	    debugger;
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
	'forChild':function(){
		return Children.findOne(this.forChild).name;
	},
	'actionTime': function(){
		return moment(this[this.status + 'At']).fromNow();
	},
	'readyToOrder': function(){
		
		var settings = globalSettings();
		
		return _.some( Children.find({owner: this._id}).fetch(), function(child){
			
			return child.universe.colors.length >= settings.minColors && child.universe.looks.length >= settings.minLooks;
			
		})
	}
});