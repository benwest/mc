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
	
	'menuClass': function(){
		return Session.get(MENU_OPEN) && 'open';
	},
	
	'children': function(){
		return Children.find({owner: Meteor.userId()});
	},
	
	'thisArray': function(){
		return [this];
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