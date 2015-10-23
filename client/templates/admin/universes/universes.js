Template.admin_universes.helpers({
    'universes': function(){
        return Universes.find({});
    }
});

Template.admin_universes.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var name = template.$('[name=name]').val();
        
        if(!name) return;
        
        Universes.insert({name: name});
        
        template.$('[name=name]').val('');
        
    },
    
    'click .remove-universe': function(event, template){
        
        Universes.remove(this._id);
        
    }
    
})