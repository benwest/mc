var MENU_OPEN = 'menuOpen';
var BACK = 'back';

Template.master.onCreated(function(){
	
	Session.set(MENU_OPEN, false);
	Session.set(BACK, false);
	
})

Template.master.helpers({
	
	'bgClass': function(){
				
		switch(Router.current().route.getName()){
			
			case 'child':
			case 'colors':
			case 'looks':
			case 'about':
			case 'orderForm':
				return 'bg-space';
				
			case 'orders':
			case 'order':
			case 'addChild':
			case 'sizes':
				return 'bg-blue';
								
			case 'account':
			case 'login':
			case 'reset-password':
			case 'signup':
			case 'faq':
			case 'contact':
			case 'terms':
			case 'privacy-policy':
			case 'who-we-are':
				return 'bg-orange';
				
			case 'profile':
				return 'bg-teal';
								
			default:
				return 'bg-dark-grey';
			
		}
		
	},
	
	'menuClass': function(){
		return Session.get(MENU_OPEN) && 'open';
	},
	
	'children': function(){
		return Children.find({owner: Meteor.userId()});
	},
	
	'back': function(){
		return Session.get('back');
	},
	
	'wait': function(){
		return Session.get('wait');
	}
		
});


Template.master.events({
	
	'click #menuButton': function(){
		Session.set(MENU_OPEN, true);
		
	},
	
	'click #overlay, click #menu a': function(){
		Session.set(MENU_OPEN, false);
	},
	    
    'click .logout': function() {
        Meteor.logout();
        Router.go('home');
    }
    
});