Template.admin_garment_types.helpers({
    'garmentTypes': function(){
        return GarmentTypes.find({});
    },
    'garmentTypeSchema': function(){
	    
	    return {
		    collection: 'GarmentTypes',
		    fields: [
			    {
				    name: 'name',
				    type: 'text',
				    required: 'true'
			    },{
				    name: 'minAge',
				    niceName: 'Min age',
				    type: 'number'
			    },{
				    name: 'maxAge',
				    niceName: 'Max age',
				    type: 'number'
			    },{
				    name: 'gender',
				    type: 'select',
				    options: 'Both, Boy, Girl',
				    'default': 'Both'
			    }
		    ]
	    }
	    
    }
});

Template.admin_garment_types.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var name = template.$('[name=name]').val();
        var sizing = template.$('[name=sizing]').val();
        
        if(!name) return;
        
        GarmentTypes.insert({name: name, sizing: sizing});
        
        template.$('[name=name]').val('').focus();
        template.$('[name=sizing]').val('');
        
    },
    
    'click .remove-garment-type': function(event, template){
        
        GarmentTypes.remove(this._id);
        
    }
    
})