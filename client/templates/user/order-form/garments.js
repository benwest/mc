var garments;

Template.orderFormGarments.onCreated(function(){
	var child = this;
	var age = getAge(child.dob);
	garments = _.filter( GarmentTypes.find().fetch(), function(garment){
		if( garment.gender !== 'Both' && garment.gender.toLowerCase !== child.gender ) return false;
		if( garment.minAge && garment.minAge >= age ) return false;
		if( garment.maxAge && garment.maxAge <= age ) return false;
		return true;
	});
})

Template.orderFormGarments.helpers({
	garmentNames: function(){
		return _.pluck( garments, 'name' ).join(', ');
	},
	chosenGarments: function(){
		return Session.get('orderFormGarments');
	},
	valid: function(){
		return orderFormValidators.garments();
	}
})

Template.orderFormGarments.events({
	'click .next': function(event, template){
		orderFormSetStage(1);
	}
})