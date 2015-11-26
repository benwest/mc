Deps.autorun(function() {
	Meteor.subscribe('settings');
	Meteor.subscribe('colors');
	Meteor.subscribe('looks');
	Meteor.subscribe('lookImages');
	if (Meteor.user()) {
		Meteor.subscribe('children');
	}
});