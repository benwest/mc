Template.admin_customerDetail.helpers({
    'email': function(){
        return this.emails[0].address;
    },
    'hasOrders': function(){
        return Orders.findOne({owner: this._id});
    },
    'orders': function(){
        return Orders.find({owner: this._id}, {sort: {placedAt: -1}});
    }
});