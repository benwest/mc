Template.about.helpers({
    'hasBrands': function(){
        return Brands.find({shownOnHome: true}).count();
    },
    'brands': function(){
        return Brands.find({shownOnHome: true});
    }
})