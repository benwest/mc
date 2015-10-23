Template.inlineInput.onCreated(function(){
	this.data.min = this.data.min ? Number(this.data.min) : -Infinity;
	this.data.max = this.data.max ? Number(this.data.max) : Infinity;
	this.data.maxLength = this.data.maxLength ? Number(this.data.maxLength) : Infinity;
	Session.set( this.data.id, false );
});

Template.inlineInput.onRendered(function(){
	if(this.data.autofocus) this.$('.inline-input').focus();
});

Template.inlineInput.helpers({
	
	'isNumber': function(){
		return this.type === 'number';
	},
	
	'value': function(){
		return Session.get( this.id );
	},
	
	'valid': function(){
		var value = Session.get( this.id );
		return value !== false && value !== '' && value !== this.placeholder && 'valid';
	}
	
})

Template.inlineInput.events({
		
	'keydown span': function(event, template){
		
		if(event.which === 110) event.preventDefault;
		
		if( 
			// Allow backspace, delete, tab, escape, .
			_.contains( [46, 8, 9, 27, 13, 190], event.which ) === true ||
			// Allow Ctrl+A, Command+A
			(event.which == 65 && ( event.ctrlKey === true || event.metaKey === true ) ) ||
			// Allow home, end, left, right, down, up
	        (event.which >= 35 && event.which <= 40)
	    ) {
		    return;
	    }
	    
	    var span = $(event.target);
		var text = span.text();
		if(text === this.placeholder) {
			span.text('');
			text = '';
		}
		if(text.length + 1 > template.data.maxLength) event.preventDefault();
				
		if(template.data.type === 'number'){
					    
		    //Forbid not-numbers
		    if((event.shiftKey || (event.which < 48 || event.which > 57)) && (event.which < 96 || event.which > 105)){
			    event.preventDefault();
			    return;
		    }
		    
		    //Validate
		    var newNumber = Number( text + (event.which - 48) );

		    if(newNumber > template.data.max || ( template.data.step && newNumber % template.data.step !== 0 ) ){
				event.preventDefault();
		    }
		    
		}
	},
	
	'input span': function(event, template){
		
		var span = $(event.target);
		var text = span.text();
		
		if( this.placeholder !== '' && text === '' ) span.text(this.placeholder);
		
		Session.set( template.data.id, text );
				
	}
		
})