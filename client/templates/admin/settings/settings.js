Template.admin_settings.events({
    /*
    'submit #returnDays': function(event, template){
        
        event.preventDefault();
        
        var value = parseInt(template.$('#returnDaysInput').val());
                
        var adminSettings = Settings.findOne({owner: Meteor.userId()})._id;
        
        Settings.update(adminSettings, {
            $set: {
                daysToReturn: value
            }
        })
        
    },
    */
    'submit #minColors': function(event, template){
        
        event.preventDefault();
        
        var value = parseInt(template.$('#minColorsInput').val());
        
        Meteor.call('changeMinColors', value);
                
    },
    /*
    'submit #minBrands': function(event, template){
        
        event.preventDefault();
        
        var value = parseInt(template.$('#minBrandsInput').val());
                
        var adminSettings = Settings.findOne({owner: Meteor.userId()})._id;
        
        Settings.update(adminSettings, {
            $set: {
                minBrands: value
            }
        })
        
    },
    */
    
    'submit #minLooks': function(event, template){
        
        event.preventDefault();
        
        var value = parseInt(template.$('#minLooksInput').val());
        
        Meteor.call('changeMinLooks', value);
        
    },
    
    'submit #maxAge': function(event, template){
        
        event.preventDefault();
        
        var value = parseInt(template.$('#maxAgeInput').val());
        
        Meteor.call('changeMaxAge', value);
        
    }
    
})