var ERRORS = 'addInventoryErrors';
var GARMENT_FILTER = 'inventoryGarmentFilter';
var SEARCH = 'inventorySearch';
var SIZE_FILTER = 'inventorySizeFilter';

Template.admin_inventory.onCreated(function(){
    Session.set(ERRORS, {});
    Session.set(GARMENT_FILTER, '');
    Session.set(SEARCH, '');
    Session.set(SIZE_FILTER, '');
});

Template.admin_inventory.helpers({
    
    'filteredInventory': function(){
        
        var garmentFilter = Session.get(GARMENT_FILTER);
        var search = Session.get(SEARCH);
        var sizeFilter = Session.get(SIZE_FILTER);
        
        if(!garmentFilter && !search && !sizeFilter) return this;
        
        search = search.toLowerCase();
        sizeFilter = sizeFilter.toLowerCase();
        
        debugger;
        
        return _.filter(this, function(item){
            if(garmentFilter && item.garment !== garmentFilter) return false;
            if(sizeFilter && item.size.toLowerCase().indexOf(search) === -1) return false;
            if(search){
                if(item.brand.toLowerCase().indexOf(search) !== -1) return true;
                if(item.description.toLowerCase().indexOf(search) !== -1) return true;
                return false;
            }
            return true;
        });
        
    },
    'garmentTypes': function(){
        var types = _.pluck(Inventory.find().fetch(), 'garment');
        return _.uniq(types);
    },
    'errorMessages': function() {
        return _.values(Session.get(ERRORS));
    },
    'errorClass': function(key) {
        return Session.get(ERRORS)[key] && 'error';
    }
})

Template.admin_inventory.events({
    
    'submit': function(event, template){
        
        event.preventDefault();
        
        var brand = template.$('[name=brand]').val();
        var garment = template.$('[name=garment]').val();
        var description = template.$('[name=description]').val();
        var size = template.$('[name=size]').val();
        var cost = template.$('[name=cost]').val();
        var quantity = template.$('[name=quantity]').val();
        
        var errors = {};
        
        if(!brand) errors.brand = 'Please enter a brand';
        if(!garment) errors.garment = 'Please enter the garment type';
        if(!description) errors.description = 'Please enter a description';
        if(!size) errors.size = 'Please enter a size';
        
        Session.set(ERRORS, errors);
        if(_.keys(errors).length) return;
        
        Inventory.insert({
            brand: brand,
            garment: garment,
            description: description,
            size: size,
            cost: Number(cost),
            quantity: Number(quantity)
        });
        
        template.$('[name=brand]').focus();
        
    },
    
    'change #filter-garments': function(event){
        Session.set(GARMENT_FILTER, $(event.target).val());
    },
    
    'input #inventory-search': function(event){
        Session.set(SEARCH, $(event.target).val());
    },
    
    'input #inventory-size-filter': function(event){
        Session.set(SIZE_FILTER, $(event.target).val());
    },
    
    'click .remove': function(event, template){
        
        Inventory.remove(this._id);
        
    }
});