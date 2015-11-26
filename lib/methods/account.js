Meteor.methods({
	changeName: function(first, last){
		
		if(!Meteor.userId()){
			throw new Meteor.Error('not-authorised');
		}
		
		check(first, String);
		check(last, String);
		
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.firstName': first,
                'profile.lastName': last
            }
        });
        		
	}
})