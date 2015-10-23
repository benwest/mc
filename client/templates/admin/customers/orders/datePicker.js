var EDITING_DELIVERY = 'adminOrderActionsEditDeliveryDate';
var EDITING_RETURN = 'adminOrderActionsEditReturnDate';

Template.admin_datePicker.onCreated(function(){
    Session.set(EDITING_DELIVERY, false);
    Session.set(EDITING_RETURN, false);
});

Template.admin_datePicker.helpers({
    
    'editingDates': function(){
        if(!this.estimatedDelivery) return true;
        return Session.get(EDITING_DELIVERY) || Session.get(EDITING_RETURN);
    },
    
    'editingDeliveryDate': function(){
        if(!this.estimatedDelivery) return true;
        return Session.get(EDITING_DELIVERY);
    },
    'editingReturnDate': function(){
        if(!this.estimatedDelivery) return false;
        return Session.get(EDITING_RETURN);
    },
    'deliveryDay': function(){
        if(!this.estimatedDelivery) return moment().add(7, 'days').format('DD');
        return moment(this.estimatedDelivery).add(7, 'days').format('DD');
    },
    'deliveryMonth': function(){
        if(!this.estimatedDelivery) return moment().add(7, 'days').format('MM');
        return moment(this.estimatedDelivery).add(7, 'days').format('MM');
    },
    'deliveryYear': function(){
        if(!this.estimatedDelivery) return moment().add(7, 'days').format('YYYY');
        return moment(this.estimatedDelivery).add(7, 'days').format('YYYY');
    }

});

Template.admin_datePicker.events({
    
    'click .edit-delivery-date': function(){
        Session.set(EDITING_DELIVERY, true);
    },
    
    'click .edit-return-date': function(){
        Session.set(EDITING_RETURN, true);
    },
    
    'submit .delivery-date': function(event, template){
        
        event.preventDefault();
        
        var day = template.$('[name=deliveryD]').val();
        var month = template.$('[name=deliveryM]').val();
        var year = template.$('[name=deliveryY]').val();
        
        if(!day || !month || !year) return;
        
        var date = new Date(year, month-1, day);
        
        if(!this.returnBy){
            
            var daysToReturn = Settings.findOne({owner: Meteor.userId()}).daysToReturn;
            
            var returnDate = moment(date).add(daysToReturn, 'days').toDate();
            
            Orders.update(this._id, {$set: {
                estimatedDelivery: date,
                returnBy: returnDate
            }});
            
        } else {
            
            Orders.update(this._id, {$set: {
                estimatedDelivery: date
            }});
            
        }
        
        Session.set(EDITING_DELIVERY, false);
        
    },
    
    'submit .return-date': function(event, template){
        
        event.preventDefault();
        
        var day = template.$('[name=returnD]').val();
        var month = template.$('[name=returnM]').val();
        var year = template.$('[name=returnY]').val();
        
        if(!day || !month || !year) return;
        
        var date = new Date(year, month-1, day);
            
        Orders.update(this._id, {$set: {
            returnBy: date
        }});
        
        Session.set(EDITING_RETURN, false);
        
    }
    
})