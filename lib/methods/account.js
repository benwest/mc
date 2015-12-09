Meteor.methods({
	changeName: function(first, last){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(first, String);
		check(last, String);
		
        Meteor.users.update(this.userId, {
            $set: {
                'profile.firstName': first,
                'profile.lastName': last
            }
        });
        		
	},
	
	changePhoneNumber: function(number){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(number, String);
		
        Meteor.users.update(this.userId, {
            $set: {
                'profile.phone': number
            }
        });
		
	},
	
	changeEmail: function(newEmail){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		check(newEmail, String);
		
		if(!/^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,13})$/.test(newEmail)){
			throw new Meteor.Error('invalid-email', 'Please enter a valid e-mail address');
		}
		
		var oldEmail = Meteor.users.findOne(this.userId).emails[0].address;
		
		if(oldEmail === newEmail) return;
				
		if(!this.isSimulation){
			
			Accounts.removeEmail(this.userId, oldEmail);
			Accounts.addEmail(this.userId, newEmail);
			Accounts.sendVerificationEmail(this.userId, newEmail);
			
		}
		
	},
	
	sendVerificationEmail: function(){
		
		if(!this.userId){
			throw new Meteor.Error('not-authorised');
		}
		
		if(Meteor.users.findOne(this.userId).emails[0].verified) return;
		
		Accounts.sendVerificationEmail(this.userId);
		
	}
		
})