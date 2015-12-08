var NAME_ERRORS = 'accountEditErrors';
var EMAIL_ERROR = 'accountEmailErrors';
var PHONE_ERROR = 'accountPhoneErrors';
var PASSWORD_MESSAGES = 'accountPasswordMessages';
var EDITING_ADDRESS = 'accountEditingAddress';

Template.account.onCreated(function(){
    Session.set(NAME_ERRORS, {});
    Session.set(PASSWORD_MESSAGES, {});
    Session.set(EMAIL_ERROR, false);
    Session.set(PHONE_ERROR, false);
    Session.set(EDITING_ADDRESS, false);
})

Template.account.helpers({
	nameTouched: function(){
		return Session.get('accountFirstNameTouched') || Session.get('accountLastNameTouched');
	},
    nameErrorMessages: function() {
        return _.values(Session.get(NAME_ERRORS));
    },
    passwordErrorMessages: function() {
        return _.values(Session.get(PASSWORD_MESSAGES));
    },
    emailError: function(){
	    return Session.get(EMAIL_ERROR);
    },
    phoneError: function(){
	    return Session.get(PHONE_ERROR);
    },
    passwordErrorClass: function(key) {
        return Session.get(PASSWORD_MESSAGES)[key] && 'error';
    },
    editAddress: function(){
        return !Meteor.user().profile.address || Session.get(EDITING_ADDRESS);
    },
    currentAddress: function(){
        return Meteor.user().profile.address;
    },
    userEmail: function(){
	    return Meteor.user().emails[0];
    }
})

Template.account.events({
    
    'click .change-name': function(event, template){
        
        var first = Session.get('accountFirstName');
        var last = Session.get('accountLastName');
        
        var errors = {};
        
        if(!first) errors.firstName = "First name cannot be blank.";
        
        if(!last) errors.lastName = "Last name cannot be blank.";
        
        Session.set(NAME_ERRORS, errors)
        
        if(_.keys(errors).length) return;
        
        Meteor.call('changeName', first, last);
        
        Session.set('accountFirstNameTouched', false);
        Session.set('accountLastNameTouched', false);
        
    },
    'submit form#changePassword': function(event, template){
        
        event.preventDefault();
        
        var oldPassword = template.$('#changePassword [name=old]').val();
        var newPassword = template.$('#changePassword [name=new]').val();
        var confirm = template.$('#changePassword [name=confirm]').val();
        
        var messages = {};
        
        if(!oldPassword){
            messages.oldPassword = {type: 'error', msg: 'Please enter your current password.'};
        }
        
        if(!newPassword){
            messages.newPassword = {type: 'error', msg: "Please enter your new password."};
        }
        
        if(newPassword && !confirm){
            messages.confirm = {type: 'error', msg: "Please confirm your new password."};
        }
        
        if(newPassword !== confirm){
            messages.confirm = {type: 'error', msg: "New passwords do not match."};
        }
        
        Session.set(PASSWORD_MESSAGES, messages);
        
        if(_.keys(messages).length) return;
        
        Accounts.changePassword(oldPassword, newPassword, function(error){
            if(error) {
                Session.set(PASSWORD_MESSAGES, {
                    none: {type: 'error', msg: error.reason}
                });
            } else {
                template.$('#changePassword [name=old]').val('');
                template.$('#changePassword [name=new]').val('');
                template.$('#changePassword [name=confirm]').val('');
                Session.set(PASSWORD_MESSAGES, {
                    none: {type: 'message', msg: 'Password changed.'}
                });
            }
        })
    },
    
    'click .edit-address': function(event, template){
        Session.set(EDITING_ADDRESS, true);
    },
    
    'submit .changeAddress': function(event, template){
        
        event.preventDefault();
        
        var address = template.$('.address-textarea').val();
                
        Session.set(EDITING_ADDRESS, false);

    },
    
    'click .change-email': function(e){
	    
	    e.preventDefault();
	    
	    var email = Session.get('accountEmail');
	    
	    if(!email) return Session.set(EMAIL_ERROR, 'Please enter an e-mail.');
	    
	    Meteor.call('changeEmail', email, function(error, result){
		   
			if(error) {
				Session.set(EMAIL_ERROR, error.reason);
			} else {
				Session.set(EMAIL_ERROR, 'Your e-mail address was changed.')
			}
		    
	    });
	    
    },
    
    'click .change-phone': function(e){
	    
	    e.preventDefault();
	    
	    var number = Session.get('accountPhone');
	    
	    if(!number) return Session.set(PHONE_ERROR, 'Please enter a phone number.');
	    
	    Meteor.call('changePhoneNumber', number, function(error, result){
		   
			if(error) {
				Session.set(PHONE_ERROR, error.reason);
			} else {
				Session.set(PHONE_ERROR, 'Your phone number was changed.')
			}
		    
	    });
	    
    },
    
    'click .verify-email': function(){
	    Meteor.call('sendVerificationEmail');
    }
});