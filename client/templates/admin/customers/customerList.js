var SEARCH = 'adminCustomerListSearchQuery';

Template.admin_customerList.onCreated(function(){
    Session.set(SEARCH, '');
})

Template.admin_customerList.helpers({
    
    'selectedClass': function(root){
        return root._id === this._id && 'selected';
    },
    
   'customers': function(){
       
       var customers = _.map(Meteor.users.find().fetch(), function(customer){
            return {
                _id: customer._id,
                name: customer.profile.firstName + ' ' + customer.profile.lastName,
                notifications: customerNotificationCount(customer),
                warnings: customerWarningCount(customer)
            }
           
       });
       
       var search = Session.get(SEARCH);
       
       if(search !== ''){
           
            search = search.toLowerCase();
           
           customers = _.filter(customers, function(customer){
               return customer.name.toLowerCase().indexOf(search) !== -1;
           });
           
       }
       
       function compare(a, b){
           if(a === b) return 0;
           return a > b ? 1 : -1;
       }
       
       //Sort by warnings, then notifications, then name
       
       customers.sort(function(a, b){
           
           var aW = a.warnings;
           var bW = b.warnings;
           if(aW !== bW) return compare(bW, aW);
           
           var aN = a.notifications;
           var bN = b.notifications;
           if(aN !== bN) return compare(bN, aN);
           
            return compare(a.name, b.name);
           
       });
       
       return customers;
       
   }
    
});

Template.admin_customerList.events({
    
    'input .list-search': function(event){
        
        Session.set(SEARCH, $(event.target).val());
        
    },
    
    'click .customer-list-row': function(){
        Session.set('adminSelectedCustomer', this._id);
    }

});