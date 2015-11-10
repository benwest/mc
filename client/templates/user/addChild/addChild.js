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
		var date = dob[0];
		var month = dob[1];
		var year = dob[2];
				
		if(!gender || !name || !dob) return;
		
		var id = Children.insert({
			owner: Meteor.userId(),
			name: name,
			dob: moment().year(year).month(month).date(date).toDate(),
			gender: gender,
			sizing: {
				height: false,
				weight: false,
				shoes: false
			},
			universe: {
				shapes: [],
				colors: [],
				looks: []
			}
		})
		
		Session.set('childJustAdded', id);
		
		Router.go('/child/' + id);
		
	}
	
})