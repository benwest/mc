var MENU_OPEN = 'menuOpen';

Template.master.onCreated(function(){
	
	Session.set(MENU_OPEN, false);
	
})

Template.master.onRendered(function(){
	
	this.find('#transition-container')._uihooks = {
		insertElement: function(node, next){
			$(node)
				.hide()
				.insertBefore(next)
				.fadeIn();
		}
	}
	
});

Template.master.helpers({
	
	'bgClass': function(){
				
		console.log(Router.current().route.getName());
		
		switch(Router.current().route.getName()){
			
			case 'children':
			case 'child':
			case 'addChild':
			case 'signup':
				return 'bg-teal';
				
			case 'orderForm':
			case 'orders':
			case 'order':
				return 'bg-blue';
				
			case 'editor':
			case 'orderForm2':
				return 'bg-dark-grey';
				
			case 'account':
			case 'login':
				return 'bg-orange';
				
			case 'profile':
				return 'drip';
				
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
	
	'thisArray': function(){
		return [this];
	},
	
	'orders': function(){
		return Orders.find({owner: Meteor.userId()}).count() > 0;
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