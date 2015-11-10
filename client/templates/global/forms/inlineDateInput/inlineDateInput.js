Template.inlineDateInput.onCreated(function(){
	
	Session.set(this.data.id, false);
	
})

Template.inlineDateInput.helpers({
	'monthNames': function(){
		return _.reduce(MONTHS, function(memo, month){ return memo + month.name + ', ' }, '');
	},
	'monthInputId': function(){
		return this.id + 'Month';
	},
	'daysInMonth': function(){
		var monthName = Session.get(this.id + 'Month');
		return _.findWhere( MONTHS, {name: monthName} ).days;
	},
	'dayInputId': function(){
		return this.id + 'Day';
	},
	'yearInputId': function(){
		return this.id + 'Year';
	},
	'valid': function(){
		return Session.get(this.id + 'Day') && Session.get(this.id + 'Month') && Session.get(this.id + 'Year') && 'valid';
	},
	'value': function(){
		
		var day = Session.get(this.id + 'Day');
		var month = Session.get(this.id + 'Month');
		var year = Session.get(this.id + 'Year');
		
		if(!day || !month || !year) return false;
		
		var dob = day + ' ' + month + ' ' + year;
		
		Session.set(this.id, dob);
		
		return day + ' ' + month + ' ' + year;
		
	}
})