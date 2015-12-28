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
		if( Session.get('orderFormGarments').length ){
			return true;
		} else {
			Session.set('orderFormMaxStage', 0 );
			return false;
		}
	}
})

Template.orderFormGarments.events({
	'click .next': function(event, template){
		Session.set('orderFormStage', 1);
		Session.set('orderFormMaxStage', 1);
	}
})