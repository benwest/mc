adminUser = function(){
    return Meteor.users.findOne({username: 'admin'});
}

globalSettings = function(){
    return Settings.findOne({owner: adminUser()._id});
}

plural = function(number, singular, plural){
	if( _.isArray(number) ) number = number.length;
    if(!plural) plural = singular + 's';
    return number === 1 ? singular : plural;
}