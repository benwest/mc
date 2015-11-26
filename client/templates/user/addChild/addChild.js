Template.addChild.onCreated(function(){
	Session.set('newChildGender', false);
	Session.set('newChildName', false);
	Session.set('newChildDob', false);
	Session.set('newChildDobMonth', false);
	Session.set('newChildDobDay', false);
	Session.set('newChildDobYear', false);
})

Template.addChild.events({
	
	'click .done': function(event, template){
		
		var gender = Session.get('newChildGender');
		var name = Session.get('newChildName');
		var dob = Session.get('newChildDob').split(' ');
		
		if(!gender || !name || !dob) return;
		
		var date = dob[0];
		var month = dob[1];
		var year = dob[2];
		
		Meteor.call('addChild', {
			name: name,
			gender: gender,
			dob: moment().year(year).month(month).date(date).toDate()
		}, function(error, result){
			
			if(error){
				alert(error.reason);
				return;
			}
			
			Session.set('childJustAdded', result);
			Router.go('/child/' + result);
			
		});
		
	}
	
})