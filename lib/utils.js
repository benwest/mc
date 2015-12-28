clamp = function(x, min, max){
	return Math.max( min, Math.min( x, max ) );
}

normalize = function(x, min, max){
	return (x-min) / (max-min);
}

scale = function(x, oldMin, oldMax, newMin, newMax){
    if(oldMin !== 0 || oldMax !== 1){
        x = normalize(x, oldMin, oldMax);
    }
    return newMin + x * (newMax - newMin);
}

nearest = function(x, to){
	return Math.round(x/to) * to;
}

adminUser = function(){
    return Meteor.users.findOne({username: 'admin'});
}

globalSettings = function(){
    return Settings.findOne(/*{owner: adminUser()._id}*/);
}

plural = function(number, singular, plural){
	if( _.isArray(number) ) number = number.length;
    if(!plural) plural = singular + 's';
    return number === 1 ? singular : plural;
}