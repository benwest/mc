Template.admin_brands.helpers({
    'brands': function(){
        return Brands.find({});
    },
    'liked': function(){
        return Children.find({brands: this._id}).count();
    }
});

Template.admin_brands.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var name = template.$('[name=name]').val();
        
        if(!name) return;
        
        Brands.insert({name: name});
        
        template.$('[name=name]').val('');
        
    },
    
    'click .remove-brand': function(event, template){
        
        Brands.remove(this._id);
        
    },
    
    'click .show-on-home': function(){
        if(this.shownOnHome){
            Brands.update(this._id, {$unset: 'shownOnHome'})
        } else {
            Brands.update(this._id, {$set: {shownOnHome: true}})
        }
        
    }
    
})