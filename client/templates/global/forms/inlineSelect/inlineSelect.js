var OPEN = 'inlineSelectOpen';

Template.inlineSelect.onCreated(function(){
	Session.set(this.data.id, this.data.value || false);
	if(!this.data.value) Session.set( OPEN, this.data.id );
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
	},
	
	'open': function(){
		return Session.equals(OPEN, this.id)
	}

})


Template.inlineSelect.events({
	
	'click': function(e){
		
		console.log(e.target);
		
	},
	
	'click .inline-select': function(event, template){
		
		Session.set( OPEN, template.data.id );
		//Session.set( template.data.id, false );
		
	},
	
	'click .inline-select-option': function(event, template){
		
		event.stopPropagation();
		Session.set(template.data.id, this.valueOf());
		Session.set(OPEN, false);
		
	},
	
})