var MONTH_NAMES = []

Template.addChild.onCreated(function(){
	Session.set('newChildGender', false);
	Session.set('newChildName', false);
	Session.set('newChildDob', false);
	Session.set('newChildDobMonth', false);
	Session.set('newChildDobDay', false);
	Session.set('newChildDobYear', false);
	Session.set("newChildError", false);
})

Template.addChild.helpers({
	gender: function(){
		return Session.get('newChildGender');
	},
	error: function(){
		return Session.get('newChildError');
	}
})

Template.addChild.events({
	
	'click .next': function(event, template){
				
		var gender = Session.get('newChildGender');
		var name = Session.get('newChildName');
		var dob = Session.get('newChildDob').split(' ');
		
		if(!gender || !name || !dob) return;
		
		var date = dob[0];
		var month = dob[1];
		var year = dob[2];
		
		_.find(MONTHS, function(mo, i){
			if(mo.name === month) {
				month = i;
				return true;
			}
		})
		
		var dob = moment([year, month, date]);
				
		if(!dob.isValid() || dob.toDate() > Date.now()){
			Session.set('newChildError', 'That date of birth is invalid.')
			return;
		}
		
		var maxAge = globalSettings().maxAge;
		
		if(moment().diff(dob, 'years') >= maxAge){
			Session.set('newChildError', 'Sorry, but ' + name + ' is too old. We stock clothing for ages 0-' + maxAge + '.')
			return;
		}
		
		Session.set('wait', true);
		
		Meteor.call('addChild', {
			name: name,
			gender: gender,
			dob: dob.toDate()
		}, function(error, result){
			
			Session.set('wait', false);
			
			if(error){
				alert(error.reason);
				return;
			}
			
			Session.set('childJustAdded', result);
			Router.go('/sizes/' + result);
			
		});
		
	}
	
})