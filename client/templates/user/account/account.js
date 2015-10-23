var NAME_ERRORS = 'accountEditErrors';
var PASSWORD_MESSAGES = 'accountPasswordMessages';
var EDITING_ADDRESS = 'accountEditingAddress';

Template.account.onCreated(function(){
    Session.set(NAME_ERRORS, {});
    Session.set(PASSWORD_MESSAGES, {});
    Session.set(EDITING_ADDRESS, false);
})

Template.account.helpers({
    nameErrorMessages: function() {
        return _.values(Session.get(NAME_ERRORS));
    },
    passwordErrorMessages: function() {
        return _.values(Session.get(PASSWORD_MESSAGES));
    },
    passwordErrorClass: function(key) {
        return Session.get(PASSWORD_MESSAGES)[key] && 'error';
    },
    editAddress: function(){
        return !Meteor.user().profile.address || Session.get(EDITING_ADDRESS);
    },
    currentAddress: function(){
        return Meteor.user().profile.address;
    }
})

Template.account.events({
    
    'submit form#changeName': function(event, template){
        
        event.preventDefault();

        var first = template.$('#changeName [name=firstName]').val();
        var last = template.$('#changeName [name=lastName]').val();
        
        var errors = {};
        
        if(!first) errors.firstName = "First name cannot be blank.";
        
        if(!last) errors.lastName = "Last name cannot be blank.";
        
        Session.set(NAME_ERRORS, errors)
        
        if(_.keys(errors).length) return;
        
        Meteor.users.update(Meteor.userId(), {
            $set: {
                'profile.firstName': first,
                'profile.lastName': last
            }
        });
        
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
        
        Meteor.users.update(Meteor.userId(), {
            $set: {'profile.address': address}
        });
        
        Session.set(EDITING_ADDRESS, false);

    }
});