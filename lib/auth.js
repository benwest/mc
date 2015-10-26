isAdmin = function(userId){
	var adminUser = Meteor.users.findOne({username:"admin"});
	if(userId && adminUser && userId === adminUser._id){
		return true;
	} else {
		throw new Meteor.Error(403, "You must be an admin to do that");
	};
}