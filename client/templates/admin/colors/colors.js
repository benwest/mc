Template.admin_colors.helpers({
	
	'colors': function(){
		
		return Colors.find();
		
	}
	
});

Template.admin_colors.events({
	
	'click .add-color': function(event, template){
		
		var color = template.$('.color-input').val();
		var name = Session.get('adminColorName');
		
		if(!color || !name) return;
		
		Meteor.call('addColor', {
			color: color,
			name: name
		});
				
	},
	
	'click .remove-color': function(event, template){
		
		Meteor.call('removeColor', this._id);
		
	}
	
})