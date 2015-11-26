GarmentTypes.allow({
	insert: function(){
		return Meteor.user().username === 'admin';
	},
	update: function(){
		return Meteor.user().username === 'admin';
	},
	remove: function(){
		return Meteor.user().username === 'admin';
	}
})