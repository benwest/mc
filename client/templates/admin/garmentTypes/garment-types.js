Template.admin_garment_types.helpers({
    'garment_type': function(){
        return GarmentTypes.find({});
    }
});

Template.admin_garment_types.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var name = template.$('[name=name]').val();
        
        if(!name) return;
        
        GarmentTypes.insert({name: name});
        
        template.$('[name=name]').val('');
        
    },
    
    'click .remove-garment-type': function(event, template){
        
        GarmentTypes.remove(this._id);
        
    }
    
})