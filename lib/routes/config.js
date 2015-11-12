Router.configure({
    layoutTemplate: 'master'
});

Router.onBeforeAction(function(){
	
	if (!Meteor.userId()) {
		this.render('login');
	} else {
		this.next();
	}	
	
}, {
	except: ['home', 'about', 'faq', 'terms', 'privacy-policy', 'contact', 'login', 'signup', 'reset-password']
});