Template.admin_customerDetailOrderRow.helpers({
    'child': function(){
        return Children.findOne(this.forChild);
    },
    'garments':function(){
        return _.map(this.garments, function(value, key){
            return {
                name: GarmentTypes.findOne(key).name,
                size: value
            };
        });
    },
    'brands': function(){
        return _.map(this.brands, function(brandId){
            return Brands.findOne(brandId).name;
        });
    },
    'universes': function(){
        return _.map(this.universes, function(value, key){
            return Universes.findOne(key).name + ' (' + value + '%)';
        });
    }
})