Template.sizes.onCreated(function(){
	Session.set('back', this.data.colors.length ? '/child/' + this.data._id : false);
})

Template.sizes.onDestroyed(function(){
	Session.set('back', false);
})

Template.sizes.helpers({
	title: function(){
		return this.name + "'s sizes";
	},
	valid: function(){
		return Session.get('sizingHeight') && Session.get('sizingWeight') && Session.get('sizingShoes');
	}
})

Template.sizes.events({
	'click .confirm-sizing': function(event, template){
		
		Meteor.call('setSizing', template.data._id, {
			height: Number( Session.get('sizingHeight') ),
			weight: Number( Session.get('sizingWeight') ),
			shoes: Number( Session.get('sizingShoes') )
		}, function(err, res){
			if(err) {
				alert(err.reason);
			} else {
				Router.go( (template.data.colors.length ? '/child/' : '/colors/') + template.data._id);
			}
		})
		
	}
})