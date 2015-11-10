Template.inlineSelect.onCreated(function(){
	Session.set(this.data.id, this.data.value || false);
});

Template.inlineSelect.onDestroyed(function(){
	Session.set(this.data.id, false);
	delete Session.keys[this.data.id];
})

Template.inlineSelect.helpers({
	
	'options': function(){
		return this.options.split(', ');
	},
	
	'scrolling': function(){
		return this.options.split(', ').length >= 7;
	},
	
	'value': function(){
		return Session.get(this.id);
	}

})


Template.inlineSelect.events({
	
	'click .inline-select': function(event, template){
		
		Session.set( template.data.id, false );
		
	},
	
	'click .inline-select-option': function(event, template){
		
		event.stopPropagation();
		Session.set(template.data.id, this.valueOf());
		
	},
	
})