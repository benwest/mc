var STAGE = 'aboutStage';

Template.about.onCreated(function(){
	Session.set(STAGE, 0);
})

Template.about.helpers({
	stage: function(){
		return Session.get(STAGE);
	},
	colors: function(){
		return _.sample(Colors.find({}).fetch(), 10);
	},
	looks: function(){
		return _.pluck(Looks.find().fetch(), '_id');
	}
})

Template.about.events({
	'click .next-stage': function(){
		Session.set(STAGE, Session.get(STAGE) + 1);
	},
	'click .start-over': function(){
		Session.set(STAGE, 0);
	}
})

Template.aboutPage.helpers({
	even: function(i){
		return this.i % 2 === 0;
	},
	last: function(){
		return this.i === 6;
	}
})