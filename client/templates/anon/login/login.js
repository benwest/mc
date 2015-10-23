var MESSAGES = 'loginMessages';
var FORGOT_PASSWORD = 'forgotPassword';

Template.login.onCreated(function() {
  Session.set(MESSAGES, {});
  Session.set(FORGOT_PASSWORD, false);
});

Template.login.helpers({
  forgotPassword: function(){
    return Session.get(FORGOT_PASSWORD);
  },
  errorMessages: function() {
    return _.values(Session.get(MESSAGES));
  },
  errorClass: function(key) {
    return Session.get(MESSAGES)[key] && 'error';
  }
});

Template.login.events({
  'submit': function(event, template) {
    
    event.preventDefault();
    
    var email = template.$('[name=email]').val();
    
    var messages = {};

    if (! email) {
      messages.email = {type: 'error', msg: 'Please enter your email.'};
    }
    
    if(!Session.get(FORGOT_PASSWORD)){
      var password = template.$('[name=password]').val();
      if (! password) {
        messages.password = {type: 'error', msg: 'Please enter a password.'};
      }
    }
    
    Session.set(MESSAGES, messages);
    if (_.keys(messages).length) {
      return;
    }
    
    if(!Session.get(FORGOT_PASSWORD)){
      
      Meteor.loginWithPassword(email, password, function(error) {
        if (error) {
          return Session.set(MESSAGES, {'none': error.reason});
        }
        
      });
      
    } else {
      
      Accounts.forgotPassword({
        email: email
      }, function(error){
        if (error) {
          Session.set(MESSAGES, {'none': {type: 'error', msg: error.reason}});
        } else {
          Session.set(MESSAGES, {'none': {type: 'message', msg: 'Password reset link sent to ' + email}})
          Session.set(FORGOT_PASSWORD, false);
        }
      });
      
    }
    
  },
  'click .forgotPassword': function(event, template){
    Session.set(FORGOT_PASSWORD, true);
    template.$('form').submit();
  }
});
