var MESSAGES = 'resetMessages'

Template.resetPassword.onCreated(function() {
  Session.set(MESSAGES, {});
});

Template.resetPassword.helpers({
  errorMessages: function() {
    return _.values(Session.get(MESSAGES));
  },
  errorClass: function(key) {
    return Session.get(MESSAGES)[key] && 'error';
  }
});

Template.resetPassword.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var newPassword = template.$('[name=password]').val();
        var confirm = template.$('[name=confirm]').val();
        var token = Iron.controller().getParams().token;
        
        console.log(Iron.controller().getParams());
        
        var messages = {};

        if (! newPassword) {
          messages.password = {type: 'error', msg: 'Please enter your new password.'};
        }
        
        if(confirm !== newPassword){
            messages.confirm = {type: 'error', msg: 'Passwords do not match.'};
        }
        
        Session.set(MESSAGES, messages);
        if (_.keys(messages).length) {
          return;
        }
    
        Accounts.resetPassword(token, newPassword, function(error){
            if(error){
                messages.none = {type: 'error', msg: error.reason};
            } else {
                messages.none = {type: 'message', msg: 'Your password was reset.'};
            }
            Session.set(MESSAGES, messages);
        })
        
    }
    
});