Meteor.publish('lookImages', function(){
	return LookImages.find();
})
Meteor.publish('colors', function(){
	return Colors.find();
})
Meteor.publish('looks', function(){
	return Looks.find();
})


Meteor.users.allow({
    remove: function(userId, doc){
        return (
            Meteor.users.findOne(userId).username === 'admin' ||
            userId === doc._id
        );
    }
});