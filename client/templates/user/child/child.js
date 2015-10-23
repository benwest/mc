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

	'coloredName': function(){
		
		function coloredSpan(color, content){
			
			return '<span style="color:' + color + ';">' + content + '</span>';
			
		}
		
		var colors = _.filter( this.universe.colors, function(color){
			return tinycolor(color).getBrightness() < 185;
		});
		
		var numColors = colors.length;
		
		if( numColors === 0 ) return this.name;
		
		if( numColors === 1 ) coloredSpan( colors[0], this.name );
		
		var ret = '';
		
		for( var i = 0; i < this.name.length; ++i ){
			
			ret += coloredSpan( colors[ i % numColors ], this.name.charAt(i) );
			
		}
		
		return ret;
		
	},
	
	'readyToOrder': function(){
		
		var settings = globalSettings();
		
		return this.universe.colors.length > settings.minColors && this.universe.looks.length >= settings.minLooks;
		
	},
	
	'noUniverse': function(){
		return this.universe.shapes.length === 0;
	},
	
	'moreColors': function(){
		var settings = globalSettings();
		return Math.max( settings.minColors - this.universe.colors.length, 0 );
	},

	'moreLooks': function(){
		var settings = globalSettings();
		return Math.max( settings.minLooks - this.universe.looks.length, 0 );
	},
	
	'moreColorsAndLooks': function(){
		var settings = globalSettings();
		var colors = Math.max( settings.minColors - this.universe.colors.length, 0 );
		var looks = Math.max( settings.minLooks - this.universe.looks.length, 0 );
		return colors + looks;
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