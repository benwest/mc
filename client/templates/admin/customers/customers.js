/*

var CONFIRM_DELETE_USER = 'adminConfirmUserDelete';

Template.admin_customers.onCreated(function(){
    Session.set(CONFIRM_DELETE_USER, false);
})

Template.admin_customers.helpers({
    'users': function(){
        return Meteor.users.find({});
    },
    'email': function(){
        return this.emails[0].address;
    },
    'children': function(){
        return Children.find({owner: this._id});
    },
    'brands': function(){
        return _.map(this.brands, function(brandId){
            return Brands.findOne(brandId);
        });
    },
    'universes': function(){
        return _.map(this.universes, function(value, key){
            return {
                name: Universes.findOne(key).name,
                pct: value
            }
        });
    },
    'notSelf': function(){
        return this._id !== Meteor.user()._id;
    },
    'confirmDelete': function(){
        return this._id === Session.get(CONFIRM_DELETE_USER);
    }
});

Template.admin_customers.events({
    'click .remove':function(){
        Session.set(CONFIRM_DELETE_USER, this._id);
    },
    'click .cancel-remove': function(){
        Session.set(CONFIRM_DELETE_USER, false);
    },
    'click .confirm-remove': function(){
        Session.set(CONFIRM_DELETE_USER, false);
        Meteor.users.remove(this._id);
    }
});

*/