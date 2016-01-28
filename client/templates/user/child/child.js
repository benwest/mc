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

Template.child.helpers({
	
	'nameSize': function(){
				
		if(this.name.length <= 5){
			return 10;
		} else if(this.name.length <= 10){
			return 8;
		} else {
			return 6;
		}
				
	},
	
	'coloredName': function(){
		
		function coloredSpan(color, content){
			return '<span style="color:' + color + ';">' + content + '</span>';		
		}
				
		var colors = _.map(this.colors, function(id){
			return Colors.findOne(id).color
		});
		
		if( colors.length === 0 ) return this.name;
		if( colors.length === 1 ) return coloredSpan( colors[0], this.name );
		
		var ret = '';
		
		for( var i = 0; i < this.name.length; ++i ){
			ret += coloredSpan( colors[ i % colors.length ], this.name.charAt(i) );
		}
		
		return ret;
		
	},
	
	'readyToOrder': function(){
				
		var settings = globalSettings();
		
		return this.colors.length >= settings.minColors && this.looks.length >= settings.minLooks;
		
	},
	
	'moreColoursAndLooks': function(){
		
		var settings = globalSettings();
		var numColors = this.colors.length;
		var numLooks = 0//this.looks.length;
		var moreColors = Math.max(settings.minColors - numColors, 0);
		var moreLooks = Math.max(settings.minLooks - numLooks, 0);
		
		var ret = '';
		
		if(moreColors) {
			ret += '<a href="/colors/' + this._id + '">' + moreColors + ' more ' + plural(moreColors, 'colour') + '</a> ';
		}
		if(moreColors && moreLooks){
			ret += 'and ';
		}
		if(moreLooks){
			ret += '<a href="/looks/' + this._id + '">' + moreLooks + ' more ' + plural(moreLooks, 'look') + '</a>';
		}
		
		return ret;
		
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
        Meteor.call('removeChild', this._id, function(error, result){
	        if(error){
		        alert(error.reason);
		        return;
	        }
	        Session.set(DELETE_CHILD_CONFIRM, false);
	        Router.go('/profile');
        });
    }
    
})