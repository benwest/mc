Meteor.publish('children', ownerOrAdmin(Children))

Meteor.publish('orders', ownerOrAdmin(Orders))

Meteor.publish('addresses', ownerOrAdmin(Addresses))

Meteor.publish('lookImages', function(){
	return LookImages.find();
})
Meteor.publish('colors', function(){
	return Colors.find();
})
Meteor.publish('looks', function(){
	return Looks.find();
})
Meteor.publish('settings', function(){
	return Settings.find();
})

Meteor.publish('garmentTypes', function(){
	return GarmentTypes.find();
})


Meteor.users.allow({
    remove: function(userId, doc){
        return (
            Meteor.users.findOne(userId).username === 'admin' ||
            userId === doc._id
        );
    }
});

function ownerOrAdmin(collection){
	return function(){
		if( this.userId === Meteor.users.findOne({username: 'admin'})._id ){
			return collection.find()
		} else {
			return collection.find({ owner: this.userId })
		}
	}
}