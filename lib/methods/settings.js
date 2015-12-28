Meteor.methods({
	
	'changeMinColors': function(newMin){
		
		var user = Meteor.users.findOne(this.userId);
		
		if( !user || user.username !== 'admin' ){
			throw new Meteor.Error('not-authorised');
		}
		
		check(newMin, Number);
		
		var settings = Settings.findOne();
		
		Settings.update( settings._id, {
			$set: {
				minColors: newMin
			}
		})
		
	},
	
	'changeMinLooks': function(newMin){
		
		var user = Meteor.users.findOne(this.userId);
		
		if( !user || user.username !== 'admin' ){
			throw new Meteor.Error('not-authorised');
		}
		
		check(newMin, Number);
		
		var settings = Settings.findOne();
		
		Settings.update( settings._id, {
			$set: {
				minLooks: newMin
			}
		})
		
	},
	
	'changeMaxAge': function(newMax){
		
		var user = Meteor.users.findOne(this.userId);
		
		if( !user || user.username !== 'admin' ){
			throw new Meteor.Error('not-authorised');
		}
		
		check(newMax, Number);
		
		var settings = Settings.findOne();
		
		Settings.update( settings._id, {
			$set: {
				maxAge: newMax
			}
		})
		
	}
	
})