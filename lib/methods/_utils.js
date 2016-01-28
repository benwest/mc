queryFactory = function(template) {
	
    return function(data) {
	    
	    var query = template.replace(/{([^{}]*)}/g,
	        function (a, b) {
	            var r = data[b];
	            return typeof r === 'string' || typeof r === 'number' ? r : a;
	        }
	    );
	    
	    console.log(query);
	    
	    //return query;
	    
	    return Sql.q(query);
	    
	}
	
};

emailAnja = function(subject, body){
	
	body = body.join('\n');
	
	var to = Meteor.settings.production ? 'anja@muddycreatures.com' : 'work@bong.international';
	
	Email.send({
		from: 'site@muddycreatures.com',
		to: to,
		subject: subject,
		text: body
	})
	
}