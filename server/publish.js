Meteor.users.allow({
    remove: function(userId, doc){
        return (
            Meteor.users.findOne(userId).username === 'admin' ||
            userId === doc._id
        );
    }
});